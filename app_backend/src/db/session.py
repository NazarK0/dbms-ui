from sqlalchemy.orm import sessionmaker
from src.core.config import engine

# Створюємо Engine з підтримкою Psycopg 3


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
