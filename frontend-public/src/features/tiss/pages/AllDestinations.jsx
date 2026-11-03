import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Search, MapPin } from "lucide-react";

import DestinationCard from "../components/cards/DestinationCard.jsx";
import SkeletonBlock from "../components/common/SkeletonBlock.jsx";
import EmptyState from "../components/common/EmptyState.jsx";

import { getTravelUpdatesPageData } from "../lib/apiClient.js";
import { getRiskUi, sortDestinationsByStatusThenName } from "../lib/statusLogic.js";

const riskFilters = ["All", "Not Safe", "High Risk", "Moderate Risk", "Low Risk", "Unknown"];

function RiskLegend() {
  return (
    <>
      <span className="text-slate-700">Sorted by risk (</span>
      <span className="mx-1 font-semibold text-red-600">Not Safe</span>
      <span className="text-slate-700">→</span>
      <span className="mx-1 font-semibold text-rose-600">High Risk</span>
      <span className="text-slate-700">→</span>
      <span className="mx-1 font-semibold text-amber-600">Moderate Risk</span>
      <span className="text-slate-700">→</span>
      <span className="mx-1 font-semibold text-emerald-600">Low Risk</span>
      <span className="text-slate-700">→</span>
      <span className="mx-1 font-semibold text-slate-600">Unknown</span>
      <span className="text-slate-700">)</span>
    </>
  );
}

export default function AllDestinations() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [selectedRisk, setSelectedRisk] = useState("All");

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

  const filteredDestinations = useMemo(() => {
    let list = sortedDestinations;

    if (selectedRisk !== "All") {
      list = list.filter((d) => getRiskUi(d.status).label === selectedRisk);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((d) => {
        const name = String(d.name || "").toLowerCase();
        const region = String(d.region || "").toLowerCase();
        return name.includes(q) || region.includes(q);
      });
    }

    return list;
  }, [sortedDestinations, selectedRisk, query]);

  const totalCount = sortedDestinations.length;
  const shownCount = filteredDestinations.length;

  return (
    <>
      <Helmet>
        <title>All Destinations | Guide to Pakistan</title>
        <meta
          name="description"
          content="Explore every destination across Pakistan with live travel intelligence, weather, and safety ratings."
        />
      </Helmet>

      <div className="w-full min-h-screen bg-[var(--gti-page-bg)]">
        {/* Hero */}
        <header className="relative w-full overflow-hidden bg-slate-900 min-h-[280px] sm:min-h-[320px]">
          <div className="absolute inset-0">
            <img
              src="/assets/hero.jpeg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
          </div>

          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
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

          <div className="relative z-10 w-full max-w-none px-4 sm:px-6 lg:px-10 py-16 sm:py-20 flex flex-col justify-center">
            <div
              className="inline-flex items-center gap-2 rounded-full
                         bg-emerald-500/25 border border-emerald-400/40 backdrop-blur-md
                         px-3 py-1 text-[11px] font-bold text-emerald-100 tracking-wider
                         w-fit"
            >
              <MapPin size={12} />
              LIVE TRAVEL INTELLIGENCE
            </div>

            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight drop-shadow-2xl">
              All Destinations
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-100 max-w-2xl leading-relaxed">
              Explore every destination across Pakistan with live travel intelligence, weather, and safety ratings.
            </p>
          </div>
        </header>

        {/* Content */}
        <section className="px-4 sm:px-6 lg:px-10 py-10 sm:py-12">
          <div className="w-full max-w-none rounded-3xl bg-white border border-slate-200 shadow-lg p-6 sm:p-8 space-y-6">
            {/* Mint filter panel */}
            <div
              className="rounded-3xl border shadow-sm p-6 sm:p-8 space-y-5"
              style={{
                backgroundColor: "var(--gti-brand-green-light)",
                borderColor: "var(--gti-brand-green-border)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <h2
                    className="text-xl sm:text-2xl font-extrabold"
                    style={{ color: "var(--gti-brand-green-deepest)" }}
                  >
                    Browse destinations
                  </h2>
                  <div className="mt-2">
                    <div className="inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-2 bg-white border border-slate-200 text-[clamp(11px,1.15vw,14px)] shadow-sm">
                      <RiskLegend />
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 shrink-0">
                  Showing{" "}
                  <span className="font-bold" style={{ color: "var(--gti-brand-green-deepest)" }}>
                    {shownCount}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold" style={{ color: "var(--gti-brand-green-deepest)" }}>
                    {totalCount}
                  </span>{" "}
                  destinations
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name or region — Hunza, Naran, Skardu..."
                  className="
                    w-full h-12 rounded-full
                    border border-slate-200
                    bg-white
                    pl-12 pr-4
                    text-sm text-slate-800
                    placeholder:text-slate-400
                    outline-none
                    focus:ring-2 focus:ring-emerald-300
                    transition
                    shadow-sm
                  "
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {riskFilters.map((filter) => {
                  const isActive = selectedRisk === filter;

                  return (
                    <button
                      key={filter}
                      onClick={() => setSelectedRisk(filter)}
                      className="rounded-full px-4 py-2 text-sm font-semibold transition border"
                      style={
                        isActive
                          ? {
                              backgroundColor: "var(--gti-brand-green-dark)",
                              color: "#FFFFFF",
                              borderColor: "var(--gti-brand-green-dark)",
                            }
                          : {
                              backgroundColor: "#FFFFFF",
                              color: "#334155",
                              borderColor: "#E2E8F0",
                            }
                      }
                    >
                      {filter}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <SkeletonBlock className="h-[560px] rounded-2xl" />
                <SkeletonBlock className="h-[560px] rounded-2xl" />
                <SkeletonBlock className="h-[560px] rounded-2xl" />
              </div>
            ) : filteredDestinations.length === 0 ? (
              <div className="py-16">
                {query.trim() || selectedRisk !== "All" ? (
                  <div className="text-center">
                    <div
                      className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border mb-4"
                      style={{
                        backgroundColor: "var(--gti-brand-green-light)",
                        borderColor: "var(--gti-brand-green-border)",
                        color: "var(--gti-brand-green-dark)",
                      }}
                    >
                      <Search size={26} />
                    </div>
                    <h3 className="text-lg font-extrabold" style={{ color: "var(--gti-brand-green-deepest)" }}>
                      No destinations match your filters
                    </h3>
                    <p className="mt-2 text-sm text-slate-600">
                      Try adjusting your search or selecting a different risk level.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        setSelectedRisk("All");
                      }}
                      className="mt-5 inline-flex items-center gap-2 rounded-full transition
                                 text-white text-sm font-bold px-6 py-2.5 shadow-md hover:brightness-110"
                      style={{ backgroundColor: "var(--gti-brand-green-dark)" }}
                    >
                      Reset filters
                    </button>
                  </div>
                ) : (
                  <EmptyState
                    title="Travel intelligence is being updated."
                    description="Please check back soon."
                  />
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredDestinations.map((d) => (
                  <DestinationCard key={d.id} destination={d} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}