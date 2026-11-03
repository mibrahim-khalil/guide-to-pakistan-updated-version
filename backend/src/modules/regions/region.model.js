import mongoose from 'mongoose';

const regionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    tagline: { type: String },
    heroImage: { type: String },
    heroImages: [{ type: String }],
    about: { type: String },
    history: {
      text: { type: String },
      collage: [[String]],
    },
    cultural: {
      text: { type: String },
      collage: [[String]],
    },
    social: {
      text: { type: String },
      collage: [[String]],
    },
    festivals: {
      text: { type: String },
      collage: [[String]],
    },
    attractions: [
      {
        title: { type: String },
        text: { type: String },
      },
    ],
    faqs: [
      {
        q: { type: String },
        a: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const Region = mongoose.model('Region', regionSchema);
