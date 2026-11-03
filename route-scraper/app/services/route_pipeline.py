# app/services/route_pipeline.py
import hashlib
import json
import asyncio
import re
from datetime import datetime, timezone, timedelta
from typing import List, Dict, Any, Tuple, Optional

from app.core.database import (
    get_scrape_results_collection,
    get_nhmp_closures_collection,
)
from app.services.scraper import ScraperService
from app.services.graph_api_service import GraphAPIService
from app.services.llm_extractor import LLMExtractor
from app.services.corridor import get_corridor, is_relevant_post
from app.services.nhmp_html_scraper import parse_nhmp_html
from app.utils.logger import get_logger

logger = get_logger(__name__)

GB_KEYWORDS = ["skardu", "gilgit", "hunza", "kkh", "karakoram", "astore", "northern"]


def _hash_content(content: str) -> str:
    return hashlib.sha256(content.encode("utf-8")).hexdigest()


def is_gb_route(origin: str, destination: str) -> bool:
    o, d = origin.lower(), destination.lower()
    return any(k in o or k in d for k in GB_KEYWORDS)


def _parse_iso(date_str: str) -> Optional[datetime]:
    if not date_str:
        return None
    try:
        return datetime.fromisoformat(date_str)
    except (ValueError, TypeError):
        return None


def extract_nhmp(raw: dict) -> List[Dict[str, Any]]:
    try:
        api_response = json.loads(raw['content'])
        data_list = api_response.get('data', [])
    except (json.JSONDecodeError, KeyError):
        return []

    cutoff_date = datetime.utcnow() - timedelta(days=7)
    allowed_types = {'Road Closed', 'Weather Alert', 'Road Diversion'}

    valid = [item for item in data_list if item.get('type') in allowed_types]
    valid.sort(key=lambda x: _parse_iso(x.get('createdOn', '')) or datetime.min, reverse=True)

    items = []
    for alert in valid:
        reported_at = _parse_iso(alert.get('createdOn', ''))
        if not reported_at or reported_at < cutoff_date:
            continue

        route_str = alert.get('route', '')
        parts = route_str.split('to')
        origin_name = parts[0].strip() if len(parts) == 2 else 'Unknown'
        dest_name = parts[1].strip() if len(parts) == 2 else 'Unknown'

        alert_json = json.dumps(alert, sort_keys=True)

        items.append({
            'source_type': 'NHMP_API',
            'origin': origin_name,
            'destination': dest_name,
            'alert_type': alert.get('type'),
            'sub_type': alert.get('subType'),
            'route_label': route_str,
            'from_place': alert.get('fromPlace'),
            'to_place': alert.get('toPlace'),
            'reported_at': reported_at,
            'lane_closure': alert.get('laneClosure'),
            'remarks': alert.get('remarks'),
            'raw_content': alert_json,
            'individual_hash': _hash_content(alert_json),
        })

    return items


def extract_text_source(raw: dict) -> List[Dict[str, Any]]:
    content = (raw.get("content") or "").strip()
    if len(content) < 10:
        return []

    meta = _extract_text_source_metadata(content)
    return [{
        "source_type": raw["source"],
        "raw_content": content,
        "url": raw.get("url"),
        "reported_at": _parse_iso(
            raw.get("post_created_at") or raw.get("reported_at") or ""
        ),
        **meta,
    }]


def extract_nhmp_html(raw: dict) -> List[Dict[str, Any]]:
    html = raw.get("content", "")
    if not html:
        return []
    return parse_nhmp_html(html)


SOURCE_EXTRACTORS: Dict[str, Any] = {
    "NHMP_API": extract_nhmp,
    "NHMP_HTML": extract_nhmp_html,
}
DEFAULT_EXTRACTOR = extract_text_source


ROUTE_KEYWORD_MAP: Dict[str, Dict[str, str]] = {
    "karakoram highway": {"origin": "Islamabad", "destination": "Gilgit", "route": "Karakoram Highway (N-35)"},
    "kkh": {"origin": "Islamabad", "destination": "Gilgit", "route": "Karakoram Highway (N-35)"},
    "n-35": {"origin": "Islamabad", "destination": "Gilgit", "route": "Karakoram Highway (N-35)"},
    "jaglot skardu": {"origin": "Jaglot", "destination": "Skardu", "route": "Jaglot-Skardu Road (S-1)"},
    "babusar": {"origin": "Naran", "destination": "Gilgit", "route": "Babusar Pass / N-15"},
    "m-2": {"origin": "Lahore", "destination": "Islamabad", "route": "M-2 Motorway"},
    "m-1": {"origin": "Islamabad", "destination": "Peshawar", "route": "M-1 Motorway"},
    "m-15": {"origin": "Burhan", "destination": "Thakot", "route": "M-15 Motorway"},
}

