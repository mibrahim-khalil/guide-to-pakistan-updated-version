import { Router } from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} from './booking.controller.js';
import { protect } from '../../middleware/auth.js';

const router = Router();

// Public route: Customers create bookings
router.post('/', createBooking);

// Protected Admin routes
router.get('/', protect, getBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id', protect, updateBookingStatus);
router.delete('/:id', protect, deleteBooking);

export default router;
