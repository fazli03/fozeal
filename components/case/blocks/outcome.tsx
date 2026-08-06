import type { Result, ScreenGroup } from '@/content/schema'
import { AssetFrame } from '@/components/system/asset-frame'
import { Measure } from '@/components/system/frame'
import { Pending } from '@/components/system/pending'
import { Block, LabelledList, Prose } from './block'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------- screens --- */

/**
 * Screens are grouped by the job they do, each group introduced by a note that
 * says what to notice — a screenshot with no argument attached is evidence
 * nobody reads. Numbered annotations hang beside each screen so a specific
 * decision can be pointed at directly.
 */
export function ScreensBlock({
  groups,
  columns = 2,
}: {
  groups: ScreenGroup[]
  columns?: 1 | 2
}) {
  const total = groups.reduce((n, g) => n + g.assets.length, 0)

  return (
    <Block frame="Screens" meta={`${total} screens — ${groups.length} groups`}>
      <div className="space-y-24">
        {groups.map((group, gi) => (
          <section key={group.id} id={`screens-${group.id}`} className="scroll-mt-28">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-gutter">
              <div className="lg:col-span-4">
                <div className="border-t-2 border-accent pt-4 lg:sticky lg:top-28">
                  <div className="flex items-center gap-3">
                    <Measure>{String(gi + 1).padStart(2, '0')}</Measure>
                    <h3 className="font-display text-h3">{group.name}</h3>
                  </div>
                  <Prose
                    body={group.note}
                    field={`${group.name} — what to notice`}
                    className="mt-5"
                    lines={3}
                  />
                </div>
              </div>

              <div
                className={cn(
                  'grid gap-10 lg:col-span-8',
                  columns === 2 ? 'sm:grid-cols-2' : 'grid-cols-1',
                )}
              >
                {group.assets.map((a) => (
                  <div key={a.expected}>
                    <AssetFrame
                      asset={a}
                      sizes={
                        columns === 2
                          ? '(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 30vw'
                          : '(max-width: 1024px) 100vw, 60vw'
                      }
                    />
                    <p className="mt-4 font-mono text-micro uppercase text-graphite">{a.alt}</p>

                    {a.annotations ? (
                      <ol className="mt-4 space-y-2 border-l border-hairline pl-4">
                        {a.annotations.map((note, i) => (
                          <li key={i} className="flex gap-3 text-caption text-graphite">
                            <span className="font-mono text-micro text-accent">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            {note}
                          </li>
                        ))}
                      </ol>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </Block>
  )
}

/* -------------------------------------------------------------- result --- */

/**
 * Five separate outputs: outcome, impact, measures of success, reflection, and
 * lessons learned. Kept apart because they answer different questions — what
 * shipped, what changed, how it was judged, what I think now, and what I would
 * do differently.
 */
export function ResultBlock({ result }: { result: Result }) {
  return (
    <Block frame="Result" meta="Outcome, impact, reflection">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-gutter">
        <div className="border-t-2 border-ink pt-5">
          <p className="mb-4 font-mono text-micro uppercase text-graphite">Outcome</p>
          <Prose body={result.outcome} field="Outcome" />
        </div>
        <div className="border-t-2 border-accent pt-5">
          <p className="mb-4 font-mono text-micro uppercase text-graphite">Impact</p>
          <Prose body={result.impact} field="Impact" />
        </div>
      </div>

      {/* Measures of success read as a specification panel, not a stat banner —
          the numbers only mean something next to what they measured. */}
      <div className="mt-16 border-t border-hairline pt-4">
        <p className="font-mono text-micro uppercase text-graphite">Measures of success</p>
        {result.success ? (
          <dl className="mt-6 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {result.success.map((s) => (
              <div key={s.label} className="bg-porcelain p-6">
                <dt className="font-mono text-micro uppercase text-graphite">{s.label}</dt>
                <dd className="mt-3 font-display text-h3 text-accent">{s.value}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <Pending field="Measures of success" lines={2} className="mt-6" />
        )}
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-gutter">
        <div className="border-t border-hairline pt-4">
          <p className="mb-4 font-mono text-micro uppercase text-graphite">Reflection</p>
          <Prose body={result.reflection} field="Reflection" />
        </div>
        <LabelledList label="Lessons learned" items={result.lessons} field="Lessons learned" />
      </div>
    </Block>
  )
}
