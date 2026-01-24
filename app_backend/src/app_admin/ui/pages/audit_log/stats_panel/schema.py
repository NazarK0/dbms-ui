from pydantic import BaseModel, Field


class ActionStats(BaseModel):
    create: int
    update: int
    delete: int
    query: int
