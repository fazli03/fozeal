import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Project } from '@/content/schema'
import { FrameLabel } from '@/components/system/frame'
import { accentStyle } from '@/lib/utils'

export function NextProject({ project }: { project: Project }) {
  return (
    <section style={accentStyle(project.accent)} className="border-t border-hairline">
      <Link href={`/work/${project.slug}`} className="group block py-section-sm">
        <div className="shell">
          <FrameLabel meta={project.index} className="mb-8">
            Next project
          </FrameLabel>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2
              className="font-display text-h1 uppercase transition-colors duration-500 group-hover:text-accent"
              style={{ fontVariationSettings: "'wdth' 116" }}
            >
              {project.title}
            </h2>
            <span className="flex items-center gap-3 font-mono text-micro uppercase text-graphite">
              {project.category}
              <ArrowRight
                size={18}
                aria-hidden
                className="transition-transform duration-500 ease-editorial group-hover:translate-x-2"
              />
            </span>
          </div>
        </div>
      </Link>
    </section>
  )
}
