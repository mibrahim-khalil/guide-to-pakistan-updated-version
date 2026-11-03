import { Link } from "react-router-dom";
import {
  Route,
  CloudSun,
  TriangleAlert,
  MapPinned,
  ArrowUpRight,
  Radio,
} from "lucide-react";

import "../styles/tissIntelligence.css";

const intelligenceItems = [
  {
    icon: Route,
    label: "ROUTE INTELLIGENCE",
    title: "Route Conditions",
    description:
      "Check road access, closures, delays and current travel conditions.",
    link: "/tiss/routes",
    action: "Check Routes",
  },
  {
    icon: CloudSun,
    label: "TRAVEL CONDITIONS",
    title: "Weather",
    description:
      "Understand weather conditions before heading towards your destination.",
    link: "/tiss",
    action: "Check Weather",
  },
  {
    icon: TriangleAlert,
    label: "TRAVEL GUIDANCE",
    title: "Advisories",
    description:
      "Review important travel alerts, cautions and destination guidance.",
    link: "/tiss/advisories",
    action: "View Advisories",
  },
  {
    icon: MapPinned,
    label: "DESTINATION INTELLIGENCE",
    title: "Destination Status",
    description:
      "Check destination conditions and important information before visiting.",
    link: "/tiss/destinations",
    action: "Check Destination",
  },
];

export default function TissIntelligenceSection() {
  return (
    <section className="homeTiss">
      <div className="container">
        <div className="homeTiss__panel">
          <div className="homeTiss__glow homeTiss__glow--one" />
          <div className="homeTiss__glow homeTiss__glow--two" />

          <div className="homeTiss__header">
            <div className="homeTiss__intro">
              <div className="homeTiss__eyebrow">
                <Radio size={13} strokeWidth={2.4} />
                <span>TISS • TRAVEL INTELLIGENCE</span>
              </div>

              <h2 className="homeTiss__title">
                Know Before
                <br />
                <span>You Go.</span>
              </h2>

              <p className="homeTiss__description">
                Travel Pakistan with greater confidence. Check routes, weather,
                advisories and destination conditions before starting your
                journey.
              </p>
            </div>

            <Link to="/tiss" className="homeTiss__mainCta">
              <span>Open Travel Intelligence</span>

              <span className="homeTiss__mainCtaIcon">
                <ArrowUpRight size={18} strokeWidth={2} />
              </span>
            </Link>
          </div>

          <div className="homeTiss__grid">
            {intelligenceItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  to={item.link}
                  className="homeTissCard"
                  key={item.title}
                >
                  <div className="homeTissCard__top">
                    <div className="homeTissCard__icon">
                      <Icon size={21} strokeWidth={1.8} />
                    </div>

                    <ArrowUpRight
                      className="homeTissCard__arrow"
                      size={19}
                      strokeWidth={1.8}
                    />
                  </div>

                  <span className="homeTissCard__label">{item.label}</span>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <div className="homeTissCard__action">
                    {item.action}
                    <span>→</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="homeTiss__footer">
            <div className="homeTiss__live">
              <span className="homeTiss__liveDot" />
              Travel intelligence for journeys across Pakistan
            </div>

            <span className="homeTiss__powered">POWERED BY TISS</span>
          </div>
        </div>
      </div>
    </section>
  );
}