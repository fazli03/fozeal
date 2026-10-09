"use client";

import { useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { site } from "@/content/site";
import { IconMark } from "@/components/system/icon-mark";
import {
  SlidersHorizontal,
  Layers,
  Wrench,
  Sparkles,
  CheckCircle2,
  Plus,
} from "lucide-react";

type IconType = ComponentType<{ className?: string }>;

/**
 * Skills & Tools — horizontal card layout.
 * - Desktop (md+): expanding panels in one row. The active panel widens and
 *   shows its items; the others collapse to slim vertical strips.
 * - Mobile: scroll-snap carousel, next card peeks in, with progress pills.
 * - Same tokens, fonts and data as before. No new colors or dependencies.
 */

type Filter = "all" | "skills" | "tools";

interface CardData {
  id: string;
  type: "skill" | "tool";
  title: string;
  subtitle: string;
  icon: IconType;
  items: ReadonlyArray<any>;
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "skills", label: "Skills" },
  { key: "tools", label: "Tools" },
];

/* ------------------------------------------------------------------ */
/* Shared: the grid of items inside a card                             */
/* ------------------------------------------------------------------ */
function ItemGrid({
  items,
  columns,
  animate,
}: {
  items: ReadonlyArray<any>;
  columns: "one" | "two";
  animate: boolean;
}) {
  return (
    <div
      className={`grid gap-2.5 ${columns === "two" ? "sm:grid-cols-2" : "grid-cols-1"
        }`}
    >
      {items.map((item, i) => {
        const icon = "icon" in item ? item.icon : undefined;
        const description = item.desc || item.role;
        return (
          <motion.div
            key={item.name}
            initial={animate ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={
              animate
                ? { duration: 0.3, delay: 0.14 + i * 0.04, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0 }
            }
            className="selectable rounded-2xl border border-hairline bg-porcelain/40 p-3.5 transition-colors hover:border-accent/40 hover:bg-paper"
          >
            <div className="flex items-center gap-3">
              {icon ? (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-hairline bg-paper p-1">
                  <IconMark icon={icon} size={16} decorative className="brightness-0" />
                </div>
              ) : (
                <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
              )}
              <span className="font-display text-body font-bold leading-tight text-foreground">
                {item.name}
              </span>
            </div>
            {description && (
              <p className="mt-2 font-display text-caption leading-relaxed text-graphite">
                {description}
              </p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shared: small icon circle + type tag                                */
/* ------------------------------------------------------------------ */
function IconCircle({ icon: Icon, active }: { icon: IconType; active: boolean }) {
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${active
          ? "border-accent bg-accent text-paper"
          : "border-hairline bg-paper text-accent"
        }`}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>
  );
}

function TypeTag({ type }: { type: "skill" | "tool" }) {
  return (
    <span className="rounded-full border border-hairline bg-porcelain/60 px-2.5 py-0.5 font-display text-micro font-semibold text-graphite">
      {type === "skill" ? "Skill" : "Tool"}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */
export function ToolsSkills() {
  const { skills, tools } = site.skillsAndTools;
  const reduceMotion = useReducedMotion();

  const [filter, setFilter] = useState<Filter>("all");
  const [activeId, setActiveId] = useState<string>("skill-0");
  const [mobileIndex, setMobileIndex] = useState(0);

  const deskRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const cards: CardData[] = [
    {
      id: "skill-0",
      type: "skill",
      title: skills[0]?.category || "UX Research & Strategy",
      subtitle: skills[0]?.description || "User discovery, interviews & information architecture",
      icon: Layers,
      items: skills[0]?.items || [],
    },
    {
      id: "skill-1",
      type: "skill",
      title: skills[1]?.category || "UI & Interaction Design",
      subtitle: skills[1]?.description || "Interface systems, design tokens & responsive UI",
      icon: Sparkles,
      items: skills[1]?.items || [],
    },
    {
      id: "skill-2",
      type: "skill",
      title: skills[2]?.category || "Product Thinking & QA",
      subtitle: skills[2]?.description || "Developer handoff, feature specs & design review",
      icon: CheckCircle2,
      items: skills[2]?.items || [],
    },
    {
      id: "tool-0",
      type: "tool",
      title: tools[0]?.category || "Core Design Tools",
      subtitle: "Figma, FigJam, Framer & Adobe CC",
      icon: Wrench,
      items: tools[0]?.items || [],
    },
    {
      id: "tool-1",
      type: "tool",
      title: tools[1]?.category || "Productivity & Collaboration",
      subtitle: "Notion, Miro, Loom & Jira",
      icon: SlidersHorizontal,
      items: tools[1]?.items || [],
    },
    {
      id: "tool-2",
      type: "tool",
      title: tools[2]?.category || "AI & UX Workflow",
      subtitle: "ChatGPT, Claude, Gemini & Relume",
      icon: Sparkles,
      items: tools[2]?.items || [],
    },
  ];

  const filteredCards = cards.filter((c) => {
    if (filter === "skills") return c.type === "skill";
    if (filter === "tools") return c.type === "tool";
    return true;
  });

  // If the active card was filtered out, fall back to the first visible one.
  const resolvedActiveId = filteredCards.some((c) => c.id === activeId)
    ? activeId
    : filteredCards[0]?.id;

  const spring = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 260, damping: 30 };

  const changeFilter = (next: Filter) => {
    setFilter(next);
    setMobileIndex(0);
  };

  /* Desktop: arrow keys move between panels */
  const handlePanelKeys = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const currentIdx = filteredCards.findIndex((c) => c.id === resolvedActiveId);
    const delta = e.key === "ArrowRight" ? 1 : -1;
    const nextIdx = (currentIdx + delta + filteredCards.length) % filteredCards.length;
    setActiveId(filteredCards[nextIdx].id);
    const triggers = deskRef.current?.querySelectorAll<HTMLButtonElement>(
      "[data-panel-trigger]"
    );
    triggers?.[nextIdx]?.focus();
  };

  /* Mobile: track which card is centered */
  const handleTrackScroll = () => {
    const el = trackRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const step = first.offsetWidth + 16; // card width + gap-4
    setMobileIndex(Math.min(filteredCards.length - 1, Math.round(el.scrollLeft / step)));
  };

  const scrollToCard = (i: number) => {
    const el = trackRef.current;
    const target = el?.children[i] as HTMLElement | undefined;
    if (!el || !target) return;
    el.scrollTo({
      left: target.offsetLeft - el.offsetLeft - 16,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section id="skills-tools" className="overflow-hidden border-t border-hairline py-section">
      <div className="shell mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-10">
          <h2 className="font-display text-3xl font-extrabold uppercase leading-none tracking-tight text-foreground sm:text-4xl md:text-5xl">
            EXPLORE <br />
            <span className="text-accent">SKILLS & TOOLS</span>
          </h2>

          <div
            role="group"
            aria-label="Filter skills and tools"
            className="flex items-center gap-1.5 rounded-full border border-hairline bg-paper p-1.5 shadow-sm"
          >
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                aria-pressed={filter === key}
                onClick={() => changeFilter(key)}
                className={`rounded-full px-3.5 py-1.5 font-display text-micro font-semibold uppercase transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${filter === key
                    ? "bg-accent text-paper"
                    : "text-graphite hover:bg-porcelain hover:text-foreground"
                  }`}
              >
                {label}
                {key === "all" ? ` (${cards.length})` : ""}
              </button>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* DESKTOP — expanding horizontal panels                        */}
        {/* ---------------------------------------------------------- */}
        <div
          ref={deskRef}
          onKeyDown={handlePanelKeys}
          className="hidden min-h-[30rem] gap-3 md:flex"
        >
          {filteredCards.map((card) => {
            const isActive = resolvedActiveId === card.id;
            return (
              <motion.div
                key={card.id}
                initial={false}
                animate={{
                  flexGrow: isActive ? 1 : 0,
                  flexBasis: isActive ? "0rem" : "4.5rem",
                }}
                transition={spring}
                className={`relative flex min-w-0 flex-col overflow-hidden rounded-3xl border bg-paper transition-[border-color,box-shadow] duration-300 ${isActive
                    ? "border-accent shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25),0_2px_6px_rgba(0,0,0,0.05)]"
                    : "border-hairline shadow-sm hover:border-accent/40"
                  }`}
              >
                {/* soft wash, existing accent token only */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"
                    }`}
                />

                <button
                  type="button"
                  data-panel-trigger
                  onClick={() => setActiveId(card.id)}
                  aria-expanded={isActive}
                  aria-controls={`panel-${card.id}`}
                  id={`trigger-${card.id}`}
                  className={`relative z-10 flex text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent ${isActive
                      ? "w-full items-center justify-between gap-4 px-7 pb-2 pt-7"
                      : "h-full w-full flex-col items-center justify-between py-5"
                    }`}
                >
                  {isActive ? (
                    <>
                      <span className="flex min-w-0 items-center gap-4">
                        <IconCircle icon={card.icon} active />
                        <span className="min-w-0">
                          <TypeTag type={card.type} />
                          <span className="mt-1.5 block truncate font-display text-xl font-bold text-foreground">
                            {card.title}
                          </span>
                        </span>
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent bg-accent text-paper">
                        <Plus className="h-4 w-4 rotate-45 transition-transform duration-300" aria-hidden="true" />
                      </span>
                    </>
                  ) : (
                    <>
                      <IconCircle icon={card.icon} active={false} />
                      <span className="my-4 min-h-0 flex-1 overflow-hidden font-display text-sm font-bold text-graphite [writing-mode:vertical-rl] rotate-180">
                        <span className="block truncate">{card.title}</span>
                      </span>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-paper text-accent">
                        <Plus className="h-4 w-4 transition-transform duration-300" aria-hidden="true" />
                      </span>
                    </>
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="content"
                      id={`panel-${card.id}`}
                      role="region"
                      aria-labelledby={`trigger-${card.id}`}
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 0.1 } }}
                      transition={{ duration: 0.25, delay: reduceMotion ? 0 : 0.1 }}
                      className="relative z-10 flex min-h-0 flex-1 flex-col px-7 pb-7"
                    >
                      {/* min-width keeps text from reflowing while the panel widens */}
                      <div className="min-w-[26rem]">
                        <p className="mb-5 mt-3 max-w-xl font-display text-body leading-relaxed text-graphite">
                          {card.subtitle}
                        </p>
                        <div className="max-h-[21rem] overflow-y-auto pr-1">
                          <ItemGrid items={card.items} columns="two" animate={!reduceMotion} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ---------------------------------------------------------- */}
        {/* MOBILE — scroll-snap carousel                                */}
        {/* ---------------------------------------------------------- */}
        <div className="md:hidden">
          <div
            key={filter}
            ref={trackRef}
            onScroll={handleTrackScroll}
            tabIndex={0}
            aria-label="Skills and tools carousel"
            className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filteredCards.map((card, i) => {
              const isCurrent = mobileIndex === i;
              return (
                <article
                  key={card.id}
                  className={`relative w-[85%] shrink-0 snap-center overflow-hidden rounded-3xl border bg-paper p-5 transition-[border-color,box-shadow] duration-300 ${isCurrent
                      ? "border-accent shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25)]"
                      : "border-hairline shadow-sm"
                    }`}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent"
                  />
                  <div className="relative">
                    <div className="flex items-center gap-3">
                      <IconCircle icon={card.icon} active={isCurrent} />
                      <div className="min-w-0">
                        <TypeTag type={card.type} />
                        <h3 className="mt-1.5 font-display text-lg font-bold leading-tight text-foreground">
                          {card.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mb-4 mt-4 font-display text-body leading-relaxed text-graphite">
                      {card.subtitle}
                    </p>
                    <ItemGrid items={card.items} columns="one" animate={false} />
                  </div>
                </article>
              );
            })}
          </div>

          {/* Progress pills */}
          <div className="mt-2 flex items-center justify-center gap-2">
            {filteredCards.map((card, i) => (
              <button
                key={card.id}
                type="button"
                onClick={() => scrollToCard(i)}
                aria-label={`Go to ${card.title}`}
                aria-current={mobileIndex === i}
                className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${mobileIndex === i ? "w-6 bg-accent" : "w-1.5 bg-hairline"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};