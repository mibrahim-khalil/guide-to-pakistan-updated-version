import HistoryHero from "./components/HistoryHero";
import PakistanHistorySlider from "./components/PakistanHistorySlider";
import RegionalHistoryGrid from "./components/RegionalHistoryGrid";
import RegionalHistoryExplorer from "./components/RegionalHistoryExplorer";
import HistoricalPlacesCarousel from "./components/HistoricalPlacesCarousel";
import HistoryClosingCTA from "./components/HistoryClosingCTA";

import {
  historyHeroData,
  pakistanHistoryData,
  provinceHistoryCardsData,
  provinceHistorySliderData,
  historicalPlacesData,
  historyClosingCTAData,
} from "./data/historyData";

// CSS Import — try this first
import "./styles/historyPage.css";

// If you get "file not found", comment the line above and use this instead:
// import "./historyPage.css";

export default function HistoryPage() {
  return (
    <main className="historyPage">
      <HistoryHero content={historyHeroData} />

      <PakistanHistorySlider content={pakistanHistoryData} />

      <RegionalHistoryGrid content={provinceHistoryCardsData} />

      <RegionalHistoryExplorer content={provinceHistorySliderData} />

      <HistoricalPlacesCarousel content={historicalPlacesData} />

      <HistoryClosingCTA content={historyClosingCTAData} />
    </main>
  );
}