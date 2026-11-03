import { Clock } from "lucide-react";

function statusUi(status) {
  if (status === "blocked") return { label: "Blocked", pill: "bg-red-600 text-white" };
  if (status === "open") return { label: "Open", pill: "bg-emerald-600 text-white" };
  return { label: "Warning", pill: "bg-amber-400 text-slate-900" };
}

function severityUi(sev) {
  if (sev === "critical") return { label: "CRITICAL", pill: "bg-red-700 text-white" };
  if (sev === "high") return { label: "HIGH", pill: "bg-red-50 text-red-900 border border-red-200" };
  if (sev === "medium") return { label: "MEDIUM", pill: "bg-amber-50 text-amber-900 border border-amber-200" };
  return { label: "LOW", pill: "bg-slate-50 text-slate-700 border border-slate-200" };
}

function categoryEmoji(category) {
  switch (category) {
    case "roads":
      return "🚧";
    case "weather":
      return "🌦️";
    case "safety":
      return "🛡️";
    case "transport":
      return "🚌";
    default:
      return "ℹ️";
  }
}

function categoryIconBg(category) {
  // light background behind emoji (like your screenshot)
  switch (category) {
    case "roads":
      return "bg-rose-50";
    case "weather":
      return "bg-amber-50";
    case "safety":
      return "bg-indigo-50";
    case "transport":
      return "bg-violet-50";
    default:
      return "bg-slate-50";
  }
}

// keep cards aligned (same height)
const clamp2 = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden"
};

export default function LiveUpdateCard({ item, selected, onSelect }) {
  const st = statusUi(item.status);
  const sev = severityUi(item.severity);
  const emoji = categoryEmoji(item.category);
  const iconBg = categoryIconBg(item.category);

  return (
    <article
      className={[
        "h-full flex flex-col rounded-2xl border bg-white shadow-sm",
        "border-slate-200 hover:shadow-md transition-shadow",
        selected ? "ring-2 ring-blue-500/20 border-blue-200" : ""
      ].join(" ")}
    >
      <div
        className="p-5 flex-1 flex flex-col"
        role="button"
        tabIndex={0}
        onClick={() => onSelect(item)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onSelect(item);
        }}
      >
        {/* top row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div className={`h-9 w-9 rounded-xl ${iconBg} flex items-center justify-center`}>
                <span className="text-[15px] leading-none" aria-hidden="true">
                  {emoji}
                </span>
              </div>
              <div className="text-sm font-semibold text-slate-900 truncate">
                {item.category_title}
              </div>
            </div>

            <div className="mt-3 text-lg font-bold text-slate-900 truncate">
              {item.location}
            </div>
            <div className="mt-1 text-sm text-slate-600 truncate">
              {item.route_name}
            </div>
          </div>

          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${st.pill}`}>
            {st.label}
          </span>
        </div>

        {/* description */}
        <p className="mt-3 text-sm text-slate-700 leading-relaxed" style={clamp2}>
          {item.description}
        </p>

        {/* footer */}
        <div className="mt-auto pt-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${sev.pill}`}>
              {sev.label}
            </span>

            <span className="inline-flex items-center gap-1 text-xs text-slate-500 truncate">
              <Clock size={14} className="text-slate-400" aria-hidden="true" />
              {item.updated_minutes_ago} mins ago
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(item);
            }}
            className="shrink-0 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            View on Map
          </button>
        </div>
      </div>
    </article>
  );
}