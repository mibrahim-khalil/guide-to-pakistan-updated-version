import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { publicDestinationsApi } from "../api/publicDestinationsApi";
import FeaturedPlacesSection from "./components/FeaturedPlacesSection";
import "./regionPage.css";

function splitHeading(name) {
  const clean = (name || "").replace(/capital territory/i, "").trim();
  if (clean.toLowerCase().includes("and")) return clean.toUpperCase();
  const parts = clean.split(" ");
  if (parts.length <= 1) return clean.toUpperCase();
  return `${parts[0].toUpperCase()}\n${parts.slice(1).join(" ").toUpperCase()}`;
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className={isOpen ? "faqItem isOpen" : "faqItem"}>
      <button type="button" className="faqTrigger" onClick={onToggle} aria-expanded={isOpen}>
        <span className="faqQ">{item.q}</span>
        <span className="faqIcon" aria-hidden="true">{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <div className="faqBody">{item.a}</div>}
    </div>
  );
}

function HeroSlider({ images, alt }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!images || images.length < 2) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % images.length), 5000);
    return () => clearInterval(id);
  }, [images]);

  if (!images?.length) {
    return <div className="regionHero__slides" aria-hidden="true"><div className="regionHero__slide isActive" style={{ background: "#0f172a" }} /></div>;
  }

  return (
    <div className="regionHero__slides" aria-hidden="true">
      {images.map((src, index) => (
        <div
          key={`${src}-${index}`}
          className={index === active ? "regionHero__slide isActive" : "regionHero__slide"}
          style={{ backgroundImage: src ? `url(${src})` : undefined, backgroundColor: "#0f172a" }}
          role="img"
          aria-label={alt}
        />
      ))}
    </div>
  );
}

