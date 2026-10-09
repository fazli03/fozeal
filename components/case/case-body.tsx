'use client'

import type { Project } from '@/content/schema'
import { ProblemSolutionBlock } from './blocks/narrative'

/**
 * The case-study body — renders the problem and solution block.
 */
export function CaseBody({ project }: { project: Project }) {
  return (
    <div className="shell py-section">
      <ProblemSolutionBlock problems={project.problems} solutions={project.solutions} />
    </div>
  )
}

