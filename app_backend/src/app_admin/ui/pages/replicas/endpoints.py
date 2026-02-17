from fastapi import APIRouter
from src.app_admin.ui.pages.replicas.clusters.endpoints import replicas_clusters_router
from src.app_admin.ui.pages.replicas.table_activity.endpoints import table_activity_router

replicas_page_router = APIRouter()


replicas_page_router.include_router(replicas_clusters_router, prefix="/clusters", tags=["clusters"])
replicas_page_router.include_router(table_activity_router, prefix="/table/activity", tags=["table-activity"])
