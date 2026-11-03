import { useNavigate } from "react-router-dom";
import { getRiskUi } from "../../lib/statusLogic.js";

/* Theme */
const BRAND_GREEN_DARK    = "#12BD64";
const BRAND_GREEN_DEEPEST = "#01411C";

export default function AdvisoryCard({
  advisory,
  isOpen,
  onToggle,
  onReadMore,
  variant = "modal", // "modal" (default — opens modal via onReadMore) OR "navigate" (jumps to /advisories?open=id)
}) {
  const navigate = useNavigate();
  const risk = getRiskUi(advisory.severity);

  const leftBorderMap = {
    "Not Safe": "border-l-4 border-l-red-500",
    "High Risk": "border-l-4 border-l-rose-500",
    "Moderate Risk": "border-l-4 border-l-amber-500",
    "Low Risk": "border-l-4 border-l-emerald-500",
    "Unknown": "border-l-4 border-l-slate-400",
  };

  /* ✅ Smart Read More handler — behaves based on variant */
  const handleReadMoreClick = () => {
    if (variant === "navigate") {
      // Home page: jump to /advisories with query param to auto-open modal
      navigate(`/tiss/advisories?open=${encodeURIComponent(advisory.id)}`);
    } else {
      // Advisories page: open modal inline
      onReadMore?.(advisory);
    }
  };

  return (
    <article
      className={`
        rounded-2xl
        bg-white
        p-5
        shadow-sm
        border border-slate-200
        ${leftBorderMap[risk.label] || ""}
        transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-300
      `}
    >
      {/* Row 1 */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${risk.pill}`}
          >
            {risk.label}
          </span>

          <span className="text-sm font-medium text-slate-600">
            {advisory.region || "—"}
          </span>
        </div>

        {/* ✅ Read More — behavior depends on variant prop */}
        <button
          type="button"
          onClick={handleReadMoreClick}
          className="
            inline-flex items-center justify-center
            h-9 px-4
            rounded-full
            text-[13px] font-bold text-white
            shadow-sm
            transition-all duration-200
            hover:brightness-110 hover:shadow-md hover:-translate-y-0.5
          "
          style={{ backgroundColor: BRAND_GREEN_DARK }}
        >
          Read More
        </button>
      </div>

      {/* Row 2 */}
      <h3
        className="mt-4 text-base font-extrabold leading-tight"
        style={{ color: BRAND_GREEN_DEEPEST }}
      >
        {advisory.title}
      </h3>

      {/* Row 3 */}
      <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-3">
        {advisory.advisory_text}
      </p>

      {/* Row 4 */}
      {advisory.recommended_action && (
        <div className="mt-4">
          <button
            type="button"
            onClick={onToggle}
            className="
              inline-flex items-center justify-center
              rounded-full px-4 py-2
              text-xs font-semibold
              bg-slate-100 text-slate-700
              border border-slate-200
              hover:bg-slate-200
              transition
            "
          >
            Recommended Action
          </button>

          {isOpen && (
            <div className="mt-3 rounded-xl bg-emerald-50 border border-emerald-100 p-3 text-sm text-slate-700">
              {advisory.recommended_action}
            </div>
          )}
        </div>
      )}
    </article>
  );
}