import os
import datetime
import json
import httpx
from pymongo import MongoClient

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://127.0.0.1:27017/gtp_db")
GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

def get_db():
    client = MongoClient(MONGODB_URI)
    # Extract DB name from URI or default to gtp_db
    db_name = MONGODB_URI.rsplit("/", 1)[-1].split("?")[0] or "gtp_db"
    return client[db_name]

def generate_weekly_report_sync():
    """Reads DB state, queries Groq/Gemini AI, and inserts the generated report into MongoDB."""
    db = get_db()
    
    # 1. Fetch live metrics from MongoDB
    advisories = list(db.advisories.find({"status": "active"}))
    routes = list(db.routeconditions.find({}))
    if not routes:
        routes = list(db["route-conditions"].find({}))
    places_count = db.places.count_documents({})

    closed_routes = [r for r in routes if r.get("status") in ["Closed", "Blocked"]]
    warning_routes = [r for r in routes if r.get("status") in ["Warning", "Hazardous", "Caution"]]
    
    metrics = {
        "activeAdvisoriesCount": len(advisories),
        "totalMonitoredRoutes": len(routes),
        "placesAffectedCount": len(closed_routes) + len(warning_routes),
        "lastUpdated": datetime.datetime.utcnow().isoformat()
    }

    now = datetime.datetime.now()
    start_of_week = now - datetime.timedelta(days=now.weekday())
    end_of_week = start_of_week + datetime.timedelta(days=6)
    period_str = f"{start_of_week.strftime('%B %d')} - {end_of_week.strftime('%B %d, %Y')}"
    report_id = f"report-{now.strftime('%Y')}-W{now.isocalendar()[1]}"

    # Prepare prompt data
    advisory_titles = [a.get("title", "") for a in advisories[:5]]
    route_summaries = [f"{r.get('routeName', 'Route')}: {r.get('status', 'Open')} ({r.get('summary', '')})" for r in routes[:8]]

    prompt = f"""You are the Lead Travel Intelligence Officer for Guide to Pakistan (GTP).
Generate a comprehensive Sunday Weekly Travel Advisory & Intelligence Report for Pakistan for period: {period_str}.

Current Database Context:
- Active Advisories ({len(advisories)}): {", ".join(advisory_titles) or "No critical advisories"}
- Monitored Routes ({len(routes)}): {"; ".join(route_summaries) or "All routes clear"}

Return ONLY a valid JSON object matching EXACTLY this JSON structure without markdown formatting or code blocks:
{{
  "reportId": "{report_id}",
  "title": "Weekly Travel Advisory & Route Outlook ({period_str})",
  "period": "{period_str}",
  "summary": "Executive summary of travel conditions across Northern & Western Pakistan.",
  "riskLevel": "Moderate",
  "aiOutlook": "Comprehensive AI outlook detailing high-altitude pass conditions, weather trends, and travel recommendations for tourists.",
  "sections": [
    {{
      "title": "Northern Areas & Karakoram Highway",
      "content": "Detailed breakdown of Hunza, Skardu, and Babusar Top access.",
      "bulletPoints": ["Karakoram Highway status update", "Weather patterns in Gilgit-Baltistan", "Fuel & local advisory"],
      "severity": "info"
    }},
    {{
      "title": "Khyber Pakhtunkhwa & Swat Valley",
      "content": "Road safety, snowfall, and mountain pass accessibility updates.",
      "bulletPoints": ["Swat Expressway conditions", "Kalam road status", "Local highway alerts"],
      "severity": "warning"
    }}
  ],
  "routeHighlights": [
    {{
      "routeName": "Islamabad to Murree Expressway (N-75)",
      "status": "Clear",
      "summary": "Traffic flowing smoothly. Fog caution during early morning hours.",
      "warning": "Drive carefully on sharp turns near Jhika Gali."
    }},
    {{
      "routeName": "Naran to Babusar Top (N-15)",
      "status": "Hazardous",
      "summary": "Heavy snowfall & icy surface at Babusar Pass.",
      "warning": "4x4 vehicles required; check snow chains."
    }}
  ]
}}
"""

    report_data = None

    # 2. Try Groq API first
    if GROQ_API_KEY:
        try:
            with httpx.Client(timeout=30.0) as client:
                resp = client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={"Authorization": f"Bearer {GROQ_API_KEY}", "Content-Type": "application/json"},
                    json={
                        "model": "llama-3.3-70b-versatile",
                        "messages": [{"role": "user", "content": prompt}],
                        "temperature": 0.4
                    }
                )
                if resp.status_code == 200:
                    raw_content = resp.json()["choices"][0]["message"]["content"].strip()
                    if raw_content.startswith("```"):
                        raw_content = raw_content.split("```")[1]
                        if raw_content.startswith("json"):
                            raw_content = raw_content[4:]
                    report_data = json.loads(raw_content.strip())
        except Exception as e:
            print(f"[Weekly Generator] Groq API call failed: {e}")

    # Fallback default report if AI call is unavailable
    if not report_data:
        report_data = {
            "reportId": report_id,
            "title": f"Weekly Travel Advisory & Route Outlook ({period_str})",
            "period": period_str,
            "summary": "Weekly travel conditions across Pakistan monitored by TISS AI. Drivers are advised to review active road alerts.",
            "riskLevel": "Moderate" if closed_routes or warning_routes else "Low",
            "aiOutlook": f"TISS automated surveillance has monitored {len(routes)} routes across Pakistan. {len(advisories)} active travel advisories are currently in effect.",
            "sections": [
                {
                    "title": "Northern Highway Surveillance",
                    "content": "Key arterial routes in Gilgit-Baltistan and KP are undergoing regular monitoring.",
                    "bulletPoints": [f"{len(closed_routes)} routes currently restricted/closed", f"{len(advisories)} official warnings issued"],
                    "severity": "warning" if closed_routes else "info"
                }
            ],
            "routeHighlights": [
                {
                    "routeName": r.get("routeName", "Main Highway"),
                    "status": r.get("status", "Open"),
                    "summary": r.get("summary", "Normal travel conditions"),
                    "warning": r.get("warning", "")
                }
                for r in routes[:3]
            ]
        }

    report_data["metrics"] = metrics
    report_data["generatedAt"] = datetime.datetime.utcnow()
    report_data["status"] = "published"

    # Save to MongoDB
    reports_col = db.weeklyreports if "weeklyreports" in db.list_collection_names() else db.weekly_reports
    reports_col.update_one(
        {"reportId": report_data["reportId"]},
        {"$set": report_data},
        upsert=True
    )
    print(f"[Weekly Generator] Report successfully updated: {report_id}")
    return report_data