import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { productsApi } from '../api/productsApi';
import ImageUploader from '../../../shared/components/ImageUploader';

const CATEGORIES = ['Dry Fruits', 'Handicrafts', 'Trekking Gear', 'Spices & Tea', 'Souvenirs', 'Pashmina & Shawls'];
const empty = {
  name: '', category: 'Dry Fruits', description: '', price: '', discountPrice: '',
  stock: 50, unit: '1 KG', image: '', origin: 'Pakistan', featured: false, status: 'active'
};

export default function ProductsListPage() {
  const [rows, setRows] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);

  const load = async () => { setRows(await productsApi.list()); };
  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(empty); setShowForm(true); };
  const openEdit = (p) => { setEditing(p); setForm({ ...empty, ...p }); setShowForm(true); };

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editing) await productsApi.update(editing.id, form);
      else await productsApi.create(form);
      toast.success(editing ? 'Updated!' : 'Created!'); load(); setShowForm(false);
    } catch (err) { toast.error('Failed to save'); }
  };

  const del = async (id) => {
    if (!confirm('Delete this product?')) return;
    await productsApi.remove(id); toast.success('Deleted'); load();
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shop Products</h1>
          <p className="text-sm text-gray-500 mt-1">Pakistani dry fruits, handicrafts, trekking gear & souvenirs.</p>
        </div>
        <button onClick={openCreate} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {rows.map(p => (
          <div key={p.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <img src={p.image} alt={p.name} className="h-40 w-full object-cover" />
            <div className="p-4 space-y-2">
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded">{p.category}</span>
              <h3 className="font-bold text-gray-900 line-clamp-2">{p.name}</h3>
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-black text-emerald-700">PKR {Number(p.discountPrice || p.price).toLocaleString()}</span>
                {p.discountPrice && <span className="text-xs text-gray-400 line-through">PKR {p.price.toLocaleString()}</span>}
              </div>
              <div className="text-xs text-gray-500">Stock: {p.stock} | {p.unit}</div>
              <div className="flex gap-2 pt-2 border-t border-gray-100">
                <button onClick={() => openEdit(p)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 rounded flex items-center justify-center gap-1">
                  <Pencil size={13} /> Edit
                </button>
                <button onClick={() => del(p.id)} className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold py-2 rounded flex items-center justify-center gap-1">
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <form onSubmit={save} className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button type="button" onClick={() => setShowForm(false)} className="absolute top-4 right-4 bg-gray-100 w-8 h-8 rounded-full font-bold">✕</button>
            <h2 className="text-xl font-bold text-gray-900">{editing ? 'Edit Product' : 'New Product'}</h2>
            
            <ImageUploader label="Product Image *" value={form.image} onChange={url => setForm({...form, image: url})} />
            
            <div><label className="text-xs font-bold">Name *</label>
              <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full border rounded-lg p-2.5 mt-1" /></div>

            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-bold">Category *</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full border rounded-lg p-2.5 mt-1">
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select></div>
              <div><label className="text-xs font-bold">Status</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full border rounded-lg p-2.5 mt-1">
                  <option value="active">Active</option><option value="out_of_stock">Out of Stock</option><option value="inactive">Inactive</option>
                </select></div>
              <div><label className="text-xs font-bold">Price (PKR) *</label>
                <input type="number" required value={form.price} onChange={e => setForm({...form, price: e.target.value})} className="w-full border rounded-lg p-2.5 mt-1" /></div>
              <div><label className="text-xs font-bold">Discount Price</label>
                <input type="number" value={form.discountPrice} onChange={e => setForm({...form, discountPrice: e.target.value})} className="w-full border rounded-lg p-2.5 mt-1" /></div>
              <div><label className="text-xs font-bold">Stock</label>
                <input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} className="w-full border rounded-lg p-2.5 mt-1" /></div>
              <div><label className="text-xs font-bold">Unit</label>
                <input value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} className="w-full border rounded-lg p-2.5 mt-1" placeholder="1 KG, 250g, 1 Piece" /></div>
            </div>

            <div><label className="text-xs font-bold">Origin</label>
              <input value={form.origin} onChange={e => setForm({...form, origin: e.target.value})} className="w-full border rounded-lg p-2.5 mt-1" /></div>

            <div><label className="text-xs font-bold">Description</label>
              <textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full border rounded-lg p-2.5 mt-1" /></div>

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} />
              <span className="text-sm font-medium">Featured Product</span>
            </label>

            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl">Save Product</button>
          </form>
        </div>
      )}
    </div>
  );
}
