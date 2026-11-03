import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, AlertTriangle, CloudRain, Wind, Thermometer, Map } from "lucide-react";
import { formatRelativeTime } from "../../lib/dateUtil.js";
import { getRiskUi } from "../../lib/statusLogic.js";

const BRAND_GREEN_DEEPEST = "#01411C";

function getTitle(r) {
  return r?.title || r?.name || (r?.from && r?.to ? `${r.from} → ${r.to}` : "") || "Route";
}

function getUpdateLabel(r) {
  const t = r?.updated_at || r?.last_updated || r?.timestamp;
  return t ? `Updated ${formatRelativeTime(t)}` : "";
}

export default function RouteConditionsSection({ routes }) {
  const sortedRoutes = useMemo(() => {
    return [...(routes || [])]
      .sort((a, b) => getRiskUi(a.status).level - getRiskUi(b.status).level)
      .slice(0, 4);
  }, [routes]);

  const total = sortedRoutes.length;

  return (
    <section className="w-full">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-lg sm:text-xl font-extrabold" style={{ color: BRAND_GREEN_DEEPEST }}>
            Route Conditions
          </h2>
          {total > 0 && (
            <span className="inline-flex items-center rounded-full bg-amber-100 border border-amber-200 px-3 py-1 text-xs font-semibold text-amber-900">
              {total} highlights
            </span>
          )}
        </div>
      </div>

      {total === 0 ? (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <Map className="mx-auto h-12 w-12 text-slate-300 mb-3" />
          <h3 className="text-sm font-semibold text-slate-900">No Route Alerts</h3>
          <p className="mt-1 text-sm text-slate-500">There are currently no major route advisories reported.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sortedRoutes.map((r) => {
            const risk = getRiskUi(r?.status);
            return (
              <article key={r.id} className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-extrabold text-base" style={{ color: BRAND_GREEN_DEEPEST }}>
                      {getTitle(r)}
                    </h3>
                    <div className="mt-2">
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${risk.pill}`}>
                        {risk.label}
                      </span>
                    </div>
                  </div>
                  {getUpdateLabel(r) && <div className="text-xs text-slate-500">{getUpdateLabel(r)}</div>}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}