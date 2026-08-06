'use client'

import { motion } from 'framer-motion'
import { maskUp, viewportOnce } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * Line-by-line mask reveal for display type. Each line sits in an overflow
 * clip and slides up. The full string is exposed once via aria-label, so the
 * split stays presentational and screen readers hear one heading.
 */
export function SplitLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = 'h2',
}: {
  lines: string[]
  className?: string
  lineClassName?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p'
}) {
  return (
    <Tag className={cn(className)} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]" aria-hidden>
          <motion.span
            className={cn('block', lineClassName)}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={maskUp}
            transition={{ delay: delay + i * 0.075 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
