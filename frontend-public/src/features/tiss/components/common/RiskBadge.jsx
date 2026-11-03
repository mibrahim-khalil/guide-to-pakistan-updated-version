import { getRiskUi } from "../../lib/statusLogic.js";

export default function RiskBadge({
  status,
  showDescription = false,
  className = "",
}) {
  const risk = getRiskUi(status);

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <span
        className={`
          inline-flex items-center
          rounded-full
          px-3 py-1.5
          text-xs font-semibold
          shadow-sm
          ${risk.pill}
        `}
      >
        {risk.label}
      </span>

      {showDescription && (
        <span className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          {risk.description}
        </span>
      )}
    </div>
  );
}