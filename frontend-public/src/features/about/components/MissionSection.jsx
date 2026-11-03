export default function MissionSection({ content }) {
  if (!content) {
    return null;
  }

  return (
    <section className="aboutMission">
      <div className="aboutMission__container">
        <div className="aboutMission__panel">
          {/* ===============================================
              MISSION CONTENT
          =============================================== */}

          <div className="aboutMission__copy">
            <span className="aboutMission__eyebrow">
              {content.eyebrow}
            </span>

            <h2>
              {content.title}
            </h2>

            <p>
              {content.description}
            </p>
          </div>

          {/* ===============================================
              IMPACT STATS
          =============================================== */}

          {content.stats?.length ? (
            <div className="aboutMission__stats">
              {content.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="aboutMission__stat"
                >
                  <strong>
                    {stat.value}
                  </strong>

                  <span>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}