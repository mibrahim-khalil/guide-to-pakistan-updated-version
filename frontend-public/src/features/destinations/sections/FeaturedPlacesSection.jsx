import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";

import heroImg from "../../../assets/images/hero/hero.jpeg";
import destHeroImg from "../../../assets/images/destinations/hero-gilgit-baltistan.jpeg";

function AutoImageSlider({ images, intervalMs = 3200 }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!images?.length) return undefined;
    const t = setInterval(() => setActive((i) => (i + 1) % images.length), intervalMs);
    return () => clearInterval(t);
  }, [images, intervalMs]);

  return (
    <div className="placeSlider" aria-label="Image slider">
      {images.map((src, idx) => (
        <div
          key={`${idx}-${src}`}
          className={idx === active ? "placeSlide isActive" : "placeSlide"}
          aria-hidden={idx === active ? "false" : "true"}
        >
          <img src={src} alt={`Place image ${idx + 1}`} loading="lazy" />
        </div>
      ))}

      <div className="placeSlider__dots" aria-label="Slider dots">
        {images.map((_, idx) => (
          <button
            key={idx}
            type="button"
            className={idx === active ? "placeDot isActive" : "placeDot"}
            onClick={() => setActive(idx)}
            aria-label={`Show image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function PlaceRow({ place, reversed = false, altBg = false }) {
  return (
    <article className={altBg ? "placeRow isAlt" : "placeRow"}>
      <div className={reversed ? "container placeRow__inner isReversed" : "container placeRow__inner"}>
        <div className="placeRow__text">
          <div className="placeRow__headingRow">
            <h3 className="placeRow__name">{place.name}</h3>

            <NavLink
              className="bookBtn placeRow__cta"
              to={`/destinations/${place.regionSlug}/${place.placeSlug}`}
              aria-label={`Explore further: ${place.name}`}
            >
              Explore further <span className="bookBtn__arrow">→</span>
            </NavLink>
          </div>

          <p className="placeRow__desc">{place.description}</p>

          <div className="placeRow__para">
            <strong>People & culture:</strong> {place.people}
          </div>

          <div className="placeRow__para">
            <strong>Why it’s special:</strong> {place.special}
          </div>
        </div>

        <div className="placeRow__media" aria-label={`${place.name} images`}>
          <AutoImageSlider images={place.images} intervalMs={3400} />
        </div>
      </div>
    </article>
  );
}

export default function FeaturedPlacesSection() {
  const localSlides = useMemo(() => [heroImg, destHeroImg, heroImg], []);

  const PLACES = useMemo(
    () => [
      {
        name: "Hunza Valley",
        regionSlug: "gilgit-baltistan",
        placeSlug: "hunza",
        description:
          "Hunza is a legendary mountain valley known for bright rivers, dramatic peaks, and peaceful villages.",
        people:
          "Locals are known for warm hospitality and strong community traditions shaped by mountain living.",
        special:
          "Sunrise viewpoints, lake drives, and unforgettable road-trip scenery—perfect for photography and slow travel.",
        images: localSlides,
      },
      {
        name: "Lahore",
        regionSlug: "punjab",
        placeSlug: "lahore",
        description:
          "Lahore is Pakistan’s cultural capital—historic streets, Mughal-era landmarks, and energetic city life.",
        people:
          "The city is famous for lively conversations, deep food culture, and a welcoming vibe for visitors.",
        special:
          "Heritage walks, architecture, museums, and iconic food streets—ideal for culture lovers.",
        images: localSlides,
      },
      {
        name: "Neelum Valley",
        regionSlug: "azad-jammu-and-kashmir",
        placeSlug: "neelum-valley",
        description:
          "Neelum Valley is a lush river valley with forests, misty hills, and scenic viewpoints.",
        people:
          "Communities are welcoming and family-oriented, with a peaceful rhythm of life tied to nature.",
        special:
          "Riverside viewpoints, pine forests, and scenic stays—great for couples and nature retreats.",
        images: localSlides,
      },
      {
        name: "Gwadar",
        regionSlug: "balochistan",
        placeSlug: "gwadar",
        description:
          "Gwadar is a coastal city known for sea views, long drives, and wide-open landscapes.",
        people:
          "Local culture is grounded and resilient—coastal life is simple with strong traditions.",
        special:
          "Coastal highways, cliffs, sunsets, and beaches—best enjoyed in cooler months.",
        images: localSlides,
      },
    ],
    [localSlides]
  );

  return (
    <section className="featuredPlacesSection" aria-label="Featured places">
      <div className="container featuredPlacesSection__head">
        <div className="featuredPlacesSection__eyebrow">FEATURED PLACES</div>
        <h2 className="featuredPlacesSection__title">
          Top Places to Spark Your Next
          <br />
          Great Adventure Across Pakistan.
        </h2>
      </div>

      <div className="featuredPlacesSection__list">
        {PLACES.map((p, idx) => (
          <PlaceRow key={p.placeSlug} place={p} reversed={idx % 2 === 1} altBg={idx % 2 === 1} />
        ))}
      </div>
    </section>
  );
}
