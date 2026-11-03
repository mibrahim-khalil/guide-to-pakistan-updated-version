export const mockAdvisories = [
  {
    id: "a1",
    title: "Heavy rain risk in upper valleys",
    region: "Khyber Pakhtunkhwa",
    destination_id: "d3",
    advisory_type: "weather",
    severity: "high",
    advisory_text:
      "Rainfall may affect visibility and road conditions. Travel only if necessary and keep plans flexible.",
    recommended_action: "Carry rain gear and confirm road status before departure.",
    source_reference: "Local updates (field team)",
    valid_from: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    valid_until: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    is_published: true,
    published_at: new Date(Date.now() - 90 * 60 * 1000).toISOString()
  },
  {
    id: "a2",
    title: "Emergency: Temporary access restrictions reported",
    region: "Multiple regions",
    destination_id: null,
    advisory_type: "emergency",
    severity: "critical",
    advisory_text:
      "Authorities may temporarily restrict access in certain zones. Verify before travel and follow official instructions.",
    recommended_action: "Delay travel until confirmation is available.",
    source_reference: "Authorities / official announcements (when available)",
    valid_from: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    valid_until: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
    is_published: true,
    published_at: new Date(Date.now() - 25 * 60 * 1000).toISOString()
  },
  {
    id: "a3",
    title: "Seasonal crowding expected on weekends",
    region: "Punjab / KP",
    destination_id: null,
    advisory_type: "crowd",
    severity: "medium",
    advisory_text:
      "Popular spots may be crowded on weekends. Start early and keep extra time for travel.",
    recommended_action: "Travel early morning and keep flexible timing.",
    source_reference: "Operations team",
    valid_from: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    is_published: true,
    published_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  }
];