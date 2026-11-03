export function formatDateShort(isoOrDate) {
  if (!isoOrDate) return "—";
  const d = new Date(isoOrDate);
  if (Number.isNaN(d.getTime())) return String(isoOrDate);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}

export function buildPlainTextFromContentJson(content = {}) {
  const lines = [];

  const push = (title, value) => {
    lines.push(`${title}`);
    lines.push(`${"-".repeat(title.length)}`);
    if (Array.isArray(value)) {
      if (value.length) value.forEach((v) => lines.push(`- ${v}`));
      else lines.push("—");
    } else {
      lines.push(value ? String(value) : "—");
    }
    lines.push(""); // spacing
  };

  push("Overview", content.overview);
  push("Best Destinations to Visit Now", content.best_destinations);
  push("Caution Areas", content.caution_areas);
  push("Weather Summary", content.weather_summary);
  push("Road & Route Update", content.road_summary);
  push("Safety Notes", content.safety_notes);
  push("Recommended Travel Windows", content.recommended_windows);
  push("Packing Suggestions", content.packing_suggestions);
  push("Top Experiences This Week", content.top_experiences);
  push("CTA", content.cta_text);

  return lines.join("\n").trim();
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // fallback
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      return true;
    } catch {
      return false;
    } finally {
      document.body.removeChild(ta);
    }
  }
}