import { useState, useCallback } from "react";
import {
  Search,
  Loader2,
  MapPin,
  Thermometer,
  Wind,
  Droplets,
  Eye,
  AlertTriangle,
  Sparkles,
  RefreshCcw,
} from "lucide-react";

import { getLiveRouteInfo } from "../../lib/apiClient.js";

/* Theme (matches TISS) */
const PANEL_BG = "#D3ECDD";
const PANEL_BORDER = "#B7D9C6";
const HEADING_GREEN = "#0F2F22";
const BRAND_GREEN_DEEPEST = "#01411C";

const POPULAR = [
  { origin: "Islamabad", destination: "Murree" },
  { origin: "Lahore", destination: "Islamabad" },
  { origin: "Islamabad", destination: "Gilgit" },
  { origin: "Naran", destination: "Gilgit" },
  { origin: "Peshawar", destination: "Islamabad" },
];

function alertUi(level) {
  switch (String(level || "").toLowerCase()) {
    case "safe":
      return {
        label: "Clear / Safe to travel",
        cls: "bg-emerald-100 text-emerald-900 border-emerald-200",
      };
    case "caution":
      return {
        label: "Travel with caution",
        cls: "bg-amber-100 text-amber-900 border-amber-200",
      };
    case "danger":
      return {
        label: "High risk / Road affected",
        cls: "bg-rose-100 text-rose-900 border-rose-200",
      };
    default:
      return {
        label: "Status unconfirmed",
        cls: "bg-slate-100 text-slate-700 border-slate-200",
      };
  }
}

function WeatherCard({ title, w }) {
  if (!w) return null;
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-0.5">
          <MapPin size={12} />
          {w.city}
        </span>
      </div>

      <div className="mt-3 flex items-end gap-2">
        <span
          className="text-3xl font-extrabold leading-none"
          style={{ color: BRAND_GREEN_DEEPEST }}
        >
          {Math.round(w.temperature_celsius)}°C
        </span>
        <span className="text-sm text-slate-600 pb-0.5">{w.condition}</span>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 gap-y-2 text-[13px] text-slate-700">
        <div className="flex items-center gap-1.5">
          <Thermometer size={14} className="text-slate-500" />
          Feels {Math.round(w.feels_like)}°C
        </div>
        <div className="flex items-center gap-1.5">
          <Wind size={14} className="text-slate-500" />
          {w.wind_speed_kmh} km/h
        </div>
        <div className="flex items-center gap-1.5">
          <Droplets size={14} className="text-slate-500" />
          {w.humidity_percent}%
        </div>
        <div className="flex items-center gap-1.5">
          <Eye size={14} className="text-slate-500" />
          {w.visibility_km} km
        </div>
      </div>

      {w.advisory && (
        <p className="mt-3 text-xs text-slate-600 leading-relaxed">{w.advisory}</p>
      )}
    </div>
  );
}

