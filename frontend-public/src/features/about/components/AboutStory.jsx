export default function AboutStory({ content }) {
  if (!content) {
    return null;
  }

  return (
    <section
      id="about-story"
      className="aboutStory"
    >
      <div className="aboutStory__container">
        <div className="aboutStory__content">
          <span className="aboutStory__eyebrow">
            {content.eyebrow}
          </span>

          <h2>{content.title}</h2>

          <div className="aboutStory__text">
            {content.paragraphs?.map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="aboutStory__visual">
          <img
            src={content.image}
            alt={content.imageAlt || ""}
          />

          <div className="aboutStory__visualShade" />

          <div className="aboutStory__visualLabel">
            <span>{content.imageLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}