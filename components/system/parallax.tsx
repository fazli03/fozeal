'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

/** Scroll-linked vertical drift. Distance is small on purpose. */
export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: React.ReactNode
  className?: string
  distance?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  return (
    <div ref={ref} className={cn(className)}>
      <motion.div style={reduced ? undefined : { y }}>{children}</motion.div>
    </div>
  )
}
