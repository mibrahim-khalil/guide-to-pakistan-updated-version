import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { publicToursApi } from "../../tours/api/publicToursApi";

import heroImg from "../../../assets/images/hero/hero.jpeg";
import destHeroImg from "../../../assets/images/destinations/hero-gilgit-baltistan.jpeg";

function WeatherIcon({ type = "sun" }) {
  if (type === "cloud") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19 18H6a4 4 0 0 1-.5-7.97A6 6 0 0 1 17.8 8.4 3.5 3.5 0 0 1 19 18ZM7 16h12a1.6 1.6 0 0 0-.18-3.19l-.86-.05-.27-.82A4 4 0 0 0 9 10.4l-.06.94-.93.14A2 2 0 0 0 7 16Z"
        />
      </svg>
    );
  }

  if (type === "snow") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M12 2a1 1 0 0 1 1 1v2.1l1.2-.7a1 1 0 1 1 1 1.73L13 7.1V9l1.65-.95 1.2.7a1 1 0 1 1-1 1.73L13 9.9V12l1.65.95 1.2-.7a1 1 0 1 1 1 1.73l-1.2.7L13 15v1.9l2.2 1.27a1 1 0 0 1-1 1.73L13 18.9V21a1 1 0 1 1-2 0v-2.1l-1.2.7a1 1 0 1 1-1-1.73L11 16.9V15l-1.65.95-1.2-.7a1 1 0 1 1 1-1.73L11 14.1V12l-1.65-.95-1.2.7a1 1 0 1 1-1-1.73l1.2-.7L11 9V7.1L8.8 5.83a1 1 0 1 1 1-1.73L11 5.1V3a1 1 0 0 1 1-1Z"
        />
      </svg>
    );
  }

  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12ZM11 1h2v3h-2V1Zm0 20h2v3h-2v-3ZM3.22 4.64l1.42-1.42l2.12 2.12L5.34 6.76L3.22 4.64ZM17.24 18.66l1.42-1.42l2.12 2.12l-1.42 1.42l-2.12-2.12ZM1 11h3v2H1v-2Zm20 0h3v2h-3v-2ZM3.22 19.36l2.12-2.12l1.42 1.42l-2.12 2.12l-1.42-1.42ZM17.24 5.34l2.12-2.12l1.42 1.42l-2.12 2.12l-1.42-1.42Z"
      />
    </svg>
  );
}

function formatPrice(tour) {
  const value = tour.discountPrice || tour.price;
  if (value == null || value === "") return "Contact";
  return `PKR ${Number(value).toLocaleString()}`;
}

function mapTourToCard(tour, index) {
  const durationDays = tour.durationDays || tour.duration || tour.days;
  const durationLabel = durationDays
    ? `${durationDays} day${Number(durationDays) === 1 ? "" : "s"}`
    : tour.durationText || "Multi-day";

  const groupSize =
    tour.groupSize ||
    tour.group ||
    (tour.minPeople && tour.maxPeople
      ? `${tour.minPeople}–${tour.maxPeople}`
      : tour.maxPeople
      ? `Up to ${tour.maxPeople}`
      : "4–12");

  const tag =
    tour.category ||
    tour.tag ||
    tour.type ||
    tour.difficulty ||
    "Tour";

  const tone =
    String(tag).toLowerCase().includes("adventure") ||
    String(tour.difficulty || "").toLowerCase() === "challenging"
      ? "warning"
      : "ok";

  const weatherPool = ["sun", "cloud", "snow"];
  const weather = weatherPool[index % weatherPool.length];

  return {
    id: tour._id || tour.id || tour.slug || `tour-${index}`,
    slug: tour.slug,
    name: tour.title || tour.name || "Untitled Tour",
    region: tour.regionName || tour.region || tour.location || "Pakistan",
    duration: durationLabel,
    group: groupSize,
    season: tour.season || tour.bestTime || "All year",
    price: formatPrice(tour),
    tag,
    tone,
    weather,
    imageUrl: tour.heroImage || tour.image || tour.coverImage || destHeroImg,
    description:
      tour.overview ||
      tour.shortDescription ||
      tour.description ||
      "A curated Pakistan experience with scenic routes, trusted planning, and local expertise.",
  };
}

