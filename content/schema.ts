/**
 * Content schema
 * ---------------------------------------------------------------------------
 * Every string a visitor reads lives in `content/`. Components never hardcode
 * copy, so filling this folder from the approved design files is the only step
 * between this build and a finished site.
 *
 * Fields typed `Sourced<T>` must be transcribed from the uploaded design files.
 * They are left null rather than guessed — the UI renders a designed "awaiting
 * source" state for anything blank, so a gap is always visible and never
 * silently filled with invented copy.
 *
 * The block list below is exhaustive against the case-study audit: every item
 * required has a home here, and nothing is merged into anything else.
 */

/** A value that must be transcribed from an approved design file. */
export type Sourced<T> = T | null

/* -------------------------------------------------------------- assets --- */

export type AssetKind = 'browser' | 'phone' | 'plate' | 'bleed'

export interface Asset {
  /** Path under /public, e.g. '/assets/jalankita/01-home.png' */
  src: Sourced<string>
  /** Written for screen readers: what the screen shows and does. */
  alt: string
  /** Visible caption. Transcribe annotations from the design file here. */
  caption?: Sourced<string>
  /** Numbered callouts pointing at specific decisions in the screen. */
  annotations?: Sourced<string[]>
  kind: AssetKind
  width: number
  height: number
  /** Filename expected in /public — shown in the empty state. */
  expected: string
}

/* ------------------------------------------------------------ metadata --- */

/**
 * Displayed as structured metadata on every case study, never collapsed into
 * prose and never hidden behind a disclosure.
 */
export interface ProjectMeta {
  category: string
  platform: Sourced<string>
  role: Sourced<string[]>
  team: Sourced<string>
  duration: Sourced<string>
  timeline: Sourced<string>
  tools: Sourced<string[]>
  designMethod: Sourced<string>
  deliverables: Sourced<string[]>
  status: Sourced<string>
  prototypeUrl: Sourced<string>
  repositoryUrl: Sourced<string>
  year: Sourced<string>
}

/* ------------------------------------------------------------- content --- */

export interface Overview {
  /** One line a recruiter reads in three seconds. */
  intro: Sourced<string>
  /** Where and for whom this product operates. */
  context: Sourced<string[]>
  /** What existed before, and how the project came about. */
  background: Sourced<string[]>
  /** The reason the project was worth doing at all. */
  why: Sourced<string[]>
}

export interface ProblemStatement {
  id: string
  statement: Sourced<string>
  /** The full reasoning. Never shortened. */
  detail: Sourced<string[]>
  evidence?: Sourced<string>
}

export interface SolutionStatement {
  id: string
  /** Which problem id this answers. */
  respondsTo: string
  title: Sourced<string>
  detail: Sourced<string[]>
  assets?: Asset[]
}

export interface ProcessPhase {
  /** Ordinal — the process genuinely is a sequence. */
  no: string
  /** Empathise, Discover, Ideation, Wireframing, Testing… */
  label: string
  summary: Sourced<string>
  activities: Sourced<string[]>
  /** Output that leaves the phase. */
  output: Sourced<string>
  assets?: Asset[]
}

export interface Research {
  goals: Sourced<string[]>
  methods: Sourced<{ name: string; detail: string }[]>
  participants: Sourced<string>
  insights: Sourced<string[]>
  painPoints: Sourced<{ title: string; detail: string }[]>
  findings: Sourced<string[]>
  opportunities: Sourced<string[]>
  assets?: Asset[]
}

export interface DesignDecision {
  no: string
  title: Sourced<string>
  /** What was designed. */
  decision: Sourced<string>
  /** Why — the part that matters. Never omitted. */
  rationale: Sourced<string[]>
  /** What was considered and rejected, and on what grounds. */
  alternative: Sourced<string>
  asset?: Asset
}

export interface TypeStyle {
  role: string
  family: Sourced<string>
  weight: Sourced<string>
  size: Sourced<string>
  lineHeight: Sourced<string>
  tracking?: Sourced<string>
}

