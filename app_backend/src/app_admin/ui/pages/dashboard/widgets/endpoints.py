from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session
from src.app_admin.ui.pages.dashboard.widgets.active_connections.schema import ActiveConnectionsWidgetItem
from src.app_admin.ui.pages.dashboard.widgets.recent_activity.schema import RecentActivityWidgetItem


widgetRouter = APIRouter()


@widgetRouter.get("/active-connections", response_model=List[ActiveConnectionsWidgetItem])
def get_active_connections(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання активних з'єднань з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return [
        {"id": 1, "name": "connection1", "user": "admin", "status": "АКТИВНИЙ", "duration": "00:05:30", "requests": 12},
        {"id": 2, "name": "connection2", "user": "user1", "status": "ОЧІКУЄ", "duration": "00:02:15", "requests": 5},
    ]


@widgetRouter.get("/recent-activity", response_model=List[RecentActivityWidgetItem])
def get_recent_activity(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання активних з'єднань з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return [
        {"id": 1, "type": "info", "category": "db_connection", "title": "Підключення до БД", "details": "Користувач admin підключився до бази даних", "time_ago": "5 хвилин тому"},
        {"id": 2, "type": "success", "category": "query_execution", "title": "Виконання запиту", "details": "Запит SELECT * FROM users виконано успішно", "time_ago": "10 хвилин тому"},
    ]
