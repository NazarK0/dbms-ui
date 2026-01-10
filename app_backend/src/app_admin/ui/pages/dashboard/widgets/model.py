from sqlalchemy import Column, Integer, String
from src.db.base import Base  # Base class from SQLAlchemy


class Widget(Base):
    __tablename__ = "widgets"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
