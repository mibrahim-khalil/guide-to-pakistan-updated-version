import { Link } from "react-router-dom";

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 10a3 3 0 1 1 0-6a3 3 0 0 1 0 6Z"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2Zm11 8H6v10h12V10ZM6 8h12V6H6v2Z"
      />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16 11a4 4 0 1 0-4-4a4 4 0 0 0 4 4Zm-8 1a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 8 12Zm8 2c-3.3 0-6 1.7-6 4v2h12v-2c0-2.3-2.7-4-6-4ZM8 14c-2.8 0-5 1.4-5 3.3V20h5.4c-.3-.5-.4-1-.4-1.6c0-1.7 1-3.1 2.4-4.1A8.5 8.5 0 0 0 8 14Z"
      />
    </svg>
  );
}

export default function TourCard({ tour }) {
  const {
    category,
    region,
    title,
    duration,
    groupSize,
    price,
    rating,
    reviews,
    image,
    path = "/book-now",
  } = tour;

  return (
    <article className="tourCard tourCard--imageFirst">
      <img
        className="tourCard__fullImage"
        src={image}
        alt={title}
        loading="lazy"
      />

      <div className="tourCard__imageShade" />

      <span className="tourCard__category tourCard__category--floating">
        {category}
      </span>

      <div className="tourCard__slidePanel">
        <div className="tourCard__region">
          <LocationIcon />
          <span>{region}</span>
        </div>

        <h3 className="tourCard__title">
          <Link to={path}>
            {title}
          </Link>
        </h3>

        <div className="tourCard__meta">
          <span>
            <CalendarIcon />
            {duration}
          </span>

          <span>
            <GroupIcon />
            {groupSize}
          </span>
        </div>

        <div className="tourCard__footer">
          <div className="tourCard__price">
            <span>From</span>
            <strong>{price}</strong>
          </div>

          <div className="tourCard__rating">
            <span className="tourCard__star">★</span>
            <strong>{rating}</strong>
            <small>({reviews})</small>
          </div>
        </div>

        <div className="tourCard__actions">
  <Link
    to={path}
    className="tourCard__button tourCard__button--secondary"
  >
    More Info
  </Link>

  <Link
    to="/book-now"
    className="tourCard__button"
    aria-label={`Book ${title}`}
  >
    Book Now
  </Link>
</div>
      </div>
    </article>
  );
}