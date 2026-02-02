from typing import List
from app_admin.ui.pages.performance.table.index_usage.schema import IndexUsageEntry

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session



index_usage_router = APIRouter()

@index_usage_router.get("/", response_model=List[IndexUsageEntry])
def get_index_usage_table(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання активних з'єднань з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return [
      {
        "database": "db_01",
        "schema": "public",
        "table": 'orders',
        "index": 'idx_orders_user_id',
        "size": '45 МБ',
        "scans": 15234,
        "rowsRead": 245678,
        "usage": 98,
      },
      {
        "database": "db_01",
        "schema": "public",
        "table": 'orders',
        "index": 'idx_orders_status',
        "size": '23 МБ',
        "scans": 8945,
        "rowsRead": 156789,
        "usage": 87,
      },
      {
        "database": "db_01",
        "schema": "public",
        "table": 'users',
        "index": 'idx_users_email',
        "size": '12 МБ',
        "scans": 23456,
        "rowsRead": 23456,
        "usage": 100,
      },
      {
        "database": "db_01",
        "schema": "public",
        "table": 'products',
        "index": 'idx_products_category',
        "size": '8 МБ',
        "scans": 12456,
        "rowsRead": 67890,
        "usage": 67,
      },
      {
        "database": "db_01",
        "schema": "public",
        "table": 'sessions',
        "index": 'idx_sessions_expires',
        "size": '34 МБ',
        "scans": 234,
        "rowsRead": 156789,
        "usage": 8,
      },
        
    ]
