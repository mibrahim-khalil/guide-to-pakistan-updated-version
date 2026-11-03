# app/job/nhmp_advisory_job.py
import asyncio
import hashlib
from datetime import datetime, timezone, timedelta

from app.services.nhmp_page_scraper import fetch_nhmp_advisory_html, parse_nhmp_advisory_page
from app.services.llm_extractor import LLMExtractor
from app.repositories.route_repo import RouteRepository
from app.repositories.scrape_repo import ScrapeRepository
from app.utils.logger import get_logger

logger = get_logger(__name__)

DELAY_BETWEEN_SECTORS_SECONDS = 60


def _hash_content(content: str) -> str:
    return hashlib.sha256(content.encode("utf-8")).hexdigest()


def _sector_to_text(sector: dict) -> str:
    lines = [f"{a['text']}" for a in sector.get("alerts", [])]
    return "\n".join(lines) if lines else "Road & Weather Clear"


async def get_or_create_route_mongo(origin: str, destination: str) -> dict:
    route_repo = RouteRepository()
    existing = await route_repo.get_by_cities(origin, destination)
    if existing:
        return existing

    return await route_repo.create({
        "origin_city": origin,
        "destination_city": destination,
        "route_name": f"{origin} to {destination}",
        "is_active": True,
    })


async def run_nhmp_advisory_scrape():
    logger.info("=== NHMP full-page advisory scrape started ===")
    extractor = LLMExtractor()
    scrape_repo = ScrapeRepository()

    try:
        html = await fetch_nhmp_advisory_html()
    except Exception as e:
        logger.error(f"NHMP page fetch failed: {e}")
        return

    sectors = parse_nhmp_advisory_page(html)
    if not sectors:
        logger.warning("No sectors parsed — skipping this run")
        return

    for i, sector in enumerate(sectors):
        content = _sector_to_text(sector)
        new_hash = _hash_content(content)

        route = await get_or_create_route_mongo(sector["origin"], sector["destination"])
        route_id = route.get("_id")

        existing_list = await scrape_repo.get_recent_by_route(route_id, limit=20)
        already_exists = any(
            doc.get("source_name") == "NHMP_PAGE" and doc.get("content_hash") == new_hash
            for doc in existing_list
        )
        if already_exists:
            logger.info(f"[skip] NHMP_PAGE unchanged for {sector.get('sector_name')}")
            continue

        try:
            extracted_pairs, usage = await extractor.batch_extract(
                [{
                    "source": "NHMP_PAGE",
                    "url": "https://beta.nhmp.gov.pk/TA/Public/ViewTravel.aspx",
                    "content": content,
                    "scrape_success": True,
                }],
                route_query=f"{sector['origin']} to {sector['destination']}",
            )
        except Exception as e:
            logger.error(f"Extraction failed for {sector.get('sector_name')}: {e}")
            extracted_pairs = []

        rows = []
        for src, item in extracted_pairs:
            rows.append({
                "route_id": route_id,
                "source_name": "NHMP_PAGE",
                "source_url": src.get("url"),
                "headline": getattr(item, "headline", None),
                "route_affected": getattr(item, "route_affected", None) or f"{sector['origin']} to {sector['destination']}",
                "origin": sector.get("origin"),
                "destination": sector.get("destination"),
                "issue_type": getattr(getattr(item, "issue_type", None), "value", None) or getattr(item, "issue_type", "general"),
                "severity": getattr(getattr(item, "severity", None), "value", None) or getattr(item, "severity", "medium"),
                "raw_content": content[:3000],
                "summary": getattr(item, "summary", None),
                "content_hash": new_hash,
                "is_active": True,
                "expires_at": datetime.now(timezone.utc) + timedelta(minutes=45),
            })

        if rows:
            await scrape_repo.bulk_create(rows)

        logger.info(
            f"[{i+1}/{len(sectors)}] stored {sector.get('sector_name')} "
            f"({sector.get('origin')}->{sector.get('destination')})"
        )

        if i < len(sectors) - 1:
            await asyncio.sleep(DELAY_BETWEEN_SECTORS_SECONDS)

    logger.info("=== NHMP full-page advisory scrape finished ===")