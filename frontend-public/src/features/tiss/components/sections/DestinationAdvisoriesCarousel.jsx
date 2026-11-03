import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Route as RouteIcon,
  Users,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Button from "../common/Button.jsx";

const clamp2 = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

function advisoryRank(a) {
  const type = String(a?.advisory_type || "").toLowerCase();
  if (type === "emergency") return 0;

  const sev =
    String(a?.severity || a?.level || a?.risk_level || a?.priority || "").toLowerCase();

  if (sev === "critical") return 1;
  if (sev === "high") return 2;
  if (sev === "medium") return 3;
  if (sev === "low") return 4;

  return 9;
}

function cleanText(x) {
  const s = String(x || "").trim().replace(/\s+/g, " ");
  return s.length ? s : "";
}

function firstSentence(text) {
  const t = cleanText(text);
  if (!t) return "";
  const idx = t.search(/[.!?]\s/);
  if (idx === -1) return t;
  return t.slice(0, idx + 1);
}

function getRoadLine(a) {
  return (
    cleanText(a?.road_conditions) ||
    cleanText(a?.road_condition) ||
    cleanText(a?.road_status) ||
    cleanText(a?.road_access) ||
    cleanText(a?.cause) ||
    firstSentence(a?.advisory_text) ||
    "Check road conditions and access before departure."
  );
}

function getCivicLine(a) {
  return (
    cleanText(a?.civic_social_conditions) ||
    cleanText(a?.civic_conditions) ||
    cleanText(a?.social_conditions) ||
    cleanText(a?.local_situation) ||
    firstSentence(a?.recommended_action) ||
    "Monitor civic & social situation updates and follow local guidance."
  );
}

function getEventLine(a) {
  const fromFields =
    cleanText(a?.current_event) ||
    cleanText(a?.current_events) ||
    cleanText(a?.events) ||
    cleanText(a?.event) ||
    cleanText(a?.event_advisory) ||
    cleanText(a?.events_advisory) ||
    cleanText(a?.local_event) ||
    cleanText(a?.local_events);

  if (fromFields) return fromFields;

  const fromText = firstSentence(a?.advisory_text);
  if (fromText) return fromText;

  return "No notable current events reported.";
}

function getTipLine(a) {
  return (
    cleanText(a?.tip) ||
    cleanText(a?.travel_tip) ||
    cleanText(a?.packing_tip) ||
    cleanText(a?.extra_tip) ||
    ""
  );
}

function getSingleRiskPill(advisory) {
  const sev = String(advisory?.severity || "").toLowerCase();

  if (sev === "critical" || sev === "high") {
    return {
      label: "Risk: High",
      cls: "bg-amber-100 text-amber-900 border border-amber-200",
    };
  }

  if (sev === "medium") {
    return {
      label: "Risk: Caution",
      cls: "bg-amber-50 text-amber-900 border border-amber-200",
    };
  }

  if (sev === "low") {
    return {
      label: "Risk: Low — Good to go",
      cls: "bg-emerald-50 text-emerald-900 border border-emerald-200",
    };
  }

  return {
    label: "Risk: Unknown",
    cls: "bg-slate-100 text-slate-700 border border-slate-200",
  };
}

function GlassSubParent({ children }) {
  return (
    <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur p-4 overflow-visible">
      {children}
    </div>
  );
}

function WhiteParent({ children }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-6 overflow-visible">
      {children}
    </div>
  );
}

function SideArrow({ side, disabled, onClick }) {
  const pos =
    side === "left"
      ? "left-0 -translate-x-1/2"
      : "right-0 translate-x-1/2";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "left" ? "Previous advisory" : "Next advisory"}
      className={[
        "absolute",
        pos,
        "top-1/2 -translate-y-1/2",
        "z-20",
        "h-10 w-10 rounded-full",
        "inline-flex items-center justify-center",
        "border border-slate-200",
        "bg-slate-100 text-slate-900",
        "hover:bg-slate-200 transition-colors",
        disabled ? "opacity-40 cursor-not-allowed" : "",
      ].join(" ")}
    >
      {side === "left" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  );
}

function StatusTimeBox({ lastUpdatedText }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs whitespace-nowrap">
      <span className="font-semibold text-slate-900">Active</span>
      <span className="h-3 w-px bg-slate-300/80" />
      <span className="text-slate-600">Updated</span>
      <span className="font-semibold text-slate-900">
        {lastUpdatedText}
      </span>
    </div>
  );
}

