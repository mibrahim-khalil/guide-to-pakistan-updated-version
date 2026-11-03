import { Link } from "react-router-dom";

export default function TourCategoryCta() {
  return (
    <section className="tourCategoryCta">
      <div className="tourCategoryCta__overlay" />

      <div className="tourCategoryCta__content">
        <span className="tourCategoryCta__eyebrow">
          Need Something Different?
        </span>

        <h2 className="tourCategoryCta__title">
          Let Pakistan Surprise You.
        </h2>

        <p className="tourCategoryCta__description">
          Share your dates, interests, and budget, and we’ll help shape a
          journey around you.
        </p>

        <Link
          to="/plan-your-trip"
          className="tourCategoryCta__button"
        >
          Start Planning →
        </Link>
      </div>
    </section>
  );
}