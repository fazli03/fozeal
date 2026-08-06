import NextImage from 'next/image'
import type { Icon } from '@/content/schema'
import { cn } from '@/lib/utils'

/**
 * A small fixed-size graphic — tool logo, social mark, decorative glyph.
 *
 * Drawn at its exported size rather than scaled to a container, and served
 * unoptimised: several of these are SVG, which the image optimiser refuses by
 * default, and the rest are already only a few kilobytes.
 */
export function IconMark({
  icon,
  size = 28,
  className,
  decorative,
}: {
  icon: Icon
  size?: number
  className?: string
  decorative?: boolean
}) {
  const ratio = icon.height / icon.width
  return (
    <NextImage
      src={icon.src}
      alt={decorative || !icon.label ? '' : icon.label}
      aria-hidden={decorative || !icon.label ? true : undefined}
      width={size}
      height={Math.round(size * ratio)}
      unoptimized
      className={cn('inline-block h-auto', className)}
    />
  )
}
