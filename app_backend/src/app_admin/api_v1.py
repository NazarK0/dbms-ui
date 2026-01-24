from fastapi import APIRouter
from src.app_admin.ui.pages.dashboard.endpoints import dashboard_page_router
from src.app_admin.ui.pages.system_log.endpoints import systemlog_page_router
from src.app_admin.ui.pages.audit_log.endpoints import auditlog_page_router
from src.app_admin.ui.pages.cli.endpoints import cli_page_router

admin_api_routerV1 = APIRouter()


admin_api_routerV1.include_router(dashboard_page_router, prefix="/dashboard", tags=["dashboard-page"])
admin_api_routerV1.include_router(systemlog_page_router, prefix="/system-log", tags=["systemlog-page"])
admin_api_routerV1.include_router(auditlog_page_router, prefix="/audit-log", tags=["auditlog-page"])
admin_api_routerV1.include_router(cli_page_router, prefix="/cli", tags=["cli-page"])