ISSUE_KEYWORDS: List[Tuple[str, str]] = [
    ("landslide", "blockage"),
    ("blocked", "blockage"),
    ("closed", "incident"),
    ("flood", "blockage"),
    ("rain", "weather"),
    ("fog", "weather"),
    ("snow", "weather"),
    ("accident", "accident"),
]

SEVERITY_KEYWORDS: List[Tuple[str, str]] = [
    ("blocked", "high"),
    ("landslide", "high"),
    ("closed", "high"),
    ("flood", "high"),
    ("rain", "medium"),
    ("fog", "medium"),
    ("snow", "medium"),
]


def _normalise(text: str) -> str:
    text = text.lower()
    text = re.sub(r'[\u2013\u2014\u2012\u2015]', ' ', text)
    return re.sub(r'\s+', ' ', text)


def _extract_text_source_metadata(content: str) -> Dict[str, Any]:
    normalised = _normalise(content)

    matched_route: Optional[Dict[str, str]] = None
    for keyword in sorted(ROUTE_KEYWORD_MAP.keys(), key=len, reverse=True):
        if _normalise(keyword) in normalised:
            matched_route = ROUTE_KEYWORD_MAP[keyword]
            break

    origin = matched_route["origin"] if matched_route else None
    destination = matched_route["destination"] if matched_route else None
    route_label = matched_route["route"] if matched_route else None

    issue_type = "general"
    for kw, itype in ISSUE_KEYWORDS:
        if _normalise(kw) in normalised:
            issue_type = itype
            break

    severity = "medium"
    for kw, sev in SEVERITY_KEYWORDS:
        if _normalise(kw) in normalised:
            severity = sev
            break

    headline = ""
    for line in content.splitlines():
        clean = re.sub(r'[*#_`]', '', line).strip()
        if len(clean) > 10:
            headline = clean[:150]
            break

    return {
        "origin": origin,
        "destination": destination,
        "route_label": route_label,
        "issue_type": issue_type,
        "severity": severity,
        "headline": headline,
    }


async def fetch_raw_sources(origin: str, destination: str, scraper: ScraperService, graph_api: GraphAPIService):
    results = []

    try:
        results.extend(await scraper.scrape_nhmp_html())
    except Exception as e:
        logger.error(f"NHMP HTML scrape failed: {e}")

    try:
        results.extend(await scraper.scrape_route_news(origin, destination))
    except Exception as e:
        logger.error(f"NHMP API scrape failed: {e}")

    try:
        fb_results = await graph_api.fetch_recent_posts(limit=5)
        corridor = get_corridor(origin, destination)
        fb_results = [
            r for r in fb_results
            if is_relevant_post(r.get("content", ""), origin, destination, corridor)
        ]
        results.extend(fb_results)
    except Exception as e:
        logger.error(f"Graph API fetch failed: {e}")

    try:
        results.extend(await scraper.serpapi(origin, destination))
    except Exception as e:
        logger.error(f"SERPAPI failed: {e}")

    return results


async def batch_extract(scraped_results: List[dict]) -> List[Tuple[dict, Dict[str, Any]]]:
    extracted_pairs: List[Tuple[dict, Dict[str, Any]]] = []

    for raw in scraped_results:
        if not raw.get("scrape_success") or not raw.get("content"):
            continue

        source_name = raw.get("source", "")
        extractor = SOURCE_EXTRACTORS.get(source_name, DEFAULT_EXTRACTOR)

        items = extractor(raw)
        for item in items:
            extracted_pairs.append((raw, item))

    return extracted_pairs


