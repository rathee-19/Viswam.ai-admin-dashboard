from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from database import get_db
from models import User, DataCollection, Activity
from database import get_db
from datetime import datetime

router = APIRouter()

@router.get("/", response_model=list[schemas.UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@router.post("/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.put("/{user_id}", response_model=schemas.UserResponse)
def update_user(user_id: int, updated_user: schemas.UserCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.name = updated_user.name
    user.email = updated_user.email
    db.commit()
    db.refresh(user)
    return user

@router.delete("/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}


@router.get("/top-data-collectors")
def get_top_data_collectors(db: Session = Depends(get_db)):
    collectors = (
        db.query(User.name, DataCollection.points)
        .join(DataCollection, User.id == DataCollection.user_id)
        .group_by(User.id)
        .order_by(DataCollection.points.desc())
        .limit(5)
        .all()
    )
    return {"top_collectors": collectors}


@router.get("/top-point-earners")
def get_top_point_earners(db: Session = Depends(get_db)):
    earners = (
        db.query(User.name, db.func.sum(DataCollection.points).label("total_points"))
        .join(DataCollection, User.id == DataCollection.user_id)
        .group_by(User.id)
        .order_by(db.func.sum(DataCollection.points).desc())
        .limit(5)
        .all()
    )
    return {"top_point_earners": earners}


@router.get("/recent-activities")
def get_recent_activities(db: Session = Depends(get_db)):
    activities = (
        db.query(User.name, Activity.activity, Activity.timestamp)
        .join(Activity, User.id == Activity.user_id)
        .order_by(Activity.timestamp.desc())
        .limit(10)
        .all()
    )
    return {"recent_activities": activities}