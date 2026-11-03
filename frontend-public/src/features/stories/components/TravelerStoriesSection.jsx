import { NavLink } from "react-router-dom";

export default function TravelerStoriesSection({ content }) {
  if (!content) {
    return null;
  }

  const {
    eyebrow,
    title,
    description,
    ctaLabel,
    ctaPath,
    stories = [],
  } = content;

  const featuredStory =
    stories.find((story) => story.featured) || stories[0];

  const supportingStories = stories.filter(
    (story) => story.id !== featuredStory?.id
  );

  return (
    <section className="travelerStories">
      <div className="travelerStories__container">
        {/* =================================================
            INTRO
        ================================================= */}

        <div className="travelerStories__intro">
          <div className="travelerStories__introCopy">
            <span className="travelerStories__eyebrow">
              {eyebrow}
            </span>

            <h2 className="travelerStories__title">
              {title}
            </h2>

            <p className="travelerStories__description">
              {description}
            </p>
          </div>

          <NavLink
            to={ctaPath}
            className="travelerStories__viewAll"
          >
            <span>{ctaLabel}</span>
            <span aria-hidden="true">→</span>
          </NavLink>
        </div>

        {/* =================================================
            FEATURED STORY
        ================================================= */}

        {featuredStory ? (
          <NavLink
            to={`/stories/travelers/${featuredStory.slug}`}
            className="travelerStories__featured"
            aria-label={`Read ${featuredStory.name}'s travel story`}
          >
            <div className="travelerStories__featuredMedia">
              <img
                src={featuredStory.image}
                alt={featuredStory.imageAlt || featuredStory.name}
              />

              <div
                className="travelerStories__featuredOverlay"
                aria-hidden="true"
              />
            </div>

            <div className="travelerStories__featuredContent">
              <div className="travelerStories__featuredTop">
                <span className="travelerStories__featuredBadge">
                  Featured Journey
                </span>

                <span className="travelerStories__tripDuration">
                  {featuredStory.tripDuration}
                </span>
              </div>

              <blockquote>
                “{featuredStory.quote}”
              </blockquote>

              <div className="travelerStories__traveler">
                <div>
                  <strong>{featuredStory.name}</strong>

                  <span>
                    {featuredStory.country}
                  </span>
                </div>
              </div>

              <div className="travelerStories__route">
                <span>Journey</span>

                <strong>
                  {featuredStory.route}
                </strong>
              </div>

              <div className="travelerStories__tags">
                {featuredStory.highlights?.map((highlight) => (
                  <span key={highlight}>
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="travelerStories__readFeatured">
                <span>Read Full Journey</span>
                <span aria-hidden="true">→</span>
              </div>
            </div>
          </NavLink>
        ) : null}

        {/* =================================================
            SUPPORTING STORIES
        ================================================= */}

        <div className="travelerStories__grid">
          {supportingStories.map((story) => (
            <NavLink
              key={story.id}
              to={`/stories/travelers/${story.slug}`}
              className="travelerStories__card"
              aria-label={`Read ${story.name}'s travel story`}
            >
              <div className="travelerStories__cardHead">
                <div className="travelerStories__avatar">
                  <img
                    src={story.avatar || story.image}
                    alt={story.name}
                  />
                </div>

                <div className="travelerStories__identity">
                  <strong>{story.name}</strong>
                  <span>{story.country}</span>
                </div>

                <span className="travelerStories__cardArrow">
                  ↗
                </span>
              </div>

              <blockquote>
                “{story.quote}”
              </blockquote>

              <div className="travelerStories__cardMeta">
                <div>
                  <span>Route</span>
                  <strong>{story.route}</strong>
                </div>

                <div>
                  <span>Trip</span>
                  <strong>{story.tripDuration}</strong>
                </div>
              </div>

              <div className="travelerStories__tags">
                {story.highlights?.slice(0, 3).map((highlight) => (
                  <span key={highlight}>
                    {highlight}
                  </span>
                ))}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  );
}