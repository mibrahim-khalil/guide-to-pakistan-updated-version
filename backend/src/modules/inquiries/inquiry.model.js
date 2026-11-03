import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    subject: { type: String, default: 'General Inquiry' },
    message: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['unread', 'read', 'replied'], 
      default: 'unread' 
    },
  },
  { timestamps: true }
);

export const Inquiry = mongoose.model('Inquiry', inquirySchema);