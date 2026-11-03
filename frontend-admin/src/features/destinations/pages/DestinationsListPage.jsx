import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Plus } from 'lucide-react'
import { destinationsApi } from '../api/destinationsApi'
import DestinationsTable from '../components/DestinationsTable'
import ConfirmDialog from '../../../shared/components/ConfirmDialog'

export default function DestinationsListPage() {
  const [rows, setRows] = useState([])
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('all')
  const [loading, setLoading] = useState(true)
  const [toDelete, setToDelete] = useState(null)

  const load = async () => {
    setLoading(true)
    const data = await destinationsApi.list({ q, status })
    setRows(data)
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [q, status])

  const confirmDelete = async () => {
    if (!toDelete) return
    await destinationsApi.remove(toDelete.id)
    toast.success('Destination deleted')
    setToDelete(null)
    load()
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Destinations</h1>
          <p className="text-sm text-gray-500 mt-1">Manage regions and places shown on the public site.</p>
        </div>
        <Link to="/destinations/new" className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-medium">
          <Plus size={16} /> Add destination
        </Link>
      </div>

      <div className="admin-card p-3 bg-white flex flex-col sm:flex-row gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, region, slug..." className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
          <option value="all">All status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading destinations...</div>
      ) : (
        <DestinationsTable rows={rows} onDelete={setToDelete} />
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete destination?"
        message={toDelete ? ('This will remove "' + toDelete.name + '" from admin (mock storage).') : ''}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}