export default function LiveRouteCheckSection() {
  const [origin, setOrigin] = useState("Islamabad");
  const [destination, setDestination] = useState("Murree");
  const [question, setQuestion] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const runCheck = useCallback(
    async (o = origin, d = destination, q = question) => {
      setLoading(true);
      setError(null);
      try {
        const result = await getLiveRouteInfo({
          origin: o,
          destination: d,
          message: q?.trim() || undefined,
        });
        setData(result);
      } catch (e) {
        setError(
          e?.message ||
            "Unable to reach the live travel service. Please try again."
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [origin, destination, question]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    runCheck();
  };

  const onQuickPick = (r) => {
    setOrigin(r.origin);
    setDestination(r.destination);
    runCheck(r.origin, r.destination, "");
  };

  const a = alertUi(data?.alert_level);

  return (
    <section
      id="live-route-check"
      data-section="live-route-check"
      aria-label="Live route check"
      className="w-full scroll-mt-24"
    >
      {/* Heading */}
      <div className="mb-5">
        <h3
          className="text-lg sm:text-xl font-extrabold flex items-center gap-2"
          style={{ color: HEADING_GREEN }}
        >
          <Sparkles size={18} />
          Check My Route — Live
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Real-time motorway closures, live weather, and an AI travel advisory for
          your journey.
        </p>
      </div>

      {/* Panel */}
      <div
        className="rounded-3xl border shadow-sm p-6 sm:p-8"
        style={{ backgroundColor: PANEL_BG, borderColor: PANEL_BORDER }}
      >
        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                From
              </label>
              <input
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Islamabad"
                required
                className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                To
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Murree"
                required
                className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Ask anything (optional)
            </label>
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Is the M-2 open right now? Any fog on the way?"
              className="w-full h-11 px-4 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 h-11 px-6 rounded-full text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md disabled:opacity-60 disabled:translate-y-0"
            style={{ backgroundColor: BRAND_GREEN_DEEPEST }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Checking live conditions…
              </>
            ) : (
              <>
                <Search size={16} />
                Check Route
              </>
            )}
          </button>
        </form>

        {/* Quick picks */}
        <div className="mt-5 pt-5 border-t flex flex-wrap items-center gap-2" style={{ borderColor: PANEL_BORDER }}>
          <span className="text-xs font-semibold text-slate-600">Popular:</span>
          {POPULAR.map((r, i) => (
            <button
              key={i}
              type="button"
              onClick={() => onQuickPick(r)}
              className="rounded-full h-8 px-3 text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
            >
              {r.origin} → {r.destination}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 text-sm text-rose-800 flex items-start gap-2">
            <AlertTriangle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Results */}
        {data && !loading && (
          <div className="mt-6 space-y-4">
            {/* AI Summary */}
            <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
                <h4
                  className="text-base font-extrabold"
                  style={{ color: BRAND_GREEN_DEEPEST }}
                >
                  {data.origin} → {data.destination}
                </h4>
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${a.cls}`}
                >
                  {a.label}
                </span>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
                {data.overall_summary || "No advisory summary available."}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
                <span>Alerts found: {data.total_alerts_found ?? 0}</span>
                {Array.isArray(data.sources_scraped) && data.sources_scraped.length > 0 && (
                  <span>Sources: {data.sources_scraped.join(", ")}</span>
                )}
                {data.response_time_ms != null && (
                  <span>Responded in {Math.round(data.response_time_ms)} ms</span>
                )}
                <button
                  type="button"
                  onClick={() => runCheck()}
                  className="inline-flex items-center gap-1 font-semibold text-emerald-800 hover:underline"
                >
                  <RefreshCcw size={12} />
                  Refresh
                </button>
              </div>
            </div>

            {/* Weather */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <WeatherCard title="Weather at start" w={data.weather_origin} />
              <WeatherCard title="Weather at destination" w={data.weather_destination} />
            </div>

            {/* Alerts */}
            {Array.isArray(data.alerts) && data.alerts.length > 0 && (
              <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
                <h4
                  className="text-sm font-extrabold flex items-center gap-2"
                  style={{ color: BRAND_GREEN_DEEPEST }}
                >
                  <AlertTriangle size={16} />
                  Active road alerts
                  <span className="inline-flex items-center rounded-full bg-amber-100 border border-amber-200 px-2 py-0.5 text-[11px] font-bold text-amber-900">
                    {data.alerts.length}
                  </span>
                </h4>

                <div className="mt-3 space-y-2">
                  {data.alerts.map((al, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <div className="text-[13px] font-bold text-slate-900">
                        {al.route || "Route advisory"}
                      </div>
                      {al.remarks && (
                        <div className="mt-0.5 text-[13px] text-slate-700">
                          {al.remarks}
                        </div>
                      )}
                      <div className="mt-1 flex flex-wrap gap-x-3 text-[11px] text-slate-500">
                        {al.issue_type && <span>Type: {al.issue_type}</span>}
                        {al.severity && <span>Severity: {al.severity}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}