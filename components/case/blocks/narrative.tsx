import type { ProblemStatement, ProcessPhase, SolutionStatement } from '@/content/schema'
import { AssetFrame } from '@/components/system/asset-frame'
import { Measure } from '@/components/system/frame'
import { Pending } from '@/components/system/pending'
import { Block, Prose } from './block'

/**
 * Problems and solutions are rendered as facing pairs rather than as two
 * distant lists. Each solution declares the problem id it answers, so the
 * reader can see which design move resolves which problem — and an unanswered
 * problem becomes visible instead of quietly disappearing.
 */
export function ProblemSolutionBlock({
  problems,
  solutions,
}: {
  problems: ProblemStatement[]
  solutions: SolutionStatement[]
}) {
  return (
    <Block id="problem-solution" frame="Problem & solution" meta={`${problems.length} paired`}>
      <ol className="space-y-16 lg:space-y-20">
        {problems.map((problem, i) => {
          const answer = solutions.find((s) => s.respondsTo === problem.id)
          return (
            <li key={problem.id}>
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-gutter">
                {/* Problem */}
                <div className="border-t-2 border-ink pt-5">
                  <div className="mb-5 flex items-center gap-3">
                    <Measure>Problem</Measure>
                  </div>
                  {problem.statement ? (
                    <h3 className="max-w-[24ch] font-display text-h3">{problem.statement}</h3>
                  ) : (
                    <Pending field={`Problem ${i + 1} — statement`} lines={1} />
                  )}
                  <Prose
                    body={problem.detail}
                    field={`Problem ${i + 1} — reasoning`}
                    className="mt-5"
                  />
                  {problem.evidence ? (
                    <p className="mt-5 border-l-2 border-accent pl-4 text-caption text-graphite">
                      {problem.evidence}
                    </p>
                  ) : null}
                </div>

                {/* Solution */}
                <div className="border-t-2 border-accent pt-5">
                  <div className="mb-5 flex items-center gap-3">
                    <Measure>Solution</Measure>
                  </div>
                  {answer?.title ? (
                    <h3 className="max-w-[24ch] font-display text-h3">{answer.title}</h3>
                  ) : (
                    <Pending field={`Solution ${i + 1} — title`} lines={1} />
                  )}
                  <Prose
                    body={answer?.detail ?? null}
                    field={`Solution ${i + 1} — how it answers the problem`}
                    className="mt-5"
                  />
                </div>
              </div>

              {answer?.assets?.length ? (
                <div className="mt-10 grid gap-8 md:grid-cols-2">
                  {answer.assets.map((a) => (
                    <AssetFrame
                      key={a.expected}
                      asset={a}
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  ))}
                </div>
              ) : null}
            </li>
          )
        })}
      </ol>
    </Block>
  )
}

/* ------------------------------------------------------------- process --- */

/**
 * DISABLED — not rendered on any case study.
 *
 * The design-process timeline is switched off at the composition level:
 * components/case/case-body.tsx simply does not call it, so nothing reserves
 * space for it and no empty gap is left behind. The component and its
 * `ProcessPhase` type stay here, complete and working, so re-enabling it is one
 * line in CaseBody once the phase copy is ready.
 *
 * A timeline rail. Numbering is justified here because the process genuinely is
 * a sequence — each phase consumes the previous phase's output. That output is
 * named explicitly, so the rail shows what actually moved between stages rather
 * than just listing activity.
 */
export function ProcessBlock({ process }: { process: ProcessPhase[] }) {
  return (
    <Block frame="Design process" meta={`${process.length} phases`}>
      <ol className="relative">
        {/* The rail itself. */}
        <span
          className="absolute bottom-0 left-[7px] top-2 w-px bg-hairline md:left-[calc(6rem+7px)]"
          aria-hidden
        />

        {process.map((p) => (
          <li key={p.no} className="relative pb-14 pl-8 md:pl-[calc(6rem+2rem)]">
            <span
              className="absolute left-0 top-1 h-[15px] w-[15px] rotate-45 border border-accent bg-porcelain md:left-24"
              aria-hidden
            />
            <span className="absolute left-0 top-0 hidden font-mono text-micro text-graphite md:block">
              {p.no}
            </span>

            <h3 className="font-display text-h3">{p.label}</h3>

            {p.summary ? (
              <p className="mt-3 max-w-measure text-body text-graphite">{p.summary}</p>
            ) : (
              <Pending field={`${p.label} — summary`} lines={2} className="mt-3" />
            )}

            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div className="border-t border-hairline pt-4">
                <p className="font-mono text-micro uppercase text-graphite">Activities</p>
                {p.activities ? (
                  <ul className="mt-3 space-y-2">
                    {p.activities.map((a, i) => (
                      <li key={i} className="text-caption text-graphite">
                        {a}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Pending field={`${p.label} — activities`} lines={2} className="mt-3" />
                )}
              </div>
              <div className="border-t border-hairline pt-4">
                <p className="font-mono text-micro uppercase text-graphite">Output</p>
                {p.output ? (
                  <p className="mt-3 text-caption text-graphite">{p.output}</p>
                ) : (
                  <Pending field={`${p.label} — output`} lines={1} className="mt-3" />
                )}
              </div>
            </div>

            {p.assets?.length ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {p.assets.map((a) => (
                  <AssetFrame key={a.expected} asset={a} sizes="(max-width: 768px) 100vw, 40vw" />
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </Block>
  )
}
