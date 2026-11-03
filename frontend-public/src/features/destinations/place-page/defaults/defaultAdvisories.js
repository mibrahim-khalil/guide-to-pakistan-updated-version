export function createDefaultAdvisories({
  placeName = "this destination",
  risk = "Low",
  status = "Active",
  updatedAgo = "Recently updated",
} = {}) {
  return [
    {
      id: `${String(placeName)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")}-advisory-1`,

      risk,

      status,

      updatedAgo,

      title: `General travel guidance for ${placeName}`,

      summary:
        "Travel conditions may change depending on weather, traffic, local events, and road accessibility. Check current information before departure.",

      items: [
        {
          icon: "road",
          title: "Road conditions",
          text:
            "Confirm route accessibility and allow extra travel time where needed.",
        },

        {
          icon: "people",
          title: "Local guidance",
          text:
            "Follow instructions from local authorities and respect community practices.",
        },

        {
          icon: "event",
          title: "Activities",
          text:
            "Outdoor plans may change due to weather or local conditions.",
        },
      ],

      recommendedAction:
        "Verify the latest route and weather information before travelling.",
    },
  ];
}

export const DEFAULT_ADVISORIES =
  createDefaultAdvisories();