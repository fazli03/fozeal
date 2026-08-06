import Link from 'next/link'
import { FrameLabel } from '@/components/system/frame'

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-section">
      <div className="shell">
        <FrameLabel meta="404" className="mb-10 border-t border-hairline pt-4">
          Page not found
        </FrameLabel>
        <h1 className="max-w-[16ch] font-display text-h1">This page does not exist.</h1>
        <p className="mt-6 max-w-measure text-body text-graphite">
          The link may be out of date. The work index has every project.
        </p>
        <Link
          href="/#work"
          className="mt-10 inline-flex h-12 items-center bg-ink px-6 font-mono text-micro uppercase text-porcelain transition-colors hover:bg-accent"
        >
          View all work
        </Link>
      </div>
    </section>
  )
}
