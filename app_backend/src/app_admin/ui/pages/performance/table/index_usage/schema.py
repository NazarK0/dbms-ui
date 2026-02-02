from typing import Literal
from pydantic import BaseModel, Field


ActionStatus = Literal["success", "failed"]


class IndexUsageEntry(BaseModel):
    database: str
    schema: str
    table: str
    index: str
    size: str
    scans: int
    rows_read: int = Field(
        alias="rowsRead"
    )  # Keep Python snake_case while accepting camelCase JSON
    usage: int

    class Config:
        populate_by_name = (
            True  # Allows instantiating with either "time_ago" or "timeAgo"
        )


