import logging
from typing import Optional, Any
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from pydantic import BaseModel
from bson import ObjectId

from app.core.database import get_db

logger = logging.getLogger(__name__)

router = APIRouter()


def sanitize_mongo_doc(doc: Any) -> Any:
    """Recursively clean MongoDB documents for JSON serialization."""
    if doc is None:
        return None
    if isinstance(doc, dict):
        cleaned = {}
        for k, v in doc.items():
            if k == "_id":
                continue  # strip out Mongo's internal ObjectId
            cleaned[k] = sanitize_mongo_doc(v)
        return cleaned
    elif isinstance(doc, list):
        return [sanitize_mongo_doc(item) for item in doc]
    elif isinstance(doc, ObjectId):
        return str(doc)
    elif isinstance(doc, datetime):
        return doc.isoformat()
    return doc


class RouteQueryRequest(BaseModel):
    origin: Optional[str] = None
    destination: Optional[str] = None
    query_type: Optional[str] = "all"
    message: Optional[str] = None


@router.post("/route/info")
async def get_route_information(
    req: RouteQueryRequest,
    background_tasks: BackgroundTasks,
    db=Depends(get_db)
):
    """Get route condition, weather, and AI advisory."""
    try:
        origin = req.origin
        destination = req.destination

        # 1. Parse user query safely if message is provided
        if req.message or not (origin and destination):
            try:
                from app.services.query_parser import QueryParserService
                query_parser = QueryParserService()
                parsed = None
                text_to_parse = req.message or f"from {origin or ''} to {destination or ''}"

                if hasattr(query_parser, "parse"):
                    try:
                        parsed = query_parser.parse(text_to_parse)
                    except TypeError:
                        try:
                            parsed = query_parser.parse(query=text_to_parse)
                        except TypeError:
                            parsed = None

                if isinstance(parsed, dict):
                    origin = origin or parsed.get("origin")
                    destination = destination or parsed.get("destination")
                elif hasattr(parsed, "origin") and hasattr(parsed, "destination"):
                    origin = origin or getattr(parsed, "origin", None)
                    destination = destination or getattr(parsed, "destination", None)
            except Exception as parse_err:
                logger.warning(f"Query parser fallback: {parse_err}")

        origin = origin or "Islamabad"
        destination = destination or "Murree"

        # 2. Check MongoDB Cache (user_queries)
        if db is not None:
            try:
                cached = await db["user_queries"].find_one({
                    "origin": {"$regex": f"^{origin}$", "$options": "i"},
                    "destination": {"$regex": f"^{destination}$", "$options": "i"}
                }, sort=[("timestamp", -1)])

                if cached and "response" in cached:
                    logger.info(f"user_queries cache hit for {origin}->{destination}")
                    clean_data = sanitize_mongo_doc(cached["response"])
                    return {
                        "success": True,
                        "message": "Route information fetched successfully",
                        "data": clean_data,
                        "error": None
                    }
            except Exception as e:
                logger.warning(f"Cache lookup failed: {e}")

        # 3. Process fresh route query via pipeline
        from app.services.route_pipeline import RoutePipelineService
        pipeline = RoutePipelineService(db=db)
        result = await pipeline.process_route_query(
            origin=origin,
            destination=destination,
            query_type=req.query_type or "all"
        )

        clean_result = sanitize_mongo_doc(result if isinstance(result, dict) else result.model_dump())

        # 4. Save to MongoDB asynchronously in background
        if db is not None:
            background_tasks.add_task(
                save_query_to_db,
                db,
                origin,
                destination,
                clean_result
            )

        return {
            "success": True,
            "message": "Route information fetched successfully",
            "data": clean_result,
            "error": None
        }

    except Exception as e:
        logger.error(f"Error processing route query: {e}", exc_info=True)
        return {
            "success": False,
            "message": "Failed to retrieve route information",
            "data": None,
            "error": str(e)
        }


async def save_query_to_db(db, origin: str, destination: str, response_data: dict):
    """Background task to save query result to MongoDB."""
    try:
        await db["user_queries"].insert_one({
            "origin": origin,
            "destination": destination,
            "response": response_data,
            "timestamp": datetime.utcnow().isoformat()
        })
        logger.info(f"Saved query to DB for {origin}->{destination}")
    except Exception as e:
        logger.error(f"Failed to save query to DB: {e}")


@router.get("/routes")
async def get_all_routes(db=Depends(get_db)):
    """Fetch all stored route records from MongoDB."""
    try:
        if db is None:
            return {"success": True, "data": []}

        cursor = db["routes"].find().limit(50)
        routes = await cursor.to_list(length=50)
        clean_routes = sanitize_mongo_doc(routes)
        return {"success": True, "data": clean_routes}
    except Exception as e:
        logger.error(f"Error fetching routes: {e}")
        raise HTTPException(status_code=500, detail=str(e))