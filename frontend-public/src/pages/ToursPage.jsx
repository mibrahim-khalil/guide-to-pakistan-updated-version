import ToursHero from "../features/tours/tours-page/components/ToursHero";
import TourSection from "../features/tours/tours-page/components/TourSection";
import SpecialTourOptions from "../features/tours/tours-page/components/SpecialTourOptions";
import TourComparison from "../features/tours/tours-page/components/TourComparison";
import ToursPlanningCta from "../features/tours/tours-page/components/ToursPlanningCta";

import {
  toursHero,
  familyFriendlyTours,
  honeymoonTours,
  adventurePackages,
  luxuryExperiences,
  budgetTours,
  specialTourOptions,
  tourComparison,
  toursPlanningCta,
} from "../features/tours/tours-page/data/toursData";

// CSS Imports (Corrected paths)
import "../features/tours/tours-page/toursPage.css";
import "../features/tours/tours-page/styles/tourCarousel.css";

export default function ToursPage() {
  return (
    <main className="toursPage">
      <ToursHero content={toursHero} />

      <div id="tour-packages" className="toursContent">
        {/* FAMILY FRIENDLY TOURS */}
        <div className="toursSectionWrap toursSectionWrap--mint">
          <div className="toursContainer">
            <TourSection
              sectionId="family-friendly-tours"
              title="Family Friendly Tours"
              subtitle="Comfortable and memorable journeys designed for families exploring Pakistan together."
              tours={familyFriendlyTours}
            />
          </div>
        </div>

        {/* HONEYMOON DESTINATIONS */}
        <div className="toursSectionWrap toursSectionWrap--cream">
          <div className="toursContainer">
            <TourSection
              sectionId="honeymoon-destinations"
              title="Honeymoon Destinations"
              subtitle="Romantic escapes featuring scenic landscapes, private experiences, and peaceful stays."
              tours={honeymoonTours}
            />
          </div>
        </div>

        {/* ADVENTURE PACKAGES */}
        <div className="toursSectionWrap toursSectionWrap--sage">
          <div className="toursContainer">
            <TourSection
              sectionId="adventure-packages"
              title="Adventure Packages"
              subtitle="Exciting outdoor experiences for travelers seeking mountains, coastlines, camps, and wilderness."
              tours={adventurePackages}
            />
          </div>
        </div>

        {/* LUXURY EXPERIENCES */}
        <div className="toursSectionWrap toursSectionWrap--mint">
          <div className="toursContainer">
            <TourSection
              sectionId="luxury-experiences"
              title="Luxury Experiences"
              subtitle="Premium journeys combining comfort, curated stays, and exceptional destinations."
              tours={luxuryExperiences}
            />
          </div>
        </div>

        {/* AFFORDABLE BUDGET TOURS */}
        <div className="toursSectionWrap toursSectionWrap--cream">
          <div className="toursContainer">
            <TourSection
              sectionId="budget-tours"
              title="Affordable Budget Tours"
              subtitle="Value-focused travel packages created for memorable experiences without overspending."
              tours={budgetTours}
            />
          </div>
        </div>

        {/* SPECIAL TOUR OPTIONS */}
        <div className="toursSectionWrap toursSectionWrap--special">
          <div className="toursContainer">
            <SpecialTourOptions options={specialTourOptions} />
          </div>
        </div>

        {/* TOUR COMPARISON */}
        <div className="toursSectionWrap toursSectionWrap--comparison">
          <div className="toursContainer">
            <TourComparison rows={tourComparison} />
          </div>
        </div>

        {/* PLANNING CTA */}
        <div className="toursSectionWrap toursSectionWrap--cta">
          <div className="toursContainer">
            <ToursPlanningCta content={toursPlanningCta} />
          </div>
        </div>
      </div>
    </main>
  );
}