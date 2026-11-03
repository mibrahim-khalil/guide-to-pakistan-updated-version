import { useMemo, useState } from "react";
import TourCard from "../../tours-page/components/TourCard";

export default function TourCategoryAccordion({ category, isOpen, onToggle }) {
  if (!category) {
    return null;
  }

  const {
    id,
    indexLabel,
    sectionLabel,
    title,
    subtitle,
    tours = [],
  } = category;

  const [durationFilter, setDurationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  const filteredTours = useMemo(() => {
    let result = [...tours];

    if (durationFilter !== "all") {
      result = result.filter((tour) => {
        const days = Number.parseInt(tour.duration, 10);

        if (Number.isNaN(days)) {
          return true;
        }

        if (durationFilter === "short") {
          return days <= 5;
        }

        if (durationFilter === "medium") {
          return days >= 6 && days <= 10;
        }

        if (durationFilter === "long") {
          return days > 10;
        }

        return true;
      });
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => {
        const aPrice = Number(String(a.price).replace(/[^\d]/g, ""));
        const bPrice = Number(String(b.price).replace(/[^\d]/g, ""));

        return aPrice - bPrice;
      });
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => {
        const aPrice = Number(String(a.price).replace(/[^\d]/g, ""));
        const bPrice = Number(String(b.price).replace(/[^\d]/g, ""));

        return bPrice - aPrice;
      });
    }

    if (sortBy === "rating") {
      result.sort(
        (a, b) => Number.parseFloat(b.rating) - Number.parseFloat(a.rating),
      );
    }

    return result;
  }, [tours, durationFilter, sortBy]);

  return (
    <section
      id={`tour-category-${id}`}
      className={["tourCategoryAccordion", isOpen ? "isOpen" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <button
        type="button"
        className="tourCategoryAccordion__head"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        aria-controls={`tour-category-panel-${id}`}
      >
        <div className="tourCategoryAccordion__headingCopy">
          <div className="tourCategoryAccordion__eyebrowRow">
            <span className="tourCategoryAccordion__index">{indexLabel}</span>

            <span className="tourCategoryAccordion__sectionLabel">
              {sectionLabel}
            </span>
          </div>

          <h2 className="tourCategoryAccordion__title">{title}</h2>

          {subtitle ? (
            <p className="tourCategoryAccordion__subtitle">{subtitle}</p>
          ) : null}

          <span className="tourCategoryAccordion__count">
            {tours.length} Tours
          </span>
        </div>

        <span className="tourCategoryAccordion__action">
          {isOpen ? "Hide Collection −" : "View Collection +"}
        </span>
      </button>

      <div
        id={`tour-category-panel-${id}`}
        className="tourCategoryAccordion__panel"
      >
        <div className="tourCategoryAccordion__panelInner">
          <div className="tourCategoryAccordion__collection">
            <div className="tourCategoryAccordion__discoveryBar">
              <div className="tourCategoryAccordion__resultCount">
                <strong>{filteredTours.length}</strong>
                <span>{filteredTours.length === 1 ? "Tour" : "Tours"}</span>
              </div>

              <div className="tourCategoryAccordion__filters">
                <button
                  type="button"
                  className={[
                    "tourCategoryAccordion__filter",
                    durationFilter === "all" ? "isActive" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setDurationFilter("all")}
                >
                  All
                </button>

                <button
                  type="button"
                  className={[
                    "tourCategoryAccordion__filter",
                    durationFilter === "short" ? "isActive" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setDurationFilter("short")}
                >
                  3–5 Days
                </button>

                <button
                  type="button"
                  className={[
                    "tourCategoryAccordion__filter",
                    durationFilter === "medium" ? "isActive" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setDurationFilter("medium")}
                >
                  6–10 Days
                </button>

                <button
                  type="button"
                  className={[
                    "tourCategoryAccordion__filter",
                    durationFilter === "long" ? "isActive" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setDurationFilter("long")}
                >
                  10+ Days
                </button>
              </div>

              <label className="tourCategoryAccordion__sort">
                <span>Sort</span>

                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Top Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </label>
            </div>
            {filteredTours.length === 0 ? (
              <div className="tourCategoryAccordion__empty">
                No tours match this filter.
              </div>
            ) : (
              <>
                <div className="tourCategoryAccordion__featured">
                  <div className="tourCategoryAccordion__featuredLabel">
                    Featured Tour
                  </div>

                  <div className="tourCategoryAccordion__featuredCard">
                    <TourCard tour={filteredTours[0]} />
                  </div>
                </div>

                <div className="tourCategoryAccordion__grid">
                  {filteredTours.slice(1).map((tour, index) => (
                    <div
                      key={tour.id}
                      className="tourCategoryAccordion__gridItem"
                      style={{
                        "--reveal-delay": `${(index + 2) * 70}ms`,
                      }}
                    >
                      <TourCard tour={tour} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
