export function truncateText(text, max = 150) {
  if (!text) return "";
  const t = String(text);
  if (t.length <= max) return t;
  return t.slice(0, max - 1) + "…";
}