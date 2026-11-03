import logging
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

logger = logging.getLogger(__name__)

client: AsyncIOMotorClient = None
db = None


async def connect_to_mongo():
    """Establish connection to MongoDB Atlas / Local instance."""
    global client, db
    try:
        client = AsyncIOMotorClient(settings.MONGODB_URI)
        db = client[settings.MONGO_DB_NAME]
        # Ping MongoDB to confirm connection
        await db.command("ping")
        logger.info(f"✅ Connected to MongoDB: {settings.MONGO_DB_NAME}")
    except Exception as e:
        logger.error(f"❌ Failed to connect to MongoDB: {e}")


async def close_mongo_connection():
    """Close MongoDB client connection."""
    global client
    if client:
        client.close()
        logger.info("MongoDB connection closed.")


def get_db():
    """Dependency getter for FastAPI endpoints."""
    global db
    return db


def get_database():
    """Getter alias for modules importing 'get_database'."""
    global db
    if db is None:
        c = AsyncIOMotorClient(settings.MONGODB_URI)
        return c[settings.MONGO_DB_NAME]
    return db


# ── MongoDB Collection Getters ────────────────────────────────────────────────

def get_routes_collection():
    global db
    if db is None:
        c = AsyncIOMotorClient(settings.MONGODB_URI)
        return c[settings.MONGO_DB_NAME]["routes"]
    return db["routes"]


def get_scrape_results_collection():
    global db
    if db is None:
        c = AsyncIOMotorClient(settings.MONGODB_URI)
        return c[settings.MONGO_DB_NAME]["scrape_results"]
    return db["scrape_results"]


def get_user_queries_collection():
    global db
    if db is None:
        c = AsyncIOMotorClient(settings.MONGODB_URI)
        return c[settings.MONGO_DB_NAME]["user_queries"]
    return db["user_queries"]


def get_nhmp_closures_collection():
    global db
    if db is None:
        c = AsyncIOMotorClient(settings.MONGODB_URI)
        return c[settings.MONGO_DB_NAME]["nhmp_closures"]
    return db["nhmp_closures"]