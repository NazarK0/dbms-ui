from fastapi import APIRouter
from src.app_admin.ui.pages.dashboard.widgets.endpoints import widgetRouterV1

admin_api_routerV1 = APIRouter()

# Реєструємо окремі модулі як гілки API
admin_api_routerV1.include_router(widgetRouterV1, prefix="/dashboard/widgets", tags=["widgets"])