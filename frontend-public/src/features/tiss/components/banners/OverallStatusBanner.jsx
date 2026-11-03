import { getStatusUi } from "../../lib/statusLogic.js";
import { formatRelativeTime } from "../../lib/dateUtil.js";

export default function OverallStatusBanner({ status, lastUpdatedIso }) {
  const ui = getStatusUi(status);

  return (
    <section
      className={`rounded-xl border ${ui.border} ${ui.bg} p-4`}
      aria-label={`Pakistan Travel Status: ${ui.label}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="text-sm text-slate-600">Pakistan Travel Status</div>
          <div className="mt-1 flex items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${ui.pill}`}>
              {ui.label}
            </span>
            <span className="text-sm text-slate-600">({status.toUpperCase()})</span>
          </div>
        </div>

        <div className="text-sm text-slate-600">
          Last refreshed:{" "}
          <span className="font-medium text-slate-800">
            {lastUpdatedIso ? formatRelativeTime(lastUpdatedIso) : "—"}
          </span>
        </div>
      </div>
    </section>
  );
}