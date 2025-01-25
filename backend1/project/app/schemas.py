from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List

# User Schema
class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int

    class Config:
        from_attributes = True

# Data Collection Schema
class DataCollectionBase(BaseModel):
    category: str
    points: int

class DataCollectionCreate(DataCollectionBase):
    pass

class DataCollectionResponse(DataCollectionBase):
    id: int
    user_id: int
    timestamp: datetime

    class Config:
        from_attributes = True

# Activity Schema
class ActivityBase(BaseModel):
    activity: str

class ActivityCreate(ActivityBase):
    pass

class ActivityResponse(ActivityBase):
    id: int
    user_id: int
    timestamp: datetime

    class Config:
        from_attributes = True

# Responses for API Functionalities
class TopCollectorResponse(BaseModel):
    name: str
    total_points: int

class RecentActivityResponse(BaseModel):
    name: str
    activity: str
    timestamp: datetime
