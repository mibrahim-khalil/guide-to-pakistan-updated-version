import { useState, useEffect } from 'react';
import { publicShopApi } from '../features/shop/api/publicShopApi';
import { useCartStore } from '../features/shop/store/cartStore';
import { ShoppingBag, Package, Plus, Sparkles, Filter, Check, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    setLoading(true);
    publicShopApi
      .getProducts({ category: category === 'all' ? undefined : category })
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [category]);

  const money = (n) => 'PKR ' + Number(n || 0).toLocaleString();
  const categories = [
    'all',
    'Dry Fruits',
    'Handicrafts',
    'Trekking Gear',
    'Spices & Tea',
    'Souvenirs',
    'Pashmina & Shawls',
  ];

  const handleAddToCart = (product) => {
    addItem(product);
    toast.success(`${product.name} added to cart!`, {
      style: {
        background: '#064e3b',
        color: '#fff',
        borderRadius: '12px',
      },
      icon: '🛒',
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-slate-900 font-sans pb-24">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[50vh] flex items-center justify-center text-white text-center px-4 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=2000"
            alt="Authentic Pakistan Bazaar"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-950/40 via-transparent to-emerald-950/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-4 pt-16 pb-12">
          <span className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-md text-amber-300 text-xs font-bold px-4 py-2 rounded-full border border-amber-500/30 tracking-widest uppercase shadow-lg">
            <Sparkles size={14} className="text-amber-400" /> Authentic Pakistani Marketplace
          </span>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-extrabold tracking-tight text-white leading-tight drop-shadow-2xl">
            Pakistan <span className="text-amber-400">Marketplace</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-light max-w-2xl mx-auto leading-relaxed drop-shadow">
            Organic Hunza walnuts, Kashmir shawls, handcrafted souvenirs, and premium trekking gear delivered directly to your doorstep.
          </p>
        </div>
      </section>

      {/* 2. FLOATING CATEGORY FILTERS */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 p-3 flex flex-wrap gap-2 items-center justify-center backdrop-blur-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all duration-300 flex items-center gap-1.5 ${
                category === cat
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 scale-105'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
              }`}
            >
              {category === cat && <Check size={13} strokeWidth={3} />}
              {cat === 'all' ? 'All Products' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. PRODUCT CATALOG GRID */}
      <main className="max-w-7xl mx-auto px-4 mt-12">
        {loading ? (
          <div className="py-24 text-center space-y-4">
            <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 font-semibold text-sm">Loading authentic marketplace items...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-md p-16 text-center max-w-lg mx-auto space-y-4 my-10">
            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto text-amber-600 border border-amber-200">
              <Package size={32} />
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-900">No items found</h3>
            <p className="text-slate-500 text-sm">
              We couldn't find any products in the <span className="font-bold text-amber-700">"{category}"</span> category right now.
            </p>
            <button
              onClick={() => setCategory('all')}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition shadow-md"
            >
              View All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <article
                key={p._id || p.id}
                className="bg-white rounded-[2rem] border border-slate-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                {/* Product Image */}
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={p.image || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=600'}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-amber-500/20 shadow">
                    {p.category}
                  </span>

                  {/* Discount Badge */}
                  {p.discountPrice && p.price > p.discountPrice && (
                    <span className="absolute top-3 right-3 bg-rose-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow">
                      Save {money(p.price - p.discountPrice)}
                    </span>
                  )}
                </div>

                {/* Product Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-slate-900 text-base group-hover:text-amber-700 transition-colors line-clamp-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {p.description || 'Handcrafted authentic regional quality item from Pakistan.'}
                    </p>
                  </div>

                  {/* Pricing & Unit */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-xl font-black text-emerald-800">
                          {money(p.discountPrice || p.price)}
                        </span>
                        {p.discountPrice && (
                          <span className="text-xs text-slate-400 line-through ml-2">
                            {money(p.price)}
                          </span>
                        )}
                      </div>
                      {p.unit && (
                        <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                          {p.unit}
                        </span>
                      )}
                    </div>

                    {/* Add To Cart CTA */}
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="w-full bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-amber-600/20 active:scale-98"
                    >
                      <Plus size={15} strokeWidth={2.5} /> Add to Cart
                    </button>
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