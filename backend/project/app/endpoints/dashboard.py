from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.sql import func
from app.models import User, DataCollection, Activity
from app.db import get_session

router = APIRouter()

@router.get("/top-data-collectors")
async def get_top_data_collectors(db: AsyncSession = Depends(get_session)):
    result = await db.execute(
        select(User.name, DataCollection.points)
        .join(DataCollection, User.id == DataCollection.user_id)
        .group_by(User.id, DataCollection.points)
        .order_by(DataCollection.points.desc())
        .limit(5)
    )
    collectors = result.all()
    return {"top_collectors": collectors}

@router.get("/top-point-earners")
async def get_top_point_earners(db: AsyncSession = Depends(get_session)):
    result = await db.execute(
        select(User.name, func.sum(DataCollection.points).label("total_points"))
        .join(DataCollection, User.id == DataCollection.user_id)
        .group_by(User.id)
        .order_by(func.sum(DataCollection.points).desc())
        .limit(5)
    )
    earners = result.all()
    return {"top_point_earners": earners}

@router.get("/recent-activities")
async def get_recent_activities(db: AsyncSession = Depends(get_session)):
    result = await db.execute(
        select(User.name, Activity.activity, Activity.timestamp)
        .join(Activity, User.id == Activity.user_id)
        .order_by(Activity.timestamp.desc())
        .limit(10)
    )
    activities = result.all()
    return {"recent_activities": activities}

@router.get("/total-data-collected")
async def get_total_data_collected(db: AsyncSession = Depends(get_session)):
    result = await db.execute(select(func.sum(DataCollection.points)))
    total_points = result.scalar() or 0
    return {"total_data_collected": total_points}

@router.get("/top-data-categories")
async def get_top_data_categories(db: AsyncSession = Depends(get_session)):
    result = await db.execute(
        select(DataCollection.category, func.sum(DataCollection.points).label("total_points"))
        .group_by(DataCollection.category)
        .order_by(func.sum(DataCollection.points).desc())
        .limit(5)
    )
    categories = result.all()
    
    # Format response as a list of dictionaries
    return {"categories": [{"name": cat, "value": points} for cat, points in categories]}
