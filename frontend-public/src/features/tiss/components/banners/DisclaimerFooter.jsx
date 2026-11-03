import { AlertTriangle } from "lucide-react";

/* Theme */
const BRAND_GREEN_DEEPEST = "#01411C";

export default function DisclaimerFooter() {
  return (
    <div
      className="
        rounded-2xl
        border border-amber-200
        px-6 sm:px-8
        py-6 sm:py-8
        bg-amber-50
        shadow-sm
      "
    >
      <div className="flex items-start gap-4">
        <div className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 border border-amber-200 text-amber-700">
          <AlertTriangle size={20} aria-hidden="true" />
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-slate-700">
          <span
            className="font-extrabold"
            style={{ color: BRAND_GREEN_DEEPEST }}
          >
            Disclaimer:
          </span>{" "}
          Travel conditions can change rapidly due to weather, road closures,
          and local factors. This information is provided for general guidance
          only. Always verify critical decisions with local authorities and
          trusted sources. Guide to Pakistan is not liable for losses arising
          from reliance on this information.
        </p>
      </div>
    </div>
  );
}