// One-off: move legacy base64 images from MongoDB to Cloudinary.
// Run with: node --env-file=.env.local scripts/migrate-images.mjs
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

if (!process.env.MONGO_URI || !process.env.CLOUDINARY_CLOUD_NAME) {
  console.error("MONGO_URI and CLOUDINARY_* env vars are required");
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);
const Project = mongoose.model(
  "Project",
  new mongoose.Schema({}, { strict: false, timestamps: true })
);

const projects = await Project.find({
  "image.data": { $exists: true },
  imageUrl: { $in: [null, undefined] },
});
console.log(`${projects.length} project(s) with legacy images`);

for (const p of projects) {
  const dataUri = `data:${p.get("image").contentType};base64,${p
    .get("image")
    .data.toString("base64")}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "portfolio",
    resource_type: "image",
  });
  // keep the legacy image field: the currently-deployed site still reads it.
  // Run scripts/drop-legacy-images.mjs after the new code is live.
  await Project.updateOne(
    { _id: p._id },
    { $set: { imageUrl: result.secure_url, imagePublicId: result.public_id } }
  );
  console.log(`migrated: ${p.get("title")} -> ${result.secure_url}`);
}

await mongoose.disconnect();
console.log("done");
