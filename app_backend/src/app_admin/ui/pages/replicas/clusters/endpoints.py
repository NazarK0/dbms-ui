from typing import List
from app_admin.ui.pages.replicas.clusters.schema import ClusterServer
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session



replicas_clusters_router = APIRouter()

@replicas_clusters_router.get("/", response_model=List[ClusterServer])
def get_replicas_clusters(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання активних з'єднань з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return [
        {
            "id": 1,
            "name": "Production Primary",
            "role": "Primary",
            "status": "healthy",
            "location": "US East (Virginia)",
            "host": "primary-db.example.com",
            "port": 5432,
            "connections": 245,
            "replication_lag": "0ms",
        },
        {
            "id": 2,
            "name": "Read Replica 1",
            "role": "Replica",
            "status": "healthy",
            "location": "US West (Oregon)",
            "host": "replica-1.example.com",
            "port": 5432,
            "connections": 87,
            "replication_lag": "12ms",
        },
        {
            "id": 3,
            "name": "Read Replica 2",
            "role": "Replica",
            "status": "healthy",
            "location": "EU (Ireland)",
            "host": "replica-2.example.com",
            "port": 5432,
            "connections": 54,
            "replication_lag": "45ms",
        },
        {
            "id": 4,
            "name": "Read Replica 3",
            "role": "Replica",
            "status": "warning",
            "location": "Asia Pacific (Singapore)",
            "host": "replica-3.example.com",
            "port": 5432,
            "connections": 23,
            "replication_lag": "234ms",
        },
    ]