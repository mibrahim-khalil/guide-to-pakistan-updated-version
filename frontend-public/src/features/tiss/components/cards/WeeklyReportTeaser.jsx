import { CalendarDays, FileText, ArrowUpRight } from "lucide-react";
import Button from "../common/Button.jsx";

/* Theme */
const BRAND_GREEN_DEEPEST = "#01411C";

function formatDateShort(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
}

const clamp2 = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export default function WeeklyReportTeaser({ report }) {
  if (!report) return null;

  const title = report?.title || report?.name || "Weekly Tourist Support Report";
  const summary =
    report?.summary ||
    report?.overview ||
    report?.overview_text ||
    "Weekly travel summary is available.";

  const weekStart = report?.week_start || report?.from_date || report?.start_date;
  const weekEnd = report?.week_end || report?.to_date || report?.end_date;

  return (
    <section
      className="
        rounded-2xl
        border border-slate-200
        bg-white
        overflow-hidden
        shadow-sm
        transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-300
      "
    >
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">
                <FileText size={12} className="text-slate-500" aria-hidden="true" />
                Weekly Report
              </span>

              <span className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                <CalendarDays size={14} className="text-slate-500" aria-hidden="true" />
                Week: {formatDateShort(weekStart)} to {formatDateShort(weekEnd)}
              </span>
            </div>

            <h3
              className="mt-3 text-xl font-extrabold leading-tight"
              style={{ color: BRAND_GREEN_DEEPEST }}
            >
              {title}
            </h3>

            <p className="mt-3 text-sm text-slate-600 leading-relaxed" style={clamp2}>
              {summary}
            </p>
          </div>

          <Button
            to={`/tiss/reports/${report.id}`}
            variant="primary"
            size="md"
            rightIcon={<ArrowUpRight size={16} />}
          >
            Read report
          </Button>
        </div>
      </div>
    </section>
  );
}