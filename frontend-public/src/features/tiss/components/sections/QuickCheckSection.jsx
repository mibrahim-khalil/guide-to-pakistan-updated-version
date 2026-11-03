import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Route as RouteIcon, CalendarRange, Headphones } from "lucide-react";

import { getTravelUpdatesPageData } from "../../lib/apiClient.js";

/* MUST match header color */
const PANEL_BG = "#D3ECDD";
const PANEL_BORDER = "#B7D9C6";
const HEADING_GREEN = "#0F2F22";

function scrollToSection(selectors) {
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
  }
  return false;
}

function SubParent({ children }) {
  return (
    <div
      className="rounded-3xl border shadow-sm p-6 sm:p-8"
      style={{ backgroundColor: PANEL_BG, borderColor: PANEL_BORDER }}
    >
      {children}
    </div>
  );
}

function ActionCard({ icon, title, desc, onClick, featured = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group relative w-full text-left overflow-hidden rounded-2xl p-5",
        "bg-white",
        featured ? "border-2 border-emerald-600" : "border border-slate-200",
        "shadow-sm",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2",
      ].join(" ")}
    >
      <div className="relative flex items-start gap-4">
        <div
          className="h-11 w-11 shrink-0 rounded-xl flex items-center justify-center border border-slate-200 bg-white text-slate-700"
          aria-hidden="true"
        >
          {icon}
        </div>

        <div className="min-w-0">
          <div className="text-[15px] sm:text-base font-extrabold leading-tight text-slate-900">
            {title}
          </div>
          <div className="mt-1 text-[13px] leading-relaxed text-slate-600">
            {desc}
          </div>
        </div>
      </div>
    </button>
  );
}

export default function QuickCheckSection() {
  const navigate = useNavigate();
  const [latestReportId, setLatestReportId] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getTravelUpdatesPageData();
        if (mounted && res?.latest_report?.id) setLatestReportId(res.latest_report.id);
      } catch (_) {
        /* silent */
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const onDestination = useCallback(() => {
    scrollToSection([
      '[data-section="destinations"]',
      'section[aria-label="Destinations"]',
      "#destinations",
    ]);
  }, []);

  const onRoutes = useCallback(() => {
    scrollToSection([
      "#live-route-check",
      '[data-section="live-route-check"]',
      '[data-section="route-conditions"]',
      'section[aria-label="Route conditions"]',
      "#route-conditions",
    ]);
  }, []);

  const onWeekly = useCallback(() => {
    if (latestReportId) navigate(`/tiss/reports/${latestReportId}`);
    else navigate("/tiss/reports");
  }, [latestReportId, navigate]);

  const onSupport = useCallback(() => {
    window.open("https://guidetopakistan.pk/contact", "_blank", "noopener,noreferrer");
  }, []);

  return (
    <section aria-label="Quick checks">
      <div className="mb-5">
        <h3 className="text-lg sm:text-xl font-extrabold" style={{ color: HEADING_GREEN }}>
          What would you like to check?
        </h3>
        <p className="mt-1 text-sm text-slate-600">
          Quick actions to jump straight to the most important information.
        </p>
      </div>

      <SubParent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionCard
            featured
            icon={<MapPin size={20} />}
            title="Destination Status"
            desc="Check weather, access, local situation, and travel suitability."
            onClick={onDestination}
          />

          <ActionCard
            icon={<RouteIcon size={20} />}
            title="Route Status"
            desc="Check road conditions, movement window, delays, and cautions."
            onClick={onRoutes}
          />

          <ActionCard
            icon={<CalendarRange size={20} />}
            title="Weekly Travel Outlook"
            desc="See this week's best destinations, caution areas, and travel tips."
            onClick={onWeekly}
          />

          <ActionCard
            icon={<Headphones size={20} />}
            title="Ask Travel Support"
            desc="Get help from GTP for your trip planning and verification."
            onClick={onSupport}
          />
        </div>
      </SubParent>
    </section>
  );
}