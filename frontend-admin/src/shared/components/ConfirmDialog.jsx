export default function ConfirmDialog({ open, title, message, confirmText = 'Delete', onConfirm, onCancel }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="admin-card w-full max-w-md p-5 bg-white">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="px-3 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700">
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
