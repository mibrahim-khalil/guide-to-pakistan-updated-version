import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export default function WeeklyReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReport() {
      try {
        setLoading(true);
        setError(null);

        // 1. Try to fetch specific report or latest
        const targetId = (!id || id === "latest" || id === "w1" || id === "w2" || id === "w3") ? "latest" : id;
        
        const urlsToTry = [
          `${API_BASE_URL}/reports/${targetId}`,
          `http://localhost:5000/api/v1/reports/${targetId}`,
          `http://localhost:5000/api/reports/${targetId}`,
          // Fallbacks to latest report if specific ID failed
          `${API_BASE_URL}/reports/latest`,
          `http://localhost:5000/api/v1/reports/latest`,
          `http://localhost:5000/api/reports/latest`
        ];

        let data = null;
        for (const url of urlsToTry) {
          try {
            const res = await fetch(url);
            if (res.ok) {
              const json = await res.json();
              data = json.data || json;
              if (data && (data.title || data.summary)) {
                break; // Successfully got valid report data!
              }
            }
          } catch (e) {
            // Ignore single fetch failure and try next URL
          }
        }

        if (!data) {
          throw new Error("No weekly report found in database.");
        }

        // 2. Normalize report structure
        const normalized = {
          reportId: data.reportId || data._id || "report-latest",
          title: data.title || "Weekly Travel Advisory & Route Outlook",
          period: data.period || "Current Week",
          summary: data.summary || "No executive summary available for this period.",
          riskLevel: data.riskLevel || "Moderate",
          aiOutlook: data.aiOutlook || data.ai_outlook || "",
          metrics: data.metrics || {
            activeAdvisoriesCount: 0,
            totalMonitoredRoutes: 0,
            placesAffectedCount: 0,
          },
          sections: data.sections || [],
          routeHighlights: data.routeHighlights || data.route_highlights || [],
        };

        setReport(normalized);
      } catch (err) {
        console.error("Failed to fetch weekly report:", err);
        setError("Unable to load the requested weekly travel report.");
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F7F5] pt-24 pb-16 px-4 flex justify-center items-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1E3E2B] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#1E3E2B] font-medium">Loading Weekly Intelligence Report...</p>
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-[#F4F7F5] pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Report Not Found</h2>
          <p className="text-gray-600 mb-6">{error || "No published report is available in the database."}</p>
          <Link
            to="/tiss"
            className="inline-flex items-center px-5 py-2.5 bg-[#1E3E2B] text-white font-medium rounded-lg hover:bg-[#152C1E] transition-colors"
          >
            ← Back to TISS Hub
          </Link>
        </div>
      </div>
    );
  }

  const riskBadgeColors = {
    Low: "bg-emerald-100 text-emerald-800 border-emerald-300",
    Moderate: "bg-amber-100 text-amber-800 border-amber-300",
    High: "bg-orange-100 text-orange-800 border-orange-300",
    Critical: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <div className="min-h-screen bg-[#F4F7F5] text-gray-800 pt-20 pb-16">
      {/* Header Banner */}
      <div className="bg-[#1E3E2B] text-white py-12 px-4 shadow-md">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <Link
              to="/tiss"
              className="inline-flex items-center text-emerald-300 hover:text-white text-sm font-medium transition-colors"
            >
              ← Back to Live TISS Dashboard
            </Link>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                riskBadgeColors[report.riskLevel] || riskBadgeColors.Moderate
              }`}
            >
              Overall Risk: {report.riskLevel || "Moderate"}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            {report.title}
          </h1>
          <p className="text-emerald-200 text-sm font-medium">
            Reporting Period: <span className="text-white font-semibold">{report.period}</span>
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8 space-y-8">
        {/* Intelligence Metrics Bar */}
        {report.metrics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Active Advisories
                </p>
                <p className="text-2xl font-extrabold text-[#1E3E2B] mt-1">
                  {report.metrics.activeAdvisoriesCount ?? 0}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
                ⚠️
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Monitored Routes
                </p>
                <p className="text-2xl font-extrabold text-[#1E3E2B] mt-1">
                  {report.metrics.totalMonitoredRoutes ?? 0}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                🛣️
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Affected Destinations
                </p>
                <p className="text-2xl font-extrabold text-[#1E3E2B] mt-1">
                  {report.metrics.placesAffectedCount ?? 0}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                📍
              </div>
            </div>
          </div>
        )}

        {/* Executive Summary & AI Intelligence Outlook */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#1E3E2B] mb-2 flex items-center gap-2">
              <span>📋</span> Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed text-base">{report.summary}</p>
          </div>

          {report.aiOutlook && (
            <div className="bg-[#D3ECDD] bg-opacity-40 border border-[#B7D9C6] p-5 rounded-xl">
              <h3 className="text-sm font-bold text-[#152C1E] uppercase tracking-wider mb-2 flex items-center gap-2">
                <span>🤖</span> AI Predictive Intelligence Outlook
              </h3>
              <p className="text-[#1E3E2B] text-sm leading-relaxed">{report.aiOutlook}</p>
            </div>
          )}
        </div>

        {/* Detailed Regional Sections */}
        {report.sections && report.sections.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#1E3E2B]">Regional Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {report.sections.map((section, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>
                      {section.severity && (
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                            section.severity === "warning"
                              ? "bg-amber-100 text-amber-800"
                              : section.severity === "danger"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {section.severity.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{section.content}</p>
                  </div>

                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="space-y-2 border-t border-gray-100 pt-3 text-xs text-gray-700">
                      {section.bulletPoints.map((point, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="text-[#1E3E2B] font-bold">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Critical Route Highlights */}
        {report.routeHighlights && report.routeHighlights.length > 0 && (
          <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-[#1E3E2B] mb-4 flex items-center gap-2">
              <span>🛣️</span> Key Route Status Highlights
            </h2>
            <div className="divide-y divide-gray-100">
              {report.routeHighlights.map((rh, idx) => (
                <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">{rh.routeName}</h4>
                    <p className="text-sm text-gray-600 mt-0.5">{rh.summary}</p>
                    {rh.warning && (
                      <p className="text-xs text-amber-700 font-medium mt-1">⚠️ {rh.warning}</p>
                    )}
                  </div>
                  <span
                    className={`inline-self-start md:self-center px-3 py-1 text-xs rounded-md font-bold ${
                      rh.status === "Closed" || rh.status === "Blocked"
                        ? "bg-red-100 text-red-700"
                        : rh.status === "Hazardous" || rh.status === "Warning"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-emerald-100 text-emerald-700"
                    }`}
                  >
                    {rh.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}