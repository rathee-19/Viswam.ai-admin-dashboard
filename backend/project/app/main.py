
from fastapi import FastAPI
from app.endpoints import user, dashboard

app = FastAPI()

@app.get("/")
def home():
    return {"message": "FastAPI PostgreSQL API"}

# Include user routes from helpers/user.py
app.include_router(user.router, prefix="/users", tags=["Users"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])