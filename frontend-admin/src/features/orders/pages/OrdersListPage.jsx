import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Eye, Trash2, Package, X, CheckCircle, XCircle, Download, ExternalLink } from 'lucide-react';
import { ordersApi } from '../api/ordersApi';

export default function OrdersListPage() {
  const [rows, setRows] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPayment, setFilterPayment] = useState('all');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await ordersApi.list({ 
        orderStatus: filterStatus, 
        paymentStatus: filterPayment 
      });
      setRows(data || []);
    } catch (err) {
      toast.error('Failed to pull order logs from database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [filterStatus, filterPayment]);

  const updateStatus = async (payload) => {
    if (!selected) return;
    try {
      await ordersApi.update(selected._id, payload);
      toast.success('System record synced successfully!');
      const refresh = await ordersApi.getById(selected._id);
      setSelected(refresh);
      load();
    } catch (err) {
      toast.error('Action failed. Retry again.');
    }
  };

  const del = async (id) => {
    if (!confirm('Are you absolutely sure you want to permanently delete this order?')) return;
    try {
      await ordersApi.remove(id);
      toast.success('Order deleted');
      load();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  const statusColors = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
    processing: 'bg-purple-50 text-purple-700 border-purple-200',
    shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    delivered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const paymentColors = {
    unpaid: 'bg-slate-100 text-slate-600',
    pending_verification: 'bg-amber-100 text-amber-700 animate-pulse',
    paid: 'bg-emerald-100 text-emerald-700 font-bold',
    rejected: 'bg-rose-100 text-rose-700',
    refunded: 'bg-blue-100 text-blue-700',
  };

  const money = (n) => 'PKR ' + Number(n).toLocaleString('en-PK');

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Product Orders & Payments</h1>
        <p className="text-sm text-slate-500 mt-1">Audit transactions, verify electronic transfer vouchers, and handle packaging state updates.</p>
      </div>

      {/* Control Filters */}
      <div className="bg-white p-5 rounded-2xl border shadow-sm space-y-4">
        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2.5">Order Delivery Status:</div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
              <button 
                key={s} 
                onClick={() => setFilterStatus(s)} 
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition ${filterStatus === s ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {s === 'all' ? 'All Delivery States' : s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2.5">Gateway Payment Status:</div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'unpaid', 'pending_verification', 'paid', 'rejected'].map(s => (
              <button 
                key={s} 
                onClick={() => setFilterPayment(s)} 
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition ${filterPayment === s ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {s === 'all' ? 'All Payment Statuses' : s.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center"><div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>
      ) : rows.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border shadow-sm">
          <Package size={48} className="mx-auto text-slate-300 mb-3" />
          No match found inside this filter query.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-slate-50 border-b text-slate-600 font-bold text-xs uppercase">
              <tr>
                <th className="px-5 py-4">Order Code #</th>
                <th className="px-5 py-4">Customer Details</th>
                <th className="px-5 py-4">Items count</th>
                <th className="px-5 py-4">Receivables</th>
                <th className="px-5 py-4">Gateway</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {rows.map(order => (
                <tr key={order._id} className="hover:bg-slate-50/60 transition">
                  <td className="px-5 py-4 font-black text-amber-700">{order.orderNumber}</td>
                  <td className="px-5 py-4">
                    <div className="font-extrabold text-slate-900">{order.customerName}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{order.customerPhone}</div>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{order.items?.length || 0} items</td>
                  <td className="px-5 py-4 font-black text-slate-900">{money(order.totalAmount)}</td>
                  <td className="px-5 py-4">
                    <div className="text-xs uppercase font-extrabold text-slate-700">{order.paymentMethod === 'cod' ? 'COD' : order.paymentMethod.replace('_', ' ')}</div>
                    <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-black capitalize mt-1 ${paymentColors[order.paymentStatus]}`}>
                      {order.paymentStatus.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border capitalize ${statusColors[order.orderStatus]}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setSelected(order)} 
                        className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition text-slate-600"
                        title="Inspect Order Log"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => del(order._id)} 
                        className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition"
                        title="Delete Log"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Audit Detail Inspector Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 md:p-8 space-y-6 shadow-2xl relative animate-fadeIn">
            <button 
              onClick={() => setSelected(null)} 
              className="absolute top-5 right-5 w-9 h-9 bg-slate-100 hover:bg-slate-250 text-slate-600 rounded-full flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
            
            <div className="border-b pb-4">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">Audit & Operations Center</span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">Transaction Ledger: {selected.orderNumber}</h2>
              <p className="text-xs text-slate-500 mt-1">Timestamp Log: {new Date(selected.createdAt).toLocaleString()}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-slate-50 rounded-2xl p-4 text-sm space-y-3.5 border">
                  <div className="font-bold text-slate-700 text-xs uppercase tracking-wide border-b pb-1">Customer Logistics details</div>
                  <div className="grid grid-cols-2 gap-y-2">
                    <div><span className="text-xs text-slate-400 block">Name</span><span className="font-bold text-slate-900">{selected.customerName}</span></div>
                    <div><span className="text-xs text-slate-400 block">WhatsApp Phone</span><span className="font-bold text-slate-900">{selected.customerPhone}</span></div>
                    <div className="col-span-2"><span className="text-xs text-slate-400 block">Email Address</span><span className="font-semibold text-slate-900">{selected.customerEmail}</span></div>
                    <div className="col-span-2"><span className="text-xs text-slate-400 block">Shipping Destination</span>
                      <span className="font-bold text-slate-900 block leading-tight mt-0.5">
                        {selected.shippingAddress.street}, {selected.shippingAddress.city}, {selected.shippingAddress.province} {selected.shippingAddress.postalCode}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-slate-700 text-xs uppercase tracking-wide mb-3">Cart Manifest</h3>
                  <div className="space-y-2 max-h-52 overflow-y-auto">
                    {selected.items.map((item, i) => (
                      <div key={i} className="flex gap-3 bg-slate-50 rounded-xl p-2.5 border">
                        <img src={item.image} className="w-12 h-12 rounded-lg object-cover shrink-0 border bg-white" alt="" />
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-xs truncate text-slate-900">{item.name}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{item.quantity} x {money(item.price)} ({item.unit})</div>
                        </div>
                        <div className="font-bold text-xs text-slate-900 self-center">{money(item.price * item.quantity)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4 space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-600"><span>Basket Sum:</span><span className="font-bold text-slate-900">{money(selected.subtotal)}</span></div>
                  <div className="flex justify-between text-slate-600"><span>Standard Logistics Cost:</span><span className="font-bold text-slate-900">{money(selected.shippingCost)}</span></div>
                  {selected.discount > 0 && <div className="flex justify-between text-emerald-700 font-semibold"><span>Coupon Deduction ({selected.couponCode}):</span><span>- {money(selected.discount)}</span></div>}
                  <div className="flex justify-between text-base font-black pt-2.5 border-t border-amber-200 text-slate-900"><span>Grand Total audited:</span><span className="text-amber-700">{money(selected.totalAmount)}</span></div>
                </div>
              </div>

              {/* Payment Verification column */}
              <div className="space-y-4">
                <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-3.5 shadow-md">
                  <h3 className="font-bold uppercase text-xs text-amber-400 tracking-wider">Secure Transfer Gateway Info</h3>
                  <div className="text-xs md:text-sm space-y-2">
                    <div className="flex justify-between"><span className="text-slate-400">Merchant Gateway:</span><span className="font-bold capitalize">{selected.paymentMethod.replace('_', ' ')}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Gateway Status:</span>
                      <span className={`font-bold px-2 py-0.5 rounded text-xs capitalize ${selected.paymentStatus === 'paid' ? 'bg-emerald-600 text-white' : selected.paymentStatus === 'pending_verification' ? 'bg-amber-600 text-white' : selected.paymentStatus === 'rejected' ? 'bg-rose-600 text-white' : 'bg-slate-700 text-slate-300'}`}>
                        {selected.paymentStatus.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {selected.paymentDetails?.senderName && (
                    <div className="bg-slate-950/60 rounded-xl p-3 space-y-2 text-xs border border-slate-800">
                      <div className="flex justify-between"><span className="text-slate-400">Declared Sender Name:</span><span className="font-bold text-white">{selected.paymentDetails.senderName}</span></div>
                      {selected.paymentDetails.senderAccount && <div className="flex justify-between"><span className="text-slate-400">Sender Account/Mobile:</span><span className="font-bold text-amber-300 font-mono">{selected.paymentDetails.senderAccount}</span></div>}
                      {selected.paymentDetails.transactionId && <div className="flex justify-between"><span className="text-slate-400">Transaction/TRX Ref ID:</span><span className="font-bold text-amber-300 font-mono">{selected.paymentDetails.transactionId}</span></div>}
                      {selected.paymentDetails.paidAt && <div className="flex justify-between"><span className="text-slate-400">Transfer Time:</span><span className="font-semibold">{new Date(selected.paymentDetails.paidAt).toLocaleString()}</span></div>}
                    </div>
                  )}
                </div>

                {selected.paymentDetails?.receiptImage && (
                  <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-xs uppercase tracking-wide text-slate-700">Digital Transfer Slip</h3>
                      <div className="flex gap-2">
                        <a 
                          href={selected.paymentDetails.receiptImage} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1.5 rounded-lg font-bold flex items-center gap-1 border"
                        >
                          <ExternalLink size={12} /> External Tab
                        </a>
                      </div>
                    </div>
                    <a href={selected.paymentDetails.receiptImage} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border bg-slate-50 group hover:border-amber-400 transition-colors">
                      <img 
                        src={selected.paymentDetails.receiptImage} 
                        alt="E-transfer payment Slip screenshot" 
                        className="w-full rounded-xl max-h-56 object-contain bg-slate-50 transition duration-300 group-hover:scale-102" 
                      />
                    </a>
                  </div>
                )}

                {/* Verification Actions */}
                {selected.paymentStatus === 'pending_verification' && (
                  <div className="space-y-2 bg-amber-50/50 border border-amber-200 p-4 rounded-2xl">
                    <div className="text-xs font-black uppercase text-slate-700">Manual Verification Gateway Actions:</div>
                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <button 
                        onClick={() => updateStatus({ paymentStatus: 'paid', orderStatus: 'confirmed' })} 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 shadow-sm transition"
                      >
                        <CheckCircle size={14} /> Approve Payment
                      </button>
                      <button 
                        onClick={() => updateStatus({ paymentStatus: 'rejected' })} 
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 shadow-sm transition"
                      >
                        <XCircle size={14} /> Reject Transfer
                      </button>
                    </div>
                  </div>
                )}

                {/* Shipping State Controller */}
                <div className="space-y-2 border p-4 rounded-2xl bg-slate-50/50">
                  <div className="text-xs font-black uppercase text-slate-700">Update Shipment Log:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map(st => (
                      <button 
                        key={st} 
                        onClick={() => updateStatus({ orderStatus: st })} 
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition ${selected.orderStatus === st ? 'bg-slate-900 text-white' : 'bg-white hover:bg-slate-100 text-slate-700 border'}`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}