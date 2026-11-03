import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Clock,
  MapPinned,
  Cloud,
  Route as RouteIcon,
  Landmark,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

import { getTravelUpdatesPageData } from "../lib/apiClient.js";
import { getStatusUi } from "../lib/statusLogic.js";
import { mockLiveUpdatesSeed } from "../data/mockLiveUpdates.js";
import SkeletonBlock from "../components/common/SkeletonBlock.jsx";

const clamp2 = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

function formatTimeOnly(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

/* ============================================================
   STATUS UI HELPERS — unified risk-matched pill colors
   ============================================================ */

function civicUi(value) {
  const v = String(value || "unknown").toLowerCase();
  if (v.includes("normal"))
    return {
      label: "Good to Travel",
      pill: "bg-emerald-100 text-emerald-900 border border-emerald-200",
      sub: "Normal",
    };
  if (v.includes("caution"))
    return {
      label: "Travel with Caution",
      pill: "bg-amber-100 text-amber-900 border border-amber-200",
      sub: "Caution",
    };
  if (v.includes("disrupt"))
    return {
      label: "Avoid / Disruption",
      pill: "bg-red-100 text-red-900 border border-red-200",
      sub: "Disruption",
    };
  return {
    label: "Unknown",
    pill: "bg-slate-100 text-slate-700 border border-slate-200",
    sub: "Unknown",
  };
}

function weatherUi(weather) {
  const cond = String(weather?.condition || "").toLowerCase();
  const rain = Number(weather?.rain_prob_pct ?? 0);
  const snow = Number(weather?.snow_prob_pct ?? 0);
  const caution =
    rain >= 50 ||
    snow >= 30 ||
    cond.includes("rain") ||
    cond.includes("snow") ||
    cond.includes("storm");

  return caution
    ? {
        label: "Travel with Caution",
        sub: weather?.condition || "—",
        pill: "bg-amber-100 text-amber-900 border border-amber-200",
      }
    : {
        label: "Good to Travel",
        sub: weather?.condition || "—",
        pill: "bg-emerald-100 text-emerald-900 border border-emerald-200",
      };
}

function roadUi(destination) {
  const s = String(destination?.status || "").toLowerCase();
  const ra = String(destination?.road_access || "").toLowerCase();

  if (s === "red" || ra.includes("high risk") || ra.includes("blocked")) {
    return {
      label: "Avoid Travel",
      sub: destination?.road_access || "High risk",
      pill: "bg-red-100 text-red-900 border border-red-200",
    };
  }
  if (
    s === "amber" ||
    ra.includes("delay") ||
    ra.includes("slow") ||
    ra.includes("caution")
  ) {
    return {
      label: "Travel with Caution",
      sub: destination?.road_access || "Delays possible",
      pill: "bg-amber-100 text-amber-900 border border-amber-200",
    };
  }
  if (s === "green" || ra.includes("open")) {
    return {
      label: "Good to Travel",
      sub: destination?.road_access || "Open",
      pill: "bg-emerald-100 text-emerald-900 border border-emerald-200",
    };
  }
  return {
    label: "Unknown",
    sub: destination?.road_access || "—",
    pill: "bg-slate-100 text-slate-700 border border-slate-200",
  };
}

function suitabilityUi(destination) {
  const s = String(destination?.status || "").toLowerCase();
  if (s === "red")
    return {
      label: "Avoid Travel",
      sub: "Not suitable right now",
      pill: "bg-red-100 text-red-900 border border-red-200",
    };
  if (s === "amber")
    return {
      label: "Travel with Caution",
      sub: "Suitable with careful planning",
      pill: "bg-amber-100 text-amber-900 border border-amber-200",
    };
  if (s === "green")
    return {
      label: "Good to Travel",
      sub: "Generally suitable",
      pill: "bg-emerald-100 text-emerald-900 border border-emerald-200",
    };
  return {
    label: "Unknown",
    sub: "Information limited",
    pill: "bg-slate-100 text-slate-700 border border-slate-200",
  };
}

function statusPill(status) {
  if (status === "blocked")
    return "bg-red-100 text-red-900 border border-red-200";
  if (status === "open")
    return "bg-emerald-100 text-emerald-900 border border-emerald-200";
  return "bg-amber-100 text-amber-900 border border-amber-200";
}

/* ============================================================
   STATUS PILL STACK — TWO separate pills stacked, CENTERED
   ============================================================ */

function StatusPillStack({ status }) {
  return (
    <div className="flex flex-col items-center gap-1.5 w-[150px] mx-auto">
      <div
        className={`
          w-full rounded-2xl px-3 py-1.5 text-xs font-bold text-center leading-tight
          ${status.pill}
        `}
      >
        {status.label}
      </div>

      {status.sub ? (
        <div
          className={`
            w-full rounded-2xl px-3 py-1.5 text-[11px] font-medium text-center leading-tight
            ${status.pill}
          `}
        >
          {status.sub}
        </div>
      ) : null}
    </div>
  );
}

/* ============================================================
   DETAILED TRAVEL INTELLIGENCE TABLE
   ============================================================ */

function DestinationIntelligenceTable({ destination }) {
  const weather = weatherUi(destination?.weather);
  const road = roadUi(destination);
  const civic = civicUi(destination?.civic_local);
  const suit = suitabilityUi(destination);
  const advUi = getStatusUi(destination?.status || "grey");
  const updatedTime = formatTimeOnly(destination?.last_updated);

  const rows = [
    {
      key: "weather",
      icon: <Cloud size={18} />,
      iconWrapClass: "bg-sky-50 border-sky-100 text-sky-700",
      indicator: "Weather",
      status: weather,
      impact: weather.label.includes("Caution")
        ? "Slippery road sections possible"
        : "No major disruption reported",
      action: weather.label.includes("Caution")
        ? "Carry rain gear and travel early"
        : "Continue monitoring",
      updated: updatedTime,
    },
    {
      key: "road",
      icon: <RouteIcon size={18} />,
      iconWrapClass: "bg-orange-50 border-orange-100 text-orange-700",
      indicator: "Road & Access",
      status: road,
      impact: road.label.includes("Avoid")
        ? "Road safety risk"
        : road.label.includes("Caution")
        ? "Slow movement possible"
        : "Generally passable",
      action: road.label.includes("Caution")
        ? "Avoid late evening travel"
        : road.label.includes("Avoid")
        ? "Postpone travel / verify locally"
        : "Drive in daylight where possible",
      updated: updatedTime,
    },
    {
      key: "civic",
      icon: <Landmark size={18} />,
      iconWrapClass: "bg-emerald-50 border-emerald-100 text-emerald-700",
      indicator: "Civic & Local Situation",
      status: civic,
      impact: civic.label.includes("Avoid")
        ? "Disruption reported"
        : civic.label.includes("Caution")
        ? "Localized issues possible"
        : "No major disruption reported",
      action: civic.label.includes("Avoid")
        ? "Follow official instructions"
        : "Continue monitoring",
      updated: updatedTime,
    },
    {
      key: "suit",
      icon: <ShieldCheck size={18} />,
      iconWrapClass: "bg-indigo-50 border-indigo-100 text-indigo-700",
      indicator: "Tourist Suitability",
      status: suit,
      impact: suit.sub,
      action: destination?.recommended_for
        ? `Best for: ${destination.recommended_for}`
        : "Plan carefully and verify conditions",
      updated: updatedTime,
    },
    {
      key: "gtp",
      icon: <ShieldCheck size={18} />,
      iconWrapClass: "bg-rose-50 border-rose-100 text-rose-700",
      indicator: "GTP Advisory",
      status: {
        label: advUi.label,
        sub: destination?.short_advisory ? "Advisory available" : "No advisory",
        pill: advUi.pill,
      },
      impact: destination?.short_advisory
        ? "Verify conditions before departure"
        : "No advisory available",
      action: destination?.short_advisory
        ? "Ask GTP to confirm latest route status"
        : "Check back for updates",
      updated: updatedTime,
    },
  ];

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
        <div className="min-w-0">
          <h2
            className="text-lg sm:text-xl font-extrabold"
            style={{ color: "var(--gti-brand-green-deepest)" }}
          >
            Detailed Travel Intelligence
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Selected:{" "}
            <span
              className="font-semibold"
              style={{ color: "var(--gti-brand-green-deepest)" }}
            >
              {destination.name}
            </span>{" "}
            <span className="text-slate-400">•</span> {destination.region || "—"}
          </p>
        </div>

        <Link
          to={`/tiss/destinations/${destination.slug}`}
          className="
            shrink-0 inline-flex items-center gap-1.5
            h-10 px-5
            rounded-full
            text-sm font-bold text-white
            shadow-sm
            transition-all duration-200
            hover:brightness-110 hover:shadow-md hover:-translate-y-0.5
          "
          style={{
            background:
              "linear-gradient(135deg, var(--gti-brand-green-dark) 0%, var(--gti-brand-green-dark-hover) 100%)",
          }}
        >
          View details
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[20%]" />
              <col className="w-[20%]" />
              <col className="w-[22%]" />
              <col className="w-[26%]" />
              <col className="w-[12%]" />
            </colgroup>

            <thead
              className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-500"
              style={{ backgroundColor: "var(--gti-page-bg)" }}
            >
              <tr>
                <th className="text-left px-4 py-3">Indicator</th>
                <th className="text-center px-4 py-3">Current Status</th>
                <th className="text-left px-4 py-3">Travel Impact</th>
                <th className="text-left px-4 py-3">Recommended Action</th>
                <th className="text-right px-4 py-3">Last Updated</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {rows.map((r) => (
                <tr
                  key={r.key}
                  className="transition-colors hover:bg-emerald-50/40 align-middle"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`h-9 w-9 shrink-0 rounded-xl border flex items-center justify-center ${r.iconWrapClass}`}
                      >
                        {r.icon}
                      </span>
                      <div
                        className="font-semibold text-sm break-words"
                        style={{ color: "var(--gti-brand-green-deepest)" }}
                      >
                        {r.indicator}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <StatusPillStack status={r.status} />
                  </td>

                  <td className="px-4 py-4 text-sm text-slate-700 break-words">
                    {r.impact}
                  </td>

                  <td
                    className="px-4 py-4 text-sm font-semibold break-words"
                    style={{ color: "var(--gti-brand-green-deepest)" }}
                  >
                    {r.action}
                  </td>

                  <td className="px-4 py-4 text-right text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1 justify-end whitespace-nowrap">
                      <Clock size={12} className="text-slate-400 shrink-0" />
                      {r.updated}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   REFRESH SIMULATION HELPER
   ============================================================ */

function simulateRefresh(prev) {
  return prev.map((x) => ({
    ...x,
    updated_minutes_ago: Math.max(1, Number(x.updated_minutes_ago ?? 1) - 1),
  }));
}

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function RouteUpdates() {
  const [params] = useSearchParams();
  const destSlug = params.get("dest");
  const routeSlug = params.get("route");

  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(null);

  const [items, setItems] = useState(
    (mockLiveUpdatesSeed || []).filter((x) => x.category === "roads")
  );
  const [selectedId, setSelectedId] = useState(items[0]?.id || null);
  const [secondsLeft, setSecondsLeft] = useState(30);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const data = await getTravelUpdatesPageData();
      if (!mounted) return;
      setPageData(data || null);
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const selectedDestination = useMemo(() => {
    if (!destSlug) return null;
    return (
      (pageData?.destinations || []).find((d) => d.slug === destSlug) || null
    );
  }, [pageData, destSlug]);

  const destName = selectedDestination?.name || "";

  useEffect(() => {
    const t = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setItems((prev) => simulateRefresh(prev));
          return 30;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(t);
  }, []);

  const filterText = useMemo(() => {
    return (destName || destSlug || routeSlug || "").trim().toLowerCase();
  }, [destName, destSlug, routeSlug]);

  const filtered = useMemo(() => {
    if (!filterText) return items;
    return items.filter((x) => {
      const loc = String(x.location || "").toLowerCase();
      const route = String(x.route_name || "").toLowerCase();
      return loc.includes(filterText) || route.includes(filterText);
    });
  }, [items, filterText]);

  useEffect(() => {
    if (!filtered.length) {
      setSelectedId(null);
      return;
    }
    if (!filtered.some((x) => x.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const selected = useMemo(() => {
    return filtered.find((x) => x.id === selectedId) || filtered[0] || null;
  }, [filtered, selectedId]);

  const mapQuery = selected?.map?.query || selected?.location || "Pakistan";

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[var(--gti-page-bg)]">
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-10 py-8">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <SkeletonBlock className="h-8 w-56" />
            <SkeletonBlock className="h-[280px]" />
            <SkeletonBlock className="h-[420px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[var(--gti-page-bg)]">
      <Helmet>
        <title>
          Route Updates{destName ? ` — ${destName}` : ""} | Guide to Pakistan Live
        </title>
      </Helmet>

      <div className="w-full max-w-none px-4 sm:px-6 lg:px-10 py-8">
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              aria-label="Back to home"
              className="
                inline-flex h-10 w-10 shrink-0 items-center justify-center
                rounded-full border shadow-sm
                transition-all duration-200
                hover:brightness-95 hover:shadow-md hover:-translate-y-0.5
              "
              style={{
                backgroundColor: "var(--gti-brand-green-light)",
                borderColor: "var(--gti-brand-green-border)",
                color: "var(--gti-brand-green-deepest)",
              }}
            >
              <ArrowLeft size={18} />
            </Link>

            <nav className="text-sm text-slate-600" aria-label="Breadcrumb">
              <Link
                to="/tiss"
                className="text-slate-600 hover:text-[color:var(--gti-brand-green-dark)] transition-colors"
              >
                Travel Updates
              </Link>
              <span className="mx-2 text-slate-400">/</span>
              <span
                className="font-semibold"
                style={{ color: "var(--gti-brand-green-deepest)" }}
              >
                Route Updates
              </span>
            </nav>
          </div>

          {/* Sub-parent 1 */}
          <div
            className="rounded-3xl border shadow-sm p-6 sm:p-8"
            style={{
              backgroundColor: "var(--gti-brand-green-light)",
              borderColor: "var(--gti-brand-green-border)",
            }}
          >
            {selectedDestination ? (
              <DestinationIntelligenceTable destination={selectedDestination} />
            ) : (
              <div className="rounded-2xl bg-white border border-slate-200 p-5 text-sm text-slate-600 shadow-sm">
                Select a destination to see detailed intelligence. (Tip: open
                this page with{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--gti-brand-green-dark)" }}
                >
                  ?dest=hunza
                </span>
                )
              </div>
            )}
          </div>

          {/* Sub-parent 2 */}
          <div
            className="rounded-3xl border shadow-sm p-6 sm:p-8"
            style={{
              backgroundColor: "var(--gti-brand-green-light)",
              borderColor: "var(--gti-brand-green-border)",
            }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap mb-5">
              <div className="min-w-0">
                <h2
                  className="text-lg sm:text-xl font-extrabold"
                  style={{ color: "var(--gti-brand-green-deepest)" }}
                >
                  Route Updates
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Select an issue to focus the map.
                  {destName ? (
                    <>
                      {" "}
                      Filter:{" "}
                      <span
                        className="font-semibold"
                        style={{ color: "var(--gti-brand-green-deepest)" }}
                      >
                        {destName}
                      </span>
                    </>
                  ) : null}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap shrink-0">
                <span className="inline-flex items-center rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 shadow-sm">
                  Refresh in{" "}
                  <span
                    className="ml-1 font-bold"
                    style={{ color: "var(--gti-brand-green-deepest)" }}
                  >
                    {secondsLeft}s
                  </span>
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setItems((prev) => simulateRefresh(prev));
                    setSecondsLeft(30);
                  }}
                  className="
                    inline-flex items-center gap-1.5
                    rounded-full border border-slate-200 bg-white
                    px-4 py-2
                    text-sm font-semibold text-slate-700
                    hover:bg-slate-50 hover:border-emerald-300 hover:text-emerald-700
                    shadow-sm
                    transition-colors
                  "
                >
                  <RefreshCw size={14} />
                  Refresh now
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-8 rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                <iframe
                  title="Road issues map"
                  className="w-full h-[320px] lg:h-[440px] block"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    mapQuery
                  )}&output=embed`}
                />
              </div>

              <div className="lg:col-span-4 space-y-3">
                {filtered.length ? (
                  filtered.map((x) => {
                    const isSelected = x.id === selectedId;
                    return (
                      <button
                        key={x.id}
                        type="button"
                        onClick={() => setSelectedId(x.id)}
                        className={[
                          "w-full text-left rounded-2xl border p-4 shadow-sm transition-all duration-200",
                          isSelected
                            ? "border-emerald-300 bg-emerald-50 -translate-y-0.5 shadow-md"
                            : "border-slate-200 bg-white hover:border-emerald-200 hover:-translate-y-0.5 hover:shadow-md",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div
                              className="text-sm font-extrabold truncate"
                              style={{ color: "var(--gti-brand-green-deepest)" }}
                            >
                              {x.location}
                            </div>
                            <div className="text-xs text-slate-500 truncate mt-0.5">
                              {x.route_name}
                            </div>
                            <p className="mt-2 text-sm text-slate-600" style={clamp2}>
                              {x.description}
                            </p>
                          </div>

                          <span
                            className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${statusPill(
                              x.status
                            )}`}
                          >
                            {x.status}
                          </span>
                        </div>

                        <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                          <Clock size={12} className="text-slate-400" />
                          Updated {x.updated_minutes_ago} mins ago
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-500 italic shadow-sm">
                    No road issues match this filter.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5">
              <a
                className="
                  inline-flex items-center gap-2
                  rounded-full border border-slate-200 bg-white
                  px-4 py-2
                  text-sm font-semibold text-slate-700
                  hover:bg-slate-50 hover:border-emerald-300 hover:text-emerald-700
                  shadow-sm
                  transition-colors
                "
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  filtered.map((x) => x.location).join(" | ") || "Pakistan"
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                <MapPinned size={14} />
                Open all in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}