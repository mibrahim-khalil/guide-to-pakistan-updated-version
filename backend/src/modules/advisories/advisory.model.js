import mongoose from 'mongoose';

const advisorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    severity: { 
      type: String, 
      enum: ['info', 'warning', 'critical'], 
      default: 'info' 
    },
    isPublished: { type: Boolean, default: true },
    validUntil: { type: Date }, // Optional expiry date
  },
  { timestamps: true }
);

export const Advisory = mongoose.model('Advisory', advisorySchema);