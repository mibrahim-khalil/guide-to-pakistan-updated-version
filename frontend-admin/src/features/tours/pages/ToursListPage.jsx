import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { toursApi } from "../api/toursApi";
import ToursTable from "../components/ToursTable";
import ConfirmDialog from "../../../shared/components/ConfirmDialog";

export default function ToursListPage() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(true);
  const [toDelete, setToDelete] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await toursApi.list({ q, status });
      setRows(data || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Failed to load tours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [q, status]);

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await toursApi.remove(toDelete.id || toDelete._id);
      toast.success("Tour deleted");
      setToDelete(null);
      load();
    } catch (e) {
      toast.error(e?.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Tours & Packages</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage tour packages shown on the public website.
          </p>
        </div>
        <Link
          to="/tours/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 text-sm font-medium"
        >
          <Plus size={16} /> Add tour
        </Link>
      </div>

      <div className="admin-card p-3 bg-white flex flex-col sm:flex-row gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search title, region..."
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="all">All status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {loading ? (
        <div className="text-sm text-gray-500">Loading tours from API...</div>
      ) : (
        <ToursTable rows={rows} onDelete={setToDelete} />
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete tour package?"
        message={
          toDelete
            ? 'This will permanently remove "' + toDelete.title + '" from the database.'
            : ""
        }
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}