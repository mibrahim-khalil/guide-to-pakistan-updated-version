import PlaceSpecificAdvisoriesSection from "../components/sections/PlaceSpecificAdvisoriesSection.jsx";
import CulturalSocialOverviewSection from "../components/sections/CulturalSocialOverviewSection.jsx";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import SkeletonBlock from "../components/common/SkeletonBlock.jsx";
import WeatherIntelligenceCarousel from "../components/sections/WeatherIntelligenceCarousel.jsx";
import DestinationAdvisoriesCarousel from "../components/sections/DestinationAdvisoriesCarousel.jsx";
import PlacesToVisitSection from "../components/sections/PlacesToVisitSection.jsx";

import { getDestinationDetailBySlug } from "../lib/apiClient.js";
import { getStatusUi } from "../lib/statusLogic.js";
import { formatRelativeTime } from "../lib/dateUtil.js";

import DestinationReviewsSection from "../components/sections/DestinationReviewsSection.jsx";

function getDestinationImage(destination) {
  return (
    destination?.image_url ||
    destination?.image ||
    destination?.thumbnail ||
    destination?.photo_url ||
    ""
  );
}

/* ✅ WHITE PARENT */
function ParentContainer({ children }) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8">
      {children}
    </div>
  );
}

/* ✅ GREEN SUB PARENT */
function SubParentContainer({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-3xl",
        "bg-[#E8F5EE]",
        "border border-[#D1FAE5]",
        "p-6 sm:p-8",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default function DestinationDetail() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [placePage, setPlacePage] = useState(0);
  const [heroImgOk, setHeroImgOk] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      const res = await getDestinationDetailBySlug(slug);
      if (mounted) {
        setDetail(res);
        setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [slug]);

  const destination = detail?.destination || null;

  const statusUi = useMemo(
    () => getStatusUi(destination?.status || "grey"),
    [destination?.status],
  );

  const heroImage = useMemo(
    () => getDestinationImage(destination),
    [destination],
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 space-y-4">
        <SkeletonBlock className="h-8 w-48" />
        <SkeletonBlock className="h-44" />
        <SkeletonBlock className="h-[520px]" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">Destination not found</div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-6">
      <Helmet>
        <title>
          {destination.name} Live Travel Updates | Guide to Pakistan
        </title>
      </Helmet>

      {/* ✅ HERO — UNCHANGED */}
      <nav className="text-sm text-slate-600" aria-label="Breadcrumb">
        <Link to="/tiss" className="hover:underline">
          Travel Updates
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">{destination.name}</span>
      </nav>

      <section
        className="mt-4 relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-900"
        aria-label="Destination header"
      >
        <div className="absolute inset-0">
          {heroImage && heroImgOk ? (
            <img
              src={heroImage}
              alt={destination.name}
              className="h-full w-full object-cover"
              onError={() => setHeroImgOk(false)}
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" />
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>

        <div className="relative p-6 sm:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900 backdrop-blur">
                  Destination
                </span>

                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusUi.pill}`}
                >
                  {statusUi.label}
                </span>

                {destination.region && (
                  <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {destination.region}
                  </span>
                )}
              </div>

              <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {destination.name}
              </h1>

              {destination.short_advisory && (
                <p className="mt-3 max-w-2xl text-sm sm:text-base text-white/90 leading-relaxed">
                  {destination.short_advisory}
                </p>
              )}
            </div>

            <div className="shrink-0 rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-4 text-white">
              <div className="text-xs text-white/80">Last updated</div>
              <div className="mt-1 text-sm font-semibold">
                {destination.last_updated
                  ? formatRelativeTime(destination.last_updated)
                  : "—"}
              </div>

              <div className="mt-3 text-xs text-white/80">Road/Access</div>
              <div className="mt-1 text-sm font-semibold">
                {destination.road_access || "—"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ BLOCK 1 */}
      <ParentContainer>
        <SubParentContainer className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Main City: {destination.name}
            </h2>
          </div>

          <CulturalSocialOverviewSection city={destination.name} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="h-full">
              <WeatherIntelligenceCarousel weather={detail.weather} />
            </div>

            <div className="h-full">
              <DestinationAdvisoriesCarousel
                advisories={detail.active_advisories || []}
              />
            </div>
          </div>
        </SubParentContainer>
      </ParentContainer>

      {/* ✅ BLOCK 2 */}
      {/* ✅ BLOCK 2 — Places + Advisories */}
      <ParentContainer>
        <SubParentContainer className="space-y-8">
          <PlacesToVisitSection
            city={destination.name}
            page={placePage}
            setPage={setPlacePage}
          />

          <PlaceSpecificAdvisoriesSection
            city={destination.name}
            page={placePage}
            setPage={setPlacePage}
          />
        </SubParentContainer>
      </ParentContainer>

      {/* ✅ BLOCK 3 — Reviews (SEPARATE SECTION) */}
      <ParentContainer>
        <SubParentContainer>
          <DestinationReviewsSection destinationName={destination.name} />
        </SubParentContainer>
      </ParentContainer>
    </div>
  );
}
