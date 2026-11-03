export const LIVE_UPDATE_CATEGORIES = ["all", "roads", "weather", "safety", "transport"];

export const mockLiveUpdatesSeed = [
  {
    id: "lu1",
    category: "roads",
    category_title: "Road Closure",
    location: "Skardu",
    route_name: "Jaglot–Skardu Road",
    status: "blocked", // blocked | warning | open
    severity: "high", // low | medium | high | critical
    description: "Blocked — Landslide near Sadpara. Avoid travel until cleared.",
    updated_minutes_ago: 5,
    map: {
      // used for iframe focus
      query: "Skardu, Pakistan",
      zoom: 11
    },
    popup: {
      problem_type: "Road Closure",
      cause: "Landslide near Sadpara",
      estimated_reopening: "Unknown (verify locally)"
    }
  },
  {
    id: "lu2",
    category: "weather",
    category_title: "Weather Alert",
    location: "Hunza",
    route_name: "Karakoram Highway (KKH)",
    status: "warning",
    severity: "critical",
    description: "Heavy snowfall — low visibility in higher sections. Travel with extreme caution.",
    updated_minutes_ago: 2,
    map: {
      query: "Hunza, Pakistan",
      zoom: 10
    },
    popup: {
      problem_type: "Heavy Snowfall",
      cause: "Snow + low visibility",
      estimated_reopening: "Monitor updates"
    }
  },
  {
    id: "lu3",
    category: "roads",
    category_title: "Road Open",
    location: "Naran",
    route_name: "Babusar Top",
    status: "open",
    severity: "low",
    description: "Open — generally clear for travel. Start early and keep buffer time.",
    updated_minutes_ago: 12,
    map: {
      query: "Naran, Pakistan",
      zoom: 11
    },
    popup: {
      problem_type: "Road Open",
      cause: "Clear conditions",
      estimated_reopening: "—"
    }
  },
  {
    id: "lu4",
    category: "transport",
    category_title: "Transport Update",
    location: "Islamabad",
    route_name: "Northbound departures",
    status: "warning",
    severity: "medium",
    description: "Delays possible due to congestion. Consider off-peak travel windows.",
    updated_minutes_ago: 18,
    map: {
      query: "Islamabad, Pakistan",
      zoom: 11
    },
    popup: {
      problem_type: "Delays",
      cause: "Congestion",
      estimated_reopening: "—"
    }
  }
];