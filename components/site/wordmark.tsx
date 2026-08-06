import { site } from '@/content/site'
import { cn } from '@/lib/utils'

/**
 * The logo, set rather than drawn.
 *
 * Six letters in the display grotesque at a narrow width axis, opened up with
 * tracking so the word reads as a mark instead of as a heading, and closed by
 * the accent square — the same rotated 4px form the frame labels use, so the
 * logo belongs to the canvas language of the rest of the site rather than
 * sitting on top of it.
 *
 * There is no image file. At every size this is live type, which means it stays
 * crisp on any display, inherits the current colour, and costs nothing to load.
 */
export function Wordmark({
  className,
  showMark = true,
}: {
  className?: string
  showMark?: boolean
}) {
  return (
    <span
      className={cn('inline-flex items-center gap-[0.4em] font-display uppercase leading-none', className)}
      style={{ fontVariationSettings: "'wdth' 96", letterSpacing: '0.2em' }}
    >
      {/* The tracking adds a trailing gap after the last letter; the mark sits
          in that gap rather than being pushed clear of it. */}
      <span className="-mr-[0.2em]">{site.name ?? site.nameFallback}</span>
      {showMark ? (
        <span
          aria-hidden
          className="h-[0.28em] w-[0.28em] flex-none rotate-45 bg-accent"
        />
      ) : null}
    </span>
  )
}
