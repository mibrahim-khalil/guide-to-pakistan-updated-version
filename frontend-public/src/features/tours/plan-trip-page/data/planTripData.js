import heroImage from "../../../../assets/images/hero/hero.jpeg";

/* =========================================================
   PLAN TRIP HERO
========================================================= */

export const planTripHero = {
  eyebrow: "Your Journey Starts Here",

  title: "Plan Your Perfect Journey Through Pakistan",

  description:
    "From mountain escapes and historic cities to hidden valleys and cultural experiences, build a Pakistan journey designed around you.",

  primaryAction: {
    label: "Start Planning",
    targetId: "trip-builder",
  },

  secondaryAction: {
    label: "Explore Pakistan",
    path: "/destinations",
  },

  image: heroImage,
};
/* =========================================================
   QUICK TRIP BUILDER
========================================================= */

export const quickTripBuilderData = {
  origins: [
    {
      value: "lahore",
      label: "Lahore",
    },
    {
      value: "islamabad",
      label: "Islamabad",
    },
    {
      value: "karachi",
      label: "Karachi",
    },
    {
      value: "peshawar",
      label: "Peshawar",
    },
    {
      value: "multan",
      label: "Multan",
    },
  ],

  destinations: [
    {
      value: "swat-kalam",
      label: "Swat & Kalam — Khyber Pakhtunkhwa",
    },
    {
      value: "hunza",
      label: "Hunza Valley — Gilgit-Baltistan",
    },
    {
      value: "skardu",
      label: "Skardu — Gilgit-Baltistan",
    },
    {
      value: "neelum",
      label: "Neelum Valley — Azad Kashmir",
    },
    {
      value: "lahore",
      label: "Lahore — Punjab",
    },
  ],

  tripTypes: [
    {
      value: "adventure",
      label: "Adventure",
    },
    {
      value: "family",
      label: "Family",
    },
    {
      value: "honeymoon",
      label: "Honeymoon",
    },
    {
      value: "photography",
      label: "Photography",
    },
    {
      value: "cultural",
      label: "Cultural",
    },
    {
      value: "luxury",
      label: "Luxury",
    },
  ],

  defaultValues: {
    origin: "lahore",
    destination: "swat-kalam",
    travelDate: "",
    travelers: 2,
    tripType: "adventure",
  },

  buttonLabel: "Build My Trip",
};
/* =========================================================
   DESTINATION INTELLIGENCE — PLACEHOLDER DATA
========================================================= */

