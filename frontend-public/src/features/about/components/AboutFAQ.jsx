import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function AboutFAQ({ content }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!content?.items?.length) {
    return null;
  }

  const toggleItem = (index) => {
    setActiveIndex((current) =>
      current === index ? -1 : index
    );
  };

  return (
    <section className="aboutFAQ">
      <div className="aboutFAQ__container">
        <div className="aboutFAQ__intro">
          <span>{content.eyebrow}</span>

          <h2>{content.title}</h2>

          <p>{content.description}</p>
        </div>

        <div className="aboutFAQ__list">
          {content.items.map((item, index) => {
            const isOpen = activeIndex === index;

            return (
              <article
                key={item.id}
                className={
                  isOpen
                    ? "aboutFAQItem aboutFAQItem--open"
                    : "aboutFAQItem"
                }
              >
                <button
                  type="button"
                  className="aboutFAQItem__question"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>

                  <span className="aboutFAQItem__icon">
                    {isOpen ? (
                      <Minus size={18} />
                    ) : (
                      <Plus size={18} />
                    )}
                  </span>
                </button>

                <div className="aboutFAQItem__answer">
                  <div>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}