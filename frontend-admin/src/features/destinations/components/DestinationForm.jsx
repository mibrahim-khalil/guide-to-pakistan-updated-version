import { useEffect, useState } from 'react'
import { MapPin, CloudSun, ShieldAlert, AlignLeft, Image as ImageIcon } from 'lucide-react'
import ImageUploader from '../../../shared/components/ImageUploader'

const REGIONS = [
  { slug: 'gilgit-baltistan', name: 'Gilgit-Baltistan' },
  { slug: 'khyber-pakhtunkhwa', name: 'Khyber Pakhtunkhwa' },
  { slug: 'punjab', name: 'Punjab' },
  { slug: 'sindh', name: 'Sindh' },
  { slug: 'balochistan', name: 'Balochistan' },
  { slug: 'islamabad', name: 'Islamabad Capital Territory' },
  { slug: 'kashmir', name: 'Azad Jammu & Kashmir' },
]

const empty = {
  name: '', slug: '', regionSlug: 'gilgit-baltistan', status: 'draft',
  hero: { category: 'Destination', risk: 'Low Risk', roadAccess: 'Normal', summary: '', image: '' },
  overview: {
    paragraphs: ['', ''], image: '',
    expandedContent: { 
      cuisine: { paragraphs: [''] }, 
      socialLife: { paragraphs: [''] },
      traditionalDish: { image: '' },
      socialImage: '' 
    }
  },
  weather: { baseTemperature: 20, condition: 'Clear' }
}

