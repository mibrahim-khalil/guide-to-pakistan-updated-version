export default function HistoryHero({ content }) {
  if (!content) {
    return null;
  }

  const scrollToTimeline = () => {
    const target = document.getElementById("pakistan-history-slider");

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
      className="historyHero"
      aria-labelledby="history-hero-title"
    >
      <img
        src={content.image}
        alt={content.imageAlt || ""}
        className="historyHero__image"
      />

      <div
        className="historyHero__overlay"
        aria-hidden="true"
      />

      <div
        className="historyHero__warmGlow"
        aria-hidden="true"
      />

      <div className="historyHero__inner">
        <div className="historyHero__content">
          <span className="historyHero__eyebrow">
            {content.eyebrow}
          </span>

          <h1
            id="history-hero-title"
            className="historyHero__title"
          >
            <span>History</span>
            <span>of Pakistan</span>
          </h1>

          <p className="historyHero__description">
            {content.description}
          </p>
        </div>

        <button
          type="button"
          className="historyHero__discover"
          onClick={scrollToTimeline}
        >
          <span>
            <small>Begin the Journey</small>
            <strong>Explore History</strong>
          </span>

          <span
            className="historyHero__discoverIcon"
            aria-hidden="true"
          >
            ↓
          </span>
        </button>
      </div>

      <div
        className="historyHero__bottomFade"
        aria-hidden="true"
      />
    </section>
  );
}