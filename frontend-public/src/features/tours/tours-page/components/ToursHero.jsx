import { Link } from "react-router-dom";

export default function ToursHero({ hero }) {
  const {
    eyebrow = "Explore Pakistan",
    title = "Tours",
    description = "",
    image,
  } = hero || {};

  return (
    <section
      className="toursHero"
      style={{
        backgroundImage: `url(${image})`,
      }}
      aria-label="Tours hero"
    >
      <div className="toursHero__overlay" />

      <div className="toursContainer toursHero__content">
        <div className="toursHero__copy">
          <div className="toursHero__pill">
            <span className="toursHero__pillDot" />
            <span>Journeys Across Pakistan</span>
            <span className="toursHero__pillDot" />
          </div>

          <h1 className="toursHero__title">{title}</h1>

          {description ? (
            <p className="toursHero__description">{description}</p>
          ) : null}

          <div className="toursHero__actions">
            <a href="#tour-packages" className="toursHero__primaryBtn">
              Explore Tours
            </a>

            <Link to="/plan-your-trip" className="toursHero__secondaryBtn">
              Plan Your Trip
            </Link>
          </div>
        </div>
      </div>

      <div className="toursHero__blend" aria-hidden="true" />
    </section>
  );
}
