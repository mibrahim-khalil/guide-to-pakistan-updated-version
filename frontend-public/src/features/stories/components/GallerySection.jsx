import { useEffect, useState } from "react";

export default function GallerySection({ content }) {
  const [activeIndex, setActiveIndex] = useState(null);

  if (!content) {
    return null;
  }

  const {
    eyebrow,
    title,
    description,
    ctaLabel,
    images = [],
  } = content;

  const isLightboxOpen = activeIndex !== null;

  const activeImage =
    isLightboxOpen && images[activeIndex]
      ? images[activeIndex]
      : null;

  /* =========================================================
     LIGHTBOX CONTROLS
  ========================================================= */

  const openLightbox = (index) => {
    setActiveIndex(index);
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  const showPrevious = () => {
    setActiveIndex((current) => {
      if (current === null) {
        return 0;
      }

      return current === 0
        ? images.length - 1
        : current - 1;
    });
  };

  const showNext = () => {
    setActiveIndex((current) => {
      if (current === null) {
        return 0;
      }

      return current === images.length - 1
        ? 0
        : current + 1;
    });
  };

  /* =========================================================
     KEYBOARD SUPPORT
  ========================================================= */

  useEffect(() => {
    if (!isLightboxOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );

      document.body.style.overflow = "";
    };
  }, [isLightboxOpen, images.length]);

  return (
    <>
      <section className="storiesGallery">
        <div className="storiesGallery__container">
          {/* =================================================
              INTRO
          ================================================= */}

          <div className="storiesGallery__intro">
            <div>
              <span className="storiesGallery__eyebrow">
                {eyebrow}
              </span>

              <h2 className="storiesGallery__title">
                {title}
              </h2>

              <p className="storiesGallery__description">
                {description}
              </p>
            </div>

            <button
              type="button"
              className="storiesGallery__viewAll"
              onClick={() => {
                if (images.length > 0) {
                  openLightbox(0);
                }
              }}
            >
              <span>{ctaLabel}</span>

              <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* =================================================
              GALLERY GRID
          ================================================= */}

          <div className="storiesGallery__grid">
            {images.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={[
                  "storiesGallery__item",
                  `storiesGallery__item--${index + 1}`,
                ].join(" ")}
                onClick={() => openLightbox(index)}
                aria-label={`View ${item.title}`}
              >
                <img
                  src={item.image}
                  alt={item.imageAlt || item.title}
                  className="storiesGallery__image"
                />

                <div
                  className="storiesGallery__overlay"
                  aria-hidden="true"
                />

                <div className="storiesGallery__itemContent">
                  <div>
                    <span className="storiesGallery__location">
                      {item.location}
                    </span>

                    <strong>
                      {item.title}
                    </strong>
                  </div>

                  <span
                    className="storiesGallery__expand"
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FULLSCREEN LIGHTBOX
      ===================================================== */}

      {isLightboxOpen && activeImage ? (
        <div
          className="galleryLightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery viewer"
        >
          <div
            className="galleryLightbox__backdrop"
            onClick={closeLightbox}
            aria-hidden="true"
          />

          <div className="galleryLightbox__shell">
            {/* CLOSE */}

            <button
              type="button"
              className="galleryLightbox__close"
              onClick={closeLightbox}
              aria-label="Close gallery"
            >
              ×
            </button>

            {/* COUNTER */}

            <div className="galleryLightbox__counter">
              <span>
                {String(activeIndex + 1).padStart(
                  2,
                  "0"
                )}
              </span>

              <span>/</span>

              <span>
                {String(images.length).padStart(
                  2,
                  "0"
                )}
              </span>
            </div>

            {/* IMAGE */}

            <div className="galleryLightbox__media">
              <img
                src={activeImage.image}
                alt={
                  activeImage.imageAlt ||
                  activeImage.title
                }
              />
            </div>

            {/* PREVIOUS */}

            {images.length > 1 ? (
              <button
                type="button"
                className="galleryLightbox__nav galleryLightbox__nav--previous"
                onClick={showPrevious}
                aria-label="Previous image"
              >
                ←
              </button>
            ) : null}

            {/* NEXT */}

            {images.length > 1 ? (
              <button
                type="button"
                className="galleryLightbox__nav galleryLightbox__nav--next"
                onClick={showNext}
                aria-label="Next image"
              >
                →
              </button>
            ) : null}

            {/* CAPTION */}

            <div className="galleryLightbox__caption">
              <span>
                {activeImage.location}
              </span>

              <h3>
                {activeImage.title}
              </h3>

              <div className="galleryLightbox__keyboardHint">
                <span>←</span>
                <span>Navigate</span>
                <span>→</span>
                <span>•</span>
                <span>ESC to close</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}