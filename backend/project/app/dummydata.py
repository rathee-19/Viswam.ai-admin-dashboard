import os
from sqlmodel import create_engine, Session
from models import User, DataCollection, Activity
from datetime import datetime, timedelta

# Database URL (replace with your actual database URL)
DATABASE_URL = os.getenv("DATABASE_URL")

# Create the engine
engine = create_engine(DATABASE_URL)

# Function to create dummy data
def create_dummy_data():
    with Session(engine) as session:
        # Create dummy users
        user1 = User(name="John Doe", email="john.doe@example.com")
        user2 = User(name="Jane Smith", email="jane.smith@example.com")
        session.add(user1)
        session.add(user2)
        session.commit()

        # Create dummy data collections for user1
        data_collection1 = DataCollection(
            user_id=user1.id,
            category="Fitness",
            points=100,
            timestamp=datetime.utcnow() - timedelta(days=2)
        )
        data_collection2 = DataCollection(
            user_id=user1.id,
            category="Nutrition",
            points=150,
            timestamp=datetime.utcnow() - timedelta(days=1)
        )
        session.add(data_collection1)
        session.add(data_collection2)

        # Create dummy data collections for user2
        data_collection3 = DataCollection(
            user_id=user2.id,
            category="Fitness",
            points=200,
            timestamp=datetime.utcnow() - timedelta(days=3)
        )
        data_collection4 = DataCollection(
            user_id=user2.id,
            category="Nutrition",
            points=250,
            timestamp=datetime.utcnow() - timedelta(days=2)
        )
        session.add(data_collection3)
        session.add(data_collection4)

        # Create dummy activities for user1
        activity1 = Activity(
            user_id=user1.id,
            activity="Running",
            timestamp=datetime.utcnow() - timedelta(days=2)
        )
        activity2 = Activity(
            user_id=user1.id,
            activity="Cycling",
            timestamp=datetime.utcnow() - timedelta(days=1)
        )
        session.add(activity1)
        session.add(activity2)

        # Create dummy activities for user2
        activity3 = Activity(
            user_id=user2.id,
            activity="Swimming",
            timestamp=datetime.utcnow() - timedelta(days=3)
        )
        activity4 = Activity(
            user_id=user2.id,
            activity="Yoga",
            timestamp=datetime.utcnow() - timedelta(days=2)
        )
        session.add(activity3)
        session.add(activity4)

        # Commit the session to save the data
        session.commit()

if __name__ == "__main__":
    create_dummy_data()
    print("Dummy data inserted successfully.")