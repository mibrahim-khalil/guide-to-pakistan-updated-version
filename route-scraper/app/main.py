from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.core.config import settings
from app.core.database import connect_to_mongo, close_mongo_connection
from app.core.scheduler import start_scheduler
from app.routers import route_info, weather, health, scraper


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events for MongoDB & Scheduler."""
    # ── Startup ──────────────────────────
    print(f"🚀 Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    
    # Connect to MongoDB
    await connect_to_mongo()

    # Start Background Scheduler
    start_scheduler()
    print("✅ Background scheduler active")
    print("✅ Route scraper ready")

    yield  # App runs here

    # ── Shutdown ─────────────────────────
    await close_mongo_connection()
    print("👋 Shutting down, MongoDB connections closed.")


# ── App Instance ──────────────────────────────────────────────────────────────
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered Pakistan route news, weather & road condition API",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# ── CORS Middleware ───────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows Node backend, Vite frontends, and local testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Register Routers ──────────────────────────────────────────────────────────
app.include_router(health.router, tags=["Health"])
app.include_router(route_info.router, prefix=settings.API_PREFIX, tags=["Routes"])
app.include_router(weather.router, prefix=settings.API_PREFIX, tags=["Weather"])
app.include_router(scraper.router, prefix=settings.API_PREFIX, tags=["Scraper Control"])