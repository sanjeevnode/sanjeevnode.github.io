// Replace the experiences collection with app/data/defaults.json.
// Back up FIRST: node --env-file=.env.local scripts/backup-experience.mjs
// Then run:     node --env-file=.env.local scripts/reseed-experience.mjs
//
// Destructive: deletes every experience doc before inserting. Restore from
// backups/experiences-<ts>.json if the result isn't what you wanted.
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
const Experience = mongoose.model(
  "Experience",
  new mongoose.Schema({}, { strict: false, timestamps: true })
);

const before = await Experience.countDocuments();
const { deletedCount } = await Experience.deleteMany({});
console.log(`deleted ${deletedCount} of ${before} existing doc(s)`);

const inserted = await Experience.insertMany(defaults.experience);
console.log(`inserted ${inserted.length} doc(s):`);
for (const e of defaults.experience) {
  const featured = e.projects.filter((p) => p.featured).length;
  console.log(`  - ${e.company}: ${e.projects.length} systems (${featured} featured)`);
}

await mongoose.disconnect();
console.log("done — hard-refresh the site to see it");
