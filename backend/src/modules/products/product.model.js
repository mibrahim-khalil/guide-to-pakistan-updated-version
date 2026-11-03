import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    category: {
      type: String,
      enum: ['Dry Fruits', 'Handicrafts', 'Trekking Gear', 'Spices & Tea', 'Souvenirs', 'Pashmina & Shawls'],
      required: true,
    },
    description: { type: String },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    stock: { type: Number, default: 50 },
    unit: { type: String, default: '1 KG' },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    origin: { type: String, default: 'Pakistan' },
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['active', 'out_of_stock', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
