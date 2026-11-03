import {
  destinationIntelligence,
  quickTripBuilderData,
} from "../data/planTripData";

export default function GeneratedItinerary({ tripData }) {
  if (!tripData?.itineraryGenerated) {
    return null;
  }

  const interests = Array.isArray(tripData.interests) ? tripData.interests : [];
  const intelligence = destinationIntelligence[tripData.destination] || null;
  const getLabel = (items, value) => {
    const item = items.find((entry) => entry.value === value);

    return item?.label || value || "Not selected";
  };

  const formatValue = (value) => {
    if (!value) {
      return "Not selected";
    }

    return String(value)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  };

  const originLabel = getLabel(
    quickTripBuilderData.origins || [],
    tripData.origin,
  );

  const destinationLabel = getLabel(
    quickTripBuilderData.destinations || [],
    tripData.destination,
  );
  return (
    <section
      id="generated-itinerary"
      className="generatedItinerary"
      aria-labelledby="generated-itinerary-title"
    >
      <div className="generatedItinerary__container">
        <div className="generatedItinerary__intro">
          <span className="generatedItinerary__eyebrow">
            Your Personalized Journey
          </span>

          <h2
            id="generated-itinerary-title"
            className="generatedItinerary__title"
          >
            Your Pakistan Trip Blueprint
          </h2>

          <p className="generatedItinerary__description">
            This first itinerary preview is built from your selected travel
            preferences. Live route, weather, road-condition, event, and
            advisory intelligence will be connected in the next development
            stages.
          </p>
        </div>

        {/* ===================================================
            TRIP OVERVIEW
        =================================================== */}

        <div className="generatedItinerary__overview">
          <div className="generatedItinerary__overviewItem">
            <span>Starting From</span>
            <strong>{originLabel}</strong>
          </div>

          <div className="generatedItinerary__overviewItem">
            <span>Destination</span>
            <strong>{destinationLabel}</strong>
          </div>

          <div className="generatedItinerary__overviewItem">
            <span>Travel Date</span>
            <strong>
              {tripData.travelMode
                ? formatValue(tripData.travelMode)
                : "Flexible"}
            </strong>
          </div>

          <div className="generatedItinerary__overviewItem">
            <span>Travelers</span>
            <strong>{tripData.travelers || 1}</strong>
          </div>

          <div className="generatedItinerary__overviewItem">
            <span>Travel Mode</span>
            <strong>{tripData.travelMode || "Flexible"}</strong>
          </div>

          <div className="generatedItinerary__overviewItem">
            <span>Trip Pace</span>
            <strong>{formatValue(tripData.tripPace || "balanced")}</strong>
          </div>
        </div>

        {/* ===================================================
            ITINERARY PREVIEW
        =================================================== */}

        <div className="generatedItinerary__layout">
          <div className="generatedItinerary__main">
            <div className="generatedItinerary__sectionHead">
              <span>Suggested Journey</span>

              <h3>A flexible itinerary framework for your trip</h3>
            </div>

            <div className="generatedItinerary__timeline">
              <article className="generatedItinerary__day">
                <div className="generatedItinerary__dayNumber">01</div>

                <div className="generatedItinerary__dayContent">
                  <span className="generatedItinerary__dayEyebrow">
                    Arrival & Transfer
                  </span>

                  <h4>
                    Begin your journey from{" "}
                    {tripData.origin || "your starting city"}
                  </h4>

                  <p>
                    Travel toward{" "}
                    {tripData.destination || "your selected destination"} using
                    your preferred {tripData.travelMode || "travel"} option.
                    Allow time for transfers, check-in, rest, and orientation
                    after arrival.
                  </p>
                </div>
              </article>

              <article className="generatedItinerary__day">
                <div className="generatedItinerary__dayNumber">02</div>

                <div className="generatedItinerary__dayContent">
                  <span className="generatedItinerary__dayEyebrow">
                    Explore
                  </span>

                  <h4>Discover the destination at your preferred pace</h4>

                  <p>
                    Build the day around a {tripData.tripPace || "balanced"}{" "}
                    pace with a {tripData.activityLevel || "moderate"} activity
                    level.
                  </p>
                </div>
              </article>

              <article className="generatedItinerary__day">
                <div className="generatedItinerary__dayNumber">03</div>

                <div className="generatedItinerary__dayContent">
                  <span className="generatedItinerary__dayEyebrow">
                    Experiences
                  </span>

                  <h4>Personalize the day around your interests</h4>

                  <p>
                    {interests.length > 0
                      ? `Prioritize experiences related to ${interests.join(
                          ", ",
                        )}.`
                      : "Mix scenic, cultural, local, and relaxing experiences based on the destination."}
                  </p>
                </div>
              </article>
            </div>
          </div>

          {/* =================================================
              TRIP INTELLIGENCE PLACEHOLDERS
          ================================================= */}

          <aside className="generatedItinerary__sidebar">
            {/* ROUTE INTELLIGENCE */}
            <div className="generatedItinerary__intelCard">
              <span className="generatedItinerary__intelEyebrow">
                Route Intelligence
              </span>

              <h4>{intelligence?.route?.status || "Route information"}</h4>

              <p>
                {intelligence?.route?.condition ||
                  "Route information will be available for your selected destination."}
              </p>

              <div className="generatedItinerary__intelMeta">
                <div>
                  <span>Estimated Time</span>

                  <strong>
                    {intelligence?.route?.estimatedTime || "To be confirmed"}
                  </strong>
                </div>

                <div>
                  <span>Recommended Mode</span>

                  <strong>
                    {intelligence?.route?.recommendedMode ||
                      tripData.travelMode ||
                      "Flexible"}
                  </strong>
                </div>
              </div>

              {intelligence?.route?.alternateRoute ? (
                <div className="generatedItinerary__intelNote">
                  <strong>Alternative</strong>

                  <p>{intelligence.route.alternateRoute}</p>
                </div>
              ) : null}
            </div>

            {/* WEATHER */}
            <div className="generatedItinerary__intelCard">
              <span className="generatedItinerary__intelEyebrow">
                Weather & Conditions
              </span>

              <h4>{intelligence?.weather?.status || "Travel weather"}</h4>

              <p>
                {intelligence?.weather?.summary ||
                  "Weather information will appear here."}
              </p>

              <div className="generatedItinerary__intelMeta">
                <div>
                  <span>Temperature</span>

                  <strong>
                    {intelligence?.weather?.temperature || "Seasonal"}
                  </strong>
                </div>
              </div>

              {intelligence?.weather?.recommendation ? (
                <div className="generatedItinerary__intelNote">
                  <strong>Recommendation</strong>

                  <p>{intelligence.weather.recommendation}</p>
                </div>
              ) : null}
            </div>

            {/* HAZARDS */}
            <div className="generatedItinerary__intelCard">
              <span className="generatedItinerary__intelEyebrow">
                Natural Hazards
              </span>

              <h4>{intelligence?.hazards?.level || "General awareness"}</h4>

              <p>
                {intelligence?.hazards?.summary ||
                  "Destination hazard information will appear here."}
              </p>
            </div>

            {/* CIVIC / SOCIAL CONDITIONS */}
            <div className="generatedItinerary__intelCard">
              <span className="generatedItinerary__intelEyebrow">
                Civic & Local Conditions
              </span>

              <h4>{intelligence?.civic?.status || "Local guidance"}</h4>

              <p>
                {intelligence?.civic?.summary ||
                  "Relevant civic and local travel guidance will appear here."}
              </p>
            </div>

            {/* EVENTS + BEST TIME */}
            <div className="generatedItinerary__intelCard">
              <span className="generatedItinerary__intelEyebrow">
                Events & Best Time
              </span>

              <h4>{intelligence?.events?.status || "Seasonal guidance"}</h4>

              <p>
                {intelligence?.events?.summary ||
                  "Relevant event information will appear here."}
              </p>

              {intelligence?.events?.bestTime ? (
                <div className="generatedItinerary__intelNote">
                  <strong>Best Time to Visit</strong>

                  <p>{intelligence.events.bestTime}</p>
                </div>
              ) : null}
            </div>

            {/* AIR TRAVEL */}
            <div className="generatedItinerary__intelCard">
              <span className="generatedItinerary__intelEyebrow">
                Air Travel
              </span>

              <h4>
                {intelligence?.airTravel?.available
                  ? "Air travel available"
                  : "Primarily road based"}
              </h4>

              <p>
                {intelligence?.airTravel?.summary ||
                  "Air travel information will appear here."}
              </p>
            </div>

            {/* ADVISORY */}
            <div className="generatedItinerary__intelCard generatedItinerary__intelCard--advisory">
              <span className="generatedItinerary__intelEyebrow">
                Travel Advisory
              </span>

              <h4>{intelligence?.advisory?.level || "Plan ahead"}</h4>

              <p>
                {intelligence?.advisory?.message ||
                  "Check current travel conditions before departure."}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
