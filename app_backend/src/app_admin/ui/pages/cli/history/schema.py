from typing import Literal
from pydantic import BaseModel, Field


class CliHistoryEntry(BaseModel):
    id: int
    cmd: str
    time: str



