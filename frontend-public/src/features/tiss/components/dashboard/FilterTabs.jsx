const TABS = [
  { key: "all", label: "All" },
  { key: "roads", label: "Roads" },
  { key: "weather", label: "Weather" },
  { key: "safety", label: "Safety" },
  { key: "transport", label: "Transport" }
];

export default function FilterTabs({ active, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {TABS.map((t) => {
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={[
              "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              isActive
                ? "bg-[#2563EB] text-white"
                : "bg-white border border-slate-200 text-slate-800 hover:bg-slate-50"
            ].join(" ")}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}