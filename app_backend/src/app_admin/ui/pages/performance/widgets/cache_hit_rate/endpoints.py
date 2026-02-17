from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session

from app_admin.ui.pages.performance.widgets.cache_hit_rate.schema import CacheHitRateWidgetItem


cache_hit_rate_widget_router = APIRouter()


@cache_hit_rate_widget_router.get("/", response_model=CacheHitRateWidgetItem)
def get_cache_hit_rate(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання активних з'єднань з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return {"value": 34}
