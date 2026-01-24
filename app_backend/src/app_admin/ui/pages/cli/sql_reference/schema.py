from typing import Literal
from pydantic import BaseModel, Field


class SqlReferenceEntry(BaseModel):
    id: int
    cmd: str
    description: str



