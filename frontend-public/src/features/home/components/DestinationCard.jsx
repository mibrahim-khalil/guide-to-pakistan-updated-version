import { Link } from "react-router-dom";

import heroImg from "../../../assets/images/hero/hero.jpeg";
import destHeroImg from "../../../assets/images/destinations/hero-gilgit-baltistan.jpeg";

function pickLocalImage({ id, region }) {
  const r = (region || "").toLowerCase();
  const key = (id || "").toLowerCase();

  if (r.includes("gilgit") || r.includes("baltistan") || key.includes("hunza") || key.includes("skardu")) {
    return destHeroImg;
  }

  return heroImg;
}

export default function DestinationCard({ destination }) {
  const { id, name, region, short, bestSeason, tags } = destination;

  const imgSrc = pickLocalImage({ id, region });
  const safeTags = Array.isArray(tags) ? tags : [];

  return (
    <article className="destCard">
      <div className="destCard__media">
        <img className="destCard__img" src={imgSrc} alt={name} loading="lazy" />
        <div className="destCard__overlay" />
        <div className="destCard__namePill">{name}</div>
      </div>

      <div className="destCard__body">
        <div className="destCard__top">
          <span className="destCard__region">{region}</span>
          <span className="destCard__season">Best: {bestSeason}</span>
        </div>

        <p className="destCard__desc">{short}</p>

        <div className="destCard__tags">
          {safeTags.map((t) => (
            <span className="destTag" key={t}>
              {t}
            </span>
          ))}
        </div>

        <div className="destCard__actions">
          <Link className="destBtn destBtn--primary" to={`/tours?destination=${encodeURIComponent(id)}`}>
            View Tours
          </Link>
          <Link className="destBtn destBtn--outline" to="/plan-your-trip">
            Plan Trip
          </Link>
        </div>
      </div>
    </article>
  );
}