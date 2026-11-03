import {
  ArrowDown,
  ArrowRight,
  Compass,
  MapPin,
} from "lucide-react";

export default function BookingHero() {
  const scrollToBooking = () => {
    const bookingSection =
      document.getElementById("booking-mode");

    if (bookingSection) {
      bookingSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="bookingHero">
      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="bookingHero__background">
        <img
          src="https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=2000&q=90"
          alt="Mountain landscape in Pakistan"
        />
      </div>

      <div className="bookingHero__overlay" />

      <div className="bookingHero__texture" />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="bookingHero__container">
        <div className="bookingHero__content">
          <div className="bookingHero__eyebrow">
            <Compass
              size={14}
              strokeWidth={1.8}
            />

            <span>
              YOUR JOURNEY STARTS HERE
            </span>
          </div>

          <h1 className="bookingHero__title">
            <span>BOOK</span>

            <span>PAKISTAN.</span>

            <span className="bookingHero__titleAccent">
              YOUR WAY.
            </span>
          </h1>

          <p className="bookingHero__description">
            Choose your destination, travel style,
            dates, and preferences. We&apos;ll help
            turn them into a journey built around you.
          </p>

          {/* =============================================
              ACTIONS
          ============================================= */}

          <div className="bookingHero__actions">
            <button
              type="button"
              className="bookingHero__primary"
              onClick={scrollToBooking}
            >
              <span>
                Start Booking
              </span>

              <ArrowRight
                size={17}
                strokeWidth={2}
              />
            </button>

            <a
              href="/tours"
              className="bookingHero__secondary"
            >
              Explore Tours
            </a>
          </div>
        </div>

        {/* ===============================================
            CUSTOM TRIP CARD
        =============================================== */}

        <button
          type="button"
          className="bookingHero__customCard"
          onClick={scrollToBooking}
          aria-label="Start planning a custom trip"
        >
          <div className="bookingHero__customIcon">
            <MapPin
              size={21}
              strokeWidth={1.8}
            />
          </div>

          <div className="bookingHero__customCopy">
            <small>
              PLANNING A CUSTOM TRIP?
            </small>

            <strong>
              Tell us where you want to go
            </strong>
          </div>

          <div className="bookingHero__customArrow">
            <ArrowDown
              size={21}
              strokeWidth={2}
            />
          </div>
        </button>
      </div>

      <div className="bookingHero__bottomFade" />
    </section>
  );
}