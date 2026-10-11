"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { Lanyard } from "@/app/about/profile-story-card"; // sesuaikan path
import { FrameLabel, Measure } from "@/components/system/frame";
import { ease, duration } from "@/lib/motion";

export function Hero() {
  const words = ["UI/UX", "Designer"];

  return (
    <section className="relative overflow-hidden pb-10 pt-24 md:pb-14 md:pt-4">
      <div
        className="canvas-grid pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />

      <div className="shell">


        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-gutter">
          {/* Display statement */}
          <div className="lg:col-span-7">
            <h1
              className="font-display text-h1 uppercase"
              style={{ fontVariationSettings: "'wdth' 122" }}
              aria-label={`${words.join(" ")} — UI and UX`}
            >
              {words.map((word, i) => (
                <span
                  key={word}
                  className="block overflow-hidden pb-[0.01em]"
                  aria-hidden
                >
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: duration.slow,
                      ease,
                      delay: 0.15 + i * 0.09,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.base, ease, delay: 0.55 }}
              className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-hairline pt-6"
            >
              <Measure>UI / UX</Measure>
              <span className="font-mono text-micro uppercase text-graphite">
                {site.author}
              </span>
              <span
                className="hidden h-3 w-px bg-hairline sm:block"
                aria-hidden
              />
              <span className="font-mono text-micro uppercase text-graphite">
                {site.location}
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: duration.base, ease, delay: 0.65 }}
              className="mt-8 max-w-measure text-lead text-graphite"
            >
              {site.thesis}
            </motion.p>
          </div>

          {/* Lanyard menggantikan portrait */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: duration.slow, ease, delay: 0.35 }}
            className="lg:col-span-5"
          >
            <Lanyard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}