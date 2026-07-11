import mongoose, { Schema, models } from "mongoose";

const experienceSchema = new Schema(
  {
    title: { type: String, required: true }, // role
    company: { type: String, required: true },
    location: String,
    period: String,
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    projects: [
      {
        title: { type: String, required: true },
        technologies: [String],
        description: [String],
        link: String,
      },
    ],
  },
  { timestamps: true }
);

export const Experience =
  models.Experience || mongoose.model("Experience", experienceSchema);
