from typing import List
from app_admin.ui.pages.replicas.table_activity.schema import ReplicaActivityEntry
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session



table_activity_router = APIRouter()

@table_activity_router.get("/", response_model=List[ReplicaActivityEntry])
def get_replicas_table_activity(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання активних з'єднань з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return [
        {
            "replica": "replica-1.example.com",
            "state": "streaming",
            "sync_state": "async",
            "sent_lsn": "0/3000060",
            "write_lsn": "0/3000060",
            "flush_lsn": "0/3000060",
            "lag": "12ms",
        },
        {
            "replica": "replica-2.example.com",
            "state": "streaming",
            "sync_state": "async",
            "sent_lsn": "0/3000060",
            "write_lsn": "0/3000058",
            "flush_lsn": "0/3000058",
            "lag": "45ms",
        },
        {
            "replica": "replica-3.example.com",
            "state": "streaming",
            "sync_state": "async",
            "sent_lsn": "0/3000060",
            "write_lsn": "0/3000048",
            "flush_lsn": "0/3000045",
            "lag": "234ms",
        },
    ]