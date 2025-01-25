import os
from sqlmodel import SQLModel, create_engine
from sqlmodel.ext.asyncio.session import AsyncSession, AsyncEngine
from sqlalchemy.orm import sessionmaker

# Load database URL from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

# Create Async Engine
engine = AsyncEngine(create_engine(DATABASE_URL, echo=True, future=True))

# Create Session
async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# Initialize Database
async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

# Dependency to get session
async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session
