import os
import pty
import subprocess
import asyncio
from fastapi.websockets import WebSocketState
from app_admin.ui.pages.audit_log.stats_panel.schema import ActionStats
from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session

terminal_router = APIRouter()

async def safe_close(websocket: WebSocket):
    # Only attempt to close if the socket is still in a CONNECTED state
    if websocket.client_state == WebSocketState.CONNECTED:
        try:
            await websocket.close()
        except RuntimeError:
            # Catch cases where it closed between the check and the call
            pass



@terminal_router.websocket("/psql/connect")
async def psql_terminal(websocket: WebSocket):
    await websocket.accept()
    
    master_fd, slave_fd = pty.openpty()
    # Psql connection with service name 'db'
    cmd = ["psql", "-h", "db", "-U", "user", "-d", "dbms_app"]
    env = os.environ.copy()
    env["PGPASSWORD"] = "mysecretpassword"  # Use environment variable for password

    process = subprocess.Popen(
        cmd, stdin=slave_fd, stdout=slave_fd, stderr=slave_fd,
        env=env, preexec_fn=os.setsid
    )
    os.close(slave_fd)

    # Event to coordinate shutdown and prevent double-closing
    stop_event = asyncio.Event()

    async def read_from_pty():
        loop = asyncio.get_event_loop()
        try:
            # Check stop_event to prevent reading after FD is closed
            while not stop_event.is_set() and process.poll() is None:
                try:
                    # Non-blocking-like read using executor
                    data = await loop.run_in_executor(None, os.read, master_fd, 1024)
                    if not data:
                        break
                    await websocket.send_bytes(data)
                except OSError as e:
                    if e.errno in (5, 9): # EIO or Bad FD
                        break
                    raise
        except (asyncio.CancelledError, Exception):
            # Do NOT call websocket.close() here to avoid ASGI RuntimeError
            pass
        finally:
            stop_event.set()

    read_task = asyncio.create_task(read_from_pty())

    try:
        while not stop_event.is_set():
            # Receive the raw ASGI message dictionary
            msg = await websocket.receive()
            
            if msg["type"] == "websocket.disconnect":
                break

            # Extract the actual payload from the dictionary
            payload = None
            if "text" in msg:
                payload = msg["text"].encode()
            elif "bytes" in msg:
                payload = msg["bytes"]

            # Write ONLY the bytes to the PTY
            if payload:
                os.write(master_fd, payload)
                
    except (WebSocketDisconnect, asyncio.CancelledError):
        pass
    finally:
        # --- ORDER MATTERS HERE TO PREVENT LOG ERRORS ---
        stop_event.set()
        read_task.cancel()
        
        if process.poll() is None:
            process.terminate()
            
        try:
            os.close(master_fd)
        except OSError:
            pass # Already closed

        # Only the main task handles the close
        if websocket.client_state == WebSocketState.CONNECTED:
            await websocket.close()



