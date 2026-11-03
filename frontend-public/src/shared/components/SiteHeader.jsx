import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logos/gtp-logo.png";

const navClass = ({ isActive }) =>
  isActive ? "navLink isActive" : "navLink";

/* Destinations mega dropdown data */
const DESTINATION_REGIONS_GRID = [
  {
    id: "gilgit-baltistan",
    name: "Gilgit Baltistan",
    slug: "gilgit-baltistan",
    places: [
      "Attabad Lake",
      "Skardu Valley",
      "Rakaposhi Base Camp",
      "Astore Valley",
    ],
  },
  {
    id: "kpk",
    name: "KPK",
    slug: "khyber-pakhtunkhwa",
    places: ["Peshawar", "Chitral", "Kalaash Valley", "Naraan Valley"],
  },
  {
    id: "islamabad-capital-territory",
    name: "Islamabad",
    slug: "islamabad-capital-territory",
    places: ["Panjpeer rocks", "Chattar Park", "Pir Sohawa", "Lake View Park"],
  },
  {
    id: "punjab",
    name: "Punjab",
    slug: "punjab",
    places: ["Murree", "Neela Sandh", "Khewra Salt Mine", "Kartarpur Corridor"],
  },
  {
    id: "sindh",
    name: "Sindh",
    slug: "sindh",
    places: ["Hyderabad", "Sukkur", "Thar Desert", "Thatta"],
  },
  {
    id: "balochistan",
    name: "Balochistan",
    slug: "balochistan",
    places: ["Gwadar", "Bolan Pass", "Ormara Beach", "Ziarat Forest"],
  },
  {
    id: "kashmir",
    name: "Kashmir",
    slug: "azad-jammu-and-kashmir",
    places: ["Arang Kel", "Toli Peer", "Neelum Valley", "Banjosa Lake"],
  },
];

const TOURS_ITEMS = [
  { label: "Tours / Trips", path: "/tours" },
  { label: "Plan Your Trip", path: "/plan-your-trip" },
];

