import { useEffect, useState } from "react";
import TourCard from "./TourCard";
import useTourCarousel from "../hooks/useTourCarousel";
import "../styles/tourCarousel.css";

export default function TourCarousel({ tours = [] }) {
  const [slidesToScroll, setSlidesToScroll] = useState(3);

  useEffect(() => {
    const updateSlidesToScroll = () => {
      const width = window.innerWidth;

      if (width <= 760) {
        setSlidesToScroll(1);
      } else if (width <= 1080) {
        setSlidesToScroll(2);
      } else {
        setSlidesToScroll(3);
      }
    };

    updateSlidesToScroll();

    window.addEventListener("resize", updateSlidesToScroll);

    return () => {
      window.removeEventListener("resize", updateSlidesToScroll);
    };
  }, []);

  const {
    emblaRef,
    emblaApi,
    selectedIndex,
    scrollSnaps,
    scrollPrev,
    scrollNext,
    scrollTo,
  } = useTourCarousel({
    slidesToScroll,
    containScroll: "trimSnaps",
  });

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.reInit({
      loop: true,
      align: "start",
      skipSnaps: false,
      slidesToScroll,
      containScroll: "trimSnaps",
    });
  }, [emblaApi, slidesToScroll]);

  if (!Array.isArray(tours) || tours.length === 0) {
    return null;
  }

  const showControls = tours.length > slidesToScroll;

  return (
    <div className="tourCarousel">
      <div
        className="tourCarousel__viewport"
        ref={emblaRef}
      >
        <div className="tourCarousel__container">
          {tours.map((tour) => (
            <div
              className="tourCarousel__slide"
              key={tour.id}
            >
              <TourCard tour={tour} />
            </div>
          ))}
        </div>
      </div>

      {showControls && (
        <>
          <button
            type="button"
            className="tourCarousel__arrow tourCarousel__arrow--left"
            onClick={scrollPrev}
            aria-label="Previous tours"
          >
            ←
          </button>

          <button
            type="button"
            className="tourCarousel__arrow tourCarousel__arrow--right"
            onClick={scrollNext}
            aria-label="Next tours"
          >
            →
          </button>

          <div className="tourCarousel__dots">
            {scrollSnaps.map((_, index) => (
              <button
                key={`tour-dot-${index}`}
                type="button"
                className={[
                  "tourCarousel__dot",
                  index === selectedIndex ? "isActive" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => scrollTo(index)}
                aria-label={`Go to tour set ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}