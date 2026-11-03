import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  TrendingUp, ShoppingBag, Calendar, Users, MessageSquare,
  DollarSign, PackageCheck, CreditCard, Loader2, ArrowUpRight
} from 'lucide-react';
import { analyticsApi } from '../api/analyticsApi';

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsApi.getStats()
      .then(res => setData(res))
      .catch(() => toast.error('Failed to load analytics'))
      .finally(() => setLoading(false));
  }, []);

  const money = (n) => 'PKR ' + Number(n || 0).toLocaleString('en-PK');

  if (loading) {
    return (
      <div className="py-24 text-center">
        <Loader2 size={36} className="animate-spin mx-auto text-emerald-600 mb-2" />
        <p className="text-sm font-bold text-slate-500">Calculating real-time analytics...</p>
      </div>
    );
  }

  const { summary = {}, orderStatusCounts = {}, paymentMethods = {}, recentOrders = [] } = data || {};

  const totalOrdersCount = summary.totalOrders || 1; // avoid division by zero

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analytics & Insights</h1>
        <p className="text-sm text-slate-500 mt-1">Real-time revenue, order breakdowns, and operational metrics.</p>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-gradient-to-br from-emerald-900 to-slate-900 text-white p-6 rounded-3xl shadow-lg space-y-2">
          <div className="flex justify-between items-center text-emerald-400">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Revenue</span>
            <DollarSign size={20} />
          </div>
          <div className="text-2xl font-black">{money(summary.totalRevenue)}</div>
          <div className="text-[11px] text-slate-300 pt-1 border-t border-slate-800 flex justify-between">
            <span>Shop: {money(summary.shopRevenue)}</span>
            <span>Tours: {money(summary.bookingRevenue)}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-amber-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Product Orders</span>
            <ShoppingBag size={20} />
          </div>
          <div className="text-2xl font-black text-slate-900">{summary.totalOrders || 0}</div>
          <div className="text-[11px] text-slate-400">Total processed shop sales</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-blue-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tour Bookings</span>
            <Calendar size={20} />
          </div>
          <div className="text-2xl font-black text-slate-900">{summary.totalBookings || 0}</div>
          <div className="text-[11px] text-slate-400">Active tour reservations</div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-purple-600">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered Users</span>
            <Users size={20} />
          </div>
          <div className="text-2xl font-black text-slate-900">{summary.totalUsers || 0}</div>
          <div className="text-[11px] text-slate-400">{summary.unreadInquiries || 0} unread customer inquiries</div>
        </div>
      </div>

      {/* Visual Progress Breakdowns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Order Fulfillment Status */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <h2 className="font-bold text-slate-900 text-base border-b pb-2 flex items-center gap-2">
            <PackageCheck size={18} className="text-amber-600" /> Fulfillment Status Breakdown
          </h2>

          <div className="space-y-4">
            {[
              { label: 'Delivered', key: 'delivered', color: 'bg-emerald-500' },
              { label: 'Shipped', key: 'shipped', color: 'bg-indigo-500' },
              { label: 'Processing', key: 'processing', color: 'bg-purple-500' },
              { label: 'Confirmed', key: 'confirmed', color: 'bg-blue-500' },
              { label: 'Pending', key: 'pending', color: 'bg-amber-500' },
            ].map(item => {
              const count = orderStatusCounts[item.key] || 0;
              const percent = Math.round((count / totalOrdersCount) * 100);
              return (
                <div key={item.key} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>{item.label}</span>
                    <span>{count} orders ({percent}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Gateways Used */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <h2 className="font-bold text-slate-900 text-base border-b pb-2 flex items-center gap-2">
            <CreditCard size={18} className="text-emerald-600" /> Payment Methods Share
          </h2>

          <div className="space-y-4">
            {[
              { label: 'Cash on Delivery (COD)', key: 'cod', color: 'bg-amber-500' },
              { label: 'Easypaisa Transfer', key: 'easypaisa', color: 'bg-emerald-500' },
              { label: 'JazzCash Transfer', key: 'jazzcash', color: 'bg-rose-500' },
              { label: 'Bank Transfer (Meezan)', key: 'bank_transfer', color: 'bg-blue-600' },
            ].map(item => {
              const count = paymentMethods[item.key] || 0;
              const percent = Math.round((count / totalOrdersCount) * 100);
              return (
                <div key={item.key} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>{item.label}</span>
                    <span>{count} transactions ({percent}%)</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all duration-500`} style={{ width: `${percent}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
        <h2 className="font-bold text-slate-900 text-base border-b pb-2 flex items-center justify-between">
          <span>Recent Product Orders</span>
          <span className="text-xs text-slate-400 font-normal">Last 5 orders</span>
        </h2>

        {recentOrders.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 font-medium">No order transactions recorded yet.</div>
        ) : (
          <div className="divide-y divide-slate-100 text-sm">
            {recentOrders.map(order => (
              <div key={order.id} className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition">
                <div>
                  <div className="font-bold text-slate-900">{order.number} — {order.customer}</div>
                  <div className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="font-black text-amber-700">{money(order.amount)}</div>
                  <span className="inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600 mt-0.5">
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}