export interface Typography {
  families: Sourced<{ name: string; usage: string }[]>
  heading: Sourced<TypeStyle[]>
  body: Sourced<TypeStyle[]>
  scale: Sourced<{ token: string; size: string; usage: string }[]>
  rationale: Sourced<string[]>
  assets?: Asset[]
}

export interface Swatch {
  name: string
  hex: Sourced<string>
  usage: Sourced<string>
}

export interface ColorSystem {
  primary: Swatch[]
  secondary: Swatch[]
  accent: Swatch[]
  neutrals: Swatch[]
  rationale: Sourced<string[]>
  assets?: Asset[]
}

export interface ComponentGroup {
  name: string
  description: Sourced<string>
  /** Variants and states — the part engineers need. */
  items: Sourced<string[]>
  asset?: Asset
}

export interface DesignSystem {
  intro: Sourced<string[]>
  groups: ComponentGroup[]
  spacing: Sourced<string>
  grid: Sourced<string>
  tokens: Sourced<{ name: string; value: string }[]>
}

export interface ScreenGroup {
  id: string
  /** Logical grouping — Onboarding, Discovery, Checkout… */
  name: string
  /** What this set is for, and what to notice in it. */
  note: Sourced<string[]>
  assets: Asset[]
}

export interface Result {
  outcome: Sourced<string[]>
  impact: Sourced<string[]>
  success: Sourced<{ label: string; value: string }[]>
  reflection: Sourced<string[]>
  lessons: Sourced<string[]>
}

/* ------------------------------------------------------------- project --- */

/**
 * A case study is three things: the problems, the solutions that answer them,
 * and the screens that prove it. Everything else the audit once asked for —
 * spec sheet, overview, process, research, decisions, typography, colour,
 * design system, result — was removed from the page.
 *
 * There is no per-project layout any more either. All four read the same way,
 * and the identity colour is the only thing that changes between them.
 *
 * The blocks above (ProjectMeta, Overview, ProcessPhase, Research,
 * DesignDecision, Typography, ColorSystem, DesignSystem, Result) are kept
 * defined but unused, and their components still sit in components/case/blocks.
 * Nothing renders them. If a section is ever wanted back, add the field here
 * and render the block again — nothing has to be rewritten.
 */
export interface Project {
  slug: string
  index: string
  title: string
  category: string
  /** Identity colour, applied as --accent across the case study. */
  accent: string
  /** The full-width image opening the case study. */
  cover: Asset
  /**
   * The small image the work index shows under the cursor. Optional: with no
   * preview of its own a project falls back to its cover, so this only needs
   * setting where the two should differ.
   *
   * They usually should. The cover is read at full page width and can afford
   * detail; the preview is 400px wide and appears for a second under a moving
   * cursor, so it wants a tighter, simpler crop that survives being small.
   */
  preview?: Asset
  /** Read by the closing CTA. Fields left null are omitted, never padded. */
  meta: ProjectMeta
  problems: ProblemStatement[]
  solutions: SolutionStatement[]
  screens: ScreenGroup[]
}

/* --------------------------------------------------------------- about --- */

/**
 * A small graphic — a tool logo, a social mark, a decorative glyph. Kept
 * separate from Asset because these are drawn at a fixed size rather than
 * presented as evidence, and several are SVG, which the image optimiser passes
 * through untouched.
 */
export interface Icon {
  src: string
  /** Names the graphic. Empty when the icon is purely decorative. */
  label: string
  width: number
  height: number
}

/**
 * The four blocks the About design actually carries: the biography, the skills,
 * the languages, and the tools. There is no `scene` and no `profile` — the
 * design file is a picture of this text, not an image to hang on the page, and
 * it has no key/value profile table to transcribe.
 */
export interface AboutContent {
  biography: Sourced<string[]>
  portrait: Asset
  /** Decorative glyphs that sit around the About header in the design. */
  decor: Icon[]
  uiuxSkills: Sourced<string[]>
  languages: Sourced<{ name: string; level: string }[]>
  software: Sourced<Icon[]>
}

/** True when a sourced field is still waiting on the approved design file. */
export const isPending = (v: unknown): boolean =>
  v === null ||
  v === undefined ||
  (typeof v === 'string' && v.trim() === '') ||
  (Array.isArray(v) && v.length === 0)
