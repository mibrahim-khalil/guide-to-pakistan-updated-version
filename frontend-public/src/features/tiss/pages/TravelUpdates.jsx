import { useEffect, useMemo, useState } from "react";

import HomeHero from "../components/hero/HomeHero.jsx";
import TravelIntelDashboard from "../components/dashboard/TravelIntelDashboard.jsx";

import CTABanner from "../components/banners/CTABanner.jsx";
import DisclaimerFooter from "../components/banners/DisclaimerFooter.jsx";

import DestinationGrid from "../components/sections/DestinationGrid.jsx";
import RouteConditionsSection from "../components/sections/RouteConditionsSection.jsx";
import AdvisoriesSection from "../components/sections/AdvisoriesSection.jsx";
import WeeklyReportTeaser from "../components/cards/WeeklyReportTeaser.jsx";
import SkeletonBlock from "../components/common/SkeletonBlock.jsx";
import QuickCheckSection from "../components/sections/QuickCheckSection.jsx";

// NEWLY ADDED IMPORT
import LiveRouteCheckSection from "../components/sections/LiveRouteCheckSection.jsx"; 

import { getTravelUpdatesPageData } from "../lib/apiClient.js";
import { sortDestinationsByStatusThenName } from "../lib/statusLogic.js";

/* EXACT requirement:
   - remove white parent containers
   - make green panels match header color
*/
const PANEL_BG = "#D3ECDD"; // same family as header
const PANEL_BORDER = "#B7D9C6"; // same as header border
const HEADING_GREEN = "#0F2F22";

function Container({ children }) {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 sm:px-6 lg:px-10">
      {children}
    </div>
  );
}

function Panel({ children, className = "", id, dataSection }) {
  return (
    <div
      id={id}
      data-section={dataSection}
      className={[
        "rounded-3xl border shadow-sm",
        "p-6 sm:p-8",
        "scroll-mt-24",
        className,
      ].join(" ")}
      style={{ backgroundColor: PANEL_BG, borderColor: PANEL_BORDER }}
    >
      {children}
    </div>
  );
}

function Divider() {
  return (
    <div
      className="my-6 h-px w-full"
      style={{ backgroundColor: PANEL_BORDER }}
      aria-hidden="true"
    />
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-5">
      <h2
        className="text-lg sm:text-xl font-extrabold"
        style={{ color: HEADING_GREEN }}
      >
        {title}
      </h2>
      {subtitle ? (
        <div className="mt-1 text-sm text-slate-600">{subtitle}</div>
      ) : null}
    </div>
  );
}

export default function TravelUpdates() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      try {
        const res = await getTravelUpdatesPageData();
        if (mounted) setData(res);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const activeDestinations = useMemo(() => {
    if (!data?.destinations) return [];
    return data.destinations.filter((d) => d.is_active);
  }, [data]);

  const sortedDestinations = useMemo(() => {
    return sortDestinationsByStatusThenName(activeDestinations);
  }, [activeDestinations]);

  return (
    <>
      {/* HERO (kept) */}
      {loading ? (
        <div className="py-10">
          <Container>
            <SkeletonBlock className="h-[360px] sm:h-[440px] md:h-[520px] lg:h-[620px]" />
          </Container>
        </div>
      ) : (
        <HomeHero />
      )}

      {/* STEP-BY-STEP MODULES */}
      <div className="py-10 sm:py-12">
        <Container>
          <div className="space-y-8">
            {/* 1) Quick checks */}
            {loading ? (
              <Panel>
                <SkeletonBlock className="h-52" />
              </Panel>
            ) : (
              <Panel>
                <QuickCheckSection />
              </Panel>
            )}

            {/* 1.5) LIVE ROUTE CHECK (Our New Feature!) */}
            {!loading && (
              <Panel id="live-route-check" dataSection="live-route-check">
                <LiveRouteCheckSection />
              </Panel>
            )}

            {/* 2) Overview + 3) Destinations */}
            {loading ? (
              <Panel>
                <SkeletonBlock className="h-80" />
              </Panel>
            ) : (
              <Panel>
                <SectionHeading
                  title="Overview"
                  subtitle="Search, overall status, and quick filters."
                />
                <TravelIntelDashboard
                  destinations={sortedDestinations}
                  routes={data?.routes || []}
                />

                <Divider />

                {/* DestinationGrid already renders its own “Destinations” header */}
                <div
                  id="destinations"
                  data-section="destinations"
                  className="scroll-mt-24"
                >
                  <DestinationGrid destinations={sortedDestinations} />
                </div>
              </Panel>
            )}

            {/* 4) Route Conditions + 5) Active Advisories */}
            {loading ? (
              <Panel id="route-conditions" dataSection="route-conditions">
                <SkeletonBlock className="h-80" />
              </Panel>
            ) : (
              <Panel id="route-conditions" dataSection="route-conditions">
                <RouteConditionsSection routes={data?.routes || []} />

                <Divider />

                <AdvisoriesSection advisories={data?.advisories || []} />
              </Panel>
            )}

            {/* 6) Weekly Report & Next Steps */}
            {loading ? (
              <Panel>
                <SkeletonBlock className="h-44" />
              </Panel>
            ) : (
              <Panel className="space-y-6">
                <SectionHeading title="Weekly Report & Next Steps" />
                <WeeklyReportTeaser report={data?.latest_report} />
                <CTABanner />
              </Panel>
            )}

            {/* 7) Disclaimer */}
            <DisclaimerFooter />
          </div>
        </Container>
      </div>
    </>
  );
}