function CollageSlider({ sets, variant = "left-tall" }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!sets || sets.length < 2) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % sets.length), 5000);
    return () => clearInterval(id);
  }, [sets]);
  const isMirrored = variant === "right-tall";
  if (!sets?.length) return null;

  return (
    <div className={isMirrored ? "socialCollage socialCollage--mirrored" : "socialCollage"}>
      {sets.map((set, index) => (
        <div key={`${(set || []).join("-")}-${index}`} className={index === active ? "socialCollage__set isActive" : "socialCollage__set"}>
          {isMirrored ? (
            <>
              <div className="socialCollage__right">
                <div className="socialCollage__cell"><img src={set[1]} alt="" loading="lazy" /></div>
                <div className="socialCollage__cell"><img src={set[2]} alt="" loading="lazy" /></div>
              </div>
              <div className="socialCollage__left"><img src={set[0]} alt="" loading="lazy" /></div>
            </>
          ) : (
            <>
              <div className="socialCollage__left"><img src={set[0]} alt="" loading="lazy" /></div>
              <div className="socialCollage__right">
                <div className="socialCollage__cell"><img src={set[1]} alt="" loading="lazy" /></div>
                <div className="socialCollage__cell"><img src={set[2]} alt="" loading="lazy" /></div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function AboutProvinceCarousel({ slides }) {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = slides.length;

  useEffect(() => {
    if (isPaused || total < 2) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % total), 5000);
    return () => clearInterval(id);
  }, [isPaused, total]);

  const renderParagraphs = (text) =>
    String(text || "").split("\n\n").map((paragraph, index) => (
      <p key={`${paragraph.slice(0, 24)}-${index}`} className="aboutProvince__desc">{paragraph}</p>
    ));

  if (!total) return null;

  return (
    <div className="aboutCarousel" aria-label="About the province" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="aboutCarousel__inner">
        <button type="button" className="aboutCarousel__arrow aboutCarousel__arrow--prev" onClick={() => setActive((i) => (i - 1 + total) % total)} aria-label="Previous">&lt;</button>
        <button type="button" className="aboutCarousel__arrow aboutCarousel__arrow--next" onClick={() => setActive((i) => (i + 1) % total)} aria-label="Next">&gt;</button>
        <div className="aboutCarousel__viewport">
          {slides.map((slide, index) => {
            const isMirrored = index % 2 === 1;
            return (
              <div key={slide.key} className={index === active ? "aboutCarousel__slide isActive" : "aboutCarousel__slide"} aria-hidden={index !== active}>
                <div className={isMirrored ? "aboutProvince__inner aboutProvince__inner--mirrored" : "aboutProvince__inner"}>
                  {isMirrored ? (
                    <>
                      <div className="aboutProvince__visual"><CollageSlider sets={slide.collage} variant="right-tall" /></div>
                      <div className="aboutProvince__text aboutProvince__text--right">
                        <span className="aboutCarousel__pill">{slide.title}</span>
                        {renderParagraphs(slide.text)}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="aboutProvince__text">
                        <span className="aboutCarousel__pill">{slide.title}</span>
                        {renderParagraphs(slide.text)}
                      </div>
                      <div className="aboutProvince__visual"><CollageSlider sets={slide.collage} variant="left-tall" /></div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="aboutCarousel__dots" role="tablist">
          {slides.map((slide, index) => (
            <button key={slide.key} type="button" className={index === active ? "aboutCarousel__dot isActive" : "aboutCarousel__dot"} onClick={() => setActive(index)} aria-label={`Go to ${slide.title}`} aria-selected={index === active} role="tab">
              <span className="aboutCarousel__dotLabel">{slide.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DestinationRegionPage() {
  const { regionSlug } = useParams();
  const [openFaq, setOpenFaq] = useState(null);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    publicDestinationsApi
      .getRegionPage(regionSlug)
      .then((data) => {
        if (!alive) return;
        setRegion(data);
      })
      .catch(() => {
        if (!alive) return;
        setError("Failed to load region");
        setRegion(null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [regionSlug]);

  if (loading) {
    return (
      <div className="container regionNotFound">
        <h1 className="regionNotFound__title">Loading region...</h1>
      </div>
    );
  }

  if (error || !region) {
    return (
      <div className="container regionNotFound">
        <h1 className="regionNotFound__title">Region not found</h1>
        <p className="regionNotFound__text">The region you are looking for does not exist yet or failed to load.</p>
        <Link className="bookBtn" to="/destinations">Back to Destinations <span className="bookBtn__arrow">-&gt;</span></Link>
      </div>
    );
  }

  const heroImages = region.heroImages?.length ? region.heroImages : [region.heroImage].filter(Boolean);

  const aboutSlides = [
    region.history && { key: "history", title: "History", text: region.history.text, collage: region.history.collage },
    region.cultural && { key: "cultural", title: "Cultural", text: region.cultural.text, collage: region.cultural.collage },
    region.social && { key: "social", title: "Social", text: region.social.text, collage: region.social.collage },
    region.festivals && { key: "festivals", title: "Festivals & Events", text: region.festivals.text, collage: region.festivals.collage },
  ].filter((s) => s && s.text);

  return (
    <section className="regionPage">
      <section className="regionHero" aria-label={`${region.name} hero`}>
        <HeroSlider images={heroImages} alt={`${region.name} background`} />
        <div className="regionHero__overlay" />
        <div className="container regionHero__content">
          <div className="regionHero__right">
            <h1 className="regionHero__title">
              {splitHeading(region.name).split("\n").map((line, index) => (
                <span key={`${line}-${index}`} className="regionHero__line">{line}</span>
              ))}
            </h1>
            {region.tagline && (
              <div className="regionHero__taglineWrap">
                <span className="regionHero__tagline">
                  <span className="regionHero__taglineDot" aria-hidden="true" />
                  {region.tagline}
                  <span className="regionHero__taglineDot" aria-hidden="true" />
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="regionAbout" aria-label="Explore the region">
        <div className="container regionAbout__inner">
          <h2 className="regionAbout__mainTitle">
            What You Need to Know About <span className="regionAbout__mainTitleAccent">{region.name}</span>
          </h2>
          <div className="regionAbout__kicker">Explore the Region</div>
        </div>
        {aboutSlides.length > 0 && <AboutProvinceCarousel slides={aboutSlides} />}
      </section>

      <section className="regionExplore" aria-label={`About ${region.name}`}>
        <div className="container regionExplore__inner">
          <div className="regionExplore__kicker">Explore the Region</div>
          <p className="regionExplore__text">{region.about}</p>
        </div>
      </section>

      <FeaturedPlacesSection places={region.places || []} regionSlug={regionSlug} regionName={region.name} />

      {(region.attractions || []).length > 0 && (
        <section className="regionAttractions" aria-label="Attractions">
          <div className="container">
            <h2 className="regionAttractions__title">Attractions</h2>
            <div className="regionAttractions__grid">
              {region.attractions.map((attraction) => (
                <div key={attraction.title} className="attractionCard">
                  <div className="attractionCard__title">{attraction.title}</div>
                  <div className="attractionCard__text">{attraction.text}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(region.faqs || []).length > 0 && (
        <section className="regionFaq" aria-label="Frequently asked questions">
          <div className="container">
            <h2 className="regionFaq__title">Frequently Asked Questions</h2>
            <div className="faqList">
              {region.faqs.map((item, index) => (
                <FaqItem key={item.q} item={item} isOpen={openFaq === index} onToggle={() => setOpenFaq((c) => (c === index ? null : index))} />
              ))}
            </div>
          </div>
        </section>
      )}
    </section>
  );
}