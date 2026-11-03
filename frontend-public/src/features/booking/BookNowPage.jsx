import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Sparkles, CheckCircle2, Tag, X } from 'lucide-react';
import { publicBookingsApi } from './api/publicBookingsApi';
import { publicShopApi } from '../shop/api/publicShopApi';

export default function BookNowPage() {
  const [searchParams] = useSearchParams();
  const preSelectedTour = searchParams.get('tour') || '';

  const [form, setForm] = useState({
    fullName: '', email: '', phone: '',
    tourTitle: preSelectedTour || 'Hunza & Attabad Lake Luxury Expedition',
    travelDate: '', guestsCount: 2, specialRequests: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);

  // Coupon states
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [checkingCoupon, setCheckingCoupon] = useState(false);

  const basePrice = 75000;
  const subtotal = basePrice * form.guestsCount;
  const discount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? (subtotal * appliedCoupon.discountValue) / 100
      : appliedCoupon.discountValue
    : 0;
  const finalTotal = Math.max(0, subtotal - discount);

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCheckingCoupon(true);
    try {
      const coupon = await publicShopApi.validateCoupon(couponCode.trim());
      setAppliedCoupon(coupon);
      toast.success(`Coupon "${coupon.code}" applied!`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid coupon');
      setAppliedCoupon(null);
    } finally {
      setCheckingCoupon(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = { ...form, totalAmount: finalTotal };
      if (appliedCoupon) payload.couponCode = appliedCoupon.code;
      const created = await publicBookingsApi.createBooking(payload);
      setSuccessBooking(created);
      toast.success('Booking submitted!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
            <Sparkles size={14} /> Easy Reservation
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">Book Your Pakistan Experience</h1>
          <p className="text-slate-600 text-sm max-w-lg mx-auto">We will contact you within 2 hours to confirm details.</p>
        </div>

        {successBooking ? (
          <div className="bg-white rounded-3xl border border-emerald-200 p-8 text-center space-y-6 shadow-xl">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-2xl font-extrabold">Booking Confirmed!</h2>
            <p className="text-slate-600">Reservation code: <strong className="text-emerald-700">{successBooking.bookingNumber}</strong></p>
            <button onClick={() => { setSuccessBooking(null); removeCoupon(); }} className="bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl">Book Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border p-8 shadow-lg space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="text-xs font-bold uppercase">Tour Package</label>
                <select value={form.tourTitle} onChange={e => setForm({...form, tourTitle: e.target.value})} className="w-full border rounded-xl p-3 mt-1 bg-slate-50">
                  <option>Hunza & Attabad Lake Luxury Expedition</option>
                  <option>Skardu & Deosai Plains Safari</option>
                  <option>Swat & Kalam Valley Blossom Escape</option>
                  <option>Customized Private Tour</option>
                </select>
              </div>
              <div><label className="text-xs font-bold uppercase">Full Name *</label>
                <input required value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} className="w-full border rounded-xl p-3 mt-1" /></div>
              <div><label className="text-xs font-bold uppercase">Phone *</label>
                <input required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full border rounded-xl p-3 mt-1" placeholder="+92 300 1234567" /></div>
              <div><label className="text-xs font-bold uppercase">Email *</label>
                <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border rounded-xl p-3 mt-1" /></div>
              <div><label className="text-xs font-bold uppercase">Travel Date *</label>
                <input type="date" required value={form.travelDate} onChange={e => setForm({...form, travelDate: e.target.value})} className="w-full border rounded-xl p-3 mt-1" /></div>
              <div><label className="text-xs font-bold uppercase">Guests</label>
                <input type="number" min={1} value={form.guestsCount} onChange={e => setForm({...form, guestsCount: Number(e.target.value)})} className="w-full border rounded-xl p-3 mt-1" /></div>
              <div className="md:col-span-2"><label className="text-xs font-bold uppercase">Special Requests</label>
                <textarea rows={3} value={form.specialRequests} onChange={e => setForm({...form, specialRequests: e.target.value})} className="w-full border rounded-xl p-3 mt-1" /></div>
            </div>

            {/* COUPON SECTION */}
            <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-4 space-y-3">
              <label className="flex items-center gap-2 text-sm font-bold text-emerald-800">
                <Tag size={16} /> Have a Discount Code?
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-white border border-emerald-300 rounded-xl p-3">
                  <div>
                    <div className="font-bold text-emerald-700">✓ {appliedCoupon.code} Applied</div>
                    <div className="text-xs text-slate-500">
                      {appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.discountValue}% off` : `PKR ${appliedCoupon.discountValue} off`}
                    </div>
                  </div>
                  <button type="button" onClick={removeCoupon} className="text-rose-600 bg-rose-50 w-8 h-8 rounded-full flex items-center justify-center">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())} placeholder="Enter code e.g. GTP2026" className="flex-1 border rounded-xl p-3 uppercase" />
                  <button type="button" onClick={applyCoupon} disabled={checkingCoupon} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 rounded-xl disabled:opacity-60">
                    {checkingCoupon ? 'Checking...' : 'Apply'}
                  </button>
                </div>
              )}
            </div>

            {/* PRICE SUMMARY */}
            <div className="bg-slate-50 rounded-2xl p-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-600"><span>Subtotal ({form.guestsCount} guests)</span><span>PKR {subtotal.toLocaleString()}</span></div>
              {appliedCoupon && <div className="flex justify-between text-emerald-700 font-semibold"><span>Discount ({appliedCoupon.code})</span><span>- PKR {discount.toLocaleString()}</span></div>}
              <div className="flex justify-between text-lg font-black text-slate-900 pt-2 border-t border-slate-200"><span>Total</span><span className="text-emerald-700">PKR {finalTotal.toLocaleString()}</span></div>
            </div>

            <button type="submit" disabled={submitting} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg disabled:opacity-60">
              {submitting ? 'Submitting...' : 'Confirm Reservation'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}