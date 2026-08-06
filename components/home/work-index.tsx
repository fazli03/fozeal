'use client'

import Link from 'next/link'
import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/content/projects'
import { AssetFrame } from '@/components/system/asset-frame'
import { FrameLabel } from '@/components/system/frame'
import { accentStyle } from '@/lib/utils'
import { ease } from '@/lib/motion'

/**
 * The work index is a list, not a grid of cards. A list lets the titles run at
 * display size and lets each project take over the row with its own colour on
 * hover — the first time a visitor meets that project's identity. The preview
 * tracks the cursor so the evidence appears without a click, but it is purely
 * decorative: the row itself is the link, and it works from the keyboard.
 */
export function WorkIndex() {
  const [active, setActive] = useState<number | null>(null)
  const wrap = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 160, damping: 22, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 160, damping: 22, mass: 0.5 })

  const onMove = (e: React.MouseEvent) => {
    const rect = wrap.current?.getBoundingClientRect()
    if (!rect) return
    x.set(e.clientX - rect.left - 200)
    y.set(e.clientY - rect.top - 130)
  }

  // Four tall rows are already dense, so the band around them stays tight and
  // the rows themselves supply the rhythm.
  return (
    <section id="work" className="py-section-sm">
      <div className="shell">
        <FrameLabel meta={`${projects.length} projects`} className="mb-10 border-t border-hairline pt-4">
          Selected work
        </FrameLabel>
      </div>

      <div ref={wrap} onMouseMove={onMove} className="relative">
        {/* Cursor-tracked preview — decorative, hidden from assistive tech and
            from touch devices, where there is no cursor to track. */}
        <AnimatePresence>
          {active !== null && (
            <motion.div
              key={active}
              aria-hidden
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease }}
              style={{ x: sx, y: sy }}
              className="pointer-events-none absolute left-0 top-0 z-20 hidden w-[400px] lg:block"
            >
              <AssetFrame asset={projects[active].cover} sizes="400px" />
            </motion.div>
          )}
        </AnimatePresence>

        <ul className="border-t border-hairline">
          {projects.map((project, i) => (
            <li key={project.slug} style={accentStyle(project.accent)}>
              <Link
                href={`/work/${project.slug}`}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="group relative block border-b border-hairline"
              >
                {/* Accent wash sweeps in from the left on hover. */}
                <span
                  className="absolute inset-0 origin-left scale-x-0 bg-accent/[0.07] transition-transform duration-700 ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  aria-hidden
                />

                <div className="shell relative flex flex-col gap-4 py-8 md:flex-row md:items-center md:gap-gutter md:py-10">
                  <span className="font-mono text-micro text-graphite md:w-16">{project.index}</span>

                  <h3
                    className="font-display text-h2 leading-none transition-colors duration-500 group-hover:text-accent md:flex-1"
                    style={{ fontVariationSettings: "'wdth' 108" }}
                  >
                    {project.title}
                  </h3>

                  <span className="font-mono text-micro uppercase text-graphite md:w-72">
                    {project.category}
                  </span>

                  <ArrowUpRight
                    size={22}
                    aria-hidden
                    className="text-graphite transition-all duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
                  />
                </div>

                {/* Cover shows inline where there is no cursor to follow. */}
                <div className="shell pb-8 lg:hidden">
                  <AssetFrame asset={project.cover} sizes="100vw" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
