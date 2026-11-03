import { ArrowDown } from "lucide-react";

import WhatsAppFloatingButton from "../components/WhatsAppFloatingButton";
import heroImage from "../../../assets/images/hero/hero.jpeg";

export default function HomeHeroSection() {
  const scrollToNextSection = () => {
    const hero = document.querySelector(".homeHero");

    if (!hero) return;

    const nextSection = hero.nextElementSibling;

    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className="homeHero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="homeHero__overlay" aria-hidden="true" />

      <div className="container homeHero__content">
        <div className="homeHero__badge">
          GUIDE TO PAKISTAN
        </div>

        <h1 className="homeHero__title">
          Discover the Soul of Pakistan
        </h1>

        <p className="homeHero__subtitle">
          From the mighty peaks of Karakoram to the ancient ruins of Indus Valley
          — an odyssey awaits.
        </p>

        <button
          type="button"
          className="homeHero__scrollBtn"
          onClick={scrollToNextSection}
          aria-label="Scroll to next section"
        >
          <ArrowDown size={27} strokeWidth={1.7} />
        </button>
      </div>

      <WhatsAppFloatingButton />
    </section>
  );
}