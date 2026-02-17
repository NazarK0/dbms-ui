from typing import List
from app_admin.ui.pages.pg_config.profiles.schema import PgConfigProfileEntry
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session



pg_config_profiles_router = APIRouter()

@pg_config_profiles_router.get("/", response_model=List[PgConfigProfileEntry])
def get_pg_config_profiles(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання активних з'єднань з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return [
        {
            "id": "1",
            "name": "Production Optimized",
            "description": "Оптимізовано для продакшн серверів",
            "created_at": "2024-12-10 15:30",
            "parameters_count": 22,
        },
        {
            "id": "2",
            "name": "Development Setup",
            "description": "Налаштування для розробки",
            "created_at": "2024-12-08 09:15",
            "parameters_count": 22,
        },
        {
            "id": "3",
            "name": "High Load Server",
            "description": "Конфігурація для високого навантаження",
            "created_at": "2024-12-05 18:45",
            "parameters_count": 22,
        },
    ]