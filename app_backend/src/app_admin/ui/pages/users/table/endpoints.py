from typing import List
from app_admin.ui.pages.users.table.schema import UsersTableEntry
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session



table_router = APIRouter()

@table_router.get("/", response_model=List[UsersTableEntry])
def get_users_table(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання активних з'єднань з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return [
        {
            "id": 1,
            "user_name": "Іван Петренко",
            "avatar": "IP",
            "nick_name": "ipetr",
            "organization_unit": "it dept",
            "timezone": "Europe/Kyiv",
            "registration_date": "2024-12-12 14:30",
            "lastactive_date": "2024-12-12 14:30",
            "status": "active",
        },
        {
            "id": 1,
            "user_name": "Марія Коваленко",
            "avatar": "MK",
            "nick_name": "mkovale",
            "organization_unit": "it dept",
            "timezone": "Europe/London",
            "registration_date": "2024-12-12 14:30",
            "lastactive_date": "2024-12-12 14:30",
            "status": "active",
        },
    ]
