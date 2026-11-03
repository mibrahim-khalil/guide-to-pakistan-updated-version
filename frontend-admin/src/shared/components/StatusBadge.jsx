export default function StatusBadge({ status }) {
  const map = {
    published: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    draft: 'bg-amber-50 text-amber-700 border-amber-200',
    archived: 'bg-gray-100 text-gray-600 border-gray-200',
  }
  const cls = map[status] || map.draft
  return (
    <span className={'inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ' + cls}>
      {status}
    </span>
  )
}
