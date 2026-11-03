import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';
import { Tour } from '../modules/tours/tour.model.js';

const sampleTours = [
  {
    title: 'Hunza & Attabad Lake Luxury Expedition',
    slug: 'hunza-attabad-luxury-expedition',
    regionSlug: 'gilgit-baltistan',
    regionName: 'Gilgit-Baltistan',
    status: 'published',
    featured: true,
    price: 85000,
    discountPrice: 75000,
    durationDays: 5,
    durationNights: 4,
    difficulty: 'Easy',
    groupSize: '10-12 Persons',
    startingLocation: 'Islamabad',
    heroImage: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=1200',
      'https://images.unsplash.com/photo-1627976899841-71b07219591f?q=80&w=1200'
    ],
    overview: 'Experience the magic of Hunza Valley, Altit & Baltit Forts, and the serene turquoise waters of Attabad Lake with luxury transport and 4-star stays.',
    itinerary: [
      { day: 1, title: 'Islamabad to Naran / Chilas', description: 'Departure early morning via Hazara Motorway. Cross Babusar Pass (seasonal) and check in at hotel.', meals: 'Dinner', accommodation: 'Shangrila Resort / Similar' },
      { day: 2, title: 'Arrival in Hunza & Karimabad Walk', description: 'Drive along KKH with views of Rakaposhi Peak (7,788m). Evening heritage walk in Karimabad bazaar.', meals: 'Breakfast, Dinner', accommodation: 'Hunza Serena Inn' },
      { day: 3, title: 'Attabad Lake & Passu Cones', description: 'Boating experience at Attabad Lake, drive through Pak-China Friendship Tunnels to Passu Cones and Hussaini Suspension Bridge.', meals: 'Breakfast, Dinner', accommodation: 'Hunza Serena Inn' },
      { day: 4, title: 'Altit Fort & Eagle’s Nest Sunset', description: 'Explore 900-year-old Altit Fort. Sunset view of 7 major peaks from Duikar Viewpoint (Eagle’s Nest).', meals: 'Breakfast, Dinner', accommodation: 'Hunza Serena Inn' },
      { day: 5, title: 'Return Journey to Islamabad', description: 'Early morning departure back to Islamabad with memorable mountain memories.', meals: 'Breakfast', accommodation: 'None' }
    ],
    inclusions: ['4-Star Hotel Stay', 'Luxury Coaster / Prado Transport', 'Daily Breakfast & Dinner', 'Tour Guide & Toll Taxes'],
    exclusions: ['Boating / Entry tickets', 'Personal laundry & shopping', 'Travel Insurance'],
    upcomingDates: ['2026-05-10', '2026-06-01', '2026-06-20']
  },
  {
    title: 'Skardu & Deosai Plains Safari',
    slug: 'skardu-deosai-safari',
    regionSlug: 'gilgit-baltistan',
    regionName: 'Gilgit-Baltistan',
    status: 'published',
    featured: true,
    price: 95000,
    discountPrice: 89000,
    durationDays: 7,
    durationNights: 6,
    difficulty: 'Moderate',
    groupSize: '8-10 Persons',
    startingLocation: 'Islamabad / Skardu Airport',
    heroImage: 'https://images.unsplash.com/photo-1609839335632-75c611ec7175?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1609839335632-75c611ec7175?q=80&w=1200'
    ],
    overview: 'Explore the land of giants: Upper Kachura Lake, Shangrila Resort, Katpana Cold Desert, and 4x4 Jeep Safari to Deosai National Park.',
    itinerary: [
      { day: 1, title: 'Arrival in Skardu & Shangrila Lake', description: 'Flight or road arrival in Skardu. Visit Shangrila Lake & Upper Kachura Lake.', meals: 'Dinner', accommodation: 'Khoj Resort Skardu' },
      { day: 2, title: 'Deosai Plains & Sheosar Lake 4x4 Safari', description: 'Full day 4x4 Jeep excursion across Deosai Plains (Roof of the World) to Sheosar Lake.', meals: 'Breakfast, Dinner', accommodation: 'Khoj Resort Skardu' },
      { day: 3, title: 'Shigar Fort & Cold Desert Stargazing', description: 'Visit Shigar Fort and experience glamping/stargazing in Katpana Cold Desert.', meals: 'Breakfast, Dinner', accommodation: 'Shigar Fort Hotel' }
    ],
    inclusions: ['4x4 Jeep Charges', 'Resort Accommodations', 'Professional Mountain Guide', 'All Meals'],
    exclusions: ['Airfare (if flying)', 'Tips & Personal Expenses'],
    upcomingDates: ['2026-06-15', '2026-07-05']
  },
  {
    title: 'Swat & Kalam Valley Blossom Escape',
    slug: 'swat-kalam-blossom-escape',
    regionSlug: 'khyber-pakhtunkhwa',
    regionName: 'Khyber Pakhtunkhwa',
    status: 'published',
    featured: false,
    price: 45000,
    discountPrice: 39900,
    durationDays: 4,
    durationNights: 3,
    difficulty: 'Easy',
    groupSize: '15-20 Persons',
    startingLocation: 'Islamabad',
    heroImage: 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?q=80&w=1200'
    ],
    overview: 'A family-friendly escape to Swat Valley, Swat River, Fizaghat, Kalam, and Mahodand Lake.',
    itinerary: [
      { day: 1, title: 'Islamabad to Mingora & Fizaghat', description: 'Drive via Swat Expressway. Visit White Palace Marghazar & Fizaghat Park.', meals: 'Dinner', accommodation: 'Rock City Resort' },
      { day: 2, title: 'Mingora to Kalam Valley', description: 'Drive alongside roaring Swat River to Kalam Valley. Explore Ushu Forest.', meals: 'Breakfast, Dinner', accommodation: 'Kalam Heights' }
    ],
    inclusions: ['Family AC Coaster Transport', 'Hotel Stays', 'Breakfast & Dinner'],
    exclusions: ['Mahodand Lake 4x4 Jeep Cost'],
    upcomingDates: ['2026-05-01', '2026-05-18']
  }
];

const seedToursDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info('Database connected for tour seeding...');

    await Tour.deleteMany({});
    await Tour.insertMany(sampleTours);

    logger.success('Sample tour packages seeded successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    logger.error(`Tour seeding failed: ${err.message}`);
    process.exit(1);
  }
};

seedToursDB();
