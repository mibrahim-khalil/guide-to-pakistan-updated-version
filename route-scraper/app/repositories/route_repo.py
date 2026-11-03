# app/repositories/route_repo.py
from typing import List, Optional
from datetime import datetime
from app.core.database import get_routes_collection
from app.utils.logger import get_logger
from bson import ObjectId

logger = get_logger(__name__)


class RouteRepository:
    def __init__(self, db=None):
        self.collection = get_routes_collection()

    async def create(self, data) -> dict:
        """Insert a new route into MongoDB."""
        # Support both Pydantic model and plain dict
        payload = data.model_dump() if hasattr(data, "model_dump") else dict(data)
        payload["created_at"] = datetime.utcnow()
        payload["is_active"] = True

        result = await self.collection.insert_one(payload)
        payload["_id"] = str(result.inserted_id)
        logger.info(f"Created route: {payload.get('origin_city')} → {payload.get('destination_city')}")
        return payload

    async def get_by_id(self, route_id: str) -> Optional[dict]:
        try:
            doc = await self.collection.find_one({"_id": ObjectId(route_id)})
            if doc:
                doc["_id"] = str(doc["_id"])
            return doc
        except Exception:
            return None

    async def get_by_cities(self, origin: str, destination: str) -> Optional[dict]:
        """Find route by origin and destination cities (case-insensitive)."""
        doc = await self.collection.find_one({
            "origin_city": {"$regex": f"^{origin}$", "$options": "i"},
            "destination_city": {"$regex": f"^{destination}$", "$options": "i"},
            "is_active": True,
        })
        if doc:
            doc["_id"] = str(doc["_id"])
        return doc

    async def get_all_active(self) -> List[dict]:
        cursor = self.collection.find({"is_active": True})
        results = []
        async for doc in cursor:
            doc["_id"] = str(doc["_id"])
            results.append(doc)
        return results

    async def update(self, route_id: str, data) -> Optional[dict]:
        payload = data.model_dump(exclude_none=True) if hasattr(data, "model_dump") else dict(data)
        result = await self.collection.find_one_and_update(
            {"_id": ObjectId(route_id)},
            {"$set": payload},
            return_document=True
        )
        if result:
            result["_id"] = str(result["_id"])
        return result

    async def delete(self, route_id: str) -> bool:
        """Soft delete."""
        result = await self.collection.update_one(
            {"_id": ObjectId(route_id)},
            {"$set": {"is_active": False}}
        )
        return result.modified_count > 0