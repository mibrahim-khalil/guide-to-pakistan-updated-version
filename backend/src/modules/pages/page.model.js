import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  pageName: { type: String, required: true, unique: true },
  content: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { timestamps: true });

export const Page = mongoose.model('Page', pageSchema);
