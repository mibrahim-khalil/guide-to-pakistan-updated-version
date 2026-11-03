import FieldUpdateCard from "../cards/FieldUpdateCard.jsx";

export default function DestinationFieldUpdatesSection({ fieldUpdates }) {
  const count = fieldUpdates?.length || 0;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6" aria-label="Destination field updates">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-slate-900">Field Updates</h2>
          <p className="mt-1 text-sm text-slate-600">
            Recent published updates submitted by guides/field staff.
          </p>
        </div>

        <div className="shrink-0">
          {count > 0 ? (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {count} recent
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
          {fieldUpdates.map((fu) => (
            <FieldUpdateCard key={fu.id} update={fu} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          No recent field updates for this destination.
        </div>
      )}
    </section>
  );
}