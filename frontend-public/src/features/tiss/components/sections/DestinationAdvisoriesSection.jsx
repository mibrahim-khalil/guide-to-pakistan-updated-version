import AdvisoryCard from "../cards/AdvisoryCard.jsx";

export default function DestinationAdvisoriesSection({ advisories }) {
  const count = advisories?.length || 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6" aria-label="Destination advisories">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900">Advisories</h2>
          <p className="mt-1 text-sm text-slate-600">
            Active advisories published for this destination.
          </p>
        </div>

        <div className="shrink-0">
          {count > 0 ? (
            <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
              {count} active
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
              None
            </span>
          )}
        </div>
      </div>

      {count > 0 ? (
        <div className="mt-5 space-y-3">
          {advisories.map((a) => (
            <AdvisoryCard key={a.id} advisory={a} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          No active advisories at the moment.
        </div>
      )}
    </section>
  );
}