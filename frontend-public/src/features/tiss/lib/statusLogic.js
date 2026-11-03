// ✅ UNIVERSAL 5‑LEVEL RISK SYSTEM (GLOBAL SOURCE OF TRUTH)

export function getRiskUi(status) {
  const s = String(status || "").toLowerCase();

  // 🚫 NOT SAFE (Highest severity)
  if (["red", "emergency", "critical", "closed", "disruption"].includes(s))
    return {
      level: 1,
      label: "Not Safe",
      description: "Travel not recommended",
      pill: "bg-red-100 text-red-900 dark:bg-red-500/15 dark:text-red-200",
    };

  // 🔴 HIGH RISK
  if (["avoid", "risky", "high"].includes(s))
    return {
      level: 2,
      label: "High Risk",
      description: "Strongly discouraged",
      pill: "bg-rose-100 text-rose-900 dark:bg-rose-500/15 dark:text-rose-200",
    };

  // 🟠 MODERATE RISK
  if (["amber", "caution", "delayed", "medium"].includes(s))
    return {
      level: 3,
      label: "Moderate Risk",
      description: "Travel with caution",
      pill: "bg-amber-100 text-amber-900 dark:bg-amber-500/15 dark:text-amber-200",
    };

  // 🟢 LOW RISK
  if (["green", "normal", "open", "good"].includes(s))
    return {
      level: 4,
      label: "Low Risk",
      description: "Generally safe",
      pill: "bg-emerald-100 text-emerald-900 dark:bg-emerald-500/15 dark:text-emerald-200",
    };

  // ⚪ UNKNOWN
  return {
    level: 5,
    label: "Unknown",
    description: "Information unavailable",
    pill: "bg-slate-100 text-slate-700 dark:bg-white/10 dark:text-slate-200",
  };
}

/**
 * ✅ Backward compatibility:
 * If any old code still calls getStatusUi,
 * we redirect it to getRiskUi.
 */
export function getStatusUi(status) {
  return getRiskUi(status);
}

/**
 * ✅ Sorting utility based on risk level
 */
export function getWorstDestinationStatus(destinations = []) {
  if (!destinations.length) return "unknown";

  const sorted = [...destinations].sort(
    (a, b) => getRiskUi(a.status).level - getRiskUi(b.status).level
  );

  return sorted[0]?.status || "unknown";
}

/**
 * ✅ Sort destinations by severity then name
 */
export function sortDestinationsByStatusThenName(destinations = []) {
  return [...destinations].sort((a, b) => {
    const riskDiff =
      getRiskUi(a.status).level - getRiskUi(b.status).level;

    if (riskDiff !== 0) return riskDiff;

    return a.name.localeCompare(b.name);
  });
}