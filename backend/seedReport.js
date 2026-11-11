import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { WeeklyReport } from './src/modules/weeklyReports/weeklyReport.model.js';
import { Place } from './src/modules/places/place.model.js';

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to DB...");

    // Clear old reports
    await WeeklyReport.deleteMany({});

    // Find at least one place to link to "Best Destinations"
    const place = await Place.findOne();

    const report = new WeeklyReport({
      weekStartDate: new Date('2024-07-05'),
      weekEndDate: new Date('2024-07-12'),
      status: 'published',
      heroDestinations: ['Hunza', 'Skardu', 'Naran', 'Swat'],
      story: {
        text: "Weekly outlook for 2024-07-05 to 2024-07-12. 4 recommended destinations highlighted. 1 advisories considered (published & relevant). 1 route records reviewed. 1 field updates received. This is a live intelligence report—conditions can change quickly. Use Smart GTP and local verification before departure.",
        images: [
          "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800", // Rafting/Camping style
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800"  // Mountains
        ]
      },
      metrics: {
        queriesAsked: 0,
        destinationsTracked: 3,
        routesTracked: 1,
        fieldUpdates: 1
      },
      snapshots: [
        { name: "Hunza Valley", temp: -6, condition: "Clouds", roadAccess: "OPEN" },
        { name: "Khunjerab Pass", temp: -24, condition: "Clouds", roadAccess: "Seasonal" }
      ],
      bestDestinations: place ? [place._id] : [],
      guidance: {
        cautionAreas: ["Information limited — verify road and weather locally"],
        travelWindows: [
          "Depart early morning for better visibility and fewer delays.", 
          "Keep 1-2 hours buffer time for mountain routes.", 
          "Re-check road status the night before and morning of travel."
        ],
        packingSuggestions: [
          "Layered clothing for varying altitudes", 
          "Waterproof jacket, hiking boots, extra socks", 
          "High-SPF sunscreen, UV sunglasses, wide-brim hat"
        ]
      },
      topExperiences: [
        "Scenic viewpoints & local food stops in Hunza Valley",
        "Scenic viewpoints & local food stops in Skardu",
        "Scenic viewpoints & local food stops in Khunjerab Pass",
        "Scenic viewpoints & local food stops in Naltar Valley"
      ]
    });

    await report.save();
    console.log("✅ Seed complete! Mock report added to database.");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();