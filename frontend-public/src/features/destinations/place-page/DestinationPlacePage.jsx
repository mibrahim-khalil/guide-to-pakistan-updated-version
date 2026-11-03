import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import heroImg from "../../../assets/images/hero/hero.jpeg";
import gbHeroImg from "../../../assets/images/destinations/hero-gilgit-baltistan.jpeg";

import { getPlaceDetails } from "./data/placesData";

import "./cityDetails.css";

function toTitleCaseFromSlug(slug = "") {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function regionLabel(regionSlug = "") {
  const regions = {
    "gilgit-baltistan": "Gilgit-Baltistan",
    "khyber-pakhtunkhwa": "Khyber Pakhtunkhwa",
    punjab: "Punjab",
    sindh: "Sindh",
    balochistan: "Balochistan",
    "islamabad-capital-territory": "Islamabad Capital Territory",
    "azad-jammu-and-kashmir": "Azad Jammu & Kashmir",
  };

  return regions[regionSlug] || toTitleCaseFromSlug(regionSlug);
}

function pickHeroByRegion(regionSlug = "") {
  if (regionSlug === "gilgit-baltistan") {
    return gbHeroImg;
  }

  return heroImg;
}

/* =========================================================
   WEATHER ICONS
========================================================= */

function IconDroplet() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2s7 7.2 7 13a7 7 0 0 1-14 0C5 9.2 12 2 12 2zm0 18a5 5 0 0 0 5-5c0-3.9-3.2-8-5-10.3C10.2 7 7 11.1 7 15a5 5 0 0 0 5 5z"
      />
    </svg>
  );
}

function IconWind() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 8h10a3 3 0 1 0-3-3h2a1 1 0 1 1 1 1H3V8zm0 5h14a3 3 0 1 1-3 3h-2a1 1 0 1 0 1-1H3v-2zm0-3h16a2 2 0 1 0-2-2h2a4 4 0 1 1-4 4H3V10z"
      />
    </svg>
  );
}

function IconRain() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 18a1 1 0 0 1-1-1c0-.7.5-1.3 1.2-1.9l.6-.5l.6.5C9.5 15.7 10 16.3 10 17a1 1 0 0 1-1 1H7zm6 0a1 1 0 0 1-1-1c0-.7.5-1.3 1.2-1.9l.6-.5l.6.5c.7.6 1.2 1.2 1.2 1.9a1 1 0 0 1-1 1h-2zM6 11a6 6 0 0 1 11.6-2A4 4 0 0 1 18 17h-1.2c.1-.3.2-.7.2-1c0-1.4-1-2.5-2.2-3.4l-.8-.6l-.8.6c-1.2.9-2.2 2-2.2 3.4c0 .3.1.7.2 1H10.2c.1-.3.2-.7.2-1c0-1.4-1-2.5-2.2-3.4l-.8-.6l-.8.6C5.4 13.5 4.4 14.6 4.4 16c0 .3.1.7.2 1H6a3 3 0 0 1 0-6z"
      />
    </svg>
  );
}

function IconSnow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a1 1 0 0 1 1 1v2.1l1.2-.7a1 1 0 1 1 1 1.73L13 7.1V9l1.65-.95l1.2.7a1 1 0 1 1-1 1.73L13 9.9V12l1.65.95l1.2-.7a1 1 0 1 1 1 1.73l-1.2.7L13 15v1.9l2.2 1.27a1 1 0 0 1-1 1.73L13 18.9V21a1 1 0 1 1-2 0v-2.1l-1.2.7a1 1 0 1 1-1-1.73L11 16.9V15l-1.65.95l-1.2-.7a1 1 0 1 1 1-1.73L11 14.1V12l-1.65-.95l-1.2.7a1 1 0 1 1-1-1.73l1.2-.7L11 9V7.1L8.8 5.83a1 1 0 1 1 1-1.73L11 5.1V3a1 1 0 0 1 1-1Z"
      />
    </svg>
  );
}

function formatSelectedDate(date) {
  try {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

/* =========================================================
   ADVISORY ICONS
========================================================= */

function IconRoad() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M10 2h4l3 20h-4l-1-6h-2l-1 6H4L7 2h3zm1.3 12h1.4L12 6h-.1l-.6 8z"
      />
    </svg>
  );
}

