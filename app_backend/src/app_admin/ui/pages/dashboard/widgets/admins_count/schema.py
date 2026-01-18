from typing import Literal, Optional
from pydantic import BaseModel, Field


class AdminsCountWidgetItem(BaseModel):
    value: str
    change: str

