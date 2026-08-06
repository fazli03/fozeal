import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects, getProject } from '@/content/projects'
import { CaseHero } from '@/components/case/case-hero'
import { CaseBody } from '@/components/case/case-body'
import { CaseCta } from '@/components/case/case-cta'
import { NextProject } from '@/components/case/next-project'
import { Contact } from '@/components/site/contact'
import { accentStyle } from '@/lib/utils'

/** Route params are async in Next 16 and have to be awaited before they read. */
type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  const description = `${project.category} — a case study covering the problems, the design decisions that answer them, and the screens.`
  return {
    title: `${project.title} — ${project.category}`,
    description,
    openGraph: { title: project.title, description, type: 'article' },
  }
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  return (
    <article style={accentStyle(project.accent)}>
      <CaseHero project={project} />
      <CaseBody project={project} />
      {/* The case study ends on its own action before the page hands over to
          the next project and then to the site-wide contact band. */}
      <CaseCta project={project} />
      <NextProject project={next} />
      <Contact />
    </article>
  )
}
