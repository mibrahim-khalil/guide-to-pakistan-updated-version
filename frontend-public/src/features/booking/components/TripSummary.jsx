import {
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";

export default function TripSummary({
  trip,
}) {
  const selectedPlaces =
    trip.places?.length > 0
      ? trip.places.join(", ")
      : "Not selected yet";

  return (
    <aside className="tripSummary">
      <div className="tripSummary__top">
        <span className="tripSummary__eyebrow">
          YOUR JOURNEY
        </span>

        <h3>
          Trip Summary
        </h3>

        <p>
          Your journey will update as you make
          selections.
        </p>
      </div>

      <div className="tripSummary__details">
        {/* DESTINATION */}

        <div className="tripSummary__item">
          <span className="tripSummary__icon">
            <MapPin
              size={18}
              strokeWidth={1.8}
            />
          </span>

          <div>
            <small>
              DESTINATION
            </small>

            <strong>
              {trip.regionName ||
                "Choose a region"}
            </strong>

            {trip.regionName && (
              <span>
                {selectedPlaces}
              </span>
            )}
          </div>
        </div>

        {/* DATES */}

        <div className="tripSummary__item">
          <span className="tripSummary__icon">
            <CalendarDays
              size={18}
              strokeWidth={1.8}
            />
          </span>

          <div>
            <small>
              TRAVEL DATES
            </small>

            <strong>
              {trip.startDate
                ? trip.endDate
                  ? `${trip.startDate} — ${trip.endDate}`
                  : trip.startDate
                : "Add your dates"}
            </strong>

            {trip.flexibleDates && (
              <span>
                Flexible dates
              </span>
            )}
          </div>
        </div>

        {/* TRAVELERS */}

        <div className="tripSummary__item">
          <span className="tripSummary__icon">
            <Users
              size={18}
              strokeWidth={1.8}
            />
          </span>

          <div>
            <small>
              TRAVELERS
            </small>

            <strong>
              {trip.travelers}{" "}
              {trip.travelers === 1
                ? "Traveler"
                : "Travelers"}
            </strong>

            <span>
              {trip.days}{" "}
              {trip.days === 1
                ? "Day"
                : "Days"}
            </span>
          </div>
        </div>
      </div>

      <div className="tripSummary__footer">
        <span>
          ESTIMATED TRIP
        </span>

        <strong>
          Pricing calculated later
        </strong>

        <small>
          Final pricing depends on route,
          transport, accommodation, and
          selected experiences.
        </small>
      </div>
    </aside>
  );
}