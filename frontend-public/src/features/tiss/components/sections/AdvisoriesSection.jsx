import { AlertTriangle, Info, Siren } from 'lucide-react'

const BRAND_GREEN_DEEPEST = '#01411C'

function severityUi(severity) {
  const s = String(severity || 'info').toLowerCase()
  if (s === 'critical') {
    return {
      label: 'Critical',
      pill: 'bg-rose-100 text-rose-800 border-rose-200',
      icon: Siren,
    }
  }
  if (s === 'warning') {
    return {
      label: 'Warning',
      pill: 'bg-amber-100 text-amber-900 border-amber-200',
      icon: AlertTriangle,
    }
  }
  return {
    label: 'Info',
    pill: 'bg-sky-100 text-sky-800 border-sky-200',
    icon: Info,
  }
}

export default function AdvisoriesSection({ advisories = [] }) {
  const count = advisories?.length || 0

  return (
    <section className="w-full" aria-label="Active advisories">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-lg sm:text-xl font-extrabold" style={{ color: BRAND_GREEN_DEEPEST }}>
          Active Advisories
        </h2>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${
            count > 0
              ? 'bg-amber-100 border-amber-200 text-amber-900'
              : 'bg-emerald-100 border-emerald-200 text-emerald-900'
          }`}
        >
          {count > 0 ? `${count} active` : 'None'}
        </span>
      </div>

      {count === 0 ? (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 shadow-sm">
          No active advisories at the moment.
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {advisories.map((a) => {
            const ui = severityUi(a.severity)
            const Icon = ui.icon
            return (
              <article
                key={a.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 h-9 w-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-slate-700" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-extrabold text-slate-900">{a.title}</h3>
                      <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${ui.pill}`}>
                        {ui.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{a.summary}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}