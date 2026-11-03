import { formatDistanceToNowStrict } from "date-fns";

export function formatRelativeTime(iso) {
  try {
    const d = new Date(iso);
    return formatDistanceToNowStrict(d, { addSuffix: true });
  } catch {
    return "—";
  }
}