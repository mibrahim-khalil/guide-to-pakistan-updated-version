import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Plus, Pencil, Trash2, ShieldAlert, X } from 'lucide-react'
import { advisoriesApi } from '../api/advisoriesApi'
import ConfirmDialog from '../../../shared/components/ConfirmDialog'

const emptyForm = {
  title: '',
  summary: '',
  severity: 'info',
  isPublished: true,
  validUntil: '',
}

export default function AdvisoriesListPage() {
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
      const data = await advisoriesApi.list()
      setRows(data)
    } catch {
      toast.error('Failed to load advisories')
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
      title: row.title || '',
      summary: row.summary || '',
      severity: row.severity || 'info',
      isPublished: row.isPublished !== false,
      validUntil: row.validUntil ? String(row.validUntil).slice(0, 10) : '',
    })
    setModalOpen(true)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        title: form.title,
        summary: form.summary,
        severity: form.severity,
        isPublished: form.isPublished,
        validUntil: form.validUntil ? new Date(form.validUntil) : null,
      }

      if (editing) {
        await advisoriesApi.update(editing.id, payload)
        toast.success('Advisory updated')
      } else {
        await advisoriesApi.create(payload)
        toast.success('Advisory created')
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
      await advisoriesApi.remove(toDelete.id)
      toast.success('Advisory deleted')
      setToDelete(null)
      load()
    } catch {
      toast.error('Delete failed')
    }
  }

  const severityClass = {
    info: 'bg-sky-100 text-sky-800',
    warning: 'bg-amber-100 text-amber-800',
    critical: 'bg-rose-100 text-rose-800',
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Travel Advisories</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage public advisories shown on the TISS page.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-medium"
        >
          <Plus size={16} /> Add advisory
        </button>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading advisories...</div>
      ) : rows.length === 0 ? (
        <div className="admin-card p-10 text-center bg-white">
          <ShieldAlert className="mx-auto text-gray-300 mb-3" size={42} />
          <div className="text-sm text-gray-500">No advisories yet.</div>
        </div>
      ) : (
        <div className="admin-card overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-left text-gray-600">
                <tr>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Severity</th>
                  <th className="px-4 py-3 font-medium">Published</th>
                  <th className="px-4 py-3 font-medium">Valid Until</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50/70">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{row.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{row.summary}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium capitalize ${severityClass[row.severity] || 'bg-gray-100 text-gray-700'}`}>
                        {row.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex px-2 py-0.5 rounded-md text-xs font-medium ${row.isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'}`}>
                        {row.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {row.validUntil ? new Date(row.validUntil).toLocaleDateString() : '—'}
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
              {editing ? 'Edit Advisory' : 'Add Advisory'}
            </h2>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm"
                  placeholder="e.g. Babusar Top temporary closure"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Summary</label>
                <textarea
                  required
                  rows={4}
                  value={form.summary}
                  onChange={(e) => setForm((p) => ({ ...p, summary: e.target.value }))}
                  className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm"
                  placeholder="Short public advisory text..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Severity</label>
                  <select
                    value={form.severity}
                    onChange={(e) => setForm((p) => ({ ...p, severity: e.target.value }))}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm"
                  >
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Valid Until</label>
                  <input
                    type="date"
                    value={form.validUntil}
                    onChange={(e) => setForm((p) => ({ ...p, validUntil: e.target.value }))}
                    className="w-full rounded-xl border border-gray-300 px-3 py-2.5 text-sm"
                  />
                </div>
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
                {submitting ? 'Saving...' : editing ? 'Update Advisory' : 'Create Advisory'}
              </button>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete advisory?"
        message={toDelete ? `This will remove "${toDelete.title}".` : ''}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  )
}