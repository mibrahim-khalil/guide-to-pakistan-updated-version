export default function ReportSection({ title, subtitle, children }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {subtitle ? <p className="text-sm text-slate-600">{subtitle}</p> : null}
      </div>

      <div className="mt-4 text-sm text-slate-700 leading-relaxed">{children}</div>
    </section>
  );
}