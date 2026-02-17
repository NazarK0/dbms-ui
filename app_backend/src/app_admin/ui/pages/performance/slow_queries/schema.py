from pydantic import BaseModel, Field


class SlowQueryDetail(BaseModel):
    query: str
    avg_time: str= Field(alias="avgTime")
    calls: int
    recommendation: str
    impact: str
    
    class Config:
        populate_by_name = (
            True  # Allows instantiating with either "time_ago" or "timeAgo"
        )
