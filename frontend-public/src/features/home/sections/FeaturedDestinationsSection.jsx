import { Link, useNavigate } from "react-router-dom";
import { useMemo, useRef } from "react";

import heroImg from "../../../assets/images/hero/hero.jpeg";
import destHeroImg from "../../../assets/images/destinations/hero-gilgit-baltistan.jpeg";

function WeatherIcon({ type = "sun" }) {
  if (type === "cloud") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M19 18H6a4 4 0 0 1-.5-7.97A6 6 0 0 1 17.8 8.4 3.6 1 0 0 1 19 18ZM7 16h12a1.6 1.6 0 0 0-.18-3.19l-.86-.05-.27-.82A4 4 0 0 0 9 10.4l-.06.94-.93.14A2 2 0 0 0 7 16Z"
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

export default function FeaturedDestinationsSection() {
  const navigate = useNavigate();
  const scrollerRef = useRef(null);

  // ✅ Local images only (CSP safe)
  const tours = useMemo(
    () => [
      {
        id: "k2-base-camp",
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
        id: "hunza-autumn",
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
        id: "neelum-getaway",
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
      {
        id: "skardu-deosai",
        name: "Skardu & Deosai Plains",
        region: "Gilgit-Baltistan",
        duration: "8 days",
        group: "4–14",
        season: "Jun–Aug",
        price: "PKR 95,000",
        tag: "Adventure",
        tone: "warning",
        weather: "sun",
        imageUrl: destHeroImg,
        description:
          "Explore lakes, plains and mountain viewpoints. Great for photographers and nature lovers.",
      },
      {
        id: "swat-kalam",
        name: "Swat & Kalam Retreat",
        region: "Khyber Pakhtunkhwa",
        duration: "6 days",
        group: "4–16",
        season: "May–Sep",
        price: "PKR 55,000",
        tag: "Family",
        tone: "ok",
        weather: "cloud",
        imageUrl: heroImg,
        description:
          "Comfortable scenic tour with waterfalls, valleys, and local food—easy pace and family-friendly.",
      },
      {
        id: "chitral-kalash",
        name: "Chitral & Kalash Culture",
        region: "Khyber Pakhtunkhwa",
        duration: "7 days",
        group: "4–12",
        season: "Apr–Oct",
        price: "PKR 85,000",
        tag: "Cultural",
        tone: "ok",
        weather: "sun",
        imageUrl: heroImg,
        description:
          "Culture-focused journey into Kalash valleys with scenic drives and local experiences.",
      },
      {
        id: "lahore-heritage",
        name: "Lahore Heritage & Food",
        region: "Punjab",
        duration: "3 days",
        group: "2–20",
        season: "All year",
        price: "PKR 28,000",
        tag: "Cultural",
        tone: "ok",
        weather: "sun",
        imageUrl: heroImg,
        description:
          "Historic sites + food streets. A quick cultural escape packed with architecture and local flavors.",
      },
      {
        id: "karachi-coastal",
        name: "Karachi Coastal Break",
        region: "Sindh",
        duration: "4 days",
        group: "2–14",
        season: "Oct–Mar",
        price: "PKR 40,000",
        tag: "Luxury",
        tone: "ok",
        weather: "sun",
        imageUrl: heroImg,
        description:
          "Beach drives, city experiences and relaxed planning—best during cooler months for comfort.",
      },
      {
        id: "cholistan-safari",
        name: "Cholistan Desert Safari",
        region: "Punjab",
        duration: "3 days",
        group: "4–12",
        season: "Nov–Feb",
        price: "PKR 60,000",
        tag: "Adventure",
        tone: "warning",
        weather: "sun",
        imageUrl: heroImg,
        description:
          "Desert dunes, forts and cultural stops—unique seasonal adventure with guided support.",
      },
      {
        id: "fairy-meadows",
        name: "Fairy Meadows & Nanga Parbat",
        region: "Gilgit-Baltistan",
        duration: "6 days",
        group: "4–12",
        season: "Jun–Sep",
        price: "PKR 70,000",
        tag: "Adventure",
        tone: "warning",
        weather: "cloud",
        imageUrl: destHeroImg,
        description:
          "Trek to one of the world's most stunning viewpoints with Nanga Parbat in full glory. Guided camps included.",
      },
      {
        id: "kaghan-babusar",
        name: "Kaghan & Babusar Top",
        region: "Khyber Pakhtunkhwa",
        duration: "5 days",
        group: "4–16",
        season: "May–Sep",
        price: "PKR 50,000",
        tag: "Scenic",
        tone: "ok",
        weather: "sun",
        imageUrl: heroImg,
        description:
          "Lush valleys, mountain passes and lake views. A classic northern road trip with comfortable stops.",
      },
      {
        id: "gwadar-coastal",
        name: "Gwadar Coastal Adventure",
        region: "Balochistan",
        duration: "4 days",
        group: "2–12",
        season: "Oct–Mar",
        price: "PKR 65,000",
        tag: "Luxury",
        tone: "ok",
        weather: "sun",
        imageUrl: heroImg,
        description:
          "Coastal highways, beaches and unique rock formations. A relaxed southern escape with sea views.",
      },
    ],
    []
  );

  const scrollByPage = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;

    const card = el.querySelector(".ftCard");
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 16; // must match CSS gap
    const step = cardWidth + gap;

    const visible = Math.max(1, Math.round(el.clientWidth / step));
    el.scrollBy({ left: step * visible * direction, behavior: "smooth" });
  };

  const onMoreInfo = () => {
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
              {tours.map((t) => (
                <article className="ftCard" key={t.id}>
                  <div className="ftCard__media">
                    <img className="ftCard__img" src={t.imageUrl} alt={t.name} loading="lazy" />

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
                      <button type="button" className="ftBtn ftBtn--primary" onClick={onMoreInfo}>
                        More Info
                      </button>
                      <Link className="ftBtn ftBtn--outline" to="/book-now">
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
        </div>
      </div>
    </section>
  );
}