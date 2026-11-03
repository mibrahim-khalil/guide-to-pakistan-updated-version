import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Save, Loader2, Building2, CreditCard, ShoppingBag, Share2, Globe } from 'lucide-react';
import { settingsApi } from '../api/settingsApi';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    siteName: 'Guide to Pakistan',
    siteTagline: 'Discover the Soul of Pakistan',
    contactEmail: 'hello@guidetopakistan.com',
    contactPhone: '+92 326 1487 487',
    whatsappNumber: '+92 326 1487 487',
    officeAddress: 'Office C03, Plaza 64, 7 Bahria Expy, Phase 8, Rawalpindi, 46000',

    easypaisaTitle: 'Guide to Pakistan',
    easypaisaNumber: '0300-1234567',
    jazzcashTitle: 'Guide to Pakistan',
    jazzcashNumber: '0321-9876543',
    bankName: 'Meezan Bank Ltd.',
    bankAccountTitle: 'Guide to Pakistan Private Limited',
    bankIban: 'PK36 MEZN 0001 2345 6789 0123',

    defaultShippingCost: 300,
    freeShippingThreshold: 10000,
    currencySymbol: 'PKR',

    facebookUrl: 'https://facebook.com',
    instagramUrl: 'https://instagram.com',
    twitterUrl: 'https://twitter.com',
  });

  useEffect(() => {
    settingsApi.get()
      .then(data => {
        if (data) setForm(prev => ({ ...prev, ...data }));
      })
      .catch(() => toast.error('Failed to load settings'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await settingsApi.update(form);
      toast.success('System settings saved successfully!');
    } catch (err) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 size={32} className="animate-spin mx-auto text-emerald-600" />
      </div>
    );
  }

  const tabs = [
    { id: 'general', label: 'General & Contact', icon: Building2 },
    { id: 'payment', label: 'Payment Gateways', icon: CreditCard },
    { id: 'shipping', label: 'Store & Shipping', icon: ShoppingBag },
    { id: 'social', label: 'Social Media', icon: Share2 },
  ];

  return (
    <div className="max-w-5xl space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure global platform details, payment receiver accounts, and shipping parameters.</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon size={16} /> {tab.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
        
        {/* TAB 1: GENERAL & CONTACT */}
        {activeTab === 'general' && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-lg font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
              <Globe size={18} className="text-emerald-600" /> General Info & Contact Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Site Title</label>
                <input
                  value={form.siteName || ''}
                  onChange={e => setForm({ ...form, siteName: e.target.value })}
                  className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Site Tagline</label>
                <input
                  value={form.siteTagline || ''}
                  onChange={e => setForm({ ...form, siteTagline: e.target.value })}
                  className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={form.contactEmail || ''}
                  onChange={e => setForm({ ...form, contactEmail: e.target.value })}
                  className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Contact Phone</label>
                <input
                  value={form.contactPhone || ''}
                  onChange={e => setForm({ ...form, contactPhone: e.target.value })}
                  className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">WhatsApp Number</label>
                <input
                  value={form.whatsappNumber || ''}
                  onChange={e => setForm({ ...form, whatsappNumber: e.target.value })}
                  className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Physical Office Address</label>
              <textarea
                rows={3}
                value={form.officeAddress || ''}
                onChange={e => setForm({ ...form, officeAddress: e.target.value })}
                className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white text-sm"
              />
            </div>
          </div>
        )}

        {/* TAB 2: PAYMENT GATEWAYS */}
        {activeTab === 'payment' && (
          <div className="space-y-6 animate-fadeIn">
            <h2 className="text-lg font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
              <CreditCard size={18} className="text-amber-600" /> Customer Receiver Payment Accounts
            </h2>

            {/* Easypaisa */}
            <div className="bg-emerald-50/50 border border-emerald-200 p-5 rounded-2xl space-y-3">
              <h3 className="font-bold text-emerald-900 text-sm">Easypaisa Wallet Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Account Title</label>
                  <input
                    value={form.easypaisaTitle || ''}
                    onChange={e => setForm({ ...form, easypaisaTitle: e.target.value })}
                    className="w-full border rounded-xl p-3 bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Mobile Account Number</label>
                  <input
                    value={form.easypaisaNumber || ''}
                    onChange={e => setForm({ ...form, easypaisaNumber: e.target.value })}
                    className="w-full border rounded-xl p-3 bg-white text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            {/* JazzCash */}
            <div className="bg-amber-50/50 border border-amber-200 p-5 rounded-2xl space-y-3">
              <h3 className="font-bold text-amber-900 text-sm">JazzCash Wallet Info</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Account Title</label>
                  <input
                    value={form.jazzcashTitle || ''}
                    onChange={e => setForm({ ...form, jazzcashTitle: e.target.value })}
                    className="w-full border rounded-xl p-3 bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Mobile Account Number</label>
                  <input
                    value={form.jazzcashNumber || ''}
                    onChange={e => setForm({ ...form, jazzcashNumber: e.target.value })}
                    className="w-full border rounded-xl p-3 bg-white text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Bank Transfer */}
            <div className="bg-blue-50/50 border border-blue-200 p-5 rounded-2xl space-y-3">
              <h3 className="font-bold text-blue-900 text-sm">Bank Wire Account Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Bank Name</label>
                  <input
                    value={form.bankName || ''}
                    onChange={e => setForm({ ...form, bankName: e.target.value })}
                    className="w-full border rounded-xl p-3 bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Account Title</label>
                  <input
                    value={form.bankAccountTitle || ''}
                    onChange={e => setForm({ ...form, bankAccountTitle: e.target.value })}
                    className="w-full border rounded-xl p-3 bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">IBAN Number</label>
                  <input
                    value={form.bankIban || ''}
                    onChange={e => setForm({ ...form, bankIban: e.target.value })}
                    className="w-full border rounded-xl p-3 bg-white text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SHIPPING & STORE */}
        {activeTab === 'shipping' && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-lg font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
              <ShoppingBag size={18} className="text-purple-600" /> Shipping & Logistics Rules
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Default Flat Shipping Fee (PKR)</label>
                <input
                  type="number"
                  value={form.defaultShippingCost || 300}
                  onChange={e => setForm({ ...form, defaultShippingCost: Number(e.target.value) })}
                  className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Free Shipping Threshold Amount (PKR)</label>
                <input
                  type="number"
                  value={form.freeShippingThreshold || 10000}
                  onChange={e => setForm({ ...form, freeShippingThreshold: Number(e.target.value) })}
                  className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Display Currency Code</label>
                <input
                  value={form.currencySymbol || 'PKR'}
                  onChange={e => setForm({ ...form, currencySymbol: e.target.value })}
                  className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white text-sm font-bold uppercase"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SOCIAL MEDIA */}
        {activeTab === 'social' && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-lg font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
              <Share2 size={18} className="text-blue-600" /> Social Platform Links
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Facebook Profile URL</label>
                <input
                  value={form.facebookUrl || ''}
                  onChange={e => setForm({ ...form, facebookUrl: e.target.value })}
                  className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Instagram Handle URL</label>
                <input
                  value={form.instagramUrl || ''}
                  onChange={e => setForm({ ...form, instagramUrl: e.target.value })}
                  className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Twitter / X URL</label>
                <input
                  value={form.twitterUrl || ''}
                  onChange={e => setForm({ ...form, twitterUrl: e.target.value })}
                  className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white text-sm"
                />
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 text-sm disabled:opacity-60"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save All System Settings
        </button>
      </form>
    </div>
  );
}