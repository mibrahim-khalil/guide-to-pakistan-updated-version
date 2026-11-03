import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { env } from '../config/env.js';
import logger from '../utils/logger.js';
import { Product } from '../modules/products/product.model.js';

const sampleProducts = [
  {
    name: 'Premium Hunza Dry Apricots',
    slug: 'premium-hunza-dry-apricots',
    category: 'Dry Fruits',
    description: 'Hand-picked, sun-dried apricots directly from Hunza Valley farms. Rich in iron, fiber, and antioxidants.',
    price: 2500,
    discountPrice: 1999,
    stock: 100,
    unit: '1 KG',
    image: 'https://images.unsplash.com/photo-1596273312170-8ecb6cd3b7b1?q=80&w=1200',
    origin: 'Hunza Valley, Gilgit-Baltistan',
    featured: true,
    status: 'active'
  },
  {
    name: 'Chitral Dry Fruits Mix (Walnut + Almond + Raisins)',
    slug: 'chitral-dry-fruits-mix',
    category: 'Dry Fruits',
    description: 'Premium mountain-grown walnuts, almonds, and raisins pack from Chitral valleys.',
    price: 3500,
    discountPrice: 2899,
    stock: 60,
    unit: '1 KG',
    image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1200',
    origin: 'Chitral, KPK',
    featured: true,
    status: 'active'
  },
  {
    name: 'Handwoven Chitrali Pakol Cap',
    slug: 'handwoven-chitrali-pakol-cap',
    category: 'Handicrafts',
    description: 'Traditional handmade wool cap, worn across Northern Pakistan. 100% pure sheep wool.',
    price: 1800,
    stock: 25,
    unit: '1 Piece',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1200',
    origin: 'Chitral, KPK',
    featured: false,
    status: 'active'
  },
  {
    name: 'Premium Kashmiri Pink Salt (Himalayan)',
    slug: 'kashmiri-pink-salt',
    category: 'Spices & Tea',
    description: 'Pure pink Himalayan rock salt mined from Khewra Salt Mine, one of the oldest salt mines in the world.',
    price: 850,
    discountPrice: 699,
    stock: 200,
    unit: '1 KG',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200',
    origin: 'Khewra, Punjab',
    featured: true,
    status: 'active'
  },
  {
    name: 'Professional Trekking Backpack 65L (K2 Edition)',
    slug: 'trekking-backpack-k2',
    category: 'Trekking Gear',
    description: 'Weather-proof trekking backpack with hydration pocket. Designed for high-altitude expeditions.',
    price: 15500,
    discountPrice: 12999,
    stock: 15,
    unit: '1 Piece',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200',
    origin: 'Imported, Pakistan',
    featured: true,
    status: 'active'
  },
  {
    name: 'Pure Pashmina Shawl (Kashmiri)',
    slug: 'pure-pashmina-shawl',
    category: 'Pashmina & Shawls',
    description: 'Authentic hand-embroidered Pashmina shawl from Kashmir. 100% pure wool with intricate paisley patterns.',
    price: 12000,
    discountPrice: 9500,
    stock: 20,
    unit: '1 Piece',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?q=80&w=1200',
    origin: 'Kashmir',
    featured: true,
    status: 'active'
  },
  {
    name: 'Kashmiri Kahwa Tea Premium',
    slug: 'kashmiri-kahwa-tea',
    category: 'Spices & Tea',
    description: 'Traditional Kashmiri green tea blended with saffron, cardamom, cinnamon, and almonds.',
    price: 1500,
    stock: 80,
    unit: '250g',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1200',
    origin: 'Kashmir',
    featured: false,
    status: 'active'
  },
  {
    name: 'Truck Art Mug (Pakistani Souvenir)',
    slug: 'truck-art-mug',
    category: 'Souvenirs',
    description: 'Hand-painted ceramic mug inspired by Pakistani Truck Art — the signature folk art of Pakistan.',
    price: 950,
    stock: 150,
    unit: '1 Piece',
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1200',
    origin: 'Karachi, Pakistan',
    featured: false,
    status: 'active'
  }
];

const seed = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    logger.info('Database connected...');
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    logger.success('Pakistani products seeded successfully!');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    logger.error('Products seeding failed: ' + err.message);
    process.exit(1);
  }
};
seed();
