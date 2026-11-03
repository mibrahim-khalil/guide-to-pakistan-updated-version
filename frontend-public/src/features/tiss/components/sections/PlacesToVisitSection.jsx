import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../common/Button.jsx";

export default function PlacesToVisitSection({
  city = "Naran",
  page,
  setPage,
}) {
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState("next");

  const places = [
    {
      id: 1,
      name: "Saif-ul-Malook Lake",
      image:
        "https://images.unsplash.com/photo-1605540436563-5bca919ae766?q=80&w=1600&auto=format&fit=crop",
      description:
        "A world-famous alpine lake surrounded by snow-capped peaks.",
    },
    {
      id: 2,
      name: "Lalazar Plateau",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600&auto=format&fit=crop",
      description:
        "A breathtaking green plateau offering panoramic views.",
    },
    {
      id: 3,
      name: "Babusar Top",
      image:
        "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=1600&auto=format&fit=crop",
      description:
        "A scenic mountain pass with dramatic high-altitude views.",
    },
    {
      id: 4,
      name: "Ansoo Lake",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
      description:
        "A unique tear-shaped alpine lake accessible via trekking.",
    },
    {
      id: 5,
      name: "Lake Dudipatsar",
      image:
        "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1600&auto=format&fit=crop",
      description:
        "Known as the Queen of Lakes with lush surroundings.",
    },
    {
      id: 6,
      name: "Shogran",
      image:
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600&auto=format&fit=crop",
      description:
        "A peaceful hill station with serene valley views.",
    },
    {
      id: 7,
      name: "Siri Paye Meadows",
      image:
        "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=1600&auto=format&fit=crop",
      description:
        "Rolling green meadows with Himalayan views.",
    },
    {
      id: 8,
      name: "Batakundi",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
      description:
        "A scenic riverside village ideal for camping.",
    },
    {
      id: 9,
      name: "Malika Parbat Base",
      image:
        "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1600&auto=format&fit=crop",
      description:
        "Base region of the highest peak in Kaghan Valley.",
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

  const displayedPlaces = places.slice(page * 3, page * 3 + 3);

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Places to visit in {city}
        </h2>
      </div>

      <div className="relative">
        {page > 0 && (
          <button
            onClick={() => changePage(page - 1, "prev")}
            aria-label="Show previous places"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 rounded-full p-3 shadow-sm"
          >
            <ChevronLeft className="text-slate-900" size={20} />
          </button>
        )}

        {page < totalPages - 1 && (
          <button
            onClick={() => changePage(page + 1, "next")}
            aria-label="Show next places"
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
          {displayedPlaces.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md"
            >
              <img
                src={place.image}
                alt={place.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="font-semibold text-lg mb-2 text-slate-900">
                  {place.name}
                </h3>

                <p className="text-sm text-slate-600 mb-4">
                  {place.description}
                </p>

                <Button size="sm">More info</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}