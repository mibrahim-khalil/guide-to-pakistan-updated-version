import { Eye, Trash2, Calendar, Phone, Mail, User, ShieldCheck } from 'lucide-react';

export default function BookingsTable({ rows = [], onView, onDelete }) {
  if (!rows.length) {
    return (
      <div className="admin-card p-8 text-center text-sm text-gray-500 bg-white rounded-2xl border border-gray-200">
        No bookings found.
      </div>
    );
  }

  const formatMoney = (val) => (val ? `PKR ${Number(val).toLocaleString()}` : '—');

  const statusBadges = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
    completed: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  const paymentBadges = {
    unpaid: 'bg-rose-50 text-rose-600',
    paid: 'bg-emerald-50 text-emerald-600 font-semibold',
    refunded: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-semibold text-xs uppercase tracking-wider">
            <tr>
              <th className="px-5 py-3.5">Booking #</th>
              <th className="px-5 py-3.5">Customer</th>
              <th className="px-5 py-3.5">Package</th>
              <th className="px-5 py-3.5">Travel Date</th>
              <th className="px-5 py-3.5">Amount</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-5 py-4 font-bold text-gray-900">
                  {row.bookingNumber || 'GTP-TEMP'}
                </td>
                <td className="px-5 py-4">
                  <div className="font-semibold text-gray-900">{row.fullName}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                    <Mail size={12} /> {row.email}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-1.5 mt-0.5">
                    <Phone size={12} /> {row.phone}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="font-medium text-gray-900 max-w-xs truncate">{row.tourTitle}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{row.guestsCount} Guest(s)</div>
                </td>
                <td className="px-5 py-4 text-gray-700 whitespace-nowrap">
                  <div className="flex items-center gap-1.5 text-xs font-medium">
                    <Calendar size={13} className="text-emerald-600" />
                    {row.travelDate}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="font-bold text-gray-900">{formatMoney(row.totalAmount)}</div>
                  <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full mt-0.5 capitalize ${paymentBadges[row.paymentStatus] || 'bg-gray-100'}`}>
                    {row.paymentStatus}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border capitalize ${statusBadges[row.status] || 'bg-gray-50'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onView(row)}
                      className="p-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 transition"
                      title="View & Edit Booking"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(row)}
                      className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition"
                      title="Delete Booking"
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
    </div>
  );
}
