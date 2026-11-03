import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

export default function ExplorePakistanSection() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");

  const categories = useMemo(
    () => [
      { key: "adventure", icon: "🏔️", title: "Adventure", count: "45 tours" },
      { key: "cultural", icon: "🕌", title: "Cultural", count: "32 tours" },
      { key: "wildlife", icon: "🐅", title: "Wildlife", count: "18 tours" },
      { key: "food", icon: "🍲", title: "Food & Festivals", count: "24 tours" },
      { key: "honeymoon", icon: "💑", title: "Honeymoon", count: "15 tours" },
      { key: "family", icon: "👨‍👩‍👧‍👦", title: "Family", count: "28 tours" },
    ],
    [],
  );

  const onSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());

    const qs = params.toString();
    navigate(qs ? `/tours?${qs}` : "/tours");
  };

  const goCategory = (key) => {
    navigate(`/tours?category=${encodeURIComponent(key)}`);
  };

  return (
    <section className="explorePakistan">
      {/* Search strip */}
      <div className="homeSearchStrip">
        <div className="container homeSearchStrip__inner">
          <form className="homeSearchForm" onSubmit={onSubmit}>
            {/* ✅ ONLY ONE input now — extra box removed */}
            <input
              className="homeSearchInput"
              type="text"
              placeholder="Search destinations, tours, experiences..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />

            <button type="submit" className="homeSearchBtn">
              Find Tours
            </button>
          </form>
        </div>
      </div>

      {/* Main content */}
      <div className="container explorePakistan__inner">
        <div className="explorePakistan__left">
          <div className="explorePakistan__kicker">EXPLORE PAKISTAN</div>

          <h2 className="explorePakistan__title">
            Find Your Next
            <br />
            Adventure
          </h2>

          <p className="explorePakistan__text">
            Whether you crave rugged mountain trails, ancient Mughal cities,
            pristine beaches, or lush valleys — Pakistan offers an unparalleled
            breadth of experiences.
          </p>
        </div>

        <div className="explorePakistan__right">
          <div className="categoryGrid">
            {categories.map((c) => (
              <button
                key={c.key}
                type="button"
                className="categoryCard"
                onClick={() => goCategory(c.key)}
              >
                <div className="categoryCard__icon" aria-hidden="true">
                  {c.icon}
                </div>

                <div className="categoryCard__meta">
                  <div className="categoryCard__title">{c.title}</div>
                  <div className="categoryCard__count">{c.count}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
