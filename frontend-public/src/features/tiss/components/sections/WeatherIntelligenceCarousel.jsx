import { useMemo, useState } from "react";
import { Droplets, Wind, CloudRain, Snowflake, CalendarDays } from "lucide-react";
import Button from "../common/Button.jsx";

function cleanText(x) {
  const s = String(x || "").trim().replace(/\s+/g, " ");
  return s.length ? s : "";
}

function toNumber(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : null;
}

function formatUpdated(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString([], { weekday: "short", day: "2-digit", month: "short" });
}

function formatBtnDate(d) {
  try {
    return d.toLocaleDateString([], { day: "2-digit", month: "short" });
  } catch {
    return "—";
  }
}

function formatSelectedDate(d) {
  if (!d) return "—";
  try {
    return d.toLocaleDateString([], {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

function pickForecastDays(weather) {
  const candidates =
    weather?.forecast?.daily ||
    weather?.forecast?.days ||
    weather?.daily ||
    weather?.days ||
    weather?.forecast ||
    [];

  if (!Array.isArray(candidates)) return [];

  return candidates
    .map((x) => {
      const dateRaw =
        x?.date ||
        x?.day ||
        x?.dt ||
        x?.time ||
        x?.datetime ||
        x?.valid_date ||
        x?.forecast_date;

      const date = dateRaw ? new Date(dateRaw) : null;

      const minC = toNumber(
        x?.min_c ??
          x?.minC ??
          x?.temp_min_c ??
          x?.tempMinC ??
          x?.min_temp_c ??
          x?.minTempC
      );

      const maxC = toNumber(
        x?.max_c ??
          x?.maxC ??
          x?.temp_max_c ??
          x?.tempMaxC ??
          x?.max_temp_c ??
          x?.maxTempC
      );

      const condition =
        cleanText(x?.condition) ||
        cleanText(x?.summary) ||
        cleanText(x?.weather) ||
        cleanText(x?.weather_condition);

      const rainChance = toNumber(
        x?.rain_chance ??
          x?.rainChance ??
          x?.pop ??
          x?.precip_probability ??
          x?.precipProbability
      );

      const snowChance = toNumber(
        x?.snow_chance ??
          x?.snowChance ??
          x?.snow_probability ??
          x?.snowProbability
      );

      const windKph = toNumber(
        x?.wind_kph ?? x?.windKph ?? x?.wind_speed_kph ?? x?.windSpeedKph
      );

      const humidity = toNumber(x?.humidity ?? x?.humid);

      return {
        date: date && !Number.isNaN(date.getTime()) ? date : null,
        minC,
        maxC,
        condition,
        rainChance,
        snowChance,
        windKph,
        humidity,
      };
    })
    .filter((d) => d.date || d.minC != null || d.maxC != null || d.condition)
    .slice(0, 10);
}

function MetricCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white border border-slate-200 p-4">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <span className="text-slate-500" aria-hidden="true">
          {icon}
        </span>
        <span className="font-medium">{label}</span>
      </div>
      <div className="mt-2 text-lg font-bold text-slate-900 whitespace-nowrap">
        {value}
      </div>
    </div>
  );
}

export default function WeatherIntelligenceCarousel({
  weather,
  fetchedAtIso,
  staleWarning,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const today = useMemo(() => new Date(), []);
  const nextDays = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + (i + 1));
      return d;
    });
  }, [today]);

  const forecastDays = useMemo(() => pickForecastDays(weather), [weather]);

  const current = useMemo(() => {
    const tempC = toNumber(
      weather?.temp_c ??
        weather?.tempC ??
        weather?.temperature_c ??
        weather?.temperatureC
    );
    const condition = cleanText(weather?.condition) || cleanText(weather?.summary);

    const humidity = toNumber(weather?.humidity);
    const windKph = toNumber(weather?.wind_kph ?? weather?.windKph);

    const rainChance = toNumber(
      weather?.rain_chance ??
        weather?.rainChance ??
        weather?.pop ??
        weather?.precip_probability ??
        weather?.precipProbability
    );

    const snowChance = toNumber(
      weather?.snow_chance ??
        weather?.snowChance ??
        weather?.snow_probability ??
        weather?.snowProbability
    );

    return { tempC, condition, humidity, windKph, rainChance, snowChance };
  }, [weather]);

  const selected = useMemo(() => {
    if (selectedIndex === 0) {
      return {
        date: today,
        tempC: current.tempC,
        condition: current.condition,
        humidity: current.humidity,
        windKph: current.windKph,
        rainChance: current.rainChance,
        snowChance: current.snowChance,
      };
    }

    const wantedDate = nextDays[selectedIndex - 1];

    const match = forecastDays.find((f) => {
      if (!f.date || !wantedDate) return false;
      return (
        f.date.getFullYear() === wantedDate.getFullYear() &&
        f.date.getMonth() === wantedDate.getMonth() &&
        f.date.getDate() === wantedDate.getDate()
      );
    });

    if (match) {
      const displayTemp = match.maxC ?? match.minC ?? null;

      return {
        date: match.date || wantedDate,
        tempC: displayTemp,
        condition: match.condition || "Forecast not available",
        humidity: match.humidity,
        windKph: match.windKph,
        rainChance: match.rainChance,
        snowChance: match.snowChance,
      };
    }

    return {
      date: wantedDate,
      tempC: null,
      condition: "Forecast not available",
      humidity: null,
      windKph: null,
      rainChance: null,
      snowChance: null,
    };
  }, [selectedIndex, today, nextDays, forecastDays, current]);

  const buttons = useMemo(() => {
    return ["Today", ...nextDays.map((d) => formatBtnDate(d))];
  }, [nextDays]);

  return (
    <div className="rounded-2xl bg-white/10 border border-white/15 backdrop-blur p-4">
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-bold text-slate-900">Weather Intelligence</div>
            <div className="mt-1 text-sm text-slate-500">
              Updated: {fetchedAtIso ? formatUpdated(fetchedAtIso) : "—"}
            </div>
          </div>

          <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-900 border border-emerald-200">
            Live
          </span>
        </div>

        {/* Current Forecast row */}
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Current Forecast
          </div>

          <div className="rounded-2xl bg-slate-50 border border-slate-200 px-4 py-3 text-right">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              Forecast
            </div>
            <div className="mt-1 text-sm font-semibold text-slate-900">
              5 days available
            </div>
          </div>
        </div>

        {/* Main panel */}
        <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200 p-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-5">
              <div className="text-4xl font-extrabold text-slate-900 leading-none">
                {selected.tempC != null ? `${selected.tempC}°C` : "—"}
              </div>

              <div className="mt-3 text-base font-semibold text-slate-700">
                {selected.condition || "—"}
              </div>

              <div className="mt-4 flex items-start gap-2 text-sm text-slate-600">
                <CalendarDays size={16} className="mt-0.5 text-slate-500" />
                <div>
                  <span className="font-semibold text-slate-700">Selected:</span>{" "}
                  {formatSelectedDate(selected.date)}
                </div>
              </div>

              {staleWarning ? (
                <div className="mt-4 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-2">
                  Weather may be stale. Please re-check before travel.
                </div>
              ) : null}
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <MetricCard
                icon={<Droplets size={16} />}
                label="Humidity"
                value={selected.humidity != null ? `${selected.humidity}%` : "—"}
              />
              <MetricCard
                icon={<Wind size={16} />}
                label="Wind"
                value={selected.windKph != null ? `${selected.windKph} km/h` : "—"}
              />
              <MetricCard
                icon={<CloudRain size={16} />}
                label="Rain %"
                value={selected.rainChance != null ? `${selected.rainChance}%` : "—"}
              />
              <MetricCard
                icon={<Snowflake size={16} />}
                label="Snow %"
                value={selected.snowChance != null ? `${selected.snowChance}%` : "—"}
              />
            </div>
          </div>
        </div>

        {/* Day buttons */}
        <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-3">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {buttons.map((label, idx) => {
              const isActive = idx === selectedIndex;

              return (
                <Button
                  key={`${label}-${idx}`}
                  size="sm"
                  variant="soft"
                  onClick={() => setSelectedIndex(idx)}
                  className={[
                    "w-full justify-center px-3 text-[12px] sm:text-[13px]",
                    isActive ? "bg-slate-200 border-slate-300" : "",
                  ].join(" ")}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </div>

        {/* ✅ Tip below day buttons (like your screenshot) */}
        <div className="mt-2 text-xs text-slate-500">
          Tip: Tap a date to view the forecast for that day.
        </div>
      </div>
    </div>
  );
}