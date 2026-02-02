from fastapi import APIRouter
from app_admin.ui.pages.performance.table.index_usage.endpoints import index_usage_router
from app_admin.ui.pages.performance.table.top5_queries.endpoints import top5_queries_router


tables_router = APIRouter()


tables_router.include_router(index_usage_router, prefix="/index-usage", tags=["p-index-usage-table"])
tables_router.include_router(top5_queries_router, prefix="/top5-queries", tags=["p-top5-queries-table"])
