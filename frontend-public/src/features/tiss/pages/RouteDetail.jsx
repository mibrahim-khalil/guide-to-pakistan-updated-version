import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { X, Clock } from "lucide-react";

import { getTravelUpdatesPageData } from "../lib/apiClient.js";
import { formatRelativeTime } from "../lib/dateUtil.js";
import { getRiskUi } from "../lib/statusLogic.js";
import SkeletonBlock from "../components/common/SkeletonBlock.jsx";

function routeTitle(r) {
  return r?.name || `${r?.from_place || "—"} → ${r?.to_place || "—"}`;
}

export default function RouteDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

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

  const route = useMemo(() => {
    const routes = data?.routes || [];
    return routes.find((r) => String(r?.slug || "") === String(slug || "")) || null;
  }, [data, slug]);

  const risk = getRiskUi(route?.status);

  const mapQuery = useMemo(() => {
    const from = String(route?.from_place || "").trim();
    const to = String(route?.to_place || "").trim();
    if (from && to) return `${from} to ${to}`;
    return route?.name || route?.from_place || route?.to_place || "Pakistan";
  }, [route]);

  if (loading) {
    return (
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-10 py-8 space-y-4 bg-[var(--gti-page-bg)]">
        <SkeletonBlock className="h-8 w-64" />
        <SkeletonBlock className="h-[520px]" />
      </div>
    );
  }

  if (!route) {
    return (
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-10 py-8 bg-[var(--gti-page-bg)]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="text-lg font-bold text-slate-900">Route not found</div>
          <p className="mt-1 text-sm text-slate-600">
            This route may not exist or was removed.
          </p>
          <Link
             to="/tiss/routes"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Back to Route Conditions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-none px-4 sm:px-6 lg:px-10 py-8 space-y-4 bg-[var(--gti-page-bg)]">
      <Helmet>
        <title>{routeTitle(route)} | Route Details | Guide to Pakistan Live</title>
      </Helmet>

      {/* Breadcrumb */}
      <nav className="text-sm text-slate-600" aria-label="Breadcrumb">
        <Link
          to="/tiss"
          className="text-slate-600 hover:text-[color:var(--gti-brand-green-dark)] transition-colors"
        >
          Travel Updates
        </Link>
        <span className="mx-2 text-slate-400">/</span>
        <Link
           to="/tiss/routes"
          className="text-slate-600 hover:text-[color:var(--gti-brand-green-dark)] transition-colors"
        >
          Route Conditions
        </Link>
        <span className="mx-2 text-slate-400">/</span>
        <span className="font-semibold" style={{ color: "var(--gti-brand-green-deepest)" }}>
          {routeTitle(route)}
        </span>
      </nav>

      <section className="rounded-2xl border border-slate-200 bg-white overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-lg font-bold" style={{ color: "var(--gti-brand-green-deepest)" }}>
                Route &amp; Destination View
              </div>
              <div className="mt-1 text-sm text-slate-600">
                {routeTitle(route)}
              </div>

              <div className="mt-2 flex items-center gap-3 flex-wrap">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${risk.pill}`}>
                  {risk.label}
                </span>

                {route?.last_updated ? (
                  <span className="inline-flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={14} className="text-slate-400" />
                    Updated {formatRelativeTime(route.last_updated)}
                  </span>
                ) : null}
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Map */}
          <div className="lg:col-span-8 rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
            <iframe
              title="Route map"
              className="w-full h-[360px] lg:h-[460px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
            />
          </div>

          {/* Notes */}
          <div
            className="lg:col-span-4 rounded-2xl border p-5"
            style={{
              backgroundColor: "var(--gti-brand-green-light)",
              borderColor: "var(--gti-brand-green-border)",
            }}
          >
            <div className="text-base font-bold" style={{ color: "var(--gti-brand-green-deepest)" }}>
              Route Notes
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-2xl bg-white border border-slate-200 p-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Cause
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {route?.cause || "—"}
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200 p-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Caution Note
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {route?.caution_note || "—"}
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200 p-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Last Updated
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  {route?.last_updated ? formatRelativeTime(route.last_updated) : "—"}
                </div>
              </div>
            </div>

            <a
              className="mt-5 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white hover:brightness-110 transition"
              style={{ backgroundColor: "var(--gti-brand-green-dark)" }}
              href="https://guidetopakistan.pk/contact"
              target="_blank"
              rel="noreferrer"
            >
              Ask Travel Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}