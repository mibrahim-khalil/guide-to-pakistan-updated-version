import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import heroImg from "../../../assets/images/hero/hero.jpeg";
import destHeroImg from "../../../assets/images/destinations/hero-gilgit-baltistan.jpeg";

export default function PopularDestinationsSection() {
  const navigate = useNavigate();

  // ✅ Local images only (CSP safe)
  const destinations = useMemo(
    () => [
      { id: "hunza", title: "Hunza Valley", subtitle: "Gilgit-Baltistan", imageUrl: destHeroImg },
      { id: "lahore", title: "Lahore", subtitle: "Punjab", imageUrl: heroImg },
      { id: "swat", title: "Swat Valley", subtitle: "Khyber Pakhtunkhwa", imageUrl: heroImg },
      { id: "karachi", title: "Karachi", subtitle: "Sindh", imageUrl: heroImg },
      { id: "islamabad", title: "Islamabad", subtitle: "ICT", imageUrl: heroImg },
      { id: "skardu", title: "Skardu", subtitle: "Gilgit-Baltistan", imageUrl: destHeroImg },
    ],
    []
  );

  const [active, setActive] = useState(2);

  const clampIndex = (i) => {
    const len = destinations.length;
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
  }, []);

  // NOTE: your Destinations page no longer uses this query,
  // so I’m sending users to /destinations (safe).
  const onCardClick = () => {
    navigate("/destinations");
  };

  const getOffset = (index) => {
    const len = destinations.length;
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

        <div className="pdCoverflow" aria-label="Popular Destinations carousel">
          <button type="button" className="pdArrow pdArrow--left" aria-label="Previous" onClick={goPrev}>
            ‹
          </button>

          <div className="pdStage">
            {destinations.map((d, index) => {
              const offset = getOffset(index);
              const abs = Math.abs(offset);

              return (
                <article
                  key={d.id}
                  className={["pdCard", index === active ? "isActive" : "", abs > 3 ? "isHidden" : ""]
                    .filter(Boolean)
                    .join(" ")}
                  style={{ "--offset": offset, "--abs": abs }}
                  role="button"
                  tabIndex={0}
                  onClick={onCardClick}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") onCardClick();
                  }}
                >
                  <img className="pdCard__img" src={d.imageUrl} alt={d.title} loading="lazy" />
                  <div className="pdCard__overlay" />
                  <div className="pdCard__text">
                    <div className="pdCard__title">{d.title}</div>
                    <div className="pdCard__sub">{d.subtitle}</div>
                  </div>
                </article>
              );
            })}
          </div>

          <button type="button" className="pdArrow pdArrow--right" aria-label="Next" onClick={goNext}>
            ›
          </button>
        </div>

        <div className="pdFooter">
          <Link className="pdAllLink" to="/destinations">
            View all destinations <span className="pdAllLink__arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}