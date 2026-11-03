import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Save, Loader2 } from 'lucide-react';
import { pagesApi } from '../../pages/api/pagesApi';

export default function HomeContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    heroTitle: 'Discover the Beauty of Pakistan',
    heroSubtitle: 'Join us on an unforgettable journey through majestic mountains and rich culture.',
    heroBanner: 'https://images.unsplash.com/photo-1627896157734-4d7d427282eb?auto=format&fit=crop&q=80&w=2000',
    aboutSnippet: 'Guide to Pakistan is your premier travel partner offering curated tours, authentic products, and unforgettable experiences across Pakistan.',
  });

  useEffect(() => {
    pagesApi.get('home')
      .then(res => {
        if (res.content && Object.keys(res.content).length > 0) {
          setContent(res.content);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await pagesApi.update('home', content);
      toast.success('Home Content updated successfully!');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to save home content';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 className="animate-spin mx-auto text-emerald-600" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Home Content CMS</h1>
        <p className="text-sm text-slate-500 mt-1">Manage hero titles, subtitles, banner images, and welcome text.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2">Hero Banner Section</h2>
          
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Main Hero Title</label>
            <input 
              required 
              value={content.heroTitle || ''} 
              onChange={e => setContent({...content, heroTitle: e.target.value})} 
              className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-emerald-500" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Hero Subtitle</label>
            <textarea 
              required 
              value={content.heroSubtitle || ''} 
              onChange={e => setContent({...content, heroSubtitle: e.target.value})} 
              rows={2} 
              className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-emerald-500" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Hero Banner Image URL</label>
            <div className="flex gap-3">
              <input 
                required 
                value={content.heroBanner || ''} 
                onChange={e => setContent({...content, heroBanner: e.target.value})} 
                placeholder="https://..." 
                className="flex-1 border rounded-xl p-3 bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-emerald-500 text-sm" 
              />
              {content.heroBanner && (
                <img src={content.heroBanner} alt="preview" className="w-12 h-12 rounded-xl object-cover border" />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 border-b pb-2">Welcome Snippet</h2>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Short About Us Text</label>
            <textarea 
              value={content.aboutSnippet || ''} 
              onChange={e => setContent({...content, aboutSnippet: e.target.value})} 
              rows={4} 
              className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-emerald-500" 
            />
          </div>
        </div>

        <button 
          type="submit" 
          disabled={saving} 
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg transition"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save Home Content
        </button>
      </form>
    </div>
  );
}