# app/job/scheduled_scraper.py
import asyncio
from datetime import datetime, timezone

from app.repositories.route_repo import RouteRepository
from app.repositories.scrape_repo import ScrapeRepository
from app.services.scraper import ScraperService
from app.services.graph_api_service import GraphAPIService
from app.services.llm_extractor import LLMExtractor
from app.utils.logger import get_logger

logger = get_logger(__name__)


async def run_scheduled_scrape():
    """Scheduled job: scrape sources and store results in MongoDB."""
    logger.info("=== Scheduled scrape job started ===")

    scraper = ScraperService()
    graph_api = GraphAPIService()
    extractor = LLMExtractor()
    scrape_repo = ScrapeRepository()

    try:
        try:
            from app.services.route_pipeline import scrape_extract_and_store
            await scrape_extract_and_store(
                route=None,
                scraper=scraper,
                graph_api=graph_api,
                extractor=extractor,
            )
        except Exception as pipeline_err:
            logger.warning(f"Pipeline error, running basic NHMP scrape fallback: {pipeline_err}")
            results = await scraper.scrape_route_news("islamabad", "lahore")
            for item in results:
                if not item.get("scrape_success"):
                    continue
                await scrape_repo.create({
                    "route_id": None,
                    "source_name": item.get("source", "UNKNOWN"),
                    "source_url": item.get("url", ""),
                    "raw_content": (item.get("content") or "")[:3000],
                    "headline": None,
                    "summary": None,
                    "issue_type": "general",
                    "severity": "medium",
                    "is_active": True,
                    "created_at": datetime.now(timezone.utc),
                })

        deactivated = await scrape_repo.deactivate_old(hours=24)
        logger.info(f"Deactivated {deactivated} old scrape results")

    except Exception as e:
        logger.error(f"Pipeline failed: {e}", exc_info=True)

    logger.info("=== Scheduled scrape job finished ===")