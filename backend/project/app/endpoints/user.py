from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import User
from app.schemas import UserCreate, UserResponse
from app.db import get_session
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/get-users", response_model=list[UserResponse])
async def get_users(db: AsyncSession = Depends(get_session)):
    logger.info("get_users")
    result = await db.execute(select(User))
    users = result.scalars().all()
    return users

@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate, db: AsyncSession = Depends(get_session)):
    db_user = User(name=user.name, email=user.email)
    db.add(db_user)
    await db.commit()  # commit needs to be async for AsyncSession
    await db.refresh(db_user)  # refresh also needs to be async
    return db_user
