export default function EmptyState({ title, description, ctaLabel, ctaHref }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6">
      <div className="text-lg font-semibold text-slate-900">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{description}</div>
      {ctaHref ? (
        <div className="mt-4">
          <a
            href={ctaHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            {ctaLabel || "Contact"}
          </a>
        </div>
      ) : null}
    </div>
  );
}