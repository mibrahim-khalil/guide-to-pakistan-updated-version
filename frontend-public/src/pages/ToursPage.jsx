import { useState } from "react";
import { Link } from "react-router-dom";
import { useToursList } from "../features/tours/hooks/useTours";
import { Clock, CheckCircle2, ChevronRight, Sparkles, Filter } from "lucide-react";

export default function ToursPage() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const { tours, loading } = useToursList({
    region: selectedRegion || undefined,
    difficulty: selectedDifficulty || undefined,
  });
  const [activeTour, setActiveTour] = useState(null);
  const money = (p) => p ? `PKR ${Number(p).toLocaleString()}` : "Contact";

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="bg-slate-900 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
            <Sparkles size={14} /> Curated Experiences
          </span>
          <h1 className="text-3xl md:text-5xl font-bold">Explore Pakistan Tour Packages</h1>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">Verified itineraries across all regions of Pakistan.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border p-4 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <Filter size={18} className="text-emerald-600" /> Filter Packages:
          </div>
          <div className="flex flex-wrap gap-3">
            <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)} className="bg-slate-50 border border-slate-300 text-sm rounded-xl px-4 py-2.5">
              <option value="">All Regions</option>
              <option value="gilgit-baltistan">Gilgit-Baltistan</option>
              <option value="khyber-pakhtunkhwa">KPK</option>
              <option value="punjab">Punjab</option><option value="sindh">Sindh</option><option value="balochistan">Balochistan</option>
              <option value="islamabad">Islamabad</option><option value="kashmir">Azad Kashmir</option>
            </select>
            <select value={selectedDifficulty} onChange={e => setSelectedDifficulty(e.target.value)} className="bg-slate-50 border border-slate-300 text-sm rounded-xl px-4 py-2.5">
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option><option value="Moderate">Moderate</option><option value="Challenging">Challenging</option>
            </select>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 mt-10">
        {loading ? (
          <div className="py-20 text-center"><div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>
        ) : tours.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">No Tour Packages Found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map(tour => (
              <article key={tour._id} className="bg-white rounded-2xl border shadow-sm hover:shadow-xl transition overflow-hidden group">
                <div className="relative h-56 bg-slate-900">
                  <img src={tour.heroImage} alt={tour.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-slate-900/80 text-white text-xs font-semibold px-2.5 py-1 rounded">{tour.regionName}</span>
                    {tour.featured && <span className="bg-amber-500 text-slate-950 text-xs font-bold px-2.5 py-1 rounded">Featured</span>}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between text-white text-xs">
                    <span className="flex items-center gap-1"><Clock size={12} /> {tour.durationDays}D/{tour.durationNights}N</span>
                    <span className="bg-emerald-600 px-2 py-0.5 rounded">{tour.difficulty}</span>
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <h2 className="text-lg font-bold text-slate-900 line-clamp-2">{tour.title}</h2>
                  <p className="text-xs text-slate-600 line-clamp-2">{tour.overview}</p>
                  <div className="pt-4 border-t flex items-center justify-between">
                    <div>
                      <span className="text-xs text-slate-400">Starting from</span>
                      <div className="text-lg font-extrabold text-emerald-700">{money(tour.discountPrice || tour.price)}</div>
                    </div>
                    <Link to={`/book-now?tour=${encodeURIComponent(tour.title)}`} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1">
                      Book Now <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}