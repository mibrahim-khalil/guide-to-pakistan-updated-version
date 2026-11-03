import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MapPin,
  AlertTriangle,
  Route as RouteIcon,
  Calendar,
  ShoppingBag,
  HeartHandshake,
  Sparkles,
  Check,
  Users,
  Mountain,
  Star,
  Flame,
  TrendingUp,
  Sun,
  CloudSun,
  CloudRain,
  Cloud,
  Wind,
  Clock,
  ArrowUpRight,
  Image as ImageIcon,
  MessageSquareQuote,
  ThumbsUp,
  Quote,
} from "lucide-react";

import Button from "../components/common/Button.jsx";
import SkeletonBlock from "../components/common/SkeletonBlock.jsx";
import { getReportById, getTravelUpdatesPageData } from "../lib/apiClient.js";

/* ============================================================
   THEME COLORS
   ============================================================ */
const PAGE_BG_COLOR       = "#F8FAF7";
const BRAND_GREEN_DARK    = "#0FA958";
const BRAND_GREEN_DEEPEST = "#01411C";
const BRAND_GREEN_LIGHT   = "#E8F5EE";

/* ============================================================
   HELPERS
   ============================================================ */

function formatDateShort(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
}

function timeAgo(iso) {
  if (!iso) return "just now";
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "recently";
  const diff = Math.max(0, Date.now() - then);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

function norm(s) {
  return String(s || "").trim().toLowerCase();
}

function getInitials(name) {
  if (!name) return "??";
  const parts = String(name).trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getDestinationImage(destination) {
  return (
    destination?.image_url ||
    destination?.image ||
    destination?.thumbnail ||
    destination?.photo_url ||
    ""
  );
}

function getDestinationRegion(destination) {
  return (
    destination?.region ||
    destination?.province ||
    destination?.area ||
    "NORTHERN PAKISTAN"
  );
}

function getDestinationDescription(destination) {
  return (
    destination?.description ||
    destination?.tagline ||
    destination?.summary ||
    "Experience turquoise lakes, alpine meadows and centuries-old villages — curated stops for your itinerary."
  );
}

/* ============================================================
   SMALL SHARED UI PIECES
   ============================================================ */

function NoData({ label = "No data available" }) {
  return (
    <div className="w-full flex items-center justify-center py-6">
      <span className="text-sm italic text-slate-500">{label}</span>
    </div>
  );
}

function NiceListLight({ items }) {
  if (!items?.length) {
    return (
      <span className="text-sm italic text-slate-500">No data available</span>
    );
  }
  return (
    <ul className="space-y-2.5">
      {items.map((x, idx) => (
        <li key={idx} className="flex items-start gap-2.5">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
            <Check size={12} aria-hidden="true" />
          </span>
          <span className="text-slate-700 text-[13px] leading-relaxed">{x}</span>
        </li>
      ))}
    </ul>
  );
}

function StarRating({ rating = 5, size = 14 }) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <Star
        key={i}
        size={size}
        className={i < rating ? "text-emerald-500 fill-emerald-500" : "text-slate-300"}
        aria-hidden="true"
      />
    );
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

/* ============================================================
   KPI CARD
   ============================================================ */

function KpiCard({ icon, iconBg, iconColor, value, valueSuffix, label, delta, delay = 0 }) {
  return (
    <div
      className="group rounded-2xl bg-white border border-slate-200 p-5 shadow-sm
                 transition-all duration-300 ease-out
                 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10
                 animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor} transition-transform duration-300 group-hover:scale-110`}>
          {icon}
        </div>
        {delta && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-semibold text-emerald-700">
            <TrendingUp size={12} aria-hidden="true" />
            {delta}
          </span>
        )}
      </div>
      <div className="mt-5">
        <div className="text-3xl sm:text-4xl font-extrabold leading-none" style={{ color: BRAND_GREEN_DEEPEST }}>
          {value}
          {valueSuffix && <span className="text-emerald-600">{valueSuffix}</span>}
        </div>
        <div className="mt-2 text-[11px] sm:text-xs font-bold tracking-wider text-slate-500 uppercase">
          {label}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   WEATHER + ROAD COMBINED CARD
   ============================================================ */

function WeatherRoadCard({
  city,
  temp,
  condition,
  weatherIcon,
  weatherIconBg,
  weatherIconColor,
  roadName,
  roadStatus,
  roadNote,
  roadStatusColor,
}) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm
                    transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-300">
      <div className="flex items-center gap-3">
        <div className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${weatherIconBg} ${weatherIconColor}`}>
          {weatherIcon}
        </div>
        <div className="min-w-0">
          <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            {city}
          </div>
          <div className="text-lg font-extrabold leading-tight" style={{ color: BRAND_GREEN_DEEPEST }}>{temp}</div>
          <div className="text-xs text-slate-600 truncate">{condition}</div>
        </div>
      </div>

      <div className="my-3 border-t border-slate-200" />

      <div className="flex items-center gap-3">
        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-slate-600">
          <RouteIcon size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-extrabold leading-tight truncate" style={{ color: BRAND_GREEN_DEEPEST }}>
              {roadName}
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${roadStatusColor}`}
            >
              {roadStatus}
            </span>
          </div>
          {roadNote && (
            <div className="mt-0.5 text-xs text-slate-500 truncate">
              {roadNote}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   TRAVEL GUIDANCE CARD
   ============================================================ */

function GuidanceCard({ icon, iconBg, iconColor, title, children }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm
                    transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-300
                    h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
          {icon}
        </div>
        <h4 className="text-sm sm:text-base font-extrabold leading-tight" style={{ color: BRAND_GREEN_DEEPEST }}>
          {title}
        </h4>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

/* ============================================================
   FEEDBACK CARD (TEXT ONLY — NO IMAGES)
   ============================================================ */

function FeedbackCard({
  name,
  tour,
  quote,
  rating = 5,
  tripType,
  tripLocation,
  avatarColor = "bg-emerald-100 text-emerald-700 border-emerald-200",
}) {
  return (
    <div className="relative rounded-2xl bg-white border border-slate-200 shadow-sm
                    transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300
                    h-full flex flex-col overflow-hidden">
      {/* Header (text-only, no image) */}
      {(tripType || tripLocation) && (
        <div className="px-4 pt-4 pb-3 border-b border-slate-100">
          {tripType && (
            <div
              className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase"
              style={{ color: BRAND_GREEN_DARK }}
            >
              {tripType}
            </div>
          )}
          {tripLocation && (
            <div
              className="mt-1 text-base sm:text-lg font-extrabold leading-tight"
              style={{ color: BRAND_GREEN_DEEPEST }}
            >
              {tripLocation}
            </div>
          )}
        </div>
      )}

      <div className="relative p-4 flex flex-col flex-1">
        <Quote
          size={30}
          className="absolute top-3 right-3 text-emerald-100"
          aria-hidden="true"
        />

        <div className="mb-2 relative z-10">
          <StarRating rating={rating} size={12} />
        </div>

        <p className="text-slate-700 text-[12px] leading-relaxed italic flex-1 relative z-10">
          {"\u201C"}{quote}{"\u201D"}
        </p>

        <div className="my-3 border-t border-slate-200" />

        <div className="flex items-center gap-2.5">
          <div className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-bold text-[11px] ${avatarColor}`}>
            {getInitials(name)}
          </div>
          <div className="min-w-0">
            <div className="text-[13px] font-bold truncate" style={{ color: BRAND_GREEN_DEEPEST }}>{name}</div>
            {tour && (
              <div className="text-[10px] text-slate-500 truncate">{tour}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   RECOMMENDATION HIGHLIGHT BANNER
   ============================================================ */

function RecommendHighlightBanner({
  percentage = "96%",
  label = "Would Recommend",
  subtitle = "Based on 480+ traveller reviews this week",
  rating = "4.9 / 5",
  delta = "+3%",
}) {
  return (
    <div
      className="relative w-full rounded-3xl overflow-hidden shadow-xl
                 transition-all duration-300 hover:shadow-2xl"
      style={{
        background: `linear-gradient(135deg, ${BRAND_GREEN_DARK} 0%, #12BD64 60%, #22C46B 100%)`,
      }}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 h-40 w-40 rounded-full bg-white/25 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
      </div>

      <div className="relative z-10 p-5 sm:p-6 lg:p-7">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="flex items-center gap-4">
            <div className="inline-flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl bg-white/25 border border-white/40 text-white shadow-lg backdrop-blur-md">
              <ThumbsUp size={26} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="text-4xl sm:text-5xl font-extrabold text-white leading-none">
                  {percentage}
                </div>
                {delta && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/25 border border-white/40 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                    <TrendingUp size={11} />
                    {delta}
                  </span>
                )}
              </div>
              <div className="mt-1 text-[11px] font-bold tracking-widest text-white/90 uppercase">
                {label}
              </div>
            </div>
          </div>

          <div className="text-center lg:border-x lg:border-white/25 lg:px-6">
            <p className="text-white text-sm sm:text-base leading-relaxed italic"
               style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              {"\u201C"}{subtitle}{"\u201D"}
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-1.5">
            <div className="flex items-center gap-0.5">
              {[0,1,2,3,4].map((i) => (
                <Star key={i} size={20} className="text-white fill-white" aria-hidden="true" />
              ))}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white leading-none">
              {rating}
            </div>
            <div className="text-[10px] font-bold tracking-wider text-white/90 uppercase">
              Average Rating
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   CINEMATIC BEST DESTINATIONS SLIDER
   ============================================================ */

function CinematicDestinationSlider({ destinations }) {
  const len = Array.isArray(destinations) ? destinations.length : 0;

  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const indexRef = useRef(index);
  const fadeTimeoutRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    setIndex(0);
    setIsFading(false);
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [len]);

  const goTo = (nextIndex) => {
    if (len <= 1) return;
    if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    setIsFading(true);
    fadeTimeoutRef.current = setTimeout(() => {
      setIndex(nextIndex);
      setIsFading(false);
    }, 320);
  };

  const advance = (dir) => {
    if (len <= 1) return;
    const current = indexRef.current;
    let next = current + dir;
    if (next < 0) next = len - 1;
    if (next >= len) next = 0;
    goTo(next);
  };

  useEffect(() => {
    if (len <= 1) return;
    intervalRef.current = setInterval(() => {
      advance(1);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [len]);

  if (!destinations?.length) {
    return (
      <div className="w-full h-[420px] rounded-3xl bg-white border border-slate-200 flex items-center justify-center">
        <span className="text-slate-500 italic">No destinations available</span>
      </div>
    );
  }

  const d = destinations[index];
  const img = getDestinationImage(d);
  const region = getDestinationRegion(d);
  const description = getDestinationDescription(d);

  const thumbnails = destinations.filter((_, i) => i !== index).slice(0, 3);
  const displayThumbnails =
    thumbnails.length > 0 ? thumbnails : destinations.slice(0, 3);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-xl border border-slate-200
                    h-[420px] sm:h-[500px] lg:h-[560px]">
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
      >
        {img ? (
          <img
            src={img}
            alt={d.name}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-400" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      </div>

      <button
        type="button"
        onClick={() => advance(-1)}
        aria-label="Previous destination"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20
                   inline-flex h-11 w-11 items-center justify-center
                   rounded-full bg-white/15 backdrop-blur-md
                   border border-white/25 text-white
                   opacity-90 hover:opacity-100 hover:bg-white/25 transition"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        type="button"
        onClick={() => advance(1)}
        aria-label="Next destination"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                   inline-flex h-11 w-11 items-center justify-center
                   rounded-full bg-white/15 backdrop-blur-md
                   border border-white/25 text-white
                   opacity-90 hover:opacity-100 hover:bg-white/25 transition"
      >
        <ChevronRight size={20} />
      </button>

      <div
        className={`absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 z-10
                    transition-opacity duration-300 ${
                      isFading ? "opacity-0" : "opacity-100"
                    }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-xl">
            <span
              className="inline-flex items-center gap-1.5 rounded-full text-white
                         px-3 py-1 text-[11px] font-bold tracking-wider uppercase shadow-lg"
              style={{ backgroundColor: BRAND_GREEN_DARK, boxShadow: `0 8px 24px ${BRAND_GREEN_DARK}55` }}
            >
              <MapPin size={12} />
              {region}
            </span>

            <h3 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-none drop-shadow-2xl"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontStyle: "italic", fontWeight: 700 }}>
              {d.name}
            </h3>

            <p className="mt-3 text-sm sm:text-base text-slate-100 leading-relaxed max-w-md">
              {description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                to={`/tiss/destinations/${d.slug}`}
                className="inline-flex items-center gap-2 rounded-full transition
                           text-white text-sm font-bold px-5 py-2.5 shadow-lg hover:brightness-110"
                style={{ backgroundColor: BRAND_GREEN_DARK, boxShadow: `0 10px 30px ${BRAND_GREEN_DARK}66` }}
              >
                Plan a trip here <ChevronRight size={16} />
              </Link>

              <Link
                to={`/tiss/destinations/${d.slug}#gallery`}
                className="inline-flex items-center gap-2 rounded-full
                           bg-white/15 hover:bg-white/25 backdrop-blur-md
                           border border-white/30 transition
                           text-white text-sm font-bold px-5 py-2.5"
              >
                <ImageIcon size={16} />
                View gallery
              </Link>
            </div>
          </div>

          {displayThumbnails.length > 0 && (
            <div className="flex items-center gap-3 shrink-0">
              {displayThumbnails.map((thumb, idx) => {
                const thumbImg = getDestinationImage(thumb);
                const originalIdx = destinations.findIndex(
                  (dest) => dest.slug === thumb.slug
                );
                const isActive = originalIdx === index;

                return (
                  <button
                    key={thumb.slug || idx}
                    type="button"
                    onClick={() => originalIdx !== -1 && goTo(originalIdx)}
                    className={`relative flex flex-col items-center gap-1.5 group
                                transition-all duration-300
                                ${isActive ? "scale-105" : "opacity-80 hover:opacity-100"}`}
                    aria-label={`Switch to ${thumb.name}`}
                  >
                    <div
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden
                                  border-2 transition-all shadow-lg
                                  ${
                                    isActive
                                      ? "border-emerald-400 ring-2 ring-emerald-400/40"
                                      : "border-white/30 group-hover:border-white/60"
                                  }`}
                    >
                      {thumbImg ? (
                        <img
                          src={thumbImg}
                          alt={thumb.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-400 to-slate-600" />
                      )}
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-white uppercase drop-shadow-md">
                      {thumb.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ACTIVITY IMAGE SLIDER (Weekly Story Section)
   ============================================================ */

function ActivityImageSlider({ slides, heightClass = "h-40 sm:h-44 md:h-48 lg:h-52", activeIndex }) {
  return (
    <div className={`relative w-full ${heightClass} rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-200`}>
      {slides.map((slide, idx) => {
        const isActive = idx === activeIndex;
        return (
          <div
            key={idx}
            className="absolute inset-0 transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.8,0.25,1)] will-change-transform"
            style={{
              transform: isActive ? "translateX(0)" : "translateX(100%)",
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 2 : 1,
            }}
          >
            <img
              src={slide.image}
              alt={slide.caption}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <span
              className="absolute bottom-3 left-3 inline-flex items-center rounded-full
                         bg-white/15 backdrop-blur-lg border border-white/30
                         px-3 py-1 text-xs font-semibold text-white shadow-lg"
            >
              {slide.caption}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */

const HERO_BACKGROUND_IMG = "/assets/destinations/hunza.jpg";

export default function ReportDetail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(null);
  const [destData, setDestData] = useState(null);
  const [storyExpanded, setStoryExpanded] = useState(false);

  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  /* ---- Activity Slider Synced Index ---- */
  const [activityIndex, setActivityIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await getReportById(id);
      if (!mounted) return;
      setState(res);
      setLoading(false);
    })();
    return () => (mounted = false);
  }, [id]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await getTravelUpdatesPageData();
      if (!mounted) return;
      setDestData(res || null);
    })();
    return () => (mounted = false);
  }, []);

  const report = state?.report || null;
  const c = report?.content_json || {};
  const destinations = destData?.destinations || [];

  const matchedDestinations = useMemo(() => {
    if (!c.best_destinations || !destinations.length) return [];
    const byName = new Map(destinations.map((d) => [norm(d.name), d]));
    return c.best_destinations.map((name) => byName.get(norm(name))).filter(Boolean);
  }, [c.best_destinations, destinations]);

  const travelWindows = useMemo(() => {
    const defaults = [
      "Early morning departures (6:00 AM – 9:00 AM)",
      "Mid-week travel for fewer crowds",
      "Avoid late afternoon departures (after 4:00 PM)",
    ];
    const existing = c.recommended_windows || [];
    if (existing.length >= 3) return existing.slice(0, 3);
    return [...existing, ...defaults.slice(existing.length)];
  }, [c.recommended_windows]);

  const topExperiences = useMemo(() => {
    const defaults = [
      "Sunrise viewpoints",
      "Local food stops",
      "Easy day hikes",
      "Cultural village walks",
    ];
    const existing = c.top_experiences || [];
    if (existing.length >= 4) return existing.slice(0, 4);
    return [...existing, ...defaults.slice(existing.length)];
  }, [c.top_experiences]);

  const packingSuggestions = [
    "Layered clothing for varying altitudes",
    "Waterproof jacket, hiking boots, extra socks",
    "High-SPF sunscreen, UV sunglasses, wide-brim hat",
  ];

  const cautionAreasList = useMemo(() => {
    if (c.caution_areas?.length) return c.caution_areas;
    return ["Naran (weather disruption possible)"];
  }, [c.caution_areas]);

  const summaryParagraphs = useMemo(() => {
    const overviewText = c.overview || "";

    const block1 = overviewText
      ? `${overviewText} Rivers across the north are flowing strong this week, offering some of the most exciting rafting experiences of the season. The Indus and Kunhar rivers, in particular, are drawing adventure enthusiasts from across the country. Operators are running well-organized trips with certified guides, and safety conditions remain within recommended standards for intermediate and experienced rafters.`
      : `Overall travel conditions across Northern Pakistan remain mostly favorable this week, with clear skies dominating the region and comfortable daytime temperatures across most valleys. Rivers are flowing strong, offering some of the most exciting rafting experiences of the season. The Indus and Kunhar rivers, in particular, are drawing adventure enthusiasts from across the country. Operators are running well-organized trips with certified guides, and safety conditions remain within recommended standards for intermediate and experienced rafters.`;

    const block2 = `Hiking trails throughout Hunza, Skardu, Naran, and Kaghan are in excellent shape, with dry pathways and stable weather making it an ideal time for both day hikes and multi-day treks. Popular routes like the Fairy Meadows trail and Rakaposhi base camp are seeing steady but manageable footfall. Trekkers are advised to start early, carry adequate water, and inform local checkpoints of their intended routes for added safety along remote sections.`;

    return { block1, block2 };
  }, [c.overview]);

  const editorialHeadline =
    c.editorial_headline || "A quiet, generous week across Northern Pakistan";
  const highlightWord = c.headline_highlight || "Northern Pakistan";
  const heroSubtitle =
    c.hero_subtitle ||
    "Guided tours, top destinations, adventure activities and real-time travel updates — every journey managed by experienced local guides.";

  const locationTags = c.location_tags || ["Hunza", "Skardu", "Naran", "Swat"];
  const travelersMeta = c.travelers_meta || "480+ travelers";
  const distanceMeta = c.distance_meta || "4,200+ km covered";

  const kpiStats = c.kpi_stats || [
    { value: "28", label: "Tours Completed", delta: "+12%", icon: "mountain" },
    { value: "484", label: "Travelers Served", delta: "+18%", icon: "users" },
    { value: "49", valueSuffix: "/50", label: "Avg Rating", delta: "+0.2", icon: "star" },
    { value: "96", valueSuffix: "%", label: "Would Recommend", delta: "+3%", icon: "flame" },
  ];

  const weatherRoadSnapshot = c.weather_road_snapshot || [
    {
      city: "Hunza", temp: "22°C", condition: "Clear", icon: "sun",
      road: { name: "KKH (N-35)", status: "Open", note: "Clear passage", level: "open" },
    },
    {
      city: "Skardu", temp: "18°C", condition: "Partly cloudy", icon: "cloud-sun",
      road: { name: "Skardu Road", status: "Delayed", note: "Slow near maintenance", level: "delayed" },
    },
    {
      city: "Naran", temp: "14°C", condition: "Light rain", icon: "cloud-rain",
      road: { name: "Naran–Kaghan", status: "Open", note: "Smooth traffic", level: "open" },
    },
    {
      city: "Deosai", temp: "11°C", condition: "Windy", icon: "wind",
      road: { name: "Deosai Plateau", status: "Closed", note: "Snow closure", level: "closed" },
    },
  ];

  /* ============================================================
     ACTIVITY SLIDES — VERIFIED WORKING UNSPLASH URLs
     ============================================================ */

  const activitySlidesBlockA = [
    {
      caption: "Kunhar · Rafting",
      image:
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1200&q=80",
    },
    {
      caption: "Hunza · Paragliding",
      image:
        "https://images.unsplash.com/photo-1601024445121-e5b82f020549?auto=format&fit=crop&w=1200&q=80",
    },
    {
      caption: "Skardu · Jeep Safari",
      image:
        "https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const activitySlidesBlockB = [
    {
      caption: "Karakoram · Trekking",
      image:
        "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80",
    },
    {
      caption: "Fairy Meadows · Hiking",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    },
    {
      caption: "Naran · Zipline",
      image:
        "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const activitySlideCount = Math.min(
    activitySlidesBlockA.length,
    activitySlidesBlockB.length
  );

  // Synced auto-play timer (5 seconds)
  useEffect(() => {
    if (activitySlideCount <= 1) return;
    const timer = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % activitySlideCount);
    }, 5000);
    return () => clearInterval(timer);
  }, [activitySlideCount]);

  const longFormStory =
    c.long_form_story ||
    `This past week carried a quiet momentum through the valleys of the north. Twenty-eight guided journeys unfolded — some drifting gently through Hunza's apricot orchards, others climbing toward Skardu and the hushed edges of Deosai. Families made up sixteen of them, while eight private groups chose the slower, more personal path through the mountains.

Adventure ran through almost every day. Trekkers set out at first light along the Fairy Meadows trail, rafters rode the living pulse of the Kunhar, and jeep convoys rolled into Naran and Kaghan. Evenings settled around bonfires and chai, and photographers waited for that final band of gold to cross Rakaposhi.

There were moments worth holding onto. A sunrise trek on Fairy Meadows that everyone made it to the top of. A quiet ibex sighting on the Deosai plains. Over five hundred photographs shared, new friendships with local hosts, and — most importantly — not a single serious safety incident across any route.

Travellers, in turn, were generous with their words. The week closed at 4.9 out of 5, with 98% positive reviews and 96% saying they would recommend the experience. More than 480 people were looked after across roughly 4,200 kilometres of road, trail and river.`;

  const travellerFeedback = c.traveller_feedback || [
    {
      name: "The Ahmed Family",
      tour: "5-day family tour",
      tripType: "Family Getaway",
      tripLocation: "Hunza Valley",
      rating: 5,
      quote:
        "Perfect for our kids' first mountain trip. Guides were patient, the itinerary was well-paced, and safety was clearly a priority throughout. Unforgettable memories.",
      avatarColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
    {
      name: "Sara & Friends",
      tour: "7-day tour",
      tripType: "Girls' Trip",
      tripLocation: "Skardu & Deosai",
      rating: 5,
      quote:
        "Felt completely safe and looked after the entire trip. Loved the little details — chai stops, sunrise wake-ups, local storytelling. Coming back next season for sure!",
      avatarColor: "bg-sky-100 text-sky-700 border-sky-200",
    },
    {
      name: "Bilal & Ayesha",
      tour: "4-day honeymoon",
      tripType: "Honeymoon Escape",
      tripLocation: "Naran & Kaghan",
      rating: 5,
      quote:
        "The most romantic escape we could have asked for. Cozy stays, quiet viewpoints, and a team that gave us space when we needed it. Truly special.",
      avatarColor: "bg-rose-100 text-rose-700 border-rose-200",
    },
    {
      name: "Hamza & the Boys",
      tour: "6-day trek",
      tripType: "Friends Adventure",
      tripLocation: "Fairy Meadows Trek",
      rating: 5,
      quote:
        "Our first proper trek and it exceeded every expectation. Guides pushed us just right, the food was incredible, and Nanga Parbat at sunrise was pure magic.",
      avatarColor: "bg-amber-100 text-amber-700 border-amber-200",
    },
  ];

  const feedbackRecommend = c.feedback_recommend || {
    percentage: "96%",
    label: "Would Recommend",
    subtitle: "Based on 480+ traveller reviews this week",
    rating: "4.9 / 5",
    delta: "+3%",
  };

  const resolveKpiIcon = (name) => {
    switch (norm(name)) {
      case "mountain": return { icon: <Mountain size={22} />, iconBg: "bg-emerald-50 border border-emerald-200",  iconColor: "text-emerald-700" };
      case "users":    return { icon: <Users size={22} />,    iconBg: "bg-sky-50 border border-sky-200",          iconColor: "text-sky-700" };
      case "star":     return { icon: <Star size={22} />,     iconBg: "bg-amber-50 border border-amber-200",      iconColor: "text-amber-700" };
      case "flame":    return { icon: <Flame size={22} />,    iconBg: "bg-rose-50 border border-rose-200",        iconColor: "text-rose-700" };
      default:         return { icon: <Sparkles size={22} />, iconBg: "bg-slate-50 border border-slate-200",      iconColor: "text-slate-700" };
    }
  };

  const resolveWeatherIcon = (name) => {
    switch (norm(name)) {
      case "sun":        return { icon: <Sun size={22} />,       iconBg: "bg-amber-50 border border-amber-200",  iconColor: "text-amber-600" };
      case "cloud-sun":  return { icon: <CloudSun size={22} />,  iconBg: "bg-sky-50 border border-sky-200",      iconColor: "text-sky-600" };
      case "cloud-rain": return { icon: <CloudRain size={22} />, iconBg: "bg-blue-50 border border-blue-200",    iconColor: "text-blue-600" };
      case "wind":       return { icon: <Wind size={22} />,      iconBg: "bg-slate-100 border border-slate-200", iconColor: "text-slate-600" };
      default:           return { icon: <Cloud size={22} />,     iconBg: "bg-slate-100 border border-slate-200", iconColor: "text-slate-600" };
    }
  };

  const resolveRoadStatusColor = (level) => {
    switch (norm(level)) {
      case "open":    return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "delayed": return "bg-amber-50 text-amber-700 border-amber-200";
      case "closed":  return "bg-rose-50 text-rose-700 border-rose-200";
      default:        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const renderHeadline = () => {
    if (!editorialHeadline) return null;
    if (highlightWord && editorialHeadline.includes(highlightWord)) {
      const [before, after] = editorialHeadline.split(highlightWord);
      return (
        <>
          {before}
          <span className="text-emerald-300">{highlightWord}</span>
          {after}
        </>
      );
    }
    return editorialHeadline;
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <SkeletonBlock className="h-48 rounded-2xl" />
      </div>
    );
  }

  if (!report) return null;

  const summaryWatermarkImg =
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=80";

  const lastUpdatedIso = report.updated_at || report.published_at || report.week_end;

  return (
    <>
      <style>{`
        @keyframes gtp-fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes gtp-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes gtp-fade-right {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-up    { animation: gtp-fade-up 0.7s ease-out both; }
        .animate-fade-in    { animation: gtp-fade-in 0.9s ease-out both; }
        .animate-fade-right { animation: gtp-fade-right 0.7s ease-out both; }
      `}</style>

      <Helmet>
        <title>{report.title} | Weekly Report | Guide to Pakistan Live</title>
        <meta name="description" content={c.overview || ""} />
      </Helmet>

      <div className="w-full min-h-screen" style={{ backgroundColor: PAGE_BG_COLOR }}>

        {/* HERO */}
        <header
          ref={heroRef}
          className="relative w-full overflow-hidden shadow-2xl
                     min-h-[420px] sm:min-h-[480px] lg:min-h-[560px]
                     bg-slate-900"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0 will-change-transform"
              style={{
                transform: `translate3d(0, ${scrollY * 0.25}px, 0) scale(1.1)`,
                transition: "transform 0.05s linear",
              }}
            >
              <img
                src={HERO_BACKGROUND_IMG}
                alt={editorialHeadline}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
          </div>

          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 animate-fade-in">
            <Link
              to="/"
              aria-label="Back to home"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full
                         bg-white/15 backdrop-blur-md border border-white/30 text-white
                         hover:bg-white/25 transition"
            >
              <ArrowLeft size={18} />
            </Link>
          </div>

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 animate-fade-in">
            <a
              href="https://guidetopakistan.pk/contact"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full transition
                         text-white text-sm font-bold px-5 py-2 shadow-lg hover:brightness-110"
              style={{ backgroundColor: BRAND_GREEN_DARK, boxShadow: `0 10px 30px ${BRAND_GREEN_DARK}55` }}
            >
              Book a tour <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="relative z-10 h-full">
            <div className="mx-auto max-w-7xl h-full flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-14 sm:py-16">
              <span
                className="animate-fade-up inline-flex items-center gap-2 rounded-full
                           bg-emerald-500/25 border border-emerald-400/40 backdrop-blur-md
                           px-3 py-1 text-[11px] font-bold text-emerald-100 tracking-wider
                           w-fit"
                style={{ animationDelay: "0ms" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" />
                LIVE WEEKLY REPORT
              </span>

              {editorialHeadline ? (
                <h1
                  className="animate-fade-up mt-6 text-3xl sm:text-5xl lg:text-6xl xl:text-7xl
                             font-extrabold text-white leading-[1.05] max-w-4xl
                             drop-shadow-2xl"
                  style={{ animationDelay: "120ms" }}
                >
                  {renderHeadline()}
                </h1>
              ) : (
                <span className="text-white/70 italic">No headline available</span>
              )}

              {heroSubtitle && (
                <p
                  className="animate-fade-up mt-5 text-base sm:text-lg text-slate-100 max-w-2xl leading-relaxed"
                  style={{ animationDelay: "240ms" }}
                >
                  {heroSubtitle}
                </p>
              )}

              <div
                className="animate-fade-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-100"
                style={{ animationDelay: "360ms" }}
              >
                {locationTags?.length > 0 && (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-emerald-300" aria-hidden="true" />
                    <span>{locationTags.join(" · ")}</span>
                  </div>
                )}
                {travelersMeta && (
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-emerald-300" aria-hidden="true" />
                    <span>{travelersMeta}</span>
                  </div>
                )}
                {distanceMeta && (
                  <div className="flex items-center gap-2">
                    <RouteIcon size={16} className="text-emerald-300" aria-hidden="true" />
                    <span>{distanceMeta}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-6 right-6 z-20 animate-fade-right"
            style={{ animationDelay: "480ms" }}
          >
            <div className="rounded-2xl bg-white/15 backdrop-blur-xl border border-white/25 px-5 py-4 shadow-xl w-56">
              <div className="flex items-center gap-2 text-xs font-bold text-white tracking-wider uppercase">
                <CalendarDays size={14} className="text-emerald-300" />
                Report Week
              </div>
              <div className="mt-1 text-sm font-bold text-white">
                {formatDateShort(report.week_start)} — {formatDateShort(report.week_end)}
              </div>

              <div className="mt-4 pt-3 border-t border-white/20 flex items-center gap-2 text-xs font-bold text-white tracking-wider uppercase">
                <Clock size={14} className="text-emerald-300" />
                Last Updated
              </div>
              <div className="mt-1 text-sm font-semibold text-white">
                {timeAgo(lastUpdatedIso)}
              </div>
            </div>
          </div>
        </header>

        {/* MIDDLE SECTION (now includes feedback inside same parent) */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-6xl rounded-3xl bg-white border border-slate-200 shadow-lg p-6 sm:p-8 space-y-10">

            {/* SUMMARY OF TOURS / WEEKLY STORY */}
            <div className="relative rounded-3xl border border-slate-200 shadow-md overflow-hidden bg-white">
              <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
                <img
                  src={summaryWatermarkImg}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-25"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-white/60" />
                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/40" />
              </div>

              <div className="relative z-10 p-6 sm:p-10">
                {/* WEEKLY STORY HEADING */}
                <div className="flex justify-center mb-8">
                  <h3
                    className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-widest uppercase"
                    style={{ color: BRAND_GREEN_DEEPEST }}
                  >
                    Weekly Story
                  </h3>
                </div>

                {/* BLOCK A — Text left, Activity Slider right */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center mb-8">
                  <div className="order-2 md:order-1">
                    <p className="text-slate-700 text-[15px] sm:text-base leading-relaxed">
                      {summaryParagraphs.block1}
                    </p>
                  </div>
                  <div className="order-1 md:order-2">
                    <ActivityImageSlider
                      slides={activitySlidesBlockA}
                      activeIndex={activityIndex}
                    />
                  </div>
                </div>

                {/* BLOCK B — Activity Slider left, Text right */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
                  <div className="order-1">
                    <ActivityImageSlider
                      slides={activitySlidesBlockB}
                      activeIndex={activityIndex}
                    />
                  </div>
                  <div className="order-2">
                    <p className="text-slate-700 text-[15px] sm:text-base leading-relaxed">
                      {summaryParagraphs.block2}
                    </p>
                  </div>
                </div>

                {longFormStory && (
                  <div className="mt-10 pt-6 border-t border-slate-300">
                    <div
                      className={`text-slate-700 text-[15px] leading-relaxed whitespace-pre-line overflow-hidden transition-all duration-300 ${
                        storyExpanded ? "max-h-[3000px]" : "max-h-32"
                      }`}
                      style={
                        !storyExpanded
                          ? {
                              maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                              WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                            }
                          : {}
                      }
                    >
                      {longFormStory}
                    </div>

                    <div className="flex justify-center mt-6">
                      <button
                        type="button"
                        onClick={() => setStoryExpanded((prev) => !prev)}
                        className="inline-flex items-center gap-2 rounded-full transition text-white px-6 py-2 text-sm font-bold shadow-md hover:brightness-110"
                        style={{ backgroundColor: BRAND_GREEN_DARK }}
                      >
                        {storyExpanded ? "Show Less" : "Show More"}
                        {storyExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Week Highlights + Weather & Road */}
            <div
              className="rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-8 space-y-8"
              style={{ backgroundColor: BRAND_GREEN_LIGHT }}
            >
              <div>
                <div className="flex items-center justify-between mb-5 px-1">
                  <h3 className="text-lg font-bold" style={{ color: BRAND_GREEN_DEEPEST }}>Week Highlights</h3>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Editorial highlights
                  </span>
                </div>

                {kpiStats?.length > 0 ? (
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {kpiStats.map((stat, idx) => {
                      const iconSet = resolveKpiIcon(stat.icon);
                      return (
                        <KpiCard
                          key={idx}
                          icon={iconSet.icon}
                          iconBg={iconSet.iconBg}
                          iconColor={iconSet.iconColor}
                          value={stat.value}
                          valueSuffix={stat.valueSuffix}
                          label={stat.label}
                          delta={stat.delta}
                          delay={idx * 100}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <NoData />
                )}
              </div>

              <div className="border-t border-emerald-200" />

              <div>
                <div className="flex items-center justify-between mb-5 px-1">
                  <h3 className="text-lg font-bold" style={{ color: BRAND_GREEN_DEEPEST }}>Weather &amp; Road Snapshot</h3>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                    Live · OpenWeather
                  </span>
                </div>

                {weatherRoadSnapshot?.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {weatherRoadSnapshot.map((w, idx) => {
                      const iconSet = resolveWeatherIcon(w.icon);
                      const road = w.road || {};
                      return (
                        <WeatherRoadCard
                          key={idx}
                          city={w.city}
                          temp={w.temp}
                          condition={w.condition}
                          weatherIcon={iconSet.icon}
                          weatherIconBg={iconSet.iconBg}
                          weatherIconColor={iconSet.iconColor}
                          roadName={road.name || "—"}
                          roadStatus={road.status || "Unknown"}
                          roadNote={road.note}
                          roadStatusColor={resolveRoadStatusColor(road.level)}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <NoData />
                )}
              </div>
            </div>

            {/* BEST DESTINATIONS */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                  style={{ backgroundColor: BRAND_GREEN_LIGHT, borderColor: `${BRAND_GREEN_DARK}30`, color: BRAND_GREEN_DARK }}
                >
                  <MapPin size={22} />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight" style={{ color: BRAND_GREEN_DEEPEST }}>
                  Best Destinations to Visit
                </h2>
              </div>

              <CinematicDestinationSlider destinations={matchedDestinations} />
            </div>

            {/* TRAVEL GUIDANCE */}
            <div
              className="rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-8"
              style={{ backgroundColor: BRAND_GREEN_LIGHT }}
            >
              <div className="flex items-center justify-between mb-5 px-1">
                <h3 className="text-lg font-bold" style={{ color: BRAND_GREEN_DEEPEST }}>Travel Guidance</h3>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Plan smarter
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <GuidanceCard
                  icon={<AlertTriangle size={22} />}
                  iconBg="bg-amber-50 border border-amber-200"
                  iconColor="text-amber-600"
                  title="Caution Areas"
                >
                  <NiceListLight items={cautionAreasList} />
                </GuidanceCard>

                <GuidanceCard
                  icon={<Calendar size={22} />}
                  iconBg="bg-sky-50 border border-sky-200"
                  iconColor="text-sky-600"
                  title="Recommended Travel Windows"
                >
                  <NiceListLight items={travelWindows} />
                </GuidanceCard>

                <GuidanceCard
                  icon={<ShoppingBag size={22} />}
                  iconBg="bg-emerald-50 border border-emerald-200"
                  iconColor="text-emerald-700"
                  title="Packing Suggestions"
                >
                  <NiceListLight items={packingSuggestions} />
                </GuidanceCard>

                <GuidanceCard
                  icon={<HeartHandshake size={22} />}
                  iconBg="bg-indigo-50 border border-indigo-200"
                  iconColor="text-indigo-600"
                  title="Need Help Planning?"
                >
                  <div className="flex flex-col h-full justify-between gap-4">
                    <p className="text-slate-700 text-[13px] leading-relaxed">
                      {c.cta_text ||
                        "Contact Guide to Pakistan for reliable local support, itinerary building, and on-ground assistance."}
                    </p>

                    <a
                      href="https://guidetopakistan.pk/contact"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full transition
                                 text-white text-xs font-bold px-4 py-2.5 shadow-md w-full hover:brightness-110"
                      style={{ backgroundColor: BRAND_GREEN_DARK }}
                    >
                      Contact Guide to Pakistan
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </GuidanceCard>
              </div>
            </div>

            {/* TOP EXPERIENCES */}
            <div
              className="rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-8"
              style={{ backgroundColor: BRAND_GREEN_LIGHT }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border"
                  style={{ backgroundColor: "#FFFFFF", borderColor: `${BRAND_GREEN_DARK}30`, color: BRAND_GREEN_DARK }}
                >
                  <Sparkles size={22} />
                </div>
                <h4 className="text-lg font-bold" style={{ color: BRAND_GREEN_DEEPEST }}>Top Experiences This Week</h4>
              </div>

              {topExperiences?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {topExperiences.map((exp, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-4 py-3 shadow-sm hover:border-emerald-300 transition"
                    >
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                        <Check size={12} />
                      </span>
                      <span className="text-slate-700 text-sm font-medium">{exp}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <NoData />
              )}
            </div>

            {/* FEEDBACK SECTION — now inside same parent, wrapped in light-green sub-container */}
            <div
              className="rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-8"
              style={{ backgroundColor: BRAND_GREEN_LIGHT }}
            >
              <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
                <span
                  className="inline-flex items-center gap-2 rounded-full
                             px-3 py-1 text-[10px] font-bold tracking-widest uppercase mb-4 border"
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: BRAND_GREEN_DARK,
                    borderColor: `${BRAND_GREEN_DARK}30`,
                  }}
                >
                  <Sparkles size={11} />
                  Trusted by thousands
                </span>

                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] max-w-3xl"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontStyle: "italic",
                    fontWeight: 700,
                    color: BRAND_GREEN_DEEPEST,
                  }}
                >
                  Their words.{" "}
                  <span style={{ color: BRAND_GREEN_DARK }}>Our promise.</span>
                </h2>

                <p className="mt-4 text-sm sm:text-base text-slate-700 max-w-xl leading-relaxed">
                  Real voices from real travellers who trusted us with their journey through the mountains.
                </p>

                <div className="mt-5 flex items-center gap-3">
                  <div className="h-px w-10" style={{ backgroundColor: `${BRAND_GREEN_DARK}55` }} />
                  <Star size={12} className="text-emerald-500 fill-emerald-500" />
                  <Star size={14} className="text-emerald-500 fill-emerald-500" />
                  <Star size={12} className="text-emerald-500 fill-emerald-500" />
                  <div className="h-px w-10" style={{ backgroundColor: `${BRAND_GREEN_DARK}55` }} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                {travellerFeedback.slice(0, 4).map((fb, idx) => (
                  <FeedbackCard
                    key={idx}
                    name={fb.name}
                    tour={fb.tour}
                    rating={fb.rating}
                    quote={fb.quote}
                    tripType={fb.tripType}
                    tripLocation={fb.tripLocation}
                    avatarColor={fb.avatarColor}
                  />
                ))}
              </div>

              <RecommendHighlightBanner
                percentage={feedbackRecommend.percentage}
                label={feedbackRecommend.label}
                subtitle={feedbackRecommend.subtitle}
                rating={feedbackRecommend.rating}
                delta={feedbackRecommend.delta}
              />
            </div>

          </div>
        </section>

      </div>
    </>
  );
}