/* ============================================================
   UNIFIED RISK-MATCHING PILL COLORS
   (Matches getRiskUi() in statusLogic.js — same soft light pills)
   ============================================================ */

export function getRouteStatusUi(status) {
  switch (status) {
    case "open":
      return {
        label: "Open",
        // Low Risk — soft emerald
        pill: "bg-emerald-100 text-emerald-900 border border-emerald-200",
        hint: "Open",
      };

    case "delayed":
      return {
        label: "Delayed",
        // Moderate Risk — soft amber
        pill: "bg-amber-100 text-amber-900 border border-amber-200",
        hint: "Delayed",
      };

    case "risky":
      return {
        label: "Risky",
        // High Risk — soft rose
        pill: "bg-rose-100 text-rose-900 border border-rose-200",
        hint: "Risky",
      };

    case "closed":
      return {
        label: "Closed",
        // Not Safe — soft red
        pill: "bg-red-100 text-red-900 border border-red-200",
        hint: "Closed",
      };

    default:
      return {
        label: "Unknown",
        // Unknown — soft slate
        pill: "bg-slate-100 text-slate-700 border border-slate-200",
        hint: "Unknown",
      };
  }
}

export function getSourceTypeLabel(sourceType) {
  switch (sourceType) {
    case "field":
      return "Field Report";
    case "admin":
      return "Admin Update";
    case "manual":
      return "Manual Entry";
    case "api":
      return "API Feed";
    default:
      return "Manual Entry";
  }
}