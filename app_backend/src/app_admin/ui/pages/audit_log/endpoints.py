from fastapi import APIRouter
from app_admin.ui.pages.audit_log.table.endpoints import table_router
from app_admin.ui.pages.audit_log.stats.endpoints import stats_router

auditlog_page_router = APIRouter()



auditlog_page_router.include_router(table_router, prefix="/table", tags=["audit-log-table"])
auditlog_page_router.include_router(stats_router, prefix="/actions-stats", tags=["audit-log-actions-stats"])