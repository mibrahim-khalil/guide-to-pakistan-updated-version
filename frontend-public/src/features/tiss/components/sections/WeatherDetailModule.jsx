import { useMemo, useState } from "react";
import Button from "../common/Button.jsx";

function cleanText(x) {
  const s = String(x || "").trim();
  return s.length ? s : "";
}

function toNumber(x) {
  const n = Number(x);
  return Number.isFinite(n) ? n : null;
}

function formatBtnDate(d) {
  try {
    return d.toLocaleDateString([], { day: "2-digit", month: "short" }); // 01 Jul
  } catch {
    return "—";
  }
}

function formatUpdated(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString([], { weekday: "short", day: "2-digit", month: "short" }); // Tue 30 Jun
}

function formatSelectedDateLines(d) {
  if (!d) return { line1: "—", line2: "" };

  try {
    const weekday = d.toLocaleDateString([], { weekday: "long" }); // Thursday
    const rest = d.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" }); // 02 Jul 2026
    return { line1: `${weekday},`, line2: rest };
  } catch {
    return { line1: "—", line2: "" };
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

      return {
        date: date && !Number.isNaN(date.getTime()) ? date : null,
        minC,
        maxC,
        condition,
        rainChance,
        snowChance,
        windKph,
      };
    })
    .filter((d) => d.date || d.minC != null || d.maxC != null || d.condition)
    .slice(0, 10);
}

export default function WeatherIntelligenceCarousel({
  weather,
  fetchedAtIso,
  staleWarning,
}) {
  // 0 = Today, 1..5 = next days
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
        kind: "today",
        date: today,
        tempC: current.tempC,
        condition: current.condition,
        minC: null,
        maxC: null,
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
      const displayTemp =
        match.maxC != null
          ? match.maxC
          : match.minC != null
            ? match.minC
            : null;

      return {
        kind: "forecast",
        date: match.date || wantedDate,
        tempC: displayTemp,
        condition: match.condition,
        minC: match.minC,
        maxC: match.maxC,
        humidity: null,
        windKph: match.windKph,
        rainChance: match.rainChance,
        snowChance: match.snowChance,
      };
    }

    return {
      kind: "forecast",
      date: wantedDate,
      tempC: null,
      condition: "Forecast not available",
      minC: null,
      maxC: null,
      humidity: null,
      windKph: null,
      rainChance: null,
      snowChance: null,
    };
  }, [selectedIndex, today, nextDays, forecastDays, current]);

  const dateLines = useMemo(
    () => formatSelectedDateLines(selected.date),
    [selected.date]
  );

  // ✅ Buttons: Today + next 5 days (NO SWAP LOGIC)
  const buttons = useMemo(() => {
    return ["Today", ...nextDays.map((d) => formatBtnDate(d))];
  }, [nextDays]);

  return (
    <div className="rounded-2xl bg-slate-100/70 border border-slate-200 p-4">
      <div className="rounded-2xl bg-white border border-slate-200 p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-bold text-slate-900">
              Weather Intelligence
            </div>
            <div className="mt-1 text-sm text-slate-500">
              Updated: {fetchedAtIso ? formatUpdated(fetchedAtIso) : "—"}
            </div>
          </div>

          <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-900 border border-emerald-200">
            Live
          </span>
        </div>

        {/* Main content */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Big CURRENT/FORECAST card */}
          <div className="md:col-span-5 rounded-2xl bg-slate-50 border border-slate-200 p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="text-xs font-extrabold tracking-wider text-slate-500 uppercase">
                {selectedIndex === 0 ? "Current" : "Forecast"}
              </div>

              {/* ✅ Clean two-line aligned date like your reference */}
              <div className="text-right leading-tight">
                <div className="text-xs font-semibold text-slate-600">
                  {dateLines.line1}
                </div>
                <div className="text-xs font-semibold text-slate-600">
                  {dateLines.line2}
                </div>
              </div>
            </div>

            <div className="mt-4 text-4xl font-extrabold text-slate-900 leading-none">
              {selected.tempC != null ? `${selected.tempC}°C` : "—"}
            </div>

            <div className="mt-3 text-base font-semibold text-slate-700">
              {selected.condition || "—"}
            </div>

            {selected.kind === "forecast" && (selected.minC != null || selected.maxC != null) ? (
              <div className="mt-2 text-sm text-slate-700">
                Min / Max:{" "}
                <span className="font-semibold text-slate-900">
                  {selected.minC != null ? `${selected.minC}°` : "—"} /{" "}
                  {selected.maxC != null ? `${selected.maxC}°` : "—"}
                </span>
              </div>
            ) : null}

            {staleWarning ? (
              <div className="mt-4 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-2">
                Weather may be stale. Please re-check before travel.
              </div>
            ) : null}
          </div>

          {/* Metrics 2x2 */}
          <div className="md:col-span-7 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-white border border-slate-200 p-5">
              <div className="text-sm text-slate-500">Humidity</div>
              <div className="mt-2 text-lg font-bold text-slate-900">
                {selected.humidity != null ? `${selected.humidity}%` : "—"}
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-5">
              <div className="text-sm text-slate-500">Wind</div>
              <div className="mt-2 text-lg font-bold text-slate-900">
                {selected.windKph != null ? `${selected.windKph} km/h` : "—"}
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-5">
              <div className="text-sm text-slate-500">Rain %</div>
              <div className="mt-2 text-lg font-bold text-slate-900">
                {selected.rainChance != null ? `${selected.rainChance}%` : "—"}
              </div>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 p-5">
              <div className="text-sm text-slate-500">Snow %</div>
              <div className="mt-2 text-lg font-bold text-slate-900">
                {selected.snowChance != null ? `${selected.snowChance}%` : "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Button strip */}
        <div className="mt-6 rounded-2xl bg-slate-50 border border-slate-200 p-3">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar px-1 pr-10">
            {buttons.map((label, idx) => {
              const isActive = idx === selectedIndex;

              return (
                <Button
                  key={`${label}-${idx}`}
                  size="sm"
                  variant={isActive ? "dark" : "soft"}
                  onClick={() => setSelectedIndex(idx)}
                  className="min-w-[82px] justify-center shrink-0"
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}