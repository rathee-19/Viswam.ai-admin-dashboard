import asyncio
from app.db import init_db, get_session
from app.models import User, DataCollection, Activity

async def populate():
    # Ensure the tables are created
    await init_db()

    async with get_session() as session:
        # Create sample users
        alice = User(name="Alice", email="alice@example.com")
        bob = User(name="Bob", email="bob@example.com")
        session.add_all([alice, bob])
        await session.commit()
        # Refresh to get the auto-generated IDs
        await session.refresh(alice)
        await session.refresh(bob)

        # Create sample data collections
        dc1 = DataCollection(user_id=alice.id, category="Image", points=50)
        dc2 = DataCollection(user_id=bob.id, category="Video", points=70)

        # Create sample activities
        act1 = Activity(user_id=alice.id, activity="Logged in")
        act2 = Activity(user_id=bob.id, activity="Uploaded file")

        session.add_all([dc1, dc2, act1, act2])
        await session.commit()
        print("Database populated successfully!")

if __name__ == '__main__':
    asyncio.run(populate())
