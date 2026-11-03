import { Link } from "react-router-dom";

export default function ToursPlanningCta({
  content,
}) {
  if (!content) {
    return null;
  }

  const {
    eyebrow = "Need help planning?",
    title = "We’re here for you!",
    description = "",
    buttonLabel = "Start Planning",
    buttonPath = "/plan-your-trip",
    phone = "",
  } = content;

  return (
    <section
      className="toursPlanningCta"
      aria-label="Tour planning support"
    >
      <div className="toursPlanningCta__inner">
        <div className="toursPlanningCta__eyebrow">
          {eyebrow}
        </div>

        <h2 className="toursPlanningCta__title">
          {title}
        </h2>

        {description ? (
          <p className="toursPlanningCta__description">
            {description}
          </p>
        ) : null}

        <div className="toursPlanningCta__actions">
          <Link
            to={buttonPath}
            className="toursPlanningCta__button"
          >
            {buttonLabel}
          </Link>

          {phone ? (
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="toursPlanningCta__phone"
            >
              {phone}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}