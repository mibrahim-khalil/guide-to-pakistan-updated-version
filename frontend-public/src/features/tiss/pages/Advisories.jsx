import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft } from "lucide-react";

import AdvisoryCard from "../components/cards/AdvisoryCard.jsx";
import AdvisoryModal from "../components/modals/AdvisoryModal.jsx";
import SkeletonBlock from "../components/common/SkeletonBlock.jsx";
import { getPublishedAdvisories } from "../lib/apiClient.js";

/* Theme */
const PAGE_BG_COLOR       = "#F8FAF7";
const BRAND_GREEN_LIGHT   = "#E8F5EE";
const BRAND_GREEN_DARK    = "#12BD64";
const BRAND_GREEN_DEEPEST = "#01411C";

export default function Advisories() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  /* ✅ Read/write URL query params (?open=advisory-id) */
  const [searchParams, setSearchParams] = useSearchParams();

  /* Modal state — holds the currently open advisory (null = closed) */
  const [openAdvisory, setOpenAdvisory] = useState(null);

  /* Load advisories on mount */
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const res = await getPublishedAdvisories();
      if (mounted) {
        setItems(res);
        setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  /* ✅ Auto-open modal if ?open=advisory-id is in URL (after items are loaded) */
  useEffect(() => {
    if (loading || !items.length) return;

    const openId = searchParams.get("open");
    if (!openId) return;

    const found = items.find((a) => String(a.id) === String(openId));
    if (found) {
      setOpenAdvisory(found);
    }
  }, [loading, items, searchParams]);

  const criticalCount = useMemo(
    () => items.filter((a) => a.severity === "critical").length,
    [items]
  );

  const handleReadMore = (advisory) => setOpenAdvisory(advisory);

  const handleCloseModal = () => {
    setOpenAdvisory(null);
    // Clean up the ?open= param from the URL so refreshing won't re-open modal
    if (searchParams.get("open")) {
      const next = new URLSearchParams(searchParams);
      next.delete("open");
      setSearchParams(next, { replace: true });
    }
  };

  if (loading) {
    return (
      <div
        className="w-full min-h-screen"
        style={{ backgroundColor: PAGE_BG_COLOR }}
      >
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <SkeletonBlock className="h-8 w-56" />
            <SkeletonBlock className="h-24" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SkeletonBlock className="h-44" />
              <SkeletonBlock className="h-44" />
              <SkeletonBlock className="h-44" />
              <SkeletonBlock className="h-44" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundColor: PAGE_BG_COLOR }}
    >
      <Helmet>
        <title>Advisories | Guide to Pakistan Live</title>
        <meta
          name="description"
          content="Published travel advisories for Pakistan. Critical advisories shown first."
        />
      </Helmet>

      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* BIG WHITE PARENT CONTAINER */}
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">

          {/* Breadcrumb row — back button + breadcrumb links */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              aria-label="Back to home"
              className="
                inline-flex h-10 w-10 shrink-0 items-center justify-center
                rounded-full
                border border-emerald-200
                shadow-sm
                transition-all duration-200
                hover:brightness-95 hover:shadow-md hover:-translate-y-0.5
              "
              style={{
                backgroundColor: BRAND_GREEN_LIGHT,
                color: BRAND_GREEN_DEEPEST,
              }}
            >
              <ArrowLeft size={18} />
            </Link>

            <nav className="text-sm text-slate-600" aria-label="Breadcrumb">
              <Link
                to="/tiss"
                className="transition-colors"
                style={{ color: "#475569" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = BRAND_GREEN_DARK)
                }
                onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
              >
                Travel Updates
              </Link>
              <span className="mx-2 text-slate-400">/</span>
              <span
                className="font-semibold"
                style={{ color: BRAND_GREEN_DEEPEST }}
              >
                Advisories
              </span>
            </nav>
          </div>

          {/* SINGLE SUB-PARENT — holds header + advisory cards */}
          <div
            className="rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-8 space-y-6"
            style={{ backgroundColor: BRAND_GREEN_LIGHT }}
          >
            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="min-w-0">
                <div
                  className="inline-flex items-center rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm"
                >
                  Advisories
                </div>

                <h1
                  className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight"
                  style={{ color: BRAND_GREEN_DEEPEST }}
                >
                  Travel Advisories
                </h1>

                <p className="mt-1 text-sm text-slate-600">
                  Published advisories only. Expired advisories are automatically hidden.
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                {criticalCount > 0 ? (
                  <span className="inline-flex items-center rounded-full bg-red-100 border border-red-200 px-3 py-1 text-xs font-semibold text-red-900">
                    {criticalCount} critical active
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-emerald-100 border border-emerald-200 px-3 py-1 text-xs font-semibold text-emerald-900">
                    No critical advisories
                  </span>
                )}
              </div>
            </div>

            {/* Advisory cards grid */}
            {items.length ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {items.map((a) => (
                  <AdvisoryCard
                    key={a.id}
                    advisory={a}
                    variant="modal"
                    onReadMore={handleReadMore}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 text-sm text-slate-500 italic text-center">
                No active advisories to show right now.
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Modal — renders when an advisory is selected */}
      <AdvisoryModal advisory={openAdvisory} onClose={handleCloseModal} />
    </div>
  );
}