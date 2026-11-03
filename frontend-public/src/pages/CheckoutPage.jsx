import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCartStore } from '../features/shop/store/cartStore';
import { publicOrdersApi } from '../features/shop/api/publicOrdersApi';
import { publicShopApi } from '../features/shop/api/publicShopApi';
import { CheckCircle2, ShoppingBag, X, Tag, Smartphone, Wallet, Building2, HelpCircle } from 'lucide-react';
import ReceiptUploader from '../shared/components/ReceiptUploader';

const PAYMENT_INFO = {
  easypaisa: {
    label: 'Easypaisa',
    icon: Smartphone,
    color: 'bg-emerald-600',
    accountName: 'Guide to Pakistan',
    accountNumber: '0300-1234567',
    instructions: 'Please transfer the exact total amount to the Easypaisa wallet listed below, then take a screenshot of your successful transaction receipt and upload it.'
  },
  jazzcash: {
    label: 'JazzCash',
    icon: Wallet,
    color: 'bg-amber-500',
    accountName: 'Guide to Pakistan',
    accountNumber: '0321-9876543',
    instructions: 'Please transfer the total amount to the JazzCash wallet listed below, then capture the electronic transaction slip and upload it below.'
  },
  bank_transfer: {
    label: 'Bank Transfer',
    icon: Building2,
    color: 'bg-blue-600',
    accountName: 'Guide to Pakistan Private Limited',
    accountNumber: 'PK36 MEZN 0001 2345 6789 0123',
    bank: 'Meezan Bank Ltd.',
    instructions: 'Send the amount directly to our Meezan Bank Account. Mobile/Net-Banking Transfers and ATM Deposits are accepted.'
  },
  cod: {
    label: 'Cash on Delivery',
    icon: HelpCircle,
    color: 'bg-slate-800',
    instructions: 'Our courier agent will collect the cash package from your doorstep when your shipment arrives.'
  },
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const [form, setForm] = useState({
    customerName: '', customerEmail: '', customerPhone: '',
    street: '', city: '', province: 'Punjab', postalCode: '', country: 'Pakistan',
    paymentMethod: 'cod', notes: '',
  });

  const [paymentDetails, setPaymentDetails] = useState({
    senderName: '', senderAccount: '', transactionId: '', receiptImage: ''
  });

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const subtotal = getSubtotal();
  const shipping = 300;
  const discount = appliedCoupon
    ? appliedCoupon.discountType === 'percentage'
      ? (subtotal * appliedCoupon.discountValue) / 100
      : appliedCoupon.discountValue
    : 0;
  const total = Math.max(0, subtotal + shipping - discount);
  const money = (n) => 'PKR ' + Number(n).toLocaleString('en-PK');

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    try {
      const c = await publicShopApi.validateCoupon(couponCode.trim());
      setAppliedCoupon(c);
      toast.success('Coupon applied successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid coupon code or expired');
    }
  };

  const paymentInfo = PAYMENT_INFO[form.paymentMethod];
  const requiresReceipt = ['easypaisa', 'jazzcash', 'bank_transfer'].includes(form.paymentMethod);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) return toast.error('Your checkout session is empty');

    if (requiresReceipt) {
      if (!paymentDetails.receiptImage) {
        return toast.error('Payment receipt image is required for manual verification transfers!');
      }
      if (!paymentDetails.senderName) {
        return toast.error('Sender display name is required.');
      }
    }

    setSubmitting(true);
    try {
      const payload = {
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        shippingAddress: {
          street: form.street, city: form.city, province: form.province,
          postalCode: form.postalCode, country: form.country,
        },
        items,
        shippingCost: shipping,
        couponCode: appliedCoupon?.code,
        discount,
        paymentMethod: form.paymentMethod,
        paymentDetails: requiresReceipt ? { ...paymentDetails, paidAt: new Date() } : undefined,
        notes: form.notes,
      };

      const order = await publicOrdersApi.create(payload);
      setSuccess(order);
      clearCart();
      toast.success('Order placed successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to check out order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-slate-50 py-20 px-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-12 text-center max-w-md space-y-5 shadow-xl border">
          <ShoppingBag size={64} className="mx-auto text-slate-300" />
          <h2 className="text-2xl font-black text-slate-800">Your Cart is Empty</h2>
          <p className="text-slate-500">Go back and select delicious dry fruits and exquisite tours!</p>
          <button onClick={() => navigate('/shop')} className="bg-amber-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-amber-700 transition">Browse Marketplace</button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 flex items-center justify-center">
        <div className="bg-white rounded-3xl p-8 md:p-10 text-center max-w-lg space-y-6 shadow-xl border border-emerald-100">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Order Placed Successfully!</h2>
            <p className="text-slate-600">Order Tracking Number: <strong className="text-amber-700 text-lg">{success.orderNumber}</strong></p>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl text-left text-sm space-y-2.5 border">
            <div className="flex justify-between"><span className="text-slate-500">Selected Gateway:</span><span className="font-semibold capitalize">{PAYMENT_INFO[success.paymentMethod]?.label || success.paymentMethod}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Payment Status:</span>
              <span className={`font-bold capitalize ${success.paymentStatus === 'pending_verification' ? 'text-amber-600 animate-pulse' : 'text-emerald-700'}`}>
                {success.paymentStatus === 'pending_verification' ? 'Awaiting Verification' : success.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between text-base font-black pt-2 border-t"><span>Grand Total Paid:</span><span className="text-amber-700">{money(success.totalAmount)}</span></div>
          </div>
          {success.paymentStatus === 'pending_verification' && (
            <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3.5 leading-relaxed">
              Our accounts verification team will verify your transaction voucher within 2 to 4 hours. You will receive progress notifications via WhatsApp or Email.
            </p>
          )}
          <button onClick={() => navigate('/shop')} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition">Continue Shopping</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-black text-slate-900">Billing & Shipping</h1>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-800 text-lg border-b pb-2">Customer Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required placeholder="Your Full Name *" value={form.customerName} onChange={e => setForm({...form, customerName: e.target.value})} className="border rounded-xl p-3 bg-slate-50/60 focus:bg-white focus:ring-1 focus:ring-amber-500 transition outline-none" />
              <input required placeholder="Contact Number (WhatsApp Recommended) *" value={form.customerPhone} onChange={e => setForm({...form, customerPhone: e.target.value})} className="border rounded-xl p-3 bg-slate-50/60 focus:bg-white focus:ring-1 focus:ring-amber-500 transition outline-none" />
              <input required type="email" placeholder="Email Address (for order receipt) *" value={form.customerEmail} onChange={e => setForm({...form, customerEmail: e.target.value})} className="md:col-span-2 border rounded-xl p-3 bg-slate-50/60 focus:bg-white focus:ring-1 focus:ring-amber-500 transition outline-none" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
            <h2 className="font-bold text-slate-800 text-lg border-b pb-2">Shipping Destination</h2>
            <input required placeholder="Street Address *" value={form.street} onChange={e => setForm({...form, street: e.target.value})} className="w-full border rounded-xl p-3 bg-slate-50/60 focus:bg-white focus:ring-1 focus:ring-amber-500 transition outline-none" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input required placeholder="City *" value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="border rounded-xl p-3 bg-slate-50/60 focus:bg-white focus:ring-1 focus:ring-amber-500 transition outline-none" />
              <select value={form.province} onChange={e => setForm({...form, province: e.target.value})} className="border rounded-xl p-3 bg-slate-50/60 focus:bg-white transition outline-none">
                <option>Punjab</option><option>Sindh</option><option>KPK</option><option>Balochistan</option>
                <option>Gilgit-Baltistan</option><option>Islamabad</option><option>Azad Kashmir</option>
              </select>
              <input placeholder="Postal Code" value={form.postalCode} onChange={e => setForm({...form, postalCode: e.target.value})} className="border rounded-xl p-3 bg-slate-50/60 focus:bg-white focus:ring-1 focus:ring-amber-500 transition outline-none" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
            <h2 className="font-bold text-slate-800 text-lg border-b pb-2">Select Payment Method</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(PAYMENT_INFO).map(([key, info]) => {
                const Icon = info.icon;
                return (
                  <label key={key} className={`border-2 rounded-2xl p-4 cursor-pointer text-center transition flex flex-col items-center justify-center ${form.paymentMethod === key ? 'border-amber-600 bg-amber-50/60' : 'border-slate-200 hover:border-slate-300'}`}>
                    <input type="radio" name="paymentMethod" value={key} checked={form.paymentMethod === key} onChange={e => setForm({...form, paymentMethod: e.target.value})} className="hidden" />
                    <div className={`${info.color} w-11 h-11 rounded-xl flex items-center justify-center text-white mb-2.5`}>
                      <Icon size={22} />
                    </div>
                    <div className="text-xs font-black text-slate-700 leading-tight">{info.label}</div>
                  </label>
                );
              })}
            </div>

            {paymentInfo && (
              <div className="bg-slate-950 text-white rounded-2xl p-5 space-y-4 shadow-inner">
                <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
                  <paymentInfo.icon size={22} className="text-amber-400" />
                  <h3 className="font-bold text-base">Pay via {paymentInfo.label} Gateway</h3>
                </div>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">{paymentInfo.instructions}</p>

                {requiresReceipt && (
                  <div className="bg-slate-900 rounded-xl p-4 space-y-3 border border-slate-800">
                    {paymentInfo.bank && (
                      <div className="flex justify-between text-xs md:text-sm"><span className="text-slate-400">Beneficiary Bank:</span><span className="font-bold text-amber-300">{paymentInfo.bank}</span></div>
                    )}
                    <div className="flex justify-between text-xs md:text-sm"><span className="text-slate-400">Account Title:</span><span className="font-bold text-white">{paymentInfo.accountName}</span></div>
                    <div className="flex justify-between items-center text-xs md:text-sm">
                      <span className="text-slate-400">{paymentInfo.bank ? 'Account IBAN:' : 'Number/Wallet:'}</span>
                      <div className="flex items-center gap-2">
                        <code className="font-mono font-bold text-amber-300 bg-slate-800 px-2 py-1 rounded border border-slate-700 text-xs md:text-sm">{paymentInfo.accountNumber}</code>
                        <button 
                          type="button" 
                          onClick={() => { navigator.clipboard.writeText(paymentInfo.accountNumber); toast.success('Account copied to clipboard!'); }} 
                          className="text-xs bg-amber-600 hover:bg-amber-700 text-white px-2 py-1 rounded font-bold"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between pt-2.5 border-t border-slate-800 text-xs md:text-sm">
                      <span className="text-slate-400">Total Payable Amount:</span>
                      <span className="font-black text-emerald-400 text-lg">{money(total)}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {requiresReceipt && (
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-bold text-slate-800 text-base">Upload Transfer Receipt Proof</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required placeholder="Account Sender Name *" value={paymentDetails.senderName} onChange={e => setPaymentDetails({...paymentDetails, senderName: e.target.value})} className="border rounded-xl p-3 bg-slate-50/60" />
                  <input placeholder={form.paymentMethod === 'bank_transfer' ? 'Sender Account IBAN/No.' : 'Sender Wallet Phone No.'} value={paymentDetails.senderAccount} onChange={e => setPaymentDetails({...paymentDetails, senderAccount: e.target.value})} className="border rounded-xl p-3 bg-slate-50/60" />
                  <input placeholder="Transaction ID (e.g., TRX ID / ID Reference No.)" value={paymentDetails.transactionId} onChange={e => setPaymentDetails({...paymentDetails, transactionId: e.target.value})} className="md:col-span-2 border rounded-xl p-3 bg-slate-50/60" />
                </div>
                <ReceiptUploader value={paymentDetails.receiptImage} onChange={url => setPaymentDetails({...paymentDetails, receiptImage: url})} />
              </div>
            )}

            <textarea placeholder="Order delivery instructions or notes (optional)" value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} rows={3} className="w-full border rounded-xl p-3 bg-slate-50/60 focus:bg-white focus:ring-1 focus:ring-amber-500 transition outline-none" />
          </div>
        </form>

        <aside className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5 h-fit sticky top-6">
          <h2 className="font-black text-slate-900 text-lg border-b pb-2">Order Summary</h2>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {items.map(item => (
              <div key={item.productId} className="flex gap-3 text-sm">
                <img src={item.image} className="w-14 h-14 rounded-xl object-cover shrink-0 border bg-slate-50" alt="" />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-950 truncate">{item.name}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{item.quantity} x {money(item.price)}</div>
                </div>
                <div className="font-extrabold text-slate-900 self-center">{money(item.price * item.quantity)}</div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t space-y-2.5">
            <label className="flex items-center gap-1.5 text-xs font-bold text-slate-700 uppercase tracking-wide"><Tag size={14} className="text-emerald-600" /> Apply Coupon</label>
            {appliedCoupon ? (
              <div className="flex justify-between bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-sm">
                <span className="font-bold text-emerald-700">✓ {appliedCoupon.code} Applied</span>
                <button type="button" onClick={() => { setAppliedCoupon(null); setCouponCode(''); }} className="text-rose-600 hover:text-rose-700"><X size={16} /></button>
              </div>
            ) : (
              <div className="flex gap-2">
                <input placeholder="GTP2026" value={couponCode} onChange={e => setCouponCode(e.target.value.toUpperCase())} className="flex-1 border rounded-xl p-2.5 text-sm uppercase font-semibold focus:ring-1 focus:ring-emerald-500 outline-none" />
                <button type="button" onClick={applyCoupon} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 rounded-xl text-xs font-bold transition">Apply</button>
              </div>
            )}
          </div>

          <div className="pt-4 border-t space-y-2.5 text-sm">
            <div className="flex justify-between text-slate-650"><span>Subtotal</span><span>{money(subtotal)}</span></div>
            <div className="flex justify-between text-slate-650"><span>Shipping Charges</span><span>{money(shipping)}</span></div>
            {discount > 0 && <div className="flex justify-between text-emerald-600 font-semibold"><span>Discount Saved</span><span>- {money(discount)}</span></div>}
            <div className="flex justify-between text-lg font-black pt-3 border-t text-slate-900"><span>Grand Total</span><span className="text-amber-700">{money(total)}</span></div>
          </div>

          <button 
            onClick={handleSubmit} 
            disabled={submitting} 
            className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-extrabold py-4 rounded-2xl shadow-lg shadow-amber-600/20 hover:shadow-amber-600/30 transition-all duration-150"
          >
            {submitting ? 'Placing Order...' : requiresReceipt ? 'Submit Transfer & Order' : 'Place Cash on Delivery'}
          </button>
        </aside>
      </div>
    </div>
  );
}