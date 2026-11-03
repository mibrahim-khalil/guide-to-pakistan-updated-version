import { Link } from "react-router-dom";

export default function PlanTripHero({ content }) {
  if (!content) {
    return null;
  }

  const {
    eyebrow,
    title,
    description,
    primaryAction,
    secondaryAction,
    image,
  } = content;

  const handleStartPlanning = () => {
    const target = document.getElementById(
      primaryAction?.targetId || "trip-builder",
    );

    if (!target) {
      return;
    }

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      className="planTripHero"
      style={{
        "--plan-trip-hero-image": `url("${image}")`,
      }}
    >
      <div className="planTripHero__background" />

      <div className="planTripHero__overlay" />

      <div className="planTripHero__ambientGlow" />

      <div className="planTripHero__container">
        <div className="planTripHero__content">
          <span className="planTripHero__eyebrow">
            {eyebrow}
          </span>

          <h1 className="planTripHero__title">
            {title}
          </h1>

          <p className="planTripHero__description">
            {description}
          </p>

          <div className="planTripHero__actions">
            <button
              type="button"
              className="planTripHero__button planTripHero__button--primary"
              onClick={handleStartPlanning}
            >
              <span>{primaryAction.label}</span>
              <span
                className="planTripHero__buttonArrow"
                aria-hidden="true"
              >
                →
              </span>
            </button>

            <Link
              to={secondaryAction.path}
              className="planTripHero__button planTripHero__button--secondary"
            >
              <span>{secondaryAction.label}</span>
              <span
                className="planTripHero__buttonArrow"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div
        className="planTripHero__bottomFade"
        aria-hidden="true"
      />
    </section>
  );
}