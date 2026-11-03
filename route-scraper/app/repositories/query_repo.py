# app/repositories/query_repo.py
from typing import List, Optional
from datetime import datetime
from app.core.database import get_user_queries_collection
from app.utils.logger import get_logger

logger = get_logger(__name__)


class QueryRepository:
    def __init__(self, db=None):
        self.collection = get_user_queries_collection()

    async def create(self, user_query: str, route_id: Optional[str] = None) -> dict:
        doc = {
            "user_query": user_query,
            "route_id": route_id,
            "created_at": datetime.utcnow()
        }
        result = await self.collection.insert_one(doc)
        doc["_id"] = str(result.inserted_id)
        return doc

    async def get_recent(self, limit: int = 20) -> List[dict]:
        cursor = self.collection.find().sort("created_at", -1).limit(limit)
        results = []
        async for doc in cursor:
            doc["_id"] = str(doc["_id"])
            results.append(doc)
        return results