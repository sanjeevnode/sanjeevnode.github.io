# sanjeevnode.in

Portfolio of **Sanjeev Singh**, Software Development Engineer II, Bhopal. Live at **[sanjeevnode.in](https://www.sanjeevnode.in)**.

The site is built around one idea: a signal wire routed from the name to the inbox. It runs through every section, drawn as you scroll, with packets flowing along it at rest. The design rationale, palette and motion rules are in [DESIGN.md](DESIGN.md).

## Highlights

- **Decoding hero.** The name arrives as coloured bits that flip in 3D onto each letter. The node (the full stop) lands last and launches the wire.
- **The wire.** One SVG path routed through anchor points in the markup. It changes hue per section, lights its nodes as the signal passes, and labels each crossing with a stop ("Systems, 15 systems shipped").
- **Stack, routed.** Pick a technology and edges route to every system on the page that lists it, computed from the CMS data.
- **Page transitions.** A gradient band carries `GET /path` across the screen and answers `200 OK` before lifting.
- **Content from a CMS.** Experience, projects, skills and education live in MongoDB and are edited from an admin dashboard. The homepage is statically rendered and revalidated on edit.
- **Accessible and fast.** Real text everywhere (no canvas or image headings), skip link, visible focus, full reduced-motion path, mobile LCP under 1 s on the homepage.

## Stack

| Area | Tools |
|---|---|
| Framework | Next.js 14 (App Router), React 18, TypeScript |
| Motion | GSAP 3 (ScrollTrigger, SplitText), Lenis smooth scroll |
| Styling | Plain CSS with design tokens for the public site; Tailwind and shadcn/ui for the admin |
| Type | Archivo (variable width) and JetBrains Mono via `next/font` |
| Data | MongoDB with Mongoose; images on Cloudinary |
| Auth | NextAuth (GitHub OAuth), restricted to allow-listed admin emails |
| Contact | Server action: invisible reCAPTCHA check, Mailtrap email, Google Sheets log |
| Hosting | Vercel |

## Project structure

```
app/
  (site)/              public site: own layout, stylesheet and motion engine
    layout.tsx         skip link, loader, page-transition curtain, header, footer
    site.css           tokens, hue families and every public component style
    page.tsx           homepage (loads CMS content, falls back to app/data/defaults.json)
    projects/          all projects
    resume/            CV viewer (PDF in public/)
    privacy-and-policy/
  admin/               CMS dashboard and login (Tailwind + shadcn/ui)
  actions/             server actions for CMS data and the contact form
  api/auth/            NextAuth route
  data/defaults.json   built-in content: CMS fallback and seed source
  not-found.tsx        the 404 ("dead-lettered")
components/
  site/                public site components (Hero, Systems, Work, Stack, Education, Contact, ...)
  admin/, ui/          admin dashboard components
engine/                motion engine: one GSAP clock, Lenis, reveals, loader, page lifecycle, Next adapter
motion/
  setup.ts             global motion: transition, loader exit, header, scroll-spy, anchor routing
  wire.ts              the wire driver (routing, drawing, hues, packets, nodes)
  decode.ts            the hero name intro and its idle flips
  route.ts             orthogonal routing with rounded corners, shared by the wire and the stack edges
lib/                   auth options, Mongoose models and connection, Cloudinary helpers
scripts/               one-off and maintenance scripts for the CMS
```

## Getting started

Requires Node 20+.

```bash
npm install
# create .env.local with the variables below
npm run dev    # http://localhost:3000
```

Without `MONGO_URI` the public pages still render from `app/data/defaults.json`; the projects list needs the database.

### Environment variables (`.env.local`)

| Variable | Used for |
|---|---|
| `MONGO_URI` | MongoDB connection for CMS content |
| `NEXTAUTH_URL`, `NEXTAUTH_SECRET` | NextAuth (use `http://localhost:3000` locally) |
| `ENV` | `PROD` uses `GITHUB_ID`/`GITHUB_SECRET`; anything else uses the `LOCAL_` pair |
| `GITHUB_ID`, `GITHUB_SECRET` | GitHub OAuth app for production |
| `LOCAL_GITHUB_ID`, `LOCAL_GITHUB_SECRET` | GitHub OAuth app for local (callback `http://localhost:3000/api/auth/callback/github`) |
| `ADMIN_GITHUB_EMAIL` | Comma-separated GitHub emails allowed into the admin |
| `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Project image uploads |
| `NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY`, `CAPTCHA_SECRET` | reCAPTCHA on the contact form |
| `MAILTRAP_TOKEN`, `SENDER_EMAIL`, `RECIVER_EMAIL` | Contact form emails |
| `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `SHEET_ID` | Contact form log in Google Sheets |

## Updating content

- **Experience, projects, skills, education:** sign in at `/admin/login` with an allow-listed GitHub account and edit from the dashboard. Saving revalidates the homepage.
- **Which items reach the homepage:** the `featured` flag on experience systems and projects; anything `inactive` is hidden.
- **CV:** replace `public/sanjeev_1_resume.pdf` (or change `RESUME_FILE` in `app/(site)/resume/page.tsx`).
- **Built-in fallback content:** `app/data/defaults.json`, also the seed for an empty database.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `node --env-file=.env.local scripts/seed-cms.mjs` | Seed empty CMS collections from `defaults.json` (never overwrites) |
| `node --env-file=.env.local scripts/reseed.mjs <collection...>` | Back up, then replace collections (`experience`, `skills`, `education`) from `defaults.json` |
| `node --env-file=.env.local scripts/backup-experience.mjs` | Dump the experiences collection to `backups/` |

`migrate-images.mjs`, `drop-legacy-images.mjs` and `update-projects-2026-07.mjs` are completed one-off migrations, kept for reference.

## Notes for working on the motion

- Everything animates on one clock (GSAP's ticker drives Lenis, ScrollTrigger and the wire). Do not add your own `requestAnimationFrame` loops or scroll listeners; use `onScroll` and `onPage` from `engine/`.
- Page-level effects go in `onPage()` (or `usePage()` in components) so they are reverted on navigation.
- Hidden-before-reveal styles only apply under `html.motion`, so content stays visible without JavaScript and with reduced motion.
- The wire reads `[data-wire]` anchors from the markup; position them with the `wire-pt` classes in `site.css`.

## Deployment

Hosted on Vercel (project `sanjeevnode-github-io`). Set the environment variables above in the Vercel project, with `ENV=PROD` and `NEXTAUTH_URL=https://www.sanjeevnode.in`, and register `https://www.sanjeevnode.in/api/auth/callback/github` as the callback of the production GitHub OAuth app.