function IconPeople() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 11a4 4 0 1 0-4-4a4 4 0 0 0 4 4zm-8 1a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 8 12zm8 2c-3.3 0-6 1.7-6 4v2h12v-2c0-2.3-2.7-4-6-4zM8 14c-2.8 0-5 1.4-5 3.3V20h5.4c-.3-.5-.4-1-.4-1.6c0-1.7 1-3.1 2.4-4.1A8.5 8.5 0 0 0 8 14z"
      />
    </svg>
  );
}

function IconEvent() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm13 8H6v10h14V10zM6 8h14V6H6v2z"
      />
    </svg>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function chunkIntoGroups(items = [], groupSize = 3) {
  const groups = [];

  for (let index = 0; index < items.length; index += groupSize) {
    groups.push(items.slice(index, index + groupSize));
  }

  return groups;
}

function Stars({ value = 0, onChange, size = "md" }) {
  const className = size === "lg" ? "starsRow starsRow--lg" : "starsRow";

  return (
    <div
      className={className}
      role={onChange ? "radiogroup" : "img"}
      aria-label={`${value} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= value;

        if (!onChange) {
          return (
            <span
              key={starValue}
              className={isFilled ? "star isFilled" : "star"}
              aria-hidden="true"
            >
              ★
            </span>
          );
        }

        return (
          <button
            key={starValue}
            type="button"
            className={isFilled ? "starBtn isFilled" : "starBtn"}
            onClick={() => onChange(starValue)}
            role="radio"
            aria-checked={starValue === value}
            aria-label={`${starValue} star`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================
   DESTINATION PLACE PAGE
========================================================= */

export default function DestinationPlacePage() {
  const { regionSlug, placeSlug } = useParams();

  const placeDetails = getPlaceDetails(regionSlug, placeSlug);

  /* Accordions */
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  /* Weather tabs */
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  /* Advisory carousel */
  const [advIdx, setAdvIdx] = useState(0);

  const [openRecActionId, setOpenRecActionId] = useState(null);

  /* Places carousel */
  const [placesSlideIdx, setPlacesSlideIdx] = useState(0);

  /* Review form */
  const [reviewName, setReviewName] = useState("");

  const [reviewText, setReviewText] = useState("");

  const [reviewRating, setReviewRating] = useState(0);

  /* =======================================================
     BASIC PLACE DETAILS
  ======================================================= */

  const cityName = placeDetails?.name || toTitleCaseFromSlug(placeSlug);

  const regionName = placeDetails?.regionName || regionLabel(regionSlug);

  const heroBg = placeDetails?.hero?.image || pickHeroByRegion(regionSlug);

  /* =======================================================
     OVERVIEW
  ======================================================= */

  const overview = placeDetails?.overview;

  const aboutSummary = {
    p1:
      overview?.paragraphs?.[0] ||
      `${cityName} carries a deep cultural identity shaped by its landscape, history, and local communities.`,

    p2:
      overview?.paragraphs?.[1] ||
      `Cultural expression in ${cityName} is reflected in local traditions, hospitality, food, and everyday life.`,

    label: overview?.label || "Cultural identity",
  };

  /* =======================================================
     WEATHER
  ======================================================= */

  const weatherDetails = placeDetails?.weather;

  const weatherDays = useMemo(() => {
    const days = weatherDetails?.days || [];

    return days.map((day) => ({
      label: day.label,

      date: day.date ? new Date(`${day.date}T00:00:00`) : null,

      data: day.forecast
        ? {
            tempC: day.forecast.temperature,

            condition: day.forecast.condition,

            humidity: day.forecast.humidity,

            wind: day.forecast.wind,

            rain: day.forecast.rain,

            snow: day.forecast.snow,
          }
        : null,
    }));
  }, [weatherDetails]);

  const activeDay = weatherDays[activeDayIdx];

  const forecast = activeDay?.data;

  const selectedDisplay = activeDay?.date
    ? formatSelectedDate(activeDay.date)
    : "";

  /* =======================================================
     ADVISORIES
  ======================================================= */

  const advisories = useMemo(() => {
    const advisoryData = placeDetails?.advisories || [];

    return advisoryData.map((advisory) => ({
      id: advisory.id,

      risk: advisory.risk || "Unknown",

      status: advisory.status || "Unknown",

      updated: advisory.updatedAgo || advisory.updated || "Recently updated",

      title: advisory.title || "Travel advisory",

      summary:
        advisory.summary ||
        "Please verify current travel conditions before departure.",

      bullets: (advisory.items || advisory.bullets || []).map((item) => ({
        icon: item.icon || "event",

        title: item.title || "Travel update",

        text: item.text || "No additional details available.",
      })),

      recAction:
        advisory.recommendedAction ||
        advisory.recAction ||
        "Verify official updates before travelling.",
    }));
  }, [placeDetails]);

  const totalAdvisories = advisories.length;

  const goAdvNext = () => {
    if (totalAdvisories <= 1) {
      return;
    }

    setAdvIdx((currentIndex) => (currentIndex + 1) % totalAdvisories);
  };

  const goAdvPrev = () => {
    if (totalAdvisories <= 1) {
      return;
    }

    setAdvIdx(
      (currentIndex) => (currentIndex - 1 + totalAdvisories) % totalAdvisories,
    );
  };

  const renderBulletIcon = (type) => {
    if (type === "road") {
      return <IconRoad />;
    }

    if (type === "people") {
      return <IconPeople />;
    }

    return <IconEvent />;
  };

  /* =======================================================
     PLACES TO VISIT
  ======================================================= */

  const places = useMemo(() => {
    const placeItems = placeDetails?.placesToVisit || [];

    return placeItems.map((place) => {
      const resolvedSlug = place.slug || place.id || "";

      return {
        id: place.id || resolvedSlug || place.name,

        slug: resolvedSlug,

        name: place.name || "Unnamed place",

        region: place.region || placeDetails?.regionName || cityName,

        desc: place.description || place.desc || "",

        image: place.image || heroBg,

        path:
          place.path ||
          `/destinations/${placeDetails?.regionSlug || regionSlug}/${resolvedSlug}`,
      };
    });
  }, [cityName, heroBg, placeDetails, regionSlug]);

  const placeSlides = useMemo(() => chunkIntoGroups(places, 3), [places]);
  const totalPlaceSlides = placeSlides.length;

  const goPlacesNext = () => {
    if (totalPlaceSlides <= 1) {
      return;
    }

    setPlacesSlideIdx((currentIndex) => (currentIndex + 1) % totalPlaceSlides);
  };

  const goPlacesPrev = () => {
    if (totalPlaceSlides <= 1) {
      return;
    }

    setPlacesSlideIdx(
      (currentIndex) =>
        (currentIndex - 1 + totalPlaceSlides) % totalPlaceSlides,
    );
  };
  /* =======================================================
     REVIEWS
  ======================================================= */

  const reviews = useMemo(() => placeDetails?.reviews || [], [placeDetails]);

  const avgRating = useMemo(() => {
    const totalRating = reviews.reduce(
      (sum, review) => sum + Number(review.rating || 0),
      0,
    );

    if (!reviews.length) {
      return 0;
    }

    return Math.round((totalRating / reviews.length) * 10) / 10;
  }, [reviews]);

  const onSubmitReview = (event) => {
    event.preventDefault();

    setReviewName("");
    setReviewText("");
    setReviewRating(0);
  };
  if (!placeDetails) {
    return (
      <section className="cityPage">
        <div className="container cityBreadcrumb">
          <Link className="cityBreadcrumb__link" to="/destinations">
            Destinations
          </Link>

          <span className="cityBreadcrumb__sep">/</span>

          <span className="cityBreadcrumb__current">Place not found</span>
        </div>

        <section className="cityMain">
          <div className="container">
            <div className="cityMain__panel">
              <div className="citySection">
                <h1 className="cityMain__title">Destination not found</h1>

                <p className="cityP">
                  The requested destination is not available yet.
                </p>

                <Link className="citySmallBtn" to="/destinations">
                  Back to Destinations
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
    );
  }

  return (
    <section className="cityPage">
      {/* Breadcrumb */}
      <div className="container cityBreadcrumb">
        <Link
          className="cityBreadcrumb__link"
          to={`/destinations/${regionSlug}`}
        >
          {regionName}
        </Link>

        <span className="cityBreadcrumb__sep">/</span>

        <span className="cityBreadcrumb__current">{cityName}</span>
      </div>

      {/* Hero */}
      <section
        className="cityHero"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
        aria-label={`${cityName} hero`}
      >
        <div className="cityHero__overlay" />

        <div className="container cityHero__content">
          <div className="cityHero__left">
            <Link to={`/destinations/${regionSlug}`} className="cityHero__back">
              <span className="cityHero__backIcon" aria-hidden="true">
                ←
              </span>

              <span>Back to {regionName}</span>
            </Link>
            <div className="cityHero__pills" aria-label="Destination status">
              <span className="cityPill cityPill--dark">
                {placeDetails?.hero?.category || "Destination"}
              </span>

              <span className="cityPill cityPill--danger">
                {placeDetails?.hero?.risk || "Unknown"}
              </span>

              <span className="cityPill cityPill--muted">{regionName}</span>
            </div>

            <h1 className="cityHero__title">{cityName}</h1>

            <p className="cityHero__sub">
              {placeDetails?.hero?.summary ||
                "Travel conditions may change. Please verify official updates before travelling."}
            </p>
          </div>

          <div
            className="cityHero__right"
            aria-label="Destination update summary"
          >
            <div className="cityStatusBox">
              <div className="cityStatusBox__kicker">Last updated</div>

              <div className="cityStatusBox__value">
                {placeDetails?.hero?.updatedAgo || "Recently updated"}
              </div>

              <div className="cityStatusBox__divider" />

              <div className="cityStatusBox__kicker">Road Access</div>

              <div className="cityStatusBox__value cityStatusBox__value--risk">
                {placeDetails?.hero?.roadAccess || "Unknown"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main city information */}
      <section className="cityMain" aria-label="Main city information">
        <div className="container">
          <div className="cityMain__panel">
            <div className="cityMain__titleRow">
              <h2 className="cityMain__title">Main City: {cityName}</h2>
            </div>

            {/* Cultural overview */}
            <div className="citySection">
              <div className="citySection__head">
                <h3 className="citySection__title">
                  Cultural &amp; Social Overview
                </h3>

                <button
                  type="button"
                  className="citySmallBtn"
                  onClick={() => setIsMoreOpen((currentValue) => !currentValue)}
                  aria-expanded={isMoreOpen}
                  aria-controls="cityMoreInfo"
                >
                  {isMoreOpen ? "Show Less" : "More Info"}
                </button>
              </div>

              <div className="cityOverview">
                <div className="cityOverview__text">
                  <p className="cityP">{aboutSummary.p1}</p>

                  <p className="cityP">{aboutSummary.p2}</p>

                  <div className="cityMiniLabel">{aboutSummary.label}</div>
                </div>

                <div className="cityOverview__media">
                  <img
                    className="cityMediaImg"
                    src={overview?.image || heroBg}
                    alt={`${cityName} view`}
                    loading="lazy"
                  />
                </div>
              </div>

              <div
                id="cityMoreInfo"
                className={isMoreOpen ? "cityMore isOpen" : "cityMore"}
              >
                <div className="cityMore__grid">
                  {/* Traditional dish */}
                  <div className="cityMoreCard">
                    <div className="cityMiniLabel">
                      {overview?.expandedContent?.traditionalDish?.label ||
                        "Traditional cultural dish"}
                    </div>

                    {overview?.expandedContent?.traditionalDish?.image ? (
                      <img
                        className="cityMediaImg"
                        src={overview.expandedContent.traditionalDish.image}
                        alt={`${cityName} traditional cuisine`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="cityMoreCard__blank" aria-hidden="true" />
                    )}
                  </div>

                  {/* Cuisine */}
                  <div className="cityMoreText">
                    <div className="cityMiniLabel">
                      {overview?.expandedContent?.cuisine?.label ||
                        "Famous Cuisine"}
                    </div>

                    {(
                      overview?.expandedContent?.cuisine?.paragraphs || [
                        `The cuisine of ${cityName} reflects local produce and traditional cooking techniques.`,
                        "Food represents shared experiences and cultural pride.",
                      ]
                    ).map((paragraph, index) => (
                      <p key={`cuisine-${index}`} className="cityP">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Social life */}
                  <div className="cityMoreText">
                    <div className="cityMiniLabel">
                      {overview?.expandedContent?.socialLife?.label ||
                        "Social life"}
                    </div>

                    {(
                      overview?.expandedContent?.socialLife?.paragraphs || [
                        "Social life revolves around community interaction and shared public spaces.",
                        "The people are known for warmth and resilience.",
                      ]
                    ).map((paragraph, index) => (
                      <p key={`social-${index}`} className="cityP">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Social image */}
                  <div className="cityMoreImg">
                    <img
                      className="cityMediaImg"
                      src={
                        overview?.expandedContent?.socialImage ||
                        overview?.image ||
                        heroBg
                      }
                      alt={`${cityName} cultural view`}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Weather and advisories */}
            <div className="cityTwoColRow" aria-label="Weather and advisories">
              {/* Weather */}
              <section
                className="weatherCard"
                aria-label="Weather Intelligence"
              >
                <div className="weatherCard__head">
                  <div>
                    <div className="weatherCard__kicker">
                      Weather Intelligence
                    </div>

                    <div className="weatherCard__updated">
                      Updated: {weatherDetails?.updated || "Recently updated"}
                    </div>
                  </div>

                  <span className="weatherLivePill">Live</span>
                </div>

                <div className="weatherCard__titleRow">
                  <div className="weatherCard__title">Current Forecast</div>

                  <div
                    className="weatherAvailPill"
                    aria-label="Forecast availability"
                  >
                    <div className="weatherAvailPill__top">FORECAST</div>

                    <div className="weatherAvailPill__bottom">
                      {weatherDetails?.availableDays ?? weatherDays.length} days
                      available
                    </div>
                  </div>
                </div>

                <div className="weatherCard__body">
                  <div className="weatherMain">
                    <div className="weatherTemp">
                      {forecast ? `${forecast.tempC}°C` : "—"}
                    </div>

                    <div className="weatherCond">
                      {forecast
                        ? forecast.condition
                        : "Forecast unavailable for this date"}
                    </div>

                    <div className="weatherSelected">
                      <span className="weatherSelected__dot" aria-hidden="true">
                        •
                      </span>

                      <span className="weatherSelected__label">Selected:</span>

                      <span className="weatherSelected__value">
                        {selectedDisplay || "No date selected"}
                      </span>
                    </div>
                  </div>

                  <div className="weatherMetrics" aria-label="Weather metrics">
                    <div className="weatherMetric">
                      <div className="weatherMetric__label">
                        <span className="weatherMetric__icon">
                          <IconDroplet />
                        </span>
                        Humidity
                      </div>

                      <div className="weatherMetric__value">
                        {forecast?.humidity || "—"}
                      </div>
                    </div>

                    <div className="weatherMetric">
                      <div className="weatherMetric__label">
                        <span className="weatherMetric__icon">
                          <IconWind />
                        </span>
                        Wind
                      </div>

                      <div className="weatherMetric__value">
                        {forecast?.wind || "—"}
                      </div>
                    </div>

                    <div className="weatherMetric">
                      <div className="weatherMetric__label">
                        <span className="weatherMetric__icon">
                          <IconRain />
                        </span>
                        Rain %
                      </div>

                      <div className="weatherMetric__value">
                        {forecast?.rain || "—"}
                      </div>
                    </div>

                    <div className="weatherMetric">
                      <div className="weatherMetric__label">
                        <span className="weatherMetric__icon">
                          <IconSnow />
                        </span>
                        Snow
                      </div>

                      <div className="weatherMetric__value">
                        {forecast?.snow || "—"}
                      </div>
                    </div>
                  </div>
                </div>

                {weatherDays.length > 0 ? (
                  <div className="weatherTabs" aria-label="Forecast date tabs">
                    {weatherDays.map((day, index) => (
                      <button
                        key={`${day.label}-${index}`}
                        type="button"
                        className={
                          index === activeDayIdx
                            ? "weatherTab isActive"
                            : "weatherTab"
                        }
                        onClick={() => setActiveDayIdx(index)}
                        aria-label={`Show forecast for ${day.label}`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="weatherTip">
                    No forecast information is currently available.
                  </div>
                )}

                {weatherDays.length > 0 && (
                  <div className="weatherTip">
                    Tip: Tap a date to view the forecast for that day.
                  </div>
                )}
              </section>

              {/* Advisories */}
              <section className="advisoriesCard" aria-label="Advisories">
                <div className="advisoriesCard__head">
                  <div>
                    <div className="advisoriesCard__title">Advisories</div>

                    <div className="advisoriesCard__sub">
                      {totalAdvisories} key{" "}
                      {totalAdvisories === 1 ? "advisory" : "advisories"} for
                      this destination
                    </div>
                  </div>
                </div>

                {totalAdvisories > 0 ? (
                  <>
                    <div
                      className="advCarousel"
                      aria-label="Advisories carousel"
                    >
                      <button
                        type="button"
                        className="advNav advNav--prev"
                        onClick={goAdvPrev}
                        aria-label="Previous advisory"
                        disabled={totalAdvisories <= 1}
                      >
                        ‹
                      </button>

                      <div className="advViewport">
                        <div
                          className="advTrack"
                          style={{
                            transform: `translateX(-${advIdx * 100}%)`,
                          }}
                        >
                          {advisories.map((advisory) => (
                            <div className="advSlide" key={advisory.id}>
                              <article className="advItem advItem--single">
                                <div className="advBadges">
                                  <span className="advBadge advBadge--risk">
                                    Risk: {advisory.risk}
                                  </span>

                                  <span className="advBadge advBadge--status">
                                    {advisory.status}
                                  </span>

                                  <span className="advUpdated">
                                    {advisory.updated}
                                  </span>
                                </div>

                                <div className="advHeading">
                                  {advisory.title}
                                </div>

                                <div className="advSummary">
                                  {advisory.summary}
                                </div>

                                <div className="advBullets">
                                  {advisory.bullets.map(
                                    (bullet, bulletIndex) => (
                                      <div
                                        className="advBullet"
                                        key={`${advisory.id}-${bulletIndex}`}
                                      >
                                        <span
                                          className="advBullet__icon"
                                          aria-hidden="true"
                                        >
                                          {renderBulletIcon(bullet.icon)}
                                        </span>

                                        <div className="advBullet__text">
                                          <div className="advBullet__title">
                                            {bullet.title}
                                          </div>

                                          <div className="advBullet__desc">
                                            {bullet.text}
                                          </div>
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>

                                <div className="advRec">
                                  <button
                                    type="button"
                                    className="advRecBtn"
                                    onClick={() =>
                                      setOpenRecActionId((currentId) =>
                                        currentId === advisory.id
                                          ? null
                                          : advisory.id,
                                      )
                                    }
                                    aria-expanded={
                                      openRecActionId === advisory.id
                                    }
                                  >
                                    Recommended action
                                  </button>

                                  <div
                                    className={
                                      openRecActionId === advisory.id
                                        ? "advRecBody isOpen"
                                        : "advRecBody"
                                    }
                                  >
                                    <div className="advRecBox">
                                      <div className="advRecLabel">
                                        RECOMMENDED ACTION
                                      </div>

                                      <div className="advRecText">
                                        {advisory.recAction}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </article>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="advNav advNav--next"
                        onClick={goAdvNext}
                        aria-label="Next advisory"
                        disabled={totalAdvisories <= 1}
                      >
                        ›
                      </button>
                    </div>

                    <div className="advDots" aria-label="Advisory pagination">
                      {advisories.map((advisory, index) => (
                        <button
                          key={advisory.id}
                          type="button"
                          className={
                            index === advIdx ? "advDot isActive" : "advDot"
                          }
                          onClick={() => setAdvIdx(index)}
                          aria-label={`Go to advisory ${index + 1}`}
                          aria-current={index === advIdx ? "true" : undefined}
                        />
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="advEmpty">
                    No active advisories are available for this destination.
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Places to visit */}
      <section
        className="placesPanel"
        aria-label={`Places to visit in ${cityName}`}
      >
        <div className="container">
          <div className="placesPanel__inner">
            <div className="placesPanel__head">
              <h2 className="placesPanel__title">
                Places to visit in {cityName}
              </h2>
            </div>

            {placeSlides.length > 0 ? (
              <>
                <div className="placesCarousel" aria-label="Places carousel">
                  <button
                    type="button"
                    className="placesNav placesNav--prev"
                    onClick={goPlacesPrev}
                    aria-label="Previous places"
                    disabled={totalPlaceSlides <= 1}
                  >
                    ‹
                  </button>

                  <div className="placesViewport">
                    <div
                      className="placesTrack"
                      style={{
                        transform: `translateX(-${placesSlideIdx * 100}%)`,
                      }}
                    >
                      {placeSlides.map((slide, slideIndex) => (
                        <div
                          className="placesSlide"
                          key={`places-slide-${slideIndex}`}
                        >
                          <div className="placesGrid">
                            {slide.map((place) => (
                              <article className="placeCard" key={place.id}>
                                <Link
                                  to={place.path}
                                  className="placeCard__media"
                                  aria-label={`View ${place.name}`}
                                >
                                  <img
                                    src={place.image}
                                    alt={place.name}
                                    loading="lazy"
                                  />
                                </Link>

                                <div className="placeCard__body">
                                  <h3 className="placeCard__title">
                                    <Link
                                      to={place.path}
                                      className="placeCard__titleLink"
                                    >
                                      {place.name}
                                    </Link>
                                  </h3>

                                  <p className="placeCard__desc">
                                    {place.desc}
                                  </p>

                                  <Link
                                    to="/book-now"
                                    className="placeCard__bookBtn"
                                    aria-label={`Book a tour to ${place.name}`}
                                  >
                                    Book Your Tour
                                  </Link>
                                </div>
                              </article>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="placesNav placesNav--next"
                    onClick={goPlacesNext}
                    aria-label="Next places"
                    disabled={totalPlaceSlides <= 1}
                  >
                    ›
                  </button>
                </div>
              </>
            ) : (
              <div className="advEmpty">
                No nearby places are currently available for this destination.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviewsPanel" aria-label={`Reviews for ${cityName}`}>
        <div className="container">
          <div className="reviewsPanel__inner">
            <div className="reviewsHead">
              <div className="reviewsKicker">• Traveler Stories</div>

              <h2 className="reviewsTitle">
                Real reviews from visitors of {cityName}
              </h2>

              <p className="reviewsSub">
                See what travelers are saying about their experiences exploring
                this destination.
              </p>
            </div>

            {reviews.length > 0 ? (
              <div className="reviewsGrid" aria-label="Visitor reviews">
                {reviews.map((review) => (
                  <article className="reviewCard" key={review.id}>
                    <Stars value={review.rating} />

                    <p className="reviewQuote">“{review.quote}”</p>

                    <div className="reviewMeta">
                      <div className="reviewName">{review.name}</div>

                      <div className="reviewDate">{review.date}</div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="advEmpty">
                No traveler reviews are available yet.
              </div>
            )}

            <div className="ratingBar" aria-label="Average rating">
              <div className="ratingBar__left">
                <div className="ratingBar__value">
                  {avgRating} / 5 average rating
                </div>

                <div className="ratingBar__sub">
                  Based on {reviews.length} traveler{" "}
                  {reviews.length === 1 ? "review" : "reviews"}
                </div>
              </div>

              <div className="ratingBar__right">
                <Stars value={Math.round(avgRating)} />
              </div>
            </div>

            <form
              className="reviewForm"
              onSubmit={onSubmitReview}
              aria-label="Add your review"
            >
              <div className="reviewForm__title">Add Your Review</div>

              <input
                className="reviewInput"
                type="text"
                name="reviewName"
                autoComplete="name"
                placeholder="Your Name"
                value={reviewName}
                onChange={(event) => setReviewName(event.target.value)}
                aria-label="Your name"
              />

              <Stars
                value={reviewRating}
                onChange={setReviewRating}
                size="lg"
              />

              <textarea
                className="reviewTextarea"
                name="reviewText"
                rows={5}
                placeholder="Write your experience..."
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                aria-label="Your review"
              />

              <button type="submit" className="reviewSubmitBtn">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </section>
    </section>
  );
}