import { NavLink } from "react-router-dom";

export default function HistoryClosingCTA({ content }) {
  if (!content) {
    return null;
  }

  const {
    eyebrow,
    title,
    description,
    image,
    imageAlt,
    primaryCta,
    secondaryCta,
  } = content;

  return (
    <section className="historyClosingCTA">
      <img
        src={image}
        alt={imageAlt || ""}
        className="historyClosingCTA__image"
      />

      <div
        className="historyClosingCTA__overlay"
        aria-hidden="true"
      />

      <div
        className="historyClosingCTA__glow"
        aria-hidden="true"
      />

      <div className="historyClosingCTA__container">
        <div className="historyClosingCTA__content">
          <span className="historyClosingCTA__eyebrow">
            {eyebrow}
          </span>

          <h2>{title}</h2>

          <p>{description}</p>

          <div className="historyClosingCTA__actions">
            <NavLink
              to={primaryCta.path}
              className="historyClosingCTA__primary"
            >
              <span>{primaryCta.label}</span>
              <span aria-hidden="true">→</span>
            </NavLink>

            <NavLink
              to={secondaryCta.path}
              className="historyClosingCTA__secondary"
            >
              <span>{secondaryCta.label}</span>
              <span aria-hidden="true">↗</span>
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}