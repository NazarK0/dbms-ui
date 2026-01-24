from pydantic import BaseModel


class AuditLogWidget(BaseModel):
    value: int
    change: str

