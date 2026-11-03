import { useMemo } from "react";
import avatarFallback from "../../../assets/logos/gtp-logo.png";

function Stars({ value = 5 }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < value);
  return (
    <div className="tsStars" aria-label={`${value} out of 5 stars`}>
      {stars.map((filled, idx) => (
        <span key={idx} className={filled ? "tsStar isFilled" : "tsStar"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function TravelerStoriesSection() {
  // ✅ Local avatar only (CSP safe)
  const stories = useMemo(
    () => [
      {
        id: "sarah",
        rating: 5,
        quote:
          "Pakistan completely shattered every preconception I had. The people are incredibly warm, the food is extraordinary, and the landscapes are unlike anything I’ve ever seen.",
        name: "Sarah Mitchell",
        meta: "United Kingdom · K2 Base Camp Trek",
        avatar: avatarFallback,
      },
      {
        id: "marcus",
        rating: 5,
        quote:
          "The Mughal Heritage Trail was a revelation. Lahore’s Walled City is a UNESCO masterpiece waiting to happen. Guide to Pakistan organized every detail flawlessly.",
        name: "Marcus Hoffmann",
        meta: "Germany · Mughal Heritage Trail",
        avatar: avatarFallback,
      },
      {
        id: "priya",
        rating: 5,
        quote:
          "Neelum Valley left me speechless. The turquoise rivers, the emerald forests, the pristine silence — I’ve traveled across South Asia and nothing compares.",
        name: "Priya Sharma",
        meta: "India · Neelum Valley Escape",
        avatar: avatarFallback,
      },
    ],
    []
  );

  return (
    <section className="travelerStories">
      <div className="container">
        <div className="tsHead">
          <div className="tsKicker">TRAVELER STORIES</div>
          <h2 className="tsTitle">What Our Travelers Say</h2>
        </div>

        <div className="tsGrid">
          {stories.map((s) => (
            <article className="tsCard" key={s.id}>
              <Stars value={s.rating} />

              <p className="tsQuote">“{s.quote}”</p>

              <div className="tsPerson">
                <img
                  className="tsAvatar"
                  src={s.avatar}
                  alt={`${s.name} avatar`}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = avatarFallback;
                  }}
                />

                <div className="tsPersonText">
                  <div className="tsName">{s.name}</div>
                  <div className="tsMeta">{s.meta}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}