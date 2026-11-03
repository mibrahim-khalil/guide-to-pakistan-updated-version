import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import heroImg from "../../../assets/images/hero/hero.jpeg";
import gbHeroImg from "../../../assets/images/destinations/hero-gilgit-baltistan.jpeg";

import TourCategoryCta from "./components/TourCategoryCta";
import TourCategoryAccordion from "./components/TourCategoryAccordion";

import {
  familyFriendlyTours,
  honeymoonTours,
  adventurePackages,
  luxuryExperiences,
  budgetTours,
} from "../tours-page/data/toursData";

import "./tourCategoryPage.css";

/* =========================================================
   TOUR CATEGORIES
========================================================= */

const tourCategories = [
  {
    id: "family-friendly",
    heroImage: heroImg,
    indexLabel: "01",
    sectionLabel: "Family Journeys",
    eyebrow: "Family Journeys",
    heroTitle: "Adventures Made for Everyone",
    heroDescription:
      "Discover thoughtfully planned family journeys filled with comfort, discovery, and memorable experiences across Pakistan.",
    title: "Family Friendly Tours",
    subtitle:
      "Comfortable and memorable journeys designed for families exploring Pakistan together.",
    tours: familyFriendlyTours,
  },
  {
    id: "honeymoon",
    heroImage: gbHeroImg,
    indexLabel: "02",
    sectionLabel: "Romantic Escapes",
    eyebrow: "Romantic Escapes",
    heroTitle: "Journeys Made for Two",
    heroDescription:
      "Explore peaceful retreats, mountain hideaways, and romantic escapes designed for unforgettable moments together.",
    title: "Honeymoon Destinations",
    subtitle:
      "Romantic escapes featuring scenic landscapes, private experiences, and peaceful stays.",
    tours: honeymoonTours,
  },
  {
    id: "adventure",
    heroImage: heroImg,
    indexLabel: "03",
    sectionLabel: "Into the Wild",
    eyebrow: "Adventure Awaits",
    heroTitle: "Go Beyond the Ordinary",
    heroDescription:
      "From dramatic mountain trails to remote wilderness and coastal adventures, discover Pakistan beyond the familiar.",
    title: "Adventure Packages",
    subtitle:
      "Exciting outdoor experiences for travelers seeking mountains, coastlines, camps, and wilderness.",
    tours: adventurePackages,
  },
  {
    id: "luxury",
    heroImage: gbHeroImg,
    indexLabel: "04",
    sectionLabel: "Premium Pakistan",
    eyebrow: "Premium Pakistan",
    heroTitle: "Travel, Elevated",
    heroDescription:
      "Experience Pakistan through refined stays, private journeys, curated experiences, and exceptional destinations.",
    title: "Luxury Experiences",
    subtitle:
      "Premium journeys combining comfort, curated stays, and exceptional destinations.",
    tours: luxuryExperiences,
  },
  {
    id: "budget",
    heroImage: heroImg,
    indexLabel: "05",
    sectionLabel: "Travel Smart",
    eyebrow: "Travel Smart",
    heroTitle: "More Journey. Less Spend.",
    heroDescription:
      "Explore memorable destinations across Pakistan through thoughtfully planned journeys designed around value.",
    title: "Affordable Budget Tours",
    subtitle:
      "Value-focused travel packages created for memorable experiences without overspending.",
    tours: budgetTours,
  },
];

