import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Search, Filter, RefreshCw, Calendar, Mail, Phone, User, CheckCircle, XCircle } from 'lucide-react';
import { bookingsApi } from '../api/bookingsApi';
import BookingsTable from '../components/BookingsTable';
import ConfirmDialog from '../../../shared/components/ConfirmDialog';

export default function BookingsListPage() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('all');
  const [paymentStatus, setPaymentStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [updating, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await bookingsApi.list({ q, status, paymentStatus });
      setRows(data || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [q, status, paymentStatus]);

  const handleUpdateStatus = async (newStatus, newPaymentStatus) => {
    if (!selectedBooking) return;
    setSubmitting(true);
    try {
      const updated = await bookingsApi.updateStatus(selectedBooking.id, {
        status: newStatus || selectedBooking.status,
        paymentStatus: newPaymentStatus || selectedBooking.paymentStatus,
      });
      toast.success('Booking status updated!');
      setSelectedBooking(updated);
      load();
    } catch (e) {
      toast.error('Failed to update status');
    } finally {
      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    try {
      await bookingsApi.remove(toDelete.id);
      toast.success('Booking deleted');
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
          <h1 className="text-2xl font-bold text-gray-900">Customer Bookings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage tour reservations, customer contacts, and payment statuses.</p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
        >
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-3 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search booking #, customer name, email, phone..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none bg-white cursor-pointer"
        >
          <option value="all">All Booking Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>

        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none bg-white cursor-pointer"
        >
          <option value="all">All Payment Statuses</option>
          <option value="unpaid">Unpaid</option>
          <option value="paid">Paid</option>
          <option value="refunded">Refunded</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="py-12 text-center text-sm text-gray-500">Loading bookings from database...</div>
      ) : (
        <BookingsTable rows={rows} onView={setSelectedBooking} onDelete={setToDelete} />
      )}

      {/* Detail / Update Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedBooking(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-sm"
            >
              ?
            </button>

            <div className="space-y-1 border-b border-gray-100 pb-4">
              <span className="text-xs font-bold text-emerald-600 tracking-wider uppercase">Booking Details</span>
              <h2 className="text-xl font-bold text-gray-900">{selectedBooking.bookingNumber}</h2>
              <p className="text-xs text-gray-500">Created on: {new Date(selectedBooking.createdAt).toLocaleString()}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div>
                <span className="text-xs text-gray-400 block font-medium">Customer Name</span>
                <span className="font-semibold text-gray-900">{selectedBooking.fullName}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block font-medium">Phone Number</span>
                <span className="font-semibold text-gray-900">{selectedBooking.phone}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block font-medium">Email Address</span>
                <span className="font-semibold text-gray-900 truncate block">{selectedBooking.email}</span>
              </div>
              <div>
                <span className="text-xs text-gray-400 block font-medium">Travel Date</span>
                <span className="font-semibold text-emerald-700">{selectedBooking.travelDate}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-500 uppercase">Package Requested</span>
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100 text-sm font-semibold text-emerald-900">
                {selectedBooking.tourTitle} ({selectedBooking.guestsCount} Guests)
              </div>
              {selectedBooking.specialRequests && (
                <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl italic">
                  "{selectedBooking.specialRequests}"
                </p>
              )}
            </div>

            {/* Status Change Buttons */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-bold text-gray-500 uppercase block">Update Booking Status</span>
              <div className="flex flex-wrap gap-2">
                <button
                  disabled={updating}
                  onClick={() => handleUpdateStatus('confirmed', 'paid')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition"
                >
                  ? Confirm & Mark Paid
                </button>
                <button
                  disabled={updating}
                  onClick={() => handleUpdateStatus('cancelled')}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold transition"
                >
                  ? Cancel Booking
                </button>
                <button
                  disabled={updating}
                  onClick={() => handleUpdateStatus('completed')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition"
                >
                  ? Mark Completed
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
              <div className="text-sm">
                <span className="text-xs text-gray-400 block">Total Amount</span>
                <span className="text-lg font-bold text-gray-900">PKR {Number(selectedBooking.totalAmount).toLocaleString()}</span>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(toDelete)}
        title="Delete customer booking?"
        message={toDelete ? `Are you sure you want to delete ${toDelete.bookingNumber}?` : ''}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