export default function DestinationForm({ initialValues, onSubmit, submitting }) {
  const [activeTab, setActiveTab] = useState('general')
  const [form, setForm] = useState(empty)

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...empty, ...initialValues,
        hero: { ...empty.hero, ...(initialValues.hero || {}) },
        overview: {
          ...empty.overview, ...(initialValues.overview || {}),
          expandedContent: { ...empty.overview.expandedContent, ...(initialValues.overview?.expandedContent || {}) }
        },
        weather: { ...empty.weather, ...(initialValues.weather || {}) }
      })
    }
  }, [initialValues])

  const setGeneral = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const setHero = (k, v) => setForm(p => ({ ...p, hero: { ...p.hero, [k]: v } }))
  const setOverview = (k, v) => setForm(p => ({ ...p, overview: { ...p.overview, [k]: v } }))
  const setOverviewExp = (cat, k, v) => setForm(p => ({
    ...p, overview: { ...p.overview, expandedContent: { ...p.overview.expandedContent, [cat]: { ...p.overview.expandedContent[cat], [k]: v } } }
  }))
  const setOverviewExpField = (k, v) => setForm(p => ({
    ...p, overview: { ...p.overview, expandedContent: { ...p.overview.expandedContent, [k]: v } }
  }))
  const setWeather = (k, v) => setForm(p => ({ ...p, weather: { ...p.weather, [k]: v } }))
  
  const setOverviewP = (idx, val) => setForm(p => {
    const arr = [...(p.overview.paragraphs || ['', ''])]
    arr[idx] = val
    return { ...p, overview: { ...p.overview, paragraphs: arr } }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const regionName = REGIONS.find(r => r.slug === form.regionSlug)?.name || form.regionSlug
    onSubmit({ ...form, regionName })
  }

  const tabs = [
    { id: 'general', label: 'General Info', icon: MapPin },
    { id: 'hero', label: 'Hero & Images', icon: ImageIcon },
    { id: 'overview', label: 'Cultural Overview', icon: AlignLeft },
    { id: 'weather', label: 'Weather & Status', icon: CloudSun },
  ]

  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-8 pb-10">
      
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 shrink-0">
        <div className="sticky top-20 space-y-2">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id} type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                  activeTab === tab.id ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon size={18} /> {tab.label}
              </button>
            )
          })}
          
          <div className="pt-8">
            <button type="submit" disabled={submitting} className="w-full rounded-xl bg-gray-900 hover:bg-black text-white px-4 py-3.5 text-sm font-semibold disabled:opacity-60 shadow-lg transition-transform active:scale-95">
              {submitting ? 'Saving to Database...' : 'Save Destination'}
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 min-h-[600px]">
          
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">General Information</h2>
                <p className="text-sm text-gray-500 mt-1">Basic details for URL mapping and categorization.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Place Name <span className="text-red-500">*</span></label>
                  <input required value={form.name} onChange={e => setGeneral('name', e.target.value)} className="w-full rounded-xl border-gray-300 px-4 py-3 border focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-shadow bg-gray-50 hover:bg-white focus:bg-white" placeholder="e.g. Passu Cones" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Region <span className="text-red-500">*</span></label>
                  <select value={form.regionSlug} onChange={e => setGeneral('regionSlug', e.target.value)} className="w-full rounded-xl border-gray-300 px-4 py-3 border outline-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-shadow cursor-pointer">
                    {REGIONS.map(r => <option key={r.slug} value={r.slug}>{r.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">URL Slug</label>
                  <input value={form.slug} onChange={e => setGeneral('slug', e.target.value)} className="w-full rounded-xl border-gray-200 px-4 py-3 border bg-gray-100 outline-none text-gray-500" placeholder="Auto-generated if left blank" />
                  <p className="text-xs text-gray-400 mt-2">Leave blank to auto-generate from Place Name.</p>
                </div>
                <div className="col-span-1 md:col-span-2 pt-4 border-t border-gray-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Publish Status</label>
                  <select value={form.status} onChange={e => setGeneral('status', e.target.value)} className="w-full md:w-1/2 rounded-xl border-gray-300 px-4 py-3 border outline-none bg-gray-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 cursor-pointer">
                    <option value="published">Published (Visible on site)</option>
                    <option value="draft">Draft (Hidden)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Hero & Media</h2>
                <p className="text-sm text-gray-500 mt-1">Upload the main imagery for this destination.</p>
              </div>
              
              <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100">
                <ImageUploader 
                  label="Main Hero Image" 
                  hint="This appears at the very top of the place page. Use a high-quality landscape photo."
                  value={form.hero.image} 
                  onChange={url => setHero('image', url)} 
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Hero Summary (Subtitle)</label>
                <textarea rows={3} value={form.hero.summary} onChange={e => setHero('summary', e.target.value)} className="w-full rounded-xl border-gray-300 px-4 py-3 border focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none bg-gray-50 transition-shadow" placeholder="A short, catchy description displayed over the hero image..." />
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <div className="space-y-10 animate-in fade-in zoom-in-95 duration-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Cultural & Social Overview</h2>
                <p className="text-sm text-gray-500 mt-1">The detailed textual content and inline images for the place page.</p>
              </div>

              {/* Main Overview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800">1. Main Overview</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Paragraph 1</label>
                      <textarea rows={4} value={form.overview.paragraphs[0] || ''} onChange={e => setOverviewP(0, e.target.value)} className="w-full rounded-xl border-gray-300 px-4 py-3 border focus:ring-2 focus:ring-emerald-500 bg-gray-50 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Paragraph 2</label>
                      <textarea rows={4} value={form.overview.paragraphs[1] || ''} onChange={e => setOverviewP(1, e.target.value)} className="w-full rounded-xl border-gray-300 px-4 py-3 border focus:ring-2 focus:ring-emerald-500 bg-gray-50 outline-none" />
                    </div>
                  </div>
                  <div>
                    <ImageUploader 
                      label="Overview Image" 
                      hint="Image shown next to the main overview text."
                      value={form.overview.image} 
                      onChange={url => setOverview('image', url)} 
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Traditional Dish */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800">2. Cuisine & Dish</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cuisine Details</label>
                    <textarea rows={5} value={form.overview.expandedContent.cuisine?.paragraphs?.[0] || ''} onChange={e => setOverviewExp('cuisine', 'paragraphs', [e.target.value])} className="w-full rounded-xl border-gray-300 px-4 py-3 border focus:ring-2 focus:ring-emerald-500 bg-gray-50 outline-none" placeholder="Describe the local food..." />
                  </div>
                  <div>
                    <ImageUploader 
                      label="Traditional Dish Image" 
                      value={form.overview.expandedContent.traditionalDish?.image || ''} 
                      onChange={url => setOverviewExp('traditionalDish', 'image', url)} 
                    />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              {/* Social Life */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-emerald-800">3. Social Life</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Social Life Details</label>
                    <textarea rows={5} value={form.overview.expandedContent.socialLife?.paragraphs?.[0] || ''} onChange={e => setOverviewExp('socialLife', 'paragraphs', [e.target.value])} className="w-full rounded-xl border-gray-300 px-4 py-3 border focus:ring-2 focus:ring-emerald-500 bg-gray-50 outline-none" placeholder="Describe the local culture and social norms..." />
                  </div>
                  <div>
                    <ImageUploader 
                      label="Social Life Image" 
                      value={form.overview.expandedContent.socialImage || ''} 
                      onChange={url => setOverviewExpField('socialImage', url)} 
                    />
                  </div>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'weather' && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Weather & Live Status</h2>
                <p className="text-sm text-gray-500 mt-1">Set conditions for the public live status cards.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Base Temperature (°C)</label>
                  <input type="number" value={form.weather.baseTemperature} onChange={e => setWeather('baseTemperature', Number(e.target.value))} className="w-full rounded-xl border-gray-300 px-4 py-3 border bg-white outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Condition</label>
                  <select value={form.weather.condition} onChange={e => setWeather('condition', e.target.value)} className="w-full rounded-xl border-gray-300 px-4 py-3 border bg-white outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
                    <option>Clear</option><option>Sunny</option><option>Partly cloudy</option><option>Cloudy</option><option>Light Snow</option><option>Rain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Risk Level</label>
                  <select value={form.hero.risk} onChange={e => setHero('risk', e.target.value)} className="w-full rounded-xl border-gray-300 px-4 py-3 border bg-white outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
                    <option>Low Risk</option><option>Moderate Risk</option><option>High Risk</option><option>Not Safe</option><option>Unknown</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Road Access</label>
                  <select value={form.hero.roadAccess} onChange={e => setHero('roadAccess', e.target.value)} className="w-full rounded-xl border-gray-300 px-4 py-3 border bg-white outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer">
                    <option>Normal</option><option>Delays possible</option><option>Slow in sections</option><option>Check before travel</option>
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </form>
  )
}
