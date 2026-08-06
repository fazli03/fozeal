import { ExternalLink, Github, Mail } from 'lucide-react'
import type { Project } from '@/content/schema'
import { site } from '@/content/site'
import { FrameLabel } from '@/components/system/frame'
import { Reveal } from '@/components/system/reveal'
import { gmailComposeUrl } from '@/lib/mail'

/**
 * The closing move of every case study.
 *
 * Two jobs in one band, so the page ends on an action rather than trailing off:
 * the facts of the job on the left, and the way into the live work on the
 * right. The facts are set as hanging mono labels on hairline rails — the
 * same device the frame labels use — rather than as a bordered table, so they
 * read as part of the editorial column instead of a data dump bolted to the
 * end.
 *
 * Rows with no value are dropped entirely. A specification that says "awaiting
 * source" four times is worse than a shorter one that is true, and dropping the
 * row keeps the grid tight instead of leaving a hole in it.
 */

type Fact = { label: string; value: string | null }

export function CaseCta({ project }: { project: Project }) {
  const { meta } = project

  const facts: Fact[] = [
    { label: 'Role', value: meta.role?.join(', ') ?? null },
    { label: 'Duration', value: meta.duration },
    { label: 'Tools', value: meta.tools?.join(', ') ?? null },
    { label: 'Platform', value: meta.platform },
    { label: 'Timeline', value: meta.timeline },
    { label: 'Year', value: meta.year },
  ].filter((f): f is Fact & { value: string } => Boolean(f.value))

  const email = site.email

  return (
    <Reveal>
      <section
        aria-labelledby={`cta-${project.slug}`}
        className="border-t border-hairline py-section"
      >
        <div className="shell">
          <FrameLabel meta={project.index} className="mb-10">
            The work, live
          </FrameLabel>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-gutter">
            {/* Statement + actions */}
            <div className="lg:col-span-7">
              <h2
                id={`cta-${project.slug}`}
                className="max-w-[18ch] font-display text-h2 uppercase"
                style={{ fontVariationSettings: "'wdth' 112" }}
              >
                Open {project.title} and click through it.
              </h2>

              <p className="mt-6 max-w-measure text-body text-graphite">
                Screens explain a decision. The prototype shows the decision under a
                finger — the transitions, the states, and what happens when a flow
                goes the way it was not meant to.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                {meta.prototypeUrl ? (
                  <a
                    href={meta.prototypeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 bg-ink px-7 py-4 font-mono text-micro uppercase tracking-wider text-porcelain transition-colors duration-300 hover:bg-accent"
                  >
                    Open Figma prototype
                    <ExternalLink
                      size={14}
                      aria-hidden
                      className="transition-transform duration-300 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                ) : email ? (
                  /* No prototype link on this project yet, so the band still
                     closes on a real action rather than on a dead button. */
                  <a
                    href={gmailComposeUrl(email, `${project.title} — prototype walkthrough`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 bg-ink px-7 py-4 font-mono text-micro uppercase tracking-wider text-porcelain transition-colors duration-300 hover:bg-accent"
                  >
                    <Mail size={14} aria-hidden />
                    Request a walkthrough
                    <span className="sr-only">(opens a Gmail compose window)</span>
                  </a>
                ) : null}

                {meta.repositoryUrl ? (
                  <a
                    href={meta.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 border border-ink/25 px-7 py-4 font-mono text-micro uppercase tracking-wider transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <Github size={14} aria-hidden />
                    Repository
                  </a>
                ) : null}
              </div>
            </div>

            {/* The facts of the job */}
            {facts.length ? (
              <dl className="grid grid-cols-2 gap-x-gutter gap-y-7 self-end lg:col-span-4 lg:col-start-9">
                {facts.map((fact) => (
                  <div key={fact.label} className="border-t border-hairline pt-3">
                    <dt className="font-mono text-micro uppercase text-graphite">{fact.label}</dt>
                    <dd className="mt-2 text-caption leading-relaxed">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </div>
        </div>
      </section>
    </Reveal>
  )
}
