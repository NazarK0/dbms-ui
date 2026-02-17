from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.core import dependencies  # Dependency for DB session

from app_admin.ui.pages.performance.widgets.blocks_from_disk.schema import BlocksFromDiskWidgetItem


blocks_from_disk_widget_router = APIRouter()


@blocks_from_disk_widget_router.get("/", response_model=BlocksFromDiskWidgetItem)
def get_blocks_from_disk(db: Session = Depends(dependencies.get_db)):
    # Тут має бути логіка отримання активних з'єднань з бази даних
    # Поки що повертаємо фіктивні дані для прикладу
    return {"value": "58.4M", "change": "+2M"}
