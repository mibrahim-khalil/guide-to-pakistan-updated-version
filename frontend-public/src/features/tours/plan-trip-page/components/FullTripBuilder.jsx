export default function FullTripBuilder({ tripData, content, onChange }) {
  if (!tripData || !content) {
    return null;
  }

  const { origins = [], destinations = [], tripTypes = [] } = content;

  const getLabel = (items, value) => {
    const item = items.find((entry) => entry.value === value);

    return item?.label || value || "Not selected";
  };

  const originLabel = getLabel(origins, tripData.origin);
  const destinationLabel = getLabel(destinations, tripData.destination);
  const tripTypeLabel = getLabel(tripTypes, tripData.tripType);

  const formatValue = (value) => {
    if (!value) {
      return "Not selected";
    }

    return String(value)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const updateField = (field, value) => {
    if (typeof onChange === "function") {
      onChange(field, value);
    }
  };

  return (
    <section
      id="full-trip-builder"
      className="fullTripBuilder"
      aria-labelledby="full-trip-builder-title"
    >
      <div className="fullTripBuilder__container">
        {/* ===================================================
            INTRO
        =================================================== */}

        <div className="fullTripBuilder__intro">
          <span className="fullTripBuilder__eyebrow">Build Your Journey</span>

          <h2 id="full-trip-builder-title" className="fullTripBuilder__title">
            Let’s Shape Your Pakistan Trip
          </h2>

          <p className="fullTripBuilder__description">
            We’ve carried over the details from your quick trip starter.
            Continue customizing your journey below.
          </p>
        </div>

        <div className="fullTripBuilder__steps">
          {/* =================================================
              STEP 01 — TRIP BASICS
          ================================================= */}

          <div className="fullTripBuilder__panel">
            <div className="fullTripBuilder__stepHeader">
              <div>
                <span className="fullTripBuilder__stepNumber">01</span>

                <span className="fullTripBuilder__stepLabel">Trip Basics</span>
              </div>

              <span className="fullTripBuilder__stepStatus">Started</span>
            </div>

            <div className="fullTripBuilder__fields">
              {/* STARTING FROM */}
              <div className="fullTripBuilder__field">
                <label htmlFor="full-trip-origin">Starting From</label>

                <select
                  id="full-trip-origin"
                  value={tripData.origin}
                  onChange={(event) =>
                    updateField("origin", event.target.value)
                  }
                >
                  {origins.map((origin) => (
                    <option key={origin.value} value={origin.value}>
                      {origin.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* DESTINATION */}
              <div className="fullTripBuilder__field">
                <label htmlFor="full-trip-destination">Destination</label>

                <select
                  id="full-trip-destination"
                  value={tripData.destination}
                  onChange={(event) =>
                    updateField("destination", event.target.value)
                  }
                >
                  {destinations.map((destination) => (
                    <option key={destination.value} value={destination.value}>
                      {destination.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* TRAVEL DATE */}
              <div className="fullTripBuilder__field">
                <label htmlFor="full-trip-date">Travel Date</label>

                <input
                  id="full-trip-date"
                  type="date"
                  value={tripData.travelDate}
                  onChange={(event) =>
                    updateField("travelDate", event.target.value)
                  }
                />
              </div>

              {/* TRAVELERS */}
              <div className="fullTripBuilder__field">
                <label htmlFor="full-trip-travelers">Travelers</label>

                <input
                  id="full-trip-travelers"
                  type="number"
                  min="1"
                  max="30"
                  value={tripData.travelers}
                  onChange={(event) =>
                    updateField("travelers", Number(event.target.value))
                  }
                />
              </div>

              {/* TRIP TYPE */}
              <div className="fullTripBuilder__field">
                <label htmlFor="full-trip-type">Trip Type</label>

                <select
                  id="full-trip-type"
                  value={tripData.tripType}
                  onChange={(event) =>
                    updateField("tripType", event.target.value)
                  }
                >
                  {tripTypes.map((tripType) => (
                    <option key={tripType.value} value={tripType.value}>
                      {tripType.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* =================================================
              STEP 02 — GETTING THERE
          ================================================= */}

          <div className="fullTripBuilder__panel fullTripBuilder__panel--travel">
            <div className="fullTripBuilder__stepHeader">
              <div>
                <span className="fullTripBuilder__stepNumber">02</span>

                <span className="fullTripBuilder__stepLabel">
                  Getting There
                </span>
              </div>

              <span className="fullTripBuilder__stepStatus">Customize</span>
            </div>

            <div className="fullTripBuilder__stepIntro">
              <h3 className="fullTripBuilder__stepTitle">
                How would you like to travel?
              </h3>

              <p className="fullTripBuilder__stepText">
                Choose your preferred way to reach your destination. We’ll later
                use this to recommend routes, travel times, road conditions,
                flight options, and relevant advisories.
              </p>
            </div>

            {/* TRAVEL MODE */}
            <div className="fullTripBuilder__choiceGrid">
              <button
                type="button"
                className={[
                  "fullTripBuilder__choiceCard",
                  tripData.travelMode === "road" ? "isSelected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => updateField("travelMode", "road")}
              >
                <span className="fullTripBuilder__choiceIcon">🚙</span>

                <strong>By Road</strong>

                <span>
                  Scenic road journey with route and vehicle recommendations.
                </span>
              </button>

              <button
                type="button"
                className={[
                  "fullTripBuilder__choiceCard",
                  tripData.travelMode === "air" ? "isSelected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => updateField("travelMode", "air")}
              >
                <span className="fullTripBuilder__choiceIcon">✈️</span>

                <strong>By Air</strong>

                <span>
                  Domestic flight options with onward travel guidance.
                </span>
              </button>

              <button
                type="button"
                className={[
                  "fullTripBuilder__choiceCard",
                  tripData.travelMode === "mixed" ? "isSelected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => updateField("travelMode", "mixed")}
              >
                <span className="fullTripBuilder__choiceIcon">↗</span>

                <strong>Air + Road</strong>

                <span>
                  Combine flights with road travel for a more efficient journey.
                </span>
              </button>
            </div>

            {/* TRAVEL OPTIONS */}
            <div className="fullTripBuilder__travelOptions">
              {/* ROUTE PREFERENCE */}
              <div className="fullTripBuilder__field">
                <label htmlFor="route-preference">Route Preference</label>

                <select
                  id="route-preference"
                  value={tripData.routePreference || "recommended"}
                  onChange={(event) =>
                    updateField("routePreference", event.target.value)
                  }
                >
                  <option value="recommended">Recommended Route</option>

                  <option value="fastest">Fastest Route</option>

                  <option value="scenic">Scenic Route</option>

                  <option value="flexible">No Preference</option>
                </select>
              </div>

              {/* PICKUP REQUIRED */}
              <label className="fullTripBuilder__toggleField">
                <input
                  type="checkbox"
                  checked={Boolean(tripData.pickupRequired)}
                  onChange={(event) =>
                    updateField("pickupRequired", event.target.checked)
                  }
                />

                <span className="fullTripBuilder__toggleVisual" />

                <span className="fullTripBuilder__toggleCopy">
                  <strong>Need pickup?</strong>

                  <small>
                    Include pickup or transfer assistance in your journey.
                  </small>
                </span>
              </label>
            </div>
          </div>
          {/* =================================================
    STEP 03 — STAY & BUDGET
================================================= */}

          <div className="fullTripBuilder__panel fullTripBuilder__panel--stay">
            <div className="fullTripBuilder__stepHeader">
              <div>
                <span className="fullTripBuilder__stepNumber">03</span>

                <span className="fullTripBuilder__stepLabel">
                  Stay & Budget
                </span>
              </div>

              <span className="fullTripBuilder__stepStatus">Customize</span>
            </div>

            <div className="fullTripBuilder__stepIntro">
              <h3 className="fullTripBuilder__stepTitle">
                How would you like to stay?
              </h3>

              <p className="fullTripBuilder__stepText">
                Choose the kind of accommodation and comfort level that best
                fits your journey.
              </p>
            </div>

            {/* ACCOMMODATION TYPE */}
            <div className="fullTripBuilder__choiceGrid">
              <button
                type="button"
                className={[
                  "fullTripBuilder__choiceCard",
                  tripData.accommodationType === "hotel" ? "isSelected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => updateField("accommodationType", "hotel")}
              >
                <span className="fullTripBuilder__choiceIcon">🏨</span>

                <strong>Hotel</strong>

                <span>
                  Comfortable hotel stays with convenient city and destination
                  access.
                </span>
              </button>

              <button
                type="button"
                className={[
                  "fullTripBuilder__choiceCard",
                  tripData.accommodationType === "resort" ? "isSelected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => updateField("accommodationType", "resort")}
              >
                <span className="fullTripBuilder__choiceIcon">🌿</span>

                <strong>Resort</strong>

                <span>
                  Scenic stays focused on comfort, views, and a slower travel
                  experience.
                </span>
              </button>

              <button
                type="button"
                className={[
                  "fullTripBuilder__choiceCard",
                  tripData.accommodationType === "guest-house"
                    ? "isSelected"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => updateField("accommodationType", "guest-house")}
              >
                <span className="fullTripBuilder__choiceIcon">🏡</span>

                <strong>Guest House</strong>

                <span>
                  Local, practical accommodation for a more personal travel
                  experience.
                </span>
              </button>

              <button
                type="button"
                className={[
                  "fullTripBuilder__choiceCard",
                  tripData.accommodationType === "camping" ? "isSelected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => updateField("accommodationType", "camping")}
              >
                <span className="fullTripBuilder__choiceIcon">⛺</span>

                <strong>Camping</strong>

                <span>
                  Outdoor stays for travelers looking for nature and adventure.
                </span>
              </button>

              <button
                type="button"
                className={[
                  "fullTripBuilder__choiceCard",
                  tripData.accommodationType === "flexible" ? "isSelected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => updateField("accommodationType", "flexible")}
              >
                <span className="fullTripBuilder__choiceIcon">✦</span>

                <strong>Flexible</strong>

                <span>
                  Let us recommend the most suitable stay based on your
                  destination and trip.
                </span>
              </button>
            </div>

            {/* BUDGET + ROOMS */}
            <div className="fullTripBuilder__stayOptions">
              <div className="fullTripBuilder__field">
                <label htmlFor="budget-level">Budget Style</label>

                <select
                  id="budget-level"
                  value={tripData.budgetLevel || ""}
                  onChange={(event) =>
                    updateField("budgetLevel", event.target.value)
                  }
                >
                  <option value="">Select Budget Style</option>

                  <option value="budget">Budget</option>

                  <option value="standard">Standard</option>

                  <option value="premium">Premium</option>

                  <option value="luxury">Luxury</option>
                </select>
              </div>

              <div className="fullTripBuilder__field">
                <label htmlFor="trip-rooms">Rooms</label>

                <input
                  id="trip-rooms"
                  type="number"
                  min="1"
                  max="20"
                  value={tripData.rooms}
                  onChange={(event) =>
                    updateField("rooms", Number(event.target.value))
                  }
                />
              </div>
            </div>
          </div>
          {/* =================================================
    STEP 04 — EXPERIENCES & INTERESTS
================================================= */}

          <div className="fullTripBuilder__panel fullTripBuilder__panel--interests">
            <div className="fullTripBuilder__stepHeader">
              <div>
                <span className="fullTripBuilder__stepNumber">04</span>

                <span className="fullTripBuilder__stepLabel">
                  Experiences & Interests
                </span>
              </div>

              <span className="fullTripBuilder__stepStatus">Multi Select</span>
            </div>

            <div className="fullTripBuilder__stepIntro">
              <h3 className="fullTripBuilder__stepTitle">
                What would you love to experience?
              </h3>

              <p className="fullTripBuilder__stepText">
                Select as many interests as you like. We’ll use them later to
                personalize destinations, activities, stops, and your complete
                itinerary.
              </p>
            </div>

            <div className="fullTripBuilder__interestGrid">
              {[
                {
                  value: "nature",
                  label: "Nature",
                  icon: "🌿",
                  description:
                    "Valleys, lakes, forests, mountains, and scenic landscapes.",
                },
                {
                  value: "adventure",
                  label: "Adventure",
                  icon: "⛰️",
                  description:
                    "Outdoor journeys, challenging routes, and active experiences.",
                },
                {
                  value: "trekking",
                  label: "Trekking",
                  icon: "🥾",
                  description:
                    "Trails, mountain walks, hikes, and trekking experiences.",
                },
                {
                  value: "culture",
                  label: "Culture",
                  icon: "🕌",
                  description:
                    "Local traditions, communities, architecture, and cultural life.",
                },
                {
                  value: "heritage",
                  label: "Heritage",
                  icon: "🏛️",
                  description:
                    "Historic sites, forts, monuments, and ancient places.",
                },
                {
                  value: "photography",
                  label: "Photography",
                  icon: "📷",
                  description:
                    "Scenic viewpoints and memorable photography locations.",
                },
                {
                  value: "food",
                  label: "Food",
                  icon: "🍽️",
                  description:
                    "Regional dishes, local cuisine, and authentic food experiences.",
                },
                {
                  value: "family",
                  label: "Family",
                  icon: "👨‍👩‍👧‍👦",
                  description:
                    "Comfortable, accessible, and family-friendly experiences.",
                },
                {
                  value: "romance",
                  label: "Romantic",
                  icon: "♡",
                  description:
                    "Peaceful stays and memorable experiences designed for couples.",
                },
                {
                  value: "camping",
                  label: "Camping",
                  icon: "⛺",
                  description:
                    "Outdoor nights, campsites, and nature-based stays.",
                },
                {
                  value: "wildlife",
                  label: "Wildlife",
                  icon: "🦅",
                  description:
                    "Wildlife, birdwatching, protected areas, and nature reserves.",
                },
                {
                  value: "relaxation",
                  label: "Relaxation",
                  icon: "☀️",
                  description:
                    "Slow travel, peaceful stays, wellness, and scenic downtime.",
                },
              ].map((interest) => {
                const isSelected = Array.isArray(tripData.interests)
                  ? tripData.interests.includes(interest.value)
                  : false;

                const handleInterestToggle = () => {
                  const currentInterests = Array.isArray(tripData.interests)
                    ? tripData.interests
                    : [];

                  if (isSelected) {
                    updateField(
                      "interests",
                      currentInterests.filter(
                        (item) => item !== interest.value,
                      ),
                    );

                    return;
                  }

                  updateField("interests", [
                    ...currentInterests,
                    interest.value,
                  ]);
                };

                return (
                  <button
                    key={interest.value}
                    type="button"
                    className={[
                      "fullTripBuilder__interestCard",
                      isSelected ? "isSelected" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={handleInterestToggle}
                    aria-pressed={isSelected}
                  >
                    <span className="fullTripBuilder__interestIcon">
                      {interest.icon}
                    </span>

                    <strong>{interest.label}</strong>

                    <span>{interest.description}</span>
                  </button>
                );
              })}
            </div>
          </div>
          {/* =================================================
    STEP 05 — TRIP PACE & DAILY PREFERENCES
================================================= */}

          <div className="fullTripBuilder__panel fullTripBuilder__panel--pace">
            <div className="fullTripBuilder__stepHeader">
              <div>
                <span className="fullTripBuilder__stepNumber">05</span>

                <span className="fullTripBuilder__stepLabel">
                  Trip Pace & Daily Preferences
                </span>
              </div>

              <span className="fullTripBuilder__stepStatus">Customize</span>
            </div>

            <div className="fullTripBuilder__stepIntro">
              <h3 className="fullTripBuilder__stepTitle">
                How should your days feel?
              </h3>

              <p className="fullTripBuilder__stepText">
                Set the pace, preferred start time, and activity level so your
                itinerary feels comfortable and realistic.
              </p>
            </div>

            {/* =================================================
      TRIP PACE
  ================================================= */}

            <div className="fullTripBuilder__preferenceGroup">
              <div className="fullTripBuilder__preferenceHead">
                <span className="fullTripBuilder__preferenceLabel">
                  Trip Pace
                </span>

                <span className="fullTripBuilder__preferenceHint">
                  How much should each day include?
                </span>
              </div>

              <div className="fullTripBuilder__preferenceGrid">
                <button
                  type="button"
                  className={[
                    "fullTripBuilder__preferenceCard",
                    tripData.tripPace === "relaxed" ? "isSelected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => updateField("tripPace", "relaxed")}
                >
                  <span className="fullTripBuilder__preferenceIcon">☕</span>

                  <strong>Relaxed</strong>

                  <span>
                    Fewer activities, longer stops, and more free time.
                  </span>
                </button>

                <button
                  type="button"
                  className={[
                    "fullTripBuilder__preferenceCard",
                    tripData.tripPace === "balanced" ? "isSelected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => updateField("tripPace", "balanced")}
                >
                  <span className="fullTripBuilder__preferenceIcon">◐</span>

                  <strong>Balanced</strong>

                  <span>
                    A comfortable mix of sightseeing, travel, and rest.
                  </span>
                </button>

                <button
                  type="button"
                  className={[
                    "fullTripBuilder__preferenceCard",
                    tripData.tripPace === "packed" ? "isSelected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => updateField("tripPace", "packed")}
                >
                  <span className="fullTripBuilder__preferenceIcon">⚡</span>

                  <strong>Packed</strong>

                  <span>
                    More stops and activities for travelers who want to maximize
                    every day.
                  </span>
                </button>
              </div>
            </div>

            {/* =================================================
      DAILY START
  ================================================= */}

            <div className="fullTripBuilder__preferenceGroup">
              <div className="fullTripBuilder__preferenceHead">
                <span className="fullTripBuilder__preferenceLabel">
                  Daily Start
                </span>

                <span className="fullTripBuilder__preferenceHint">
                  When do you prefer to begin?
                </span>
              </div>

              <div className="fullTripBuilder__preferenceGrid">
                <button
                  type="button"
                  className={[
                    "fullTripBuilder__preferenceCard",
                    tripData.dailyStart === "early" ? "isSelected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => updateField("dailyStart", "early")}
                >
                  <span className="fullTripBuilder__preferenceIcon">🌅</span>

                  <strong>Early Start</strong>

                  <span>
                    Begin early for quieter roads, cool weather, and longer
                    sightseeing days.
                  </span>
                </button>

                <button
                  type="button"
                  className={[
                    "fullTripBuilder__preferenceCard",
                    tripData.dailyStart === "normal" ? "isSelected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => updateField("dailyStart", "normal")}
                >
                  <span className="fullTripBuilder__preferenceIcon">☀️</span>

                  <strong>Normal Start</strong>

                  <span>
                    Start at a comfortable morning time without rushing.
                  </span>
                </button>

                <button
                  type="button"
                  className={[
                    "fullTripBuilder__preferenceCard",
                    tripData.dailyStart === "flexible" ? "isSelected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => updateField("dailyStart", "flexible")}
                >
                  <span className="fullTripBuilder__preferenceIcon">↔</span>

                  <strong>Flexible</strong>

                  <span>
                    Let the itinerary adjust start times based on each day’s
                    plan.
                  </span>
                </button>
              </div>
            </div>

            {/* =================================================
      ACTIVITY LEVEL
  ================================================= */}

            <div className="fullTripBuilder__preferenceGroup">
              <div className="fullTripBuilder__preferenceHead">
                <span className="fullTripBuilder__preferenceLabel">
                  Activity Level
                </span>

                <span className="fullTripBuilder__preferenceHint">
                  How physically active should the trip be?
                </span>
              </div>

              <div className="fullTripBuilder__preferenceGrid">
                <button
                  type="button"
                  className={[
                    "fullTripBuilder__preferenceCard",
                    tripData.activityLevel === "light" ? "isSelected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => updateField("activityLevel", "light")}
                >
                  <span className="fullTripBuilder__preferenceIcon">🌿</span>

                  <strong>Light</strong>

                  <span>
                    Easy walks, accessible stops, and minimal physical effort.
                  </span>
                </button>

                <button
                  type="button"
                  className={[
                    "fullTripBuilder__preferenceCard",
                    tripData.activityLevel === "moderate" ? "isSelected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => updateField("activityLevel", "moderate")}
                >
                  <span className="fullTripBuilder__preferenceIcon">🚶</span>

                  <strong>Moderate</strong>

                  <span>
                    Regular walking and outdoor activities with a comfortable
                    balance.
                  </span>
                </button>

                <button
                  type="button"
                  className={[
                    "fullTripBuilder__preferenceCard",
                    tripData.activityLevel === "active" ? "isSelected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => updateField("activityLevel", "active")}
                >
                  <span className="fullTripBuilder__preferenceIcon">🥾</span>

                  <strong>Active</strong>

                  <span>
                    Hiking, trekking, longer walks, and more energetic
                    experiences.
                  </span>
                </button>
              </div>
            </div>
          </div>
          {/* =================================================
    STEP 06 — SPECIAL REQUIREMENTS & TRAVEL NEEDS
================================================= */}

          <div className="fullTripBuilder__panel fullTripBuilder__panel--requirements">
            <div className="fullTripBuilder__stepHeader">
              <div>
                <span className="fullTripBuilder__stepNumber">06</span>

                <span className="fullTripBuilder__stepLabel">
                  Special Requirements & Travel Needs
                </span>
              </div>

              <span className="fullTripBuilder__stepStatus">Optional</span>
            </div>

            <div className="fullTripBuilder__stepIntro">
              <h3 className="fullTripBuilder__stepTitle">
                Anything we should plan around?
              </h3>

              <p className="fullTripBuilder__stepText">
                Tell us about any traveler needs or preferences that should
                influence transport, accommodation, activities, and the overall
                itinerary.
              </p>
            </div>

            {/* TRAVELER NEEDS */}
            <div className="fullTripBuilder__requirementsGrid">
              <label
                className={[
                  "fullTripBuilder__requirementCard",
                  tripData.travelingWithChildren ? "isSelected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <input
                  type="checkbox"
                  checked={Boolean(tripData.travelingWithChildren)}
                  onChange={(event) =>
                    updateField("travelingWithChildren", event.target.checked)
                  }
                />

                <span className="fullTripBuilder__requirementIcon">👨‍👩‍👧</span>

                <span className="fullTripBuilder__requirementCopy">
                  <strong>Traveling with Children</strong>

                  <small>
                    Prioritize family-friendly activities, easier transfers, and
                    comfortable daily pacing.
                  </small>
                </span>
              </label>

              <label
                className={[
                  "fullTripBuilder__requirementCard",
                  tripData.travelingWithElderly ? "isSelected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <input
                  type="checkbox"
                  checked={Boolean(tripData.travelingWithElderly)}
                  onChange={(event) =>
                    updateField("travelingWithElderly", event.target.checked)
                  }
                />

                <span className="fullTripBuilder__requirementIcon">♿</span>

                <span className="fullTripBuilder__requirementCopy">
                  <strong>Traveling with Elderly Guests</strong>

                  <small>
                    Reduce demanding transfers and allow more recovery time
                    between activities.
                  </small>
                </span>
              </label>

              <label
                className={[
                  "fullTripBuilder__requirementCard",
                  tripData.accessibilityRequired ? "isSelected" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <input
                  type="checkbox"
                  checked={Boolean(tripData.accessibilityRequired)}
                  onChange={(event) =>
                    updateField("accessibilityRequired", event.target.checked)
                  }
                />

                <span className="fullTripBuilder__requirementIcon">◎</span>

                <span className="fullTripBuilder__requirementCopy">
                  <strong>Accessibility Support</strong>

                  <small>
                    Consider accessibility when recommending transport, stays,
                    routes, and activities.
                  </small>
                </span>
              </label>
            </div>

            {/* DIETARY PREFERENCE + SPECIAL REQUESTS */}
            <div className="fullTripBuilder__requirementsOptions">
              <div className="fullTripBuilder__field">
                <label htmlFor="dietary-preference">Dietary Preference</label>

                <select
                  id="dietary-preference"
                  value={tripData.dietaryPreference || "none"}
                  onChange={(event) =>
                    updateField("dietaryPreference", event.target.value)
                  }
                >
                  <option value="none">No Specific Preference</option>

                  <option value="vegetarian">Vegetarian</option>

                  <option value="vegan">Vegan</option>

                  <option value="halal-strict">
                    Halal — Strict Preference
                  </option>

                  <option value="gluten-free">Gluten Free</option>

                  <option value="other">Other / Custom</option>
                </select>
              </div>

              <div className="fullTripBuilder__field fullTripBuilder__field--wide">
                <label htmlFor="special-requests">Special Requests</label>

                <textarea
                  id="special-requests"
                  rows="5"
                  placeholder="Tell us about celebrations, mobility needs, food allergies, preferred stops, or anything else..."
                  value={tripData.specialRequests || ""}
                  onChange={(event) =>
                    updateField("specialRequests", event.target.value)
                  }
                />
              </div>
            </div>
          </div>
          {/* =================================================
    STEP 07 — REVIEW YOUR TRIP
================================================= */}

          <div className="fullTripBuilder__panel fullTripBuilder__panel--review">
            <div className="fullTripBuilder__stepHeader">
              <div>
                <span className="fullTripBuilder__stepNumber">07</span>

                <span className="fullTripBuilder__stepLabel">
                  Review Your Trip
                </span>
              </div>

              <span className="fullTripBuilder__stepStatus">Final Step</span>
            </div>

            <div className="fullTripBuilder__stepIntro">
              <h3 className="fullTripBuilder__stepTitle">
                Ready to build your itinerary?
              </h3>

              <p className="fullTripBuilder__stepText">
                Review the details below. You can still go back and change any
                selection before generating your personalized Pakistan journey.
              </p>
            </div>

            <div className="fullTripBuilder__reviewGrid">
              {/* TRIP BASICS */}
              <div className="fullTripBuilder__reviewCard">
                <span className="fullTripBuilder__reviewEyebrow">
                  Trip Basics
                </span>

                <div className="fullTripBuilder__reviewList">
                  <div>
                    <span>Starting From</span>
                    <strong>{originLabel}</strong>
                  </div>

                  <div>
                    <span>Destination</span>
                    <strong>{destinationLabel}</strong>
                  </div>

                  <div>
                    <span>Travel Date</span>
                    <strong>{tripTypeLabel}</strong>
                  </div>

                  <div>
                    <span>Travelers</span>
                    <strong>{tripData.travelers || 1}</strong>
                  </div>

                  <div>
                    <span>Trip Type</span>
                    <strong>{tripData.tripType || "Not selected"}</strong>
                  </div>
                </div>
              </div>

              {/* GETTING THERE */}
              <div className="fullTripBuilder__reviewCard">
                <span className="fullTripBuilder__reviewEyebrow">
                  Getting There
                </span>

                <div className="fullTripBuilder__reviewList">
                  <div>
                    <span>Travel Mode</span>
                    <strong>{tripData.travelMode || "Not selected"}</strong>
                  </div>

                  <div>
                    <span>Route Preference</span>
                    <strong>
                      {formatValue(tripData.routePreference || "recommended")}
                    </strong>
                  </div>

                  <div>
                    <span>Pickup Required</span>
                    <strong>{tripData.pickupRequired ? "Yes" : "No"}</strong>
                  </div>
                </div>
              </div>

              {/* STAY & BUDGET */}
              <div className="fullTripBuilder__reviewCard">
                <span className="fullTripBuilder__reviewEyebrow">
                  Stay & Budget
                </span>

                <div className="fullTripBuilder__reviewList">
                  <div>
                    <span>Accommodation</span>
                    <strong>{formatValue(tripData.accommodationType)}</strong>
                  </div>

                  <div>
                    <span>Budget Style</span>
                    <strong>{formatValue(tripData.budgetLevel)}</strong>
                  </div>

                  <div>
                    <span>Rooms</span>
                    <strong>{tripData.rooms || 1}</strong>
                  </div>
                </div>
              </div>

              {/* EXPERIENCE */}
              <div className="fullTripBuilder__reviewCard">
                <span className="fullTripBuilder__reviewEyebrow">
                  Experiences
                </span>

                <div className="fullTripBuilder__reviewList">
                  <div className="fullTripBuilder__reviewListItem--stack">
                    <span>Interests</span>

                    <strong>
                      {Array.isArray(tripData.interests) &&
                      tripData.interests.length > 0
                        ? tripData.interests
                            .map((interest) => formatValue(interest))
                            .join(", ")
                        : "No interests selected"}
                    </strong>
                  </div>
                </div>
              </div>

              {/* DAILY PREFERENCES */}
              <div className="fullTripBuilder__reviewCard">
                <span className="fullTripBuilder__reviewEyebrow">
                  Daily Preferences
                </span>

                <div className="fullTripBuilder__reviewList">
                  <div>
                    <span>Trip Pace</span>
                    <strong>{formatValue(tripData.tripPace)}</strong>
                  </div>

                  <div>
                    <span>Daily Start</span>
                    <strong>{formatValue(tripData.dailyStart)}</strong>
                  </div>

                  <div>
                    <span>Activity Level</span>
                    <strong>{formatValue(tripData.activityLevel)}</strong>
                  </div>
                </div>
              </div>

              {/* TRAVEL NEEDS */}
              <div className="fullTripBuilder__reviewCard">
                <span className="fullTripBuilder__reviewEyebrow">
                  Travel Needs
                </span>

                <div className="fullTripBuilder__reviewList">
                  <div>
                    <span>With Children</span>
                    <strong>
                      {tripData.travelingWithChildren ? "Yes" : "No"}
                    </strong>
                  </div>

                  <div>
                    <span>With Elderly</span>
                    <strong>
                      {tripData.travelingWithElderly ? "Yes" : "No"}
                    </strong>
                  </div>

                  <div>
                    <span>Accessibility</span>
                    <strong>
                      {tripData.accessibilityRequired ? "Yes" : "No"}
                    </strong>
                  </div>

                  <div>
                    <span>Dietary Preference</span>
                    <strong>
                      {tripData.dietaryPreference === "none"
                        ? "No Specific Preference"
                        : formatValue(tripData.dietaryPreference)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* SPECIAL REQUESTS */}
            {tripData.specialRequests ? (
              <div className="fullTripBuilder__reviewNotes">
                <span>Special Requests</span>

                <p>{tripData.specialRequests}</p>
              </div>
            ) : null}

            {/* GENERATE ACTION */}
            <div className="fullTripBuilder__generateArea">
              <div>
                <span className="fullTripBuilder__generateEyebrow">
                  Your Journey Is Ready
                </span>

                <h3>Generate your personalized Pakistan itinerary.</h3>

                <p>
                  Your selections will be used to create a tailored itinerary
                  with route guidance, travel conditions, destination
                  recommendations, and practical advisories.
                </p>
              </div>

              <button
                type="button"
                className="fullTripBuilder__generateButton"
                onClick={() => updateField("itineraryGenerated", true)}
              >
                <span>Generate My Itinerary</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
