from typing import Literal, Optional
from pydantic import BaseModel, Field


class BlocksWrittenWidgetItem(BaseModel):
    value: str
    change: str