def _build_scrape_result_doc(route_id: Optional[str], raw: dict, extracted: Dict[str, Any], content_hash: str) -> dict:
    source_type = extracted.get("source_type", raw.get("source", "unknown"))

    if source_type == "NHMP_API":
        lane = extracted.get("lane_closure", "")
        closed_count = lane.count("true") if lane else 0
        severity = "high" if closed_count >= 2 else ("medium" if closed_count == 1 else "low")

        alert_type = extracted.get("alert_type", "")
        sub_type = extracted.get("sub_type", "")
        if alert_type == "Road Closed" and sub_type == "Repair":
            issue_type = "construction"
        elif alert_type == "Road Closed":
            issue_type = "incident"
        elif alert_type == "Weather Alert":
            issue_type = "weather"
        else:
            issue_type = "general"

        return {
            "route_id": route_id,
            "source_name": source_type,
            "source_url": raw.get("url") or "",
            "headline": f"{alert_type}: {extracted.get('route_label', '')}",
            "route_affected": extracted.get("route_label"),
            "origin": extracted.get("origin"),
            "destination": extracted.get("destination"),
            "issue_type": issue_type,
            "severity": severity,
            "summary": f"{alert_type} on {extracted.get('route_label', 'route')} ({extracted.get('from_place', '')} to {extracted.get('to_place', '')})",
            "raw_content": extracted.get("raw_content") or raw.get("content", ""),
            "content_hash": content_hash,
            "is_active": True,
            "expires_at": datetime.now(timezone.utc) + timedelta(hours=24),
            "created_at": datetime.now(timezone.utc),
        }

    return {
        "route_id": route_id,
        "source_name": source_type,
        "source_url": extracted.get("url") or raw.get("url") or "",
        "headline": extracted.get("headline") or "",
        "route_affected": extracted.get("route_label") or "",
        "origin": extracted.get("origin"),
        "destination": extracted.get("destination"),
        "issue_type": extracted.get("issue_type", "general"),
        "severity": extracted.get("severity", "medium"),
        "summary": extracted.get("raw_content", ""),
        "raw_content": extracted.get("raw_content", ""),
        "content_hash": content_hash,
        "is_active": True,
        "expires_at": datetime.now(timezone.utc) + timedelta(hours=24),
        "created_at": datetime.now(timezone.utc),
    }


async def scrape_extract_and_store(
        route: Optional[dict],
        scraper: ScraperService,
        graph_api: GraphAPIService,
        extractor: LLMExtractor,
        session=None,
        commit: bool = True,
) -> Tuple[List[Dict[str, Any]], int]:

    origin = "All"
    destination = "All"
    route_id = route.get("_id") if route else None

    raw_results = await fetch_raw_sources(origin, destination, scraper, graph_api)
    structured_items: List[Dict[str, Any]] = []
    to_extract: List[dict] = []

    scrape_col = get_scrape_results_collection()
    nhmp_col = get_nhmp_closures_collection()

    for raw in raw_results:
        if not raw.get("scrape_success") or not raw.get("content"):
            continue

        content = raw["content"]
        new_hash = _hash_content(content)

        existing = await scrape_col.find_one({
            "content_hash": new_hash,
            "is_active": True,
        })
        if existing:
            continue

        min_len = 15 if raw["source"] == "own_fb_page" else 30
        if len(content.strip()) < min_len:
            continue

        to_extract.append(raw)

    if not to_extract:
        return structured_items, 0

    extracted_pairs = await batch_extract(to_extract)

    for raw, extracted in extracted_pairs:
        new_hash = extracted.get("individual_hash") or _hash_content(raw["content"])

        existing_check = await scrape_col.find_one({
            "content_hash": new_hash,
            "is_active": True,
        })
        if existing_check:
            continue

        if extracted.get("source_type") == "NHMP_API":
            await nhmp_col.insert_one({
                "origin": extracted.get("origin", origin),
                "destination": extracted.get("destination", destination),
                "source": raw["source"],
                "alert_type": extracted.get("alert_type"),
                "sub_type": extracted.get("sub_type"),
                "route_label": extracted.get("route_label"),
                "from_place": extracted.get("from_place"),
                "to_place": extracted.get("to_place"),
                "remarks": extracted.get("remarks"),
                "lane_closure": extracted.get("lane_closure"),
                "reported_at": extracted.get("reported_at"),
                "content_hash": new_hash,
                "created_at": datetime.now(timezone.utc),
            })

        doc = _build_scrape_result_doc(route_id, raw, extracted, new_hash)
        await scrape_col.insert_one(doc)

        structured_items.append({
            "source": raw["source"],
            "headline": doc["headline"],
            "route": doc["route_affected"],
            "from_db": False,
        })

    return structured_items, 0


