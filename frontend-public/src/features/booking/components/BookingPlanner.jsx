import {
  ArrowRight,
  CalendarDays,
  Car,
  Check,
  CheckCircle2,
  Minus,
  Plane,
  Plus,
  Route,
} from "lucide-react";

import TripSummary from "./TripSummary";
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

export default function BookingPlanner({
  content,
  regions,
  travelModes,
  vehicleOptions,
  routePreferences,
  travelSupport,
  accommodationLevels,
  accommodationTypes,
  roomPreferences,
  mealPreferences,
  trip,
  setTrip,
}) {
  if (!content || !regions?.length) {
    return null;
  }

  const selectedRegion =
    regions.find((region) => region.id === trip.region) || null;

  /* =======================================================
     SELECT REGION
  ======================================================= */

  const handleRegionSelect = (region) => {
    setTrip((current) => ({
      ...current,
      region: region.id,
      regionName: region.name,
      places: [],
    }));
  };

  /* =======================================================
     SELECT / REMOVE PLACE
  ======================================================= */

  const handlePlaceToggle = (place) => {
    setTrip((current) => {
      const alreadySelected = current.places.includes(place);

      return {
        ...current,
        places: alreadySelected
          ? current.places.filter((item) => item !== place)
          : [...current.places, place],
      };
    });
  };

  /* =======================================================
     UPDATE FIELD
  ======================================================= */

  const handleFieldChange = (field, value) => {
    setTrip((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /* =======================================================
     TRAVELER COUNTER
  ======================================================= */

  const updateTravelers = (amount) => {
    setTrip((current) => ({
      ...current,
      travelers: Math.max(1, current.travelers + amount),
    }));
  };

  /* =======================================================
     DAY COUNTER
  ======================================================= */

  const updateDays = (amount) => {
    setTrip((current) => ({
      ...current,
      days: Math.max(1, current.days + amount),
    }));
  };

  /* =======================================================
   TRAVEL MODE
======================================================= */

  const handleTravelModeSelect = (mode) => {
    setTrip((current) => ({
      ...current,
      travelMode: mode,
    }));
  };

  /* =======================================================
   VEHICLE TYPE
======================================================= */

  const handleVehicleSelect = (vehicle) => {
    setTrip((current) => ({
      ...current,
      vehicleType: vehicle,
    }));
  };

  /* =======================================================
   ROUTE PREFERENCE
======================================================= */

  const handleRoutePreference = (route) => {
    setTrip((current) => ({
      ...current,
      routePreference: route,
    }));
  };

  /* =======================================================
   TRAVEL SUPPORT
======================================================= */

  const handleTravelSupportToggle = (field) => {
    setTrip((current) => ({
      ...current,
      [field]: !current[field],
    }));
  };

  /* =======================================================
   ACCOMMODATION LEVEL
======================================================= */

  const handleAccommodationLevel = (level) => {
    setTrip((current) => ({
      ...current,
      accommodationLevel: level,
    }));
  };

  /* =======================================================
   ACCOMMODATION TYPE
======================================================= */

  const handleAccommodationTypeToggle = (type) => {
    setTrip((current) => {
      const alreadySelected = current.accommodationTypes.includes(type);

      return {
        ...current,

        accommodationTypes: alreadySelected
          ? current.accommodationTypes.filter((item) => item !== type)
          : [...current.accommodationTypes, type],
      };
    });
  };

  /* =======================================================
   ROOM PREFERENCE
======================================================= */

  const handleRoomPreference = (room) => {
    setTrip((current) => ({
      ...current,
      roomPreference: room,
    }));
  };

  /* =======================================================
   MEAL PREFERENCE
======================================================= */

  const handleMealPreference = (meal) => {
    setTrip((current) => ({
      ...current,
      mealPreference: meal,
    }));
  };

  return (
    <section id="booking-planner" className="bookingPlanner">
      <div className="bookingPlanner__container">
        {/* ===============================================
            INTRO
        =============================================== */}

        <div className="bookingPlanner__intro">
          <span>{content.eyebrow}</span>

          <h2>{content.title}</h2>

          <p>{content.description}</p>
        </div>

        {/* ===============================================
            PROGRESS
        =============================================== */}

        <div className="bookingPlanner__progress">
          {content.steps.map((step) => (
            <div
              key={step.id}
              className={
                step.id === 1
                  ? "bookingPlannerStep bookingPlannerStep--active"
                  : "bookingPlannerStep"
              }
            >
              <span>{String(step.id).padStart(2, "0")}</span>

              <strong>{step.label}</strong>
            </div>
          ))}
        </div>

        {/* ===============================================
            MAIN LAYOUT
        =============================================== */}

        <div className="bookingPlanner__layout">
          {/* =============================================
              LEFT — FORM
          ============================================= */}

          <div className="bookingPlanner__form">
            {/* ===========================================
                REGION
            =========================================== */}

            <div className="bookingPlannerBlock">
              <div className="bookingPlannerBlock__heading">
                <span>01</span>

                <div>
                  <h3>Where would you like to go?</h3>

                  <p>Start by selecting a region of Pakistan.</p>
                </div>
              </div>

              <div className="bookingRegionGrid">
                {regions.map((region) => {
                  const isSelected = trip.region === region.id;

                  return (
                    <button
                      key={region.id}
                      type="button"
                      className={
                        isSelected
                          ? "bookingRegionCard bookingRegionCard--selected"
                          : "bookingRegionCard"
                      }
                      onClick={() => handleRegionSelect(region)}
                    >
                      <span className="bookingRegionCard__check">
                        {isSelected && <Check size={14} strokeWidth={2.2} />}
                      </span>

                      <strong>{region.name}</strong>

                      <small>{region.description}</small>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ===========================================
                PLACES
            =========================================== */}

            {selectedRegion && (
              <div className="bookingPlannerBlock">
                <div className="bookingPlannerBlock__heading">
                  <span>02</span>

                  <div>
                    <h3>Places you want to visit</h3>

                    <p>Select one or multiple destinations.</p>
                  </div>
                </div>

                <div className="bookingPlaceGrid">
                  {selectedRegion.places.map((place) => {
                    const isSelected = trip.places.includes(place);

                    return (
                      <button
                        key={place}
                        type="button"
                        className={
                          isSelected
                            ? "bookingPlaceChip bookingPlaceChip--selected"
                            : "bookingPlaceChip"
                        }
                        onClick={() => handlePlaceToggle(place)}
                      >
                        <span>{place}</span>

                        {isSelected && <Check size={14} strokeWidth={2.2} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ===========================================
                DATES
            =========================================== */}

            <div className="bookingPlannerBlock">
              <div className="bookingPlannerBlock__heading">
                <span>03</span>

                <div>
                  <h3>When are you travelling?</h3>

                  <p>Add your preferred travel dates.</p>
                </div>
              </div>

              <div className="bookingDateGrid">
                {/* START DATE */}

                <label className="bookingField">
                  <span>START DATE</span>

                  <div className="bookingField__input">
                    <CalendarDays size={17} strokeWidth={1.7} />

                    <input
                      type="date"
                      value={trip.startDate}
                      onChange={(event) =>
                        handleFieldChange("startDate", event.target.value)
                      }
                    />
                  </div>
                </label>

                {/* END DATE */}

                <label className="bookingField">
                  <span>END DATE</span>

                  <div className="bookingField__input">
                    <CalendarDays size={17} strokeWidth={1.7} />

                    <input
                      type="date"
                      value={trip.endDate}
                      onChange={(event) =>
                        handleFieldChange("endDate", event.target.value)
                      }
                    />
                  </div>
                </label>
              </div>

              {/* FLEXIBLE DATES */}

              <label className="bookingFlexible">
                <input
                  type="checkbox"
                  checked={trip.flexibleDates}
                  onChange={(event) =>
                    handleFieldChange("flexibleDates", event.target.checked)
                  }
                />

                <span className="bookingFlexible__box">
                  {trip.flexibleDates && <Check size={13} strokeWidth={2.4} />}
                </span>

                <span>My travel dates are flexible</span>
              </label>
            </div>

            {/* ===========================================
                DAYS + TRAVELERS
            =========================================== */}

            <div className="bookingPlannerBlock">
              <div className="bookingPlannerBlock__heading">
                <span>04</span>

                <div>
                  <h3>Tell us about your trip</h3>

                  <p>
                    How long are you staying and how many people are travelling?
                  </p>
                </div>
              </div>

              <div className="bookingCounterGrid">
                {/* TRIP LENGTH */}

                <div className="bookingCounter">
                  <div>
                    <small>TRIP LENGTH</small>

                    <strong>
                      {trip.days} {trip.days === 1 ? "Day" : "Days"}
                    </strong>
                  </div>

                  <div className="bookingCounter__controls">
                    <button
                      type="button"
                      onClick={() => updateDays(-1)}
                      aria-label="Reduce trip length"
                    >
                      <Minus size={16} />
                    </button>

                    <span>{trip.days}</span>

                    <button
                      type="button"
                      onClick={() => updateDays(1)}
                      aria-label="Increase trip length"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* TRAVELERS */}

                <div className="bookingCounter">
                  <div>
                    <small>TRAVELERS</small>

                    <strong>
                      {trip.travelers}{" "}
                      {trip.travelers === 1 ? "Traveler" : "Travelers"}
                    </strong>
                  </div>

                  <div className="bookingCounter__controls">
                    <button
                      type="button"
                      onClick={() => updateTravelers(-1)}
                      aria-label="Reduce travelers"
                    >
                      <Minus size={16} />
                    </button>

                    <span>{trip.travelers}</span>

                    <button
                      type="button"
                      onClick={() => updateTravelers(1)}
                      aria-label="Increase travelers"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ===========================================
    STEP 02 — TRAVEL & TRANSPORT
=========================================== */}

            <div className="bookingPlannerBlock bookingPlannerBlock--travel">
              <div className="bookingPlannerBlock__heading">
                <span>05</span>

                <div>
                  <h3>How would you like to travel?</h3>

                  <p>
                    Choose your preferred transport style and route preferences.
                  </p>
                </div>
              </div>

              {/* =========================================
      TRAVEL MODE
  ========================================= */}

              <div className="bookingTravelModeGrid">
                {travelModes?.map((mode) => {
                  const isSelected = trip.travelMode === mode.id;

                  const icon =
                    mode.id === "road" ? (
                      <Car size={20} strokeWidth={1.8} />
                    ) : mode.id === "air" ? (
                      <Plane size={20} strokeWidth={1.8} />
                    ) : (
                      <Route size={20} strokeWidth={1.8} />
                    );

                  return (
                    <button
                      key={mode.id}
                      type="button"
                      className={
                        isSelected
                          ? "bookingTravelModeCard bookingTravelModeCard--selected"
                          : "bookingTravelModeCard"
                      }
                      onClick={() => handleTravelModeSelect(mode.id)}
                    >
                      <span className="bookingTravelModeCard__icon">
                        {icon}
                      </span>

                      <strong>{mode.title}</strong>

                      <small>{mode.description}</small>

                      {isSelected && (
                        <span className="bookingTravelModeCard__check">
                          <CheckCircle2 size={17} strokeWidth={2} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* =========================================
      VEHICLE
  ========================================= */}

              {(trip.travelMode === "road" ||
                trip.travelMode === "road-air") && (
                <div className="bookingTravelSubsection">
                  <div className="bookingTravelSubsection__heading">
                    <span>VEHICLE PREFERENCE</span>

                    <p>Select the vehicle that best fits your journey.</p>
                  </div>

                  <div className="bookingVehicleGrid">
                    {vehicleOptions?.map((vehicle) => {
                      const isSelected = trip.vehicleType === vehicle.id;

                      return (
                        <button
                          key={vehicle.id}
                          type="button"
                          className={
                            isSelected
                              ? "bookingVehicleCard bookingVehicleCard--selected"
                              : "bookingVehicleCard"
                          }
                          onClick={() => handleVehicleSelect(vehicle.id)}
                        >
                          <strong>{vehicle.title}</strong>

                          <small>{vehicle.description}</small>

                          {isSelected && <Check size={14} strokeWidth={2.2} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* =========================================
      ROUTE
  ========================================= */}

              <div className="bookingTravelSubsection">
                <div className="bookingTravelSubsection__heading">
                  <span>ROUTE PREFERENCE</span>

                  <p>Tell us what matters most during your road journey.</p>
                </div>

                <div className="bookingRouteGrid">
                  {routePreferences?.map((route) => {
                    const isSelected = trip.routePreference === route.id;

                    return (
                      <button
                        key={route.id}
                        type="button"
                        className={
                          isSelected
                            ? "bookingRouteCard bookingRouteCard--selected"
                            : "bookingRouteCard"
                        }
                        onClick={() => handleRoutePreference(route.id)}
                      >
                        <strong>{route.title}</strong>

                        <small>{route.description}</small>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* =========================================
      SUPPORT
  ========================================= */}

              <div className="bookingTravelSubsection">
                <div className="bookingTravelSubsection__heading">
                  <span>TRAVEL SUPPORT</span>

                  <p>Add any support services you may need.</p>
                </div>

                <div className="bookingSupportGrid">
                  {travelSupport?.map((support) => {
                    const isSelected = Boolean(trip[support.id]);

                    return (
                      <button
                        key={support.id}
                        type="button"
                        className={
                          isSelected
                            ? "bookingSupportCard bookingSupportCard--selected"
                            : "bookingSupportCard"
                        }
                        onClick={() => handleTravelSupportToggle(support.id)}
                      >
                        <span className="bookingSupportCard__check">
                          {isSelected && <Check size={14} strokeWidth={2.2} />}
                        </span>

                        <div>
                          <strong>{support.title}</strong>

                          <small>{support.description}</small>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ===========================================
    STEP 03 — STAY & ACCOMMODATION
=========================================== */}

            <div className="bookingPlannerBlock bookingPlannerBlock--stay">
              <div className="bookingPlannerBlock__heading">
                <span>06</span>

                <div>
                  <h3>How would you like to stay?</h3>

                  <p>
                    Choose your preferred accommodation style, room setup, and
                    meal plan.
                  </p>
                </div>
              </div>

              {/* =========================================
      ACCOMMODATION LEVEL
  ========================================= */}

              <div className="bookingStaySubsection">
                <div className="bookingStaySubsection__heading">
                  <span>ACCOMMODATION LEVEL</span>

                  <p>
                    Select the comfort level that best matches your journey.
                  </p>
                </div>

                <div className="bookingAccommodationLevelGrid">
                  {accommodationLevels?.map((level) => {
                    const isSelected = trip.accommodationLevel === level.id;

                    return (
                      <button
                        key={level.id}
                        type="button"
                        className={
                          isSelected
                            ? "bookingAccommodationLevelCard bookingAccommodationLevelCard--selected"
                            : "bookingAccommodationLevelCard"
                        }
                        onClick={() => handleAccommodationLevel(level.id)}
                      >
                        <span className="bookingAccommodationLevelCard__label">
                          {level.label}
                        </span>

                        <strong>{level.title}</strong>

                        <small>{level.description}</small>

                        {isSelected && (
                          <span className="bookingAccommodationLevelCard__check">
                            <Check size={15} strokeWidth={2.2} />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* =========================================
      ACCOMMODATION TYPE
  ========================================= */}

              <div className="bookingStaySubsection">
                <div className="bookingStaySubsection__heading">
                  <span>STAY TYPE</span>

                  <p>You can select more than one option.</p>
                </div>

                <div className="bookingAccommodationTypeGrid">
                  {accommodationTypes?.map((type) => {
                    const isSelected = trip.accommodationTypes.includes(
                      type.id,
                    );

                    return (
                      <button
                        key={type.id}
                        type="button"
                        className={
                          isSelected
                            ? "bookingAccommodationTypeCard bookingAccommodationTypeCard--selected"
                            : "bookingAccommodationTypeCard"
                        }
                        onClick={() => handleAccommodationTypeToggle(type.id)}
                      >
                        <span className="bookingAccommodationTypeCard__check">
                          {isSelected && <Check size={14} strokeWidth={2.2} />}
                        </span>

                        <div>
                          <strong>{type.title}</strong>

                          <small>{type.description}</small>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* =========================================
      ROOM PREFERENCE
  ========================================= */}

              <div className="bookingStaySubsection">
                <div className="bookingStaySubsection__heading">
                  <span>ROOM PREFERENCE</span>

                  <p>Choose the room setup that best suits your travelers.</p>
                </div>

                <div className="bookingRoomGrid">
                  {roomPreferences?.map((room) => {
                    const isSelected = trip.roomPreference === room.id;

                    return (
                      <button
                        key={room.id}
                        type="button"
                        className={
                          isSelected
                            ? "bookingRoomChip bookingRoomChip--selected"
                            : "bookingRoomChip"
                        }
                        onClick={() => handleRoomPreference(room.id)}
                      >
                        <span>{room.title}</span>

                        {isSelected && <Check size={13} strokeWidth={2.2} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* =========================================
      MEAL PREFERENCE
  ========================================= */}

              <div className="bookingStaySubsection">
                <div className="bookingStaySubsection__heading">
                  <span>MEAL PREFERENCE</span>

                  <p>
                    Choose how you would like meals included with your stay.
                  </p>
                </div>

                <div className="bookingMealGrid">
                  {mealPreferences?.map((meal) => {
                    const isSelected = trip.mealPreference === meal.id;

                    return (
                      <button
                        key={meal.id}
                        type="button"
                        className={
                          isSelected
                            ? "bookingMealCard bookingMealCard--selected"
                            : "bookingMealCard"
                        }
                        onClick={() => handleMealPreference(meal.id)}
                      >
                        <strong>{meal.title}</strong>

                        <small>{meal.description}</small>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* =========================================
      SPECIAL STAY REQUEST
  ========================================= */}

              <div className="bookingStaySubsection">
                <label className="bookingStayRequest">
                  <span>SPECIAL STAY REQUEST</span>

                  <textarea
                    rows="4"
                    value={trip.specialStayRequest}
                    onChange={(event) =>
                      handleFieldChange(
                        "specialStayRequest",
                        event.target.value,
                      )
                    }
                    placeholder="Example: mountain-view room, connecting rooms, accessibility needs, quiet property..."
                  />
                </label>
              </div>
            </div>

            {/* ===========================================
                CONTINUE
            =========================================== */}

            <button type="button" className="bookingPlanner__continue">
              <span>Continue to Travel</span>

              <ArrowRight size={18} strokeWidth={2} />
            </button>
          </div>

          {/* =============================================
              RIGHT — LIVE SUMMARY
          ============================================= */}

          <div className="bookingPlanner__summary">
            <TripSummary trip={trip} />
          </div>
        </div>
      </div>
    </section>
  );
}
