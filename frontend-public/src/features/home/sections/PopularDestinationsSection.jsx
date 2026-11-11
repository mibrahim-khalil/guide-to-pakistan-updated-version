import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { publicDestinationsApi } from "../../destinations/api/publicDestinationsApi";

import heroImg from "../../../assets/images/hero/hero.jpeg";
import destHeroImg from "../../../assets/images/destinations/hero-gilgit-baltistan.jpeg";

function mapRegionToCard(region, index) {
  return {
    id: region._id || region.id || region.slug || `region-${index}`,
    slug: region.slug || region._id,
    title: region.name || region.title || "Destination",
    subtitle:
      region.province ||
      region.regionName ||
      region.subtitle ||
      (region.type ? String(region.type).toUpperCase() : "Pakistan"),
    imageUrl:
      region.bannerImage ||
      region.image ||
      region.coverImage ||
      region.heroImage ||
      (index % 2 === 0 ? destHeroImg : heroImg),
  };
}

export default function PopularDestinationsSection() {
  const navigate = useNavigate();
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        const list = await publicDestinationsApi.getRegions();
        if (!alive) return;
        setRegions(Array.isArray(list) ? list.slice(0, 8) : []);
      } catch (err) {
        console.error("Popular destinations load failed:", err);
        if (alive) setRegions([]);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const destinations = useMemo(() => {
    if (regions.length > 0) return regions.map(mapRegionToCard);

    // fallback so UI stays beautiful if API empty
    return [
      { id: "hunza", title: "Hunza Valley", subtitle: "Gilgit-Baltistan", imageUrl: destHeroImg, slug: "gilgit-baltistan" },
      { id: "lahore", title: "Lahore", subtitle: "Punjab", imageUrl: heroImg, slug: "punjab" },
      { id: "swat", title: "Swat Valley", subtitle: "Khyber Pakhtunkhwa", imageUrl: heroImg, slug: "khyber-pakhtunkhwa" },
      { id: "karachi", title: "Karachi", subtitle: "Sindh", imageUrl: heroImg, slug: "sindh" },
      { id: "islamabad", title: "Islamabad", subtitle: "ICT", imageUrl: heroImg, slug: "islamabad" },
      { id: "skardu", title: "Skardu", subtitle: "Gilgit-Baltistan", imageUrl: destHeroImg, slug: "gilgit-baltistan" },
    ];
  }, [regions]);

  useEffect(() => {
    // keep active index valid when data loads
    setActive((prev) => {
      if (!destinations.length) return 0;
      return Math.min(prev, destinations.length - 1);
    });
  }, [destinations.length]);

  const clampIndex = (i) => {
    const len = destinations.length || 1;
    return ((i % len) + len) % len;
  };

  const goNext = () => setActive((v) => clampIndex(v + 1));
  const goPrev = () => setActive((v) => clampIndex(v - 1));

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinations.length]);

  const onCardClick = (destination) => {
    if (destination?.slug) {
      navigate(`/destinations/${destination.slug}`);
      return;
    }
    navigate("/destinations");
  };

  const getOffset = (index) => {
    const len = destinations.length || 1;
    let diff = index - active;
    if (diff > len / 2) diff -= len;
    if (diff < -len / 2) diff += len;
    return diff;
  };

  return (
    <section className="pdSection">
      <div className="container">
        <div className="pdHead">
          <div className="pdKicker">TOP PICKS</div>
          <h2 className="pdTitle">Popular Destinations</h2>
        </div>

        {loading ? (
          <div style={{ padding: "2rem", textAlign: "center", opacity: 0.7 }}>
            Loading destinations…
          </div>
        ) : (
          <div className="pdCoverflow" aria-label="Popular Destinations carousel">
            <button
              type="button"
              className="pdArrow pdArrow--left"
              aria-label="Previous"
              onClick={goPrev}
            >
              ‹
            </button>

            <div className="pdStage">
              {destinations.map((d, index) => {
                const offset = getOffset(index);
                const abs = Math.abs(offset);

                return (
                  <article
                    key={d.id}
                    className={[
                      "pdCard",
                      index === active ? "isActive" : "",
                      abs > 3 ? "isHidden" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{ "--offset": offset, "--abs": abs }}
                    role="button"
                    tabIndex={0}
                    onClick={() => onCardClick(d)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") onCardClick(d);
                    }}
                  >
                    <img
                      className="pdCard__img"
                      src={d.imageUrl}
                      alt={d.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = heroImg;
                      }}
                    />
                    <div className="pdCard__overlay" />
                    <div className="pdCard__text">
                      <div className="pdCard__title">{d.title}</div>
                      <div className="pdCard__sub">{d.subtitle}</div>
                    </div>
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              className="pdArrow pdArrow--right"
              aria-label="Next"
              onClick={goNext}
            >
              ›
            </button>
          </div>
        )}

        <div className="pdFooter">
          <Link className="pdAllLink" to="/destinations">
            View all destinations <span className="pdAllLink__arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}