import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';
import { User } from '../modules/users/user.model.js';
import { Region } from '../modules/regions/region.model.js';
import { Place } from '../modules/places/place.model.js';

const seedAdmin = async () => {
  const email = env.admin.email || 'admin@gtp.com';
  const password = env.admin.password || 'admin123';
  const name = env.admin.name || 'GTP Admin';

  const existing = await User.findOne({ email });
  if (!existing) {
    await User.create({
      name,
      email,
      password,
      role: 'super_admin',
    });
    logger.success(`Default admin created: ${email}`);
  } else {
    logger.info(`Admin user already exists: ${email}`);
  }
};

const sampleRegions = [
  {
    name: 'Gilgit-Baltistan',
    slug: 'gilgit-baltistan',
    tagline: 'The Crown Jewel of Pakistan',
    about:
      'Gilgit-Baltistan is where the Himalayas, Karakoram, and Hindu Kush converge—creating breathtaking scenery and unforgettable road trips.',
  },
  {
    name: 'Punjab',
    slug: 'punjab',
    tagline: 'The Heart of Pakistan',
    about:
      'Punjab is Pakistan’s cultural heartland—heritage cities, food streets, bazaars, and iconic architecture.',
  },
  {
    name: 'Sindh',
    slug: 'sindh',
    tagline: 'Land of Sufis & Civilizations',
    about: 'Sindh combines energetic city life with deep heritage and coastal routes.',
  },
  {
    name: 'Balochistan',
    slug: 'balochistan',
    tagline: 'The Untamed Frontier',
    about: 'Balochistan is known for raw landscapes, long highways, and dramatic coastlines.',
  },
  {
    name: 'Khyber Pakhtunkhwa',
    slug: 'khyber-pakhtunkhwa',
    tagline: 'Gateway to the Northern Valleys',
    about: 'Khyber Pakhtunkhwa is filled with forest valleys, rivers, and summer destinations.',
  },
  {
    name: 'Islamabad Capital Territory',
    slug: 'islamabad',
    tagline: 'The Green Capital',
    about:
      'Islamabad is a modern green capital with hiking trails, viewpoints, and quick access to the Margalla Hills.',
  },
  {
    name: 'Azad Jammu and Kashmir',
    slug: 'kashmir',
    tagline: 'Paradise on Earth',
    about: 'Azad Jammu and Kashmir is known for lush valleys, rivers, and scenic viewpoints.',
  },
];

const samplePlaces = [
  {
    name: 'Hunza Valley',
    slug: 'hunza-valley',
    regionSlug: 'gilgit-baltistan',
    regionName: 'Gilgit-Baltistan',
    status: 'published',
    hero: {
      category: 'Destination',
      risk: 'Low Risk',
      roadAccess: 'Normal',
      summary: 'Low Risk. Clear weather. Perfect time to explore viewpoints.',
      updatedAgo: '2 hours ago',
    },
    weather: { baseTemperature: 14, condition: 'Clear' },
  },
  {
    name: 'Skardu',
    slug: 'skardu-valley',
    regionSlug: 'gilgit-baltistan',
    regionName: 'Gilgit-Baltistan',
    status: 'published',
    hero: {
      category: 'Destination',
      risk: 'Moderate Risk',
      roadAccess: 'Delays possible',
      summary: 'Moderate Risk. Partly Cloudy. Please verify updates before travel.',
      updatedAgo: '3 hours ago',
    },
    weather: { baseTemperature: 10, condition: 'Partly Cloudy' },
  },
  {
    name: 'Swat Valley',
    slug: 'swat-valley',
    regionSlug: 'khyber-pakhtunkhwa',
    regionName: 'Khyber Pakhtunkhwa',
    status: 'published',
    hero: {
      category: 'Destination',
      risk: 'Low Risk',
      roadAccess: 'Normal',
      summary: 'Low Risk. Cool weather. Great scenic drives and river stops.',
      updatedAgo: '1 hour ago',
    },
    weather: { baseTemperature: 15, condition: 'Cool' },
  },
  {
    name: 'Faisal Mosque',
    slug: 'faisal-mosque',
    regionSlug: 'islamabad',
    regionName: 'Islamabad Capital Territory',
    status: 'published',
    hero: {
      category: 'Destination',
      risk: 'Low Risk',
      roadAccess: 'Normal',
      summary: 'Low Risk. Pleasant weather. Iconic landmark and a must-visit.',
      updatedAgo: '1 hour ago',
    },
    weather: { baseTemperature: 20, condition: 'Pleasant' },
  },
];

const seedDB = async () => {
  try {
    if (!env.mongoUri) {
      throw new Error('MONGODB_URI is missing in .env');
    }

    await mongoose.connect(env.mongoUri);
    logger.info('Database connected for seeding...');

    await seedAdmin();

    const regionCount = await Region.countDocuments();
    if (regionCount === 0) {
      await Region.insertMany(sampleRegions);
      logger.success('Regions seeded!');
    } else {
      logger.info(`Regions already present (${regionCount}).`);
    }

    const placeCount = await Place.countDocuments();
    if (placeCount === 0) {
      await Place.insertMany(samplePlaces);
      logger.success('Places seeded!');
    } else {
      logger.info(`Places already present (${placeCount}).`);
    }

    logger.success('Seeding completed successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    logger.error(`Seeding failed: ${err.message}`);
    console.error(err);
    process.exit(1);
  }
};

seedDB();