# ── Pipeline Class required by route_info.py ──────────────────────────────────

class RoutePipelineService:
    def __init__(self, db=None):
        self.db = db

    async def process_route_query(self, origin: str, destination: str, query_type: str = "all") -> Dict[str, Any]:
        """Process a route query by fetching weather, DB alerts, and generating AI advisory."""
        start_time = datetime.now(timezone.utc)

        # 1. Fetch Weather
        weather_origin = await self._get_weather(origin)
        weather_destination = await self._get_weather(destination)

        # 2. Query MongoDB for active closures/alerts
        alerts = []
        sources = []

        if self.db is not None:
            try:
                # Query nhmp_closures
                cursor = self.db["nhmp_closures"].find({
                    "$or": [
                        {"origin": {"$regex": origin, "$options": "i"}},
                        {"destination": {"$regex": destination, "$options": "i"}},
                        {"route_label": {"$regex": f"{origin}|{destination}", "$options": "i"}},
                        {"remarks": {"$regex": f"{origin}|{destination}", "$options": "i"}}
                    ]
                }).limit(20)
                closures = await cursor.to_list(length=20)
                for c in closures:
                    alerts.append({
                        "route": c.get("route_label") or f"{c.get('origin', '')} -> {c.get('destination', '')}",
                        "issue_type": c.get("alert_type") or "closure",
                        "severity": "high" if c.get("alert_type") == "Road Closed" else "medium",
                        "remarks": c.get("remarks") or c.get("sub_type") or "Road alert active",
                        "reported_at": str(c.get("reported_at") or c.get("created_at") or "")
                    })
                    if c.get("source") and c.get("source") not in sources:
                        sources.append(c["source"])
            except Exception as e:
                logger.warning(f"Error querying closures DB: {e}")

            # Query scrape_results if no closures found
            if not alerts:
                try:
                    cursor = self.db["scrape_results"].find({
                        "is_active": True,
                        "$or": [
                            {"origin": {"$regex": origin, "$options": "i"}},
                            {"destination": {"$regex": destination, "$options": "i"}},
                            {"headline": {"$regex": f"{origin}|{destination}", "$options": "i"}},
                            {"summary": {"$regex": f"{origin}|{destination}", "$options": "i"}}
                        ]
                    }).limit(20)
                    results = await cursor.to_list(length=20)
                    for r in results:
                        alerts.append({
                            "route": r.get("route_affected") or f"{origin} -> {destination}",
                            "issue_type": r.get("issue_type", "general"),
                            "severity": r.get("severity", "medium"),
                            "remarks": r.get("headline") or r.get("summary") or "Advisory alert",
                            "reported_at": str(r.get("created_at") or "")
                        })
                        if r.get("source_name") and r.get("source_name") not in sources:
                            sources.append(r["source_name"])
                except Exception as e:
                    logger.warning(f"Error querying scrape_results DB: {e}")

        # 3. Generate AI travel summary (Gemini / Groq)
        overall_summary, alert_level = await self._generate_ai_summary(origin, destination, weather_origin, weather_destination, alerts)

        elapsed_ms = (datetime.now(timezone.utc) - start_time).total_seconds() * 1000.0

        return {
            "origin": origin,
            "destination": destination,
            "alert_level": alert_level,
            "overall_summary": overall_summary,
            "weather_origin": weather_origin,
            "weather_destination": weather_destination,
            "alerts": alerts,
            "total_alerts_found": len(alerts),
            "sources_scraped": sources if sources else (["NHMP_API", "OpenWeatherMap"] if alerts else []),
            "cache_hit": False,
            "data_freshness_minutes": 0,
            "response_time_ms": round(elapsed_ms, 2),
            "data_received_at": datetime.now(timezone.utc).isoformat()
        }

    async def _get_weather(self, city: str) -> Optional[Dict[str, Any]]:
        """Fetch weather for a city using OpenWeatherMap API."""
        import aiohttp
        from app.core.config import settings

        api_key = getattr(settings, "OPENWEATHER_API_KEY", None) or getattr(settings, "OPENWEATHERMAP_API_KEY", None) or ""
        if not api_key:
            return None

        url = f"https://api.openweathermap.org/data/2.5/weather?q={city},PK&units=metric&appid={api_key}"
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, timeout=5) as resp:
                    if resp.status == 200:
                        data = await resp.json()
                        main = data.get("main", {})
                        weather = data.get("weather", [{}])[0]
                        wind = data.get("wind", {})
                        return {
                            "city": city.title(),
                            "temperature_celsius": main.get("temp"),
                            "feels_like": main.get("feels_like"),
                            "condition": weather.get("main"),
                            "humidity_percent": main.get("humidity"),
                            "wind_speed_kmh": round(wind.get("speed", 0) * 3.6, 1),
                            "visibility_km": round(data.get("visibility", 10000) / 1000.0, 1),
                            "is_travel_friendly": weather.get("main", "").lower() not in ["thunderstorm", "tornado", "heavy rain", "snow"],
                            "advisory": f"Conditions in {city.title()} are suitable for travel." if weather.get("main", "").lower() in ["clear", "clouds"] else f"Drive carefully due to {weather.get('description', 'weather')}."
                        }
        except Exception as e:
            logger.warning(f"Weather fetch failed for {city}: {e}")
        return None

    async def _generate_ai_summary(self, origin: str, destination: str, w_orig: dict, w_dest: dict, alerts: list) -> Tuple[str, str]:
        """Synthesize travel advice using Gemini or Groq."""
        from app.core.config import settings

        prompt = f"Travel Query: From {origin} to {destination}, Pakistan.\n"
        if w_orig:
            prompt += f"Origin ({origin}) Weather: {w_orig.get('temperature_celsius')}°C, {w_orig.get('condition')}.\n"
        if w_dest:
            prompt += f"Destination ({destination}) Weather: {w_dest.get('temperature_celsius')}°C, {w_dest.get('condition')}.\n"

        if alerts:
            prompt += f"Active Road Closure / Advisory Alerts ({len(alerts)} found):\n"
            for a in alerts:
                prompt += f"- {a.get('route')}: {a.get('remarks')} (Severity: {a.get('severity')})\n"
        else:
            prompt += "No active road closures reported in database.\n"

        prompt += "\nProvide a clear, 2-3 sentence travel advisory for a commuter planning this trip."

        # 1. Try Gemini
        gemini_key = getattr(settings, "GEMINI_API_KEY", "")
        if gemini_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=gemini_key)
                model_name = getattr(settings, "GEMINI_MODEL", "gemini-1.5-flash")
                if "2.5" in model_name:
                    model_name = "gemini-1.5-flash"
                model = genai.GenerativeModel(model_name)
                res = await asyncio.to_thread(model.generate_content, prompt)
                if res and res.text:
                    alert_level = "safe"
                    if alerts:
                        alert_level = "danger" if any(a.get("severity") == "high" for a in alerts) else "caution"
                    return res.text.strip(), alert_level
            except Exception as e:
                logger.warning(f"Gemini AI summary generation failed: {e}")

        # 2. Try Groq
        groq_key = getattr(settings, "GROQ_API_KEY", "")
        if groq_key:
            try:
                from groq import AsyncGroq
                client = AsyncGroq(api_key=groq_key)
                model_name = getattr(settings, "GROQ_MODEL", "llama-3.3-70b-versatile")
                response = await client.chat.completions.create(
                    messages=[{"role": "user", "content": prompt}],
                    model=model_name,
                    max_tokens=200
                )
                if response.choices:
                    summary = response.choices[0].message.content.strip()
                    alert_level = "safe"
                    if alerts:
                        alert_level = "danger" if any(a.get("severity") == "high" for a in alerts) else "caution"
                    return summary, alert_level
            except Exception as e:
                logger.warning(f"Groq AI summary generation failed: {e}")

        # Fallback summary
        if alerts:
            high_sev = any(a.get("severity") == "high" for a in alerts)
            alert_level = "danger" if high_sev else "caution"
            return f"Caution advised on the route from {origin} to {destination}. Active road alerts reported. Drive carefully.", alert_level
        else:
            w_dest_cond = w_dest.get("condition") if w_dest else "clear"
            return f"The route from {origin} to {destination} is currently clear. Weather at destination is {w_dest_cond}. Safe travels!", "safe"