export default function FeaturedDestinationsSection() {
  const navigate = useNavigate();
  const scrollerRef = useRef(null);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);

        // Prefer featured tours; fallback to latest published tours
        let list = [];
        try {
          list = await publicToursApi.getFeaturedTours();
        } catch {
          list = [];
        }

        if (!Array.isArray(list) || list.length === 0) {
          list = await publicToursApi.getTours();
        }

        if (!alive) return;
        setTours(Array.isArray(list) ? list.slice(0, 12) : []);
      } catch (err) {
        console.error("Featured tours load failed:", err);
        if (alive) setTours([]);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const cards = useMemo(() => {
    if (!tours.length) {
      // Safe fallback so UI never looks empty if API is down
      return [
        {
          id: "fallback-1",
          name: "K2 Base Camp Trek",
          region: "Gilgit-Baltistan",
          duration: "21 days",
          group: "8–12",
          season: "Jun–Sep",
          price: "PKR 280,000",
          tag: "Adventure",
          tone: "warning",
          weather: "snow",
          imageUrl: destHeroImg,
          description:
            "A high-altitude trek for experienced hikers. Route and weather can affect timing—confirm conditions before departure.",
        },
        {
          id: "fallback-2",
          name: "Hunza Autumn Escape",
          region: "Gilgit-Baltistan",
          duration: "7 days",
          group: "4–16",
          season: "Sep–Nov",
          price: "PKR 75,000",
          tag: "Scenic",
          tone: "ok",
          weather: "sun",
          imageUrl: heroImg,
          description:
            "Relaxed scenic itinerary with iconic viewpoints and comfortable stays—perfect for autumn colors and families.",
        },
        {
          id: "fallback-3",
          name: "Neelum Valley Getaway",
          region: "Azad Jammu & Kashmir",
          duration: "5 days",
          group: "2–10",
          season: "Apr–Oct",
          price: "PKR 45,000",
          tag: "Scenic",
          tone: "ok",
          weather: "cloud",
          imageUrl: heroImg,
          description:
            "Green valleys, rivers, and viewpoints. Road conditions can change—verify updates before travel.",
        },
      ];
    }

    return tours.map(mapTourToCard);
  }, [tours]);

  const scrollByPage = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;

    const card = el.querySelector(".ftCard");
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 16;
    const step = cardWidth + gap;
    const visible = Math.max(1, Math.round(el.clientWidth / step));

    el.scrollBy({ left: step * visible * direction, behavior: "smooth" });
  };

  const onMoreInfo = (tour) => {
    if (tour?.slug) {
      navigate(`/tours`);
      // If you later add tour detail route, use: navigate(`/tours/${tour.slug}`)
      return;
    }
    navigate("/tours");
  };

  return (
    <section className="featuredToursSection">
      <div className="container">
        <div className="featuredToursPanel">
          <div className="homeSectionHead">
            <div>
              <div className="homeSectionKicker">HANDPICKED FOR YOU</div>
              <h2 className="homeSectionTitle">Featured Tours</h2>
            </div>

            <Link className="homeSectionLink" to="/tours">
              All tours <span className="homeSectionLink__arrow">→</span>
            </Link>
          </div>

          {loading ? (
            <div style={{ padding: "2rem", textAlign: "center", opacity: 0.7 }}>
              Loading featured tours…
            </div>
          ) : (
            <div className="carouselWrap">
              <button
                type="button"
                className="carouselArrow carouselArrow--left"
                aria-label="Previous tours"
                onClick={() => scrollByPage(-1)}
              >
                ‹
              </button>

              <div className="ftRow" ref={scrollerRef}>
                {cards.map((t) => (
                  <article className="ftCard" key={t.id}>
                    <div className="ftCard__media">
                      <img
                        className="ftCard__img"
                        src={t.imageUrl}
                        alt={t.name}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = heroImg;
                        }}
                      />

                      <div className="ftCard__namePill">{t.name}</div>

                      <div className="ftCard__badge" aria-label="Weather" title="Weather">
                        <WeatherIcon type={t.weather} />
                      </div>
                    </div>

                    <div className="ftCard__body">
                      <div className="ftCard__metaTop">
                        <span className="ftCard__tag">{t.region}</span>
                        <span className="ftCard__time">
                          <span className="ftCard__timeIcon" aria-hidden="true">
                            🕒
                          </span>
                          {t.duration}
                        </span>
                      </div>

                      <div className="ftCard__stats">
                        <div className="ftStat">
                          <span className="ftStat__icon" aria-hidden="true">
                            💰
                          </span>
                          <span className="ftStat__text">{t.price}</span>
                        </div>

                        <div className="ftStat ftStat--right">
                          <span className="ftStat__icon" aria-hidden="true">
                            👥
                          </span>
                          <span className="ftStat__text">{t.group}</span>
                        </div>

                        <div className="ftStat">
                          <span className="ftStat__icon" aria-hidden="true">
                            🗓️
                          </span>
                          <span className="ftStat__text">{t.season}</span>
                        </div>
                      </div>

                      <div
                        className={[
                          "ftPill",
                          t.tone === "warning" ? "ftPill--warning" : "",
                          t.tone === "ok" ? "ftPill--ok" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        {t.tag}
                      </div>

                      <p className="ftCard__desc">{t.description}</p>

                      <div className="ftCard__actions">
                        <button
                          type="button"
                          className="ftBtn ftBtn--primary"
                          onClick={() => onMoreInfo(t)}
                        >
                          More Info
                        </button>
                        <Link
                          className="ftBtn ftBtn--outline"
                          to={`/book-now?tour=${encodeURIComponent(t.name)}`}
                        >
                          Book now!
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <button
                type="button"
                className="carouselArrow carouselArrow--right"
                aria-label="Next tours"
                onClick={() => scrollByPage(1)}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}