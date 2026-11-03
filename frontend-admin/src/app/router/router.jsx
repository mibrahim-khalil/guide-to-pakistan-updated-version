import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "../../layouts/AuthLayout";
import AdminLayout from "../../layouts/AdminLayout";

import LoginPage from "../../features/auth/pages/LoginPage";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";

import DestinationsListPage from "../../features/destinations/pages/DestinationsListPage";
import DestinationCreatePage from "../../features/destinations/pages/DestinationCreatePage";
import DestinationEditPage from "../../features/destinations/pages/DestinationEditPage";

import ToursListPage from "../../features/tours/pages/ToursListPage";
import TourCreatePage from "../../features/tours/pages/TourCreatePage";
import TourEditPage from "../../features/tours/pages/TourEditPage";

import BookingsListPage from "../../features/bookings/pages/BookingsListPage";

import StoriesListPage from "../../features/stories/pages/StoriesListPage";
import StoryCreatePage from "../../features/stories/pages/StoryCreatePage";
import StoryEditPage from "../../features/stories/pages/StoryEditPage";

import ProductsListPage from "../../features/products/pages/ProductsListPage";
import OrdersListPage from "../../features/orders/pages/OrdersListPage";

import HomeContentPage from "../../features/home-content/pages/HomeContentPage";
import AboutContentPage from "../../features/about-content/pages/AboutContentPage";
import HistoryContentPage from "../../features/history-content/pages/HistoryContentPage";

import UsersListPage from "../../features/users/pages/UsersListPage";
import MediaLibraryPage from "../../features/media-library/pages/MediaLibraryPage";
import AISettingsPage from "../../features/tiss-ai/pages/AISettingsPage";
import AnalyticsPage from "../../features/analytics/pages/AnalyticsPage";
import CouponsListPage from "../../features/coupons/pages/CouponsListPage";
import InquiriesListPage from "../../features/inquiries/pages/InquiriesListPage";
import SettingsPage from "../../features/settings/pages/SettingsPage";

// NEW TISS admin pages
import AdvisoriesListPage from "../../features/advisories/pages/AdvisoriesListPage";
import RouteConditionsListPage from "../../features/route-conditions/pages/RouteConditionsListPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/destinations" element={<DestinationsListPage />} />
          <Route path="/destinations/new" element={<DestinationCreatePage />} />
          <Route path="/destinations/:id/edit" element={<DestinationEditPage />} />

          {/* NEW */}
          <Route path="/advisories" element={<AdvisoriesListPage />} />
          <Route path="/route-conditions" element={<RouteConditionsListPage />} />

          <Route path="/tours" element={<ToursListPage />} />
          <Route path="/tours/new" element={<TourCreatePage />} />
          <Route path="/tours/:id/edit" element={<TourEditPage />} />

          <Route path="/bookings" element={<BookingsListPage />} />

          <Route path="/stories" element={<StoriesListPage />} />
          <Route path="/stories/new" element={<StoryCreatePage />} />
          <Route path="/stories/:id/edit" element={<StoryEditPage />} />

          <Route path="/shop" element={<ProductsListPage />} />
          <Route path="/orders" element={<OrdersListPage />} />

          <Route path="/home-content" element={<HomeContentPage />} />
          <Route path="/about-content" element={<AboutContentPage />} />
          <Route path="/history-content" element={<HistoryContentPage />} />

          <Route path="/users" element={<UsersListPage />} />
          <Route path="/media" element={<MediaLibraryPage />} />
          <Route path="/tiss-ai" element={<AISettingsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/coupons" element={<CouponsListPage />} />
          <Route path="/inquiries" element={<InquiriesListPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}