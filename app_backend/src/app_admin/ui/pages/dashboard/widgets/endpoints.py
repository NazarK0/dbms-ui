from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session
from src.app_admin.ui.pages.dashboard.widgets.active_connections.schema import ActiveConnectionsWidgetItem
from src.app_admin.ui.pages.dashboard.widgets.recent_activity.schema import RecentActivityWidgetItem


widgetRouterV1 = APIRouter()


@widgetRouterV1.get("/active-connections", response_model=List[ActiveConnectionsWidgetItem])
def get_active_connections(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання активних з'єднань з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return [
        {"id": 1, "name": "connection1", "user": "admin", "status": "АКТИВНИЙ", "duration": "00:05:30", "requests": 12},
        {"id": 2, "name": "connection2", "user": "user1", "status": "ОЧІКУЄ", "duration": "00:02:15", "requests": 5},
        {
            "id": 3,
            "name": "customer_db",
            "user": "admin",
            "status": "АКТИВНИЙ",
            "duration": "00:15:32",
            "requests": 1245,
        },
        {
            "id": 4,
            "name": "inventory_db",
            "user": "user1",
            "status": "ОЧІКУЄ",
            "duration": "00:08:45",
            "requests": 892,
        },
        {
            "id": 5,
            "name": "sales_db",
            "user": "user2",
            "status": "АКТИВНИЙ",
            "duration": "00:22:17",
            "requests": 3456,
        },
    ]


@widgetRouterV1.get("/recent-activity", response_model=List[RecentActivityWidgetItem])
def get_recent_activity(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання активних з'єднань з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return [
        {
            "id": 1,
            "type": "info",
            "category": "db_connection",
            "title": "Підключення до БД",
            "details": "Користувач admin підключився до бази даних",
            "time_ago": "5 хвилин тому"
        },
        {
            "id": 2,
            "type": "success",
            "category": "query_execution",
            "title": "Виконання запиту",
            "details": "Запит SELECT * FROM users виконано успішно",
            "time_ago": "10 хвилин тому"
        },
        {
            "id": 3,
            "type": "info",
            "category": "db_connection",
            "title": "Підключення до БД",
            "details": "Користувач admin підключився до бази даних",
            "time_ago": "5 хвилин тому"
        },
        {
            "id": 4,
            "type": "success",
            "category": "query_execution",
            "title": "Виконання запиту",
            "details": "Запит SELECT * FROM users виконано успішно",
            "time_ago": "10 хвилин тому"
        },
        {
            "id": 5,
            "type": "info",
            "category": "user_login",
            "details": "Користувач 'admin' увійшов у систему",
            "time_ago": "5 хвилин тому",
            "title": "Вхід до системи",
        },
        {
            "id": 6,
            "type": "success",
            "category": "table_modification",
            "details": "Користувач 'user1' створив таблицю 'orders'",
            "time_ago": "15 хвилин тому",
            "title": "Створення таблиці",
        },
        {
            "id": 7,
            "type": "info",
            "category": "query_execution",
            "details": "Користувач 'user2' виконав запит до таблиці 'customers'",
            "time_ago": "20 хвилин тому",
            "title": "Виконання запиту",
        },
        {
            "id": 8,
            "type": "warning",
            "category": "unauthorized_access",
            "details": "Користувач 'user3' намагався отримати доступ до забороненої таблиці 'payments'",
            "time_ago": "30 хвилин тому",
            "title": "Спроба несанкціонованого доступу",
        },
        {
            "id": 9,
            "type": "error",
            "category": "db_connection",
            "details": "Збій підключення до бази даних 'inventory_db'",
            "time_ago": "45 хвилин тому",
            "title": "Збій підключення",
        },
        {
            "id": 10,
            "type": "unknown",
            "category": "system_error",
            "details": "Невідома активність зафіксована в системі",
            "time_ago": "1 година тому",
            "title": "Невідома активність",
        }
    ]
