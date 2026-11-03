/* =========================================================
   BOOK NOW — BOOKING MODE DATA
========================================================= */

export const bookingModeData = {
  eyebrow: "Book Your Way",

  title: "How would you like to explore Pakistan?",

  description:
    "Choose the journey style that suits you. Start with a personalized trip, select one of our curated tours, or plan travel for a larger group.",

  options: [
    {
      id: "custom-trip",

      number: "01",

      label: "Personalized Journey",

      title: "Build a Custom Trip",

      description:
        "Choose your destinations, dates, travel style, transport, accommodation, and experiences to create a journey around you.",

      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",

      imageAlt: "Mountain landscape for a custom Pakistan journey",

      actionLabel: "Build Your Trip",

      type: "custom",
    },

    {
      id: "ready-tour",

      number: "02",

      label: "Curated Experiences",

      title: "Choose a Ready-Made Tour",

      description:
        "Explore carefully planned tours with destinations, routes, stays, and experiences already brought together for you.",

      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",

      imageAlt: "Scenic travel experience",

      actionLabel: "Explore Tours",

      type: "tour",
    },

    {
      id: "group-travel",

      number: "03",

      label: "Travel Together",

      title: "Group & Corporate Travel",

      description:
        "Planning for a family, organization, company, university, or larger group? Let our team help coordinate the journey.",

      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",

      imageAlt: "Group travel experience",

      actionLabel: "Plan Group Travel",

      type: "group",
    },
  ],
};
/* =========================================================
   BOOKING PLANNER — REGIONS
========================================================= */

export const bookingRegions = [
  {
    id: "gilgit-baltistan",
    name: "Gilgit-Baltistan",
    shortName: "GB",
    description: "Mountains, valleys, lakes & adventure",
    places: ["Hunza", "Skardu", "Khaplu", "Shigar", "Gilgit", "Fairy Meadows"],
  },

  {
    id: "khyber-pakhtunkhwa",
    name: "Khyber Pakhtunkhwa",
    shortName: "KPK",
    description: "Valleys, forests, heritage & mountains",
    places: ["Swat", "Kalam", "Chitral", "Kumrat", "Naran", "Kaghan"],
  },

  {
    id: "punjab",
    name: "Punjab",
    shortName: "Punjab",
    description: "History, culture, food & architecture",
    places: ["Lahore", "Murree", "Taxila", "Khewra", "Bahawalpur", "Multan"],
  },

  {
    id: "sindh",
    name: "Sindh",
    shortName: "Sindh",
    description: "Heritage, coastline, culture & cities",
    places: [
      "Karachi",
      "Thatta",
      "Mohenjo-daro",
      "Sehwan",
      "Hyderabad",
      "Gorakh Hill",
    ],
  },

  {
    id: "balochistan",
    name: "Balochistan",
    shortName: "Balochistan",
    description: "Coastlines, deserts & dramatic landscapes",
    places: ["Quetta", "Ziarat", "Hingol", "Kund Malir", "Gwadar", "Ormara"],
  },

  {
    id: "azad-kashmir",
    name: "Azad Jammu & Kashmir",
    shortName: "AJK",
    description: "Green valleys, rivers & mountain escapes",
    places: [
      "Muzaffarabad",
      "Neelum Valley",
      "Keran",
      "Sharda",
      "Arang Kel",
      "Rawalakot",
    ],
  },
];

/* =========================================================
   BOOKING PLANNER — STEP DATA
========================================================= */

export const bookingPlannerData = {
  eyebrow: "Build Your Journey",

  title: "Let's start with your trip.",

  description:
    "Tell us where you want to go and when you would like to travel. You can refine transport, stays, and experiences in the next steps.",

  steps: [
    {
      id: 1,
      label: "Trip",
    },
    {
      id: 2,
      label: "Travel",
    },
    {
      id: 3,
      label: "Stay",
    },
    {
      id: 4,
      label: "Details",
    },
    {
      id: 5,
      label: "Review",
    },
  ],
};
/* =========================================================
   BOOKING PLANNER — TRAVEL MODE OPTIONS
========================================================= */

export const bookingTravelModes = [
  {
    id: "road",
    title: "By Road",
    description:
      "Travel between destinations by private road transport with flexibility for stops, scenic routes, and local exploration.",
    icon: "road",
  },

  {
    id: "air",
    title: "By Air",
    description:
      "Use domestic flights where available to reduce travel time between major destinations and regions.",
    icon: "air",
  },

  {
    id: "road-air",
    title: "Road + Air",
    description:
      "Combine domestic flights with private road travel for a balanced journey across longer routes.",
    icon: "combined",
  },
];

/* =========================================================
   BOOKING PLANNER — VEHICLE OPTIONS
========================================================= */

export const bookingVehicleOptions = [
  {
    id: "car",
    title: "Car",
    description:
      "Best for couples or small groups travelling on standard roads.",
  },

  {
    id: "suv",
    title: "SUV",
    description:
      "Comfortable for longer journeys, families, and mixed road conditions.",
  },

  {
    id: "4x4",
    title: "4x4",
    description:
      "Recommended for mountain roads, remote valleys, and more demanding terrain.",
  },

  {
    id: "coaster",
    title: "Coaster",
    description:
      "Suitable for larger families, groups, corporate travel, and organized tours.",
  },
];

/* =========================================================
   BOOKING PLANNER — ROUTE PREFERENCES
========================================================= */

export const bookingRoutePreferences = [
  {
    id: "fastest",
    title: "Fastest Route",
    description:
      "Prioritize the most time-efficient route between destinations.",
  },

  {
    id: "scenic",
    title: "Scenic Route",
    description:
      "Prioritize landscapes, viewpoints, and memorable road experiences.",
  },

  {
    id: "balanced",
    title: "Balanced",
    description: "Balance travel time, road comfort, and scenic stops.",
  },
];

