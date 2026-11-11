import { Routes, Route } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";
import HomePage from "../../pages/HomePage";
import DestinationsPage from "../../pages/DestinationsPage";
import DestinationRegionPage from "../../features/destinations/region-page/DestinationRegionPage";
import RegionAllPlacesPage from "../../features/destinations/region-page/RegionAllPlacesPage";
import DestinationPlacePage from "../../features/destinations/place-page/DestinationPlacePage";
import ToursPage from "../../pages/ToursPage";
import ShopPage from "../../pages/ShopPage";
import CheckoutPage from "../../pages/CheckoutPage";
import BookNowPage from "../../features/booking/BookNowPage";
import AboutPage from "../../features/about/AboutPage";
import HelpPage from "../../pages/HelpPage";
import HistoryPage from "../../features/history/HistoryPage";
import StoriesPage from "../../features/stories/StoriesPage";
import TissPage from "../../features/tiss/TissPage";
import WeeklyReportPage from "../../features/tiss/WeeklyReportPage";
import NotFoundPage from "../../pages/NotFoundPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/destinations/:regionSlug" element={<DestinationRegionPage />} />
        <Route path="/destinations/:regionSlug/all-places" element={<RegionAllPlacesPage />} />
        <Route path="/destinations/:regionSlug/:placeSlug" element={<DestinationPlacePage />} />
        <Route path="/tours" element={<ToursPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/book-now" element={<BookNowPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/tiss" element={<TissPage />} />
        <Route path="/tiss/reports/latest" element={<WeeklyReportPage />} />
        <Route path="/tiss/reports/:id" element={<WeeklyReportPage />} />
        <Route path="/tiss/reports" element={<WeeklyReportPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}