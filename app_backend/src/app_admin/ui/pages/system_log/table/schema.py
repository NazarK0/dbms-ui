from typing import Literal, Optional
from pydantic import BaseModel, Field


LogLevel = Literal["info", "success", "warning", "error", "unknown"]


class SystemLogTableWidgetItem(BaseModel):
    id: int
    time: str = Field(
        alias="time"
    )  # Keep Python snake_case while accepting camelCase JSON
    level: LogLevel
    source: str
    database: str
    user: str
    message: str
    details: Optional[str] = None

    class Config:
        populate_by_name = (
            True  # Allows instantiating with either "time_ago" or "timeAgo"
        )


