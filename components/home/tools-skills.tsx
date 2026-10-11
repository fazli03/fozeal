"use client";

import { useMemo, useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Layers, Sparkles, CheckCircle2, Wrench, SlidersHorizontal, Bot } from "lucide-react";
import { site } from "@/content/site";
import { IconMark } from "@/components/system/icon-mark";

type IconType = ComponentType<{ className?: string }>;
type Filter = "all" | "skill" | "tool";

interface CardData {
  id: string;
  type: "skill" | "tool";
  title: string;
  subtitle: string;
  icon: IconType;
  items: ReadonlyArray<any>;
}

const SKILL_ICONS: IconType[] = [Layers, Sparkles, CheckCircle2];
const TOOL_ICONS: IconType[] = [Wrench, SlidersHorizontal, Bot];

// Tools have no description in the content file, so fall back to the first few names.
const summarize = (items: ReadonlyArray<any> = []) =>
  items
    .slice(0, 4)
    .map((i) => i.name)
    .join(", ");

/* ------------------------------------------------------------------ */

function IconCircle({ icon: Icon, active, large }: { icon: IconType; active: boolean; large?: boolean }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${
        large ? "h-12 w-12" : "h-8 w-8"
      } ${
        active
          ? "border-accent/30 bg-accent/10 text-accent"
          : "border-hairline bg-porcelain/60 text-graphite"
      }`}
    >
      <Icon className={large ? "h-5 w-5" : "h-4 w-4"} aria-hidden="true" />
    </span>
  );
}

function ItemCell({ item, index, animate, type }: { item: any; index: number; animate: boolean; type: "skill" | "tool" }) {
  const icon = "icon" in item ? item.icon : undefined;
  const description = item.desc || item.role;

  return (
    <motion.li
      initial={animate ? { opacity: 0, y: 6 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={
        animate
          ? { duration: 0.28, delay: 0.05 + index * 0.03, ease: [0.16, 1, 0.3, 1] }
          : { duration: 0 }
      }
      className="bg-paper p-4 transition-colors hover:bg-porcelain/50"
    >
      <div className="flex items-start gap-3">
        {/* Leading icon — shown only for tool items */}
        {type === "tool" && (
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-hairline/60 bg-porcelain/40 shadow-sm">
            {icon ? (
              <IconMark
                icon={icon}
                size={40}
                fill
                decorative
              />
            ) : (
              <span className="m-auto h-2.5 w-2.5 rounded-full bg-accent/60" />
            )}
          </span>
        )}

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h4 className="truncate font-display text-body font-bold leading-tight text-foreground">
              {item.name}
            </h4>

            {item.level && (
              <span className="inline-flex shrink-0 rounded-full border border-hairline bg-paper px-2.5 py-1 font-display text-micro font-medium text-graphite">
                {item.level}
              </span>
            )}
          </div>

          {description && (
            <p className="mt-1.5 font-display text-caption leading-relaxed text-graphite">
              {description}
            </p>
          )}
        </div>
      </div>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */

export function ToolsSkills() {
  const { skills, tools } = site.skillsAndTools;
  const reduceMotion = useReducedMotion();

  const cards = useMemo<CardData[]>(
    () => [
      ...skills.map((s: any, i: number) => ({
        id: `skill-${i}`,
        type: "skill" as const,
        title: s.category,
        subtitle: s.description ?? summarize(s.items),
        icon: SKILL_ICONS[i % SKILL_ICONS.length],
        items: s.items ?? [],
      })),
      ...tools.map((t: any, i: number) => ({
        id: `tool-${i}`,
        type: "tool" as const,
        title: t.category,
        subtitle: t.description ?? summarize(t.items),
        icon: TOOL_ICONS[i % TOOL_ICONS.length],
        items: t.items ?? [],
      })),
    ],
    [skills, tools]
  );

  const [filter, setFilter] = useState<Filter>("all");
  const [activeId, setActiveId] = useState<string>(cards[0]?.id ?? "");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const visible = cards.filter((c) => filter === "all" || c.type === filter);
  const active = visible.find((c) => c.id === activeId) ?? visible[0];

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: cards.length },
    { key: "skill", label: "Skills", count: cards.filter((c) => c.type === "skill").length },
    { key: "tool", label: "Tools", count: cards.filter((c) => c.type === "tool").length },
  ];

  const select = (id: string, focus = false) => {
    setActiveId(id);
    const el = tabRefs.current[id];
    if (focus) el?.focus();
    el?.scrollIntoView({ inline: "center", block: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
  };

  const onTabKeys = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key) || !active) return;
    e.preventDefault();
    const idx = visible.findIndex((c) => c.id === active.id);
    let next = idx;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (idx + 1) % visible.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (idx - 1 + visible.length) % visible.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = visible.length - 1;
    select(visible[next].id, true);
  };

  return (
    <section id="skills-tools" className="overflow-hidden border-t border-hairline py-section">
      <div className="shell mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-10">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Skills and tools
            </h2>
            <p className="mt-3 font-display text-body leading-relaxed text-graphite">
              The methods I rely on, and the tools I use to turn them into shipped work.
            </p>
          </div>

          <div
            role="group"
            aria-label="Filter skills and tools"
            className="flex items-center gap-1 rounded-full border border-hairline bg-paper p-1 shadow-sm"
          >
            {filters.map(({ key, label, count }) => (
              <button
                key={key}
                type="button"
                aria-pressed={filter === key}
                onClick={() => {
                  setFilter(key);
                  const first = cards.find((c) => key === "all" || c.type === key);
                  if (first && !(active && (key === "all" || active.type === key))) setActiveId(first.id);
                }}
                className={`rounded-full px-3.5 py-1.5 font-display text-caption font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${filter === key
                  ? "bg-accent text-paper"
                  : "text-graphite hover:bg-porcelain hover:text-foreground"
                  }`}
              >
                {label}
                <span className={`ml-1.5 ${filter === key ? "text-paper/70" : "text-graphite/60"}`}>{count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Master / detail */}
        <div className="grid gap-5 lg:grid-cols-[19rem_minmax(0,1fr)] lg:gap-8">
          {/* Category list (horizontal scroll on mobile, vertical on desktop) */}
          <div
            role="tablist"
            aria-label="Skill and tool categories"
            onKeyDown={onTabKeys}
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden"
          >
            {visible.map((card) => {
              const isActive = active?.id === card.id;
              return (
                <button
                  key={card.id}
                  ref={(el) => {
                    tabRefs.current[card.id] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`ts-tab-${card.id}`}
                  aria-selected={isActive}
                  aria-controls="ts-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => select(card.id)}
                  className="relative flex shrink-0 items-center gap-3 rounded-2xl px-3.5 py-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:w-full"
                >
                  {isActive && (
                    <motion.span
                      layoutId="ts-active"
                      transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                      className="absolute inset-0 rounded-2xl border border-accent bg-paper shadow-[0_12px_28px_-16px_rgba(0,0,0,0.3)]"
                    />
                  )}
                  <span className="relative z-10 flex w-full items-center gap-3">
                    <IconCircle icon={card.icon} active={isActive} />
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block whitespace-nowrap font-display text-sm font-bold leading-tight transition-colors lg:whitespace-normal ${isActive ? "text-foreground" : "text-graphite"
                          }`}
                      >
                        {card.title}
                      </span>
                      <span className="mt-0.5 hidden font-display text-micro text-graphite/70 lg:block">
                        {card.type === "skill" ? "Skill" : "Tool"} · {card.items.length}{" "}
                        {card.items.length === 1 ? "item" : "items"}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div
            role="tabpanel"
            id="ts-panel"
            aria-labelledby={active ? `ts-tab-${active.id}` : undefined}
            tabIndex={0}
            className="relative min-h-[26rem] overflow-hidden rounded-3xl border border-hairline bg-paper p-5 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:p-7"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent"
            />
            <AnimatePresence mode="wait" initial={false}>
              {active && (
                <motion.div
                  key={active.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  <div className="flex items-start gap-4">
                    <IconCircle icon={active.icon} active large />
                    <div className="min-w-0">
                      <span className="inline-block rounded-full border border-hairline bg-porcelain/60 px-2.5 py-0.5 font-display text-micro font-semibold text-graphite">
                        {active.type === "skill" ? "Skill" : "Tool"}
                      </span>
                      <h3 className="mt-1.5 font-display text-xl font-bold leading-tight text-foreground sm:text-2xl">
                        {active.title}
                      </h3>
                    </div>
                  </div>

                  {active.subtitle && (
                    <p className="mt-4 max-w-xl font-display text-body leading-relaxed text-graphite">
                      {active.subtitle}
                    </p>
                  )}

                  <ul className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
                    {active.items.map((item, i) => (
                      <ItemCell key={item.name} item={item} index={i} animate={!reduceMotion} type={active.type} />
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}