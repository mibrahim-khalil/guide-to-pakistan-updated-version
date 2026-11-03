import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarRange,
  FileText,
  CheckCircle2,
  AlertTriangle,
  CloudSun,
  Route as RouteIcon,
  Shield,
  Clock,
  Backpack,
  Sparkles,
  PhoneCall
} from "lucide-react";

import SkeletonBlock from "../components/common/SkeletonBlock.jsx";
import { getReportById } from "../lib/apiClient.js";
import { formatDateShort } from "../lib/reportUi.js";

function SectionCard({ id, title, icon, children }) {
  return (
    <section id={id} className="rounded-2xl border border-slate-200 bg- p-6">
      <div className="flex items-center gap-3">
        <span className="h-10 w-10 rounded-2xl bg-slate-900/5 flex items-center justify-center text-slate-900">
          {icon}
        </span>
        <h2 className="text-base sm:text-lg font-bold text-slate-900">{title}</h2>
      </div>

      <div className="mt-4 text-sm text-slate-700 leading-relaxed">{children}</div>
    </section>
  );
}

function BulletList({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <ul className="mt-2 space-y-2">
      {items.map((x, idx) => (
        <li key={`${String(x)}_${idx}`} className="flex items-start gap-2">
          <span className="mt-0.5 text-emerald-600">
            <CheckCircle2 size={16} aria-hidden="true" />
          </span>
          <span className="text-slate-700">{String(x)}</span>
        </li>
      ))}
    </ul>
  );
}

