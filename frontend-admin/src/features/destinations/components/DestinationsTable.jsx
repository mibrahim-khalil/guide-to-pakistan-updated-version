import { Link } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
import StatusBadge from '../../../shared/components/StatusBadge'

export default function DestinationsTable({ rows, onDelete }) {
  if (!rows.length) return <div className="admin-card p-8 text-center text-sm text-gray-500 bg-white">No places found.</div>

  const riskColors = {
    'Low Risk': 'text-emerald-700 bg-emerald-50',
    'Moderate Risk': 'text-amber-700 bg-amber-50',
    'High Risk': 'text-red-700 bg-red-50',
    'Not Safe': 'text-rose-900 bg-rose-100',
  }

  return (
    <div className="admin-card overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200 text-left text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Place Name</th>
              <th className="px-4 py-3 font-medium">Region</th>
              <th className="px-4 py-3 font-medium">Risk / Weather</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50/70">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{row.name}</div>
                  <div className="text-xs text-gray-500">{row.slug}</div>
                </td>
                <td className="px-4 py-3 text-gray-700">{row.regionName}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${riskColors[row.hero?.risk] || 'bg-gray-100 text-gray-700'}`}>
                    {row.hero?.risk || 'Unknown'}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">{row.weather?.baseTemperature}°C, {row.weather?.condition}</div>
                </td>
                <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <Link to={'/destinations/' + row.id + '/edit'} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 hover:bg-white text-gray-600">
                      <Pencil size={14} /> Edit
                    </Link>
                    <button type="button" onClick={() => onDelete(row)} className="inline-flex items-center gap-1 rounded-lg border border-red-200 text-red-700 px-2.5 py-1.5 hover:bg-red-50">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
