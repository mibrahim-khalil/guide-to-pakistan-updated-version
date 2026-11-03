import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    siteName: { type: String, default: 'Guide to Pakistan' },
    siteTagline: { type: String, default: 'Discover the Soul of Pakistan' },
    contactEmail: { type: String, default: 'hello@guidetopakistan.com' },
    contactPhone: { type: String, default: '+92 326 1487 487' },
    whatsappNumber: { type: String, default: '+92 326 1487 487' },
    officeAddress: { type: String, default: 'Office C03, Plaza 64, 7 Bahria Expy, Phase 8, Rawalpindi, 46000' },
    
    // Payment Accounts (Used in Checkout Page)
    easypaisaTitle: { type: String, default: 'Guide to Pakistan' },
    easypaisaNumber: { type: String, default: '0300-1234567' },
    jazzcashTitle: { type: String, default: 'Guide to Pakistan' },
    jazzcashNumber: { type: String, default: '0321-9876543' },
    bankName: { type: String, default: 'Meezan Bank Ltd.' },
    bankAccountTitle: { type: String, default: 'Guide to Pakistan Private Limited' },
    bankIban: { type: String, default: 'PK36 MEZN 0001 2345 6789 0123' },

    // E-Commerce Config
    defaultShippingCost: { type: Number, default: 300 },
    freeShippingThreshold: { type: Number, default: 10000 },
    currencySymbol: { type: String, default: 'PKR' },

    // Social Links
    facebookUrl: { type: String, default: 'https://facebook.com' },
    instagramUrl: { type: String, default: 'https://instagram.com' },
    twitterUrl: { type: String, default: 'https://twitter.com' },
  },
  { timestamps: true }
);

export const Setting = mongoose.model('Setting', settingSchema);