from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.app_admin.api_v1 import admin_api_routerV1

origins = [
    "http://localhost:3000",
]

app = FastAPI(title="DBMS API", version="0.0.1")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(admin_api_routerV1, prefix="/admin/v1", tags=["adminV1"])

@app.get("/")
def root():
    return {"message": "Welcome to the DBMS API"}
