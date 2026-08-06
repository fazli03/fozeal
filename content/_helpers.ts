import type {
  Asset,
  AssetKind,
  ColorSystem,
  ComponentGroup,
  DesignDecision,
  DesignSystem,
  Overview,
  ProblemStatement,
  ProcessPhase,
  ProjectMeta,
  Research,
  Result,
  ScreenGroup,
  SolutionStatement,
  Swatch,
  TypeStyle,
  Typography,
} from "./schema";

/**
 * Builders for the case-study scaffolding.
 *
 * Every builder returns a fully-shaped block with its sourced fields set to
 * null. That guarantees no block can be accidentally left out of a project —
 * the type system requires all of them — while keeping the content file
 * readable enough to edit by hand.
 */

export const asset = (
  slug: string,
  file: string,
  kind: AssetKind,
  alt: string,
  width = 2400,
  height = 1500,
): Asset => ({
  src: null,
  alt,
  caption: null,
  annotations: null,
  kind,
  width,
  height,
  expected: `/assets/${slug}/${file}`,
});

/** Portrait-orientation phone asset. */
export const phone = (slug: string, file: string, alt: string): Asset =>
  asset(slug, file, "phone", alt, 1200, 2400);

/**
 * An asset whose file is already sitting in /public/assets.
 *
 * `path` is written exactly as the file is named on disk — the folders came
 * from the design export and keep their spaces and brackets. The src is
 * percent-encoded so those characters survive the URL; `expected` stays raw so
 * the content check can look the file up on disk. Width and height are the real
 * pixel dimensions of the file, so nothing is upscaled and the layout never
 * shifts while the image loads.
 */
export const image = (
  path: string,
  kind: AssetKind,
  alt: string,
  width: number,
  height: number,
): Asset => ({
  src: encodeURI(`/assets/${path}`),
  alt,
  caption: null,
  annotations: null,
  kind,
  width,
  height,
  expected: `/assets/${path}`,
});

export const meta = (category: string): ProjectMeta => ({
  category,
  platform: null,
  role: null,
  team: null,
  duration: null,
  timeline: null,
  tools: null,
  designMethod: null,
  deliverables: null,
  status: null,
  prototypeUrl: null,
  repositoryUrl: null,
  year: null,
});

export const overview = (): Overview => ({
  intro: null,
  context: null,
  background: null,
  why: null,
});

/**
 * A problem. Pass the copy as the second argument; anything left out stays null
 * and renders as an "awaiting source" state rather than disappearing.
 *
 *   problem('p1', {
 *     statement: 'The one-line problem.',
 *     detail: ['First paragraph.', 'Second paragraph.'],
 *     evidence: 'What proves it — a quote, a number, an observation.',
 *   })
 */
export const problem = (
  id: string,
  copy?: Partial<Omit<ProblemStatement, "id">>,
): ProblemStatement => ({
  id,
  statement: null,
  detail: null,
  evidence: null,
  ...copy,
});

/**
 * A solution. `respondsTo` is the id of the problem it answers — the page puts
 * the pair side by side, so an unanswered problem stays visible.
 *
 *   solution('s1', 'p1', [image(…)], {
 *     title: 'The design move.',
 *     detail: ['How it answers the problem.'],
 *   })
 */
export const solution = (
  id: string,
  respondsTo: string,
  assets?: Asset[],
  copy?: Partial<Omit<SolutionStatement, "id" | "respondsTo" | "assets">>,
): SolutionStatement => ({
  id,
  respondsTo,
  title: null,
  detail: null,
  assets,
  ...copy,
});

/**
 * A named set of screens.
 *
 *   screens('plan', 'Plan a trip', [image(…)], ['What to notice here.'])
 */
export const screenGroup = (
  id: string,
  name: string,
  assets: Asset[],
  note: ScreenGroup["note"] = null,
): ScreenGroup => ({ id, name, note, assets });

export const phase = (
  no: string,
  label: string,
  assets?: Asset[],
): ProcessPhase => ({
  no,
  label,
  summary: null,
  activities: null,
  output: null,
  assets,
});

export const research = (assets?: Asset[]): Research => ({
  goals: null,
  methods: null,
  participants: null,
  insights: null,
  painPoints: null,
  findings: null,
  opportunities: null,
  assets,
});

export const decision = (no: string, asset?: Asset): DesignDecision => ({
  no,
  title: null,
  decision: null,
  rationale: null,
  alternative: null,
  asset,
});

export const typeStyle = (role: string): TypeStyle => ({
  role,
  family: null,
  weight: null,
  size: null,
  lineHeight: null,
  tracking: null,
});

export const typography = (assets?: Asset[]): Typography => ({
  families: null,
  heading: null,
  body: null,
  scale: null,
  rationale: null,
  assets,
});

export const swatch = (name: string): Swatch => ({
  name,
  hex: null,
  usage: null,
});

export const colors = (assets?: Asset[]): ColorSystem => ({
  primary: [swatch("Primary")],
  secondary: [swatch("Secondary")],
  accent: [swatch("Accent")],
  neutrals: [
    swatch("Neutral 900"),
    swatch("Neutral 500"),
    swatch("Neutral 100"),
  ],
  rationale: null,
  assets,
});

export const componentGroup = (
  name: string,
  asset?: Asset,
): ComponentGroup => ({
  name,
  description: null,
  items: null,
  asset,
});

/** The eight groups the audit requires, in the order they are presented. */
export const designSystem = (asset?: Asset): DesignSystem => ({
  intro: null,
  groups: [
    componentGroup("Buttons", asset),
    componentGroup("Inputs"),
    componentGroup("Cards"),
    componentGroup("Navigation"),
    componentGroup("Icons"),
  ],
  spacing: null,
  grid: null,
  tokens: null,
});

export const result = (): Result => ({
  outcome: null,
  impact: null,
  success: null,
  reflection: null,
  lessons: null,
});
