from pydoc import cli
from app_admin.ui.pages.cli.sql_reference.endpoints import sql_reference_router
from fastapi import APIRouter
from app_admin.ui.pages.cli.terminal.endpoints import terminal_router
from app_admin.ui.pages.cli.history.endpoints import cli_history_router


cli_page_router = APIRouter()



cli_page_router.include_router(terminal_router, prefix="/terminal", tags=["cli-terminal"])
cli_page_router.include_router(sql_reference_router, prefix="/sql-reference", tags=["cli-sql-reference"])
cli_page_router.include_router(cli_history_router, prefix="/history", tags=["cli-history"])