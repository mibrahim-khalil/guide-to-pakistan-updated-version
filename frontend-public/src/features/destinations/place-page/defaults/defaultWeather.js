export function createDefaultWeather({
  baseTemperature = 22,
  condition = "Partly cloudy",
  updated = "Recently updated",
} = {}) {
  const safeBaseTemperature = Number(baseTemperature) || 22;

  const forecastDays = [
    {
      label: "Today",
      offset: 0,
      temperatureOffset: 0,
      condition,
      wind: "10 km/h",
    },
    {
      label: "Tomorrow",
      offset: 1,
      temperatureOffset: 1,
      condition: "Mostly sunny",
      wind: "9 km/h",
    },
    {
      label: "Day 3",
      offset: 2,
      temperatureOffset: -1,
      condition: "Partly cloudy",
      wind: "12 km/h",
    },
    {
      label: "Day 4",
      offset: 3,
      temperatureOffset: 2,
      condition: "Clear",
      wind: "8 km/h",
    },
    {
      label: "Day 5",
      offset: 4,
      temperatureOffset: 0,
      condition: "Light clouds",
      wind: "11 km/h",
    },
  ];

  const today = new Date();

  return {
    updated,
    availableDays: forecastDays.length,

    days: forecastDays.map((day) => {
      const date = new Date(today);

      date.setDate(today.getDate() + day.offset);

      return {
        label: day.label,

        date: date.toISOString().slice(0, 10),

        forecast: {
          temperature:
            safeBaseTemperature +
            day.temperatureOffset,

          condition: day.condition,

          humidity: "55%",

          wind: day.wind,

          rain: "10%",

          snow: "0%",
        },
      };
    }),
  };
}

export const DEFAULT_WEATHER =
  createDefaultWeather();