import StatsCard from '../components/StatsCard'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of Guide to Pakistan � connect backend to make these live.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatsCard title="Total Bookings" value="128" hint="+12% this week" accent="emerald" />
        <StatsCard title="Active Tours" value="34" hint="6 featured" accent="blue" />
        <StatsCard title="Destinations" value="52" hint="8 regions" accent="violet" />
        <StatsCard title="Users" value="1,042" hint="+48 new" accent="amber" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="admin-card p-4 xl:col-span-2 min-h-[260px]">
          <h2 className="font-medium text-gray-900 mb-2">Revenue (placeholder)</h2>
          <p className="text-sm text-gray-500">
            Chart will load from backend analytics API (Recharts already installed).
          </p>
          <div className="mt-6 h-40 rounded-lg bg-gradient-to-r from-emerald-50 to-slate-50 border border-dashed border-gray-200 flex items-center justify-center text-sm text-gray-400">
            Revenue chart placeholder
          </div>
        </div>

        <div className="admin-card p-4 min-h-[260px]">
          <h2 className="font-medium text-gray-900 mb-2">Recent activity</h2>
          <ul className="space-y-3 text-sm text-gray-600 mt-4">
            <li>New booking � Hunza Valley tour</li>
            <li>Destination updated � Skardu</li>
            <li>Story published � Fairy Meadows</li>
            <li>Inquiry � family trip to Swat</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
