import mongoose, { Schema, models } from "mongoose";

const educationSchema = new Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    period: String,
    description: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Education =
  models.Education || mongoose.model("Education", educationSchema);
