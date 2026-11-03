import { useCallback } from "react";
import {
  MapPin,
  Route as RouteIcon,
  BadgeCheck,
  Cloud,
  Radio,
} from "lucide-react";

const HERO_IMAGE = "/images/tiss/hero.jpeg";

function scrollToSelector(selector) {
  const el = document.querySelector(selector);
  if (el) {
    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function FeatureItem({ icon, label }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/70">
      <span className="text-white/60" aria-hidden="true">
        {icon}
      </span>
      {label}
    </span>
  );
}

export default function HomeHero() {
  const onCheckDestination = useCallback(() => {
    scrollToSelector("#destinations");
  }, []);

  const onCheckRoute = useCallback(() => {
    scrollToSelector("#route-conditions");
  }, []);

  return (
    <section
      aria-label="Hero"
      className="w-full mt-0 pt-0 -mt-4 sm:-mt-6"
    >
      <div className="relative w-full bg-slate-950 overflow-hidden">
        <div className="pointer-events-none absolute bottom-4 right-4 z-20 text-xs text-white/60">
          Powered by GTP‑TISS
        </div>

        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt=""
            className="h-full w-full object-cover opacity-85"
            loading="lazy"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-28 bg-gradient-to-b from-transparent via-slate-950/75 to-slate-950" />
        </div>

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="min-h-[360px] sm:min-h-[480px] lg:min-h-[600px] flex items-center py-10 sm:py-14">
            <div className="max-w-4xl w-full">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold text-emerald-200 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Live Travel Intelligence
              </div>

              <h1 className="mt-6 max-w-2xl text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Check Travel Conditions
                <br className="hidden sm:block" />
                Before You Go
              </h1>

              <p className="mt-4 max-w-2xl text-sm sm:text-base text-white/85 leading-relaxed">
                Get current guidance on weather, roads, civic situation,
                destination suitability, and GTP travel advisory.
              </p>

              <div className="mt-5 max-w-2xl flex flex-wrap items-center gap-x-5 gap-y-2">
                <FeatureItem icon={<Radio size={16} />} label="Live Data" />
                <FeatureItem icon={<MapPin size={16} />} label="Destinations" />
                <FeatureItem icon={<BadgeCheck size={16} />} label="GTP Verified" />
                <FeatureItem icon={<Cloud size={16} />} label="Weather" />
              </div>

              <div className="mt-7 max-w-2xl flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={onCheckDestination}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
                >
                  <MapPin size={18} aria-hidden="true" />
                  Check My Destination
                </button>

                <button
                  type="button"
                  onClick={onCheckRoute}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 backdrop-blur transition-colors"
                >
                  <RouteIcon size={18} aria-hidden="true" />
                  Check My Route
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}