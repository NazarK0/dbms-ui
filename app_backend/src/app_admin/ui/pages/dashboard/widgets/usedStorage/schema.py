from typing import Literal, Optional
from pydantic import BaseModel, Field


class UsedStorageWidgetItem(BaseModel):
    value: str
    change: str

