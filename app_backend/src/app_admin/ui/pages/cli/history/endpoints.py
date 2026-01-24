from typing import List
from app_admin.ui.pages.cli.history.schema import CliHistoryEntry
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session



cli_history_router = APIRouter()

@cli_history_router.get("/", response_model=List[CliHistoryEntry])
def get_cli_history(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання активних з'єднань з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return [
          {
            "id": 1,
            "cmd": "\\l",
            "time": "2024-12-12 10:43:34"
          },
          {
            "id": 2,
            "cmd": "\\dt",
            "time": "2024-12-12 12:23:13"
          },
          {
            "id": 3,
            "cmd": "\\d table_name",
            "time": "2024-12-12 14:00:12"
          },
          {
            "id": 4,
            "cmd": "\\du",
            "time": "2024-12-12 14:34:10"
          },
          {
            "id": 5,
            "cmd": "\\connect database_name",
            "time": "2024-12-12 15:23:15"
          }
    ]