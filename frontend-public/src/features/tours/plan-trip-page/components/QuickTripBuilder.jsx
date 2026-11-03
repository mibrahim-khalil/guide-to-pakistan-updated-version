export default function QuickTripBuilder({
  content,
  tripData,
  onChange,
  onBuildTrip,
}) {
  if (!content || !tripData) {
    return null;
  }

  const {
    origins = [],
    destinations = [],
    tripTypes = [],
    buttonLabel = "Build My Trip",
  } = content;

  const updateField = (field, value) => {
    if (typeof onChange === "function") {
      onChange(field, value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (typeof onBuildTrip === "function") {
      onBuildTrip();
    }
  };

  return (
    <section
      id="trip-builder"
      className="quickTripBuilder"
      aria-label="Quick trip builder"
    >
      <div className="planTripHero__container">
        <form
          className="quickTripBuilder__card"
          onSubmit={handleSubmit}
        >
          {/* ===================================================
              STARTING FROM
          =================================================== */}

          <div className="quickTripBuilder__field">
            <label
              className="quickTripBuilder__label"
              htmlFor="trip-origin"
            >
              Starting From
            </label>

            <select
              id="trip-origin"
              className="quickTripBuilder__control"
              value={tripData.origin}
              onChange={(event) =>
                updateField("origin", event.target.value)
              }
            >
              {origins.map((origin) => (
                <option
                  key={origin.value}
                  value={origin.value}
                >
                  {origin.label}
                </option>
              ))}
            </select>
          </div>

          {/* ===================================================
              DESTINATION
          =================================================== */}

          <div className="quickTripBuilder__field">
            <label
              className="quickTripBuilder__label"
              htmlFor="trip-destination"
            >
              Destination
            </label>

            <select
              id="trip-destination"
              className="quickTripBuilder__control"
              value={tripData.destination}
              onChange={(event) =>
                updateField(
                  "destination",
                  event.target.value,
                )
              }
            >
              {destinations.map((destination) => (
                <option
                  key={destination.value}
                  value={destination.value}
                >
                  {destination.label}
                </option>
              ))}
            </select>
          </div>

          {/* ===================================================
              TRAVEL DATE
          =================================================== */}

          <div className="quickTripBuilder__field">
            <label
              className="quickTripBuilder__label"
              htmlFor="trip-date"
            >
              Travel Date
            </label>

            <input
              id="trip-date"
              className="quickTripBuilder__control"
              type="date"
              value={tripData.travelDate}
              onChange={(event) =>
                updateField(
                  "travelDate",
                  event.target.value,
                )
              }
            />
          </div>

          {/* ===================================================
              TRAVELERS
          =================================================== */}

          <div className="quickTripBuilder__field">
            <label
              className="quickTripBuilder__label"
              htmlFor="trip-travelers"
            >
              Travelers
            </label>

            <input
              id="trip-travelers"
              className="quickTripBuilder__control"
              type="number"
              min="1"
              max="30"
              value={tripData.travelers}
              onChange={(event) =>
                updateField(
                  "travelers",
                  Number(event.target.value),
                )
              }
            />
          </div>

          {/* ===================================================
              TRIP TYPE
          =================================================== */}

          <div className="quickTripBuilder__field">
            <label
              className="quickTripBuilder__label"
              htmlFor="trip-type"
            >
              Trip Type
            </label>

            <select
              id="trip-type"
              className="quickTripBuilder__control"
              value={tripData.tripType}
              onChange={(event) =>
                updateField(
                  "tripType",
                  event.target.value,
                )
              }
            >
              {tripTypes.map((tripType) => (
                <option
                  key={tripType.value}
                  value={tripType.value}
                >
                  {tripType.label}
                </option>
              ))}
            </select>
          </div>

          {/* ===================================================
              BUILD TRIP
          =================================================== */}

          <button
            type="submit"
            className="quickTripBuilder__submit"
          >
            <span>{buttonLabel}</span>

            <span
              className="quickTripBuilder__submitArrow"
              aria-hidden="true"
            >
              →
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}