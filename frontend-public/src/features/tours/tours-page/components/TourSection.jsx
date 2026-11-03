import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TourCarousel from "./TourCarousel";
/*
  Keeps track of sections that have already animated
  during the current page load.

  A full browser refresh clears this automatically.
*/
const revealedTourSections = new Set();

export default function TourSection({
  title,
  subtitle = "",
  tours = [],
  sectionId = "",
}) {
  const sectionRef = useRef(null);

  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(() =>
    revealedTourSections.has(sectionId),
  );

  useEffect(() => {
    const element = sectionRef.current;

    if (!element) {
      return undefined;
    }

    /*
      If this section already animated earlier,
      keep it visible and don't create another observer.
    */
    if (revealedTourSections.has(sectionId)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        /*
          Remember permanently for this page load
        */
        revealedTourSections.add(sectionId);

        setIsVisible(true);

        /*
          Animation is now finished forever
          until the page is refreshed.
        */
        observer.unobserve(element);
      },
      {
        threshold: 0.18,
        rootMargin: "-40px 0px -40px 0px",
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
    s;
  }, [sectionId]);

  const directionClass =
    sectionId === "honeymoon-destinations" || sectionId === "luxury-experiences"
      ? "tourSection--fromRight"
      : "tourSection--fromLeft";

  if (!Array.isArray(tours) || tours.length === 0) {
    return null;
  }

  /* =========================================================
   VIEW ALL NAVIGATION
========================================================= */

  const categoryRouteMap = {
    "family-friendly-tours": "family-friendly",
    "honeymoon-destinations": "honeymoon",
    "adventure-packages": "adventure",
    "luxury-experiences": "luxury",
    "budget-tours": "budget",
  };

  const handleViewAll = () => {
    const categorySlug = categoryRouteMap[sectionId];

    if (!categorySlug) {
      return;
    }

    navigate(`/tours/all/${categorySlug}`);
  };

  /* =========================================================
   COMPONENT JSX
========================================================= */

  return (
    <section
      ref={sectionRef}
      id={sectionId || undefined}
      className={["tourSection", directionClass, isVisible ? "isVisible" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-label={title}
    >
      <div className="tourSection__head">
        <div className="tourSection__headingPill">
          <div className="tourSection__headingCopy">
            <h2 className="tourSection__title">{title}</h2>

            {subtitle ? (
              <p className="tourSection__subtitle">{subtitle}</p>
            ) : null}
          </div>

          <button
            type="button"
            className="tourSection__viewAll"
            onClick={handleViewAll}
          >
            View All →
          </button>
        </div>
      </div>

      <TourCarousel tours={tours} />
    </section>
  );
}