export const destinationIntelligence = {
  "swat-kalam": {
    destinationName: "Swat & Kalam",

    route: {
      status: "Generally Accessible",
      condition:
        "Main access roads are usually paved, while some upper valley routes may become slower during rain, snow, or seasonal maintenance.",
      estimatedTime: "Approx. 5–7 hours from Islamabad",
      recommendedMode: "Road",
      alternateRoute:
        "Alternate routing may be recommended depending on seasonal road conditions.",
    },

    weather: {
      status: "Seasonal Conditions",
      summary:
        "Weather can change quickly in upper valleys. Cooler temperatures, rainfall, fog, and winter snowfall should be considered.",
      temperature: "Varies by season and elevation",
      recommendation:
        "Check the latest forecast before departure and carry appropriate layers.",
    },

    hazards: {
      level: "Moderate",
      summary:
        "Mountain travel may be affected by heavy rain, landslides, snowfall, flooding, or reduced visibility in certain seasons.",
    },

    civic: {
      status: "Normal Precautions",
      summary:
        "Follow local guidance, official travel instructions, and any temporary access restrictions.",
    },

    events: {
      status: "Seasonal",
      summary:
        "Local festivals and seasonal tourism events may take place during peak travel periods.",
      bestTime:
        "Spring to early autumn is generally preferred for sightseeing, while winter appeals to snow-focused travelers.",
    },

    airTravel: {
      available: false,
      summary:
        "Most journeys to Swat and Kalam rely primarily on road travel and onward local transport.",
    },

    advisory: {
      level: "Plan Ahead",
      message:
        "Confirm weather and road accessibility shortly before departure, especially during monsoon and winter months.",
    },
  },

  hunza: {
    destinationName: "Hunza Valley",

    route: {
      status: "Long-Distance Mountain Route",
      condition:
        "Primary routes are generally established, but mountain travel can be affected by weather, road works, rockfall, or temporary closures.",
      estimatedTime: "Long-distance road journey from major southern cities",
      recommendedMode: "Air + Road",
      alternateRoute:
        "Flying to Gilgit followed by road travel may reduce total journey time when flights operate.",
    },

    weather: {
      status: "Mountain Weather",
      summary:
        "Temperatures and conditions vary significantly by season and altitude.",
      temperature: "Cool to cold depending on season",
      recommendation:
        "Prepare for temperature drops, strong sun exposure, and rapidly changing mountain weather.",
    },

    hazards: {
      level: "Moderate",
      summary:
        "Potential concerns include landslides, rockfall, snowfall, glacier-related conditions, and temporary route disruption.",
    },

    civic: {
      status: "Normal Precautions",
      summary:
        "Respect local customs and follow official instructions regarding restricted or temporarily inaccessible areas.",
    },

    events: {
      status: "Seasonal",
      summary:
        "Cultural events, blossom season, harvest periods, and local festivals may influence the travel experience.",
      bestTime:
        "Spring, summer, and autumn are popular depending on whether visitors prefer blossoms, warmer conditions, or fall colors.",
    },

    airTravel: {
      available: true,
      summary:
        "Flights to Gilgit may be an option, followed by road transfer to Hunza. Mountain weather can affect flight schedules.",
    },

    advisory: {
      level: "Check Before Departure",
      message:
        "Verify road and flight conditions shortly before travel because mountain weather can affect both.",
    },
  },

  skardu: {
    destinationName: "Skardu",

    route: {
      status: "Mountain Access",
      condition:
        "Road access is available, but the journey can be long and may be affected by seasonal mountain conditions.",
      estimatedTime: "Travel time depends heavily on starting city and route",
      recommendedMode: "Air + Road",
      alternateRoute:
        "Domestic air travel can significantly reduce journey time when flights operate.",
    },

    weather: {
      status: "High-Altitude Climate",
      summary:
        "Expect cool evenings, strong sunlight, dry conditions, and colder weather outside the summer season.",
      temperature: "Highly seasonal",
      recommendation:
        "Carry layered clothing and prepare for stronger UV exposure at altitude.",
    },

    hazards: {
      level: "Moderate",
      summary:
        "Mountain road disruption, snowfall, landslides, and changing visibility may affect access.",
    },

    civic: {
      status: "Normal Precautions",
      summary:
        "Follow local administration guidance and respect rules around protected or restricted areas.",
    },

    events: {
      status: "Seasonal",
      summary:
        "Local cultural events and tourism activities vary through the year.",
      bestTime:
        "Late spring through early autumn is commonly preferred for general sightseeing.",
    },

    airTravel: {
      available: true,
      summary:
        "Domestic flights to Skardu are available on some routes, but weather can affect operations.",
    },

    advisory: {
      level: "Weather Sensitive",
      message:
        "Allow schedule flexibility because both flights and mountain routes can be affected by changing weather.",
    },
  },

  neelum: {
    destinationName: "Neelum Valley",

    route: {
      status: "Road Access",
      condition:
        "Most travel is by road, with conditions varying by section and season.",
      estimatedTime: "Depends on starting point and final valley destination",
      recommendedMode: "Road",
      alternateRoute:
        "Some upper valley destinations may require additional local transport.",
    },

    weather: {
      status: "Variable Valley Weather",
      summary:
        "Rain, fog, snowfall, and cooler temperatures can affect travel depending on season.",
      temperature: "Seasonal",
      recommendation:
        "Check precipitation and visibility forecasts before entering upper valley areas.",
    },

    hazards: {
      level: "Moderate",
      summary:
        "Heavy rainfall, landslides, flooding, and snowfall may affect road access.",
    },

    civic: {
      status: "Check Local Guidance",
      summary:
        "Some areas may have additional access considerations. Follow local and official travel guidance.",
    },

    events: {
      status: "Seasonal",
      summary: "Local tourism activity is strongest during warmer months.",
      bestTime:
        "Late spring through early autumn is generally preferred for easier access.",
    },

    airTravel: {
      available: false,
      summary: "Most tourist access is road-based.",
    },

    advisory: {
      level: "Road Conditions Matter",
      message:
        "Confirm upper-valley road access before departure, particularly after heavy rain or snowfall.",
    },
  },

  lahore: {
    destinationName: "Lahore",

    route: {
      status: "Highly Accessible",
      condition:
        "Lahore is connected through major motorways, highways, rail links, and air services.",
      estimatedTime: "Depends on origin",
      recommendedMode: "Road or Air",
      alternateRoute:
        "Multiple major transport options are generally available.",
    },

    weather: {
      status: "Urban Seasonal Climate",
      summary:
        "Summers can be very hot, while winter conditions are cooler and may include periods of reduced air quality or fog.",
      temperature: "Hot summers, cooler winters",
      recommendation:
        "Plan outdoor sightseeing around heat, fog, and seasonal air-quality conditions.",
    },

    hazards: {
      level: "Low to Moderate",
      summary:
        "Heatwaves, heavy rain, urban flooding, fog, and poor air quality may occasionally affect travel.",
    },

    civic: {
      status: "Urban Conditions",
      summary:
        "Expect normal metropolitan traffic, crowds, road diversions, and event-related congestion.",
    },

    events: {
      status: "Frequent",
      summary:
        "Cultural, food, heritage, sports, and seasonal events occur throughout the year.",
      bestTime:
        "Autumn, winter, and early spring are often more comfortable for extensive outdoor sightseeing.",
    },

    airTravel: {
      available: true,
      summary:
        "Lahore is served by major domestic and international air connections.",
    },

    advisory: {
      level: "Urban Planning",
      message:
        "Allow extra time for traffic and check weather, fog, event congestion, and air-quality conditions during relevant seasons.",
    },
  },
};
