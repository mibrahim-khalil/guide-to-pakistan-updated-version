import { useEffect } from "react";
import {
  X,
  AlertTriangle,
  CalendarClock,
  Info,
  ShieldAlert,
  PhoneCall,
  Flame,
  Ambulance,
  CarFront,
  Route,
} from "lucide-react";
import { getSeverityPill } from "../../lib/advisoryUi.js";

/* Theme */
const BRAND_GREEN_LIGHT   = "#E8F5EE";
const BRAND_GREEN_DEEPEST = "#01411C";

const EMERGENCY_CONTACTS = [
  { key: "police",   label: "Police",                       number: "15",        icon: ShieldAlert },
  { key: "rescue",   label: "Rescue / Ambulance (1122)",    number: "1122",      icon: Ambulance },
  { key: "fire",     label: "Fire Brigade",                 number: "16",        icon: Flame },
  { key: "motorway", label: "Motorway Police",              number: "130",       icon: CarFront },
  { key: "nha",      label: "NHA Helpline",                 number: "111000101", icon: Route },
];

function formatDateTime(iso) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
}

function toTel(number) {
  return `tel:${String(number || "").replace(/[^\d+]/g, "")}`;
}

/* ============================================================
   CONTACTS SECTION — adaptive styling based on emergency flag
   ============================================================ */
function ContactsSection({ isEmergency }) {
  /* Adaptive theme */
  const theme = isEmergency
    ? {
        panelClass: "border-red-200 bg-red-50",
        titleColorClass: "text-red-900",
        iconColorClass: "text-red-700",
        contactCardClass: "border-red-100",
        contactIconBoxClass: "bg-red-50 border-red-100",
        contactIconColorClass: "text-red-700",
        noteColorClass: "text-red-900/80",
        sectionTitle: "Emergency Contacts (Pakistan)",
      }
    : {
        panelClass: "border-emerald-200",
        titleColorClass: "",
        iconColorClass: "text-slate-600",
        contactCardClass: "border-emerald-100",
        contactIconBoxClass: "bg-emerald-50 border-emerald-100",
        contactIconColorClass: "text-emerald-700",
        noteColorClass: "text-slate-500",
        sectionTitle: "Helpful Contacts (Pakistan)",
      };

  return (
    <div
      className={`rounded-xl border ${theme.panelClass} p-3 shadow-sm`}
      style={
        isEmergency
          ? undefined
          : { backgroundColor: "#FFFFFF" }
      }
    >
      <div className="flex items-center gap-2">
        <PhoneCall
          size={14}
          className={theme.iconColorClass}
          aria-hidden="true"
        />
        <div
          className={`text-[13px] font-bold ${theme.titleColorClass}`}
          style={!isEmergency ? { color: BRAND_GREEN_DEEPEST } : undefined}
        >
          {theme.sectionTitle}
        </div>
      </div>

      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {EMERGENCY_CONTACTS.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.key}
              className={`rounded-xl bg-white border ${theme.contactCardClass} px-2.5 py-2 flex items-center justify-between gap-2 shadow-sm`}
            >
              <div className="min-w-0 flex items-center gap-2">
                <span
                  className={`h-8 w-8 shrink-0 rounded-lg border flex items-center justify-center ${theme.contactIconBoxClass}`}
                >
                  <Icon
                    size={15}
                    className={theme.contactIconColorClass}
                    aria-hidden="true"
                  />
                </span>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-slate-800 truncate leading-tight">
                    {c.label}
                  </div>
                  <div className="text-[12px] text-slate-700 font-bold leading-tight">
                    {c.number}
                  </div>
                </div>
              </div>

              {/* ✅ CALL BUTTON — brand green gradient (matches site theme) */}
              <a
                href={toTel(c.number)}
                className="
                  shrink-0 inline-flex items-center justify-center
                  rounded-full
                  px-3 py-1
                  text-[11px] font-bold text-white
                  shadow-sm
                  transition-all duration-200
                  hover:brightness-110 hover:shadow-md hover:-translate-y-0.5
                "
                style={{
                  background:
                    "linear-gradient(135deg, #22C46B 0%, #12BD64 100%)",
                }}
              >
                Call
              </a>
            </div>
          );
        })}
      </div>

      <div className={`mt-2 text-[10px] ${theme.noteColorClass}`}>
        Note: Numbers may vary by city/region. If a number doesn't connect,
        use local emergency services.
      </div>
    </div>
  );
}

