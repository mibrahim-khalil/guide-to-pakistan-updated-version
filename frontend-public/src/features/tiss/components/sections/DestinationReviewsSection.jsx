import { useMemo, useState } from "react";
import { Star } from "lucide-react";

function StarRating({ value, onChange, size = 18, interactive = false }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          onClick={() => interactive && onChange(i)}
          className={[
            "transition-colors",
            value >= i
              ? "fill-amber-400 text-amber-400"
              : "text-slate-300",
            interactive ? "cursor-pointer" : "",
          ].join(" ")}
        />
      ))}
    </div>
  );
}

export default function DestinationReviewsSection({ destinationName }) {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Ayesha Khan",
      rating: 5,
      text: "Absolutely stunning landscapes. The hospitality was amazing!",
      date: "August 2025",
    },
    {
      id: 2,
      name: "Bilal Ahmed",
      rating: 4,
      text: "Beautiful views and peaceful atmosphere. Highly recommended.",
      date: "May 2025",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    rating: 0,
    text: "",
  });

  const average = useMemo(() => {
    if (!reviews.length) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.rating || !form.text) return;

    const newReview = {
      id: Date.now(),
      name: form.name,
      rating: form.rating,
      text: form.text,
      date: new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    };

    setReviews((prev) => [newReview, ...prev]);

    setForm({
      name: "",
      rating: 0,
      text: "",
    });
  };

  return (
    <section className="space-y-10">
      {/* Header */}
      <div className="text-center">
        <div className="text-sm text-emerald-700 font-medium">
          • Traveler Stories
        </div>
        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          Real reviews from visitors of {destinationName}
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
          See what travelers are saying about their experiences exploring this destination.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
          >
            <StarRating value={review.rating} />

            <p className="mt-4 text-sm text-slate-700 leading-relaxed">
              “{review.text}”
            </p>

            <div className="mt-6 text-sm">
              <div className="font-semibold text-slate-900">
                {review.name}
              </div>
              <div className="text-slate-500">
                {review.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Average Rating */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="text-xl font-bold text-slate-900">
            {average} / 5 average rating
          </div>
          <div className="text-sm text-slate-500">
            Based on {reviews.length} traveler reviews
          </div>
        </div>

        <StarRating value={Math.round(average)} size={20} />
      </div>

      {/* ✅ Updated Add Review Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4"
      >
        <h3 className="text-lg font-semibold text-slate-900">
          Add Your Review
        </h3>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm"
        />

        {/* ✅ Stars moved here (City removed) */}
        <StarRating
          value={form.rating}
          interactive
          onChange={(val) => setForm({ ...form, rating: val })}
        />

        <textarea
          rows="4"
          placeholder="Write your experience..."
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm"
        />

        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-full text-sm font-semibold transition-colors"
        >
          Submit Review
        </button>
      </form>
    </section>
  );
}