'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import type { Project, ScreenGroup } from '@/content/schema'
import { AssetFrame } from '@/components/system/asset-frame'
import { Measure } from '@/components/system/frame'
import { ProblemSolutionBlock } from './blocks/narrative'
import { Block, Prose } from './blocks/block'

/**
 * The case-study body — one composition for all four projects.
 *
 * The site used to give each project its own layout and its own motion idea: a
 * pinned rail, a horizontal track, an editorial indent, a drifting fleet. Read
 * back to back they felt like four different sites, so the fleet won and the
 * other three were dropped. Every project now reads the same way: the argument
 * first, then the evidence rising past it.
 *
 * Only the identity colour changes between projects.
 */
export function CaseBody({ project }: { project: Project }) {
  return (
    <>
      <div className="shell py-section">
        <ProblemSolutionBlock problems={project.problems} solutions={project.solutions} />
      </div>

      <div className="pb-section-sm">
        <ScreenFleet groups={project.screens} />
      </div>
    </>
  )
}

/**
 * Screens rising at different rates, grouped by the job they do.
 *
 * Four drift rates cycle across the set so the group never reads as a rigid
 * row. The rates are deliberately small — this is a survey of the work, not a
 * showreel — and `useReducedMotion` drops them entirely for anyone who has
 * asked the OS to stop animating things.
 */
function ScreenFleet({ groups }: { groups: ScreenGroup[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })

  const drifts = [
    useTransform(scrollYProgress, [0, 1], [70, -70]),
    useTransform(scrollYProgress, [0, 1], [-30, 30]),
    useTransform(scrollYProgress, [0, 1], [110, -110]),
    useTransform(scrollYProgress, [0, 1], [10, -50]),
  ]

  const total = groups.reduce((n, g) => n + g.assets.length, 0)
  let cursor = -1

  return (
    <div ref={ref} className="shell">
      <Block frame="Screens" meta={`${total} screens — ${groups.length} groups`} id="screens">
        {/* Groups sit closer than they did: the drift already separates them
            visually, so the gap only has to keep them from colliding. */}
        <div className="space-y-16 lg:space-y-20">
          {groups.map((group, gi) => (
            // Keyed by position as well as id: two groups sharing an id would
            // otherwise collide and React would reuse the wrong subtree.
            <section
              key={`${group.id}-${gi}`}
              id={`screens-${group.id}`}
              className="scroll-mt-28"
            >
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-gutter">
                <div className="lg:col-span-4">
                  <div className="border-t-2 border-accent pt-4">
                    <div className="flex items-center gap-3">
                      <Measure>{String(gi + 1).padStart(2, '0')}</Measure>
                      <h3 className="font-display text-h3">{group.name}</h3>
                    </div>
                    {/* Silent when empty. Elsewhere a missing field shows an
                        "awaiting source" placeholder so the gap stays visible,
                        but a screen group reads perfectly well as a title over
                        its screens — the note is an addition, not a hole. */}
                    {group.note?.length ? (
                      <Prose
                        body={group.note}
                        field={`${group.name} — what to notice`}
                        className="mt-5"
                        lines={3}
                      />
                    ) : null}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:col-start-6 lg:gap-gutter">
                  {group.assets.map((asset, ai) => {
                    cursor += 1
                    /* The first screen of a group anchors it: no drift, no
                       stagger, so the accent rule above the group title lines
                       up with the top edge of the evidence. Everything after it
                       floats, which is where the fleet reads as a fleet — an
                       anchor with drifters around it, rather than a whole row
                       sliding out of alignment with its own heading. */
                    const anchored = ai === 0
                    const drift = drifts[cursor % drifts.length]
                    /* One screen needs no label — the group title above it is
                       already its name. From two upwards the reader has to be
                       able to tell them apart, so the caption comes back. */
                    const labelled = group.assets.length > 1
                    return (
                      <motion.div
                        key={asset.expected}
                        style={reduced || anchored ? undefined : { y: drift }}
                        className={!anchored && ai % 2 === 1 ? 'lg:mt-14' : undefined}
                      >
                        <AssetFrame asset={asset} sizes="(max-width: 1024px) 45vw, 26vw" />
                        {labelled ? (
                          <p className="mt-4 font-mono text-micro uppercase text-graphite">
                            {asset.alt}
                          </p>
                        ) : null}
                        {asset.annotations ? (
                          <ol className="mt-3 space-y-2 border-l border-hairline pl-4">
                            {asset.annotations.map((note, i) => (
                              <li key={i} className="text-caption text-graphite">
                                <span className="mr-2 font-mono text-micro text-accent">
                                  {String(i + 1).padStart(2, '0')}
                                </span>
                                {note}
                              </li>
                            ))}
                          </ol>
                        ) : null}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </section>
          ))}
        </div>
      </Block>
    </div>
  )
}
