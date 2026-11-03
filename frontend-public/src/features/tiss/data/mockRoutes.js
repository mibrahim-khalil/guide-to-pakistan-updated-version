export const mockRoutes = [
  {
    id: "r1",
    name: "Islamabad → Hunza (KKH N-35)",
    slug: "islamabad-to-hunza-kkh",
    from_place: "Islamabad",
    to_place: "Hunza",
    status: "delayed",
    cause: "Maintenance and intermittent slow traffic",
    caution_note: "Plan extra travel time and start early.",
    source_type: "admin",
    last_updated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "r2",
    name: "Naran → Babusar Top",
    slug: "naran-to-babusar-top",
    from_place: "Naran",
    to_place: "Babusar Top",
    status: "closed",
    cause: "Snow / clearance in progress",
    caution_note: "Avoid this route until reopened by authorities.",
    source_type: "manual",
    last_updated: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "r3",
    name: "Mingora → Kalam (N-95)",
    slug: "mingora-to-kalam",
    from_place: "Mingora",
    to_place: "Kalam",
    status: "unknown",
    cause: "",
    caution_note: "",
    source_type: "manual",
    last_updated: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  }
];