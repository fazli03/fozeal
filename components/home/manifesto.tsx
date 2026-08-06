"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { FrameLabel } from "@/components/system/frame";

const STATEMENT =
  "Design starts with understanding, not decorating. Every interface I create is shaped by user needs, clear structure, and thoughtful decisions.";

/**
 * Scroll-linked reading: words brighten as they pass the middle of the
 * viewport. Used exactly once on the site, on the one paragraph that argues
 * the point of view — so the effect reads as emphasis, not as a tic.
 */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = STATEMENT.split(" ");

  // One paragraph carrying the argument — the only band on the home page that
  // keeps the larger measure of air around it.
  return (
    <section className="border-t border-hairline py-section-lg">
      <div className="shell">
        <FrameLabel meta="" className="mb-12">
          Approach
        </FrameLabel>

        <p
          ref={ref}
          className="max-w-[22ch] font-display text-h2 md:max-w-[26ch]"
          aria-label={STATEMENT}
        >
          {words.map((word, i) => (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1.6) / words.length]}
              reduced={!!reduced}
            >
              {word}
            </Word>
          ))}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  progress,
  range,
  reduced,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  reduced: boolean;
}) {
  const opacity = useTransform(progress, range, [0.22, 1]);
  return (
    <span className="inline-block" aria-hidden>
      <motion.span
        style={reduced ? undefined : { opacity }}
        className="inline-block"
      >
        {children}
      </motion.span>
      <span>&nbsp;</span>
    </span>
  );
}
