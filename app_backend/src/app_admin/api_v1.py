from fastapi import APIRouter
from src.app_admin.ui.pages.dashboard.widgets.endpoints import widgetRouter

admin_api_router = APIRouter()

# Реєструємо окремі модулі як гілки API
admin_api_router.include_router(widgetRouter, prefix="/widgets", tags=["widgets"])