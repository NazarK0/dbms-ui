from typing import Literal, Optional
from pydantic import BaseModel, Field


class TablesCountWidgetItem(BaseModel):
    value: str
    change: str

