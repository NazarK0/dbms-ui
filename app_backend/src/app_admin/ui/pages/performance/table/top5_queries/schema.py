from typing import Literal
from pydantic import BaseModel, Field


ActionStatus = Literal["success", "failed"]


class QueryStatEntry(BaseModel):
    query: str
    calls: int
    total_time: str = Field(
        alias = "totalTime"
    )
    avg_time: str = Field(
        alias = "avgTime"
    )
    min_time: str = Field(
        alias = "minTime"
    )
    max_time: str = Field(
        alias = "maxTime"
    )
    rows: int
    hit_ratio: float = Field(
        alias="hitRatio"
    )  # Keep Python snake_case while accepting camelCase JSON

    class Config:
        populate_by_name = (
            True  # Allows instantiating with either "time_ago" or "timeAgo"
        )


