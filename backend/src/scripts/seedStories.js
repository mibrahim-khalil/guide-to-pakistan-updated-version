import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';
import { Story } from '../modules/stories/story.model.js';

const sampleStories = [
  {
    title: 'Top 10 Hidden Gems in Hunza Valley You Must Visit in 2026',
    slug: 'top-10-hidden-gems-hunza-valley',
    subtitle: 'Beyond Baltit Fort: Explore secret villages, alpine lakes, and panoramic peaks.',
    category: 'Travel Guide',
    author: 'Amina Shah',
    readTime: '6 min read',
    featured: true,
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=1200',
    content: `Hunza Valley is celebrated globally for its dramatic Karakoram peaks, ancient apricot orchards, and legendary longevity. While most tourists stick to Karimabad and Attabad Lake, Hunza holds deeper secrets for curious travelers.\n\nFrom the high-altitude meadows of Duikar to the traditional stone architecture of Ganish Village (the oldest settlement in Hunza), exploring these off-beat spots gives you an authentic taste of mountain life.\n\n### 1. Duikar (Eagle's Nest)\nAt 2,850 meters, Duikar offers the highest viewpoint in Hunza, where you can watch the sunrise illuminate seven major 7,000m+ peaks including Rakaposhi, Ladyfinger, and Golden Peak.`,
    tags: ['Hunza', 'Gilgit-Baltistan', 'Hiking', 'Photography'],
  },
  {
    title: 'A Foodie Guide to Lahore: From Street Nihari to Walled City Haveli Dining',
    slug: 'foodie-guide-to-lahore-street-food',
    subtitle: 'Discover why Lahore is the culinary capital of South Asia.',
    category: 'Food & Dining',
    author: 'Hamza Malik',
    readTime: '8 min read',
    featured: true,
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1627976899841-71b07219591f?q=80&w=1200',
    content: `Lahoris live to eat. The food culture in Lahore is an immersive experience blending centuries of Mughal recipes, Punjabi flavors, and vibrant night-time street energy.\n\nStart your morning in Old Lahore near Taxali Gate with a piping hot bowl of Nihari at Waris Nihari or Siri Paye at Phikka. As dusk falls, head to the Fort Road Food Street where you can dine on rooftop havelis right opposite the illuminated Badshahi Mosque.\n\nDon't leave Lahore without trying Karahi at Butt Karahi in Lakshmi Chowk!`,
    tags: ['Lahore', 'Punjab', 'Food', 'Culture'],
  },
  {
    title: 'Trekking to Fairy Meadows & Nanga Parbat Base Camp: A Complete Survivor Guide',
    slug: 'trekking-fairy-meadows-nanga-parbat-guide',
    subtitle: 'Everything you need to know about Jeeps, horses, altitude, and glamping under Nanga Parbat.',
    category: 'Adventure',
    author: 'Zainab Qureshi',
    readTime: '10 min read',
    featured: false,
    status: 'published',
    coverImage: 'https://images.unsplash.com/photo-1609839335632-75c611ec7175?q=80&w=1200',
    content: `Fairy Meadows (Jutcut) is a lush green grassland situated at the base of Nanga Parbat (8,126m), the ninth-highest mountain in the world.\n\n### The Journey Begins at Raikot Bridge\nTo reach Fairy Meadows, take a 4x4 Jeep ride from Raikot Bridge along the Raikot Cliff road—renowned as one of the world's most thrilling jeep tracks. From Tattu village, it's a 3 to 4-hour hike through pine forests to the meadows.`,
    tags: ['Fairy Meadows', 'Nanga Parbat', 'Trekking', 'Adventure'],
  },
];

const seedStoriesDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info('Database connected for stories seeding...');

    await Story.deleteMany({});
    await Story.insertMany(sampleStories);

    logger.success('Sample stories & blogs seeded successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    logger.error(`Stories seeding failed: ${err.message}`);
    process.exit(1);
  }
};

seedStoriesDB();
