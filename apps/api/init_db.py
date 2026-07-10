"""Bootstrap — create all database tables."""
import asyncio
from src.core.database import engine, Base

# Import all models so their tables are registered
from src.modules.auth.models import User  # noqa: F401


async def main():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("All tables created successfully.")


if __name__ == "__main__":
    asyncio.run(main())
