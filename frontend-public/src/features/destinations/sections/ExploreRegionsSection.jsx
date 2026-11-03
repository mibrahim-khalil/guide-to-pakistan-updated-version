import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { publicDestinationsApi } from "../api/publicDestinationsApi";
import { toPublicRegionSlug } from "../utils/regionSlug";
import heroImg from "../../../assets/images/hero/hero.jpeg";
import destHeroImg from "../../../assets/images/destinations/hero-gilgit-baltistan.jpeg";

function RegionSlide({ region, reversed = false, isAlt = false }) {
  const images = (region.images || []).map((src) => src || heroImg);
  while (images.length < 3) images.push(destHeroImg);

  return (
    <article className={isAlt ? "regionSlide isAlt" : "regionSlide"}>
      <div className="regionSlide__panel">
        <div className={reversed ? "container regionRow__inner isReversed" : "container regionRow__inner"}>
          <div className="regionRow__text">
            <div className="regionRow__headingRow">
              <h2 className="regionRow__name">{region.name}</h2>
              <NavLink className="bookBtn regionRow__cta" to={`/destinations/${toPublicRegionSlug(region.slug)}`} aria-label={`Explore further in ${region.name}`}>
                Explore further <span className="bookBtn__arrow">-&gt;</span>
              </NavLink>
            </div>
            <p className="regionRow__intro">{region.intro}</p>
            <div className="regionMeta" role="list" aria-label={`${region.name} information`}>
              {(region.details || []).map((item) => (
                <div className="regionMeta__item" key={item.label} role="listitem">
                  <div className="regionMeta__label">{item.label}</div>
                  <div className="regionMeta__value">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="regionRow__media" aria-label={`${region.name} images`}>
            <div className="regionCollage">
              <div className="regionCollage__tile isA"><img src={images[0]} alt={`${region.name} view 1`} loading="lazy" /></div>
              <div className="regionCollage__tile isB"><img src={images[1]} alt={`${region.name} view 2`} loading="lazy" /></div>
              <div className="regionCollage__tile isC"><img src={images[2]} alt={`${region.name} view 3`} loading="lazy" /></div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ExploreRegionsSection() {
  const [REGIONS, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    publicDestinationsApi
      .getExploreRegions()
      .then((data) => setRegions(data || []))
      .catch(() => setRegions([]))
      .finally(() => setLoading(false));
  }, []);

  const scrollToIndex = (idx) => {
    const el = slideRefs.current[idx];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (visible?.target?.dataset?.index) {
          setActiveIndex(parseInt(visible.target.dataset.index, 10));
        }
      },
      { root, threshold: [0.55, 0.6, 0.7] }
    );
    slideRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [REGIONS.length]);

  if (loading) {
    return (
      <section className="regionsSection">
        <div className="container regionsSection__head">
          <p className="regionsSection__eyebrow">EXPLORE DIFFERENT REGIONS</p>
          <h2 className="regionsSection__title">Loading regions from live database...</h2>
        </div>
      </section>
    );
  }

  if (!REGIONS.length) {
    return (
      <section className="regionsSection">
        <div className="container regionsSection__head">
          <p className="regionsSection__eyebrow">EXPLORE DIFFERENT REGIONS</p>
          <h2 className="regionsSection__title">No regions found</h2>
          <p className="regionsSection__subtitle">Start backend + seed data, then refresh.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="regionsSection" aria-label="Explore different regions">
      <div className="container regionsSection__head">
        <p className="regionsSection__eyebrow">EXPLORE DIFFERENT REGIONS</p>
        <h2 className="regionsSection__title">Travel across Pakistan, one region at a time</h2>
        <p className="regionsSection__subtitle">Live data from GTP Admin / MongoDB.</p>
      </div>

      <div className="regionsCarousel" aria-label="Regions carousel">
        <button type="button" className="regionsCarousel__nav regionsCarousel__nav--prev" onClick={() => scrollToIndex((activeIndex - 1 + REGIONS.length) % REGIONS.length)} aria-label="Previous region">&lt;</button>
        <div className="regionsCarousel__track" ref={trackRef}>
          {REGIONS.map((region, idx) => (
            <div key={region.id || region.slug} className="regionsCarousel__slide" data-index={idx} ref={(el) => { slideRefs.current[idx] = el; }}>
              <RegionSlide region={region} reversed={idx % 2 === 1} isAlt={idx % 2 === 1} />
            </div>
          ))}
        </div>
        <button type="button" className="regionsCarousel__nav regionsCarousel__nav--next" onClick={() => scrollToIndex((activeIndex + 1) % REGIONS.length)} aria-label="Next region">&gt;</button>
      </div>

      <div className="regionsCarousel__meta" aria-label="Carousel progress">
        <div className="container regionsCarousel__metaInner">
          <span className="regionsCarousel__count">{activeIndex + 1} / {REGIONS.length}</span>
          <div className="regionsCarousel__dots" aria-label="Jump to region">
            {REGIONS.map((r, idx) => (
              <button key={r.id || r.slug} type="button" className={idx === activeIndex ? "regionDot isActive" : "regionDot"} onClick={() => scrollToIndex(idx)} aria-label={`Go to ${r.name}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}