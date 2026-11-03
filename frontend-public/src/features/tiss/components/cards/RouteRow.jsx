import { AlertTriangle, Clock, Info, ChevronDown, ChevronUp } from "lucide-react";
import { formatRelativeTime } from "../../lib/dateUtil.js";
import { getRouteStatusUi, getSourceTypeLabel } from "../../lib/routeUi.js";

/* Theme */
const BRAND_GREEN_DEEPEST = "#01411C";
const BRAND_GREEN_DARK    = "#12BD64";
const BRAND_GREEN_LIGHT   = "#E8F5EE";

export default function RouteRow({
  route,
  showLink = true,
  variant = "default",
  isExpanded = false,
  onToggle,
}) {
  const ui = getRouteStatusUi(route.status);
  const sourceLabel = getSourceTypeLabel(route.source_type);

  const aria = `${route.name}: ${ui.label}. Source: ${sourceLabel}.`;

  const isCompact = variant === "compact";

  /* Build Google Maps search query from route data */
  const mapQuery = (() => {
    const from = String(route?.from_place || "").trim();
    const to = String(route?.to_place || "").trim();
    if (from && to) return `${from} to ${to}`;
    return route?.name || route?.from_place || route?.to_place || "Pakistan";
  })();

  return (
    <article
      className={isCompact ? "px-5 py-4" : "p-5"}
      aria-label={aria}
    >
      {/* TOP ROW — main info */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              className="font-extrabold text-base"
              style={{ color: BRAND_GREEN_DEEPEST }}
            >
              {route.name}
            </h3>

            {/* Status pill */}
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${ui.pill}`}
              title={ui.label}
            >
              {ui.label}
            </span>

            {/* Source type pill */}
            <span className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700">
              {sourceLabel}
            </span>
          </div>

          {route.cause ? (
            <div className="mt-2 flex items-start gap-2 text-sm text-slate-700">
              <AlertTriangle
                size={16}
                className="mt-0.5 text-slate-500 shrink-0"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <span className="font-semibold text-slate-800">Cause:</span>{" "}
                <span className="text-slate-600">{route.cause}</span>
              </div>
            </div>
          ) : null}

          {route.caution_note ? (
            <div className="mt-2 flex items-start gap-2 text-sm text-slate-600">
              <Info
                size={16}
                className="mt-0.5 text-slate-500 shrink-0"
                aria-hidden="true"
              />
              <div className="min-w-0">{route.caution_note}</div>
            </div>
          ) : null}
        </div>

        {/* Updated time — stays on right */}
        <div className="shrink-0 text-xs text-slate-500 flex items-center gap-2">
          <Clock size={14} className="text-slate-400" aria-hidden="true" />
          <span>
            Updated{" "}
            <span className="font-semibold text-slate-700">
              {route.last_updated
                ? formatRelativeTime(route.last_updated)
                : "—"}
            </span>
          </span>
        </div>
      </div>

      {/* ACTION ROW — button aligned to bottom-right */}
      {showLink && !isCompact && route.slug && onToggle ? (
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            className="
              group
              inline-flex items-center gap-1
              h-8 px-3.5
              rounded-full
              text-[12px] font-semibold
              text-white
              shadow-sm
              transition-all duration-200
              hover:brightness-110
              hover:shadow-md
              hover:-translate-y-0.5
            "
            style={{
              background:
                "linear-gradient(135deg, #22C46B 0%, #12BD64 100%)",
            }}
          >
            {isExpanded ? "Hide route details" : "View route details"}
            {isExpanded ? (
              <ChevronUp
                size={12}
                className="transition-transform duration-200 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            ) : (
              <ChevronDown
                size={12}
                className="transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      ) : null}

      {/* EXPANDED DETAIL SECTION */}
      {isExpanded && (
        <div className="mt-5 animate-fade-slide-down">
          <div
            className="rounded-2xl border border-emerald-100 p-4 sm:p-5"
            style={{ backgroundColor: BRAND_GREEN_LIGHT }}
          >
            {/* Subtle heading */}
            <div
              className="text-[11px] font-bold tracking-widest uppercase mb-3"
              style={{ color: BRAND_GREEN_DEEPEST }}
            >
              Route details
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              {/* MAP — compact height */}
              <div className="lg:col-span-8 rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                <iframe
                  title={`Map: ${route.name}`}
                  className="w-full h-[280px] lg:h-[340px] block"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    mapQuery
                  )}&output=embed`}
                />
              </div>

              {/* NOTES SIDEBAR */}
              <div className="lg:col-span-4 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                <div
                  className="text-base font-extrabold mb-3"
                  style={{ color: BRAND_GREEN_DEEPEST }}
                >
                  Route Notes
                </div>

                <div className="space-y-3">
                  {/* Cause */}
                  <div
                    className="rounded-xl p-3 border"
                    style={{
                      backgroundColor: BRAND_GREEN_LIGHT,
                      borderColor: "#D1FAE5",
                    }}
                  >
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Cause
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-800">
                      {route?.cause || "—"}
                    </div>
                  </div>

                  {/* Caution Note */}
                  <div
                    className="rounded-xl p-3 border"
                    style={{
                      backgroundColor: BRAND_GREEN_LIGHT,
                      borderColor: "#D1FAE5",
                    }}
                  >
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Caution Note
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-800">
                      {route?.caution_note || "—"}
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div
                    className="rounded-xl p-3 border"
                    style={{
                      backgroundColor: BRAND_GREEN_LIGHT,
                      borderColor: "#D1FAE5",
                    }}
                  >
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Last Updated
                    </div>
                    <div className="mt-1 text-sm font-semibold text-slate-800">
                      {route?.last_updated
                        ? formatRelativeTime(route.last_updated)
                        : "—"}
                    </div>
                  </div>
                </div>

                {/* Ask Travel Support — gradient pill (matches theme) */}
                <a
                  href="https://guidetopakistan.pk/contact"
                  target="_blank"
                  rel="noreferrer"
                  className="
                    mt-4
                    inline-flex w-full items-center justify-center
                    h-11 px-5
                    rounded-full
                    text-sm font-bold text-white
                    shadow-md
                    transition-all duration-200
                    hover:brightness-110 hover:shadow-lg
                  "
                  style={{
                    background:
                      "linear-gradient(135deg, #22C46B 0%, #12BD64 100%)",
                  }}
                >
                  Ask Travel Support
                </a>
              </div>
            </div>
          </div>

          <style>{`
            @keyframes fade-slide-down {
              from {
                opacity: 0;
                transform: translateY(-8px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fade-slide-down {
              animation: fade-slide-down 0.3s ease-out both;
            }
          `}</style>
        </div>
      )}
    </article>
  );
}