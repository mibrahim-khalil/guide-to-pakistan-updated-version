import { ArrowDown, Calendar, Sparkles } from 'lucide-react';

const ERAS = [
  {
    number: '01',
    title: 'Indus Valley Civilization',
    period: 'C. 3300 – 1300 BCE',
    summary: 'One of the world’s earliest urban civilizations, with advanced planned cities like Mohenjo-daro and Harappa.',
    body: 'The Indus Valley Civilization developed sophisticated urban planning, brick architecture, underground drainage systems, trade networks, and craftsmanship across the Indus basin in modern-day Pakistan.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1200'
  },
  {
    number: '02',
    title: 'Gandhara & Ancient Kingdoms',
    period: 'C. 1500 BCE – 500 CE',
    summary: 'A vibrant crossroads of faiths, Greco-Buddhist art, and ancient empires across Taxila and Peshawar.',
    body: 'Gandhara became a premier global center of Buddhist learning and art, fusing Greek sculpting techniques with Buddhist heritage. Kings and scholars traveled along the Silk Road through modern Khyber Pakhtunkhwa and Punjab.',
    image: 'https://images.unsplash.com/photo-1588665045100-344cb893a404?auto=format&fit=crop&q=80&w=1200'
  },
  {
    number: '03',
    title: 'Islamic Sultanates & Mughal Era',
    period: 'C. 700 – 1700 CE',
    summary: 'Arrival of Islam and the golden age of grand Mughal architecture and literature.',
    body: 'From Muhammad bin Qasim’s arrival in Sindh to the magnificent Mughal emperors, this era transformed the region with iconic monuments like Badshahi Mosque, Lahore Fort, Shalimar Gardens, and rich Sufi poetry.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=1200'
  },
  {
    number: '04',
    title: 'Colonial Era & Social Reform',
    period: '18TH – MID 20TH CENTURY',
    summary: 'British colonial rule, infrastructure development, and educational awakening.',
    body: 'Colonial administration established railways, canal networks, and modern administrative systems. Simultaneously, reformers like Sir Syed Ahmed Khan laid the intellectual foundation for Muslims through the Aligarh Movement.',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=1200'
  },
  {
    number: '05',
    title: 'Independence Movement',
    period: '1900S – 1947',
    summary: 'The political struggle for self-determination culminating in the birth of a new nation.',
    body: 'Led by Quaid-e-Azam Muhammad Ali Jinnah and guided by the vision of Allama Iqbal, the All-India Muslim League spearheaded a constitutional movement resulting in the creation of Pakistan on August 14, 1947.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&q=80&w=1200'
  },
  {
    number: '06',
    title: 'Modern Pakistan',
    period: '1947 – PRESENT',
    summary: 'Nation-building, cultural resilience, scientific achievements, and contemporary identity.',
    body: 'From building new institutions and modern cities like Islamabad to constitutional developments and thriving art, music, and hospitality, modern Pakistan continues its evolving story.',
    image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&q=80&w=1200'
  }
];

export default function HistoryPage() {
  return (
    <div className="bg-[#f7f4ed] min-h-screen text-slate-900 font-sans">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden bg-slate-950">
        <img
          src="https://images.unsplash.com/photo-1627896157734-4d7d427282eb?auto=format&fit=crop&q=80&w=2000"
          alt="History of Pakistan"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-28 pb-16">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-slate-200 text-[11px] font-bold tracking-[0.25em] px-4 py-2 rounded-full border border-white/20 uppercase">
              <Sparkles size={13} className="text-amber-400" /> Past • People • Civilizations
            </span>

            <h1 className="font-serif leading-[0.9] tracking-tight font-extrabold text-left">
              <span className="block text-5xl sm:text-7xl md:text-8xl text-slate-100">HISTORY</span>
              <span className="block text-5xl sm:text-7xl md:text-8xl text-[#d4af37]">OF</span>
              <span className="block text-5xl sm:text-7xl md:text-8xl text-[#d4af37]">PAKISTAN</span>
            </h1>

            <p className="text-sm md:text-base text-slate-200 max-w-xl leading-relaxed drop-shadow">
              Journey through thousands of years of civilizations, empires, cultures, movements, and defining moments that shaped the land we know today as Pakistan.
            </p>
          </div>

          <div className="absolute right-6 md:right-12 bottom-12 hidden md:flex">
            <a
              href="#timeline"
              className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-full pl-6 pr-2 py-2 text-sm text-white hover:bg-black/60 transition shadow-xl"
            >
              <span className="text-left leading-tight">
                <span className="block text-[10px] tracking-widest text-slate-300 uppercase font-bold">Begin the journey</span>
                <span className="font-bold text-white">Explore History</span>
              </span>
              <span className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center bg-white/10">
                <ArrowDown size={18} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section id="timeline" className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-extrabold tracking-[0.2em] uppercase text-[#155e42]">
              History of Pakistan
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#14352d] leading-tight">
              Thousands of years. One evolving story.
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Explore the civilizations, kingdoms, empires, political movements, and social transformations that shaped the territories and communities of present-day Pakistan.
            </p>
          </div>
          <div className="self-start md:self-auto text-xs font-bold tracking-widest text-slate-600 bg-white border border-slate-200/80 px-4 py-2 rounded-full shadow-sm">
            01 / 06
          </div>
        </div>
      </section>

      {/* 3. TIMELINE CARDS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-24 space-y-10">
        {ERAS.map((era, index) => (
          <article
            key={era.number}
            className="bg-white rounded-[2.5rem] border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
          >
            {/* Image Column */}
            <div className={`relative min-h-[300px] lg:min-h-[380px] lg:col-span-5 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
              <img
                src={era.image}
                alt={era.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute left-6 top-6 w-12 h-12 rounded-full bg-[#14352d] text-white font-bold flex items-center justify-center text-sm shadow-lg border border-white/20">
                {era.number}
              </div>
            </div>

            {/* Content Column */}
            <div className={`p-8 md:p-12 lg:col-span-7 flex flex-col justify-center space-y-4 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
              <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.2em] uppercase text-[#155e42]">
                <Calendar size={14} /> {era.period}
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#14352d] leading-tight">
                {era.title}
              </h3>
              <p className="text-slate-800 font-semibold text-sm md:text-base leading-relaxed">
                {era.summary}
              </p>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {era.body}
              </p>
            </div>
          </article>
        ))}
      </section>

    </div>
  );
}