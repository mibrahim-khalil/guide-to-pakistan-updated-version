import mongoose from 'mongoose';

const weeklyReportSchema = new mongoose.Schema(
  {
    weekStartDate: { type: Date, required: true },
    weekEndDate: { type: Date, required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    
    // Header Data
    heroDestinations: [{ type: String }], // e.g. ["Hunza", "Skardu", "Naran"]
    
    // 1. Weekly Story
    story: {
      text: { type: String }, // AI generated overview
      images: [{ type: String }], // URLs for the two story images
    },

    // 2. Week Highlights (Metrics)
    metrics: {
      queriesAsked: { type: Number, default: 0 },
      destinationsTracked: { type: Number, default: 0 },
      routesTracked: { type: Number, default: 0 },
      fieldUpdates: { type: Number, default: 0 },
    },

    // 3. Weather & Road Snapshot (Live pulls)
    snapshots: [
      {
        name: String, // e.g., "Hunza Valley"
        temp: Number, // e.g., -6
        condition: String, // e.g., "Clouds"
        roadAccess: String, // e.g., "OPEN"
      }
    ],

    // 4. Best Destinations to Visit (References to Places)
    bestDestinations: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Place' }
    ],

    // 5. Travel Guidance
    guidance: {
      cautionAreas: [{ type: String }],
      travelWindows: [{ type: String }],
      packingSuggestions: [{ type: String }],
    },

    // 6. Top Experiences This Week
    topExperiences: [{ type: String }],
  },
  { timestamps: true }
);

export const WeeklyReport = mongoose.model('WeeklyReport', weeklyReportSchema);