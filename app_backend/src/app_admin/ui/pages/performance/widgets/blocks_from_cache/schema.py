from typing import Literal, Optional
from pydantic import BaseModel, Field


class BlocksFromCacheWidgetItem(BaseModel):
    value: str
    change: str

