# app/repositories/scrape_repo.py
from typing import List, Optional, Dict, Any
from datetime import datetime, timedelta
from app.core.database import get_scrape_results_collection
from app.utils.logger import get_logger
from bson import ObjectId

logger = get_logger(__name__)


class ScrapeRepository:
    def __init__(self, db=None):
        # db argument kept for compatibility with dependencies.py
        self.collection = get_scrape_results_collection()

    async def create(self, data: dict) -> dict:
        """Save a scraped result to MongoDB."""
        data["created_at"] = datetime.utcnow()
        data["is_active"] = data.get("is_active", True)
        result = await self.collection.insert_one(data)
        data["_id"] = str(result.inserted_id)
        return data

    async def bulk_create(self, items: List[dict]) -> List[dict]:
        """Save multiple scraped results at once."""
        now = datetime.utcnow()
        for item in items:
            item["created_at"] = now
            item["is_active"] = item.get("is_active", True)
        result = await self.collection.insert_many(items)
        logger.info(f"Bulk saved {len(result.inserted_ids)} scrape results")
        return items

    async def get_recent_by_route(
        self,
        route_id: str,
        limit: int = 10,
    ) -> List[dict]:
        """Fetch the most recent alerts for a route."""
        cursor = (
            self.collection
            .find({"route_id": route_id, "is_active": True})
            .sort("created_at", -1)
            .limit(limit)
        )
        results = []
        async for doc in cursor:
            doc["_id"] = str(doc["_id"])
            results.append(doc)
        return results

    async def get_by_source(self, source_name: str, limit: int = 20) -> List[dict]:
        cursor = (
            self.collection
            .find({"source_name": source_name})
            .sort("created_at", -1)
            .limit(limit)
        )
        results = []
        async for doc in cursor:
            doc["_id"] = str(doc["_id"])
            results.append(doc)
        return results

    async def deactivate_old(self, hours: int = 24) -> int:
        """Mark scrape results older than N hours as inactive."""
        cutoff = datetime.utcnow() - timedelta(hours=hours)
        result = await self.collection.update_many(
            {"created_at": {"$lt": cutoff}},
            {"$set": {"is_active": False}}
        )
        return result.modified_count