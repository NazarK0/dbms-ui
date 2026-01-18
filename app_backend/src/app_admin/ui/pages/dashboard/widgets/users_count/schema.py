from typing import Literal, Optional
from pydantic import BaseModel, Field


class UsersCountWidgetItem(BaseModel):
    value: str
    change: str

