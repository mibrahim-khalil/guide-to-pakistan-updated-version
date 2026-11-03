import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { couponsApi } from '../api/couponsApi';

export default function CouponsListPage() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ code: '', discountType: 'percentage', discountValue: '', expiryDate: '' });

  const load = async () => { const data = await couponsApi.list(); setRows(data); };
  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await couponsApi.create(form); toast.success('Coupon Created'); load();
    } catch(err) { toast.error('Failed to create'); }
  };
  const del = async (id) => { await couponsApi.remove(id); toast.success('Deleted'); load(); };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Promo Codes & Coupons</h1>
      
      <form onSubmit={create} className="bg-white p-6 rounded-2xl border shadow-sm flex gap-4 items-end">
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">Code</label>
          <input required value={form.code} onChange={e=>setForm({...form, code: e.target.value.toUpperCase()})} className="w-full border rounded-lg px-3 py-2 mt-1" placeholder="e.g. SUMMER20" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">Type</label>
          <select value={form.discountType} onChange={e=>setForm({...form, discountType: e.target.value})} className="w-full border rounded-lg px-3 py-2 mt-1">
            <option value="percentage">% Off</option><option value="fixed">Flat Amount Off (PKR)</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">Value</label>
          <input type="number" required value={form.discountValue} onChange={e=>setForm({...form, discountValue: e.target.value})} className="w-full border rounded-lg px-3 py-2 mt-1" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-500 uppercase">Expiry Date</label>
          <input type="date" required value={form.expiryDate} onChange={e=>setForm({...form, expiryDate: e.target.value})} className="w-full border rounded-lg px-3 py-2 mt-1" />
        </div>
        <button type="submit" className="bg-emerald-600 text-white font-bold px-5 py-2.5 rounded-lg hover:bg-emerald-700">Add</button>
      </form>

      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden p-4">
        <table className="min-w-full text-sm text-left">
          <thead><tr><th>Code</th><th>Discount</th><th>Expires</th><th>Uses</th><th>Delete</th></tr></thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map(r => (
              <tr key={r._id} className="py-2">
                <td className="font-bold py-3 text-lg text-emerald-600">{r.code}</td>
                <td>{r.discountType==='percentage' ? `${r.discountValue}%` : `PKR ${r.discountValue}`}</td>
                <td>{new Date(r.expiryDate).toLocaleDateString()}</td>
                <td>{r.usedCount} / {r.usageLimit}</td>
                <td><button onClick={()=>del(r._id)} className="text-red-500 font-bold">X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}