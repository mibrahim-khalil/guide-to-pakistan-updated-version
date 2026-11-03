import { useEffect, useState } from "react";

export default function VideosSection({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!content) {
    return null;
  }

  const {
    eyebrow,
    title,
    description,
    ctaLabel,
    videos = [],
  } = content;

  const featuredVideo =
    videos.find((video) => video.featured) || videos[0];

  const supportingVideos = videos.filter(
    (video) => video.id !== featuredVideo?.id
  );

  const isViewerOpen = activeIndex !== null;

  const activeVideo =
    isViewerOpen && videos[activeIndex]
      ? videos[activeIndex]
      : null;

  /* =========================================================
     FIND ORIGINAL INDEX
  ========================================================= */

  const getVideoIndex = (videoId) =>
    videos.findIndex((video) => video.id === videoId);

  /* =========================================================
     OPEN / CLOSE
  ========================================================= */

  const openViewer = (index) => {
    if (index < 0) {
      return;
    }

    setActiveIndex(index);
  };

  const closeViewer = () => {
    setActiveIndex(null);
  };

  /* =========================================================
     PREVIOUS / NEXT
  ========================================================= */

  const showPrevious = () => {
    setActiveIndex((current) => {
      if (current === null || videos.length === 0) {
        return 0;
      }

      return current === 0
        ? videos.length - 1
        : current - 1;
    });
  };

  const showNext = () => {
    setActiveIndex((current) => {
      if (current === null || videos.length === 0) {
        return 0;
      }

      return current === videos.length - 1
        ? 0
        : current + 1;
    });
  };

  /* =========================================================
     KEYBOARD + SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    if (!isViewerOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeViewer();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousOverflow;
    };
  }, [isViewerOpen, videos.length]);

  return (
    <>
      <section className="storiesVideos">
        <div className="storiesVideos__container">
          {/* =================================================
              INTRO
          ================================================= */}

          <div className="storiesVideos__intro">
            <div>
              <span className="storiesVideos__eyebrow">
                {eyebrow}
              </span>

              <h2 className="storiesVideos__title">
                {title}
              </h2>

              <p className="storiesVideos__description">
                {description}
              </p>
            </div>

            <button
              type="button"
              className="storiesVideos__viewAll"
              onClick={() => {
                if (videos.length > 0) {
                  openViewer(0);
                }
              }}
            >
              <span>{ctaLabel}</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* =================================================
              VIDEO LAYOUT
          ================================================= */}

          <div className="storiesVideos__layout">
            {/* FEATURED VIDEO */}

            {featuredVideo ? (
              <button
                type="button"
                className="storiesVideos__featuredCard"
                onClick={() =>
                  openViewer(
                    getVideoIndex(featuredVideo.id)
                  )
                }
                aria-label={`Play ${featuredVideo.title}`}
              >
                <img
                  src={featuredVideo.image}
                  alt={
                    featuredVideo.imageAlt ||
                    featuredVideo.title
                  }
                  className="storiesVideos__image"
                />

                <div
                  className="storiesVideos__overlay"
                  aria-hidden="true"
                />

                <span className="storiesVideos__duration">
                  {featuredVideo.duration}
                </span>

                <span
                  className="storiesVideos__play storiesVideos__play--large"
                  aria-hidden="true"
                >
                  ▶
                </span>

                <div className="storiesVideos__featuredContent">
                  <span className="storiesVideos__category">
                    {featuredVideo.category}
                  </span>

                  <h3>{featuredVideo.title}</h3>

                  <p>{featuredVideo.description}</p>

                  <div className="storiesVideos__meta">
                    <span>{featuredVideo.views}</span>
                    <span aria-hidden="true">•</span>
                    <span>
                      {featuredVideo.location}
                    </span>
                  </div>
                </div>
              </button>
            ) : null}

            {/* SUPPORTING VIDEOS */}

            <div className="storiesVideos__supporting">
              {supportingVideos.map((video) => (
                <button
                  key={video.id}
                  type="button"
                  className="storiesVideos__card"
                  onClick={() =>
                    openViewer(
                      getVideoIndex(video.id)
                    )
                  }
                  aria-label={`Play ${video.title}`}
                >
                  <div className="storiesVideos__media">
                    <img
                      src={video.image}
                      alt={
                        video.imageAlt ||
                        video.title
                      }
                      className="storiesVideos__image"
                    />

                    <div
                      className="storiesVideos__overlay"
                      aria-hidden="true"
                    />

                    <span className="storiesVideos__duration">
                      {video.duration}
                    </span>

                    <span
                      className="storiesVideos__play"
                      aria-hidden="true"
                    >
                      ▶
                    </span>
                  </div>

                  <div className="storiesVideos__content">
                    <span className="storiesVideos__category">
                      {video.category}
                    </span>

                    <h3>{video.title}</h3>

                    <p>{video.description}</p>

                    <div className="storiesVideos__meta">
                      <span>{video.views}</span>
                      <span aria-hidden="true">•</span>
                      <span>{video.location}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VIDEO VIEWER
      ===================================================== */}

      {isViewerOpen && activeVideo ? (
        <div
          className="videoViewer"
          role="dialog"
          aria-modal="true"
          aria-label="Video viewer"
        >
          <button
            type="button"
            className="videoViewer__backdrop"
            onClick={closeViewer}
            aria-label="Close video viewer"
          />

          <div className="videoViewer__shell">
            {/* CLOSE */}

            <button
              type="button"
              className="videoViewer__close"
              onClick={closeViewer}
              aria-label="Close video"
            >
              ×
            </button>

            {/* COUNTER */}

            <div className="videoViewer__counter">
              <span>
                {String(activeIndex + 1).padStart(
                  2,
                  "0"
                )}
              </span>

              <span>/</span>

              <span>
                {String(videos.length).padStart(
                  2,
                  "0"
                )}
              </span>
            </div>

            {/* VIDEO / PLACEHOLDER */}

            <div className="videoViewer__media">
              {activeVideo.videoSrc ? (
                <video
                  key={activeVideo.videoSrc}
                  src={activeVideo.videoSrc}
                  controls
                  autoPlay
                  playsInline
                  poster={activeVideo.image}
                >
                  Your browser does not support video.
                </video>
              ) : activeVideo.embedUrl ? (
                <iframe
                  src={activeVideo.embedUrl}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={activeVideo.image}
                    alt={
                      activeVideo.imageAlt ||
                      activeVideo.title
                    }
                  />

                  <div
                    className="videoViewer__mediaShade"
                    aria-hidden="true"
                  />

                  <div className="videoViewer__placeholder">
                    <span className="videoViewer__placeholderPlay">
                      ▶
                    </span>

                    <span>
                      Video source will be connected here
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* PREVIOUS */}

            {videos.length > 1 ? (
              <button
                type="button"
                className="videoViewer__nav videoViewer__nav--previous"
                onClick={showPrevious}
                aria-label="Previous video"
              >
                ←
              </button>
            ) : null}

            {/* NEXT */}

            {videos.length > 1 ? (
              <button
                type="button"
                className="videoViewer__nav videoViewer__nav--next"
                onClick={showNext}
                aria-label="Next video"
              >
                →
              </button>
            ) : null}

            {/* DETAILS */}

            <div className="videoViewer__details">
              <div className="videoViewer__detailsTop">
                <span className="videoViewer__category">
                  {activeVideo.category}
                </span>

                <span>{activeVideo.duration}</span>
              </div>

              <h3>{activeVideo.title}</h3>

              <p>{activeVideo.description}</p>

              <div className="videoViewer__meta">
                <span>{activeVideo.views}</span>
                <span aria-hidden="true">•</span>
                <span>{activeVideo.location}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}