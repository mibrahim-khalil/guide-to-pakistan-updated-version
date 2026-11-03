import { ExternalLink } from "lucide-react";

export default function PakistanMapPanel({ selected }) {
  const query = selected?.map?.query || "Pakistan";
  const zoom = selected?.map?.zoom || 5;
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Map fills parent */}
      <iframe
        title="Pakistan Map"
        src={src}
        className="h-full w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Detail card (bottom-right) */}
      {selected ? (
        <div className="absolute bottom-4 right-4 z-10 w-[320px] sm:w-[360px]">
          <div className="rounded-2xl bg-white border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-sm font-bold text-slate-900 truncate">
                    {selected.route_name}
                  </div>
                  <div className="mt-1 text-xs text-slate-600 truncate">{selected.location}</div>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center rounded-full bg-red-100 text-red-900 border border-red-200 px-2.5 py-1 text-[11px] font-semibold">
                      {selected.status === "blocked"
                        ? "Blocked"
                        : selected.status === "open"
                          ? "Open"
                          : "Warning"}
                    </span>

                    <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-800 border border-slate-200 px-2.5 py-1 text-[11px] font-semibold">
                      {String(selected.severity).toUpperCase()}
                    </span>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}`}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                  title="Open in Google Maps"
                >
                  View <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                  <div className="text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                    Cause
                  </div>
                  <div className="mt-1 text-xs font-semibold text-slate-900">
                    {selected.popup?.cause || "—"}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                  <div className="text-[10px] font-semibold text-slate-600 uppercase tracking-wide">
                    Updated
                  </div>
                  <div className="mt-1 text-xs font-semibold text-slate-900">
                    {selected.updated_minutes_ago} mins ago
                  </div>
                </div>

                <div className="col-span-2 rounded-xl border border-red-200 bg-red-50 p-2.5 text-[11px] text-red-900">
                  Travel only if necessary. Conditions may worsen.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}