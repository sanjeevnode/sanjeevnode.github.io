// Dump the experiences collection to backups/ before a reseed.
// Run with: node --env-file=.env.local scripts/backup-experience.mjs
import { mkdirSync, writeFileSync } from "node:fs";
import mongoose from "mongoose";

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI env var is required");
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);
const Experience = mongoose.model(
  "Experience",
  new mongoose.Schema({}, { strict: false, timestamps: true })
);

const docs = await Experience.find({}).lean();
// timestamp in the filename so repeat runs never overwrite an earlier backup
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const file = new URL(`../backups/experiences-${stamp}.json`, import.meta.url);

mkdirSync(new URL("../backups/", import.meta.url), { recursive: true });
writeFileSync(file, JSON.stringify(docs, null, 2));

console.log(`backed up ${docs.length} experience doc(s)`);
for (const d of docs) {
  const areas = d.projects ?? d.systems ?? [];
  console.log(`  - ${d.company}: ${areas.length} item(s)`);
}
console.log(`written to backups/experiences-${stamp}.json`);

await mongoose.disconnect();
