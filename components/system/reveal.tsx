'use client'

import { motion } from 'framer-motion'
import { riseIn, stagger, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

/** Scroll-triggered rise — the default reveal across the site. */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{ hidden: {}, show: { transition: { delayChildren: delay } } }}
    >
      <motion.div variants={riseIn}>{children}</motion.div>
    </motion.div>
  )
}

/** Reveals children one after another on the shared curve. */
export function RevealGroup({
  children,
  className,
  delay = 0,
  each = 0.08,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  each?: number
}) {
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(delay, each)}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={riseIn}>
      {children}
    </motion.div>
  )
}
