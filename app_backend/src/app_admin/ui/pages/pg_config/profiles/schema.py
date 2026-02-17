from pydantic import BaseModel, Field


class PgConfigProfileEntry(BaseModel):
    id: str
    name: str
    description: str
    created_at: str = Field(alias="createdAt")
    parameters_count: int = Field(alias="parametersCount")
    
    class Config:
        populate_by_name = (
            True  # Allows instantiating with either "time_ago" or "timeAgo"
        )

