export function severityRank(sev) {
  const map = { critical: 4, high: 3, medium: 2, low: 1 };
  return map[sev] || 0;
}

export function getSeverityPill(sev) {
  switch (sev) {
    case "critical":
      return "bg-red-100 text-red-900 border border-red-200";
    case "high":
      return "bg-amber-100 text-amber-900 border border-amber-200";
    case "medium":
      return "bg-sky-100 text-sky-900 border border-sky-200";
    case "low":
      return "bg-slate-100 text-slate-900 border border-slate-200";
    default:
      return "bg-slate-100 text-slate-900 border border-slate-200";
  }
}

export function isExpired(advisory, nowMs = Date.now()) {
  if (!advisory?.valid_until) return false;
  return new Date(advisory.valid_until).getTime() <= nowMs;
}