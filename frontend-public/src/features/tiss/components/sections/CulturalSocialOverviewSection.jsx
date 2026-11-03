import { useState } from "react";
import Button from "../common/Button.jsx";

export default function CulturalSocialOverviewSection({ city }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="text-slate-900">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">
          Cultural & Social Overview
        </h3>

        <Button
          size="sm"
          variant="secondary"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Show Less" : "More Info"}
        </Button>
      </div>

      <div className="space-y-10 text-sm sm:text-base leading-relaxed text-slate-700">

        {/* SECTION 1 */}
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-7 space-y-4">
            <p>
              {city} carries a deep cultural identity shaped by its landscape,
              history, and the people who call it home. Traditions are rooted in
              community connection and shared values passed down through generations.
            </p>

            <p>
              Cultural expression in {city} is reflected in language,
              attire, hospitality, and daily rituals that strengthen unity
              among families and neighbors.
            </p>

            <div className="text-xs text-slate-500">
              Cultural Identity
            </div>
          </div>

          <div className="col-span-5">
            <img
              src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop"
              alt="People and cultural identity"
              className="w-full h-64 object-cover rounded-xl border border-slate-200"
            />
          </div>
        </div>

        {/* EXPANDABLE CONTENT */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden ${
            expanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-10">

            {/* SECTION 2 */}
            <div className="grid grid-cols-12 gap-8 items-center">
              <div className="col-span-5">
                <img
                  src="https://images.unsplash.com/photo-1604908176997-431c9c1f9b63?q=80&w=1200&auto=format&fit=crop"
                  alt="Traditional cultural dish"
                  className="w-full h-64 object-cover rounded-xl border border-slate-200"
                />
              </div>

              <div className="col-span-7 space-y-4">
                <p>
                  The cuisine of {city} reflects the richness of local produce
                  and traditional cooking techniques. Meals are often prepared
                  using time-honored methods that enhance both flavor and
                  nutritional value.
                </p>

                <p>
                  Food is more than nourishment in {city}; it represents shared
                  experiences and cultural pride. Families gather to prepare and
                  enjoy dishes that symbolize unity and heritage.
                </p>

                <div className="text-xs text-slate-500">
                  Famous Cuisine
                </div>
              </div>
            </div>

            {/* SECTION 3 */}
            <div className="grid grid-cols-12 gap-8 items-center">
              <div className="col-span-7 space-y-4">
                <p>
                  Social life in {city} revolves around community interaction
                  and shared public spaces. Markets, gathering areas, and daily
                  exchanges create an atmosphere of belonging and cooperation.
                </p>

                <p>
                  The people of {city} are known for their warmth and resilience.
                  Cultural practices remain alive not only through tradition but
                  through everyday behavior, language, and respect for heritage.
                </p>

                <div className="text-xs text-slate-500">
                  Social Life
                </div>
              </div>

              <div className="col-span-5">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
                  alt="Community and social life"
                  className="w-full h-64 object-cover rounded-xl border border-slate-200"
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}