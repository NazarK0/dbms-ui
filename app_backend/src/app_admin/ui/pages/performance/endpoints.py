from fastapi import APIRouter
from app_admin.ui.pages.performance.table.endpoints import tables_router
from app_admin.ui.pages.performance.slow_queries.endpoints import slow_queries_router
from app_admin.ui.pages.performance.widgets.endpoints import performance_widgets_router

performance_page_router = APIRouter()


performance_page_router.include_router(tables_router, prefix="/table", tags=["performance-table"])
performance_page_router.include_router(slow_queries_router, prefix="/slow-queries", tags=["performance-slow-queries"])
performance_page_router.include_router(performance_widgets_router, prefix="/widgets", tags=["performance-widgets"])
