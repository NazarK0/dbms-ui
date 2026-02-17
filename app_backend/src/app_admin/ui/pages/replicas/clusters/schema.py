from pydantic import BaseModel, Field
from typing import Literal


class ClusterServer(BaseModel):
    id: int
    name: str
    role: Literal["Primary", "Replica"]
    status: Literal["healthy", "warning", "error"]
    location: str
    host: str
    port: int
    connections: int
    replication_lag: str = Field(alias="replicationLag")
    
    class Config:
        populate_by_name = (
            True  # Allows instantiating with either "time_ago" or "timeAgo"
        )
