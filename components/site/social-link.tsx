import { ArrowUpRight, Download } from 'lucide-react'
import type { Icon } from '@/content/schema'
import { IconMark } from '@/components/system/icon-mark'
import { cn } from '@/lib/utils'

/**
 * One anchor, four behaviours.
 *
 * The footer and the contact band were rendering the same link markup twice
 * with slightly different rules, which is how an `href` ends up opening in the
 * wrong place in one of them. Both now call this, and the entry itself declares
 * what kind of destination it is:
 *
 *   email     mailto: — hands off to the visitor's mail client, same tab
 *   phone     tel:    — hands off to the dialler, same tab
 *   external  a site somewhere else — new tab, with the security rel
 *   download  a file under /public — saved rather than navigated to
 *
 * An entry whose href is still null renders as inert text rather than as a
 * dead link, so a missing destination is visible instead of broken.
 */

export type SocialKind = 'email' | 'phone' | 'external' | 'download'

export type SocialEntry = {
  label: string
  href: string | null
  icon: Icon
  kind: SocialKind
  /** The name the browser saves a download under. Ignored by other kinds. */
  fileName?: string
}

export function SocialLink({
  entry,
  className,
  iconSize = 16,
  showAffordance = true,
}: {
  entry: SocialEntry
  className?: string
  iconSize?: number
  /** The trailing arrow / download glyph. Off where the row must stay quiet. */
  showAffordance?: boolean
}) {
  const { href, kind, label, icon, fileName } = entry

  const body = (
    <>
      <IconMark icon={icon} size={iconSize} decorative />
      {label}
    </>
  )

  if (!href) {
    return (
      <span className={cn('inline-flex items-center gap-2.5 text-graphite/45', className)}>
        {body}
      </span>
    )
  }

  // Only a real elsewhere gets a new tab. mailto: and tel: must not, or the
  // browser opens a blank window it can never close.
  const opensNewTab = kind === 'external'

  return (
    <a
      href={href}
      target={opensNewTab ? '_blank' : undefined}
      rel={opensNewTab ? 'noopener noreferrer' : undefined}
      // A string sets the saved filename; the attribute only applies to
      // same-origin files, which is what /public serves.
      download={kind === 'download' ? (fileName ?? true) : undefined}
      className={cn('hover-underline inline-flex items-center gap-2.5', className)}
    >
      {body}

      {showAffordance && kind === 'download' ? (
        <Download size={13} aria-hidden className="text-accent" />
      ) : null}
      {showAffordance && opensNewTab ? (
        <ArrowUpRight size={13} aria-hidden className="text-accent" />
      ) : null}

      {/* Says out loud what the icon says visually. */}
      {kind === 'download' ? <span className="sr-only">(downloads a PDF)</span> : null}
      {opensNewTab ? <span className="sr-only">(opens in a new tab)</span> : null}
    </a>
  )
}
