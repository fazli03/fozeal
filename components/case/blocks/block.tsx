import { FrameLabel } from '@/components/system/frame'
import { Pending } from '@/components/system/pending'
import { Reveal } from '@/components/system/reveal'
import { cn } from '@/lib/utils'
import type { Sourced } from '@/content/schema'

/**
 * Shared wrapper for every case-study block. Keeps the frame-label system and
 * the reveal timing identical across all four layouts, so the layouts differ in
 * composition rather than in chrome.
 */
export function Block({
  id,
  frame,
  meta,
  title,
  children,
  className,
}: {
  id?: string
  frame: string
  meta?: string
  title?: Sourced<string>
  children: React.ReactNode
  className?: string
}) {
  return (
    <Reveal>
      <section id={id} className={cn('scroll-mt-28', className)}>
        <FrameLabel meta={meta} className="mb-8 border-t border-hairline pt-4">
          {frame}
        </FrameLabel>
        {title !== undefined ? (
          title ? (
            <h2 className="mb-8 max-w-[20ch] font-display text-h2">{title}</h2>
          ) : (
            <div className="mb-8">
              <Pending field={`${frame} — heading`} lines={1} />
            </div>
          )
        ) : null}
        {children}
      </section>
    </Reveal>
  )
}

/** Paragraph stack with a designed empty state. */
export function Prose({
  body,
  field,
  className,
  lines = 3,
}: {
  body: Sourced<string[]>
  field: string
  className?: string
  lines?: number
}) {
  if (!body) return <Pending field={field} lines={lines} className={className} />
  return (
    <div className={cn('space-y-5', className)}>
      {body.map((para, i) => (
        <p key={i} className="max-w-measure text-body text-graphite">
          {para}
        </p>
      ))}
    </div>
  )
}

/** Hanging-label list — used wherever the audit calls for an enumerated set. */
export function LabelledList({
  label,
  items,
  field,
  className,
}: {
  label: string
  items: Sourced<string[]>
  field: string
  className?: string
}) {
  return (
    <div className={cn('border-t border-hairline pt-4', className)}>
      <p className="font-mono text-micro uppercase text-graphite">{label}</p>
      {items ? (
        <ul className="mt-4 space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex gap-3 text-body">
              <span className="mt-[0.6em] h-1 w-1 shrink-0 bg-accent" aria-hidden />
              <span className="text-graphite">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <Pending field={field} lines={2} className="mt-4" />
      )}
    </div>
  )
}
