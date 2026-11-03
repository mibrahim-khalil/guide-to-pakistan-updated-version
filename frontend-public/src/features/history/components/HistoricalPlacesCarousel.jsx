import { useRef } from "react";

export default function HistoricalPlacesCarousel({ content }) {
  const trackRef = useRef(null);

  if (!content?.places?.length) {
    return null;
  }

  const {
    eyebrow,
    title,
    description,
    places,
  } = content;

  const moveCarousel = (direction) => {
    const track = trackRef.current;

    if (!track) {
      return;
    }

    const amount = track.clientWidth * 0.72;

    track.scrollBy({
      left: direction === "next" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="historicalPlaces">
      <div className="historicalPlaces__container">
        {/* =================================================
            INTRO
        ================================================= */}

        <div className="historicalPlaces__intro">
          <div>
            <span className="historicalPlaces__eyebrow">
              {eyebrow}
            </span>

            <h2 className="historicalPlaces__title">
              {title}
            </h2>

            <p className="historicalPlaces__description">
              {description}
            </p>
          </div>

          <div className="historicalPlaces__controls">
            <button
              type="button"
              onClick={() => moveCarousel("previous")}
              aria-label="Previous historical places"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => moveCarousel("next")}
              aria-label="Next historical places"
            >
              →
            </button>
          </div>
        </div>

        {/* =================================================
            CAROUSEL
        ================================================= */}

        <div
          ref={trackRef}
          className="historicalPlaces__track"
        >
          {places.map((place) => (
            <article
              key={place.id}
              className="historicalPlaceCard"
            >
              <div className="historicalPlaceCard__media">
                <img
                  src={place.image}
                  alt={place.imageAlt || place.name}
                />

                <div
                  className="historicalPlaceCard__shade"
                  aria-hidden="true"
                />

                <span className="historicalPlaceCard__region">
                  {place.region}
                </span>
              </div>

              <div className="historicalPlaceCard__content">
                <h3>{place.name}</h3>

                <p>{place.description}</p>

                <div className="historicalPlaceCard__meta">
                  <span>{place.period}</span>

                  <button type="button">
                    Explore
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}