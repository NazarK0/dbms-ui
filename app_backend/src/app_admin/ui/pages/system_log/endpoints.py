from fastapi import APIRouter
from app_admin.ui.pages.system_log.table.endpoints import table_router
from app_admin.ui.pages.system_log.stats.endpoints import stats_router

systemlog_page_router = APIRouter()



systemlog_page_router.include_router(table_router, prefix="/table", tags=["system-log-table"])
systemlog_page_router.include_router(stats_router, prefix="/stats", tags=["system-log-stats"])