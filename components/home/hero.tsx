"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { site } from "@/content/site";
import { about } from "@/content/about";
import { AssetFrame } from "@/components/system/asset-frame";
import { Parallax } from "@/components/system/parallax";
import { FrameLabel, Measure } from "@/components/system/frame";
import { ease, duration } from "@/lib/motion";

/**
 * The hero states the thesis, not the name. A recruiter scanning for three
 * seconds needs to know what this person does before they need to know who
 * they are — so the discipline is set at display size and the name sits in
 * the spec column beneath it, where identifying data belongs.
 */
export function Hero() {
  const words = ["UI/UX", "Designer"];

  // Tighter above the fold than the other pages: every pixel of top space here
  // is a pixel the portrait cannot use before it runs off-screen.
  return (
    <section className="relative overflow-hidden pb-section pt-24 md:pt-28">
      <div
        className="canvas-grid pointer-events-none absolute inset-0 -z-10"
        aria-hidden
      />

      <div className="shell">
        <FrameLabel meta="Depok, ID" className="border-t border-hairline pt-4">
          2026
        </FrameLabel>

        {/* Seven columns of statement against five of portrait, vertically
            centred against each other. The portrait carries real weight here
            rather than sitting as a thumbnail beside the type. */}
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
                  className="block overflow-hidden pb-[0.06em]"
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
              initial={{ opacity: 0, y: 14 }}
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

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: duration.base, ease, delay: 0.85 }}
              className="mt-12 flex items-center gap-3 font-mono text-micro uppercase text-graphite"
            >
              <motion.span
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="inline-flex"
              >
                <ArrowDown size={14} aria-hidden />
              </motion.span>
              Four projects below
            </motion.div>
          </div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.slow, ease, delay: 0.35 }}
            className="lg:col-span-5"
          >
            {/* Small drift: this image is above the fold on load, so anything
                larger pushes its bottom edge off-screen before the visitor has
                scrolled at all. */}
            <Parallax distance={16}>
              <AssetFrame
                asset={about.portrait}
                priority
                /* The plate fills its column here instead of stopping at the
                   file's own pixel width — the hero is the one place the image
                   has to carry the page. */
                constrainToSource={false}
                /* A safety net, not a size. On an ordinary screen this cap sits
                   above the column width and does nothing, so the portrait
                   fills its five columns; only on a genuinely short viewport
                   does it scale the whole frame down rather than let the bottom
                   edge fall past the fold. Capping width rather than height is
                   what keeps the photograph whole instead of cropped — 0.958 is
                   the file's own 801:836 ratio, converting the height budget
                   into a width. `svh` so a mobile toolbar cannot change the
                   sum, and 15rem is the hero's real top and bottom space. */
                className="lg:ml-auto lg:max-w-[calc((100svh-15rem)*0.958)]"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </Parallax>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
