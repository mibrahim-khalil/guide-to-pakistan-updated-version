import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Plus, Search } from 'lucide-react';
import { storiesApi } from '../api/storiesApi';
import StoriesTable from '../components/StoriesTable';
import ConfirmDialog from '../../../shared/components/ConfirmDialog';

export default function StoriesListPage() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await storiesApi.list({ q, category });
      setRows(data || []);
    } catch (e) {
      toast.error('Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [q, category]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await storiesApi.remove(toDelete.id);
      toast.success('Story deleted');
      setToDelete(null);
      load();
    } catch (e) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Travel Stories & Blogs</h1>
          <p className="text-sm text-gray-500 mt-1">Manage articles, guides, and traveler experiences.</p>
        </div>
        <Link
          to="/stories/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 text-sm font-semibold shadow-md transition"
        >
          <Plus size={16} /> Write New Article
        </Link>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-3 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search article title, author, category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none bg-white cursor-pointer"
        >
          <option value="all">All Categories</option>
          <option value="Travel Guide">Travel Guide</option>
          <option value="Culture & Heritage">Culture & Heritage</option>
          <option value="Adventure">Adventure</option>
          <option value="Food & Dining">Food & Dining</option>
          <option value="Traveler Story">Traveler Story</option>
        </select>
      </div>

      {loading ? (
        <div className="py-12 text-center text-sm text-gray-500">Loading stories from database...</div>
      ) : (
        <StoriesTable rows={rows} onDelete={setToDelete} />
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete article?"
        message={toDelete ? `Are you sure you want to delete "${toDelete.title}"?` : ''}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}