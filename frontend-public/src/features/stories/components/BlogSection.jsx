import { NavLink } from "react-router-dom";

export default function BlogSection({ content }) {
  if (!content) {
    return null;
  }

  const {
    eyebrow,
    title,
    description,
    ctaLabel,
    ctaPath,
    blogs = [],
  } = content;

  const featuredBlog = blogs.find((blog) => blog.featured) || blogs[0];

  const supportingBlogs = blogs.filter((blog) => blog.id !== featuredBlog?.id);

  return (
    <section id="stories-first-section" className="storiesBlog">
      <div className="storiesBlog__container">
        <div className="storiesBlog__intro">
          <div className="storiesBlog__introCopy">
            <span className="storiesBlog__eyebrow">{eyebrow}</span>

            <h2 className="storiesBlog__title">{title}</h2>

            <p className="storiesBlog__description">{description}</p>
          </div>

          <NavLink to={ctaPath} className="storiesBlog__viewAll">
            <span>{ctaLabel}</span>
            <span aria-hidden="true">→</span>
          </NavLink>
        </div>

        <div className="storiesBlog__layout">
          {/* FEATURED BLOG */}
          {featuredBlog ? (
            <NavLink
              to={`/stories/blog/${featuredBlog.slug}`}
              className="storiesBlog__featuredCard"
              aria-label={`Read ${featuredBlog.title}`}
            >
              <div className="storiesBlog__featuredMedia">
                {featuredBlog.image ? (
                  <img
                    src={featuredBlog.image}
                    alt={featuredBlog.imageAlt || ""}
                    className="storiesBlog__image"
                  />
                ) : (
                  <div className="storiesBlog__imagePlaceholder">
                    <span>Blog Image</span>
                  </div>
                )}

                <div className="storiesBlog__imageOverlay" aria-hidden="true" />

                <span className="storiesBlog__featuredBadge">Featured</span>

                <div className="storiesBlog__featuredContent">
                  <div className="storiesBlog__meta storiesBlog__meta--light">
                    <span>{featuredBlog.category}</span>
                    <span aria-hidden="true">•</span>
                    <span>{featuredBlog.readTime}</span>
                  </div>

                  <h3>{featuredBlog.title}</h3>

                  <p>{featuredBlog.excerpt}</p>

                  <div className="storiesBlog__featuredFooter">
                    <div>
                      <span>{featuredBlog.date}</span>
                      <span aria-hidden="true">•</span>
                      <span>{featuredBlog.author}</span>
                    </div>

                    <span className="storiesBlog__readArrow" aria-hidden="true">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          ) : null}

          {/* SUPPORTING BLOGS */}
          <div className="storiesBlog__supporting">
            {supportingBlogs.map((blog) => (
              <NavLink
                key={blog.id}
                to={`/stories/blog/${blog.slug}`}
                className="storiesBlog__card"
                aria-label={`Read ${blog.title}`}
              >
                <div className="storiesBlog__media">
                  {blog.image ? (
                    <img
                      src={blog.image}
                      alt={blog.imageAlt || ""}
                      className="storiesBlog__image"
                    />
                  ) : (
                    <div className="storiesBlog__imagePlaceholder">
                      <span>Blog Image</span>
                    </div>
                  )}

                  <span className="storiesBlog__category">{blog.category}</span>
                </div>

                <div className="storiesBlog__content">
                  <div className="storiesBlog__meta">
                    <span>{blog.date}</span>
                    <span aria-hidden="true">•</span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h3>{blog.title}</h3>

                  <p>{blog.excerpt}</p>

                  <div className="storiesBlog__footer">
                    <span>By {blog.author}</span>

                    <span className="storiesBlog__readStory">
                      Read Blog
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
