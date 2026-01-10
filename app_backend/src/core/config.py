from pydantic import Field, computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy.engine import URL
from sqlalchemy import create_engine


# import os
# print(f"Поточна директорія: {os.getcwd()}")
# print(f"Змінна DB_USER: {os.getenv('DB_USER')}")
# print(f"Змінна DB_PASSWORD: {os.getenv('DB_PASSWORD')}")
# print(f"Змінна DB_HOST: {os.getenv('DB_HOST')}")
# print(f"Змінна DB_PORT: {os.getenv('DB_PORT')}")
# print(f"Змінна DB_NAME: {os.getenv('DB_NAME')}")

class Settings(BaseSettings):
    db_user: str = Field(alias="DB_USER")
    db_pass: str = Field(alias="DB_PASSWORD")
    db_host: str = Field(alias="DB_HOST", default="localhost")
    db_port: int = Field(alias="DB_PORT", default=5432)
    db_name: str = Field(alias="DB_NAME")

    model_config = SettingsConfigDict(case_sensitive=False)

    @computed_field
    @property
    def database_url(self) -> URL:
        return URL.create(
            drivername="postgresql+psycopg",
            username=self.db_user,
            password=self.db_pass,
            host=self.db_host,
            port=self.db_port,
            database=self.db_name,
        )


# Використання
settings = Settings()
engine = create_engine(settings.database_url)
