import { Link } from 'react-router-dom';
import { Pencil, Trash2, Star, User, BookOpen } from 'lucide-react';
import StatusBadge from '../../../shared/components/StatusBadge';

export default function StoriesTable({ rows = [], onDelete }) {
  if (!rows.length) {
    return (
      <div className="admin-card p-8 text-center text-sm text-gray-500 bg-white rounded-2xl border border-gray-200">
        No articles or travel stories found. Create your first blog post.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold text-xs uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3.5">Article Title</th>
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Author</th>
              <th className="px-5 py-3.5">Read Time</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-start gap-3">
                    {row.coverImage ? (
                      <img src={row.coverImage} alt="" className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-200" />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0">
                        <BookOpen size={20} />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900 line-clamp-1">{row.title}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{row.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="inline-block bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-lg font-medium">
                    {row.category}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-700 font-medium">
                  <div className="flex items-center gap-1.5 text-xs">
                    <User size={13} className="text-emerald-600" /> {row.author || 'GTP Editorial'}
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-500 text-xs font-medium">
                  {row.readTime || '5 min read'}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={row.status || 'draft'} />
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/stories/${row.id}/edit`}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium hover:bg-gray-50 text-gray-700 transition"
                    >
                      <Pencil size={14} /> Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete(row)}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-200 text-red-600 px-3 py-1.5 text-xs font-medium hover:bg-red-50 transition"
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
  );
}