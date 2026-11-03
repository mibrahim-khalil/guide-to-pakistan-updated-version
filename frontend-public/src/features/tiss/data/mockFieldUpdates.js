export const mockFieldUpdates = [
  {
    id: "fu1",
    destination_id: "d1",
    route_id: "r1",
    reporter_name: "Ali (Guide)",
    region: "Upper Hunza",
    status: "amber",
    severity: "medium",
    description: "Road is passable but slow-moving traffic near narrow sections. Start early and keep buffer time.",
    workflow_state: "published",
    published_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "fu2",
    destination_id: "d1",
    route_id: null,
    reporter_name: "Sara (Field)",
    region: "Karimabad",
    status: "green",
    severity: "low",
    description: "Weather is mild and sightseeing areas are accessible. Crowds are moderate in the afternoon.",
    workflow_state: "published",
    published_at: new Date(Date.now() - 20 * 60 * 1000).toISOString()
  },
  {
    id: "fu3",
    destination_id: "d3",
    route_id: "r2",
    reporter_name: "Umar (Guide)",
    region: "Naran Valley",
    status: "red",
    severity: "high",
    description: "Heavy rain and reduced visibility reported. Some travellers are turning back. Recommend postponing.",
    workflow_state: "published",
    published_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  }
];