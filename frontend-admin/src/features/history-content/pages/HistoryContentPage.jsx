import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Save, Loader2, Plus, Trash2, GripVertical } from 'lucide-react';
import { pagesApi } from '../../pages/api/pagesApi';

const DEFAULT_CONTENT = {
  heroBadge: 'PAST • PEOPLE • CIVILIZATIONS',
  heroTitleLine1: 'HISTORY',
  heroTitleLine2: 'OF',
  heroTitleLine3: 'PAKISTAN',
  heroSubtitle:
    'Journey through thousands of years of civilizations, empires, cultures, movements, and defining moments that shaped the land we know today as Pakistan.',
  heroBanner:
    'https://images.unsplash.com/photo-1627896157734-4d7d427282eb?auto=format&fit=crop&q=80&w=2000',
  introEyebrow: 'HISTORY OF PAKISTAN',
  introTitle: 'Thousands of years. One evolving story.',
  introText:
    'Explore the civilizations, kingdoms, empires, political movements, and social transformations that shaped the territories and communities of present-day Pakistan.',
  eras: [
    {
      id: '1',
      number: '01',
      title: 'Indus Valley Civilization',
      period: 'c. 3300 – 1300 BCE',
      summary:
        'One of the world’s earliest urban civilizations, with advanced cities like Mohenjo-daro and Harappa.',
      body:
        'The Indus Valley Civilization developed sophisticated urban planning, drainage systems, trade networks, and craftsmanship across the Indus basin.',
      image:
        'https://images.unsplash.com/photo-1588665045100-344cb893a404?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '2',
      number: '02',
      title: 'Gandhara & Ancient Kingdoms',
      period: 'c. 1500 BCE – 500 CE',
      summary: 'A crossroads of cultures, faiths, and empires across the northwest.',
      body:
        'Gandhara became a major center of Buddhist art and learning, while successive kingdoms and empires left lasting cultural and political imprints.',
      image:
        'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '3',
      number: '03',
      title: 'Islamic Sultanates & Empires',
      period: 'c. 700 – 1700 CE',
      summary: 'Arrival of Islam and the rise of powerful regional dynasties.',
      body:
        'From early Arab arrivals to later sultanates and Mughal influence, this era reshaped faith, architecture, language, and governance across the region.',
      image:
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '4',
      number: '04',
      title: 'Colonial Era',
      period: '18th – mid 20th century',
      summary: 'British colonial rule and the transformation of society and politics.',
      body:
        'Colonial administration, railways, education systems, and political movements dramatically altered the subcontinent’s trajectory.',
      image:
        'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '5',
      number: '05',
      title: 'Independence Movement',
      period: '1900s – 1947',
      summary: 'The struggle for self-determination and the birth of a new nation.',
      body:
        'Political mobilization, leadership, and mass movements culminated in the creation of Pakistan in 1947.',
      image:
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=1200',
    },
    {
      id: '6',
      number: '06',
      title: 'Modern Pakistan',
      period: '1947 – Present',
      summary: 'Nation-building, culture, resilience, and contemporary identity.',
      body:
        'Pakistan’s modern story includes constitutional development, cultural renaissance, regional diversity, and global engagement.',
      image:
        'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200',
    },
  ],
};

