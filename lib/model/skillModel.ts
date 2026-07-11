import mongoose, { Schema, models } from "mongoose";

const skillGroupSchema = new Schema(
  {
    category: { type: String, required: true },
    skills: [String],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const SkillGroup =
  models.SkillGroup || mongoose.model("SkillGroup", skillGroupSchema);
