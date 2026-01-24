from typing import List
from app_admin.ui.pages.audit_log.table.schema import AuditLogTableItem

from app_admin.ui.pages.cli import sql_reference
from app_admin.ui.pages.cli.sql_reference.schema import SqlReferenceEntry
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session



sql_reference_router = APIRouter()

@sql_reference_router.get("/", response_model=List[SqlReferenceEntry])
def get_sql_reference(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання активних з'єднань з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return [
          {
            "id": 1,
            "cmd": "\\l",
            "description": "Список баз даних"
          },
          {
            "id": 2,
            "cmd": "\\dt",
            "description": "Список таблиць"
          },
          {
            "id": 3,
            "cmd": "\\d table_name",
            "description": "Опис таблиці"
          },
          {
            "id": 4,
            "cmd": "\\du",
            "description": "Список користувачів"
          },
          {
            "id": 5,
            "cmd": "\\connect database_name",
            "description": "Підключення до бази даних"
          }
    ]