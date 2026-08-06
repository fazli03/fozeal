import { cn } from '@/lib/utils'

/**
 * The honest empty state.
 *
 * Copy that must be transcribed from an approved design file is never
 * invented. Until the file exists, this renders in its place: quiet, obviously
 * unfinished, and specific about what is missing. An empty screen is an
 * invitation to act, so it names the file and the field.
 */
export function Pending({
  field,
  source = 'the approved design file',
  lines = 2,
  className,
}: {
  field: string
  source?: string
  lines?: number
  className?: string
}) {
  return (
    <div className={cn('max-w-measure', className)} data-pending={field}>
      <div className="space-y-2" aria-hidden>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className="block h-[0.7em] bg-hairline/70"
            style={{ width: `${100 - i * 14}%` }}
          />
        ))}
      </div>
      <p className="mt-3 font-mono text-micro uppercase text-graphite/70">
        {field} — awaiting {source}
      </p>
    </div>
  )
}

/** Inline variant for short values inside metadata rows. */
export function PendingInline({ field }: { field: string }) {
  return (
    <span className="font-mono text-caption text-graphite/60" data-pending={field}>
      &mdash;
    </span>
  )
}
