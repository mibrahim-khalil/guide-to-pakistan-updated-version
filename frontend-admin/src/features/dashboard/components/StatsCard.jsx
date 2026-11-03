export default function StatsCard({ title, value, hint, accent = 'emerald' }) {
  const accents = {
    emerald: 'bg-emerald-50 text-emerald-700',
    blue: 'bg-blue-50 text-blue-700',
    amber: 'bg-amber-50 text-amber-700',
    violet: 'bg-violet-50 text-violet-700',
  }

  return (
    <div className="admin-card p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 text-2xl font-semibold text-gray-900">{value}</div>
      {hint ? (
        <div className={'mt-3 inline-flex text-xs font-medium px-2 py-1 rounded-full ' + (accents[accent] || accents.emerald)}>
          {hint}
        </div>
      ) : null}
    </div>
  )
}
