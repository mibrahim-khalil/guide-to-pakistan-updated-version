import Button from "../common/Button.jsx";

/* Theme */
const BRAND_GREEN_DEEPEST = "#01411C";

export default function CTABanner() {
  return (
    <div
      className="
        rounded-2xl
        border border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all duration-300
        hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-300
      "
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div
            className="text-base font-extrabold"
            style={{ color: BRAND_GREEN_DEEPEST }}
          >
            Need help planning your trip?
          </div>
          <div className="mt-1 text-sm text-slate-600">
            Contact Guide to Pakistan for bookings and on-ground support.
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button href="mailto:info@guidetopakistan.pk" variant="outline" size="md">
            Email Us
          </Button>

          <Button
            href="https://guidetopakistan.pk/contact"
            target="_blank"
            rel="noreferrer"
            variant="primary"
            size="md"
          >
            Contact Page
          </Button>
        </div>
      </div>
    </div>
  );
}