# app/core/dependencies.py
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.core.database import get_database as _get_mongo_db
from app.services.cache_service import CacheService
from app.services.scraper import ScraperService
from app.services.weather_service import WeatherService
from app.services.rag_service import RAGService
from app.repositories.route_repo import RouteRepository
from app.repositories.scrape_repo import ScrapeRepository
from app.repositories.query_repo import QueryRepository


def get_database() -> AsyncIOMotorDatabase:
    """Dependency to get Mongo DB instance."""
    return _get_mongo_db()


def get_cache_service() -> CacheService:
    return CacheService()


def get_scraper_service() -> ScraperService:
    return ScraperService()


def get_weather_service() -> WeatherService:
    return WeatherService()


def get_rag_service() -> RAGService:
    return RAGService()


def get_route_repo() -> RouteRepository:
    return RouteRepository()


def get_scrape_repo() -> ScrapeRepository:
    return ScrapeRepository()


def get_query_repo() -> QueryRepository:
    return QueryRepository()