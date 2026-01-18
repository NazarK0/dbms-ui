from fastapi import APIRouter
from src.app_admin.ui.pages.dashboard.widgets.endpoints import widgetRouterV1
from src.app_admin.ui.pages.system_log.endpoints import system_log_page_routerV1

admin_api_routerV1 = APIRouter()


admin_api_routerV1.include_router(widgetRouterV1, prefix="/dashboard/widgets", tags=["widgets"])
admin_api_routerV1.include_router(system_log_page_routerV1, prefix="/system-log/widgets", tags=["system-log"])