import StoriesHero from "./components/StoriesHero";
import BlogSection from "./components/BlogSection";
import GallerySection from "./components/GallerySection";
import VideosSection from "./components/VideosSection";
import TravelerStoriesSection from "./components/TravelerStoriesSection";

import {
  storiesHeroData,
  blogSectionData,
  gallerySectionData,
  videosSectionData,
  travelerStoriesData,
} from "./data/storiesData";

// CSS Import — try this first
import "./styles/storiesPage.css";

// If the above fails with "file not found", comment it out and use this instead:
// import "./storiesPage.css";

export default function StoriesPage() {
  return (
    <main className="storiesPage">
      {/* HERO */}
      <StoriesHero content={storiesHeroData} />

      {/* BLOG */}
      <BlogSection content={blogSectionData} />

      {/* GALLERY */}
      <GallerySection content={gallerySectionData} />

      {/* VIDEOS */}
      <VideosSection content={videosSectionData} />

      {/* TRAVELER STORIES */}
      <TravelerStoriesSection content={travelerStoriesData} />
    </main>
  );
}