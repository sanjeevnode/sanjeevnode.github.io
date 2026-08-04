// Replace a CMS collection with the content in app/data/defaults.json.
// Backs the collection up to backups/ first, then deletes and re-inserts.
//
//   node --env-file=.env.local scripts/reseed.mjs experience
//   node --env-file=.env.local scripts/reseed.mjs skills education
//   node --env-file=.env.local scripts/reseed.mjs all
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import mongoose from "mongoose";

// cli name -> [mongoose model, defaults.json key]
const TARGETS = {
  experience: ["Experience", "experience"],
  education: ["Education", "education"],
  skills: ["SkillGroup", "skillGroups"],
};

const requested = process.argv.slice(2);
const names = requested.includes("all") ? Object.keys(TARGETS) : requested;

if (names.length === 0) {
  console.error(`usage: reseed.mjs <${Object.keys(TARGETS).join("|")}|all> ...`);
  process.exit(1);
}

const unknown = names.filter((n) => !TARGETS[n]);
if (unknown.length > 0) {
  console.error(`unknown target(s): ${unknown.join(", ")}`);
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI env var is required");
  process.exit(1);
}

const defaults = JSON.parse(
  readFileSync(new URL("../app/data/defaults.json", import.meta.url), "utf8")
);

await mongoose.connect(process.env.MONGO_URI);
const loose = () => new mongoose.Schema({}, { strict: false, timestamps: true });
const stamp = new Date().toISOString().replace(/[:.]/g, "-");
mkdirSync(new URL("../backups/", import.meta.url), { recursive: true });

for (const name of names) {
  const [modelName, key] = TARGETS[name];
  const data = defaults[key];
  if (!Array.isArray(data) || data.length === 0) {
    console.error(`${name}: defaults.json has no "${key}" content — skipped`);
    continue;
  }

  const Model = mongoose.models[modelName] || mongoose.model(modelName, loose());

  // back up before deleting anything
  const existing = await Model.find({}).lean();
  writeFileSync(
    new URL(`../backups/${name}-${stamp}.json`, import.meta.url),
    JSON.stringify(existing, null, 2)
  );

  const { deletedCount } = await Model.deleteMany({});
  await Model.insertMany(data);
  console.log(
    `${name}: backed up ${existing.length}, deleted ${deletedCount}, inserted ${data.length}`
  );
}

await mongoose.disconnect();
console.log("done — redeploy or wait for revalidation to see it live");
