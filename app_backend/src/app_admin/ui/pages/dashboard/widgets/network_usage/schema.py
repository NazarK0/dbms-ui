from typing import Annotated
from pydantic import BaseModel, Field

IntClosedRange0To100 = Annotated[int, Field(ge=0, le=100)]

class NetworkUsageWidgetItem(BaseModel):
    value: IntClosedRange0To100