export default function SiteHeader() {
  const headerRef = useRef(null);
  const location = useLocation();

  const [isPlanTripScrolled, setIsPlanTripScrolled] = useState(false);

  const isPlanTripPage = location.pathname === "/plan-your-trip";

  // Mobile drawer
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mobile accordions
  const [isDestMobileOpen, setIsDestMobileOpen] = useState(false);
  const [isToursMobileOpen, setIsToursMobileOpen] = useState(false);

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsDestMobileOpen(false);
    setIsToursMobileOpen(false);
  };

  const isToursSectionActive =
    location.pathname === "/tours" ||
    location.pathname === "/plan-your-trip";

  const isDestActive = location.pathname.startsWith("/destinations");

  // Lock scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // ESC closes everything
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeAll();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // Close mobile menu when clicking outside header
  useEffect(() => {
    const onDocClick = (e) => {
      if (!headerRef.current) return;

      if (!headerRef.current.contains(e.target)) {
        if (isMenuOpen) {
          closeAll();
        }
      }
    };

    document.addEventListener("mousedown", onDocClick);

    return () => {
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [isMenuOpen]);

  /* =========================================================
     PLAN YOUR TRIP HEADER STATE
  ========================================================= */

  useEffect(() => {
    if (!isPlanTripPage) {
      setIsPlanTripScrolled(false);
      return undefined;
    }

    let frameId = null;

    const updateHeader = () => {
      setIsPlanTripScrolled(window.scrollY > 40);
      frameId = null;
    };

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = requestAnimationFrame(updateHeader);
    };

    updateHeader();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [isPlanTripPage]);

  return (
    <header
      ref={headerRef}
      className={[
        "siteHeader",
        isPlanTripPage ? "siteHeader--planTrip" : "",
        isPlanTripPage && isPlanTripScrolled ? "isScrolled" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container headerInner">
        {/* LEFT: Logo */}
        <NavLink
          to="/"
          className="brand"
          aria-label="Go to Home"
          onClick={closeAll}
        >
          <img
            className="brand__logo"
            src={logo}
            alt="Guide to Pakistan logo"
          />
        </NavLink>

        {/* DESKTOP NAV */}
        <nav className="nav nav--desktop" aria-label="Primary">
          <ul className="navList">
            <li>
              <NavLink to="/" className={navClass}>
                Home
              </NavLink>
            </li>

            {/* DESTINATIONS */}
            <li
              className={[
                "dropdown",
                "dropdown--mega",
                isDestActive ? "sectionActive" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="dropdownTrigger">
                <NavLink
                  to="/destinations"
                  className="dropdownLabel destLabel"
                  onClick={closeAll}
                  end
                >
                  Destinations
                </NavLink>

                <span className="dropdownArrowStatic" aria-hidden="true">
                  ▾
                </span>
              </div>

              <div
                className="dropdownMenu dropdownMenu--grid"
                role="menu"
                aria-label="Destinations menu"
              >
                <div className="destGridWrap">
                  {DESTINATION_REGIONS_GRID.map((region) => (
                    <div key={region.id} className="destGridColumn">
                      <div className="destGridColumn__title">
                        <NavLink
                          to={`/destinations/${region.slug}`}
                          onClick={closeAll}
                        >
                          {region.name}
                        </NavLink>
                      </div>

                      <ul className="destGridColumn__list">
                        {region.places.map((place) => {
                          const placeSlug = place
                            .toLowerCase()
                            .replace(/\s+/g, "-");

                          return (
                            <li key={place}>
                              <NavLink
                                to={`/destinations/${region.slug}/${placeSlug}`}
                                onClick={closeAll}
                              >
                                {place}
                              </NavLink>
                            </li>
                          );
                        })}
                      </ul>

                      <div className="destGridColumn__more">
                        <NavLink
                          to={`/destinations/${region.slug}`}
                          onClick={closeAll}
                        >
                          »See more
                        </NavLink>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </li>

            {/* TOURS */}
            <li
              className={[
                "dropdown",
                "dropdown--sectionMega",
                isToursSectionActive ? "sectionActive" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="dropdownTrigger">
                <span className="dropdownLabel">Tours</span>

                <span className="dropdownArrowStatic" aria-hidden="true">
                  ▾
                </span>
              </div>

              <div
                className="dropdownMenu dropdownMenu--sectionMega dropdownMenu--tours"
                role="menu"
                aria-label="Tours menu"
              >
                <div className="toursMenuStack">
                  <div className="toursMenuGroup">
                    <div className="sectionMegaColumn__title">
                      Explore Tours
                    </div>

                    <NavLink
                      to="/tours"
                      className="toursMenuLink"
                      onClick={closeAll}
                    >
                      Tours / Trips
                    </NavLink>
                  </div>

                  <div className="toursMenuGroup">
                    <div className="sectionMegaColumn__title">
                      Plan Your Journey
                    </div>

                    <NavLink
                      to="/plan-your-trip"
                      className="toursMenuLink"
                      onClick={closeAll}
                    >
                      Plan Your Trip
                    </NavLink>
                  </div>
                </div>
              </div>
            </li>

            {/* STORIES — DIRECT LINK */}
            <li>
              <NavLink to="/stories" className={navClass}>
                Stories
              </NavLink>
            </li>

            <li>
              <NavLink to="/history" className={navClass}>
                History
              </NavLink>
            </li>

            <li>
              <NavLink to="/tiss" className={navClass}>
                TISS
              </NavLink>
            </li>

            <li>
              <NavLink to="/shop" className={navClass}>
                Shop
              </NavLink>
            </li>

            <li>
              <NavLink to="/about" className={navClass}>
                About
              </NavLink>
            </li>

            <li>
              <NavLink to="/tiss/reports/w3" className={navClass}>
                Weekly Report
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="headerActions headerActions--desktop">
          <NavLink
            to="/book-now"
            className="bookBtn"
            onClick={closeAll}
          >
            Book now! <span className="bookBtn__arrow">→</span>
          </NavLink>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="headerActions headerActions--mobile">
          <NavLink
            to="/book-now"
            className="bookBtn"
            onClick={closeAll}
          >
            Book now! <span className="bookBtn__arrow">→</span>
          </NavLink>

          <button
            type="button"
            className="menuBtn"
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <div
        className={
          isMenuOpen
            ? "mobileMenuOverlay isOpen"
            : "mobileMenuOverlay"
        }
        onClick={closeAll}
      >
        <aside
          className={
            isMenuOpen ? "mobileMenu isOpen" : "mobileMenu"
          }
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobileMenu__top">
            <div className="mobileMenu__title">Menu</div>

            <button
              type="button"
              className="mobileMenu__close"
              aria-label="Close menu"
              onClick={closeAll}
            >
              ✕
            </button>
          </div>

          <nav
            className="mobileMenu__nav"
            aria-label="Mobile Primary"
          >
            <NavLink
              to="/"
              className="mobileLink"
              onClick={closeAll}
            >
              Home
            </NavLink>

            <NavLink
              to="/destinations"
              className="mobileLink"
              onClick={closeAll}
            >
              Destinations
            </NavLink>

            <button
              type="button"
              className="mobileToggle"
              onClick={() =>
                setIsDestMobileOpen((v) => !v)
              }
            >
              Browse by Region

              <span className="mobileToggle__icon">
                {isDestMobileOpen ? "−" : "+"}
              </span>
            </button>

            {isDestMobileOpen && (
              <div className="mobileSub">
                {DESTINATION_REGIONS_GRID.map((region) => (
                  <div
                    key={region.slug}
                    className="mobileDestGroup"
                  >
                    <NavLink
                      to={`/destinations/${region.slug}`}
                      className="mobileSubLink mobileSubLink--bold"
                      onClick={closeAll}
                    >
                      {region.name}
                    </NavLink>

                    {region.places.map((place) => (
                      <NavLink
                        key={place}
                        to={`/destinations/${region.slug}/${place
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="mobileSubLink mobileSubLink--indented"
                        onClick={closeAll}
                      >
                        → {place}
                      </NavLink>
                    ))}
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              className="mobileToggle"
              onClick={() =>
                setIsToursMobileOpen((v) => !v)
              }
            >
              Tours

              <span className="mobileToggle__icon">
                {isToursMobileOpen ? "−" : "+"}
              </span>
            </button>

            {isToursMobileOpen && (
              <div className="mobileSub">
                {TOURS_ITEMS.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="mobileSubLink"
                    onClick={closeAll}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            )}

            {/* STORIES — DIRECT MOBILE LINK */}
            <NavLink
              to="/stories"
              className="mobileLink"
              onClick={closeAll}
            >
              Stories
            </NavLink>

            <NavLink
              to="/history"
              className="mobileLink"
              onClick={closeAll}
            >
              History
            </NavLink>

            <NavLink
              to="/tiss"
              className="mobileLink"
              onClick={closeAll}
            >
              TISS
            </NavLink>

            <NavLink
              to="/shop"
              className="mobileLink"
              onClick={closeAll}
            >
              Shop
            </NavLink>

            <NavLink
              to="/about"
              className="mobileLink"
              onClick={closeAll}
            >
              About
            </NavLink>

            <NavLink
              to="/tiss/reports/w3"
              className="mobileLink"
              onClick={closeAll}
            >
              Weekly Report
            </NavLink>
          </nav>
        </aside>
      </div>
    </header>
  );
}