export default function HistoryContentPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState(DEFAULT_CONTENT);

  useEffect(() => {
    pagesApi
      .get('history')
      .then((res) => {
        if (res?.content && Object.keys(res.content).length > 0) {
          setContent({ ...DEFAULT_CONTENT, ...res.content, eras: res.content.eras?.length ? res.content.eras : DEFAULT_CONTENT.eras });
        }
      })
      .catch(() => toast.error('Failed to load history content'))
      .finally(() => setLoading(false));
  }, []);

  const updateField = (key, value) => setContent((prev) => ({ ...prev, [key]: value }));

  const updateEra = (index, key, value) => {
    setContent((prev) => {
      const eras = [...(prev.eras || [])];
      eras[index] = { ...eras[index], [key]: value };
      return { ...prev, eras };
    });
  };

  const addEra = () => {
    const n = (content.eras?.length || 0) + 1;
    setContent((prev) => ({
      ...prev,
      eras: [
        ...(prev.eras || []),
        {
          id: String(Date.now()),
          number: String(n).padStart(2, '0'),
          title: 'New Era Title',
          period: 'Period',
          summary: 'Short summary...',
          body: 'Full description...',
          image: '',
        },
      ],
    }));
  };

  const removeEra = (index) => {
    if (!confirm('Remove this era section?')) return;
    setContent((prev) => ({
      ...prev,
      eras: (prev.eras || []).filter((_, i) => i !== index).map((e, i) => ({
        ...e,
        number: String(i + 1).padStart(2, '0'),
      })),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await pagesApi.update('history', content);
      toast.success('History page content saved!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save history content');
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
    <div className="max-w-5xl space-y-6 pb-16">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">History Page CMS</h1>
        <p className="text-sm text-slate-500 mt-1">
          Edit hero text, intro section, and timeline eras. Public design stays the same.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hero */}
        <div className="bg-white rounded-2xl border p-6 space-y-4 shadow-sm">
          <h2 className="text-lg font-bold border-b pb-2">Hero Section</h2>
          <div>
            <label className="text-xs font-bold uppercase text-slate-600">Badge</label>
            <input className="w-full border rounded-xl p-3 bg-slate-50 mt-1" value={content.heroBadge || ''} onChange={(e) => updateField('heroBadge', e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-bold uppercase text-slate-600">Title Line 1</label>
              <input className="w-full border rounded-xl p-3 bg-slate-50 mt-1" value={content.heroTitleLine1 || ''} onChange={(e) => updateField('heroTitleLine1', e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-600">Title Line 2</label>
              <input className="w-full border rounded-xl p-3 bg-slate-50 mt-1" value={content.heroTitleLine2 || ''} onChange={(e) => updateField('heroTitleLine2', e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-600">Title Line 3</label>
              <input className="w-full border rounded-xl p-3 bg-slate-50 mt-1" value={content.heroTitleLine3 || ''} onChange={(e) => updateField('heroTitleLine3', e.target.value)} />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-slate-600">Hero Subtitle</label>
            <textarea rows={3} className="w-full border rounded-xl p-3 bg-slate-50 mt-1" value={content.heroSubtitle || ''} onChange={(e) => updateField('heroSubtitle', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-slate-600">Hero Banner Image URL</label>
            <div className="flex gap-3 mt-1">
              <input className="flex-1 border rounded-xl p-3 bg-slate-50 text-sm" value={content.heroBanner || ''} onChange={(e) => updateField('heroBanner', e.target.value)} />
              {content.heroBanner && <img src={content.heroBanner} alt="" className="w-14 h-14 rounded-xl object-cover border" />}
            </div>
          </div>
        </div>

        {/* Intro */}
        <div className="bg-white rounded-2xl border p-6 space-y-4 shadow-sm">
          <h2 className="text-lg font-bold border-b pb-2">Intro Section</h2>
          <div>
            <label className="text-xs font-bold uppercase text-slate-600">Eyebrow</label>
            <input className="w-full border rounded-xl p-3 bg-slate-50 mt-1" value={content.introEyebrow || ''} onChange={(e) => updateField('introEyebrow', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-slate-600">Intro Title</label>
            <input className="w-full border rounded-xl p-3 bg-slate-50 mt-1" value={content.introTitle || ''} onChange={(e) => updateField('introTitle', e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-bold uppercase text-slate-600">Intro Text</label>
            <textarea rows={3} className="w-full border rounded-xl p-3 bg-slate-50 mt-1" value={content.introText || ''} onChange={(e) => updateField('introText', e.target.value)} />
          </div>
        </div>

        {/* Eras / Timeline */}
        <div className="bg-white rounded-2xl border p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b pb-2">
            <h2 className="text-lg font-bold">Timeline Eras</h2>
            <button type="button" onClick={addEra} className="inline-flex items-center gap-1.5 bg-slate-900 text-white text-xs font-bold px-3 py-2 rounded-xl">
              <Plus size={14} /> Add Era
            </button>
          </div>

          <div className="space-y-4">
            {(content.eras || []).map((era, index) => (
              <div key={era.id || index} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <GripVertical size={16} className="text-slate-400" />
                    Era {era.number || String(index + 1).padStart(2, '0')}
                  </div>
                  <button type="button" onClick={() => removeEra(index)} className="text-rose-600 hover:bg-rose-50 p-2 rounded-lg">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-bold uppercase text-slate-600">Number</label>
                    <input className="w-full border rounded-xl p-2.5 bg-white mt-1" value={era.number || ''} onChange={(e) => updateEra(index, 'number', e.target.value)} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold uppercase text-slate-600">Title</label>
                    <input className="w-full border rounded-xl p-2.5 bg-white mt-1" value={era.title || ''} onChange={(e) => updateEra(index, 'title', e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase text-slate-600">Period</label>
                  <input className="w-full border rounded-xl p-2.5 bg-white mt-1" value={era.period || ''} onChange={(e) => updateEra(index, 'period', e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-600">Short Summary</label>
                  <input className="w-full border rounded-xl p-2.5 bg-white mt-1" value={era.summary || ''} onChange={(e) => updateEra(index, 'summary', e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-600">Full Body Text</label>
                  <textarea rows={3} className="w-full border rounded-xl p-2.5 bg-white mt-1" value={era.body || ''} onChange={(e) => updateEra(index, 'body', e.target.value)} />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-600">Image URL</label>
                  <div className="flex gap-3 mt-1">
                    <input className="flex-1 border rounded-xl p-2.5 bg-white text-sm" value={era.image || ''} onChange={(e) => updateEra(index, 'image', e.target.value)} />
                    {era.image && <img src={era.image} alt="" className="w-12 h-12 rounded-lg object-cover border" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          Save History Content
        </button>
      </form>
    </div>
  );
}