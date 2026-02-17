from app_admin.ui.pages.audit_log.stats_panel.schema import ActionStats
from app_admin.ui.pages.performance.slow_queries.schema import SlowQueryDetail
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from src.core import dependencies  # Dependency for DB session



slow_queries_router = APIRouter()

@slow_queries_router.get("/", response_model=List[SlowQueryDetail])
def get_slow_queries(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання статистики повільних запитів з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return [
        SlowQueryDetail(
            query="SELECT * FROM users WHERE id = 1",
            avg_time="0.05s",
            calls=10,
            recommendation="Consider adding an index on the 'id' column.",
            impact="High"
        ),
        SlowQueryDetail(
            query="SELECT * FROM orders WHERE user_id = 123",
            avg_time="0.12s",
            calls=5,
            recommendation="Consider adding an index on the 'user_id' column.",
            impact="Medium"
        ),
        SlowQueryDetail(
            query="SELECT * FROM products WHERE price > 100",
            avg_time="0.20s",
            calls=3,
            recommendation="Consider adding an index on the 'price' column.",
            impact="Low"
        ),
    ]