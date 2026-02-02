from app_admin.ui.pages.audit_log.stats_panel.schema import ActionStats
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session



stats_panel_router = APIRouter()

@stats_panel_router.get("/", response_model=ActionStats)
def get_audit_log_stats_panel(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання статистики логів з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return {
        "create": 150,
        "update": 75,
        "delete": 300,
        "query": 200,
    }