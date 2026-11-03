import mongoose from 'mongoose';

const placeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    regionSlug: { type: String, required: true },
    regionName: { type: String, required: true },
    status: { type: String, enum: ['published', 'draft', 'archived'], default: 'published' },
    hero: {
      category: { type: String, default: 'Destination' },
      risk: { type: String, default: 'Low Risk' },
      roadAccess: { type: String, default: 'Normal' },
      summary: { type: String },
      updatedAgo: { type: String, default: 'Recently updated' },
      image: { type: String },
    },
    overview: {
      label: { type: String, default: 'Local identity' },
      paragraphs: [{ type: String }],
      image: { type: String },
      expandedContent: {
        cuisine: {
          label: { type: String },
          paragraphs: [{ type: String }],
        },
        traditionalDish: {
          label: { type: String },
          image: { type: String },
        },
        socialLife: {
          label: { type: String },
          paragraphs: [{ type: String }],
        },
        socialImage: { type: String },
      },
    },
    weather: {
      updated: { type: String },
      availableDays: { type: Number },
      baseTemperature: { type: Number, default: 22 },
      condition: { type: String, default: 'Partly cloudy' },
      days: [mongoose.Schema.Types.Mixed],
    },
    advisories: [
      {
        id: { type: String },
        risk: { type: String },
        status: { type: String },
        updatedAgo: { type: String },
        title: { type: String },
        summary: { type: String },
        items: [{ icon: String, title: String, text: String }],
        recommendedAction: { type: String },
      },
    ],
    reviews: [
      {
        id: { type: String },
        rating: { type: Number },
        quote: { type: String },
        name: { type: String },
        date: { type: String },
      },
    ],
    placesToVisit: [mongoose.Schema.Types.Mixed],
  },
  { timestamps: true }
);

export const Place = mongoose.model('Place', placeSchema);
