import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import {
  UploadCloud, Search, Trash2, Copy, Check, Loader2,
  Image as ImageIcon, X, FolderOpen, ExternalLink
} from 'lucide-react';
import { mediaApi } from '../api/mediaApi';

const FOLDERS = ['all', 'general', 'products', 'destinations', 'tours', 'banners', 'receipts'];

export default function MediaLibraryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [folder, setFolder] = useState('all');
  const [selected, setSelected] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const fileRef = useRef(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await mediaApi.list({ q: search || undefined, folder });
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error('Failed to load media library');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [search, folder]);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    let ok = 0;
    try {
      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not an image`);
          continue;
        }
        await mediaApi.upload(file, folder === 'all' ? 'general' : folder);
        ok++;
      }
      if (ok > 0) {
        toast.success(`${ok} image(s) uploaded`);
        load();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const copyUrl = async (item) => {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopiedId(item._id);
      toast.success('URL copied!');
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      toast.error('Copy failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this media file permanently?')) return;
    try {
      await mediaApi.remove(id);
      toast.success('Deleted');
      if (selected?._id === id) setSelected(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return '—';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
          <p className="text-sm text-slate-500 mt-1">Upload, organize, and copy image URLs for products, banners, and pages.</p>
        </div>

        <div className="flex gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-3 rounded-xl shadow-lg text-sm disabled:opacity-60"
          >
            {uploading ? <Loader2 size={18} className="animate-spin" /> : <UploadCloud size={18} />}
            {uploading ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by filename or alt text..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:ring-1 focus:ring-emerald-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {FOLDERS.map((f) => (
            <button
              key={f}
              onClick={() => setFolder(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition ${
                folder === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? 'All Folders' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-20 text-center">
          <Loader2 size={32} className="animate-spin mx-auto text-emerald-600" />
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-2xl p-16 text-center border border-slate-200">
          <FolderOpen size={48} className="mx-auto text-slate-300 mb-3" />
          <h3 className="font-bold text-slate-700">No media found</h3>
          <p className="text-sm text-slate-500 mt-1">Upload your first images to start the library.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition"
            >
              <button
                type="button"
                onClick={() => setSelected(item)}
                className="block w-full aspect-square bg-slate-100 relative overflow-hidden"
              >
                <img
                  src={item.url}
                  alt={item.alt || item.originalName || 'media'}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Image';
                  }}
                />
              </button>
              <div className="p-3 space-y-2">
                <div className="text-xs font-bold text-slate-800 truncate" title={item.originalName || item.filename}>
                  {item.originalName || item.filename || 'Untitled'}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="uppercase font-bold bg-slate-100 px-1.5 py-0.5 rounded">{item.folder || 'general'}</span>
                  <span>{formatSize(item.size)}</span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => copyUrl(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-bold py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                  >
                    {copiedId === item._id ? <Check size={12} /> : <Copy size={12} />}
                    {copiedId === item._id ? 'Copied' : 'Copy URL'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    className="px-2.5 py-2 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-4 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center"
            >
              <X size={16} />
            </button>

            <div>
              <span className="text-xs font-bold uppercase text-emerald-600 tracking-wider">Media Details</span>
              <h2 className="text-xl font-bold text-slate-900 mt-1 truncate pr-10">
                {selected.originalName || selected.filename}
              </h2>
            </div>

            <div className="bg-slate-50 rounded-2xl border overflow-hidden">
              <img src={selected.url} alt="" className="w-full max-h-80 object-contain bg-slate-100" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-50 p-3 rounded-xl">
                <div className="text-xs text-slate-400 font-medium">Folder</div>
                <div className="font-bold capitalize">{selected.folder || 'general'}</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl">
                <div className="text-xs text-slate-400 font-medium">Size</div>
                <div className="font-bold">{formatSize(selected.size)}</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl col-span-2">
                <div className="text-xs text-slate-400 font-medium mb-1">Public URL</div>
                <code className="text-xs break-all text-slate-700">{selected.url}</code>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => copyUrl(selected)}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2"
              >
                <Copy size={16} /> Copy URL
              </button>
              <a
                href={selected.url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-3 rounded-xl border font-bold text-sm flex items-center gap-2 hover:bg-slate-50"
              >
                <ExternalLink size={16} /> Open
              </a>
              <button
                onClick={() => handleDelete(selected._id)}
                className="px-4 py-3 rounded-xl border border-rose-200 text-rose-600 font-bold text-sm flex items-center gap-2 hover:bg-rose-50"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}