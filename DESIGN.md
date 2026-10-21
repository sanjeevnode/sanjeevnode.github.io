# sanjeevnode.in redesign

## Brief

- Subject: Sanjeev Singh, Software Development Engineer II at AlignTogether (Bhopal, India). Handle: `sanjeevnode`.
- Audience: recruiters, engineering managers, founders looking for someone to build a product end to end.
- Job: get hired or contracted. Read the work in 30 seconds, reach the CV or the inbox in one click.
- Content: kept as is (CMS data from MongoDB: experience, projects, skills, education; contact form; CV PDF).
- Constraint: Next.js 14 app with an admin CMS. The public site gets a new route group; admin is untouched.

## Concepts

| | A. The wire (name + material) | B. Point cloud (his research) | C. Dead-letter queue (process) |
|---|---|---|---|
| Idea | The handle says he is a node. The page is one signal line routed from his name to your inbox, passing through every system he shipped | His name starts as sparse mmWave radar points and resolves into solid type, like his radar-to-skeleton model | The site is an event log: sections are messages with offsets, the CV is acked, the 404 is a dead letter |
| Anchor | `sanjeevnode`, plus a body of work that is queues, webhooks, sync and event-driven pipelines | The Radar Pose Estimation project | SQS, dead-lettering, watermarks, idempotent sync in his real systems |
| Signature | A routed wire draws down the page with scroll; packets keep flowing along it at rest; the stack table routes each technology to the systems that used it | Pointer radar sweep resolving the name | Messages enqueue and get consumed as you scroll |
| O / F / Fe / P | 4 / 5 / 4 / 2 | 4 / 3 / 3 / 2 | 3 / 4 / 4 / 3 |

Pick **A**. It fits the handle and the work, it survives to the footer and the 404, and the stack routing uses real data (every technology is linked to the systems that list it). B only lives in the hero. C reads as a terminal theme, which the old site already was.
Stolen from C: the 404 is a dead-lettered message with a replay link.

## Concept card

```
Idea:        The page is one signal line routed from Sanjeev's name to your inbox, passing through every system he shipped.
Metaphor:    A routed signal path on a schematic: rails, nodes, packets in flight.
Signature:   The wire. An SVG path built from [data-wire] anchors, drawn by scroll, packets flowing along the drawn part at rest.
             Secondary use of the same rule: the stack "routing table" draws edges from a technology to the systems that used it.
Emotion:     Precise and calm, with something always moving. An engineer's drawing that is switched on.
Motion verb: Route. Things travel along a path, turn square corners, and lock at a node (expo.inOut).
Screenshot:  The stack table with one technology lit and cobalt edges fanning out to six systems.
```

## System

### Palette

