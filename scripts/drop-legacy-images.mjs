// Run AFTER the new code is deployed: removes legacy base64 image buffers
// from projects that already have a Cloudinary imageUrl.
// Run with: node --env-file=.env.local scripts/drop-legacy-images.mjs
import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI env var is required");
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);
const Project = mongoose.model(
  "Project",
  new mongoose.Schema({}, { strict: false, timestamps: true })
);

const result = await Project.updateMany(
  { imageUrl: { $exists: true, $ne: null }, "image.data": { $exists: true } },
  { $unset: { image: 1 } }
);
console.log(`cleaned ${result.modifiedCount} project(s)`);

await mongoose.disconnect();
console.log("done");
