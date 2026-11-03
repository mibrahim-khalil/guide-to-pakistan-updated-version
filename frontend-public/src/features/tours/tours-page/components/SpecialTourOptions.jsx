import { Link } from "react-router-dom";

export default function SpecialTourOptions({
  options = [],
}) {
  if (!Array.isArray(options) || options.length === 0) {
    return null;
  }

  return (
    <section
      className="specialTours"
      aria-label="Special tour options"
    >
      <div className="specialTours__grid">
        {options.map((option) => (
          <article
            key={option.id}
            className={[
              "specialTourCard",
              option.variant === "dark"
                ? "specialTourCard--dark"
                : "specialTourCard--light",
            ].join(" ")}
          >
            <div className="specialTourCard__content">
              <h2 className="specialTourCard__title">
                {option.title}
              </h2>

              <p className="specialTourCard__description">
                {option.description}
              </p>

              <Link
                to={option.path}
                className="specialTourCard__button"
              >
                {option.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}