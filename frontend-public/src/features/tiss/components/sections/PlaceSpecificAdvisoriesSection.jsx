import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PlaceSpecificAdvisoriesSection({
  city,
  page,
  setPage,
}) {
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const places = [
    {
      id: 1,
      name: "Saif-ul-Malook Lake",
      advisory: {
        severity: "High",
        title: "Heavy Rain Warning",
        message:
          "Recent rainfall may cause slippery trails. Avoid late evening visits.",
      },
    },
    {
      id: 2,
      name: "Lalazar Plateau",
      advisory: {
        severity: "Medium",
        title: "Road Accessibility Alert",
        message: "Road conditions may vary. 4x4 vehicle recommended.",
      },
    },
    {
      id: 3,
      name: "Babusar Top",
      advisory: {
        severity: "High",
        title: "Snow Clearance Ongoing",
        message:
          "Temporary road closures due to snowfall at higher altitudes.",
      },
    },
    {
      id: 4,
      name: "Ansoo Lake",
      advisory: {
        severity: "Medium",
        title: "Trek Difficulty",
        message:
          "Trek requires moderate fitness level. Carry sufficient supplies.",
      },
    },
    {
      id: 5,
      name: "Lake Dudipatsar",
      advisory: {
        severity: "Low",
        title: "Weather Advisory",
        message:
          "Cool temperatures expected. Light jackets recommended.",
      },
    },
    {
      id: 6,
      name: "Shogran",
      advisory: {
        severity: "Low",
        title: "Weekend Crowds",
        message:
          "Expect moderate tourist activity on weekends.",
      },
    },
    {
      id: 7,
      name: "Siri Paye Meadows",
      advisory: {
        severity: "Medium",
        title: "Fog Warning",
        message: "Low visibility during early mornings.",
      },
    },
    {
      id: 8,
      name: "Batakundi",
      advisory: {
        severity: "Low",
        title: "Camping Advisory",
        message:
          "Ensure proper camping permits before overnight stay.",
      },
    },
    {
      id: 9,
      name: "Malika Parbat Base",
      advisory: {
        severity: "High",
        title: "High Altitude Risk",
        message:
          "Altitude sickness precautions advised.",
      },
    },
  ];

  const totalPages = Math.ceil(places.length / 3);

  const changePage = (newPage, dir) => {
    if (newPage < 0 || newPage >= totalPages) return;

    setDirection(dir);
    setAnimating(true);

    setTimeout(() => {
      setPage(newPage);
      setAnimating(false);
    }, 300);
  };

  const displayed = places.slice(page * 3, page * 3 + 3);

  const headings = [
    "Advisories for Most Visited Places",
    "Advisories for Scenic Attractions",
    "Advisories for Hidden Gems",
  ];

  const severityColor = (level) => {
    if (level === "High")
      return "bg-red-100 text-red-700";
    if (level === "Medium")
      return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <section aria-live="polite">
      <h2 className="text-2xl font-bold text-slate-900 mb-2">
        {headings[page]}
      </h2>

      <p className="text-sm text-slate-600 mb-6">
        Tip: Advisories are specific to the places currently displayed above.
      </p>

      <div className="relative">
        {page > 0 && (
          <button
            onClick={() => changePage(page - 1, "prev")}
            aria-label="Show previous advisories"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 rounded-full p-3 shadow-sm"
          >
            <ChevronLeft className="text-slate-900" size={20} />
          </button>
        )}

        {page < totalPages - 1 && (
          <button
            onClick={() => changePage(page + 1, "next")}
            aria-label="Show next advisories"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 rounded-full p-3 shadow-sm"
          >
            <ChevronRight className="text-slate-900" size={20} />
          </button>
        )}

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-500 ease-in-out ${
            animating
              ? direction === "next"
                ? "opacity-0 translate-x-6"
                : "opacity-0 -translate-x-6"
              : "opacity-100 translate-x-0"
          }`}
        >
          {displayed.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-2xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-base text-slate-900">
                  {place.name}
                </h3>

                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${severityColor(
                    place.advisory.severity
                  )}`}
                >
                  {place.advisory.severity}
                </span>
              </div>

              <h4 className="font-semibold text-sm mb-2 text-slate-900">
                {place.advisory.title}
              </h4>

              <p className="text-sm text-slate-600">
                {place.advisory.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}