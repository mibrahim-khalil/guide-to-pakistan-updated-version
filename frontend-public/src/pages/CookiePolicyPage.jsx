import DestinationsHeroSection from "../features/destinations/sections/DestinationsHeroSection.jsx";
import ExploreRegionsSection from "../features/destinations/sections/ExploreRegionsSection.jsx";
import FeaturedPlacesSection from "../features/destinations/sections/FeaturedPlacesSection.jsx";
import "../features/destinations/styles/destinations.css";

export default function DestinationsPage() {
  return (
    <section className="destPage">
      <DestinationsHeroSection />
      <ExploreRegionsSection />
      <FeaturedPlacesSection />
    </section>
  );
}