export default function AdvisoryModal({ advisory, onClose }) {
  /* Close on Escape key */
  useEffect(() => {
    if (!advisory) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [advisory, onClose]);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (!advisory) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [advisory]);

  if (!advisory) return null;

  const isEmergency = advisory?.advisory_type === "emergency";
  const severityPill = getSeverityPill(advisory?.severity);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="advisory-modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in-backdrop"
        aria-hidden="true"
      />

      {/* Modal container */}
      <div
        className="
          relative z-10
          w-full max-w-[1100px]
          max-h-[95vh]
          rounded-2xl sm:rounded-3xl
          bg-white
          border border-slate-200
          shadow-2xl
          overflow-hidden
          flex flex-col
          animate-modal-in
        "
      >
        {/* Sticky close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close advisory"
          className="
            absolute top-3 right-3 z-20
            inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center
            rounded-full
            bg-white border border-slate-200
            text-slate-700
            shadow-md
            transition-all duration-200
            hover:bg-slate-50 hover:border-emerald-300 hover:shadow-lg
          "
        >
          <X size={16} />
        </button>

        {/* Scrollable content — fallback for tiny viewports */}
        <div className="overflow-y-auto">
          {/* HEADER BLOCK */}
          <div
            className={
              isEmergency
                ? "px-4 sm:px-5 py-3 sm:py-4 bg-red-50 border-b border-red-100"
                : "px-4 sm:px-5 py-3 sm:py-4 border-b border-slate-200"
            }
            style={
              isEmergency
                ? undefined
                : { backgroundColor: BRAND_GREEN_LIGHT }
            }
          >
            <div className="flex items-start justify-between gap-3 pr-10">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {isEmergency ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-red-900 border border-red-200 shadow-sm">
                      <AlertTriangle size={11} aria-hidden="true" />
                      Emergency
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-slate-700 border border-slate-200 shadow-sm">
                      <ShieldAlert size={11} aria-hidden="true" />
                      Advisory
                    </span>
                  )}

                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold ${severityPill}`}
                  >
                    {String(advisory.severity || "").toUpperCase()}
                  </span>

                  <span className="text-[10px] sm:text-[11px] text-slate-600">
                    Type:{" "}
                    <span
                      className="font-semibold"
                      style={{ color: BRAND_GREEN_DEEPEST }}
                    >
                      {advisory.advisory_type || "—"}
                    </span>
                  </span>

                  <span className="text-[10px] sm:text-[11px] text-slate-600">
                    Region:{" "}
                    <span
                      className="font-semibold"
                      style={{ color: BRAND_GREEN_DEEPEST }}
                    >
                      {advisory.region || "—"}
                    </span>
                  </span>
                </div>

                <h1
                  id="advisory-modal-title"
                  className="mt-1.5 text-base sm:text-lg lg:text-xl font-extrabold tracking-tight leading-tight"
                  style={{ color: BRAND_GREEN_DEEPEST }}
                >
                  {advisory.title}
                </h1>
              </div>

              {isEmergency ? (
                <span className="hidden sm:inline-flex shrink-0 items-center rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-md">
                  Emergency
                </span>
              ) : null}
            </div>
          </div>

          {/* BODY */}
          <div className="p-3 sm:p-4">
            {/* ONE LIGHT-GREEN SUB-PARENT — holds all body content */}
            <div
              className="rounded-2xl border border-emerald-100 shadow-sm p-3 sm:p-4 space-y-3"
              style={{ backgroundColor: BRAND_GREEN_LIGHT }}
            >
              {/* Description */}
              <p className="text-[13px] sm:text-sm text-slate-700 leading-relaxed">
                {advisory.advisory_text || "—"}
              </p>

              {/* Recommended Action */}
              {advisory.recommended_action ? (
                <div className="rounded-xl bg-white border border-emerald-100 p-3 shadow-sm">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Recommended Action
                  </div>
                  <div
                    className="mt-1 text-[13px] sm:text-sm font-semibold"
                    style={{ color: BRAND_GREEN_DEEPEST }}
                  >
                    {advisory.recommended_action}
                  </div>
                </div>
              ) : null}

              {/* Contacts — ALWAYS shown, adaptive styling */}
              <ContactsSection isEmergency={isEmergency} />

              {/* Valid From + Valid Until */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="rounded-xl border border-emerald-100 bg-white p-3 shadow-sm">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <CalendarClock size={12} aria-hidden="true" />
                    Valid From
                  </div>
                  <div
                    className="mt-1 text-[13px] font-semibold"
                    style={{ color: BRAND_GREEN_DEEPEST }}
                  >
                    {formatDateTime(advisory.valid_from)}
                  </div>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-white p-3 shadow-sm">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <CalendarClock size={12} aria-hidden="true" />
                    Valid Until
                  </div>
                  <div
                    className="mt-1 text-[13px] font-semibold"
                    style={{ color: BRAND_GREEN_DEEPEST }}
                  >
                    {formatDateTime(advisory.valid_until)}
                  </div>
                </div>
              </div>

              {/* Source */}
              <div className="flex items-start gap-1.5 text-[11px] sm:text-xs text-slate-600">
                <Info
                  size={13}
                  className="mt-0.5 text-slate-400 shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <span
                    className="font-semibold"
                    style={{ color: BRAND_GREEN_DEEPEST }}
                  >
                    Source:
                  </span>{" "}
                  {advisory.source ||
                    "Authorities / official announcements (when available)"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fade-in-backdrop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-fade-in-backdrop {
          animation: fade-in-backdrop 0.2s ease-out both;
        }
        .animate-modal-in {
          animation: modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </div>
  );
}