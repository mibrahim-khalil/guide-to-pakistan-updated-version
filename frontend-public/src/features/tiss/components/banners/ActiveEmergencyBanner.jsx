import { Link } from "react-router-dom";

export default function ActiveEmergencyBanner({ advisory }) {
  return (
    <section
      className="mt-4 rounded-xl border border-red-300 bg-red-50 p-4"
      role="alert"
      aria-label="Emergency advisory"
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div className="min-w-0">
          <div className="font-semibold text-red-900">Emergency Advisory</div>
          <div className="mt-1 text-sm text-red-900">{advisory.title}</div>
          <div className="mt-2 text-sm text-red-800">{advisory.advisory_text}</div>
        </div>

        <div className="shrink-0">
          <Link
           to={`/tiss/advisories/${advisory.id}`}
            className="inline-flex items-center justify-center rounded-lg bg-red-800 px-4 py-2 text-sm font-semibold text-white hover:bg-red-900 transition-colors"
          >
            Read full advisory
          </Link>
        </div>
      </div>
    </section>
  );
}