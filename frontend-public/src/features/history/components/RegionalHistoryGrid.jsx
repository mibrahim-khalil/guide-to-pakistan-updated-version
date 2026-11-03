export default function RegionalHistoryGrid({ content }) {
  if (!content?.provinces?.length) {
    return null;
  }

  const {
    eyebrow,
    title,
    description,
    provinces,
  } = content;

  const openRegion = (slug) => {
    const target = document.getElementById(
      "regional-history-explorer"
    );

    if (!target) {
      return;
    }

    window.dispatchEvent(
      new CustomEvent(
        "history:select-region",
        {
          detail: {
            slug,
          },
        }
      )
    );

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
    <section className="regionalHistory">
      <div className="regionalHistory__container">
        <div className="regionalHistory__intro">
          <span className="regionalHistory__eyebrow">
            {eyebrow}
          </span>

          <h2 className="regionalHistory__title">
            {title}
          </h2>

          <p className="regionalHistory__description">
            {description}
          </p>
        </div>

        <div className="regionalHistory__grid">
          {provinces.map((province) => (
            <article
              key={province.id}
              className="regionalHistoryCard"
            >
              <div className="regionalHistoryCard__media">
                <img
                  src={province.image}
                  alt={
                    province.imageAlt ||
                    province.name
                  }
                />

                <div
                  className="regionalHistoryCard__shade"
                  aria-hidden="true"
                />

                <span className="regionalHistoryCard__period">
                  {province.period}
                </span>
              </div>

              <div className="regionalHistoryCard__content">
                <h3>{province.name}</h3>

                <p>
                  {province.shortDescription}
                </p>

                <div className="regionalHistoryCard__highlights">
                  {province.highlights?.map(
                    (item) => (
                      <span key={item}>
                        {item}
                      </span>
                    )
                  )}
                </div>

                <button
                  type="button"
                  className="regionalHistoryCard__cta"
                  onClick={() =>
                    openRegion(province.slug)
                  }
                >
                  <span>Explore History</span>

                  <span aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}