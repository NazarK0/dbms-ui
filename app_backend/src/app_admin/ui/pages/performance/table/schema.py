from typing import Literal
from pydantic import BaseModel, Field


ActionStatus = Literal["success", "failed"]


class AuditLogTableItem(BaseModel):
    id: int
    time: str
    user: str
    action: str
    category: str
    target: str
    details: str
    ip_address: str = Field(
        alias="ipAddress"
    )  # Keep Python snake_case while accepting camelCase JSON
    status: ActionStatus

    class Config:
        populate_by_name = (
            True  # Allows instantiating with either "time_ago" or "timeAgo"
        )


