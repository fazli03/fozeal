# Portfolio

A production Next.js portfolio built around four case studies, each with its own
composition, reading direction, and motion idea.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run content:check # what is still missing
```

---

## Read this first

Your asset upload arrived as a **0-byte empty file**, so there were no Figma
screenshots, no About design file, and no project screens to extract from.

Rather than invent a biography, skills, achievements, or project outcomes —
which your brief explicitly ruled out — the site is built with a typed content
layer where every one of those fields is `null`. Nothing is fabricated. Each gap
renders as a designed, labelled empty state that names the exact field and file
it needs.

Filling it in is a transcription job, not a rebuild. Nothing in `app/` or
`components/` needs to change.

---

## Filling in your content

Three files. That is the whole job.

### 1. `content/site.ts`

Your name, email, and social links.

```ts
name: 'Your Name',
email: 'you@example.com',
social: [{ label: 'LinkedIn', href: 'https://linkedin.com/in/…' }, …]
```

### 2. `content/about.ts` — from the latest About design file only

Transcribe the biography, UI/UX skills, languages, software, and profile rows.
This file is the single source of truth for the About page; nothing on that page
comes from anywhere else.

### 3. `content/projects.ts` — one block per case study

Every project carries twelve blocks, and the type system enforces all of them,
so a project cannot be published with a section quietly missing:

| Block | What goes in it |
| --- | --- |
| `meta` | 13 fields: category, platform, role, team, duration, timeline, tools, design method, deliverables, status, prototype URL, repository, year |
| `overview` | Short introduction, project context, background, why the project exists |
| `problems` | Each problem statement plus its full reasoning and supporting evidence |
| `solutions` | Each solution, with `respondsTo` pointing at the problem id it answers |
| `process` | Every phase: summary, activities, and the output that leaves the phase |
| `research` | Goals, methods, participants, insights, pain points, findings, opportunities |
| `decisions` | What was decided, why, and the alternative that was rejected |
| `typography` | Families, heading and body specs, scale, rationale |
| `colors` | Primary, secondary, accent, neutrals — each with hex and usage — plus rationale |
| `designSystem` | Buttons, inputs, cards, navigation, icons, plus spacing, grid, tokens |
| `screens` | Logical groups, each with a note and per-screen numbered annotations |
| `result` | Outcome, impact, measures of success, reflection, lessons learned |

Add a problem by pushing `problem('p4')`, and its answer by pushing
`solution('s4', 'p4')`. The pairing is rendered as facing columns, so an
unanswered problem stays visible rather than disappearing.

Builders live in `content/_helpers.ts`. Each returns a fully-shaped block with
sourced fields set to `null`.

### 4. Drop the images

`npm run content:check` prints every expected path — 92 of them — plus a
structural audit confirming all twelve blocks exist on all four projects. Put
the files exactly where it says, then set each asset's `src`.

Four presentations are available per asset: `browser`, `phone`, `plate`,
`bleed`. Add `annotations: ['…', '…']` to any asset to hang numbered callouts
beside it, and `caption` for a transcribed note from the design file.

---

## How the metadata is presented

Not as cards. The specification uses two presentations, chosen by layout:

- **`SpecSheet`** — a blueprint panel with corner ticks and a hanging mono
  label rail, pinned in a sticky column. Reads like a drawing's title block.
- **`SpecStrip`** — the same thirteen fields as a wide masthead band, used
  where the layout needs its full width.

Prototype and repository links are rendered as primary actions in both, and
again in the case hero. They are never collapsed into a metadata row.

---

## Design system

**Palette.** Cool porcelain and ink, with a single chrome accent. The accent is
deliberately the language of a design tool's selection UI rather than
decoration — it appears on measurement chips, frame markers, and focus rings.

| Token | Value | Role |
| --- | --- | --- |
| `--ink` | `12 13 16` | Text, dark surfaces |
| `--porcelain` | `237 238 240` | Page ground |
| `--paper` | `250 250 251` | Raised surfaces |
| `--graphite` | `107 112 121` | Secondary text |
| `--hairline` | `214 216 221` | Rules and borders |
| `--ultramarine` | `43 47 212` | Default accent |

Each case study overrides `--accent` for its own identity: Santrendcode green,
Pandu Divisi violet, MM Auto Variasi oxide red, JalanKita teal. Components never
hardcode a colour, so the swap is one inline variable on the article root.

**Type.** Width contrast is the pairing idea — a wide grotesque for display
against a narrow one for text, plus a mono for anything that behaves like data.

- Display: **Archivo Variable** (the `wdth` axis is used, not just weight)
- Body: **Inter Tight Variable**
- Utility: **IBM Plex Mono** — labels, captions, measurements

All three are self-hosted through npm. No external font request at runtime.

**Scale.** One clamped editorial scale in `tailwind.config.ts` — `micro`,
`caption`, `body`, `lead`, `h3`, `h2`, `h1`, `mega`. Spacing runs on an 8px unit
with two fluid tokens, `gutter` and `section`. Components use the scale; there
are no one-off values.

**Signature.** Every region carries a frame label, the way a design canvas names
its frames. It encodes real structure — the labels together read as the document
outline — and it quietly says what this person does for a living. Hover a
project row and a selection outline is drawn against it.

---

## Motion

One easing curve (`0.22, 1, 0.36, 1`) and three durations, shared by everything,
in `lib/motion.ts`. That is what makes the animations read as one system rather
than a pile of effects.

- **Lenis** smooth scroll, with in-page anchors routed through it
- **Framer Motion** for reveals, mask-up type, magnetic buttons, parallax
- Scroll-linked: the manifesto brightens word by word (used exactly once), the
  Pandu Divisi gallery travels laterally, the JalanKita phones drift at four
  different rates

`prefers-reduced-motion` is honoured everywhere, and not by disabling features:
Lenis never initialises, parallax and drift are dropped, and the pinned lateral
gallery becomes an ordinary swipeable row with the same content.

---

## Structure

```
app/
  layout.tsx              fonts, metadata, skip link, providers
  page.tsx                home
  about/page.tsx          sourced entirely from the About design file
  work/[slug]/page.tsx    SSG, one per project
  sitemap.ts robots.ts not-found.tsx globals.css
