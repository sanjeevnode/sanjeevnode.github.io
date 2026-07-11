import mongoose, { Schema, models } from 'mongoose';

const projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: [String], required: true },
    // legacy: images previously stored as buffers in the DB; kept for back-compat until migrated
    image: { data: Buffer, contentType: String },
    imageUrl: String,
    imagePublicId: String,
    link: String,
    github: String,
    tags: [String],
    active: { type: Boolean, default: true },
}, { timestamps: true });

export const Project = models.Project || mongoose.model('Project', projectSchema);
