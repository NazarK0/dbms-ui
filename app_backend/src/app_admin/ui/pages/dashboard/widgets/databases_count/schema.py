from typing import Literal, Optional
from pydantic import BaseModel, Field


class DatabasesCountWidgetItem(BaseModel):
    value: str
    change: str

