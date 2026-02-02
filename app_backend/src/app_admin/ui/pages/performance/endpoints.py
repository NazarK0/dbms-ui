from fastapi import APIRouter
from app_admin.ui.pages.performance.table.endpoints import tables_router
from app_admin.ui.pages.audit_log.stats_panel.endpoints import stats_panel_router
from app_admin.ui.pages.audit_log.widgets.endpoints import widgets_router

performance_page_router = APIRouter()


performance_page_router.include_router(tables_router, prefix="/table", tags=["performance-table"])
performance_page_router.include_router(stats_panel_router, prefix="/stats-panel", tags=["audit-log-stats-panel"])
performance_page_router.include_router(widgets_router, prefix="/widgets", tags=["audit-log-widgets"])