import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShoppingBag, MapPin, ArrowRight, Star, Sparkles, BookOpen } from 'lucide-react';
import { publicDestinationsApi } from '../features/destinations/api/publicDestinationsApi';
import { publicToursApi } from '../features/tours/api/publicToursApi';

export default function HomePage() {
  const [regions, setRegions] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      publicDestinationsApi.getRegions().catch(() => []),
      publicToursApi.getTours ? publicToursApi.getTours().catch(() => []) : Promise.resolve([])
    ]).then(([regionsData, toursData]) => {
      setRegions(Array.isArray(regionsData) ? regionsData.slice(0, 3) : []);
      setTours(Array.isArray(toursData) ? toursData.slice(0, 3) : []);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-white text-center px-4 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1627896157734-4d7d427282eb?auto=format&fit=crop&q=80&w=2000" 
            alt="Hunza Valley" 
            className="w-full h-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-6 pt-20 px-4">
          <span className="inline-flex items-center gap-2 bg-emerald-500/20 backdrop-blur-md text-emerald-300 text-xs font-bold px-4 py-2 rounded-full border border-emerald-500/30 tracking-widest uppercase">
            <Sparkles size={14} /> Guide to Pakistan
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight text-white leading-tight drop-shadow-xl">
            Discover the Soul of Pakistan
          </h1>

          <p className="text-base sm:text-xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow">
            From the mighty peaks of Karakoram to the ancient ruins of Indus Valley — an odyssey awaits.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Link 
              to="/tours" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
            >
              <Compass size={18} /> Explore Tours
            </Link>
            <Link 
              to="/shop" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-105 flex items-center gap-2 text-sm sm:text-base"
            >
              <ShoppingBag size={18} /> Visit Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* 2. POPULAR DESTINATIONS */}
      <section className="py-20 px-4 max-w-7xl mx-auto space-y-10">
        <div className="flex justify-between items-end border-b pb-4">
          <div>
            <span className="text-xs font-bold uppercase text-emerald-600 tracking-widest">Explore</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">Popular Destinations</h2>
          </div>
          <Link to="/destinations" className="text-emerald-700 font-bold hover:underline flex items-center gap-1 text-sm">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {regions.length > 0 ? (
            regions.map((region) => (
              <Link
                key={region._id || region.id}
                to={`/destinations/${region.slug || region._id}`}
                className="group relative h-96 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-end bg-slate-900"
              >
                <img
                  src={region.image || region.bannerImage || "https://images.unsplash.com/photo-1588665045100-344cb893a404?auto=format&fit=crop&q=80&w=800"}
                  alt={region.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                <div className="relative z-10 p-6 space-y-2 text-white">
                  <div className="flex items-center gap-1 text-xs font-bold uppercase text-emerald-400">
                    <MapPin size={13} /> Region
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">{region.name}</h3>
                  <p className="text-slate-300 text-xs line-clamp-2">{region.description}</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-slate-400">Loading destinations...</div>
          )}
        </div>
      </section>

      {/* 3. CULTURE & MARKETPLACE BANNER */}
      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase text-amber-400 tracking-widest">Authentic Marketplace</span>
            <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">Original Dry Fruits, Handicrafts & Pashmina</h2>
            <p className="text-slate-300 leading-relaxed text-base">
              Support local artisans across Gilgit-Baltistan and Kashmir. We deliver organic Hunza walnuts, dried apricots, Kashmiri shawls, and handmade souvenirs directly to your doorstep.
            </p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg">
              <ShoppingBag size={18} /> Shop Products Now
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-xl h-60 w-full object-cover" alt="Dry fruits" />
            <img src="https://images.unsplash.com/photo-1606744888344-493238951221?auto=format&fit=crop&q=80&w=600" className="rounded-3xl shadow-xl h-60 w-full object-cover mt-8" alt="Shawls" />
          </div>
        </div>
      </section>

    </div>
  );
}