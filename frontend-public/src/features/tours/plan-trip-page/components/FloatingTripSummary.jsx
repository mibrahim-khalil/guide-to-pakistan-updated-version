import { useState } from "react";

export default function FloatingTripSummary({ tripData, content }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!tripData || !content) {
    return null;
  }

  const { origins = [], destinations = [], tripTypes = [] } = content;

  const findLabel = (items, value) => {
    const item = items.find((entry) => entry.value === value);

    return item?.label || value || "Not selected";
  };

  const originLabel = findLabel(origins, tripData.origin);

  const destinationLabel = findLabel(destinations, tripData.destination);

  const tripTypeLabel = findLabel(tripTypes, tripData.tripType);

  if (!tripData.tripStarted) {
    return null;
  }

  const scrollToBuilder = () => {
    const target = document.getElementById("full-trip-builder");

    if (!target) {
      return;
    }

    const headerOffset = 100;

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });

    setIsOpen(false);
  };

  return (
    <aside
      className={["floatingTripSummary", isOpen ? "isOpen" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-label="Current trip summary"
    >
      <button
        type="button"
        className="floatingTripSummary__pill"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
      >
        <span className="floatingTripSummary__pillCopy">
          <small>Your Trip</small>

          <strong>
            {destinationLabel}
            {tripData.travelers
              ? ` · ${tripData.travelers} ${
                  tripData.travelers === 1 ? "Traveler" : "Travelers"
                }`
              : ""}
          </strong>
        </span>

        <span className="floatingTripSummary__chevron" aria-hidden="true">
          {isOpen ? "×" : "⌃"}
        </span>
      </button>

      {isOpen ? (
        <div className="floatingTripSummary__panel">
          <div className="floatingTripSummary__panelHead">
            <div>
              <span>Current Journey</span>

              <h3>{destinationLabel}</h3>
            </div>

            <button
              type="button"
              className="floatingTripSummary__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close trip summary"
            >
              ×
            </button>
          </div>

          <div className="floatingTripSummary__details">
            <div>
              <span>From</span>
              <strong>{originLabel}</strong>
            </div>

            <div>
              <span>Destination</span>
              <strong>{destinationLabel}</strong>
            </div>

            <div>
              <span>Date</span>
              <strong>{tripData.travelDate || "Flexible"}</strong>
            </div>

            <div>
              <span>Travelers</span>
              <strong>{tripData.travelers || 1}</strong>
            </div>

            <div>
              <span>Trip Type</span>
              <strong>{tripTypeLabel}</strong>
            </div>

            <div>
              <span>Travel Mode</span>
              <strong>{tripData.travelMode || "Flexible"}</strong>
            </div>
          </div>

          <button
            type="button"
            className="floatingTripSummary__continue"
            onClick={scrollToBuilder}
          >
            <span>Continue Planning</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}
    </aside>
  );
}