export default function TourCategoryPage() {
  const { categorySlug } = useParams();

  const heroRef = useRef(null);
  const scrollTimerRef = useRef(null);

  /* =========================================================
     INITIAL / URL CATEGORY
  ========================================================= */

  const validInitialCategory = useMemo(() => {
    const exists = tourCategories.some(
      (category) => category.id === categorySlug,
    );

    return exists ? categorySlug : "family-friendly";
  }, [categorySlug]);

  const [openCategory, setOpenCategory] = useState(validInitialCategory);

  /*
    Keeps the last selected category active for the hero,
    even if its accordion is collapsed.
  */
  const [selectedCategory, setSelectedCategory] =
    useState(validInitialCategory);

  /*
    Keep page state synced if the URL category changes.
  */
  useEffect(() => {
    setOpenCategory(validInitialCategory);
    setSelectedCategory(validInitialCategory);
  }, [validInitialCategory]);

  const activeCategory =
    tourCategories.find((category) => category.id === selectedCategory) ??
    tourCategories[0];

  /* =========================================================
     HERO IMAGE CROSSFADE
  ========================================================= */

  const [currentHeroImage, setCurrentHeroImage] = useState(
    activeCategory.heroImage,
  );

  const currentHeroImageRef = useRef(activeCategory.heroImage);

  const [previousHeroImage, setPreviousHeroImage] = useState(null);
  const [heroImageVisible, setHeroImageVisible] = useState(true);

  useEffect(() => {
    const nextHeroImage = activeCategory.heroImage;
    const previousImage = currentHeroImageRef.current;

    if (nextHeroImage === previousImage) {
      return undefined;
    }

    setPreviousHeroImage(previousImage);
    setHeroImageVisible(false);

    let secondFrame = null;

    const firstFrame = requestAnimationFrame(() => {
      currentHeroImageRef.current = nextHeroImage;
      setCurrentHeroImage(nextHeroImage);

      secondFrame = requestAnimationFrame(() => {
        setHeroImageVisible(true);
      });
    });

    const cleanupTimer = window.setTimeout(() => {
      setPreviousHeroImage(null);
    }, 800);

    return () => {
      cancelAnimationFrame(firstFrame);

      if (secondFrame !== null) {
        cancelAnimationFrame(secondFrame);
      }

      window.clearTimeout(cleanupTimer);
    };
  }, [activeCategory.heroImage]);

  /* =========================================================
     HERO PARALLAX
  ========================================================= */

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) {
      return undefined;
    }

    let frameId = null;

    const updateParallax = () => {
      const rect = hero.getBoundingClientRect();

      /*
        Do not keep calculating expensive parallax movement
        when the hero is completely outside the viewport.
      */
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        frameId = null;
        return;
      }

      const progress = Math.max(
        -1,
        Math.min(1, -rect.top / rect.height),
      );

      hero.style.setProperty(
        "--hero-parallax-y",
        `${progress * 18}px`,
      );

      frameId = null;
    };

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = requestAnimationFrame(updateParallax);
    };

    updateParallax();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  /* =========================================================
     SMOOTH SCROLL HELPER
  ========================================================= */

  const scrollToCategory = (categoryId, delay = 0) => {
    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }

    scrollTimerRef.current = window.setTimeout(() => {
      const target = document.getElementById(
        `tour-category-${categoryId}`,
      );

      if (!target) {
        scrollTimerRef.current = null;
        return;
      }

      const headerOffset = 130;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerOffset;

      window.scrollTo({
        top: Math.max(0, targetPosition),
        behavior: "smooth",
      });

      scrollTimerRef.current = null;
    }, delay);
  };

  /*
    Clear any pending scroll timer when the page unmounts.
  */
  useEffect(() => {
    return () => {
      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  /* =========================================================
     ACCORDION TOGGLE
  ========================================================= */

  const handleToggle = (categoryId) => {
    const isCurrentlyOpen = openCategory === categoryId;

    setSelectedCategory(categoryId);

    /*
      If the same collection is already open,
      simply collapse it. No unnecessary scroll.
    */
    if (isCurrentlyOpen) {
      setOpenCategory(null);
      return;
    }

    setOpenCategory(categoryId);

    /*
      Small delay allows the previous accordion to begin
      collapsing before calculating the new scroll position.
    */
    scrollToCategory(categoryId, 80);
  };

  /* =========================================================
     CATEGORY NAVIGATION
  ========================================================= */

  const handleCategoryNav = (categoryId) => {
    /*
      Clicking the already-selected/open category should not
      restart animations or trigger another unnecessary scroll.
    */
    if (
      selectedCategory === categoryId &&
      openCategory === categoryId
    ) {
      scrollToCategory(categoryId, 0);
      return;
    }

    setSelectedCategory(categoryId);
    setOpenCategory(categoryId);

    scrollToCategory(categoryId, 80);
  };

  return (
    <main className="tourCategoryPage">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        ref={heroRef}
        className="tourCategoryPage__hero"
      >
        <div className="tourCategoryPage__heroMedia">
          {previousHeroImage ? (
            <img
              src={previousHeroImage}
              alt=""
              aria-hidden="true"
              className="tourCategoryPage__heroImage tourCategoryPage__heroImage--previous"
            />
          ) : null}

          <img
            src={currentHeroImage}
            alt=""
            aria-hidden="true"
            className={[
              "tourCategoryPage__heroImage",
              "tourCategoryPage__heroImage--current",
              heroImageVisible ? "isVisible" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        </div>

        <div className="tourCategoryPage__heroOverlay" />

        <div className="tourCategoryPage__container">
          <div className="tourCategoryPage__heroContent">
            <span className="tourCategoryPage__eyebrow">
              {activeCategory.eyebrow}
            </span>

            <h1 className="tourCategoryPage__heroTitle">
              {activeCategory.heroTitle}
            </h1>

            <p className="tourCategoryPage__heroDescription">
              {activeCategory.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          FLOATING CATEGORY NAV
      ===================================================== */}

      <nav
        className="tourCategoryPage__categoryNav"
        aria-label="Tour categories"
      >
        <div className="tourCategoryPage__container">
          <div className="tourCategoryPage__categoryNavInner">
            {tourCategories.map((category) => {
              const isActive =
                selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={[
                    "tourCategoryPage__categoryNavItem",
                    isActive ? "isActive" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() =>
                    handleCategoryNav(category.id)
                  }
                >
                  {category.title}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* =====================================================
          TOUR COLLECTIONS
      ===================================================== */}

      <section className="tourCategoryPage__content">
        <div className="tourCategoryPage__container">
          <div className="tourCategoryPage__intro">
            <span className="tourCategoryPage__introEyebrow">
              Tour Collections
            </span>

            <h2 className="tourCategoryPage__introTitle">
              Find the Right Tour for Your Journey
            </h2>

            <p className="tourCategoryPage__introText">
              Expand any category to explore all available tours.
              Only one category stays open at a time.
            </p>
          </div>

          <div className="tourCategoryPage__accordionList">
            {tourCategories.map((category) => (
              <TourCategoryAccordion
                key={category.id}
                category={category}
                isOpen={openCategory === category.id}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <TourCategoryCta />
    </main>
  );
}