function AdvisoryChildCard({
  advisory,
  lastUpdatedText,
  isExpanded,
  onToggleRecommended,
}) {
  const roadLine = getRoadLine(advisory);
  const civicLine = getCivicLine(advisory);
  const eventLine = getEventLine(advisory);

  const recommended = cleanText(advisory?.recommended_action);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col">
      <div className="flex items-start gap-4">
        <div className="min-w-0">
          <h3
            className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug"
            style={clamp2}
            title={advisory?.title || ""}
          >
            {advisory?.title || "Advisory"}
          </h3>

          <p className="mt-2 text-sm text-slate-600 leading-relaxed" style={clamp2}>
            {cleanText(advisory?.advisory_text) || "No details available."}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3 text-sm text-slate-700">
        <div className="flex gap-2">
          <RouteIcon size={16} className="mt-0.5 text-slate-500 shrink-0" />
          <div>
            <span className="font-semibold">Road conditions:</span> {roadLine}
          </div>
        </div>

        <div className="flex gap-2">
          <Users size={16} className="mt-0.5 text-slate-500 shrink-0" />
          <div>
            <span className="font-semibold">Civic & social:</span> {civicLine}
          </div>
        </div>

        <div className="flex gap-2">
          <CalendarDays size={16} className="mt-0.5 text-slate-500 shrink-0" />
          <div>
            <span className="font-semibold">Events:</span> {eventLine}
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4">
        <Button
          type="button"
          variant="soft"
          size="sm"
          className="w-full justify-center"
          onClick={onToggleRecommended}
        >
          Recommended action
        </Button>

        {isExpanded && (
          <div className="mt-3 rounded-xl bg-slate-50 border border-slate-200 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Recommended action
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900">
              {recommended || "Recommended action not available."}
            </div>
          </div>
        )}
      </div>

      <div className="sr-only">Last updated: {lastUpdatedText}</div>
    </article>
  );
}

export default function DestinationAdvisoriesCarousel({ advisories = [] }) {
  const scrollerRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [expandedById, setExpandedById] = useState({});

  const active = useMemo(() => {
    const now = Date.now();
    return (advisories || [])
      .filter((a) => {
        if (!a) return false;
        if (a.is_published === false) return false;

        const until = a.valid_until ? new Date(a.valid_until).getTime() : null;
        if (until && !Number.isNaN(until) && until <= now) return false;

        return true;
      })
      .sort((a, b) => advisoryRank(a) - advisoryRank(b));
  }, [advisories]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanLeft(el.scrollLeft > 2);
      setCanRight(el.scrollLeft < max - 2);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [active.length]);

  const scrollByAmount = useCallback((dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  }, []);

  const getDummyLastUpdated = useCallback((idx) => {
    const hours = Math.max(1, Math.min(12, idx + 2));
    return `${hours} hours ago`;
  }, []);

  const toggleRecommended = useCallback((id) => {
    setExpandedById((cur) => ({ ...cur, [id]: !cur[id] }));
  }, []);

  return (
    <GlassSubParent>
      <WhiteParent>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Advisories
            </div>

            <div className="mt-4 text-sm font-semibold text-slate-700">
              {active.length} key advisories for this destination
            </div>
          </div>

          <Button to="/tiss/advisories">
            View all
          </Button>
        </div>

        <div className="mt-5 relative overflow-visible">
          <SideArrow side="left" disabled={!canLeft} onClick={() => scrollByAmount(-1)} />
          <SideArrow side="right" disabled={!canRight} onClick={() => scrollByAmount(1)} />

          {active.length ? (
            <div
              ref={scrollerRef}
              className="no-scrollbar overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-6 pb-2"
            >
              {active.map((a, idx) => {
                const pill = getSingleRiskPill(a);
                const lastUpdatedText = getDummyLastUpdated(idx);
                const isExpanded = Boolean(expandedById[a.id]);

                return (
                  <div key={a.id} className="snap-start shrink-0 w-full">
                    <div className="mt-4 mb-2 flex items-start justify-between gap-3">
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${pill.cls} mt-[2px]`}
                      >
                        {pill.label}
                      </span>

                      <StatusTimeBox lastUpdatedText={lastUpdatedText} />
                    </div>

                    <AdvisoryChildCard
                      advisory={a}
                      lastUpdatedText={lastUpdatedText}
                      isExpanded={isExpanded}
                      onToggleRecommended={() => toggleRecommended(a.id)}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              No advisories available right now.
            </div>
          )}
        </div>
      </WhiteParent>
    </GlassSubParent>
  );
}