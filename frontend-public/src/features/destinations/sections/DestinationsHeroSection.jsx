import heroImg from "../../../assets/images/destinations/hero-gilgit-baltistan.jpeg";

export default function DestinationsHeroSection() {
  return (
    <section
      className="destHero"
      style={{ backgroundImage: `url(${heroImg})` }}
      aria-label="Destinations hero"
    >
      <div className="destHero__overlay" />

      <div className="container destHero__content">
        <div className="destHero__right">
          <h1 className="destHero__title">
            Travel Across Pakistan&apos;s
            <br />
            Regions
          </h1>
        </div>
      </div>
    </section>
  );
}