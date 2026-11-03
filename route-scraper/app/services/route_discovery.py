# app/services/route_discovery.py
from datetime import datetime, timezone
from app.core.database import get_routes_collection
from app.services.corridor import get_corridor


async def get_or_create_route(origin: str, destination: str, session=None) -> dict:
    """Find or create a route in MongoDB."""
    origin_n = origin.strip().title()
    dest_n = destination.strip().title()
    corridor = get_corridor(origin_n, dest_n)

    routes_col = get_routes_collection()

    existing = await routes_col.find_one({
        "origin_city": origin_n,
        "destination_city": dest_n,
        "corridor": corridor,
    })

    if existing:
        existing["_id"] = str(existing["_id"])
        return existing

    # Create new route
    new_route = {
        "origin_city": origin_n,
        "destination_city": dest_n,
        "corridor": corridor,
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
    }

    result = await routes_col.insert_one(new_route)
    new_route["_id"] = str(result.inserted_id)
    return new_route