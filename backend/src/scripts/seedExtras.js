import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';
import { Coupon } from '../modules/coupons/coupon.model.js';
import { Inquiry } from '../modules/inquiries/inquiry.model.js';
import { Page } from '../modules/pages/page.model.js';

const seedExtras = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info('Connected for extra seeding...');

    await Coupon.deleteMany({});
    await Coupon.create([
      { code: 'GTP2026', discountType: 'percentage', discountValue: 15, expiryDate: new Date('2026-12-31') },
      { code: 'HUNZA5000', discountType: 'fixed', discountValue: 5000, expiryDate: new Date('2026-06-01') },
    ]);

    await Inquiry.deleteMany({});
    await Inquiry.create({
      name: 'John Doe',
      email: 'john@example.com',
      subject: 'Custom Tour',
      message: 'I want a private tour to K2.',
    });

    await Page.deleteMany({});
    await Page.create({
      pageName: 'home',
      content: {
        heroTitle: 'Discover the Beauty of Pakistan',
        heroSubtitle: 'Book your dream trip to the northern valleys.',
        heroImage: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?q=80&w=1200',
      },
    });

    logger.success('Coupons, Inquiries, and Pages seeded!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    logger.error('Seeding failed: ' + err.message);
    process.exit(1);
  }
};

seedExtras();
