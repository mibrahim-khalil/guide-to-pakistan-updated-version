import { ArrowDown } from "lucide-react";

export default function AboutHero() {
  const scrollToStory = () => {
    const storySection = document.getElementById("about-story");

    if (storySection) {
      storySection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="aboutHero">
      <div className="aboutHero__background" />

      <div className="aboutHero__overlay" />

      <div className="aboutHero__content">
        <div className="aboutHero__copy">
          <div className="aboutHero__eyebrow">
            Purpose • People • Pakistan
          </div>

          <h1 className="aboutHero__title">
            <span>ABOUT</span>
            <span>GUIDE TO</span>
            <span className="aboutHero__titleAccent">PAKISTAN</span>
          </h1>

          <p className="aboutHero__description">
            Discover the people, purpose, and vision behind a platform
            built to help the world experience Pakistan with greater
            confidence, understanding, and connection.
          </p>
        </div>

        <button
          type="button"
          className="aboutHero__storyButton"
          onClick={scrollToStory}
          aria-label="Explore our story"
        >
          <span className="aboutHero__storyText">
            <small>START EXPLORING</small>
            <strong>OUR STORY</strong>
          </span>

          <span className="aboutHero__storyIcon">
            <ArrowDown size={21} strokeWidth={1.8} />
          </span>
        </button>
      </div>

      <div className="aboutHero__bottomFade" />
    </section>
  );
}