import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MessageSquare, Mail, Phone, Trash2, CheckCircle2, Eye, X } from 'lucide-react';
import { inquiriesApi } from '../api/inquiriesApi';

export default function InquiriesListPage() {
  const [inquiries, setInquiries] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [selected, setSelected] = useState(null);

  const load = async () => {
    try {
      const data = await inquiriesApi.list({ status: filterStatus });
      setInquiries(data || []);
    } catch (err) {
      toast.error('Failed to load inquiries');
    }
  };

  useEffect(() => { load(); }, [filterStatus]);

  const updateStatus = async (id, status) => {
    try {
      await inquiriesApi.updateStatus(id, status);
      toast.success('Inquiry updated');
      load();
      if (selected && selected._id === id) {
        setSelected({ ...selected, status });
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this inquiry?')) return;
    try {
      await inquiriesApi.remove(id);
      toast.success('Deleted');
      if (selected?._id === id) setSelected(null);
      load();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Customer Inquiries</h1>
        <p className="text-sm text-slate-500 mt-1">Review contact form submissions and customer questions.</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex gap-2">
        {['all', 'unread', 'read', 'replied'].map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${filterStatus === st ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
          >
            {st}
          </button>
        ))}
      </div>

      {inquiries.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border">
          <MessageSquare size={48} className="mx-auto text-slate-300 mb-3" />
          No customer inquiries found.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs uppercase">
              <tr>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Subject</th>
                <th className="px-5 py-3.5">Received</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inquiries.map(inq => (
                <tr key={inq._id} className={`hover:bg-slate-50/80 ${inq.status === 'unread' ? 'bg-amber-50/30 font-semibold' : ''}`}>
                  <td className="px-5 py-4">
                    <div className="text-slate-900 font-bold">{inq.name}</div>
                    <div className="text-xs text-slate-500">{inq.email}</div>
                  </td>
                  <td className="px-5 py-4 text-slate-700 line-clamp-1">{inq.subject || 'General Inquiry'}</td>
                  <td className="px-5 py-4 text-xs text-slate-500">{new Date(inq.createdAt).toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                      inq.status === 'unread' ? 'bg-amber-100 text-amber-700' :
                      inq.status === 'replied' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setSelected(inq); if (inq.status === 'unread') updateStatus(inq._id, 'read'); }} className="p-2 border rounded-lg hover:bg-slate-100"><Eye size={16} /></button>
                      <button onClick={() => handleDelete(inq._id)} className="p-2 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative">
            <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200"><X size={16} /></button>
            <h2 className="text-xl font-bold text-slate-900 border-b pb-2">Inquiry Message</h2>
            <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-sm">
              <div><span className="text-slate-400 text-xs">From:</span> <strong>{selected.name}</strong> ({selected.email})</div>
              {selected.phone && <div><span className="text-slate-400 text-xs">Phone:</span> {selected.phone}</div>}
              <div><span className="text-slate-400 text-xs">Subject:</span> {selected.subject}</div>
            </div>
            <div className="p-4 border rounded-xl bg-white text-slate-800 text-sm whitespace-pre-wrap leading-relaxed">
              {selected.message}
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-400">Status: <strong className="uppercase text-slate-700">{selected.status}</strong></span>
              <div className="flex gap-2">
                <button onClick={() => updateStatus(selected._id, 'replied')} className="bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1"><CheckCircle2 size={14} /> Mark Replied</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}