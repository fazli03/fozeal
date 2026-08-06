import type { DesignDecision, Research } from '@/content/schema'
import { AssetFrame } from '@/components/system/asset-frame'
import { Measure } from '@/components/system/frame'
import { Pending } from '@/components/system/pending'
import { Block, LabelledList, Prose } from './block'

/* ------------------------------------------------------------ research --- */

/**
 * Six research outputs, each kept as its own named block: goals, methods,
 * insights, pain points, findings, opportunities. They are presented as an
 * annotation strip — hanging mono labels against hairline rules — because
 * research is reference material a reader scans, not a narrative they read
 * front to back.
 */
export function ResearchBlock({ research }: { research: Research }) {
  return (
    <Block frame="User research" meta="Goals, methods, findings">
      <div className="grid gap-10 lg:grid-cols-3 lg:gap-gutter">
        <LabelledList label="Research goals" items={research.goals} field="Research goals" />

        <div className="border-t border-hairline pt-4">
          <p className="font-mono text-micro uppercase text-graphite">Methods</p>
          {research.methods ? (
            <ul className="mt-4 space-y-5">
              {research.methods.map((m) => (
                <li key={m.name}>
                  <p className="text-caption font-medium">{m.name}</p>
                  <p className="mt-1 text-caption text-graphite">{m.detail}</p>
                </li>
              ))}
            </ul>
          ) : (
            <Pending field="Research methods" lines={3} className="mt-4" />
          )}
        </div>

        <div className="border-t border-hairline pt-4">
          <p className="font-mono text-micro uppercase text-graphite">Participants</p>
          {research.participants ? (
            <p className="mt-4 text-caption text-graphite">{research.participants}</p>
          ) : (
            <Pending field="Participants" lines={2} className="mt-4" />
          )}
        </div>
      </div>

      {/* Pain points get more room — they are the bridge to the problems. */}
      <div className="mt-16 border-t border-hairline pt-4">
        <p className="font-mono text-micro uppercase text-graphite">Pain points</p>
        {research.painPoints ? (
          <ol className="mt-6 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
            {research.painPoints.map((pp, i) => (
              <li key={pp.title} className="bg-porcelain p-6">
                <Measure>{String(i + 1).padStart(2, '0')}</Measure>
                <h3 className="mt-4 font-display text-h3">{pp.title}</h3>
                <p className="mt-3 text-caption text-graphite">{pp.detail}</p>
              </li>
            ))}
          </ol>
        ) : (
          <Pending field="Pain points" lines={3} className="mt-4" />
        )}
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-gutter">
        <LabelledList label="Insights" items={research.insights} field="Insights" />
        <LabelledList label="Findings" items={research.findings} field="Findings" />
        <LabelledList label="Opportunities" items={research.opportunities} field="Opportunities" />
      </div>

      {research.assets?.length ? (
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {research.assets.map((a) => (
            <AssetFrame key={a.expected} asset={a} sizes="(max-width: 768px) 100vw, 45vw" />
          ))}
        </div>
      ) : null}
    </Block>
  )
}

/* ----------------------------------------------------------- decisions --- */

/**
 * Design decisions in three parts: what was decided, why, and what was rejected
 * instead. The rejected alternative is the part that proves the decision was a
 * decision rather than a default, so it gets its own labelled slot and is never
 * folded into the rationale.
 */
export function DecisionsBlock({ decisions }: { decisions: DesignDecision[] }) {
  return (
    <Block frame="Design decisions" meta={`${decisions.length} decisions — and why`}>
      <ol className="space-y-16">
        {decisions.map((d) => (
          <li key={d.no} className="grid gap-10 lg:grid-cols-12 lg:gap-gutter">
            <div className="lg:col-span-5">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-micro text-accent">{d.no}</span>
                {d.title ? (
                  <h3 className="font-display text-h3">{d.title}</h3>
                ) : (
                  <Pending field={`Decision ${d.no} — title`} lines={1} />
                )}
              </div>

              <div className="mt-6 border-t border-hairline pt-4">
                <p className="font-mono text-micro uppercase text-graphite">Decision</p>
                {d.decision ? (
                  <p className="mt-3 text-body text-graphite">{d.decision}</p>
                ) : (
                  <Pending field={`Decision ${d.no} — what was designed`} lines={2} className="mt-3" />
                )}
              </div>

              <div className="mt-8 border-t-2 border-accent pt-4">
                <p className="font-mono text-micro uppercase text-accent">Why</p>
                <Prose
                  body={d.rationale}
                  field={`Decision ${d.no} — rationale`}
                  className="mt-3"
                />
              </div>

              <div className="mt-8 border-t border-hairline pt-4">
                <p className="font-mono text-micro uppercase text-graphite">Considered instead</p>
                {d.alternative ? (
                  <p className="mt-3 text-caption text-graphite">{d.alternative}</p>
                ) : (
                  <Pending field={`Decision ${d.no} — rejected alternative`} lines={1} className="mt-3" />
                )}
              </div>
            </div>

            {d.asset ? (
              <div className="lg:col-span-6 lg:col-start-7">
                <AssetFrame asset={d.asset} sizes="(max-width: 1024px) 100vw, 48vw" />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </Block>
  )
}
