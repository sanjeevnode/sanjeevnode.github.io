// One-off (2026-07): mark Kmanager and Nort inactive, add three new projects.
// Run with: node --env-file=.env.local scripts/update-projects-2026-07.mjs
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

// deactivate instead of delete
for (const pattern of [/kmanager/i, /^nort/i]) {
  const res = await Project.updateMany({ title: pattern }, { $set: { active: false } });
  console.log(`deactivated ${res.modifiedCount} project(s) matching ${pattern}`);
}

const newProjects = [
  {
    title: "MyPassword",
    description: [
      "A zero-knowledge password vault where all cryptography runs in the browser — the master password and keys never reach the server.",
      "Implements envelope encryption with AES-256-GCM data keys and Argon2id key derivation running in WebAssembly.",
      "Features auto-locking after inactivity, full re-encryption on master password rotation, and Google sign-in.",
      "Built with Next.js 15, TypeScript, Tailwind CSS v4, Firebase Auth, and Firestore.",
    ],
    tags: ["Next.js", "TypeScript", "Firebase", "AES-256", "Cryptography"],
    link: "https://mypassword.sanjeevnode.in/",
    github: "https://github.com/sanjeevnode/mypassword",
    active: true,
  },
  {
    title: "BlogGen",
    description: [
      "A full-stack blogging platform for writing, managing, and publishing posts.",
      "Content is stored in Firestore with security-rule-enforced access and Google authentication for authors.",
      "Responsive UI built with Tailwind CSS and shadcn/ui components.",
      "Built with Next.js and TypeScript on Firebase; deployed on Vercel.",
    ],
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
    link: "https://blog.sanjeevnode.in/",
    github: "https://github.com/sanjeevnode/myblog",
    active: true,
  },
  {
    title: "Win Rewrite",
    description: [
      "A cross-platform desktop utility that rewrites any selected text in place using the Google Gemini API with a single hotkey.",
      "Works in any application — browsers, editors, chat apps — while preserving the original clipboard contents.",
      "Runs silently in the system tray with a configurable shortcut and an automated Windows installer.",
      "Built with AutoHotkey v2 for Windows, Hammerspoon (Lua) for macOS, and Bash with xdotool for Linux.",
    ],
    tags: ["AutoHotkey", "Lua", "Gemini API", "Desktop"],
    github: "https://github.com/sanjeevnode/win_rewrite_app",
    active: true,
  },
];

for (const p of newProjects) {
  const exists = await Project.findOne({ title: p.title });
  if (exists) {
    console.log(`skipped (already exists): ${p.title}`);
    continue;
  }
  await Project.create(p);
  console.log(`added: ${p.title}`);
}

await mongoose.disconnect();
console.log("done");
