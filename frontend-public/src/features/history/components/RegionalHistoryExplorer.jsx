import {
  useEffect,
  useMemo,
  useState,
} from "react";

export default function RegionalHistoryExplorer({
  content,
}) {
  const provinces = content?.provinces || [];

  const [activeIndex, setActiveIndex] =
    useState(0);

  const [activeCategory, setActiveCategory] =
    useState("history");

  const activeProvince =
    provinces[activeIndex];

  const categories = [
    {
      id: "history",
      label: "History",
      icon: "◫",
    },
    {
      id: "cultural",
      label: "Cultural",
      icon: "◇",
    },
    {
      id: "social",
      label: "Social",
      icon: "◎",
    },
    {
      id: "festivals",
      label: "Festivals & Events",
      icon: "▣",
    },
  ];

  useEffect(() => {
    const handleRegionSelect = (event) => {
      const slug = event?.detail?.slug;

      const index = provinces.findIndex(
        (province) =>
          province.slug === slug
      );

      if (index >= 0) {
        setActiveIndex(index);
        setActiveCategory("history");
      }
    };

    window.addEventListener(
      "history:select-region",
      handleRegionSelect
    );

    return () => {
      window.removeEventListener(
        "history:select-region",
        handleRegionSelect
      );
    };
  }, [provinces]);

  const images = useMemo(() => {
    return activeProvince?.images || [];
  }, [activeProvince]);

  if (!activeProvince) {
    return null;
  }

  const activeContent =
    activeProvince[activeCategory] ||
    activeProvince.history;

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0
        ? provinces.length - 1
        : current - 1
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === provinces.length - 1
        ? 0
        : current + 1
    );
  };

  return (
    <section
      id="regional-history-explorer"
      className="regionalHistoryExplorer"
    >
      <div className="regionalHistoryExplorer__container">
        {/* =================================================
            LEFT ARROW
        ================================================= */}

        <button
          type="button"
          className="regionalHistoryExplorer__arrow regionalHistoryExplorer__arrow--left"
          onClick={showPrevious}
          aria-label="Previous region"
        >
          ←
        </button>

        {/* =================================================
            MAIN PANEL
        ================================================= */}

        <article
          key={`${activeProvince.id}-${activeCategory}`}
          className="regionalHistoryExplorer__panel"
        >
          {/* ===============================================
              LEFT CONTENT
          =============================================== */}

          <div className="regionalHistoryExplorer__content">
            <div className="regionalHistoryExplorer__topline">
              <span className="regionalHistoryExplorer__pill">
                {activeProvince.name}
              </span>

              <span className="regionalHistoryExplorer__mode">
                {
                  categories.find(
                    (category) =>
                      category.id === activeCategory
                  )?.label
                }
              </span>
            </div>

            <h2>
              {activeContent.title}
            </h2>

            <p className="regionalHistoryExplorer__summary">
              {activeContent.summary}
            </p>

            <div className="regionalHistoryExplorer__story">
              {activeContent.paragraphs?.map(
                (paragraph, index) => (
                  <p
                    key={`${activeProvince.slug}-${activeCategory}-${index}`}
                  >
                    {paragraph}
                  </p>
                )
              )}
            </div>

            {activeContent.highlights?.length ? (
              <div className="regionalHistoryExplorer__highlights">
                <span>
                  {activeCategory === "history"
                    ? "Important Historical Threads"
                    : activeCategory === "cultural"
                      ? "Cultural Highlights"
                      : activeCategory === "social"
                        ? "Social Highlights"
                        : "Festival Highlights"}
                </span>

                <div>
                  {activeContent.highlights.map(
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
              RIGHT VISUALS
          =============================================== */}

          <div className="regionalHistoryExplorer__visuals">
            {images[0] ? (
              <div className="regionalHistoryExplorer__mainImage">
                <img
                  src={images[0]}
                  alt={`${activeProvince.name} ${activeCategory}`}
                />
              </div>
            ) : null}

            <div className="regionalHistoryExplorer__sideImages">
              {images
                .slice(1, 3)
                .map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt=""
                      aria-hidden="true"
                    />
                  </div>
                ))}
            </div>
          </div>
        </article>

        {/* =================================================
            RIGHT ARROW
        ================================================= */}

        <button
          type="button"
          className="regionalHistoryExplorer__arrow regionalHistoryExplorer__arrow--right"
          onClick={showNext}
          aria-label="Next region"
        >
          →
        </button>

        {/* =================================================
            PROVINCE TABS
        ================================================= */}

        <div className="regionalHistoryExplorer__tabs">
          {provinces.map(
            (province, index) => (
              <button
                key={province.id}
                type="button"
                className={
                  index === activeIndex
                    ? "regionalHistoryExplorer__tab regionalHistoryExplorer__tab--active"
                    : "regionalHistoryExplorer__tab"
                }
                onClick={() =>
                  setActiveIndex(index)
                }
              >
                {province.name}
              </button>
            )
          )}
        </div>

        {/* =================================================
            CATEGORY NAV
        ================================================= */}

        <div className="regionalHistoryExplorer__categoryNav">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={
                activeCategory === category.id
                  ? "regionalHistoryExplorer__categoryButton regionalHistoryExplorer__categoryButton--active"
                  : "regionalHistoryExplorer__categoryButton"
              }
              onClick={() =>
                setActiveCategory(category.id)
              }
            >
              <span aria-hidden="true">
                {category.icon}
              </span>

              <strong>
                {category.label}
              </strong>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}