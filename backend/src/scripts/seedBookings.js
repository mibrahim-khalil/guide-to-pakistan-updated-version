import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';
import { Booking } from '../modules/bookings/booking.model.js';

const sampleBookings = [
  {
    bookingNumber: 'GTP-102938',
    fullName: 'Ali Raza',
    email: 'ali.raza@gmail.com',
    phone: '+92 300 1234567',
    tourTitle: 'Hunza & Attabad Lake Luxury Expedition',
    travelDate: '2026-05-15',
    guestsCount: 2,
    specialRequests: 'Need vegetarian food during the tour.',
    totalAmount: 150000,
    status: 'confirmed',
    paymentStatus: 'paid',
  },
  {
    bookingNumber: 'GTP-482912',
    fullName: 'Sara Khan',
    email: 'sara.k@yahoo.com',
    phone: '+92 321 9876543',
    tourTitle: 'Skardu & Deosai Plains Safari',
    travelDate: '2026-06-01',
    guestsCount: 4,
    specialRequests: 'Arrangement for senior citizens required.',
    totalAmount: 356000,
    status: 'pending',
    paymentStatus: 'unpaid',
  },
  {
    bookingNumber: 'GTP-893012',
    fullName: 'Usman Chaudhry',
    email: 'usman.c@hotmail.com',
    phone: '+92 333 4567890',
    tourTitle: 'Swat & Kalam Valley Blossom Escape',
    travelDate: '2026-05-10',
    guestsCount: 1,
    specialRequests: 'Window seat preference on coaster.',
    totalAmount: 39900,
    status: 'pending',
    paymentStatus: 'unpaid',
  },
];

const seedBookings = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info('Database connected for booking seeding...');

    // Drop collection to reset any bad null indexes
    try {
      await mongoose.connection.db.dropCollection('bookings');
    } catch (e) {
      // ignore if collection doesn't exist yet
    }

    await Booking.insertMany(sampleBookings);

    logger.success('Sample customer bookings seeded successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    logger.error(`Booking seeding failed: ${err.message}`);
    process.exit(1);
  }
};

seedBookings();
