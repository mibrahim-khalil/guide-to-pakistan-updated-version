export const mockRouteFieldUpdates = [
  {
    id: "rfu1",
    route_slug: "naran-to-babusar-top",
    reporter_name: "Umar (Guide)",
    region: "Babusar approach",
    status: "red",
    severity: "high",
    description: "Road blocked due to snow clearance. Vehicles are turning back. Avoid travel until officially reopened.",
    published_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "rfu2",
    route_slug: "islamabad-to-hunza-kkh",
    reporter_name: "Ali (Guide)",
    region: "KKH mid-section",
    status: "amber",
    severity: "medium",
    description: "Slow traffic near maintenance zones. No full closures observed, but delays are likely.",
    published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "rfu3",
    route_slug: "islamabad-to-hunza-kkh",
    reporter_name: "Sara (Field)",
    region: "Near viewpoint stops",
    status: "green",
    severity: "low",
    description: "Route generally passable. Start early to avoid congestion near popular stops.",
    published_at: new Date(Date.now() - 40 * 60 * 1000).toISOString()
  }
];