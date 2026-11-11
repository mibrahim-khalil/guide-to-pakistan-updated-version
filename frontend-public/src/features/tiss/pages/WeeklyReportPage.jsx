import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, Calendar, MapPin, Users, Mountain, Route as RouteIcon, 
  FileText, Cloud, CheckCircle2, AlertTriangle, ShieldCheck, HeartHandshake, Sparkles 
} from "lucide-react";
import { getLatestReport, getReportById } from "../lib/apiClient";

export default function WeeklyReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = id ? await getReportById(id) : await getLatestReport();
      setReport(data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#F8FAF9]">Loading intelligence report...</div>;
  if (!report) return <div className="min-h-screen flex items-center justify-center bg-[#F8FAF9]">Report not found.</div>;

  const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="bg-[#F8FAF9] min-h-screen font-sans pb-20">
      {/* DARK HERO SECTION */}
      <div className="bg-[#0B1315] text-white pt-8 pb-16 px-6 relative rounded-b-[40px] shadow-lg">
        <div className="max-w-6xl mx-auto">
          <Link to="/tiss" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition mb-8">
            <ArrowLeft size={18} />
          </Link>

          <div className="flex flex-col md:flex-row md:justify-between items-start gap-8">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12BD64]/20 text-[#12BD64] text-[10px] font-bold uppercase tracking-wider mb-6 border border-[#12BD64]/30">
                <div className="w-1.5 h-1.5 rounded-full bg-[#12BD64] animate-pulse" /> Live Weekly Report
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 font-serif">
                Weekly travel <br/> intelligence across <br/> 
                <span className="text-[#12BD64]">Northern Pakistan</span>
              </h1>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-xl">
                Live weather, route conditions and advisories — with Smart GTP support for planning.
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                <MapPin size={16} className="text-[#12BD64]" />
                {report.heroDestinations?.join(' • ')}
              </div>
            </div>

            {/* Date Box */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md min-w-[240px]">
              <div className="mb-4">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Calendar size={12} /> Report Week
                </div>
                <div className="font-bold text-white text-sm">
                  {formatDate(report.weekStartDate)} — {formatDate(report.weekEndDate)}
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Last Updated
                </div>
                <div className="font-bold text-white text-sm">
                  {new Date(report.updatedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT WRAPPER */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 space-y-8">

        {/* WEEKLY STORY CARD */}
        <div className="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-slate-100">
          <h2 className="text-center text-xl font-bold text-[#0F2F22] tracking-widest uppercase mb-8">Weekly Story</h2>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <p className="text-slate-600 text-[15px] leading-relaxed flex-1">
              {report.story?.text}
            </p>
            {report.story?.images?.[0] && (
              <div className="flex-1 w-full relative h-48 rounded-2xl overflow-hidden shadow-md">
                <img src={report.story.images[0]} alt="Story 1" className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  Kunhar • Rafting
                </div>
              </div>
            )}
          </div>
          {report.story?.images?.[1] && (
            <div className="flex flex-col md:flex-row gap-8 items-center mt-8">
              <div className="flex-1 w-full relative h-48 rounded-2xl overflow-hidden shadow-md order-2 md:order-1">
                <img src={report.story.images[1]} alt="Story 2" className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full">
                  Karakoram • Trekking
                </div>
              </div>
              <p className="text-slate-600 text-[15px] leading-relaxed flex-1 order-1 md:order-2">
                For mountain travel: start early, keep buffer time, avoid night driving, and re-check road status the night before travel.
              </p>
            </div>
          )}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400 mb-4">This report is generated and reviewed weekly. Use it for planning, and always verify the latest road status and weather before travel.</p>
            <button className="bg-[#12BD64] text-white text-xs font-bold px-5 py-2 rounded-full hover:bg-emerald-600 transition">Show More ⌄</button>
          </div>
        </div>

        {/* METRICS & WEATHER GREEN PANEL */}
        <div className="bg-[#D3ECDD] rounded-[32px] p-8 md:p-10 border border-[#B7D9C6]">
          {/* Metrics */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <h3 className="text-lg font-extrabold text-[#0F2F22]">Week Highlights</h3>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Live Metrics</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Ask GTP Queries', val: report.metrics?.queriesAsked, icon: Users, color: 'text-blue-500' },
                { label: 'Destinations Tracked', val: report.metrics?.destinationsTracked, icon: Mountain, color: 'text-emerald-500' },
                { label: 'Routes Tracked', val: report.metrics?.routesTracked, icon: RouteIcon, color: 'text-amber-500' },
                { label: 'Published Field Updates', val: report.metrics?.fieldUpdates, icon: FileText, color: 'text-rose-500' }
              ].map((m, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className={`w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 ${m.color}`}>
                    <m.icon size={16} />
                  </div>
                  <div className="text-3xl font-black text-[#0F2F22] mb-1">{m.val}</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase">{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Snapshots */}
          <div>
             <div className="flex justify-between items-end mb-4">
              <h3 className="text-lg font-extrabold text-[#0F2F22]">Weather & Road Snapshot</h3>
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Live • OpenWeather</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.snapshots?.map((snap, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                        <Cloud size={20} />
                     </div>
                     <div>
                       <div className="text-[10px] font-bold text-slate-400 uppercase">{snap.name}</div>
                       <div className="text-xl font-black text-[#0F2F22]">{snap.temp}°C <span className="text-sm font-medium text-slate-500">{snap.condition}</span></div>
                     </div>
                  </div>
                  <div className="text-right border-l border-slate-100 pl-4">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase justify-end mb-1">
                      <RouteIcon size={12}/> Road Access
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${snap.roadAccess === 'OPEN' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {snap.roadAccess}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GUIDANCE & EXPERIENCES */}
        <div className="bg-[#D3ECDD] rounded-[32px] p-8 md:p-10 border border-[#B7D9C6]">
          <h3 className="text-lg font-extrabold text-[#0F2F22] mb-6">Travel Guidance</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-amber-600 font-bold text-sm mb-4">
                <AlertTriangle size={18} /> Caution Areas
              </div>
              <ul className="space-y-3">
                {report.guidance?.cautionAreas?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600"><CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" /> {item}</li>
                ))}
              </ul>
            </div>

             <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-4">
                <Calendar size={18} /> Recommended Windows
              </div>
              <ul className="space-y-3">
                {report.guidance?.travelWindows?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600"><CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" /> {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm mb-4">
                <ShieldCheck size={18} /> Packing Suggestions
              </div>
              <ul className="space-y-3">
                {report.guidance?.packingSuggestions?.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600"><CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" /> {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-purple-600 font-bold text-sm mb-2">
                  <HeartHandshake size={18} /> Need Help Planning?
                </div>
                <p className="text-xs text-slate-600 mb-4">Contact Guide to Pakistan for reliable local support and bookings.</p>
              </div>
              <button className="w-full bg-[#12BD64] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-emerald-600 transition">Contact GTP →</button>
            </div>

          </div>

          {/* Top Experiences */}
          <div className="mt-8">
            <h3 className="flex items-center gap-2 text-sm font-extrabold text-[#0F2F22] mb-4">
              <Sparkles size={16} className="text-[#12BD64]" /> Top Experiences This Week
            </h3>
            <div className="flex flex-wrap gap-2">
              {report.topExperiences?.map((exp, i) => (
                <div key={i} className="bg-white px-4 py-2.5 rounded-xl shadow-sm text-xs font-medium text-slate-700 flex items-center gap-2 border border-slate-100">
                  <CheckCircle2 size={14} className="text-[#12BD64]" /> {exp}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}