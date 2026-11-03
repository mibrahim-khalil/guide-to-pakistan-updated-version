import mongoose from 'mongoose';

const routeConditionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "Lahore → Islamabad (M-2)"
    slug: { type: String, required: true, unique: true, lowercase: true },
    status: { 
      type: String, 
      enum: ['clear', 'low', 'moderate', 'high', 'critical', 'closed'], 
      default: 'low' 
    },
    cause: { type: String }, // e.g., "Heavy fog near Kallar Kahar"
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const RouteCondition = mongoose.model('RouteCondition', routeConditionSchema);