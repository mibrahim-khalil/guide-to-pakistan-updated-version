import { useEffect, useState } from 'react'
import { Plus, Trash2, MapPin, Image as ImageIcon, ListChecks, CalendarRange } from 'lucide-react'
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

const emptyDay = () => ({
  day: 1,
  title: '',
  description: '',
  meals: '',
  accommodation: '',
})

const empty = {
  title: '',
  slug: '',
  regionSlug: 'gilgit-baltistan',
  status: 'draft',
  featured: false,
  price: 0,
  discountPrice: '',
  currency: 'PKR',
  durationDays: 3,
  durationNights: 2,
  difficulty: 'Moderate',
  groupSize: '10-12 Persons',
  startingLocation: 'Islamabad',
  heroImage: '',
  gallery: [],
  overview: '',
  itinerary: [emptyDay()],
  inclusions: [''],
  exclusions: [''],
  upcomingDates: [''],
}

export default function TourForm({ initialValues, onSubmit, submitting }) {
  const [activeTab, setActiveTab] = useState('general')
  const [form, setForm] = useState(empty)

  useEffect(() => {
    if (initialValues) {
      setForm({
        ...empty,
        ...initialValues,
        discountPrice: initialValues.discountPrice ?? '',
        gallery: initialValues.gallery?.length ? initialValues.gallery : [],
        itinerary: initialValues.itinerary?.length ? initialValues.itinerary : [emptyDay()],
        inclusions: initialValues.inclusions?.length ? initialValues.inclusions : [''],
        exclusions: initialValues.exclusions?.length ? initialValues.exclusions : [''],
        upcomingDates: initialValues.upcomingDates?.length ? initialValues.upcomingDates : [''],
      })
    }
  }, [initialValues])

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }))

  const updateListItem = (key, index, value) => {
    setForm((p) => {
      const arr = [...(p[key] || [])]
      arr[index] = value
      return { ...p, [key]: arr }
    })
  }

  const addListItem = (key, blank = '') => {
    setForm((p) => ({ ...p, [key]: [...(p[key] || []), blank] }))
  }

  const removeListItem = (key, index) => {
    setForm((p) => {
      const arr = [...(p[key] || [])]
      arr.splice(index, 1)
      return { ...p, [key]: arr.length ? arr : [key === 'itinerary' ? emptyDay() : ''] }
    })
  }

  const updateDay = (index, field, value) => {
    setForm((p) => {
      const arr = [...(p.itinerary || [])]
      arr[index] = { ...arr[index], [field]: value }
      return { ...p, itinerary: arr }
    })
  }

  const addDay = () => {
    setForm((p) => {
      const nextDay = (p.itinerary?.length || 0) + 1
      return {
        ...p,
        itinerary: [...(p.itinerary || []), { ...emptyDay(), day: nextDay }],
        durationDays: Math.max(p.durationDays || 1, nextDay),
      }
    })
  }

  const addGalleryImage = (url) => {
    if (!url) return
    setForm((p) => ({ ...p, gallery: [...(p.gallery || []), url] }))
  }

  const removeGalleryImage = (index) => {
    setForm((p) => {
      const arr = [...(p.gallery || [])]
      arr.splice(index, 1)
      return { ...p, gallery: arr }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const regionName = REGIONS.find((r) => r.slug === form.regionSlug)?.name || form.regionSlug
    const payload = {
      ...form,
      regionName,
      price: Number(form.price) || 0,
      discountPrice: form.discountPrice === '' || form.discountPrice == null ? undefined : Number(form.discountPrice),
      durationDays: Number(form.durationDays) || 1,
      durationNights: Number(form.durationNights) || 0,
      inclusions: (form.inclusions || []).map((x) => String(x).trim()).filter(Boolean),
      exclusions: (form.exclusions || []).map((x) => String(x).trim()).filter(Boolean),
      upcomingDates: (form.upcomingDates || []).map((x) => String(x).trim()).filter(Boolean),
      itinerary: (form.itinerary || []).map((d, i) => ({
        day: Number(d.day) || i + 1,
        title: d.title || `Day ${i + 1}`,
        description: d.description || '',
        meals: d.meals || '',
        accommodation: d.accommodation || '',
      })),
    }
    onSubmit(payload)
  }

  const tabs = [
    { id: 'general', label: 'General & Pricing', icon: MapPin },
    { id: 'media', label: 'Images', icon: ImageIcon },
    { id: 'itinerary', label: 'Itinerary', icon: CalendarRange },
    { id: 'lists', label: 'Includes / Dates', icon: ListChecks },
  ]

  return (
    <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8 pb-10">
      <div className="w-full lg:w-64 shrink-0">
        <div className="sticky top-20 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={
                  'w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all ' +
                  (activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100')
                }
              >
                <Icon size={18} /> {tab.label}
              </button>
            )
          })}
          <div className="pt-8">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-gray-900 hover:bg-black text-white px-4 py-3.5 text-sm font-semibold disabled:opacity-60 shadow-lg"
            >
              {submitting ? 'Saving tour...' : 'Save Tour Package'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 min-h-[600px]">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">General & Pricing</h2>
                <p className="text-sm text-gray-500 mt-1">Core package details shown on public tours pages.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tour Title *</label>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setField('title', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="Hunza & Attabad Lake Luxury Expedition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Region *</label>
                  <select
                    value={form.regionSlug}
                    onChange={(e) => setField('regionSlug', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                  >
                    {REGIONS.map((r) => (
                      <option key={r.slug} value={r.slug}>{r.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">URL Slug</label>
                  <input
                    value={form.slug}
                    onChange={(e) => setField('slug', e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none"
                    placeholder="auto-from-title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={form.price}
                    onChange={(e) => setField('price', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Discount Price</label>
                  <input
                    type="number"
                    value={form.discountPrice}
                    onChange={(e) => setField('discountPrice', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                    placeholder="optional"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Days</label>
                  <input
                    type="number"
                    min={1}
                    value={form.durationDays}
                    onChange={(e) => setField('durationDays', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nights</label>
                  <input
                    type="number"
                    min={0}
                    value={form.durationNights}
                    onChange={(e) => setField('durationNights', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Difficulty</label>
                  <select
                    value={form.difficulty}
                    onChange={(e) => setField('difficulty', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                  >
                    <option>Easy</option>
                    <option>Moderate</option>
                    <option>Challenging</option>
                    <option>Extreme</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Group Size</label>
                  <input
                    value={form.groupSize}
                    onChange={(e) => setField('groupSize', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Starting Location</label>
                  <input
                    value={form.startingLocation}
                    onChange={(e) => setField('startingLocation', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setField('status', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="inline-flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={!!form.featured}
                      onChange={(e) => setField('featured', e.target.checked)}
                    />
                    Featured on homepage / tours listing
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Overview</label>
                  <textarea
                    rows={5}
                    value={form.overview}
                    onChange={(e) => setField('overview', e.target.value)}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none"
                    placeholder="Short package description for public site..."
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Tour Images</h2>
                <p className="text-sm text-gray-500 mt-1">Hero image + gallery for the public tour page.</p>
              </div>

              <ImageUploader
                label="Hero Image"
                hint="Main cover image for cards and detail page."
                value={form.heroImage}
                onChange={(url) => setField('heroImage', url)}
              />

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Gallery</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {(form.gallery || []).map((url, index) => (
                    <div key={url + index} className="relative rounded-xl overflow-hidden border border-gray-200">
                      <img src={url} alt="" className="h-28 w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(index)}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <ImageUploader
                  label="Add gallery image"
                  value=""
                  onChange={addGalleryImage}
                />
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Day-by-day Itinerary</h2>
                  <p className="text-sm text-gray-500 mt-1">Build the trip schedule shown on the public tour page.</p>
                </div>
                <button
                  type="button"
                  onClick={addDay}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 text-white px-3 py-2 text-sm font-medium"
                >
                  <Plus size={16} /> Add day
                </button>
              </div>

              <div className="space-y-4">
                {(form.itinerary || []).map((day, index) => (
                  <div key={index} className="rounded-2xl border border-gray-200 p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-semibold text-gray-900">Day {day.day || index + 1}</div>
                      <button
                        type="button"
                        onClick={() => removeListItem('itinerary', index)}
                        className="text-red-600 text-sm inline-flex items-center gap-1"
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        value={day.title}
                        onChange={(e) => updateDay(index, 'title', e.target.value)}
                        className="rounded-xl border border-gray-300 px-3 py-2 md:col-span-2"
                        placeholder="Day title e.g. Arrival in Hunza"
                      />
                      <textarea
                        rows={3}
                        value={day.description}
                        onChange={(e) => updateDay(index, 'description', e.target.value)}
                        className="rounded-xl border border-gray-300 px-3 py-2 md:col-span-2"
                        placeholder="Day description..."
                      />
                      <input
                        value={day.meals}
                        onChange={(e) => updateDay(index, 'meals', e.target.value)}
                        className="rounded-xl border border-gray-300 px-3 py-2"
                        placeholder="Meals e.g. Breakfast, Dinner"
                      />
                      <input
                        value={day.accommodation}
                        onChange={(e) => updateDay(index, 'accommodation', e.target.value)}
                        className="rounded-xl border border-gray-300 px-3 py-2"
                        placeholder="Accommodation"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'lists' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Inclusions, Exclusions & Dates</h2>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Inclusions</h3>
                  <button type="button" onClick={() => addListItem('inclusions', '')} className="text-sm text-emerald-700">+ Add</button>
                </div>
                <div className="space-y-2">
                  {(form.inclusions || []).map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        value={item}
                        onChange={(e) => updateListItem('inclusions', index, e.target.value)}
                        className="flex-1 rounded-xl border border-gray-300 px-3 py-2"
                        placeholder="e.g. 4-star hotel stay"
                      />
                      <button type="button" onClick={() => removeListItem('inclusions', index)} className="text-red-600 px-2">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Exclusions</h3>
                  <button type="button" onClick={() => addListItem('exclusions', '')} className="text-sm text-emerald-700">+ Add</button>
                </div>
                <div className="space-y-2">
                  {(form.exclusions || []).map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        value={item}
                        onChange={(e) => updateListItem('exclusions', index, e.target.value)}
                        className="flex-1 rounded-xl border border-gray-300 px-3 py-2"
                        placeholder="e.g. Airfare"
                      />
                      <button type="button" onClick={() => removeListItem('exclusions', index)} className="text-red-600 px-2">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Upcoming Dates (YYYY-MM-DD)</h3>
                  <button type="button" onClick={() => addListItem('upcomingDates', '')} className="text-sm text-emerald-700">+ Add</button>
                </div>
                <div className="space-y-2">
                  {(form.upcomingDates || []).map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        value={item}
                        onChange={(e) => updateListItem('upcomingDates', index, e.target.value)}
                        className="flex-1 rounded-xl border border-gray-300 px-3 py-2"
                        placeholder="2026-05-10"
                      />
                      <button type="button" onClick={() => removeListItem('upcomingDates', index)} className="text-red-600 px-2">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  )
}
