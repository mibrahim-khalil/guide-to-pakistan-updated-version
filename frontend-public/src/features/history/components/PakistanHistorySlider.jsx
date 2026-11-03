import { useState } from "react";

export default function PakistanHistorySlider({ content }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!content?.eras?.length) {
    return null;
  }

  const {
    eyebrow,
    title,
    description,
    eras,
  } = content;

  const activeEra = eras[activeIndex];

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0
        ? eras.length - 1
        : current - 1
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === eras.length - 1
        ? 0
        : current + 1
    );
  };

  /*
    Supports both:
    paragraphs: [...]
    OR
    description: "..."
  */

  const eraParagraphs =
    activeEra.paragraphs?.length
      ? activeEra.paragraphs
      : activeEra.description
        ? [activeEra.description]
        : [];

  return (
    <section
      id="pakistan-history-slider"
      className="historyEraExplorer"
    >
      <div className="historyEraExplorer__container">
        {/* =====================================================
            INTRO
        ===================================================== */}

        <div className="historyEraExplorer__intro">
          <div>
            <span className="historyEraExplorer__eyebrow">
              {eyebrow}
            </span>

            <h2 className="historyEraExplorer__title">
              {title}
            </h2>

            <p className="historyEraExplorer__description">
              {description}
            </p>
          </div>

          <div className="historyEraExplorer__counter">
            <strong>
              {String(activeIndex + 1).padStart(2, "0")}
            </strong>

            <span>/</span>

            <span>
              {String(eras.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* =====================================================
            ACTIVE ERA
        ===================================================== */}

        <div className="historyEraExplorer__stage">
          {/* LEFT ARROW */}

          <button
            type="button"
            className="historyEraExplorer__arrow historyEraExplorer__arrow--left"
            onClick={showPrevious}
            aria-label="Previous historical era"
          >
            ←
          </button>

          {/* TIMELINE NUMBER */}

          <div className="historyEraExplorer__timeline">
            <div className="historyEraExplorer__number">
              {activeIndex + 1}
            </div>

            <div className="historyEraExplorer__line" />
          </div>

          {/* =================================================
              MAIN CARD
          ================================================= */}

          <article
            key={activeEra.id}
            className="historyEraSlide"
          >
            {/* ===============================================
                LEFT CONTENT
            =============================================== */}

            <div className="historyEraSlide__content">
              <span className="historyEraSlide__period">
                {activeEra.period}
              </span>

              <h3>{activeEra.title}</h3>

              {/* =============================================
                  HISTORICAL TEXT
              ============================================= */}

              {eraParagraphs.length ? (
                <div className="historyEraSlide__story">
                  {eraParagraphs.map(
                    (paragraph, index) => (
                      <p
                        key={`${activeEra.id}-paragraph-${index}`}
                      >
                        {paragraph}
                      </p>
                    )
                  )}
                </div>
              ) : null}

              {/* =============================================
                  KEY DEVELOPMENTS
              ============================================= */}

              {activeEra.milestones?.length ? (
                <div className="historyEraSlide__developments">
                  <span className="historyEraSlide__sectionLabel">
                    Key Developments
                  </span>

                  <div className="historyEraSlide__developmentGrid">
                    {activeEra.milestones.map(
                      (milestone, index) => (
                        <div
                          key={`${activeEra.id}-milestone-${index}`}
                          className="historyEraSlide__development"
                        >
                          <span>
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <p>{milestone}</p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : null}

              {/* =============================================
                  HISTORICAL LEGACY
              ============================================= */}

              {activeEra.legacy ? (
                <div className="historyEraSlide__legacy">
                  <span className="historyEraSlide__sectionLabel">
                    Historical Legacy
                  </span>

                  <p>{activeEra.legacy}</p>
                </div>
              ) : null}

              {/* =============================================
                  KEY HIGHLIGHTS
              ============================================= */}

              {activeEra.highlights?.length ? (
                <div className="historyEraSlide__highlights">
                  <span className="historyEraSlide__label">
                    Key Highlights
                  </span>

                  <div>
                    {activeEra.highlights.map(
                      (highlight) => (
                        <span key={highlight}>
                          {highlight}
                        </span>
                      )
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            {/* ===============================================
                RIGHT IMAGE
            =============================================== */}

            <div className="historyEraSlide__imageWrap">
              <img
                src={activeEra.image}
                alt={
                  activeEra.imageAlt ||
                  activeEra.title
                }
              />

              <div
                className="historyEraSlide__imageShade"
                aria-hidden="true"
              />

              <div className="historyEraSlide__imageInfo">
                <span>
                  {activeEra.category}
                </span>

                <strong>
                  {activeEra.title}
                </strong>
              </div>
            </div>
          </article>

          {/* RIGHT ARROW */}

          <button
            type="button"
            className="historyEraExplorer__arrow historyEraExplorer__arrow--right"
            onClick={showNext}
            aria-label="Next historical era"
          >
            →
          </button>
        </div>

        {/* =====================================================
            ERA TABS
        ===================================================== */}

        <div className="historyEraExplorer__tabs">
          {eras.map((era, index) => (
            <button
              key={era.id}
              type="button"
              className={
                index === activeIndex
                  ? "historyEraExplorer__tab historyEraExplorer__tab--active"
                  : "historyEraExplorer__tab"
              }
              onClick={() => setActiveIndex(index)}
            >
              <span>
                {String(index + 1).padStart(
                  2,
                  "0"
                )}
              </span>

              <strong>
                {era.title}
              </strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}