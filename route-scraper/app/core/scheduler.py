# app/core/scheduler.py
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from datetime import datetime

from app.job.scheduled_scraper import run_scheduled_scrape
from app.job.nhmp_advisory_job import run_nhmp_advisory_scrape
from app.weekly_generator import generate_weekly_report_sync
from app.utils.logger import get_logger

logger = get_logger(__name__)
scheduler = AsyncIOScheduler()


def start_scheduler():
    # ── Route scraper (every 50 min) ──────────────────────────────────────────
    scheduler.add_job(
        run_scheduled_scrape,
        trigger="interval",
        minutes=50,
        id="route_scraper",
        next_run_time=datetime.now(),  # fire once on boot for seed data; remove if you prefer delayed start
        max_instances=1,               # never let two scrape runs overlap
        coalesce=True,                 # if a run is missed, don't queue backlog runs
        replace_existing=True,
    )

    # ── NHMP advisory scrape (keep your existing cadence if you had one) ──────
    # Uncomment / adjust if you already schedule this elsewhere:
    # scheduler.add_job(
    #     run_nhmp_advisory_scrape,
    #     trigger="interval",
    #     minutes=60,
    #     id="nhmp_advisory_scraper",
    #     max_instances=1,
    #     coalesce=True,
    #     replace_existing=True,
    # )

    # ── Weekly AI Travel Report — every Sunday at 00:00 ───────────────────────
    scheduler.add_job(
        generate_weekly_report_sync,
        trigger="cron",
        day_of_week="sun",
        hour=0,
        minute=0,
        id="weekly_ai_report",
        max_instances=1,
        coalesce=True,
        replace_existing=True,
    )

    scheduler.start()
    logger.info(
        "Scheduler started: route scraper every 50 min | weekly AI report every Sunday 00:00"
    )