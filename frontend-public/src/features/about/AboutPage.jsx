import AboutHero from "./components/AboutHero";
import AboutStory from "./components/AboutStory";
import MissionSection from "./components/MissionSection";
import TeamSection from "./components/TeamSection";
import SustainabilitySection from "./components/SustainabilitySection";
import PartnersSection from "./components/PartnersSection";
import AboutFAQ from "./components/AboutFAQ";
import AboutClosingCTA from "./components/AboutClosingCTA";

import {
  aboutStoryData,
  aboutMissionData,
  aboutTeamData,
  aboutSustainabilityData,
  aboutPartnersData,
  aboutFAQData,
  aboutClosingCTAData,
} from "./data/aboutData";

import "./styles/aboutPage.css";

export default function AboutPage() {
  return (
    <main className="aboutPage">
      <AboutHero />

      <AboutStory
        content={aboutStoryData}
      />

      <MissionSection
        content={aboutMissionData}
      />

      <TeamSection
        content={aboutTeamData}
      />

      <SustainabilitySection
        content={aboutSustainabilityData}
      />

      <PartnersSection
        content={aboutPartnersData}
      />

      <AboutFAQ
        content={aboutFAQData}
      />

      <AboutClosingCTA
        content={aboutClosingCTAData}
      />
    </main>
  );
}
