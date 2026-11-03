export default function PartnersSection({ content }) {
  if (!content?.partners?.length) {
    return null;
  }

  return (
    <section className="aboutPartners">
      <div className="aboutPartners__container">
        <div className="aboutPartners__intro">
          <span>{content.eyebrow}</span>

          <h2>{content.title}</h2>

          <p>{content.description}</p>
        </div>

        <div className="aboutPartners__grid">
          {content.partners.map((partner) => (
            <div
              key={partner.id}
              className="aboutPartners__card"
            >
              <span>{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}