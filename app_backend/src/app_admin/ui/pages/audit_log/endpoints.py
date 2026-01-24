from fastapi import APIRouter
from app_admin.ui.pages.audit_log.table.endpoints import table_router
from app_admin.ui.pages.audit_log.stats_panel.endpoints import stats_panel_router
from app_admin.ui.pages.audit_log.widgets.endpoints import widgets_router

auditlog_page_router = APIRouter()


auditlog_page_router.include_router(table_router, prefix="/table", tags=["audit-log-table"])
auditlog_page_router.include_router(stats_panel_router, prefix="/stats-panel", tags=["audit-log-stats-panel"])
auditlog_page_router.include_router(widgets_router, prefix="/widgets", tags=["audit-log-widgets"])