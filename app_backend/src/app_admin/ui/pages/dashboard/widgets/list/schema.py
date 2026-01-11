from typing import Literal, Optional
from pydantic import BaseModel, Field


WidgetCategory = Literal[
    "statistic",
    "performance",
    "activity",
]


class WidgetItem(BaseModel):
    id: int
    category: WidgetCategory
    categoryTitle: str
    title: str
    description: str
    

