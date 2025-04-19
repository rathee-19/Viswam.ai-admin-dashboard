
from fastapi import FastAPI
from app.endpoints import user, dashboard
from fastapi.middleware.cors import CORSMiddleware  # Import CORSMiddleware

from app.db import init_db

app = FastAPI()

@app.on_event("startup")
async def on_startup():
    await init_db()

    
@app.get("/")
def home():
    return {"message": "FastAPI PostgreSQL API"}

# Allow requests from the frontend (change if the frontend URL changes)
origins = [
    "http://localhost:3000",  # The frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows requests from these origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Include user routes from helpers/user.py
app.include_router(user.router, prefix="/users", tags=["Users"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])