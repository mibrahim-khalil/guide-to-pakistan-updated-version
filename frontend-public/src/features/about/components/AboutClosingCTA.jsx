import { NavLink } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";

export default function AboutClosingCTA({ content }) {
  if (!content) {
    return null;
  }

  return (
    <section className="aboutClosingCTA">
      {/* ===============================================
          BACKGROUND IMAGE
      =============================================== */}

      <div className="aboutClosingCTA__background">
        <img
          src={content.image}
          alt={content.imageAlt || ""}
        />

        <div className="aboutClosingCTA__overlay" />
      </div>

      {/* ===============================================
          CONTENT
      =============================================== */}

      <div className="aboutClosingCTA__container">
        <div className="aboutClosingCTA__content">
          <span className="aboutClosingCTA__eyebrow">
            <MapPin
              size={14}
              strokeWidth={2}
            />

            {content.eyebrow}
          </span>

          <h2>
            {content.title}
          </h2>

          <p>
            {content.description}
          </p>

          {/* ===========================================
              CTA BUTTONS
          =========================================== */}

          <div className="aboutClosingCTA__actions">
            <NavLink
              to={content.primaryCta.path}
              className="aboutClosingCTA__primary"
            >
              <span>
                {content.primaryCta.label}
              </span>

              <ArrowRight
                size={17}
                strokeWidth={2}
              />
            </NavLink>

            <NavLink
              to={content.secondaryCta.path}
              className="aboutClosingCTA__secondary"
            >
              <span>
                {content.secondaryCta.label}
              </span>

              <ArrowRight
                size={17}
                strokeWidth={2}
              />
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}