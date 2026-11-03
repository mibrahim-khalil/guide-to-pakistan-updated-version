import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Save, Loader2 } from 'lucide-react';
import { pagesApi } from '../../pages/api/pagesApi';

export default function AboutContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    title: 'About Guide to Pakistan',
    story: 'We started with a simple mission: to show the incredible beauty, hospitality, and culture of Pakistan to the world.',
    mission: 'To provide world-class tourism services and authentic cultural products.',
    vision: 'To make Pakistan one of the top travel destinations in the world.',
    bannerImage: 'https://images.unsplash.com/photo-1588665045100-344cb893a404?auto=format&fit=crop&q=80'
  });

  useEffect(() => {
    pagesApi.get('about')
      .then(res => {
        if (res.content && Object.keys(res.content).length > 0) {
          setContent(res.content);
        }
      })
      .catch(() => toast.error('Failed to load page content'))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await pagesApi.update('about', content);
      toast.success('About Content updated successfully!');
    } catch (err) {
      toast.error('Failed to save about content');
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
        <h1 className="text-2xl font-bold text-slate-900">About Content CMS</h1>
        <p className="text-sm text-slate-500 mt-1">Manage story, mission, vision, and main banner image for the About page.</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Page Main Title</label>
          <input 
            value={content.title || ''} 
            onChange={e => setContent({...content, title: e.target.value})} 
            className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-emerald-500" 
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Banner Image URL</label>
          <div className="flex gap-3">
            <input 
              value={content.bannerImage || ''} 
              onChange={e => setContent({...content, bannerImage: e.target.value})} 
              className="flex-1 border rounded-xl p-3 bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-emerald-500 text-sm" 
            />
            {content.bannerImage && (
              <img src={content.bannerImage} alt="preview" className="w-12 h-12 rounded-xl object-cover border" />
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Our Story</label>
          <textarea 
            value={content.story || ''} 
            onChange={e => setContent({...content, story: e.target.value})} 
            rows={5} 
            className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-emerald-500" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Our Mission</label>
            <textarea 
              value={content.mission || ''} 
              onChange={e => setContent({...content, mission: e.target.value})} 
              rows={4} 
              className="w-full border rounded-xl p-3 bg-slate-50 focus:bg-white outline-none focus:ring-1 focus:ring-emerald-500" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Our Vision</label>
            <textarea 
              value={content.vision || ''} 
              onChange={e => setContent({...content, vision: e.target.value})} 
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
          Save About Content
        </button>
      </form>
    </div>
  );
}