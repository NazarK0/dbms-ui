import { JSX, useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { AttachAddon } from '@xterm/addon-attach';
import '@xterm/xterm/css/xterm.css';
import API from '../../../../api/endpoints';

interface TerminalProps {
    className?: string;
}

export default function TerminalComponent(props: TerminalProps): JSX.Element {
    const { className } = props;
    const endpoint = API.admin.v1.cli.terminal.psql.connect;
    // Specify HTMLDivElement for the container ref
    const terminalRef = useRef<HTMLDivElement | null>(null);

    // Track the terminal instance to prevent multiple initializations
    const xtermInstance = useRef<Terminal | null>(null);

    useEffect(() => {
        // Basic guard: ensure the DOM element exists and terminal isn't already set
        if (!terminalRef.current || xtermInstance.current) return;

        const term = new Terminal({
            cursorBlink: true,
            theme: {
                background: '#0f172a',
                foreground: '#ffffff'
            },
            fontSize: 14,
            fontFamily: 'Menlo, Monaco, "Courier New", monospace'
        });

        // Connect to your FastAPI WebSocket
        const socket = new WebSocket(`ws://localhost:8000/${endpoint.url}`);
        const attachAddon = new AttachAddon(socket);

        term.loadAddon(attachAddon);
        term.open(terminalRef.current);

        return () => {
            socket.close();
            term.dispose();
        };
    }, []);

    return (
        <div
            ref={terminalRef}
            className={className}
            style={{
                height: '500px',
                width: '100%',
                backgroundColor: '#0f172a' // Match terminal theme for smoother loading
            }}
        />
    );
}
