import heroImg from "../../../../assets/images/hero/hero.jpeg";

export const DEFAULT_PLACE = {
  slug: "",
  name: "Destination",
  regionSlug: "",
  regionName: "",

  hero: {
    image: heroImg,
    category: "Destination",
    risk: "Low Risk",
    summary:
      "Explore the destination, understand local conditions, and plan your journey with current travel guidance.",
    updatedAgo: "Recently updated",
    roadAccess: "Check before travel",
  },

  overview: {
    label: "Local identity",

    paragraphs: [
      "This destination is shaped by its landscape, history, communities, and local traditions.",
      "Visitors can explore its culture, hospitality, food, and natural surroundings.",
    ],

    image: heroImg,

    expandedContent: {
      cuisine: {
        label: "Famous Cuisine",
        paragraphs: [
          "Local cuisine reflects regional ingredients and traditional cooking methods.",
          "Food remains an important part of hospitality and community life.",
        ],
      },

      traditionalDish: {
        label: "Traditional cultural dish",
        image: heroImg,
      },

      socialLife: {
        label: "Social life",
        paragraphs: [
          "Community life is shaped by family connections, local markets, and shared public spaces.",
          "Visitors are encouraged to respect local customs and community practices.",
        ],
      },

      socialImage: heroImg,
    },
  },

  placesToVisit: [],

  weather: null,

  advisories: [],

  reviews: [],
};