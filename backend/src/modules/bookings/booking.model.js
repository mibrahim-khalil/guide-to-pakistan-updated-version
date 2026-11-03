import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    bookingNumber: {
      type: String,
      required: true,
      unique: true,
      default: () => 'GTP-' + Math.floor(100000 + Math.random() * 900000),
    },
    
    // Customer Info
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },
    
    // Booking Details
    itemType: { type: String, enum: ['tour', 'custom_trip', 'destination'], default: 'tour' },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour' },
    tourTitle: { type: String },
    
    travelDate: { type: String, required: true },
    guestsCount: { type: Number, required: true, default: 1 },
    specialRequests: { type: String },
    
    totalAmount: { type: Number, default: 0 },
    
    // Status
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded'],
      default: 'unpaid',
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model('Booking', bookingSchema);
