export default function TeamSection({ content }) {
  if (!content?.members?.length) {
    return null;
  }

  return (
    <section className="aboutTeam">
      <div className="aboutTeam__container">
        <div className="aboutTeam__intro">
          <span className="aboutTeam__eyebrow">
            {content.eyebrow}
          </span>

          <h2>{content.title}</h2>

          <p>{content.description}</p>
        </div>

        <div className="aboutTeam__grid">
          {content.members.map((member) => (
            <article
              key={member.id}
              className="aboutTeamCard"
            >
              <div className="aboutTeamCard__imageWrap">
                <img
                  src={member.image}
                  alt={member.imageAlt || member.name}
                />
              </div>

              <div className="aboutTeamCard__content">
                <h3>{member.name}</h3>

                <span className="aboutTeamCard__role">
                  {member.role}
                </span>

                <p>{member.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}