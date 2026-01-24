from fastapi import APIRouter
from src.app_admin.ui.pages.dashboard.widgets.endpoints import widgetRouterV1

dashboard_page_router = APIRouter()


dashboard_page_router.include_router(widgetRouterV1, prefix="/widgets", tags=["widgets"])
