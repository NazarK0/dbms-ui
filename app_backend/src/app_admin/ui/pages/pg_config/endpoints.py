from fastapi import APIRouter
from app_admin.ui.pages.pg_config.params.endpoints import pg_config_params_router


pg_config_page_router = APIRouter()


pg_config_page_router.include_router(
    pg_config_params_router, prefix="/params", tags=["pg-config-params"]
)


