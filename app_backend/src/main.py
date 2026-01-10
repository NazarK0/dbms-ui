from fastapi import FastAPI
from src.app_admin.api_v1 import admin_api_router


app = FastAPI(title="DBMS API", version="0.0.1")

app.include_router(admin_api_router, prefix="/admin", tags=["admin"])

@app.get("/")
def root():
    return {"message": "Welcome to the DBMS API"}
