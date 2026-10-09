"use client";

import { site } from "@/content/site";
import { IconMark } from "@/components/system/icon-mark";
import {
  Layers,
  Sparkles,
  CheckCircle2,
  Wrench,
  Figma,
  Framer,
  PenTool,
  Brush,
  NotebookText,
  StickyNote,
  Video,
  KanbanSquare,
  MessageSquare,
  Gem,
  Blocks,
} from "lucide-react";

/**
 * Skills & Tools — bento grid.
 * - All 3 skill cards share ONE style: blue glass + tilted, overlapping pills
 *   (same look as the "Brand Identity" card in the reference)
 * - Tall right card holds the tools
 * - Just names. One short line under each title at most.
 */

type Item = { name: string; icon?: any };
type Group = { category: string; description?: string; items: ReadonlyArray<Item> };

const SKILL_ICONS = [Layers, Sparkles, CheckCircle2];

/* Small tilts + vertical offsets so pills feel scattered but stay readable */
const TILTS = [-9, 6, -3, 8, -6, 3, -8, 5, -4, 7];
const LIFTS = [0, 10, -4, 8, 0, 12, -6, 6, 2, 10];

/* One glass surface for every card: pale base + blue glow from the top-left */
const glass =
  "relative isolate overflow-hidden rounded-3xl bg-[#e3e8fb] p-6 md:p-7 min-h-[21rem] " +
  "before:absolute before:inset-0 before:-z-10 before:content-[''] " +
  "before:bg-[radial-gradient(ellipse_90%_65%_at_25%_0%,#4a6cf7_0%,rgba(110,140,255,0.55)_45%,transparent_80%)]";

function CardHeader({ Icon, title }: { Icon: any; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/25 text-white ring-1 ring-white/40">
        <Icon className="h-[18px] w-[18px]" aria-hidden />
      </span>
      <h3 className="font-body text-2xl font-semibold tracking-tight text-white">
        {title}
      </h3>
    </div>
  );
}

/* Tool icons: uses your own icon from site data first,
   then falls back to a matching icon + brand color by tool name. */
const TOOL_ICONS: Array<[string, any, string]> = [
  ["figjam", PenTool, "#A259FF"],
  ["figma", Figma, "#F24E1E"],
  ["framer", Framer, "#0055FF"],
  ["adobe", Brush, "#FF3030"],
  ["notion", NotebookText, "#111111"],
  ["miro", StickyNote, "#E6A800"],
  ["loom", Video, "#625DF5"],
  ["jira", KanbanSquare, "#0052CC"],
  ["chatgpt", MessageSquare, "#10A37F"],
  ["claude", Sparkles, "#D97757"],
  ["gemini", Gem, "#4285F4"],
  ["relume", Blocks, "#111111"],
];

function ToolIcon({ item }: { item: Item }) {
  if (item.icon) {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white p-1 ring-1 ring-black/5">
        <IconMark icon={item.icon} size={16} decorative />
      </span>
    );
  }
  const key = item.name.toLowerCase();
  const match = TOOL_ICONS.find(([k]) => key.includes(k));
  if (match) {
    const [, Icon, color] = match;
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-black/5">
        <Icon className="h-3.5 w-3.5" style={{ color }} aria-hidden />
      </span>
    );
  }
  /* Last resort: monogram so no tool is ever without an icon */
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#4a6cf7] font-body text-[11px] font-bold text-white">
      {item.name.charAt(0).toUpperCase()}
    </span>
  );
}

/* Frosted, tilted pill — the signature element */
function FloatPill({ item, i }: { item: Item; i: number }) {
  return (
    <li
      style={{
        transform: `translateY(${LIFTS[i % LIFTS.length]}px) rotate(${TILTS[i % TILTS.length]}deg)`,
      }}
      className="-ml-1 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 font-body text-sm font-medium text-foreground shadow-[0_4px_14px_rgba(60,90,220,0.12)] backdrop-blur-md first:ml-0"
    >
      {item.icon && (
        <IconMark icon={item.icon} size={16} decorative className="shrink-0" />
      )}
      {item.name}
    </li>
  );
}

function SkillCard({
  group,
  Icon,
  className = "",
}: {
  group: Group;
  Icon: any;
  className?: string;
}) {
  return (
    <article className={`${glass} flex flex-col ${className}`}>
      <CardHeader Icon={Icon} title={group.category} />

      {group.description && (
        <p className="mt-3 max-w-[16rem] font-body text-sm leading-relaxed text-white/85 line-clamp-2">
          {group.description}
        </p>
      )}

      <ul className="mt-auto flex flex-wrap items-center justify-center gap-y-3 pt-10">
        {group.items.map((item, i) => (
          <FloatPill key={item.name} item={item} i={i} />
        ))}
      </ul>
    </article>
  );
}

export function ToolsSkills() {
  const { skills, tools } = site.skillsAndTools as unknown as {
    skills: Group[];
    tools: Group[];
  };

  return (
    <section id="skills-tools" className="border-t border-hairline py-section">
      <div className="shell mx-auto max-w-7xl">
        <h2 className="mb-8 font-body text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:mb-10 md:text-5xl">
          Skills &amp; Tools
        </h2>

        <div className="rounded-[2rem] bg-[#0b2a8a] p-3 md:p-5">
          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            {/* Row 1: UX Research & Strategy / UI & Interaction Design */}
            {skills[0] && <SkillCard group={skills[0]} Icon={SKILL_ICONS[0]} />}
            {skills[1] && <SkillCard group={skills[1]} Icon={SKILL_ICONS[1]} />}

            {/* Tools — tall card, same glass language */}
            <article
              className={`${glass} md:col-start-3 md:row-span-2 md:row-start-1`}
            >
              <CardHeader Icon={Wrench} title="Tools" />

              <div className="mt-10 space-y-6 md:mt-16">
                {tools.map((group) => (
                  <div key={group.category}>
                    <p className="mb-2.5 font-body text-sm font-semibold text-foreground">
                      {group.category}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item.name}
                          className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 py-1.5 pl-1.5 pr-3.5 font-body text-sm font-medium text-foreground backdrop-blur-md"
                        >
                          <ToolIcon item={item} />
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>

            {/* Row 2: Product Thinking & QA (wide) */}
            {skills[2] && (
              <SkillCard
                group={skills[2]}
                Icon={SKILL_ICONS[2]}
                className="md:col-span-2 md:row-start-2 md:min-h-[17rem]"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}