Revised after review: a dark base with GSAP-style hue families (the owner asked for gsap.com's vibrancy).

| Role | Value | Use |
|---|---|---|
| ground | `#0E100F` | page (warm near-black) |
| ink | `#FFFCE1` | text (cream) |
| muted | `#BBBAA6` | secondary text (9.5:1 on ground) |
| line | `rgb(255 252 225 / 0.14)` | hairlines |
| on-signal | `#0E100F` | text on any hue |

Every section is a channel with its own hue family (`.hue-*` sets `--c-signal` and `--c-signal-2`):

| Section | Hue | Gradient |
|---|---|---|
| Hero, intro, privacy | violet | `#9D95FF` to `#F7BDF8` |
| Systems | green | `#0AE448` to `#ABFF84` |
| Work, /projects, 404 | pink | `#FEC5FB` to `#FF5CE1` |
| Stack | cyan | `#00BAE2` to `#BEF3FE` |
| Education, /resume | orange | `#FF8709` to `#FFD9B0` |

Section titles are gradient type in their hue. The wire takes the hue of the section it routes through (an SVG gradient written by the driver), and its stops become highlighter chips in that hue. Contact uses the all-hue gradient for its headline, the footer wordmark too. Decode bits pick a random hue each flip.

### Type

- Display: Archivo variable, width 125 (expanded), weight 800, uppercase, tracking -0.04em, leading 0.84. The name is the image.
- Text: Archivo width 100, 400 and 500. Body 17 to 18 px, leading 1.55.
- Data: JetBrains Mono 400 for technologies, periods, counts and node labels only. Not for every label.

Scale: `--t-mega clamp(4rem, 0.6rem + 15.6vw, 17rem)`, `--t-xl`, `--t-l`, `--t-m`, `--t-body`, `--t-s 0.875rem`, `--t-xs 0.75rem`.

### Grid and rhythm

12 columns, fluid gutter. Column 1 on the left and column 12 on the right are rails: the wire runs there and nothing else does. Content lives in columns 2 to 11 (or 2 to 12 on left-rail sections). The wire switches rails in the gap between sections, which draws the Z route down the page. Phones: one rail at 14 px from the left edge, content indented 36 px.

Section rhythm varies: hero full viewport, statement airy, systems tight rows, work airy, stack dense, education tight, contact full field.

### Shape

Radius 0 everywhere. Nodes are 9 px squares (packets), not circles.

### Motion language

- Eases: `expo.out` entrances, `expo.inOut` curtains and routes, `power3.out` hover.
- Page transition: an ink band routes across the screen left to right with the destination path printed on it, then leaves to the right.
- Loader: the wordmark sanjeevnode.in and a counter, an all-hue line fills with real progress, then the panel routes off to the right. Home only, desktop only.
- Hero intro (decode): every letter of the name starts as a coloured bit and turns in 3D (mostly top to bottom, some left to right) through bits onto its glyph, in scattered order; the node arrives last and the wire launches from it. At rest a random letter flips to a bit and back every few seconds.
- Hovers, one per role:
  - Nav links: a wire draws under the label and a node locks at its end.
  - Primary buttons: ink floods in from the left like a signal filling a pipe; the arrow travels.
  - System rows: the title routes 0.6em right and a wire draws across the row.
  - Work images: the image scales inside its clipped frame and an "Open" packet slides in.
  - Technology chips: they light and route edges to their systems.
  - Utility links (privacy, socials): color and underline only.
- Idle: packets flow along the drawn wire, and the stack table cycles through technologies while it is on screen and untouched. Both stop under reduced motion.

### Composition plan (home)

```
HERO (poster)                          INTRO (statement, left rail)
sanjeev.node        Systems Work Stack CV   |  I'm a software engineer who takes
                                            |  products from first commit to...
SANJEEV                                     o  [View CV ->] [Email me]
SINGH ■──────────────────────┐
You have an idea.            │         SYSTEMS (index rows, left rail)
I engineer it to production. │         o AlignTogether  SDE II  Oct 2024 to now
Bhopal 13:02 IST     Scroll  │         |  Radar Pose Estimation   Python TensorFlow  +
                                       |  Conversational Voice AI ...             +
WORK (staggered pairs, right rail)     STACK (routing table, left rail)
 [image 7 cols]   Title         o      o Languages  [Python][TypeScript]..   | systems
   text 4 cols    bullets       |        AI/ML      [PyTorch][OpenCV]..  ==> | lit list
                                |
EDUCATION (facts, right rail)          CONTACT (ink field, finale)
 2024  B.Tech CSE, SISTec       o      LET'S BUILD SOMETHING GREAT.
 2019  HSC, O.P Jindal          |      details | form ............ [Send] ■ (wire ends)
                                       SANJEEVNODE (giant wordmark), links, privacy
```

### Genericness test (what changed)

- Old: typewriter role list, two blurred glow blobs, terminal prompt logo, numbered `01.` nav, three equal card grids, magnetic buttons, a cursor that hid the native one. All removed.
- First draft of the wire was a plain timeline on the left edge. Changed to two rails with square-cornered crossings so it reads as a routed path, not a timeline.
- First draft palette was near-black with a cyan accent (the old site). Changed to a light drafting ground with one cobalt signal.

### Decisions

- No WebGL. The concept is a line; SVG carries it at no GPU cost.
- No per-project case pages: the CMS holds a title, bullets, tags, links and one image per project, so `/projects` shows each project in full instead.
- `/resume` keeps the PDF viewer with the new frame.
