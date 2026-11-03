import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Search, ArrowLeft } from "lucide-react";

import { getTravelUpdatesPageData } from "../lib/apiClient.js";
import SkeletonBlock from "../components/common/SkeletonBlock.jsx";
import RouteRow from "../components/cards/RouteRow.jsx";

function rank(status) {
  const map = { closed: 0, risky: 1, delayed: 2, open: 3, unknown: 4 };
  return map[String(status || "").toLowerCase()] ?? 99;
}

export default function RouteConditions() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [q, setQ] = useState("");
  const [openRouteId, setOpenRouteId] = useState(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      const res = await getTravelUpdatesPageData();
      if (!mounted) return;
      setData(res || null);
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const routes = useMemo(() => data?.routes || [], [data]);

  const highlightsCount = useMemo(() => {
    return (routes || []).filter((r) =>
      ["closed", "risky", "delayed"].includes(String(r?.status || "").toLowerCase())
    ).length;
  }, [routes]);

  const filteredRoutes = useMemo(() => {
    const text = String(q || "").trim().toLowerCase();

    const sorted = [...(routes || [])].sort((a, b) => rank(a?.status) - rank(b?.status));
    if (!text) return sorted;

    return sorted.filter((r) => {
      const blob = [
        r?.name,
        r?.slug,
        r?.from_place,
        r?.to_place,
        r?.cause,
        r?.caution_note,
        r?.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return blob.includes(text);
    });
  }, [routes, q]);

  const handleToggle = (routeId) => {
    setOpenRouteId((prev) => (prev === routeId ? null : routeId));
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[var(--gti-page-bg)]">
        <div className="w-full max-w-none px-4 sm:px-6 lg:px-10 py-8">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <SkeletonBlock className="h-8 w-56" />
            <SkeletonBlock className="h-12" />
            <SkeletonBlock className="h-[520px]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[var(--gti-page-bg)]">
      <Helmet>
        <title>Route Conditions | Guide to Pakistan Live</title>
      </Helmet>

      <div className="w-full max-w-none px-4 sm:px-6 lg:px-10 py-8">
        {/* White parent */}
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
                Route Conditions
              </span>
            </nav>
          </div>

          {/* Mint sub-parent */}
          <div
            className="rounded-3xl border shadow-sm p-6 sm:p-8 space-y-6"
            style={{
              backgroundColor: "var(--gti-brand-green-light)",
              borderColor: "var(--gti-brand-green-border)",
            }}
          >
            {/* Search */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Search size={18} aria-hidden="true" />
              </div>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search routes — KKH, Babusar, Naran..."
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

            {/* Header */}
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1
                  className="text-lg sm:text-xl font-extrabold"
                  style={{ color: "var(--gti-brand-green-deepest)" }}
                >
                  Route Conditions
                </h1>

                {highlightsCount > 0 ? (
                  <span className="inline-flex items-center rounded-full bg-amber-100 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-900">
                    {highlightsCount} highlights
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-900">
                    No major disruptions
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-slate-600">
                All routes (manual for MVP). Use search to filter. Click{" "}
                <span
                  className="font-semibold"
                  style={{ color: "var(--gti-brand-green-dark)" }}
                >
                  View route details
                </span>{" "}
                to expand a route&apos;s map and notes.
              </p>
            </div>

            {/* Rows */}
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-200">
                {filteredRoutes.length ? (
                  filteredRoutes.map((r) => (
                    <RouteRow
                      key={r.id}
                      route={r}
                      isExpanded={openRouteId === r.id}
                      onToggle={() => handleToggle(r.id)}
                    />
                  ))
                ) : (
                  <div className="p-5 text-sm text-slate-500 italic">
                    No routes match this search.
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* end mint sub-parent */}
        </div>
      </div>
    </div>
  );
}