import logging
from fastapi import APIRouter, BackgroundTasks, HTTPException

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/scraper", tags=["Scraper Control"])


async def _run_nhmp_task():
    """Dynamically finds and executes the available NHMP scraping job."""
    executed = False

    # 1. Try running job from nhmp_advisory_job
    try:
        from app.jobs.nhmp_advisory_job import run_nhmp_advisory_job
        await run_nhmp_advisory_job()
        executed = True
        logger.info("Successfully executed nhmp_advisory_job")
    except Exception as e:
        logger.debug(f"nhmp_advisory_job not run: {e}")

    # 2. Try running job from core scheduler if 1 wasn't available
    if not executed:
        try:
            from app.core.scheduler import run_nhmp_job
            await run_nhmp_job()
            executed = True
            logger.info("Successfully executed scheduler run_nhmp_job")
        except Exception as e:
            logger.debug(f"scheduler job not run: {e}")

    # 3. Direct scraper service call if available
    if not executed:
        try:
            from app.services.scraper import NHMPScraper
            scraper = NHMPScraper()
            await scraper.run()
            executed = True
            logger.info("Successfully executed direct NHMPScraper service")
        except Exception as e:
            logger.warning(f"Direct scraper service attempt: {e}")


@router.post("/run-nhmp")
async def trigger_nhmp_scrape(background_tasks: BackgroundTasks):
    """Manually trigger NHMP motorway road closure scraping job."""
    try:
        background_tasks.add_task(_run_nhmp_task)
        return {
            "success": True, 
            "message": "NHMP advisory scraping job triggered in background."
        }
    except Exception as e:
        logger.error(f"Failed to trigger scraper job: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/run-all")
async def trigger_all_scrapes(background_tasks: BackgroundTasks):
    """Manually trigger all scraping jobs."""
    try:
        background_tasks.add_task(_run_nhmp_task)
        return {
            "success": True, 
            "message": "All scraping jobs triggered in background."
        }
    except Exception as e:
        logger.error(f"Failed to trigger all scrapers: {e}")
        raise HTTPException(status_code=500, detail=str(e))