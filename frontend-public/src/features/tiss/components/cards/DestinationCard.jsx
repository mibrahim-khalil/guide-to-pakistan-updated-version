import { Link } from "react-router-dom";
import {
  Thermometer,
  Clock,
  Route as RouteIcon,
  Landmark,
} from "lucide-react";
import { useMemo, useState } from "react";
import { formatRelativeTime } from "../../lib/dateUtil.js";
import { getRiskUi } from "../../lib/statusLogic.js";
import Button from "../common/Button.jsx";

/* Theme */
const BRAND_GREEN_DEEPEST = "#01411C";

function getDestinationImage(destination) {
  return (
    destination?.image_url ||
    destination?.image ||
    destination?.thumbnail ||
    destination?.photo_url ||
    ""
  );
}

function getWeatherEmoji({ iconCode, condition }) {
  const code = String(iconCode || "").slice(0, 2);

  if (code === "01") return "☀️";
  if (code === "02") return "🌤️";
  if (code === "03" || code === "04") return "☁️";
  if (code === "09") return "🌦️";
  if (code === "10") return "🌧️";
  if (code === "11") return "⛈️";
  if (code === "13") return "🌨️";
  if (code === "50") return "🌫️";

  const c = String(condition || "").toLowerCase();
  if (c.includes("rain")) return "🌧️";
  if (c.includes("cloud")) return "☁️";
  if (c.includes("clear")) return "☀️";

  return "🌡️";
}

const clamp4 = {
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export default function DestinationCard({ destination }) {
  const risk = getRiskUi(destination.status);
  const imageSrc = getDestinationImage(destination);
  const [imgOk, setImgOk] = useState(true);

  const weatherEmoji = useMemo(
    () =>
      getWeatherEmoji({
        iconCode: destination.weather?.icon_code,
        condition: destination.weather?.condition,
      }),
    [destination.weather?.icon_code, destination.weather?.condition]
  );

  const combinedDescription = useMemo(() => {
    const weather = destination.weather?.condition
      ? `Weather: ${destination.weather.condition}`
      : "Weather conditions stable";

    const temp = destination.weather?.temp_c
      ? `Temperature around ${destination.weather.temp_c}°C`
      : "Temperature information unavailable";

    const civic = destination.civic_local
      ? `Civic status: ${destination.civic_local}`
      : "Civic conditions stable";

    const road = destination.road_access
      ? `Road access: ${destination.road_access}`
      : "Road access normal";

    return `${risk.label}. ${weather}. ${temp}. ${civic}. ${road}. Please verify updates before travel.`;
  }, [
    destination.weather?.condition,
    destination.weather?.temp_c,
    destination.civic_local,
    destination.road_access,
    risk.label,
  ]);

  return (
    <article
      className="
        group
        rounded-2xl
        bg-white
        border border-slate-200
        overflow-hidden
        shadow-sm
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300
        flex flex-col
        h-[560px] sm:h-[580px]
      "
    >
      {/* IMAGE */}
      <Link to={`/tiss/destinations/${destination.slug}`} className="block">
        <div className="relative h-64 sm:h-72 w-full bg-slate-200 overflow-hidden">
          {imageSrc && imgOk ? (
            <img
              src={imageSrc}
              alt={destination.name}
              onError={() => setImgOk(false)}
              loading="lazy"
              className="
                absolute inset-0
                block h-full w-full
                object-cover
                transform-gpu
                transition-transform duration-500 ease-out
                group-hover:scale-[1.06]
              "
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300" />
          )}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-transparent" />

          <div className="absolute left-3 bottom-3">
            <span
              className="
                inline-flex items-center
                rounded-full
                bg-white/90
                backdrop-blur-md
                px-3 py-1.5
                text-sm font-semibold
                text-slate-900
                shadow-sm
                truncate
              "
            >
              {destination.name}
            </span>
          </div>

          <div className="absolute right-3 top-3">
            <span
              className="
                inline-flex items-center justify-center
                h-9 w-9
                rounded-full
                bg-white/30
                backdrop-blur-md
                text-white
                shadow-sm
              "
            >
              <span className="text-[15px] leading-none">
                {weatherEmoji}
              </span>
            </span>
          </div>
        </div>
      </Link>

      {/* CONTENT */}
      <div className="p-5 flex-1 flex flex-col">

        {/* Row 1 */}
        <div className="flex justify-between items-center text-xs text-slate-600">
          <span
            className="inline-flex items-center rounded-full bg-slate-100 border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 truncate"
          >
            {destination.region || "—"}
          </span>

          <span className="inline-flex items-center gap-1 text-slate-500">
            <Clock size={14} />
            {destination.last_updated
              ? formatRelativeTime(destination.last_updated)
              : "—"}
          </span>
        </div>

        {/* Row 2 */}
        <div className="mt-3 flex justify-between items-center text-sm">
          <div className="inline-flex items-center gap-2 text-slate-700">
            <Thermometer size={16} className="text-slate-500" />
            <span className="font-semibold" style={{ color: BRAND_GREEN_DEEPEST }}>
              {destination.weather?.temp_c ?? "—"}°C
            </span>
          </div>

          <div className="inline-flex items-center gap-2 text-slate-700">
            <Landmark size={16} className="text-slate-500" />
            <span>{destination.civic_local || "Unknown"}</span>
          </div>
        </div>

        {/* Row 3 */}
        <div className="mt-3 flex justify-between items-center">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${risk.pill}`}
          >
            {risk.label}
          </span>

          <div className="inline-flex items-center gap-2 text-sm text-slate-700">
            <RouteIcon size={16} className="text-slate-500" />
            <span>{destination.road_access || "—"}</span>
          </div>
        </div>

        {/* Description */}
        <p
          className="mt-4 text-sm text-slate-600 leading-relaxed"
          style={clamp4}
        >
          {combinedDescription}
        </p>

        {/* Buttons */}
        <div className="mt-auto pt-5 grid grid-cols-2 gap-3">
          <Button to={`/tiss/destinations/${destination.slug}`} variant="primary" size="sm">
            More Info
          </Button>

          <Button
            to={`/tiss/route-updates?dest=${destination.slug}`}
            variant="outline"
            size="sm"
          >
            Route Updates
          </Button>
        </div>
      </div>
    </article>
  );
}