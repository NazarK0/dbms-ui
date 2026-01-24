from app_admin.ui.pages.system_log.stats.schema import LogStats


from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session



stats_router = APIRouter()

@stats_router.get("/", response_model=LogStats)
def get_system_log_stats(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання статистики логів з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return {
        "errors": 150,
        "warnings": 75,
        "info": 300,
        "success": 200,
    }