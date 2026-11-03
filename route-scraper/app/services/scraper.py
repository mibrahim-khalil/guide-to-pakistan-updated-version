# app/services/scraper.py
import asyncio
import json
from typing import List, Dict, Any
from datetime import datetime, timezone
import aiohttp
from bs4 import BeautifulSoup

from app.core.config import settings
from app.utils.logger import get_logger
from app.utils.rate_limiter import RateLimiter

logger = get_logger(__name__)

SERPAPI_ENDPOINT = "https://serpapi.com/search.json"
NHMP_API_BASE = "http://cpo.nhmp.gov.pk:6788"
NHMP_API_ENDPOINT = f"{NHMP_API_BASE}/api/TravelAdvisory/FilteredAdvisory"
NHMP_HTML_URL = "https://beta.nhmp.gov.pk/TA/Public/ViewTravel.aspx"

GB_KKH_KEYWORDS = {"skardu", "gilgit", "hunza", "gb", "kkh", "astore", "baltistan"}

DEFAULT_HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


class ScraperService:
    def __init__(self):
        self.rate_limiter = RateLimiter(max_calls=1, period=settings.SCRAPE_DELAY_SECONDS)
        self.serpapi_key = getattr(settings, "SERPAPI_API_KEY", "") or getattr(settings, "SERPAPI_KEY", "")

    def _build_serp_queries(self, origin: str, destination: str) -> List[Dict[str, str]]:
        o_d = f"{origin} {destination}".lower()
        base_rd = f"{origin} {destination} road closed landslide blocked"

        queries = [
            {
                "label": "fb_general_search",
                "q": f'site:facebook.com ({origin} OR {destination} OR "Karakoram Highway" OR "Jaglot Skardu Road") (blocked OR closed OR landslide)'
            },
            {
                "label": "kkh_gbdma_specific",
                "q": f'site:facebook.com ("KKH Updates" OR "Gilgit-Baltistan Disaster Management" OR SOST) {destination} road'
            }
        ]

        if any(k in o_d for k in ["skardu", "gilgit", "hunza", "jaglot"]):
            queries.append({
                "label": "northern_roads",
                "q": f'"Karakoram Highway" OR "Jaglot Skardu Road" OR "S-1" OR Jutal OR "Goro Jaglot" landslide closed'
            })

        queries.append({"label": "google_news", "q": base_rd})
        return queries

    def _empty_result(self, src, err):
        return {"source": src, "url": "", "content": "", "scrape_success": False, "error": err}

    async def _fetch_nhmp_direct(self) -> Dict[str, Any]:
        params = {"network": "All", "road": "All", "section": "All", "filter": "true"}
        try:
            async with aiohttp.ClientSession(headers=DEFAULT_HEADERS) as session:
                async with session.get(NHMP_API_ENDPOINT, params=params, timeout=10) as resp:
                    if resp.status == 200:
                        data = await resp.json()
                        return {
                            "source": "NHMP_API",
                            "url": "http://cpo.nhmp.gov.pk:6789/TravelAdvisory/TravelAdvisory",
                            "content": json.dumps(data),
                            "scrape_success": True,
                            "error": None
                        }
                    return self._empty_result("NHMP_API", f"HTTP {resp.status}")
        except Exception as e:
            return self._empty_result("NHMP_API", str(e))

    async def _fetch_serpapi(self, query: str, label: str) -> Dict[str, Any]:
        if not self.serpapi_key:
            return self._empty_result(label, "SERPAPI_API_KEY missing")

        params = {
            "engine": "google",
            "q": query,
            "location": "Pakistan",
            "gl": "pk",
            "hl": "en",
            "num": 10,
            "api_key": self.serpapi_key
        }
        try:
            async with aiohttp.ClientSession(headers=DEFAULT_HEADERS) as session:
                async with session.get(SERPAPI_ENDPOINT, params=params, timeout=15) as resp:
                    if resp.status != 200:
                        return self._empty_result(label, f"SerpAPI HTTP {resp.status}")
                    data = await resp.json()
                    organic = data.get("organic_results", [])
                    if not organic:
                        return self._empty_result(label, f"No results for: {query}")

                    blocks = []
                    for r in organic[:8]:
                        blocks.append(
                            f"Title: {r.get('title')}\n"
                            f"Link: {r.get('link')}\n"
                            f"Date: {r.get('date', 'N/A')}\n"
                            f"Snippet: {r.get('snippet')}\n"
                        )
                    content = "\n---\n".join(blocks)
                    logger.info(f"[SerpAPI:{label}] found {len(organic)} results")
                    return {
                        "source": f"SERPAPI_{label}",
                        "url": f"google search: {query}",
                        "content": content,
                        "scrape_success": True,
                        "error": None
                    }
        except Exception as e:
            logger.error(f"SerpAPI error {label}: {e}")
            return self._empty_result(label, str(e))

    async def scrape_nhmp_html(self) -> List[Dict[str, Any]]:
        """Scrape NHMP HTML travel advisory directly via HTTP GET."""
        try:
            async with aiohttp.ClientSession(headers=DEFAULT_HEADERS) as session:
                async with session.get(NHMP_HTML_URL, timeout=15) as resp:
                    if resp.status == 200:
                        html = await resp.text()
                        if len(html) > 500:
                            return [{
                                "source": "NHMP_HTML",
                                "url": NHMP_HTML_URL,
                                "content": html,
                                "scrape_success": True,
                                "error": None,
                                "post_created_at": datetime.now(timezone.utc).isoformat(),
                            }]
                    return [self._empty_result("NHMP_HTML", f"HTTP {resp.status} or short content")]
        except Exception as e:
            logger.error(f"NHMP HTML scrape failed: {e}")
            return [self._empty_result("NHMP_HTML", str(e))]

    async def serpapi(self, origin: str, destination: str) -> List[Dict[str, Any]]:
        serp_queries = self._build_serp_queries(origin, destination)
        serp_tasks = [self._fetch_serpapi(q["q"], q["label"]) for q in serp_queries]
        results = await asyncio.gather(*serp_tasks)
        return results

    async def scrape_route_news(self, origin: str, destination: str) -> List[Dict[str, Any]]:
        results = []
        results.append(await self._fetch_nhmp_direct())
        return results