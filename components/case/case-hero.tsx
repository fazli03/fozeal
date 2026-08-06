import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Project } from '@/content/schema'
import { FrameLabel, Measure } from '@/components/system/frame'
import { AssetFrame } from '@/components/system/asset-frame'

/**
 * Shared opening for every case study. The composition is constant on purpose:
 * a recruiter opening the fourth project should find the title, the category,
 * and the cover in the same place as the first. The identity colour and the
 * layout that follows are what change.
 */
export function CaseHero({ project }: { project: Project }) {
  return (
    <header className="pt-28 md:pt-36">
      <div className="shell">
        <Link
          href="/#work"
          className="hover-underline inline-flex items-center gap-2 font-mono text-micro uppercase text-graphite hover:text-ink"
        >
          <ArrowLeft size={14} aria-hidden />
          All work
        </Link>

        <FrameLabel meta={project.index} className="mt-10 border-t border-hairline pt-4">
          Case study
        </FrameLabel>

        <h1
          className="mt-10 font-display text-h1 uppercase"
          style={{ fontVariationSettings: "'wdth' 118" }}
        >
          {project.title}
        </h1>

        <div className="mt-6">
          <Measure>{project.category}</Measure>
        </div>
      </div>

      <div className="shell mt-12">
        <AssetFrame asset={project.cover} priority sizes="(max-width: 1280px) 100vw, 1400px" />
      </div>
    </header>
  )
}
