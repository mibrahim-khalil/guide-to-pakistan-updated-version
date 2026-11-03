export default function WeatherAdvisoryPanel({ weather }) {
  const ai = weather?.ai_summary;
  const tip = weather?.packing_tip;

  if (!ai && !tip) return null;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5" aria-label="Tourist advisory">
      <div>
        <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          Weather Advisory
        </div>
        <h2 className="mt-2 text-lg font-semibold text-slate-900">Tourist Advisory</h2>
        <p className="mt-1 text-sm text-slate-600">
          Practical guidance based on current conditions and 3‑day forecast.
        </p>
      </div>

      {ai ? (
        <p className="mt-4 text-sm text-slate-700 leading-relaxed">{ai}</p>
      ) : null}

      {tip ? (
        <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4">
          <div className="text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
            Packing Tip
          </div>
          <div className="mt-1 text-sm font-semibold text-slate-900">{tip}</div>
        </div>
      ) : null}
    </section>
  );
}