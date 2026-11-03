import {
  ArrowDown,
  ArrowRight,
  Compass,
} from "lucide-react";

export default function BookingModeSection({
  content,
  onSelect,
}) {
  if (!content?.options?.length) {
    return null;
  }

  const handleOptionClick = (option) => {
    if (option.type === "tour") {
      window.location.href = "/tours";
      return;
    }

    if (onSelect) {
      onSelect(option.type);
    }
  };

  return (
    <section
      id="booking-mode"
      className="bookingMode"
    >
      <div className="bookingMode__container">
        {/* ===============================================
            SECTION INTRO
        =============================================== */}

        <div className="bookingMode__intro">
          <div className="bookingMode__eyebrow">
            <Compass
              size={14}
              strokeWidth={1.8}
            />

            <span>
              {content.eyebrow}
            </span>
          </div>

          <h2>
            {content.title}
          </h2>

          <p>
            {content.description}
          </p>
        </div>

        {/* ===============================================
            BOOKING OPTIONS
        =============================================== */}

        <div className="bookingMode__grid">
          {content.options.map((option) => (
            <button
              key={option.id}
              type="button"
              className="bookingModeCard"
              onClick={() =>
                handleOptionClick(option)
              }
            >
              {/* IMAGE */}

              <div className="bookingModeCard__image">
                <img
                  src={option.image}
                  alt={option.imageAlt || option.title}
                />

                <div className="bookingModeCard__shade" />
              </div>

              {/* NUMBER */}

              <span className="bookingModeCard__number">
                {option.number}
              </span>

              {/* CONTENT */}

              <div className="bookingModeCard__content">
                <span className="bookingModeCard__label">
                  {option.label}
                </span>

                <h3>
                  {option.title}
                </h3>

                <p>
                  {option.description}
                </p>

                <div className="bookingModeCard__action">
                  <span>
                    {option.actionLabel}
                  </span>

                  <span className="bookingModeCard__arrow">
                    <ArrowRight
                      size={17}
                      strokeWidth={1.9}
                    />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* ===============================================
            HELP PROMPT
        =============================================== */}

        <button
          type="button"
          className="bookingMode__help"
          onClick={() =>
            onSelect?.("recommend")
          }
        >
          <span className="bookingMode__helpCopy">
            <small>
              NOT SURE WHICH ONE?
            </small>

            <strong>
              Let us help you choose your journey.
            </strong>
          </span>

          <span className="bookingMode__helpArrow">
            <ArrowDown
              size={18}
              strokeWidth={1.9}
            />
          </span>
        </button>
      </div>
    </section>
  );
}