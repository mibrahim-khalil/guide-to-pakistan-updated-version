import mongoose from 'mongoose';

const itinerarySchema = new mongoose.Schema({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  meals: { type: String }, // e.g. "Breakfast, Dinner"
  accommodation: { type: String }, // e.g. "Hotel Serena / Glamping"
});

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    regionSlug: { type: String, required: true },
    regionName: { type: String, required: true },
    status: { type: String, enum: ['published', 'draft', 'archived'], default: 'published' },
    featured: { type: Boolean, default: false },
    
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    currency: { type: String, default: 'PKR' },
    
    durationDays: { type: Number, required: true },
    durationNights: { type: Number, required: true },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Challenging', 'Extreme'], default: 'Moderate' },
    groupSize: { type: String, default: '12-15 Persons' },
    startingLocation: { type: String, default: 'Islamabad' },

    heroImage: { type: String },
    gallery: [{ type: String }],
    overview: { type: String },

    itinerary: [itinerarySchema],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    upcomingDates: [{ type: String }], // e.g. ["2026-05-15", "2026-06-10"]
  },
  { timestamps: true }
);

export const Tour = mongoose.model('Tour', tourSchema);
