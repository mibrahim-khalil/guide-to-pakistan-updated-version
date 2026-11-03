import { useState, useEffect } from 'react';
import { publicShopApi } from '../features/shop/api/publicShopApi';
import { useCartStore } from '../features/shop/store/cartStore';
import { ShoppingBag, Package, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const addItem = useCartStore(s => s.addItem);

  useEffect(() => {
    publicShopApi.getProducts({ category: category === 'all' ? undefined : category })
      .then(setProducts).finally(() => setLoading(false));
  }, [category]);

  const money = (n) => 'PKR ' + Number(n).toLocaleString();
  const categories = ['all', 'Dry Fruits', 'Handicrafts', 'Trekking Gear', 'Spices & Tea', 'Souvenirs', 'Pashmina & Shawls'];

  const handleAddToCart = (product) => {
    addItem(product);
    toast.success(product.name + ' added to cart!');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <section className="bg-gradient-to-br from-amber-900 via-amber-800 to-orange-900 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-white/10 text-amber-200 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200/30">
            <ShoppingBag size={14} /> Authentic Pakistani Shop
          </span>
          <h1 className="text-3xl md:text-5xl font-bold">Pakistan Marketplace</h1>
          <p className="text-amber-100 text-sm max-w-2xl mx-auto">Hunza dry fruits, Kashmiri Pashmina, Pakistani handicrafts, trekking gear & authentic souvenirs.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-3 flex flex-wrap gap-2 items-center justify-center">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-xl text-xs font-bold ${category === cat ? 'bg-amber-600 text-white shadow-md' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}>
              {cat === 'all' ? 'All Products' : cat}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 mt-10">
        {loading ? (
          <div className="py-20 text-center"><div className="w-8 h-8 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto" /></div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center"><Package size={48} className="mx-auto text-slate-300 mb-4" /><h3>No products in this category</h3></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(p => (
              <article key={p._id} className="bg-white rounded-2xl border shadow-sm hover:shadow-xl transition overflow-hidden group">
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  {p.discountPrice && (
                    <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded shadow">
                      SAVE PKR {(p.price - p.discountPrice).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="p-4 space-y-3">
                  <span className="text-[10px] font-bold uppercase text-amber-700 tracking-wider">{p.category}</span>
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{p.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2">{p.description}</p>
                  <div className="flex items-baseline gap-2 pt-2 border-t border-slate-100">
                    <span className="text-lg font-black text-amber-700">{money(p.discountPrice || p.price)}</span>
                    {p.discountPrice && <span className="text-xs text-slate-400 line-through">{money(p.price)}</span>}
                    <span className="text-[10px] text-slate-400 ml-auto">{p.unit}</span>
                  </div>
                  <button onClick={() => handleAddToCart(p)} className="w-full bg-slate-900 hover:bg-amber-600 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition">
                    <Plus size={14} /> Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}