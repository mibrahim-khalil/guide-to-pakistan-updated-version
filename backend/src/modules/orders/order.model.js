import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product',
    required: true 
  },
  name: { type: String, required: true },
  image: { type: String },
  unit: { type: String },
  category: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
      default: () => 'ORD-' + Math.floor(100000 + Math.random() * 900000),
    },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      province: { type: String, required: true },
      postalCode: { type: String },
      country: { type: String, default: 'Pakistan' },
    },
    items: [orderItemSchema],
    subtotal: { type: Number, default: 0 },
    shippingCost: { type: Number, default: 300 },
    couponCode: { type: String },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['cod', 'easypaisa', 'jazzcash', 'bank_transfer', 'card'],
      default: 'cod',
    },
    paymentDetails: {
      senderName: { type: String },
      senderAccount: { type: String }, // Phone number or IBAN
      transactionId: { type: String },
      receiptImage: { type: String },   // Cloudinary URL
      paidAt: { type: Date },
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'pending_verification', 'paid', 'rejected', 'refunded'],
      default: 'unpaid',
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);