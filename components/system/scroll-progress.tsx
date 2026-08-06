'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

/** A one-pixel reading indicator. The only persistent chrome besides the nav. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-50 h-px w-full origin-left bg-accent"
      aria-hidden
    />
  )
}
