from typing import Literal, Optional
from pydantic import BaseModel, Field


ActivityType = Literal["info", "success", "warning", "error", "unknown"]
ActivityCategory = Literal[
    "db_connection",
    "query_execution",
    "table_modification",
    "user_login",
    "unauthorized_access",
    "system_error",
]


class RecentActivityWidgetItem(BaseModel):
    id: int
    type: ActivityType
    category: ActivityCategory
    title: str
    details: Optional[str] = Field(default=None)
    time_ago: str = Field(
        alias="timeAgo"
    )  # Keep Python snake_case while accepting camelCase JSON

    class Config:
        populate_by_name = (
            True  # Allows instantiating with either "time_ago" or "timeAgo"
        )


