import mongoose from 'mongoose';

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    subtitle: { type: String, trim: true },
    
    category: {
      type: String,
      enum: ['Travel Guide', 'Culture & Heritage', 'Adventure', 'Food & Dining', 'Traveler Story'],
      default: 'Travel Guide',
    },
    
    author: { type: String, default: 'GTP Editorial' },
    authorAvatar: { type: String },
    
    coverImage: { type: String, required: true },
    content: { type: String, required: true }, // Rich text or paragraphs
    readTime: { type: String, default: '5 min read' },
    
    featured: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
      default: 'published',
    },
    
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export const Story = mongoose.model('Story', storySchema);
