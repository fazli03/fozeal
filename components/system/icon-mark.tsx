import NextImage from 'next/image'
import type { Icon } from '@/content/schema'
import { cn } from '@/lib/utils'

/**
 * A small fixed-size graphic — tool logo, social mark, decorative glyph.
 *
 * Drawn at its exported size rather than scaled to a container, and served
 * unoptimised: several of these are SVG, which the image optimiser refuses by
 * default, and the rest are already only a few kilobytes.
 *
 * Pass `fill` to make the image scale to 100% of its parent instead of
 * rendering at the fixed `size` pixel value.
 */
export function IconMark({
  icon,
  size = 28,
  fill,
  className,
  decorative,
}: {
  icon?: Icon
  size?: number
  /** Scale to 100% of the parent instead of a fixed pixel size. */
  fill?: boolean
  className?: string
  decorative?: boolean
}) {
  if (!icon) return null

  const ratio = icon.height / icon.width
  return (
    <NextImage
      src={icon.src}
      alt={decorative || !icon.label ? '' : icon.label}
      aria-hidden={decorative || !icon.label ? true : undefined}
      width={fill ? icon.width : size}
      height={fill ? icon.height : Math.round(size * ratio)}
      unoptimized
      className={cn('inline-block', className)}
      style={fill ? { width: '100%', height: '100%', objectFit: 'contain' } : undefined}
    />
  )
}