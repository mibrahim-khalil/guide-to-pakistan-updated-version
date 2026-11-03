import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function BookYourJourneySection() {
  return (
    <section className="bookJourney">
      <div className="container">
        <div className="journeyCta">
          <div className="journeyCta__content">
            <span className="journeyCta__eyebrow">
              YOUR PAKISTAN JOURNEY STARTS HERE
            </span>

            <h2 className="journeyCta__title">
              Ready to Explore Pakistan?
            </h2>

            <p className="journeyCta__text">
              Tell us where you want to go, and we'll help turn your idea
              into a journey worth remembering.
            </p>
          </div>

          <Link to="/book-now" className="journeyCta__button">
            <span>Plan My Journey</span>

            <span className="journeyCta__buttonIcon">
              <ArrowUpRight size={20} strokeWidth={2} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}