components/
  system/                 frame, asset-frame, reveal, split-lines,
                          magnetic, parallax, pending, lenis, scroll-progress
  site/                   nav, footer, contact
  home/                   hero, work-index, manifesto, capabilities
  case/
    case-hero.tsx         constant metadata block across all four
    layout-registry.tsx   maps project → layout
    layouts/              four distinct compositions
content/                  schema.ts, site.ts, projects.ts, about.ts
lib/                      utils.ts, motion.ts
```

**The four layouts**

| Project | Layout | Idea |
| --- | --- | --- |
| Santrendcode | Pinned narrative | Learning is sequential — the spec sheet stays pinned while the argument scrolls past |
| Pandu Divisi | Lateral gallery | A recommendation tool compares options, so the reader compares laterally |
| MM Auto Variasi | Editorial overlap | A brand argument, set as a magazine feature with overlapping plates |
| JalanKita | Immersive dark | Transit happens at night on one screen — inverted, phones drifting |

MM Auto Variasi is a Server Component; only its reveal wrappers ship JS.

---

## Performance and accessibility

All routes prerender to static HTML. First-load JS is ~87 kB shared, 156 kB on
the heaviest route.

- `next/image` with AVIF/WebP, explicit dimensions on every asset — no layout
  shift, and images below the fold lazy-load by default
- Semantic landmarks, a skip link, labelled nav regions
- Focus is visible everywhere and never removed
- Decorative motion is `aria-hidden`; the cursor-tracked preview is decorative
  and the row itself is the link, so the work index is fully keyboard-operable
- Split-line headings expose the full string via `aria-label`, so a screen
  reader hears one heading rather than fragments
- Metadata, Open Graph, sitemap, and robots are wired to `site.url` — set that
  to your real domain before deploying

---

## Before you deploy

1. `content/site.ts` → set `url` to your domain
2. `npm run content:check` → get to 92/92 assets, structure audit clean
3. Add `app/opengraph-image.tsx` or drop `public/og.png` for link previews
4. `npm run build`
