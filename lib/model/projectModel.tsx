import mongoose, { Schema, models } from 'mongoose';

const projectSchema = new Schema({
    title: { type: String, required: true },
    description: { type: [String], required: true },
    image: { data: Buffer, contentType: String },
    link: String,
    github: String,
    tags: [String],
}, { timestamps: true });

export const Project = models.Project || mongoose.model('Project', projectSchema);
