/* =========================================================
   STORIES PAGE DATA
========================================================= */

import storiesHeroImage from "../../../assets/images/hero/hero.jpeg";
import gilgitBaltistanImage from "../../../assets/images/destinations/hero-gilgit-baltistan.jpeg";

/* =========================================================
   HERO SECTION
========================================================= */

export const storiesHeroData = {
  eyebrow: "Journeys • People • Culture",

  title: "Stories & Media",

  description:
    "Stories from the roads, valleys, communities, and people that shape Pakistan.",

  image: storiesHeroImage,

  imageAlt: "A scenic travel destination in Pakistan.",
};

/* =========================================================
   BLOG SECTION
========================================================= */

export const blogSectionData = {
  eyebrow: "From the Journal",

  title: "Read Our Blog",

  description:
    "Discover travel inspiration, cultural stories, hidden places, and meaningful journeys from across Pakistan.",

  ctaLabel: "View All Blogs",

  ctaPath: "/stories/blog",

  blogs: [
    /* =====================================================
       BLOG 01 — FEATURED
    ===================================================== */

    {
      id: "pakistan-next-adventure",

      slug: "pakistan-next-adventure-destination",

      category: "Adventure",

      date: "March 15, 2024",

      author: "Zara Khan",

      readTime: "6 min read",

      title: "Why Pakistan Should Be Your Next Adventure Destination",

      excerpt:
        "From dramatic mountain passes to remote valleys, discover why Pakistan rewards travelers willing to venture beyond the familiar.",

      image: gilgitBaltistanImage,

      imageAlt: "Snow-covered mountains and green valleys in northern Pakistan",

      featured: true,

      content: {
        intro:
          "Pakistan is a destination built for travelers who want more than a conventional holiday. From dramatic mountain landscapes and remote valleys to centuries-old cultures and unforgettable road journeys, every region offers a different kind of adventure.",

        sections: [
          {
            heading: "Landscapes That Feel Larger Than Life",

            paragraphs: [
              "Northern Pakistan is home to some of the country's most striking scenery, where towering peaks, rivers, lakes, and deep valleys create journeys that feel genuinely cinematic.",

              "For adventure-focused travelers, the journey itself often becomes part of the experience, whether that means crossing mountain roads, exploring remote villages, or spending time surrounded by landscapes far removed from busy city life.",
            ],
          },

          {
            heading: "Adventure Beyond the Usual Routes",

            paragraphs: [
              "Pakistan offers opportunities for trekking, hiking, camping, road trips, cultural exploration, photography, and nature-based travel across a wide range of regions.",

              "Different destinations offer different levels of accessibility and activity, allowing travelers to shape their journey around comfort, time, and personal interests.",
            ],
          },

          {
            heading: "The People Behind the Journey",

            paragraphs: [
              "Travel in Pakistan is not only about scenery. Local communities, traditions, food, architecture, and everyday interactions give each destination its character.",

              "Taking time to understand local customs and travel responsibly can turn a simple itinerary into a much more meaningful experience.",
            ],
          },
        ],

        closing:
          "For travelers looking for dramatic landscapes, rich culture, and journeys that feel genuinely different, Pakistan offers an experience that is difficult to compare with anywhere else.",
      },
    },

    /* =====================================================
       BLOG 02
    ===================================================== */

    {
      id: "hidden-gems-balochistan",

      slug: "hidden-gems-balochistan",

      category: "Discover",

      date: "February 28, 2024",

      author: "Ahmed Raza",

      readTime: "5 min read",

      title: "Hidden Gems of Balochistan You May Have Never Seen",

      excerpt:
        "Waterfalls, coastlines, deserts, and landscapes that reveal another side of Pakistan's largest province.",

      image: gilgitBaltistanImage,

      imageAlt:
        "Natural waterfall surrounded by rocky landscape in Balochistan",

      featured: false,
    },

    /* =====================================================
       BLOG 03
    ===================================================== */

    {
      id: "kalash-valleys",

      slug: "kalash-valleys-ancient-history",

      category: "Culture",

      date: "February 10, 2024",

      author: "Sara Malik",

      readTime: "7 min read",

      title: "Kalash Valleys: A Window Into Living Heritage",

      excerpt:
        "Step inside one of Pakistan's most distinctive cultural landscapes, where traditions and mountain life remain deeply connected.",

      image: gilgitBaltistanImage,

      imageAlt:
        "Traditional settlement surrounded by mountains in the Kalash Valleys",

      featured: false,
    },
  ],
};
export const gallerySectionData = {
  eyebrow: "Visual Journal",

  title: "Pakistan, Frame by Frame",

  description:
    "A visual collection of landscapes, communities, culture, and unforgettable moments from journeys across Pakistan.",

  ctaLabel: "View Full Gallery",

  images: [
    {
      id: "gallery-01",
      title: "Mountain Roads",
      location: "Gilgit-Baltistan",
      image: gilgitBaltistanImage,
      imageAlt: "Mountain landscape and road in Gilgit-Baltistan",
    },

    {
      id: "gallery-02",
      title: "Valley Light",
      location: "Northern Pakistan",
      image: storiesHeroImage,
      imageAlt: "Mountain valley illuminated by warm sunlight",
    },

    {
      id: "gallery-03",
      title: "Highland Journey",
      location: "Gilgit-Baltistan",
      image: gilgitBaltistanImage,
      imageAlt: "Scenic highland landscape in northern Pakistan",
    },

    {
      id: "gallery-04",
      title: "Golden Hour",
      location: "Pakistan",
      image: storiesHeroImage,
      imageAlt: "Warm evening light across a mountain landscape",
    },

    {
      id: "gallery-05",
      title: "Beyond the Road",
      location: "Northern Pakistan",
      image: gilgitBaltistanImage,
      imageAlt: "Road journey through northern Pakistan",
    },

    {
      id: "gallery-06",
      title: "Into the Mountains",
      location: "Pakistan",
      image: storiesHeroImage,
      imageAlt: "Mountain scenery in Pakistan",
    },
  ],
};
export const videosSectionData = {
  eyebrow: "Watch & Explore",

  title: "See Pakistan in Motion",

  description:
    "Short films, road journeys, cultural moments, and unforgettable landscapes captured from across Pakistan.",

  ctaLabel: "View All Videos",

  videos: [
    {
      id: "video-01",
      category: "Adventure",
      title: "Journey Through the Karakoram",
      description:
        "A cinematic road journey through dramatic mountain landscapes and remote northern valleys.",
      duration: "24:15",
      views: "142K views",
      location: "Gilgit-Baltistan",
      image: gilgitBaltistanImage,
      imageAlt: "Mountain road and landscape in Gilgit-Baltistan",
      featured: true,
    },

    {
      id: "video-02",
      category: "Culture",
      title: "Stories From the Mountain Valleys",
      description:
        "A closer look at the communities, traditions, and landscapes that shape northern Pakistan.",
      duration: "18:30",
      views: "98K views",
      location: "Northern Pakistan",
      image: storiesHeroImage,
      imageAlt: "Mountain valley in Pakistan",
      featured: false,
    },

    {
      id: "video-03",
      category: "Road Journey",
      title: "Driving Across Pakistan's Mountain Roads",
      description:
        "A visual road story through some of Pakistan's most dramatic travel routes.",
      duration: "31:45",
      views: "203K views",
      location: "Pakistan",
      image: gilgitBaltistanImage,
      imageAlt: "Scenic road journey in northern Pakistan",
      featured: false,
    },
  ],
};
export const travelerStoriesData = {
  eyebrow: "Traveler Journals",

  title: "Real Journeys. Real People.",

  description:
    "Personal stories from travelers who explored Pakistan through its mountains, cities, culture, food, festivals, roads, and communities.",

  ctaLabel: "View All Traveler Stories",

  ctaPath: "/stories/travelers",

  stories: [
    {
      id: "traveler-01",

      slug: "emma-thompson-three-weeks-pakistan",

      name: "Emma Thompson",

      country: "Australia",

      tripDuration: "21 Days",

      route: "Islamabad → Hunza → Skardu → Lahore",

      quote:
        "I arrived with questions and left with memories I know I will carry for the rest of my life. The mountains were incredible, but the people made the journey unforgettable.",

      image: gilgitBaltistanImage,

      imageAlt: "Mountain landscape from a journey through Gilgit-Baltistan",

      avatar: gilgitBaltistanImage,

      highlights: ["Mountain Roads", "Local Food", "Culture", "Photography"],

      featured: true,

      journeyDetails: {
        overview:
          "Emma spent three weeks traveling through Pakistan, combining mountain landscapes, historic cities, local food, cultural encounters, photography, and long road journeys through the north.",

        placesVisited: [
          {
            name: "Islamabad",
            type: "City",
            note: "The starting point of the journey, with visits to viewpoints, local markets, and nearby cultural attractions.",
          },

          {
            name: "Hunza Valley",
            type: "Mountain Valley",
            note: "A major highlight of the trip, known for dramatic mountain scenery, villages, forts, and long photography stops.",
          },

          {
            name: "Skardu",
            type: "Mountain Region",
            note: "Explored surrounding valleys, mountain roads, viewpoints, and natural landscapes.",
          },

          {
            name: "Lahore",
            type: "Heritage City",
            note: "The final part of the journey focused on architecture, history, street food, bazaars, and local culture.",
          },
        ],

        activities: [
          "Scenic road journeys",
          "Landscape photography",
          "Village walks",
          "Historic fort visits",
          "Local market exploration",
          "Mountain viewpoints",
          "Cultural sightseeing",
        ],

        foodExperiences: [
          {
            title: "Roadside Tea",
            description:
              "Small tea stops during long mountain drives became some of the most memorable pauses of the journey.",
          },

          {
            title: "Local Mountain Cuisine",
            description:
              "Tried regional dishes in Hunza and Skardu while learning about local ingredients and traditional preparation.",
          },

          {
            title: "Lahore Street Food",
            description:
              "Ended the trip exploring Lahore's food culture through traditional dishes, snacks, and local restaurants.",
          },
        ],

        culturalExperiences: [
          {
            title: "Village Life",
            description:
              "Time spent in northern communities offered a closer view of everyday mountain life and hospitality.",
          },

          {
            title: "Historic Architecture",
            description:
              "Visited historic forts, mosques, old neighborhoods, and heritage landmarks throughout the journey.",
          },

          {
            title: "Local Conversations",
            description:
              "Informal conversations with residents became one of the most meaningful parts of the trip.",
          },
        ],

        eventsAttended: [
          {
            title: "Local Community Gathering",
            location: "Hunza",
            description:
              "Joined a small community gathering during the northern part of the journey.",
          },
        ],

        stays: [
          {
            location: "Islamabad",
            type: "City Hotel",
          },

          {
            location: "Hunza",
            type: "Mountain Guesthouse",
          },

          {
            location: "Skardu",
            type: "Local Hotel",
          },

          {
            location: "Lahore",
            type: "Heritage-style Hotel",
          },
        ],

        transport: [
          "Private road transfer",
          "4x4 mountain vehicle",
          "Domestic flight",
          "Local city transport",
        ],

        favoriteMoment: {
          title: "Sunset in Hunza",
          description:
            "Watching the mountains change color at sunset after a long day on the road became the moment Emma remembered most from the entire journey.",
        },

        travelerAdvice: [
          "Leave extra time for mountain road journeys.",
          "Keep part of the itinerary flexible.",
          "Try regional food instead of relying only on familiar meals.",
          "Carry layers because temperatures can change quickly.",
          "Spend time talking to local people rather than rushing between attractions.",
        ],

        finalReview:
          "Pakistan surprised me constantly. The landscapes were extraordinary, but what made the journey memorable were the moments between destinations — tea stops, conversations, unexpected views, and the kindness of people I met along the way.",
      },
    },

    {
      id: "traveler-02",

      slug: "kenji-watanabe-gilgit-baltistan",

      name: "Kenji Watanabe",

      country: "Japan",

      tripDuration: "14 Days",

      route: "Islamabad → Naran → Hunza",

      quote:
        "As a landscape photographer, Gilgit-Baltistan felt endless. Every turn in the road revealed another scene I wanted to remember.",

      image: storiesHeroImage,

      avatar: storiesHeroImage,

      highlights: ["Photography", "Nature", "Road Trip"],

      featured: false,
    },

    {
      id: "traveler-03",

      slug: "fatima-al-rashid-neelum-valley",

      name: "Fatima Al-Rashid",

      country: "UAE",

      tripDuration: "10 Days",

      route: "Islamabad → Muzaffarabad → Neelum Valley",

      quote:
        "The rivers, forests, mountain villages, and hospitality made Neelum Valley feel peaceful in a way I had not expected.",

      image: gilgitBaltistanImage,

      avatar: gilgitBaltistanImage,

      highlights: ["Nature", "Village Life", "Local Cuisine"],

      featured: false,
    },

    {
      id: "traveler-04",

      slug: "daniel-morgan-kalakot-chitral",

      name: "Daniel Morgan",

      country: "United Kingdom",

      tripDuration: "18 Days",

      route: "Peshawar → Chitral → Kalash",

      quote:
        "What stayed with me most was how different every region felt. The landscapes changed, the food changed, and the stories changed with them.",

      image: storiesHeroImage,

      avatar: storiesHeroImage,

      highlights: ["Culture", "History", "Festivals"],

      featured: false,
    },

    {
      id: "traveler-05",

      slug: "sofia-martinez-pakistan-road-trip",

      name: "Sofia Martinez",

      country: "Spain",

      tripDuration: "24 Days",

      route: "Lahore → Islamabad → Skardu → Hunza",

      quote:
        "Pakistan turned into one of those journeys where the plan mattered less than the moments in between — roadside tea, conversations, and unexpected views.",

      image: gilgitBaltistanImage,

      avatar: gilgitBaltistanImage,

      highlights: ["Road Trip", "Food", "People"],

      featured: false,
    },

   
  ],
};
