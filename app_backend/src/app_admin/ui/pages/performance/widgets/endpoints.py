from fastapi import APIRouter

from src.app_admin.ui.pages.performance.widgets.blocks_from_cache.endpoints import blocks_from_cache_widget_router
from src.app_admin.ui.pages.performance.widgets.blocks_from_disk.endpoints import blocks_from_disk_widget_router
from src.app_admin.ui.pages.performance.widgets.blocks_written.endpoints import blocks_written_widget_router
from src.app_admin.ui.pages.performance.widgets.cache_hit_rate.endpoints import cache_hit_rate_widget_router


performance_widgets_router = APIRouter()


performance_widgets_router.include_router(
    blocks_from_cache_widget_router, prefix="/blocks-from-cache", tags=["blocks-from-cache"]
)
performance_widgets_router.include_router(
    blocks_written_widget_router, prefix="/blocks-written", tags=["blocks-written"]
)
performance_widgets_router.include_router(
    blocks_from_disk_widget_router, prefix="/blocks-from-disk", tags=["blocks-from-disk"]
)
performance_widgets_router.include_router(
    cache_hit_rate_widget_router, prefix="/cache-hit-rate", tags=["cache-hit-rate"]
)