import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Bookmark,
  Clock3,
  Landmark,
  Route,
  Search,
  Thermometer,
} from "lucide-react";

import { REGIONS } from "./data/regionsData";

import "./regionAllPlaces.css";

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

function getRiskClass(risk = "") {
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

function sortPlacesByRisk(places = []) {
  return [...places].sort((firstPlace, secondPlace) => {
    const firstRisk =
      RISK_ORDER[(firstPlace.risk || "unknown").toLowerCase()] || 5;

    const secondRisk =
      RISK_ORDER[(secondPlace.risk || "unknown").toLowerCase()] || 5;

    return firstRisk - secondRisk;
  });
}

function AllPlacesCard({
  place,
  regionSlug,
  regionName,
}) {
  const placeSlug = slugify(place.name);
  const riskClass = getRiskClass(place.risk);

  return (
    <article className="allPlacesCard">
      <div className="allPlacesCard__media">
        <img
          src={place.image}
          alt={place.name}
          loading="lazy"
        />

        <span className="allPlacesCard__namePill">
          {place.name}
        </span>

        <button
          type="button"
          className="allPlacesCard__save"
          aria-label={`Save ${place.name}`}
        >
          <Bookmark aria-hidden="true" />
        </button>
      </div>

      <div className="allPlacesCard__body">
        <div className="allPlacesCard__row">
          <span className="allPlacesCard__regionPill">
            {place.region || regionName}
          </span>

          <span className="allPlacesCard__meta">
            <Clock3 aria-hidden="true" />
            {place.updatedAgo || "Recently updated"}
          </span>
        </div>

        <div className="allPlacesCard__row">
          <span className="allPlacesCard__temperature">
            <Thermometer aria-hidden="true" />
            {place.temperature || "—"}
          </span>

          <span className="allPlacesCard__status">
            <Landmark aria-hidden="true" />
            {place.civicStatus || "Normal"}
          </span>
        </div>

        <div className="allPlacesCard__row">
          <span
            className={`allPlacesCard__riskPill allPlacesCard__riskPill--${riskClass}`}
          >
            {place.risk || "Unknown"}
          </span>

          <span className="allPlacesCard__status">
            <Route aria-hidden="true" />
            {place.roadStatus || "Normal"}
          </span>
        </div>

        <p className="allPlacesCard__description">
          {place.desc}
        </p>

        <div className="allPlacesCard__actions">
          <Link
            to={`/destinations/${regionSlug}/${placeSlug}`}
            className="allPlacesCard__button allPlacesCard__button--primary"
          >
            More Info
          </Link>

          <Link
            to="/tiss"
            className="allPlacesCard__button allPlacesCard__button--secondary"
          >
            Route Updates
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function RegionAllPlacesPage() {
  const { regionSlug } = useParams();

  const region = REGIONS[regionSlug];

  const filters = [
    "All",
    "Not Safe",
    "High Risk",
    "Moderate Risk",
    "Low Risk",
    "Unknown",
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPlaces = useMemo(() => {
    if (!region) {
      return [];
    }

    const sortedPlaces = sortPlacesByRisk(region.places || []);

    return sortedPlaces.filter((place) => {
      const normalizedSearch = searchQuery
        .trim()
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        place.name.toLowerCase().includes(normalizedSearch) ||
        (place.region || "")
          .toLowerCase()
          .includes(normalizedSearch) ||
        (place.desc || "")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesFilter =
        activeFilter === "All" ||
        (place.risk || "Unknown").toLowerCase() ===
          activeFilter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, region, searchQuery]);

  if (!region) {
    return (
      <main className="allPlacesPage">
        <section className="allPlacesNotFound">
          <h1>Region not found</h1>

          <p>
            The requested region does not exist yet.
          </p>

          <Link
            to="/destinations"
            className="allPlacesNotFound__button"
          >
            <ArrowLeft aria-hidden="true" />
            Back to Destinations
          </Link>
        </section>
      </main>
    );
  }

  const totalPlaces = region.places?.length || 0;

  return (
    <main className="allPlacesPage">
      {/* Compact hero */}
      <section
        className="allPlacesHero"
        aria-label={`All destinations in ${region.name}`}
      >
        <img
          className="allPlacesHero__image"
          src={region.heroImage}
          alt=""
          aria-hidden="true"
        />

        <div className="allPlacesHero__overlay" />

        <div className="allPlacesHero__content">
          <Link
            to={`/destinations/${regionSlug}`}
            className="allPlacesHero__back"
          >
            <ArrowLeft aria-hidden="true" />
            Back to {region.name}
          </Link>

          <div className="allPlacesHero__text">
            <span className="allPlacesHero__eyebrow">
              Explore Pakistan
            </span>

            <h1 className="allPlacesHero__title">
              All Places in {region.name}
            </h1>

            <p className="allPlacesHero__description">
              Discover every available destination in{" "}
              {region.name}, from iconic landmarks to
              unforgettable local experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Main browse section */}
      <section className="allPlacesBrowse">
        <div className="allPlacesBrowse__container">
          <div className="allPlacesBrowse__heading">
            <div>
              <span className="allPlacesBrowse__eyebrow">
                Browse Destinations
              </span>

              <h2 className="allPlacesBrowse__title">
                Find Your Next Destination
              </h2>
            </div>

            <span className="allPlacesBrowse__count">
              {filteredPlaces.length} of {totalPlaces} places
            </span>
          </div>

          <div className="allPlacesBrowse__toolbar">
            <label className="allPlacesSearch">
              <Search
                className="allPlacesSearch__icon"
                aria-hidden="true"
              />

              <input
                type="search"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder={`Search places in ${region.name}`}
                aria-label={`Search places in ${region.name}`}
              />
            </label>

            <div
              className="allPlacesFilters"
              role="group"
              aria-label="Filter places by risk level"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={
                    activeFilter === filter
                      ? "allPlacesFilters__pill isActive"
                      : "allPlacesFilters__pill"
                  }
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="allPlacesSortInfo">
            <span>
              Destinations sorted by risk:
            </span>

            <strong className="allPlacesSortInfo__risk allPlacesSortInfo__risk--notSafe">
              Not Safe
            </strong>

            <span>→</span>

            <strong className="allPlacesSortInfo__risk allPlacesSortInfo__risk--high">
              High Risk
            </strong>

            <span>→</span>

            <strong className="allPlacesSortInfo__risk allPlacesSortInfo__risk--moderate">
              Moderate Risk
            </strong>

            <span>→</span>

            <strong className="allPlacesSortInfo__risk allPlacesSortInfo__risk--low">
              Low Risk
            </strong>

            <span>→</span>

            <strong className="allPlacesSortInfo__risk allPlacesSortInfo__risk--unknown">
              Unknown
            </strong>
          </div>

          {filteredPlaces.length > 0 ? (
            <div className="allPlacesGrid">
              {filteredPlaces.map((place) => (
                <AllPlacesCard
                  key={place.name}
                  place={place}
                  regionSlug={regionSlug}
                  regionName={region.name}
                />
              ))}
            </div>
          ) : (
            <div className="allPlacesEmpty">
              <Search aria-hidden="true" />

              <h3>No destinations found</h3>

              <p>
                Try changing your search text or selecting
                another risk filter.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveFilter("All");
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}