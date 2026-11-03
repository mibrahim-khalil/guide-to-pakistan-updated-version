import { useMemo } from "react";
import { Shield, RefreshCw, Activity } from "lucide-react";
import { formatRelativeTime } from "../../lib/dateUtil.js";

function statusUi(status) {
  switch (status) {
    case "avoid":
      return {
        label: "Avoid Travel",
        note: "High risk conditions reported in some regions.",
        wrap: "border-red-200 bg-red-50",
        iconWrap: "bg-red-100 text-red-700 border-red-200",
        pill: "bg-red-600 text-white"
      };
    case "caution":
      return {
        label: "Caution",
        note: "Conditions may change quickly. Verify before departure.",
        wrap: "border-amber-200 bg-amber-50",
        iconWrap: "bg-amber-100 text-amber-800 border-amber-200",
        pill: "bg-amber-400 text-slate-900"
      };
    default:
      return {
        label: "Open",
        note: "No major disruptions reported at this time.",
        wrap: "border-emerald-200 bg-emerald-50",
        iconWrap: "bg-emerald-100 text-emerald-800 border-emerald-200",
        pill: "bg-emerald-600 text-white"
      };
  }
}

export default function StatusBanner({ status = "safe", lastRefreshedIso, onRefresh }) {
  const ui = useMemo(() => statusUi(status), [status]);

  return (
    <section
      className={[
        "rounded-2xl border overflow-hidden",
        ui.wrap
      ].join(" ")}
      aria-label="Pakistan travel status"
    >
      <div className="p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Left */}
          <div className="flex items-start gap-4 min-w-0">
            <div
              className={[
                "h-12 w-12 rounded-2xl border flex items-center justify-center shrink-0",
                ui.iconWrap
              ].join(" ")}
              aria-hidden="true"
            >
              <Shield size={20} />
            </div>

            <div className="min-w-0">
              <div className="text-base font-bold text-slate-900">
                Pakistan Travel Status
              </div>
              <div className="mt-1 text-sm text-slate-700">
                Stay updated with real-time travel conditions across Pakistan.
              </div>
              <div className="mt-2 text-sm text-slate-600">
                {ui.note}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-wrap items-center gap-3 lg:justify-end">
            <span className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${ui.pill}`}>
              {ui.label}
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-white/70 border border-white/60 px-3 py-2 text-sm font-semibold text-slate-900">
              <span className="inline-flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-30" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                </span>
                Live
              </span>
              <Activity size={16} className="text-slate-500" aria-hidden="true" />
            </span>

            <div className="text-sm text-slate-700">
              Last updated:{" "}
              <span className="font-semibold text-slate-900">
                {lastRefreshedIso ? formatRelativeTime(lastRefreshedIso) : "—"}
              </span>
            </div>

            <button
              type="button"
              onClick={onRefresh}
              className="inline-flex items-center justify-center rounded-full bg-white border border-slate-200 p-2.5 text-slate-900 hover:bg-slate-50"
              aria-label="Refresh"
              title="Refresh"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}