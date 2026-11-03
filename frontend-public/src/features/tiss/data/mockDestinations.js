export const mockDestinations = [
  {
    id: "d1",
    name: "Hunza",
    slug: "hunza",
    region: "Gilgit-Baltistan",
    image_url: "/assets/destinations/hunza.jpg",
    status: "amber",
    status_label: "Caution Advised",
    civic_local: "Normal",
    short_advisory:
      "Some road delays reported. Travel with buffer time and check local updates. If you are travelling early morning or late evening, keep extra water and snacks, and confirm road status from local authorities or trusted operators before departure.",
    recommended_for: "Families, Trekkers",
    is_active: true,
    last_updated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    road_access: "Delays possible",
    weather: {
      temp_c: 18,
      feels_like_c: 16,
      condition: "Partly Cloudy",
      icon_code: "03d",
      humidity_pct: 72,
      wind_kph: 14,
      rain_prob_pct: 30,
      snow_prob_pct: 0,
      forecast: [
        { date: "2026-06-18", min_c: 12, max_c: 20, condition: "Partly Cloudy", icon_code: "03d" },
        { date: "2026-06-19", min_c: 11, max_c: 19, condition: "Clear", icon_code: "01d" },
        { date: "2026-06-20", min_c: 10, max_c: 18, condition: "Light Rain", icon_code: "10d" }
      ],
      ai_summary:
        "Hunza is experiencing mild, comfortable weather with partly cloudy skies. Expect cooler evenings and brief changes in conditions, especially if you’re heading toward higher viewpoints. Keep plans flexible and check road conditions if you’re traveling early or late in the day.",
      packing_tip: "Packing tip: Bring a light jacket for evenings and comfortable walking shoes."
    }
  },
  {
    id: "d2",
    name: "Skardu",
    slug: "skardu",
    region: "Gilgit-Baltistan",
    image_url:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
    status: "green",
    status_label: "Open for Travel",
    civic_local: "Normal",
    short_advisory:
      "Some road delays reported. Travel with buffer time and check local updates. If you are travelling early morning or late evening, keep extra water and snacks, and confirm road status from local authorities or trusted operators before departure.",
    recommended_for: "Couples, Photographers",
    is_active: true,
    last_updated: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
    road_access: "Open",
    weather: {
      temp_c: 16,
      feels_like_c: 15,
      condition: "Clear",
      icon_code: "01d",
      humidity_pct: 45,
      wind_kph: 9,
      rain_prob_pct: 10,
      snow_prob_pct: 0,
      forecast: [
        { date: "2026-06-18", min_c: 9, max_c: 17, condition: "Clear", icon_code: "01d" },
        { date: "2026-06-19", min_c: 8, max_c: 16, condition: "Clear", icon_code: "01d" },
        { date: "2026-06-20", min_c: 8, max_c: 15, condition: "Partly Cloudy", icon_code: "03d" }
      ],
      ai_summary:
        "Skardu is stable with clear conditions and pleasant daytime temperatures. Evenings can feel cool, especially near water and open valleys. If you’re sightseeing, start early for the best visibility.",
      packing_tip: "Packing tip: Carry a light layer and sun protection for daytime travel."
    }
  },
  {
    id: "d3",
    name: "Naran",
    slug: "naran",
    region: "Khyber Pakhtunkhwa",
    image_url:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80",
    status: "red",
    status_label: "Avoid",
    civic_local: "Disruption",
    short_advisory: "Heavy disruption reported in some areas. Consider postponing travel.",
    recommended_for: "",
    is_active: true,
    last_updated: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    road_access: "High risk",
    weather: {
      temp_c: 9,
      feels_like_c: 7,
      condition: "Rain",
      icon_code: "10d",
      humidity_pct: 86,
      wind_kph: 18,
      rain_prob_pct: 70,
      snow_prob_pct: 5,
      forecast: [
        { date: "2026-06-18", min_c: 5, max_c: 10, condition: "Rain", icon_code: "10d" },
        { date: "2026-06-19", min_c: 4, max_c: 9, condition: "Rain", icon_code: "10d" },
        { date: "2026-06-20", min_c: 3, max_c: 8, condition: "Showers", icon_code: "09d" }
      ],
      ai_summary:
        "Conditions in Naran are wet and can affect visibility and road safety. If you must travel, allow extra time and avoid driving in low visibility. Check local updates before departure.",
      packing_tip: "Packing tip: Pack a waterproof jacket and keep essentials in a dry bag."
    }
  },
  {
    id: "d4",
    name: "Murree",
    slug: "murree",
    region: "Punjab",
    image_url:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    status: "grey",
    status_label: "Unknown",
    civic_local: "Unknown",
    short_advisory: "",
    recommended_for: "",
    is_active: true,
    last_updated: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    road_access: "Unknown",
    weather: {
      temp_c: 12,
      feels_like_c: 11,
      condition: "Cloudy",
      icon_code: "04d",
      humidity_pct: 63,
      wind_kph: 10,
      rain_prob_pct: 40,
      snow_prob_pct: 0,
      forecast: [
        { date: "2026-06-18", min_c: 9, max_c: 13, condition: "Cloudy", icon_code: "04d" },
        { date: "2026-06-19", min_c: 8, max_c: 12, condition: "Partly Cloudy", icon_code: "03d" },
        { date: "2026-06-20", min_c: 8, max_c: 12, condition: "Light Rain", icon_code: "10d" }
      ],
      ai_summary:
        "Murree is currently cloudy with mild temperatures. Conditions can shift quickly, especially later in the day. Keep an umbrella or light rain layer handy.",
      packing_tip: "Packing tip: Carry a light rain layer and comfortable shoes."
    }
  },

  // +++++++++++++++ 5 NEW DESTINATIONS +++++++++++++++

  {
    id: "d5",
    name: "Gilgit",
    slug: "gilgit",
    region: "Gilgit-Baltistan",
    image_url:
      "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80",
    status: "green",
    status_label: "Open for Travel",
    civic_local: "Normal",
    short_advisory:
      "Conditions are generally stable. Allow extra time for short traffic slowdowns in town and verify any mountain road plans before departure.",
    recommended_for: "Families, Road Trips",
    is_active: true,
    last_updated: new Date(Date.now() - 75 * 60 * 1000).toISOString(),
    road_access: "Open",
    weather: {
      temp_c: 21,
      feels_like_c: 20,
      condition: "Clear",
      icon_code: "01d",
      humidity_pct: 38,
      wind_kph: 11,
      rain_prob_pct: 15,
      snow_prob_pct: 0,
      forecast: [
        { date: "2026-06-18", min_c: 13, max_c: 22, condition: "Clear", icon_code: "01d" },
        { date: "2026-06-19", min_c: 12, max_c: 21, condition: "Partly Cloudy", icon_code: "03d" },
        { date: "2026-06-20", min_c: 12, max_c: 20, condition: "Clear", icon_code: "01d" }
      ],
      ai_summary:
        "Gilgit is experiencing clear, comfortable conditions. Daytime travel is pleasant, while evenings can cool down. If you’re heading toward higher valleys, carry a layer and plan daylight driving.",
      packing_tip: "Packing tip: Carry a light layer for evenings and sun protection for daytime."
    }
  },
  {
    id: "d6",
    name: "Swat (Mingora)",
    slug: "swat-mingora",
    region: "Khyber Pakhtunkhwa",
    image_url:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80",
    status: "amber",
    status_label: "Caution Advised",
    civic_local: "Caution",
    short_advisory:
      "Traffic and local congestion can slow travel during peak hours. Keep flexible timing and verify route status if traveling toward Kalam.",
    recommended_for: "Families, Couples",
    is_active: true,
    last_updated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    road_access: "Delays possible",
    weather: {
      temp_c: 24,
      feels_like_c: 25,
      condition: "Humid",
      icon_code: "02d",
      humidity_pct: 68,
      wind_kph: 8,
      rain_prob_pct: 45,
      snow_prob_pct: 0,
      forecast: [
        { date: "2026-06-18", min_c: 18, max_c: 26, condition: "Cloudy", icon_code: "04d" },
        { date: "2026-06-19", min_c: 17, max_c: 25, condition: "Light Rain", icon_code: "10d" },
        { date: "2026-06-20", min_c: 16, max_c: 24, condition: "Partly Cloudy", icon_code: "03d" }
      ],
      ai_summary:
        "Swat (Mingora) is warm and slightly humid with a higher chance of brief rain. Keep a flexible plan and allow extra time if heading toward narrower valley roads.",
      packing_tip: "Packing tip: Pack a light rain layer and comfortable shoes."
    }
  },
  {
    id: "d7",
    name: "Kalam",
    slug: "kalam",
    region: "Khyber Pakhtunkhwa",
    image_url:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80",
    status: "amber",
    status_label: "Caution Advised",
    civic_local: "Normal",
    short_advisory:
      "Mountain road travel may be slow in places. Prefer daytime driving and keep buffer time for valley routes.",
    recommended_for: "Nature Lovers, Families",
    is_active: true,
    last_updated: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    road_access: "Slow in sections",
    weather: {
      temp_c: 17,
      feels_like_c: 16,
      condition: "Light Rain",
      icon_code: "10d",
      humidity_pct: 75,
      wind_kph: 12,
      rain_prob_pct: 55,
      snow_prob_pct: 10,
      forecast: [
        { date: "2026-06-18", min_c: 10, max_c: 18, condition: "Light Rain", icon_code: "10d" },
        { date: "2026-06-19", min_c: 9, max_c: 17, condition: "Showers", icon_code: "09d" },
        { date: "2026-06-20", min_c: 9, max_c: 16, condition: "Partly Cloudy", icon_code: "03d" }
      ],
      ai_summary:
        "Kalam is cool and damp with a higher chance of rain. Road travel may be slower, so plan daylight driving and keep warm layers for evenings.",
      packing_tip: "Packing tip: Bring a warm layer and a waterproof jacket."
    }
  },
  {
    id: "d8",
    name: "Neelum Valley",
    slug: "neelum-valley",
    region: "Azad Jammu & Kashmir",
    image_url:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1600&q=80",
    status: "green",
    status_label: "Open for Travel",
    civic_local: "Normal",
    short_advisory:
      "Generally stable conditions. Expect occasional slow traffic on narrow roads and start early for long drives.",
    recommended_for: "Couples, Scenic Drives",
    is_active: true,
    last_updated: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
    road_access: "Open",
    weather: {
      temp_c: 20,
      feels_like_c: 19,
      condition: "Partly Cloudy",
      icon_code: "03d",
      humidity_pct: 58,
      wind_kph: 10,
      rain_prob_pct: 35,
      snow_prob_pct: 0,
      forecast: [
        { date: "2026-06-18", min_c: 13, max_c: 21, condition: "Partly Cloudy", icon_code: "03d" },
        { date: "2026-06-19", min_c: 12, max_c: 20, condition: "Clear", icon_code: "01d" },
        { date: "2026-06-20", min_c: 12, max_c: 19, condition: "Cloudy", icon_code: "04d" }
      ],
      ai_summary:
        "Neelum Valley is mild with comfortable daytime temperatures. Roads can be narrow in places, so allow extra time and prefer daytime travel.",
      packing_tip: "Packing tip: Carry a light layer and keep water/snacks for longer drives."
    }
  },
  {
    id: "d9",
    name: "Chitral",
    slug: "chitral",
    region: "Khyber Pakhtunkhwa",
    image_url:
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1600&q=80",
    status: "grey",
    status_label: "Unknown",
    civic_local: "Unknown",
    short_advisory:
      "Information is currently limited. Verify road status and local conditions before departure.",
    recommended_for: "Experienced Travellers",
    is_active: true,
    last_updated: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    road_access: "Unknown",
    weather: {
      temp_c: 19,
      feels_like_c: 18,
      condition: "Cloudy",
      icon_code: "04d",
      humidity_pct: 54,
      wind_kph: 13,
      rain_prob_pct: 42,
      snow_prob_pct: 0,
      forecast: [
        { date: "2026-06-18", min_c: 11, max_c: 19, condition: "Cloudy", icon_code: "04d" },
        { date: "2026-06-19", min_c: 10, max_c: 18, condition: "Light Rain", icon_code: "10d" },
        { date: "2026-06-20", min_c: 10, max_c: 18, condition: "Partly Cloudy", icon_code: "03d" }
      ],
      ai_summary:
        "Chitral conditions are currently uncertain due to limited recent updates. If traveling, confirm road status and weather locally, and keep your plan flexible.",
      packing_tip: "Packing tip: Pack layers and a rain layer in case conditions shift."
    }
  }
];