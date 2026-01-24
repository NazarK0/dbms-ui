from typing import Literal, Optional
from pydantic import BaseModel, Field


LogLevel = Literal["info", "success", "warning", "error", "unknown"]


class LogStats(BaseModel):
    errors: int
    warnings: int
    info: int
    success: int
