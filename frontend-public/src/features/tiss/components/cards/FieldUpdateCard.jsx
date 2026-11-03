import { Clock } from "lucide-react";
import { formatRelativeTime } from "../../lib/dateUtil.js";
import { getStatusUi } from "../../lib/statusLogic.js";

const clamp3 = {
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden"
};

export default function FieldUpdateCard({ update }) {
  const ui = getStatusUi(update.status);

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-slate-900 truncate">{update.region}</div>
          <div className="mt-1 text-xs text-slate-500">
            {update.reporter_name ? (
              <>Reported by <span className="text-slate-700">{update.reporter_name}</span></>
            ) : (
              <>Field report</>
            )}
            {update.severity ? (
              <> • Severity: <span className="text-slate-700">{update.severity}</span></>
            ) : null}
          </div>
        </div>

        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${ui.pill}`}>
          {ui.label}
        </span>
      </div>

      <p className="mt-3 text-sm text-slate-700 leading-relaxed" style={clamp3}>
        {update.description}
      </p>

      <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
        <Clock size={14} className="text-slate-400" aria-hidden="true" />
        <span>
          Published{" "}
          <span className="font-medium text-slate-700">
            {update.published_at ? formatRelativeTime(update.published_at) : "—"}
          </span>
        </span>
      </div>
    </article>
  );
}