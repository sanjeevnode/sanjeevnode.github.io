// Replace the skillgroups collection with app/data/defaults.json.
// Backs itself up to backups/ first, then deletes and re-inserts.
// Run with: node --env-file=.env.local scripts/reseed-skills.mjs
import { mkdirSync, writeFileSync } from "node:fs";
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
const SkillGroup = mongoose.model(
  "SkillGroup",
  new mongoose.Schema({}, { strict: false, timestamps: true })
);

// back up before touching anything
const existing = await SkillGroup.find({}).lean();
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
mkdirSync(new URL("../backups/", import.meta.url), { recursive: true });
writeFileSync(
  new URL(`../backups/skillgroups-${stamp}.json`, import.meta.url),
  JSON.stringify(existing, null, 2)
);
console.log(`backed up ${existing.length} group(s) to backups/skillgroups-${stamp}.json`);

const { deletedCount } = await SkillGroup.deleteMany({});
console.log(`deleted ${deletedCount} group(s)`);

await SkillGroup.insertMany(defaults.skillGroups);
console.log(`inserted ${defaults.skillGroups.length} group(s):`);
for (const g of defaults.skillGroups) {
  console.log(`  - ${g.category}: ${g.skills.join(", ")}`);
}

await mongoose.disconnect();
console.log("done");
