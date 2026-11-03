import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Landmark,
  Route,
  Thermometer,
} from "lucide-react";

import "../featuredPlaces.css";

function slugify(text = "") {
  return text
    .toLowerCase()
    .trim()
    .replace(/[’']/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function riskClass(risk = "") {
  const normalizedRisk = risk.toLowerCase();

  if (normalizedRisk.includes("not safe")) {
    return "notSafe";
  }

  if (normalizedRisk.includes("high")) {
    return "high";
  }

  if (normalizedRisk.includes("moderate")) {
    return "moderate";
  }

  if (normalizedRisk.includes("low")) {
    return "low";
  }

  return "unknown";
}

const RISK_ORDER = {
  "not safe": 1,
  "high risk": 2,
  "moderate risk": 3,
  "low risk": 4,
  unknown: 5,
};

function sortByRisk(places = []) {
  return [...places].sort((firstPlace, secondPlace) => {
    const firstRisk =
      RISK_ORDER[(firstPlace.risk || "unknown").toLowerCase()] || 5;

    const secondRisk =
      RISK_ORDER[(secondPlace.risk || "unknown").toLowerCase()] || 5;

    return firstRisk - secondRisk;
  });
}

function DestinationCard({ place, regionSlug, regionName }) {
  const placeSlug = slugify(place.name);
  const placeRiskClass = riskClass(place.risk);

  return (
    <article className="placeCard">
      <div className="placeCard__media">
        <img src={place.image} alt={place.name} loading="lazy" />

        <span className="placeCard__namePill">{place.name}</span>

        <button
          type="button"
          className="placeCard__save"
          aria-label={`Save ${place.name}`}
        >
          <Bookmark aria-hidden="true" />
        </button>
      </div>

      <div className="placeCard__body">
        <div className="placeCard__row">
          <span className="placeCard__regionPill">
            {place.region || regionName}
          </span>

          <span className="placeCard__meta">
            <span className="placeCard__metaIcon" aria-hidden="true">
              <Clock3 />
            </span>

            {place.updatedAgo || "Recently updated"}
          </span>
        </div>

        <div className="placeCard__row">
          <span className="placeCard__temperature">
            <span className="placeCard__metaIcon" aria-hidden="true">
              <Thermometer />
            </span>

            {place.temperature || "—"}
          </span>

          <span className="placeCard__status">
            <span className="placeCard__metaIcon" aria-hidden="true">
              <Landmark />
            </span>

            {place.civicStatus || "Normal"}
          </span>
        </div>

        <div className="placeCard__row">
          <span
            className={`placeCard__riskPill placeCard__riskPill--${placeRiskClass}`}
          >
            {place.risk || "Unknown"}
          </span>

          <span className="placeCard__status">
            <span className="placeCard__metaIcon" aria-hidden="true">
              <Route />
            </span>

            {place.roadStatus || "Normal"}
          </span>
        </div>

        <p className="placeCard__desc">{place.desc}</p>

        <div className="placeCard__actions">
          <Link
            to={`/destinations/${regionSlug}/${placeSlug}`}
            className="placeCard__btn placeCard__btn--primary"
          >
            More Info
          </Link>

          <Link to="/tiss" className="placeCard__btn placeCard__btn--ghost">
            Route Updates
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function FeaturedPlacesSection({
  places = [],
  regionSlug = "",
  regionName = "",
}) {
  const filters = [
    "All",
    "Not Safe",
    "High Risk",
    "Moderate Risk",
    "Low Risk",
    "Unknown",
  ];

  const cardsPerPage = 3;

  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);

  const sortedPlaces = useMemo(() => sortByRisk(places), [places]);

  const filteredPlaces = useMemo(() => {
    if (activeFilter === "All") {
      return sortedPlaces;
    }

    return sortedPlaces.filter(
      (place) =>
        (place.risk || "Unknown").toLowerCase() === activeFilter.toLowerCase(),
    );
  }, [activeFilter, sortedPlaces]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPlaces.length / cardsPerPage),
  );

  const firstVisibleIndex = currentPage * cardsPerPage;

  const visiblePlaces = filteredPlaces.slice(
    firstVisibleIndex,
    firstVisibleIndex + cardsPerPage,
  );

  useEffect(() => {
    setCurrentPage(0);
  }, [activeFilter]);

  useEffect(() => {
    if (currentPage > totalPages - 1) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [currentPage, totalPages]);

  const showPreviousSet = () => {
    setCurrentPage((page) => Math.max(0, page - 1));
  };

  const showNextSet = () => {
    setCurrentPage((page) => Math.min(totalPages - 1, page + 1));
  };

  return (
    <section
      className="regionPlaces"
      aria-label={`Featured places in ${regionName}`}
    >
      <div className="regionPlaces__inner">
        <div className="regionPlaces__head">
          <h2 className="regionPlaces__title">
            Featured Places in {regionName}
          </h2>

          <div className="regionPlaces__viewAllWrap">
            {filteredPlaces.length > cardsPerPage && (
              <span className="regionPlaces__more">
                +{filteredPlaces.length - cardsPerPage} more
              </span>
            )}

            <Link
              to={`/destinations/${regionSlug}/all-places`}
              className="regionPlaces__viewAll"
            >
              View all
            </Link>
          </div>
        </div>

        <div className="regionPlaces__sortBar">
          <span className="regionPlaces__sortLabel">
            Destinations sorted by risk (
          </span>

          <span className="regionPlaces__riskWord regionPlaces__riskWord--notSafe">
            Not Safe
          </span>

          <span className="regionPlaces__riskArrow">→</span>

          <span className="regionPlaces__riskWord regionPlaces__riskWord--high">
            High Risk
          </span>

          <span className="regionPlaces__riskArrow">→</span>

          <span className="regionPlaces__riskWord regionPlaces__riskWord--moderate">
            Moderate Risk
          </span>

          <span className="regionPlaces__riskArrow">→</span>

          <span className="regionPlaces__riskWord regionPlaces__riskWord--low">
            Low Risk
          </span>

          <span className="regionPlaces__riskArrow">→</span>

          <span className="regionPlaces__riskWord regionPlaces__riskWord--unknown">
            Unknown
          </span>

          <span className="regionPlaces__sortLabel">)</span>
        </div>

        <div
          className="regionPlaces__filters"
          role="group"
          aria-label="Filter destinations by risk"
        >
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={
                activeFilter === filter
                  ? "regionPlaces__chip isActive"
                  : "regionPlaces__chip"
              }
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>

        {filteredPlaces.length === 0 ? (
          <div className="regionPlaces__empty">
            No destinations match this filter yet.
          </div>
        ) : (
          <>
            <div className="placesCarousel">
              <button
                type="button"
                className="placesCarousel__arrow placesCarousel__arrow--prev"
                onClick={showPreviousSet}
                disabled={currentPage === 0}
                aria-label="Show previous three destinations"
              >
                <ChevronLeft aria-hidden="true" />
              </button>

              <div className="placesCarousel__viewport">
                <div
                  key={`${activeFilter}-${currentPage}`}
                  className="placesCarousel__track"
                >
                  {visiblePlaces.map((place) => (
                    <DestinationCard
                      key={place.name}
                      place={place}
                      regionSlug={regionSlug}
                      regionName={regionName}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="placesCarousel__arrow placesCarousel__arrow--next"
                onClick={showNextSet}
                disabled={currentPage >= totalPages - 1}
                aria-label="Show next three destinations"
              >
                <ChevronRight aria-hidden="true" />
              </button>
            </div>

            {totalPages > 1 && (
              <div
                className="placesCarousel__pagination"
                aria-label="Destination carousel pages"
              >
                {Array.from({ length: totalPages }).map((_, pageIndex) => (
                  <button
                    key={pageIndex}
                    type="button"
                    className={
                      currentPage === pageIndex
                        ? "placesCarousel__dot isActive"
                        : "placesCarousel__dot"
                    }
                    onClick={() => setCurrentPage(pageIndex)}
                    aria-label={`Show destination set ${pageIndex + 1}`}
                    aria-current={
                      currentPage === pageIndex ? "true" : undefined
                    }
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
