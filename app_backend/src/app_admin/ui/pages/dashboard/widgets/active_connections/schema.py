from typing import Literal, Optional
from pydantic import BaseModel, Field


class ActiveConnectionsWidgetItem(BaseModel):
    id: int
    name: str
    user: Optional[str] = Field(default=None)
    status: Literal["АКТИВНИЙ", "ОЧІКУЄ"]
    duration: str
    requests: int

