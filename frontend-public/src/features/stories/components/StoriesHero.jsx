export default function StoriesHero({ content }) {
  if (!content) {
    return null;
  }

  const scrollToStories = () => {
    const target = document.getElementById("stories-first-section");

    if (!target) {
      return;
    }

    const headerOffset = 90;

    const targetPosition =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerOffset;

    window.scrollTo({
      top: Math.max(0, targetPosition),
      behavior: "smooth",
    });
  };

  return (
    <section
      className="storiesHero"
      aria-labelledby="stories-hero-title"
    >
      <div className="storiesHero__media">
        <img
          src={content.image}
          alt={content.imageAlt || ""}
          className="storiesHero__image"
        />

        <div
          className="storiesHero__overlay"
          aria-hidden="true"
        />

        <div
          className="storiesHero__ambient"
          aria-hidden="true"
        />

        <div className="storiesHero__container">
          <div className="storiesHero__content">
            <span className="storiesHero__eyebrow">
              {content.eyebrow}
            </span>

            <h1
              id="stories-hero-title"
              className="storiesHero__title"
            >
              <span>Stories</span>
              <span>&amp; Media</span>
            </h1>

            <p className="storiesHero__description">
              {content.description}
            </p>
          </div>

          <button
            type="button"
            className="storiesHero__discover"
            onClick={scrollToStories}
            aria-label="Discover stories"
          >
            <span className="storiesHero__discoverCopy">
              <small>Start Exploring</small>
              <strong>Discover Stories</strong>
            </span>

            <span
              className="storiesHero__discoverIcon"
              aria-hidden="true"
            >
              ↓
            </span>
          </button>
        </div>

        <div
          className="storiesHero__bottomFade"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}