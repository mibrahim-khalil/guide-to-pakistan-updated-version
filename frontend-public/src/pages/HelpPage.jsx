import { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, HelpCircle, MessageSquare, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { publicInquiriesApi } from '../shared/api/publicInquiriesApi';

export default function HelpPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSuccessSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const faqs = [
    {
      q: 'How do I book a tour with Guide to Pakistan?',
      a: 'You can browse our Tours page, select your preferred itinerary, and click "Book Now". You can also send us a message through this form for custom private tours.'
    },
    {
      q: 'What payment methods do you accept for Shop products?',
      a: 'We accept Cash on Delivery (COD), Easypaisa, JazzCash, and direct Bank Transfer with instant receipt verification.'
    },
    {
      q: 'Can I cancel or reschedule my tour booking?',
      a: 'Yes, cancellations made at least 7 days before departure are eligible for a full refund or free date rescheduling.'
    },
    {
      q: 'Where do your shop dry fruits and handicrafts come from?',
      a: 'All our products are 100% authentic and ethically sourced directly from local farmers and artisans in Hunza, Skardu, Gilgit, and Kashmir.'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      return toast.error('Please fill in all required fields.');
    }

    setSubmitting(true);
    try {
      await publicInquiriesApi.create(form);
      setSuccessSubmitted(true);
      toast.success('Inquiry submitted successfully!');
      setForm({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-10">
      {/* Banner */}
      <section className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full border border-emerald-500/30 uppercase tracking-widest">
            <HelpCircle size={14} /> Help & Support Center
          </span>
          <h1 className="text-3xl md:text-5xl font-black">How Can We Help You?</h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Have questions about tour packages, shop orders, or custom itineraries? Send us a message and our support team will respond promptly.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900">Get in Touch</h2>
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center shrink-0">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Office Address</h3>
                <p className="text-slate-600 text-sm mt-1 leading-relaxed">
                  Office C03, Plaza 64, 7 Bahria Expy, Phase 8, Rawalpindi, 46000, Pakistan
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center shrink-0">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Phone & WhatsApp</h3>
                <p className="text-slate-600 text-sm mt-1">+92 326 1487 487</p>
                <p className="text-xs text-slate-400 mt-0.5">Mon - Sat (9:00 AM - 8:00 PM)</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center shrink-0">
                <Mail size={22} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Email Us</h3>
                <p className="text-slate-600 text-sm mt-1">hello@guidetopakistan.com</p>
                <p className="text-xs text-slate-400 mt-0.5">We reply within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact / Inquiry Form */}
        <div className="lg:col-span-2">
          <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase text-emerald-600 tracking-widest">Send Message</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-1">Submit an Inquiry</h2>
              <p className="text-slate-500 text-sm mt-1">Fill out the form below and our team will get back to you shortly.</p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-xl font-bold text-emerald-900">Inquiry Received!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you for reaching out to Guide to Pakistan. Our team has received your message and will contact you via email/phone soon.
                </p>
                <button
                  type="button"
                  onClick={() => setSuccessSubmitted(false)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ali Khan"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-3 bg-slate-50/60 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. ali@example.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-3 bg-slate-50/60 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Phone Number (Optional)</label>
                    <input
                      type="text"
                      placeholder="+92 300 1234567"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-3 bg-slate-50/60 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Subject</label>
                    <select
                      value={form.subject}
                      onChange={e => setForm({ ...form, subject: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl p-3 bg-slate-50/60 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none text-sm font-medium"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Tour Booking Help">Tour Booking Help</option>
                      <option value="Custom Private Tour">Custom Private Tour</option>
                      <option value="Shop Product Inquiry">Shop Product Inquiry</option>
                      <option value="Feedback / Complaint">Feedback / Complaint</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Write your question or request in detail..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl p-3 bg-slate-50/60 focus:bg-white focus:ring-1 focus:ring-emerald-500 outline-none text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <section className="max-w-5xl mx-auto px-4 mt-20 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase text-amber-600 tracking-widest">FAQ</span>
          <h2 className="text-3xl font-black text-slate-900">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                <HelpCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                {faq.q}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}