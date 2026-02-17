from typing import Literal, Optional
from pydantic import BaseModel, Field


class BlocksFromDiskWidgetItem(BaseModel):
    value: str
    change: str

