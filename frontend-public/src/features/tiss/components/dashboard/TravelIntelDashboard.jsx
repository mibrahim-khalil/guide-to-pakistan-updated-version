import { useState } from "react";
import { Search } from "lucide-react";

/* Dashboard Overview search */
export default function TravelIntelDashboard({ destinations = [], routes = [] }) {
  const [query, setQuery] = useState("");

  const handleCheck = () => {
    if (!query) return;

    const lowerQuery = query.toLowerCase();

    // If user types something like "Lahore to Islamabad", intercept it!
    if (lowerQuery.includes(" to ")) {
      const parts = query.split(/ to /i); // case insensitive split
      const origin = parts[0].trim();
      const destination = parts[1].trim();

      // 1. Fire the custom event that LiveRouteCheckSection is listening for
      window.dispatchEvent(
        new CustomEvent("g2p-route-check", {
          detail: { origin, destination },
        })
      );

      // 2. Scroll the user down smoothly to the Live Route panel
      document.getElementById("live-route-check")?.scrollIntoView({ behavior: "smooth", block: "start" });
      
      return;
    }

    // Default behavior if they just search a single destination (e.g., "Hunza")
    console.log("Normal destination search:", query);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCheck();
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            <Search size={18} />
          </div>

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search destination or route (e.g., Lahore to Islamabad)..."
            className="
              w-full h-12 rounded-full
              border border-surface-200
              bg-white
              pl-12 pr-4
              text-sm text-slate-800
              placeholder:text-slate-400
              outline-none
              focus:ring-2 focus:ring-emerald-300
              transition
            "
          />
        </div>

        <button
          type="button"
          onClick={handleCheck}
          className="
            h-12 shrink-0
            rounded-full
            px-8
            text-sm font-extrabold
            text-white
            transition
            shadow-soft
            hover:brightness-110
            bg-emerald-600
          "
        >
          Check
        </button>
      </div>
    </div>
  );
}