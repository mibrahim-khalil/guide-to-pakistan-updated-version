import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, Route, X } from 'lucide-react'
import { routeConditionsApi } from '../api/routeConditionsApi'
import ConfirmDialog from '../../../shared/components/ConfirmDialog'

const emptyForm = {
  name: '',
  slug: '',
  status: 'low',
  cause: '',
  isPublished: true,
}

export default function RouteConditionsListPage() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [toDelete, setToDelete] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const data = await routeConditionsApi.list()
      setRows(data)
    } catch {
      toast.error('Failed to load route conditions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (row) => {
    setEditing(row)
    setForm({
      name: row.name || '',
      slug: row.slug || '',
      status: row.status || 'low',
      cause: row.cause || '',
      isPublished: row.isPublished !== false,
    })
    setModalOpen(true)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        name: form.name,
        slug: form.slug || undefined,
        status: form.status,
        cause: form.cause,
        isPublished: form.isPublished,
      }

      if (editing) {
        await routeConditionsApi.update(editing.id, payload)
        toast.success('Route condition updated')
      } else {
        await routeConditionsApi.create(payload)
        toast.success('Route condition created')
      }

      setModalOpen(false)
      setEditing(null)
      setForm(emptyForm)
      load()
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Save failed')
    } finally {
      setSubmitting(false)
    }
  }

  const confirmDelete = async () => {
    if (!toDelete) return
    try {
      await routeConditionsApi.remove(toDelete.id)
      toast.success('Route condition deleted')
      setToDelete(null)
      load()
    } catch {
      toast.error('Delete failed')
    }
  }

  const statusClass = {
    clear: 'bg-emerald-100 text-emerald-800',
    low: 'bg-emerald-50 text-emerald-700',
    moderate: 'bg-amber-100 text-amber-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-rose-100 text-rose-800',
    closed: 'bg-red-100 text-red-800',
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Route Conditions</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage route status cards shown on the public TISS page.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-medium"
        >
          <Plus size={16} /> Add route condition
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading route conditions...</div>
      ) : rows.length === 0 ? (
        <div className="admin-card p-10 text-center bg-white">
          <Route className="mx-auto text-gray-300 mb-3" size={42} />
          <div className="text-sm text-gray-500">No route conditions yet.</div>
        </div>
      ) : (
        <div className="admin-card overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-left text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Route</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Cause</th>
                  <th className="px-4 py-3 font-medium">Published</th>
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
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium capitalize ${statusClass[row.status] || 'bg-gray-100 text-gray-700'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs">
                      <div className="line-clamp-2">{row.cause || '—'}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${row.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                        {row.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(row)}
                          className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1.5 hover:bg-white text-gray-600"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => setToDelete(row)}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 text-red-700 px-2.5 py-1.5 hover:bg-red-50"
                        >
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
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200"
            >
              <X size={16} />
            </button>

            <h2 className="text-xl font-bold text-slate-900 border-b pb-2">
              {editing ? 'Edit Route Condition' : 'Add Route Condition'}
            </h2>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Route Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm"
                  placeholder="e.g. Lahore → Islamabad (M-2)"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Slug (optional)</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm"
                  placeholder="Auto-generated if empty"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm"
                >
                  <option value="clear">Clear</option>
                  <option value="low">Low Risk</option>
                  <option value="moderate">Moderate Risk</option>
                  <option value="high">High Risk</option>
                  <option value="critical">Critical</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Cause / Notes</label>
                <textarea
                  rows={3}
                  value={form.cause}
                  onChange={(e) => setForm((p) => ({ ...p, cause: e.target.value }))}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm"
                  placeholder="e.g. Heavy fog near Kallar Kahar"
                />
              </div>

              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => setForm((p) => ({ ...p, isPublished: e.target.checked }))}
                />
                Published on public TISS page
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-gray-900 hover:bg-black text-white px-4 py-3 text-sm font-semibold disabled:opacity-60"
              >
                {submitting ? 'Saving...' : editing ? 'Update Route' : 'Create Route'}
              </button>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete route condition?"
        message={toDelete ? `This will remove "${toDelete.name}".` : ''}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}