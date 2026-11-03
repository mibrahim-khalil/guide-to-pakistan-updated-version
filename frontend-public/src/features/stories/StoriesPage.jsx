import { useState } from 'react';
import { useStoriesList } from './hooks/useStories';
import { BookOpen, Clock, User, Sparkles, Filter, ArrowRight } from 'lucide-react';

export default function StoriesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const { stories, loading } = useStoriesList({
    category: activeCategory || undefined,
  });

  const categories = ['all', 'Travel Guide', 'Culture & Heritage', 'Adventure', 'Food & Dining'];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 to-slate-900/80 z-0" />
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
            <Sparkles size={14} /> Travel Journal & Guides
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Stories from Pakistan</h1>
          <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
            Insider guides, cultural deep-dives, food trails, and travel tips written by local explorers.
          </p>
        </div>
      </section>

      {/* Category Bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-3 flex flex-wrap gap-2 items-center justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'All Stories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <main className="max-w-7xl mx-auto px-4 mt-10">
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 text-sm font-medium">Fetching articles from MongoDB Atlas...</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">No Stories Found</h3>
            <p className="text-slate-500 text-sm">No articles available under this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story) => (
              <article key={story._id || story.id} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
                      {story.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                      <span className="flex items-center gap-1"><User size={12} className="text-emerald-600" /> {story.author || 'GTP Editorial'}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {story.readTime || '5 min read'}</span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {story.title}
                    </h2>

                    <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">
                      {story.subtitle || story.content}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600 group-hover:text-emerald-700">
                    <span>Read Article</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
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