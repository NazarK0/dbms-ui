from typing import Any
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """
    Base class for all SQLAlchemy models.
    Inheriting from DeclarativeBase (SQLAlchemy 2.0+) provides
    native type hinting support for Mapped and mapped_column.
    """

    id: Any
    __name__: str

    # Generate __tablename__ automatically from class name
    # e.g., class User(Base) -> __tablename__ = "user"
    @declared_attr.directive
    def __tablename__(cls) -> str:
        return cls.__name__.lower()
