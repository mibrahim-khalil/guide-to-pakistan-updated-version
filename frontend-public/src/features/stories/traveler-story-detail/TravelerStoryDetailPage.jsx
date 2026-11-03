import { NavLink, useParams } from "react-router-dom";

import "./travelerStoryDetailPage.css";

import { travelerStoriesData } from "../data/storiesData";

export default function TravelerStoryDetailPage() {
  const { travelerStorySlug } = useParams();

  const story = travelerStoriesData?.stories?.find(
    (item) => item.slug === travelerStorySlug
  );

  if (!story) {
    return (
      <main className="travelerStoryDetailPage">
        <section className="travelerStoryNotFound">
          <div className="travelerStoryNotFound__inner">
            <span>Traveler Story Not Found</span>

            <h1>We couldn't find this journey.</h1>

            <p>
              This traveler story may have been moved or the link is no longer
              available.
            </p>

            <NavLink
              to="/stories"
              className="travelerStoryNotFound__button"
            >
              <span aria-hidden="true">←</span>
              <span>Back to Stories</span>
            </NavLink>
          </div>
        </section>
      </main>
    );
  }

  const details = story.journeyDetails;

  return (
    <main className="travelerStoryDetailPage">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="travelerStoryHero">
        <img
          src={story.image}
          alt={story.imageAlt || story.name}
          className="travelerStoryHero__background"
        />

        <div
          className="travelerStoryHero__shade"
          aria-hidden="true"
        />

        <div
          className="travelerStoryHero__bottomFade"
          aria-hidden="true"
        />

        <div className="travelerStoryHero__inner">
          <NavLink
            to="/stories"
            className="travelerStoryHero__back"
          >
            <span aria-hidden="true">←</span>
            <span>Traveler Journals</span>
          </NavLink>

          <div className="travelerStoryHero__content">
            <span className="travelerStoryHero__eyebrow">
              Traveler Journal
            </span>

            <h1>
              {story.name}'s Journey Through Pakistan
            </h1>

            <blockquote>
              “{story.quote}”
            </blockquote>

            <div className="travelerStoryHero__meta">
              <span>{story.country}</span>
              <span aria-hidden="true">•</span>
              <span>{story.tripDuration}</span>
              <span aria-hidden="true">•</span>
              <span>{story.route}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          JOURNEY OVERVIEW
      ===================================================== */}

      <section className="travelerJourney">
        <div className="travelerJourney__inner">
          <div className="travelerJourney__intro">
            <span className="travelerJourney__eyebrow">
              Journey Overview
            </span>

            <h2>
              A journey shaped by places, people, and experiences.
            </h2>

            <p>
              {details?.overview ||
                "A detailed traveler journey through Pakistan, shaped by destinations, culture, food, activities, and meaningful encounters."}
            </p>
          </div>

          <div className="travelerJourney__overviewGrid">
            <div>
              <span>Traveler</span>
              <strong>{story.name}</strong>
            </div>

            <div>
              <span>Country</span>
              <strong>{story.country}</strong>
            </div>

            <div>
              <span>Trip Duration</span>
              <strong>{story.tripDuration}</strong>
            </div>

            <div>
              <span>Route</span>
              <strong>{story.route}</strong>
            </div>
          </div>

          <div className="travelerJourney__highlights">
            <span>Journey Highlights</span>

            <div>
              {story.highlights?.map((highlight) => (
                <span key={highlight}>
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          {/* =================================================
              PLACES VISITED
          ================================================= */}

          {details?.placesVisited?.length ? (
            <section className="travelerDetailSection">
              <div className="travelerDetailSection__head">
                <span>01</span>

                <div>
                  <small>Places Visited</small>

                  <h3>
                    From cities to mountain valleys
                  </h3>
                </div>
              </div>

              <div className="travelerPlacesGrid">
                {details.placesVisited.map((place) => (
                  <article
                    key={place.name}
                    className="travelerPlaceCard"
                  >
                    <span>{place.type}</span>

                    <h4>{place.name}</h4>

                    <p>{place.note}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {/* =================================================
              ACTIVITIES
          ================================================= */}

          {details?.activities?.length ? (
            <section className="travelerDetailSection">
              <div className="travelerDetailSection__head">
                <span>02</span>

                <div>
                  <small>Activities</small>

                  <h3>
                    What the journey included
                  </h3>
                </div>
              </div>

              <div className="travelerActivitiesGrid">
                {details.activities.map((activity) => (
                  <div
                    key={activity}
                    className="travelerActivityChip"
                  >
                    <span aria-hidden="true">✓</span>
                    <strong>{activity}</strong>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* =================================================
              FOOD + CULTURE
          ================================================= */}

          {(details?.foodExperiences?.length ||
            details?.culturalExperiences?.length) ? (
            <section className="travelerDetailSection">
              <div className="travelerDetailSection__head">
                <span>03</span>

                <div>
                  <small>Food & Culture</small>

                  <h3>
                    The experiences beyond the route
                  </h3>
                </div>
              </div>

              <div className="travelerExperienceColumns">
                {details?.foodExperiences?.length ? (
                  <div className="travelerExperienceColumn">
                    <span className="travelerExperienceColumn__label">
                      Food Experiences
                    </span>

                    {details.foodExperiences.map((item) => (
                      <article
                        key={item.title}
                        className="travelerExperienceCard"
                      >
                        <h4>{item.title}</h4>

                        <p>{item.description}</p>
                      </article>
                    ))}
                  </div>
                ) : null}

                {details?.culturalExperiences?.length ? (
                  <div className="travelerExperienceColumn">
                    <span className="travelerExperienceColumn__label">
                      Cultural Experiences
                    </span>

                    {details.culturalExperiences.map((item) => (
                      <article
                        key={item.title}
                        className="travelerExperienceCard"
                      >
                        <h4>{item.title}</h4>

                        <p>{item.description}</p>
                      </article>
                    ))}
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* =================================================
              EVENTS
          ================================================= */}

          {details?.eventsAttended?.length ? (
            <section className="travelerDetailSection">
              <div className="travelerDetailSection__head">
                <span>04</span>

                <div>
                  <small>Events & Encounters</small>

                  <h3>
                    Moments that made the trip personal
                  </h3>
                </div>
              </div>

              <div className="travelerEvents">
                {details.eventsAttended.map((event) => (
                  <article
                    key={`${event.title}-${event.location}`}
                    className="travelerEventCard"
                  >
                    <div>
                      <span>{event.location}</span>

                      <h4>{event.title}</h4>
                    </div>

                    <p>{event.description}</p>
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {/* =================================================
              STAYS + TRANSPORT
          ================================================= */}

          {(details?.stays?.length ||
            details?.transport?.length) ? (
            <section className="travelerDetailSection">
              <div className="travelerDetailSection__head">
                <span>05</span>

                <div>
                  <small>Travel Logistics</small>

                  <h3>
                    Where they stayed and how they moved
                  </h3>
                </div>
              </div>

              <div className="travelerLogistics">
                {details?.stays?.length ? (
                  <div className="travelerLogistics__panel">
                    <span>Stays</span>

                    <div>
                      {details.stays.map((stay) => (
                        <div
                          key={`${stay.location}-${stay.type}`}
                        >
                          <strong>{stay.location}</strong>
                          <small>{stay.type}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {details?.transport?.length ? (
                  <div className="travelerLogistics__panel">
                    <span>Transport</span>

                    <div>
                      {details.transport.map((item) => (
                        <div key={item}>
                          <strong>{item}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {/* =================================================
              FAVORITE MOMENT
          ================================================= */}

          {details?.favoriteMoment ? (
            <section className="travelerFavoriteMoment">
              <span>Favorite Moment</span>

              <h3>
                {details.favoriteMoment.title}
              </h3>

              <p>
                {details.favoriteMoment.description}
              </p>
            </section>
          ) : null}

          {/* =================================================
              ADVICE
          ================================================= */}

          {details?.travelerAdvice?.length ? (
            <section className="travelerDetailSection">
              <div className="travelerDetailSection__head">
                <span>06</span>

                <div>
                  <small>Traveler Advice</small>

                  <h3>
                    What they would tell future travelers
                  </h3>
                </div>
              </div>

              <div className="travelerAdviceList">
                {details.travelerAdvice.map((advice, index) => (
                  <div key={advice}>
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p>{advice}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* =================================================
              FINAL REVIEW
          ================================================= */}

          {details?.finalReview ? (
            <section className="travelerFinalReview">
              <span>Final Reflection</span>

              <blockquote>
                “{details.finalReview}”
              </blockquote>

              <div>
                <strong>{story.name}</strong>
                <small>{story.country}</small>
              </div>
            </section>
          ) : (
            <div className="travelerJourney__comingSoon">
              <span>Detailed Traveler Review</span>

              <h3>
                Full journey details coming soon.
              </h3>

              <p>
                This traveler story is connected to the dynamic
                journey system, but its full experience data has
                not been added yet.
              </p>
            </div>
          )}

          {/* =================================================
              FOOTER
          ================================================= */}

          <div className="travelerJourney__footer">
            <NavLink
              to="/stories"
              className="travelerJourney__back"
            >
              <span>
                Explore More Traveler Stories
              </span>

              <span aria-hidden="true">→</span>
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
}