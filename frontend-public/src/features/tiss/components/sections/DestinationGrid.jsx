import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import DestinationCard from "../cards/DestinationCard.jsx";
import EmptyState from "../common/EmptyState.jsx";
import Button from "../common/Button.jsx";
import { getRiskUi } from "../../lib/statusLogic.js";

/* Theme */
const BRAND_GREEN_DEEPEST = "#01411C";
const BRAND_GREEN_DARK = "#12BD64";

function RiskLegend() {
  return (
    <>
      <span className="text-slate-700">Destinations sorted by risk (</span>
      <span className="mx-1 font-semibold text-red-600">Not Safe</span>
      <span className="text-slate-700">→</span>
      <span className="mx-1 font-semibold text-rose-600">High Risk</span>
      <span className="text-slate-700">→</span>
      <span className="mx-1 font-semibold text-amber-600">Moderate Risk</span>
      <span className="text-slate-700">→</span>
      <span className="mx-1 font-semibold text-emerald-600">Low Risk</span>
      <span className="text-slate-700">→</span>
      <span className="mx-1 font-semibold text-slate-600">Unknown</span>
      <span className="text-slate-700">)</span>
    </>
  );
}

function ArrowButton({ side = "left", disabled, onClick }) {
  /* Responsive positioning:
     - Mobile: sits just inside the edge (safe from getting cut off)
     - Tablet & up: floats noticeably OUTSIDE the container edge */
  const pos = side === "left" ? "left-2 sm:-left-6" : "right-2 sm:-right-6";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "left" ? "Scroll left" : "Scroll right"}
      className={[
        "absolute",
        pos,
        "top-1/2 -translate-y-1/2",
        "z-10",
        "h-11 w-11 sm:h-12 sm:w-12",
        "rounded-full",
        "border border-slate-200",
        "bg-white",
        "text-slate-700",
        "shadow-md",
        "transition-all",
        disabled
          ? "opacity-30 cursor-not-allowed"
          : "opacity-95 hover:opacity-100 hover:bg-slate-50 hover:border-emerald-300 active:scale-95",
        "flex items-center justify-center",
      ].join(" ")}
    >
      <span className="text-xl leading-none">
        {side === "left" ? "‹" : "›"}
      </span>
    </button>
  );
}

const riskFilters = [
  "All",
  "Not Safe",
  "High Risk",
  "Moderate Risk",
  "Low Risk",
  "Unknown",
];

export default function DestinationGrid({ destinations }) {
  const scrollerRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [selectedRisk, setSelectedRisk] = useState("All");

  const items = useMemo(() => {
    if (!destinations?.length) return [];
    return destinations;
  }, [destinations]);

  const filteredItems = useMemo(() => {
    if (selectedRisk === "All") return items;

    return items.filter((d) => {
      const risk = getRiskUi(d.status);
      return risk.label === selectedRisk;
    });
  }, [items, selectedRisk]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanLeft(el.scrollLeft > 2);
      setCanRight(el.scrollLeft < max - 2);
    };

    update();

    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [filteredItems.length]);

  const scrollByAmount = useCallback((dir) => {
    const el = scrollerRef.current;
    if (!el) return;

    const amount = Math.max(320, Math.floor(el.clientWidth * 0.92));
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  if (!items.length) {
    return (
      <EmptyState
        title="Travel intelligence is being updated."
        description="Please check back soon."
      />
    );
  }

  return (
    <section aria-label="Destinations" className="w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="text-left">
          <h2
            className="text-xl sm:text-2xl font-extrabold"
            style={{ color: BRAND_GREEN_DEEPEST }}
          >
            Destinations
          </h2>

          <div className="mt-2">
            <div
              className="
                inline-flex items-center justify-center
                whitespace-nowrap
                rounded-full
                px-4 py-2
                bg-white border border-slate-200
                text-[clamp(11px,1.15vw,14px)]
                shadow-sm
              "
            >
              <RiskLegend />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:justify-end">
          {items.length > 3 ? (
            <span className="hidden sm:inline text-xs text-slate-500">
              +{items.length - 3} more
            </span>
          ) : null}

          <Button to="/tiss/destinations" variant="outline" size="md">
            View all
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap gap-2">
        {riskFilters.map((filter) => {
          const isActive = selectedRisk === filter;
          return (
            <button
              key={filter}
              onClick={() => setSelectedRisk(filter)}
              className="rounded-full px-4 py-2 text-sm font-semibold transition border"
              style={
                isActive
                  ? {
                      backgroundColor: BRAND_GREEN_DARK,
                      color: "#FFFFFF",
                      borderColor: BRAND_GREEN_DARK,
                    }
                  : {
                      backgroundColor: "#FFFFFF",
                      color: "#334155",
                      borderColor: "#E2E8F0",
                    }
              }
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "#A7F3D0";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.borderColor = "#E2E8F0";
                }
              }}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Carousel — with arrows pushed OUT to the sides on tablet+ */}
      <div className="relative mt-6 overflow-visible">
        <ArrowButton
          side="left"
          disabled={!canLeft}
          onClick={() => scrollByAmount(-1)}
        />
        <ArrowButton
          side="right"
          disabled={!canRight}
          onClick={() => scrollByAmount(1)}
        />

        <div
          ref={scrollerRef}
          className="no-scrollbar overflow-x-auto overflow-y-visible scroll-smooth snap-x snap-mandatory flex items-stretch gap-4 pt-2 pb-5 px-1 sm:px-2"
        >
          {filteredItems.length === 0 ? (
            <div className="w-full text-center py-10 text-slate-500 italic">
              No destinations available in this risk category.
            </div>
          ) : (
            filteredItems.map((d) => (
              <div
                key={d.id}
                className="snap-start shrink-0 basis-[85%] sm:basis-[48%] lg:basis-[32%] py-1"
              >
                <DestinationCard destination={d} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
