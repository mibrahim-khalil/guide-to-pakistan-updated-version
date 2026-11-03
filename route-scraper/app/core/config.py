# app/core/config.py
from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from typing import List


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"  # Ignores Node.js specific variables in .env
    )

    # ── AI Keys ───────────────────────────
    GROQ_API_KEY: str = ""
    GROQ_MODEL: str = "llama-3.3-70b-versatile"
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-2.5-flash"
    GEMINI_ANSWER_MODEL: str = "gemini-2.5-flash"

    # ── App Settings ──────────────────────
    APP_NAME: str = "Pakistan Route AI"
    APP_VERSION: str = "0.1.0"
    DEBUG: bool = False
    API_PREFIX: str = "/api/v1"

    # ── MongoDB (Reads MONGODB_URI from .env) ──
    MONGODB_URI: str = "mongodb://localhost:27017"
    MONGO_DB_NAME: str = "gtp_db"

    @property
    def MONGO_URI(self) -> str:
        return self.MONGODB_URI

    # ── Redis ─────────────────────────────
    REDIS_HOST: str = "localhost"
    REDIS_PORT: int = 6379
    REDIS_DB: int = 0
    CACHE_TTL_SECONDS: int = 1800          # 30 minutes

    # ── Other APIs ────────────────────────
    SERPAPI_API_KEY: str = ""
    GOOGLE_CSE_API_KEY: str = ""
    GOOGLE_CSE_CX: str = ""
    OPENAI_API_KEY: str = ""
    OPENAI_MODEL: str = "gpt-4o-mini"
    OPENAI_ANSWER_MODEL: str = "gpt-4o"
    OPENWEATHER_API_KEY: str = ""

    # ── Qdrant (optional) ─────────────────
    QDRANT_HOST: str = "localhost"
    QDRANT_PORT: int = 6333
    QDRANT_COLLECTION: str = "pakistan_routes"

    # ── Scraping Settings ─────────────────
    SCRAPE_DELAY_SECONDS: float = 2.5
    MAX_CONCURRENT_SCRAPERS: int = 3
    SCRAPE_TIMEOUT_SECONDS: int = 30

    # ── News Sources ──────────────────────
    NEWS_SOURCES: List[str] = [
        "https://www.dawn.com",
        "https://www.geo.tv",
        "https://arynews.tv",
        "https://nhmp.gov.pk",
        "https://www.pmd.gov.pk",
        "https://tribune.com.pk",
    ]

    # ── Facebook ──────────────────────────
    GRAPH_API_VERSION: str = "v19.0"
    FB_PAGE_ID: str = ""
    FB_PAGE_ACCESS_TOKEN: str = ""


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()