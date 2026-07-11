// Seed the CMS collections from app/data/defaults.json.
// Only inserts into collections that are still EMPTY - never overwrites edits.
// Run with: node --env-file=.env.local scripts/seed-cms.mjs
import { readFileSync } from "node:fs";
import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI env var is required");
  process.exit(1);
}

const defaults = JSON.parse(
  readFileSync(new URL("../app/data/defaults.json", import.meta.url), "utf8")
);

await mongoose.connect(process.env.MONGO_URI);
const loose = () => new mongoose.Schema({}, { strict: false, timestamps: true });

const collections = [
  ["Experience", defaults.experience],
  ["Education", defaults.education],
  ["SkillGroup", defaults.skillGroups],
];

for (const [name, data] of collections) {
  const Model = mongoose.model(name, loose());
  const count = await Model.countDocuments();
  if (count > 0) {
    console.log(`${name}: already has ${count} document(s), skipped`);
    continue;
  }
  await Model.insertMany(data);
  console.log(`${name}: seeded ${data.length} document(s)`);
}

await mongoose.disconnect();
console.log("done");
