import { ArrowUpRight, Github } from 'lucide-react'
import type { ProjectMeta } from '@/content/schema'
import { FrameLabel } from '@/components/system/frame'
import { cn } from '@/lib/utils'

/**
 * The specification sheet.
 *
 * Thirteen fields, always visible, never collapsed into prose and never hidden
 * behind a disclosure. Presented as a blueprint panel rather than a card grid:
 * hanging mono labels on a hairline rail, corner ticks, and a monospaced column
 * that reads like a drawing's title block — the place an engineer or a
 * recruiter looks first for the facts of a job.
 */

type Row = { label: string; value: string | null }

function rows(meta: ProjectMeta): Row[] {
  return [
    { label: 'Category', value: meta.category },
    { label: 'Platform', value: meta.platform },
    { label: 'Role', value: meta.role?.join(', ') ?? null },
    { label: 'Team', value: meta.team },
    { label: 'Duration', value: meta.duration },
    { label: 'Timeline', value: meta.timeline },
    { label: 'Tools', value: meta.tools?.join(', ') ?? null },
    { label: 'Design method', value: meta.designMethod },
    { label: 'Deliverables', value: meta.deliverables?.join(', ') ?? null },
    { label: 'Status', value: meta.status },
    { label: 'Year', value: meta.year },
  ]
}

function Value({ row }: { row: Row }) {
  if (row.value) return <span className="text-caption leading-relaxed">{row.value}</span>
  return (
    <span className="font-mono text-micro uppercase text-graphite/55" data-pending={row.label}>
      awaiting source
    </span>
  )
}

/** Corner ticks — the panel reads as a drawn plate, not a box. */
function Ticks() {
  return (
    <span aria-hidden>
      {[
        'left-0 top-0 border-l border-t',
        'right-0 top-0 border-r border-t',
        'left-0 bottom-0 border-b border-l',
        'right-0 bottom-0 border-b border-r',
      ].map((pos) => (
        <span key={pos} className={cn('pointer-events-none absolute h-3 w-3 border-accent', pos)} />
      ))}
    </span>
  )
}

/** Vertical rail — used where the layout has a sticky column to spare. */
export function SpecSheet({
  meta,
  className,
  inverted = false,
}: {
  meta: ProjectMeta
  className?: string
  inverted?: boolean
}) {
  return (
    <aside
      className={cn('relative bg-paper p-6 lg:p-8', className)}
      aria-label="Project specification"
    >
      <Ticks />
      <FrameLabel meta="13 fields" className="mb-6">
        Specification
      </FrameLabel>

      <dl className="divide-y divide-hairline">
        {rows(meta).map((row) => (
          <div key={row.label} className="grid grid-cols-[7.5rem_1fr] gap-4 py-3">
            <dt className="font-mono text-micro uppercase text-graphite">{row.label}</dt>
            <dd>
              <Value row={row} />
            </dd>
          </div>
        ))}
      </dl>

      <ProtoLinks meta={meta} className="mt-6" inverted={inverted} />
    </aside>
  )
}

/** Horizontal strip — used where the layout runs wide instead of columnar. */
export function SpecStrip({ meta, className }: { meta: ProjectMeta; className?: string }) {
  return (
    <section
      className={cn('relative border-y border-hairline py-10', className)}
      aria-label="Project specification"
    >
      <FrameLabel meta="13 fields" className="mb-8">
        Specification
      </FrameLabel>
      <dl className="grid grid-cols-2 gap-x-gutter gap-y-7 sm:grid-cols-3 lg:grid-cols-6">
        {rows(meta).map((row) => (
          <div key={row.label} className="border-t border-hairline pt-3">
            <dt className="font-mono text-micro uppercase text-graphite">{row.label}</dt>
            <dd className="mt-2">
              <Value row={row} />
            </dd>
          </div>
        ))}
      </dl>
      <ProtoLinks meta={meta} className="mt-10" />
    </section>
  )
}

/**
 * Prototype and repository links, always presented as primary actions rather
 * than buried in a metadata row — the audit is explicit that they must never
 * be hidden.
 */
export function ProtoLinks({
  meta,
  className,
  inverted = false,
}: {
  meta: ProjectMeta
  className?: string
  inverted?: boolean
}) {
  const hasAny = meta.prototypeUrl || meta.repositoryUrl

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {meta.prototypeUrl ? (
        <a
          href={meta.prototypeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex h-12 items-center gap-2 px-6 font-mono text-micro uppercase transition-colors duration-300',
            inverted
              ? 'bg-porcelain text-ink hover:bg-accent hover:text-paper'
              : 'bg-ink text-porcelain hover:bg-accent',
          )}
        >
          Open prototype
          <ArrowUpRight size={14} aria-hidden />
        </a>
      ) : null}

      {meta.repositoryUrl ? (
        <a
          href={meta.repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center gap-2 border border-ink/25 px-6 font-mono text-micro uppercase transition-colors duration-300 hover:border-accent hover:text-accent"
        >
          <Github size={14} aria-hidden />
          Repository
        </a>
      ) : null}

      {!hasAny ? (
        <p className="font-mono text-micro uppercase text-graphite/55">
          Prototype link — awaiting source
        </p>
      ) : null}
    </div>
  )
}
