import DestinationsHeroSection from "../features/destinations/sections/DestinationsHeroSection.jsx";
import ExploreRegionsSection from "../features/destinations/sections/ExploreRegionsSection.jsx";
import FeaturedDestinationsSection from "../features/destinations/sections/FeaturedDestinationsSection.jsx";
import "../features/destinations/styles/destinations.css";

export default function DestinationsPage() {
  return (
    <section className="destPage">
      <DestinationsHeroSection />
      <ExploreRegionsSection />
      <FeaturedDestinationsSection />
    </section>
  );
}