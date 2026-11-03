export function createDefaultReviews({
  placeName = "this destination",
} = {}) {
  const safePlaceName =
    String(placeName).trim() || "this destination";

  const placeKey = safePlaceName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return [
    {
      id: `${placeKey}-review-1`,
      rating: 5,
      quote: `${safePlaceName} offered a memorable experience with beautiful surroundings and welcoming local communities.`,
      name: "Ayesha Khan",
      date: "Recent visit",
    },

    {
      id: `${placeKey}-review-2`,
      rating: 4,
      quote: `A rewarding trip with impressive views, cultural character, and plenty of opportunities to explore.`,
      name: "Bilal Ahmed",
      date: "Recent visit",
    },
  ];
}

export const DEFAULT_REVIEWS =
  createDefaultReviews();