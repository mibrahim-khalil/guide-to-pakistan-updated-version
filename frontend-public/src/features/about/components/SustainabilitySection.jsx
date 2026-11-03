export default function SustainabilitySection({ content }) {
  if (!content) {
    return null;
  }

  return (
    <section className="aboutSustainability">
      <div className="aboutSustainability__container">
        <div className="aboutSustainability__visual">
          <img
            src={content.image}
            alt={content.imageAlt || ""}
          />

          <div className="aboutSustainability__shade" />

          <div className="aboutSustainability__imageBadge">
            <span>Responsible Travel</span>
          </div>
        </div>

        <div className="aboutSustainability__content">
          <span className="aboutSustainability__eyebrow">
            {content.eyebrow}
          </span>

          <h2>{content.title}</h2>

          <p className="aboutSustainability__description">
            {content.description}
          </p>

          <div className="aboutSustainability__principles">
            {content.principles?.map((item, index) => (
              <div
                key={item}
                className="aboutSustainability__principle"
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}