/* =========================================================
   BOOKING PLANNER — TRAVEL SUPPORT
========================================================= */

export const bookingTravelSupport = [
  {
    id: "driverRequired",
    title: "Driver Required",
    description: "Add a professional driver for your road journey.",
  },

  {
    id: "guideRequired",
    title: "Local Guide",
    description:
      "Include local guidance for destinations, culture, and experiences.",
  },

  {
    id: "airportPickup",
    title: "Airport Pickup",
    description: "Arrange pickup from your arrival airport.",
  },

  {
    id: "intercityTransfer",
    title: "Intercity Transfer",
    description: "Arrange transport between major cities or regions.",
  },
];
/* =========================================================
   BOOKING PLANNER — ACCOMMODATION LEVELS
========================================================= */

export const bookingAccommodationLevels = [
  {
    id: "budget",
    title: "Budget",
    description:
      "Simple, clean, and practical stays focused on value and essential comfort.",
    label: "Smart Value",
  },

  {
    id: "comfort",
    title: "Comfort",
    description:
      "Well-rated accommodation with added comfort, convenient locations, and reliable facilities.",
    label: "Most Popular",
  },

  {
    id: "premium",
    title: "Premium",
    description:
      "Higher-end hotels and resorts offering stronger service, comfort, and amenities.",
    label: "Elevated Stay",
  },

  {
    id: "luxury",
    title: "Luxury",
    description:
      "Exceptional properties, premium locations, personalized service, and memorable experiences.",
    label: "Signature",
  },
];

/* =========================================================
   BOOKING PLANNER — ACCOMMODATION TYPES
========================================================= */

export const bookingAccommodationTypes = [
  {
    id: "hotel",
    title: "Hotel",
    description:
      "Traditional hotel accommodation with convenient services and facilities.",
  },

  {
    id: "guest-house",
    title: "Guest House",
    description:
      "Smaller locally operated stays offering a more personal experience.",
  },

  {
    id: "resort",
    title: "Resort",
    description:
      "Destination-focused accommodation with enhanced leisure facilities.",
  },

  {
    id: "camping",
    title: "Camping",
    description:
      "Outdoor stays for selected mountain, valley, and adventure destinations.",
  },
];

/* =========================================================
   BOOKING PLANNER — ROOM PREFERENCES
========================================================= */

export const bookingRoomPreferences = [
  {
    id: "single",
    title: "Single",
  },

  {
    id: "double",
    title: "Double",
  },

  {
    id: "twin",
    title: "Twin",
  },

  {
    id: "family",
    title: "Family",
  },

  {
    id: "suite",
    title: "Suite",
  },
];

/* =========================================================
   BOOKING PLANNER — MEAL PREFERENCES
========================================================= */

export const bookingMealPreferences = [
  {
    id: "room-only",
    title: "Room Only",
    description: "Accommodation without included meals.",
  },

  {
    id: "breakfast",
    title: "Breakfast",
    description: "Daily breakfast included with your stay.",
  },

  {
    id: "half-board",
    title: "Half Board",
    description: "Breakfast plus one main meal each day.",
  },

  {
    id: "full-board",
    title: "Full Board",
    description: "Breakfast, lunch, and dinner included.",
  },
];
/* =========================================================
   BOOKING PLANNER — TRAVELER TYPES
========================================================= */

export const bookingTravelerTypes = [
  {
    id: "domestic",
    title: "Domestic Traveler",
    description:
      "I am travelling within Pakistan and do not need international arrival guidance.",
  },

  {
    id: "international",
    title: "International Traveler",
    description:
      "I am visiting Pakistan from another country and may need additional travel guidance.",
  },
];

/* =========================================================
   BOOKING PLANNER — CONTACT PREFERENCES
========================================================= */

export const bookingContactPreferences = [
  {
    id: "whatsapp",
    title: "WhatsApp",
  },

  {
    id: "phone",
    title: "Phone Call",
  },

  {
    id: "email",
    title: "Email",
  },
];

/* =========================================================
   BOOKING PLANNER — TRAVEL INTERESTS
========================================================= */

export const bookingTripInterests = [
  {
    id: "nature",
    title: "Nature",
  },

  {
    id: "adventure",
    title: "Adventure",
  },

  {
    id: "culture",
    title: "Culture & Heritage",
  },

  {
    id: "food",
    title: "Food",
  },

  {
    id: "trekking",
    title: "Trekking",
  },

  {
    id: "photography",
    title: "Photography",
  },

  {
    id: "family",
    title: "Family Travel",
  },

  {
    id: "luxury",
    title: "Luxury",
  },
];

/* =========================================================
   BOOKING PLANNER — INTERNATIONAL ASSISTANCE
========================================================= */

export const bookingInternationalSupport = [
  {
    id: "visaGuidanceRequired",

    title: "Visa Guidance",

    description:
      "Receive practical information about Pakistan visa requirements and official application resources.",
  },

  {
    id: "airportAssistanceRequired",

    title: "Airport Assistance",

    description:
      "Help with arrival planning, airport transfers, and onward travel coordination.",
  },

  {
    id: "currencyGuidanceRequired",

    title: "Currency & Payments",

    description:
      "Receive practical guidance about currency, cards, cash, and payments while travelling.",
  },

  {
    id: "simGuidanceRequired",

    title: "SIM & Connectivity",

    description:
      "Get practical information about mobile connectivity and internet access during your trip.",
  },
];
