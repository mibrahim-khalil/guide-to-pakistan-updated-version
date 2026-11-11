import HomeHeroSection from "../features/home/sections/HomeHeroSection";
import BookYourJourneySection from "../features/home/sections/BookYourJourneySection";
import ExplorePakistanSection from "../features/home/sections/ExplorePakistanSection";
import FeaturedDestinationsSection from "../features/home/sections/FeaturedDestinationsSection";
import PopularDestinationsSection from "../features/home/sections/PopularDestinationsSection";
import TissIntelligenceSection from "../features/home/sections/TissIntelligenceSection";
import TravelerStoriesSection from "../features/home/sections/TravelerStoriesSection";

import "../features/home/styles/home.css";
import "../features/home/styles/featuredTours.css";
import "../features/home/styles/popularDestinations.css";
import "../features/home/styles/tissIntelligence.css";
import "../features/home/styles/travelerStories.css";

export default function HomePage() {
  return (
    <>
      <HomeHeroSection />
      <BookYourJourneySection />
      <ExplorePakistanSection />
      <FeaturedDestinationsSection />
      <PopularDestinationsSection />
      <TissIntelligenceSection />
      <TravelerStoriesSection />
    </>
  );
}