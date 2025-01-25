from fastapi import FastAPI
from helpers import user

app = FastAPI()

@app.get("/")
def home():
    return {"message": "FastAPI PostgreSQL API"}

# Include user routes from helpers/user.py
app.include_router(user.router, prefix="/users", tags=["Users"])
