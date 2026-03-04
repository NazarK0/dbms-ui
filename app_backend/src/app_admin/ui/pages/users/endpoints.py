from fastapi import APIRouter
from app_admin.ui.pages.users.table.endpoints import table_router


users_page_router = APIRouter()


users_page_router.include_router(table_router, prefix="/table", tags=["users-table"])
