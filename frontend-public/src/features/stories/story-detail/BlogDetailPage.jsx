import { NavLink, useParams } from "react-router-dom";

import "./blogDetailPage.css";

import { blogSectionData } from "../data/storiesData";

export default function BlogDetailPage() {
  const { blogSlug } = useParams();

  /* =========================================================
     FIND CURRENT BLOG
  ========================================================= */

  const blog = blogSectionData?.blogs?.find(
    (item) => item.slug === blogSlug
  );

  /* =========================================================
     BLOG NOT FOUND
  ========================================================= */

  if (!blog) {
    return (
      <main className="blogDetailPage">
        <section className="blogDetailNotFound">
          <div className="blogDetailNotFound__inner">
            <span className="blogDetailNotFound__eyebrow">
              Story Not Found
            </span>

            <h1>We couldn't find this story.</h1>

            <p>
              The article may have been moved or the link may no
              longer be available.
            </p>

            <NavLink
              to="/stories"
              className="blogDetailNotFound__button"
            >
              <span aria-hidden="true">←</span>
              <span>Back to Stories</span>
            </NavLink>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="blogDetailPage">
      {/* =====================================================
          ARTICLE HERO
      ===================================================== */}

      <section className="blogDetailHero">
        {/* BACKGROUND IMAGE */}

        {blog.image ? (
          <img
            src={blog.image}
            alt={blog.imageAlt || blog.title}
            className="blogDetailHero__background"
          />
        ) : (
          <div className="blogDetailHero__fallback" />
        )}

        {/* IMAGE OVERLAYS */}

        <div
          className="blogDetailHero__shade"
          aria-hidden="true"
        />

        <div
          className="blogDetailHero__bottomFade"
          aria-hidden="true"
        />

        {/* HERO CONTENT */}

        <div className="blogDetailHero__inner">
          <NavLink
            to="/stories"
            className="blogDetailHero__back"
          >
            <span aria-hidden="true">←</span>
            <span>Stories &amp; Media</span>
          </NavLink>

          <div className="blogDetailHero__copy">
            <div className="blogDetailHero__meta">
              <span className="blogDetailHero__category">
                {blog.category}
              </span>

              <span className="blogDetailHero__metaDot">
                •
              </span>

              <span>{blog.readTime}</span>
            </div>

            <h1>{blog.title}</h1>

            <p className="blogDetailHero__excerpt">
              {blog.excerpt}
            </p>

            <div className="blogDetailHero__byline">
              <span>{blog.date}</span>

              <span aria-hidden="true">•</span>

              <span>By {blog.author}</span>
            </div>
          </div>

          <div
            className="blogDetailHero__scrollHint"
            aria-hidden="true"
          >
            <span>Read Story</span>
            <span className="blogDetailHero__scrollLine" />
            <span>↓</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          ARTICLE BODY
      ===================================================== */}

      <article className="blogArticle">
        <div className="blogArticle__inner">
          {blog.content ? (
            <>
              {/* INTRO */}

              {blog.content.intro ? (
                <div className="blogArticle__intro">
                  <span className="blogArticle__introMark">
                    Journal
                  </span>

                  <p>{blog.content.intro}</p>
                </div>
              ) : null}

              {/* ARTICLE DIVIDER */}

              <div
                className="blogArticle__divider"
                aria-hidden="true"
              >
                <span />
                <span>GTP</span>
                <span />
              </div>

              {/* CONTENT SECTIONS */}

              <div className="blogArticle__content">
                {blog.content.sections?.map(
                  (section, sectionIndex) => (
                    <section
                      key={`${section.heading}-${sectionIndex}`}
                      className="blogArticle__section"
                    >
                      <span className="blogArticle__sectionNumber">
                        {String(sectionIndex + 1).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      <h2>{section.heading}</h2>

                      <div className="blogArticle__paragraphs">
                        {section.paragraphs?.map(
                          (paragraph, paragraphIndex) => (
                            <p
                              key={`${section.heading}-${paragraphIndex}`}
                            >
                              {paragraph}
                            </p>
                          )
                        )}
                      </div>
                    </section>
                  )
                )}
              </div>

              {/* CLOSING */}

              {blog.content.closing ? (
                <aside className="blogArticle__closing">
                  <span className="blogArticle__closingLabel">
                    The Journey Continues
                  </span>

                  <p>{blog.content.closing}</p>
                </aside>
              ) : null}

              {/* ARTICLE FOOTER */}

              <footer className="blogArticle__footer">
                <div className="blogArticle__footerMeta">
                  <span>Written by</span>
                  <strong>{blog.author}</strong>
                </div>

                <NavLink
                  to="/stories"
                  className="blogArticle__backToStories"
                >
                  <span>Explore More Stories</span>
                  <span aria-hidden="true">→</span>
                </NavLink>
              </footer>
            </>
          ) : (
            /* =================================================
               CONTENT NOT ADDED YET
            ================================================= */

            <div className="blogArticle__comingSoon">
              <span className="blogArticle__comingSoonEyebrow">
                Guide to Pakistan Journal
              </span>

              <h2>This story is coming soon.</h2>

              <p>
                This article is connected to our Stories
                system, but its full editorial content has
                not been published yet.
              </p>

              <NavLink
                to="/stories"
                className="blogArticle__comingSoonButton"
              >
                <span>Explore Other Stories</span>
                <span aria-hidden="true">→</span>
              </NavLink>
            </div>
          )}
        </div>
      </article>
    </main>
  );
}