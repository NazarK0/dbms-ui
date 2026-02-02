from app_admin.ui.pages.audit_log.widgets.schema import AuditLogWidget
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session



widgets_router = APIRouter()

@widgets_router.get("/success-actions", response_model=AuditLogWidget)
def get_audit_log_widget_success_actions(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання статистики логів з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return {"value": 12, "change": "+2"}


@widgets_router.get("/failure-actions", response_model=AuditLogWidget)
def get_audit_log_widget_failure_actions(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання статистики логів з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return {"value": 7, "change": "-3"}