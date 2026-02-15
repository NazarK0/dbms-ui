from pydantic import BaseModel, Field


class PgConfigParam(BaseModel):
    name: str
    value: str
    default_value: str = Field(alias="defaultValue")
    unit: str | None = None
    description: str
    requires_restart: bool = Field(alias="requiresRestart")
    category: str
    
    class Config:
        populate_by_name = (
            True  # Allows instantiating with either "time_ago" or "timeAgo"
        )

