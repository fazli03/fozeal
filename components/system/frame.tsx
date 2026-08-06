import { cn } from '@/lib/utils'

/**
 * The signature device.
 *
 * A designer's canvas names every frame. This site does the same: each region
 * carries its own label, and the labels together read as the document outline.
 * It is wayfinding borrowed from the subject's own tools, so it earns its place
 * — it tells you where you are, and it says what this person does for a living.
 */
export function FrameLabel({
  children,
  meta,
  className,
}: {
  children: React.ReactNode
  meta?: string
  className?: string
}) {
  return (
    <div className={cn('flex items-baseline justify-between gap-4', className)}>
      <span className="frame-label">{children}</span>
      {meta ? (
        <span className="font-mono text-micro uppercase text-graphite/70">{meta}</span>
      ) : null}
    </div>
  )
}

/** A measurement chip, as a design tool draws one against a selection. */
export function Measure({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center bg-accent px-1.5 py-0.5 font-mono text-[10px] uppercase leading-none tracking-wider text-paper',
        className,
      )}
    >
      {children}
    </span>
  )
}

/** A titled region. Every major band of the page uses this. */
export function Region({
  id,
  frame,
  meta,
  children,
  className,
  labelClassName,
}: {
  id?: string
  frame: string
  meta?: string
  children: React.ReactNode
  className?: string
  labelClassName?: string
}) {
  return (
    <section id={id} className={cn('py-section', className)}>
      <div className="shell">
        <FrameLabel meta={meta} className={cn('mb-10 border-t border-hairline pt-4', labelClassName)}>
          {frame}
        </FrameLabel>
        {children}
      </div>
    </section>
  )
}