function WarnList({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return (
    <ul className="mt-2 space-y-2">
      {items.map((x, idx) => (
        <li key={`${String(x)}_${idx}`} className="flex items-start gap-2">
          <span className="mt-0.5 text-amber-600">
            <AlertTriangle size={16} aria-hidden="true" />
          </span>
          <span className="text-slate-700">{String(x)}</span>
        </li>
      ))}
    </ul>
  );
}

function TocLink({ href, children }) {
  return (
    <a
      href={href}
      className="block rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900"
    >
      {children}
    </a>
  );
}

export default function ReportDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const [forbidden, setForbidden] = useState(false);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      const res = await getReportById(id);

      if (!mounted) return;

      if (!res) {
        setReport(null);
        setForbidden(false);
        setLoading(false);
        return;
      }

      if (res.forbidden) {
        setReport(null);
        setForbidden(true);
        setLoading(false);
        return;
      }

      setReport(res.report || null);
      setForbidden(false);
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [id]);

  const content = report?.content_json || {};

  const weekText = useMemo(() => {
    if (!report) return "";
    return `Week: ${formatDateShort(report.week_start)} to ${formatDateShort(report.week_end)}`;
  }, [report]);

  const sections = useMemo(() => {
    // only show sections that exist (no empty cards)
    const s = [];

    if (content.overview) s.push({ id: "overview", label: "Overview" });
    if (content.best_destinations?.length) s.push({ id: "best", label: "Best Destinations" });
    if (content.caution_areas?.length) s.push({ id: "caution", label: "Caution Areas" });
    if (content.weather_summary) s.push({ id: "weather", label: "Weather Summary" });
    if (content.route_update) s.push({ id: "routes", label: "Road & Route Update" });
    if (content.safety_notes) s.push({ id: "safety", label: "Safety Notes" });
    if (content.recommended_travel_windows?.length) s.push({ id: "windows", label: "Travel Windows" });
    if (content.packing_suggestions) s.push({ id: "packing", label: "Packing Suggestions" });
    if (content.top_experiences?.length) s.push({ id: "experiences", label: "Top Experiences" });
    if (content.cta) s.push({ id: "cta", label: "CTA" });

    return s;
  }, [content]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 space-y-4">
        <SkeletonBlock className="h-6 w-64" />
        <SkeletonBlock className="h-40" />
        <SkeletonBlock className="h-28" />
        <SkeletonBlock className="h-28" />
        <SkeletonBlock className="h-28" />
      </div>
    );
  }

  if (forbidden) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-xl font-bold text-slate-900">Report not available</h1>
          <p className="mt-2 text-sm text-slate-600">This report may be unpublished or restricted.</p>
          <Link to="/tiss/reports" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Reports
          </Link>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h1 className="text-xl font-bold text-slate-900">Report not found</h1>
          <Link to="/tiss/reports" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline">
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Reports
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Helmet>
        <title>{report.title} | Weekly Reports</title>
        <meta name="description" content={String(content.overview || "").slice(0, 160)} />
      </Helmet>

      {/* Breadcrumb */}
      <nav className="text-sm text-slate-600" aria-label="Breadcrumb">
        <Link to="/reports" className="hover:underline">
          Reports
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium truncate">{report.title}</span>
      </nav>

      {/* HERO HEADER */}
      <header className="mt-4 rounded-2xl border border-slate-200 bg-white overflow-hidden">
        <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                <FileText size={14} aria-hidden="true" />
                Weekly Report
              </div>

              <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
                {report.title}
              </h1>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                <CalendarRange size={14} aria-hidden="true" />
                {weekText}
              </div>
            </div>

            <Link
              to="/reports"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Back
            </Link>
          </div>
        </div>

        {/* Quick helper line */}
        <div className="p-6 sm:px-8 text-sm text-slate-600">
          Use the sections below for quick planning. Information can change—verify locally before travel.
        </div>
      </header>

      {/* CONTENT LAYOUT */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main */}
        <div className="lg:col-span-8 space-y-5">
          {content.overview ? (
            <SectionCard id="overview" title="Overview" icon={<FileText size={18} aria-hidden="true" />}>
              {content.overview}
            </SectionCard>
          ) : null}

          {content.best_destinations?.length ? (
            <SectionCard id="best" title="Best Destinations to Visit Now" icon={<Sparkles size={18} aria-hidden="true" />}>
              <BulletList items={content.best_destinations} />
            </SectionCard>
          ) : null}

          {content.caution_areas?.length ? (
            <SectionCard id="caution" title="Caution Areas" icon={<AlertTriangle size={18} aria-hidden="true" />}>
              <WarnList items={content.caution_areas} />
            </SectionCard>
          ) : null}

          {content.weather_summary ? (
            <SectionCard id="weather" title="Weather Summary" icon={<CloudSun size={18} aria-hidden="true" />}>
              {content.weather_summary}
            </SectionCard>
          ) : null}

          {content.route_update ? (
            <SectionCard id="routes" title="Road & Route Update" icon={<RouteIcon size={18} aria-hidden="true" />}>
              {content.route_update}
            </SectionCard>
          ) : null}

          {content.safety_notes ? (
            <SectionCard id="safety" title="Safety Notes" icon={<Shield size={18} aria-hidden="true" />}>
              {content.safety_notes}
            </SectionCard>
          ) : null}

          {content.recommended_travel_windows?.length ? (
            <SectionCard id="windows" title="Recommended Travel Windows" icon={<Clock size={18} aria-hidden="true" />}>
              <BulletList items={content.recommended_travel_windows} />
            </SectionCard>
          ) : null}

          {content.packing_suggestions ? (
            <SectionCard id="packing" title="Packing Suggestions" icon={<Backpack size={18} aria-hidden="true" />}>
              {content.packing_suggestions}
            </SectionCard>
          ) : null}

          {content.top_experiences?.length ? (
            <SectionCard id="experiences" title="Top Experiences This Week" icon={<Sparkles size={18} aria-hidden="true" />}>
              <BulletList items={content.top_experiences} />
            </SectionCard>
          ) : null}

          {content.cta ? (
            <SectionCard id="cta" title="Next Step" icon={<PhoneCall size={18} aria-hidden="true" />}>
              {content.cta}
              <div className="mt-4">
                <a
                  href="https://guidetopakistan.pk/contact"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Contact GTP
                </a>
              </div>
            </SectionCard>
          ) : null}
        </div>

        {/* Sidebar TOC */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-6 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="text-sm font-bold text-slate-900">On this report</div>
              <div className="mt-3 space-y-1">
                {sections.length ? (
                  sections.map((s) => (
                    <TocLink key={s.id} href={`#${s.id}`}>
                      {s.label}
                    </TocLink>
                  ))
                ) : (
                  <div className="text-sm text-slate-600">No sections available.</div>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="text-sm font-bold text-slate-900">Reminder</div>
              <p className="mt-2 text-sm text-slate-600">
                Always verify weather, road access, and local advisories before travel—especially for mountain routes.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

