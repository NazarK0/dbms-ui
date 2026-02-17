from pydantic import BaseModel, Field


class ReplicaActivityEntry(BaseModel):
    replica: str
    state: str
    sync_state: str = Field(alias="syncState")
    sent_lsn: str = Field(alias="sentLSN")
    write_lsn: str = Field(alias="writeLSN")
    flush_lsn: str = Field(alias="flushLSN")
    lag: str
    
    class Config:
        populate_by_name = (
            True  # Allows instantiating with either "time_ago" or "timeAgo"
        )

