export const mockLatestReport = {
  id: "w3",
  title: "Weekly Tourist Support Report — Northern Pakistan",
  week_start: "2026-06-10",
  week_end: "2026-06-16"
};

// Public archive mock data (pretend these are published)
export const mockReports = [
  {
    id: "w3",
    title: "Weekly Tourist Support Report — Northern Pakistan",
    week_start: "2026-06-10",
    week_end: "2026-06-16",
    status: "published",
    published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    content_json: {
      overview:
        "Overall conditions are mixed across the north. Some destinations remain stable, while a few routes may experience delays.",
      best_destinations: ["Skardu", "Hunza"],
      caution_areas: ["Naran (weather disruption possible)"],
      weather_summary:
        "Expect mild days with cooler evenings. Rain chances remain higher in some valleys.",
      road_summary:
        "Key highways are generally passable, but delays may occur near maintenance zones and narrow sections.",
      safety_notes:
        "Avoid night driving in remote areas. Keep buffer time and verify road status before departure.",
      recommended_windows: ["Early morning departures", "Mid-week travel for fewer crowds"],
      packing_suggestions:
        "Layered clothing, a light rain jacket, and comfortable footwear are recommended.",
      top_experiences: ["Sunrise viewpoints", "Local food stops", "Easy day hikes"],
      cta_text:
        "Need help planning? Contact Guide to Pakistan for reliable local support and bookings."
    },
    html_content: ""
  },
  {
    id: "w2",
    title: "Weekly Tourist Support Report — Northern Pakistan",
    week_start: "2026-06-03",
    week_end: "2026-06-09",
    status: "published",
    published_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    content_json: {
      overview:
        "Conditions were generally stable with occasional weather shifts in higher elevations.",
      best_destinations: ["Skardu", "Murree"],
      caution_areas: ["Babusar Top approach (monitor updates)"],
      weather_summary:
        "Cool evenings; daytime temperatures comfortable. Brief rain possible in pockets.",
      road_summary:
        "Most routes open with intermittent congestion around popular stops.",
      safety_notes:
        "Carry water and basic first aid. Keep a power bank and offline maps.",
      recommended_windows: ["Depart early to avoid traffic", "Plan return before sunset"],
      packing_suggestions:
        "Light jacket, sunscreen, and rain protection for uncertain conditions.",
      top_experiences: ["Lakeside walks", "Cultural markets", "Scenic drives"],
      cta_text:
        "For on-ground guidance, reach out to Guide to Pakistan."
    },
    html_content: ""
  },
  {
    id: "w1",
    title: "Weekly Tourist Support Report — Northern Pakistan",
    week_start: "2026-05-27",
    week_end: "2026-06-02",
    status: "published",
    published_at: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000).toISOString(),
    content_json: {
      overview:
        "Early season patterns continue. Some regions are improving, but weather remains variable.",
      best_destinations: ["Hunza"],
      caution_areas: ["Naran Valley (rain risk)"],
      weather_summary:
        "Variable conditions; pack for cool mornings and possible rain.",
      road_summary:
        "Main routes mostly passable; delays possible after rainfall.",
      safety_notes:
        "Verify local updates, avoid risky detours, and keep travel flexible.",
      recommended_windows: ["Morning travel windows"],
      packing_suggestions:
        "Warm layer + rain layer + sturdy shoes.",
      top_experiences: ["Valley viewpoints", "Local cafés", "Short hikes"],
      cta_text:
        "Contact Guide to Pakistan for help with route planning and bookings."
    },
    html_content: ""
  }
];