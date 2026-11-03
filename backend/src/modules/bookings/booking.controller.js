import { Booking } from './booking.model.js';
import { Tour } from '../tours/tour.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { ApiResponse } from '../../utils/ApiResponse.js';

export const createBooking = async (req, res, next) => {
  try {
    const { fullName, email, phone, tourId, travelDate, guestsCount, specialRequests } = req.body;

    if (!fullName || !email || !phone || !travelDate) {
      throw new ApiError(400, 'Full name, email, phone, and travel date are required');
    }

    let tourTitle = 'Custom Tour / General Inquiry';
    let totalAmount = 0;

    if (tourId) {
      const tour = await Tour.findById(tourId);
      if (tour) {
        tourTitle = tour.title;
        const pricePerPerson = tour.discountPrice || tour.price || 0;
        totalAmount = pricePerPerson * (Number(guestsCount) || 1);
      }
    }

    const booking = await Booking.create({
      fullName,
      email,
      phone,
      tour: tourId || null,
      tourTitle: req.body.tourTitle || tourTitle,
      travelDate,
      guestsCount: Number(guestsCount) || 1,
      specialRequests: specialRequests || '',
      totalAmount: req.body.totalAmount || totalAmount,
      itemType: req.body.itemType || 'tour',
    });

    res.status(201).json(
      new ApiResponse(201, booking, 'Booking request submitted successfully!')
    );
  } catch (err) {
    next(err);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const { status, paymentStatus, q } = req.query;
    let query = {};

    if (status && status !== 'all') query.status = status;
    if (paymentStatus && paymentStatus !== 'all') query.paymentStatus = paymentStatus;

    if (q) {
      query.$or = [
        { fullName: { $regex: q, $options: 'i' } },
        { email: { $regex: q, $options: 'i' } },
        { phone: { $regex: q, $options: 'i' } },
        { bookingNumber: { $regex: q, $options: 'i' } },
        { tourTitle: { $regex: q, $options: 'i' } },
      ];
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    res.status(200).json(new ApiResponse(200, bookings, 'Bookings retrieved successfully'));
  } catch (err) {
    next(err);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('tour');
    if (!booking) throw new ApiError(404, 'Booking not found');
    res.status(200).json(new ApiResponse(200, booking, 'Booking retrieved successfully'));
  } catch (err) {
    next(err);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body;
    const updateData = {};
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const booking = await Booking.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!booking) throw new ApiError(404, 'Booking not found');
    res.status(200).json(new ApiResponse(200, booking, 'Booking status updated successfully'));
  } catch (err) {
    next(err);
  }
};

export const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) throw new ApiError(404, 'Booking not found');
    res.status(200).json(new ApiResponse(200, null, 'Booking deleted successfully'));
  } catch (err) {
    next(err);
  }
};
