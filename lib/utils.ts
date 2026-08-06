import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

/**
 * tailwind-merge only knows Tailwind's stock scales. This project replaces
 * them: the type scale is named by role (`text-micro`, `text-lead`, `text-h1`)
 * and the section rhythm is named by density (`py-section-sm`).
 *
 * Left unconfigured, tailwind-merge cannot tell `text-micro` from a text
 * colour, so `cn('text-micro', 'text-graphite')` silently dropped the size and
 * left the colour. Teaching it the real scales makes the merge behave the way
 * every caller already assumes it does.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: ['gutter', 'section-sm', 'section', 'section-lg'],
    },
    classGroups: {
      'font-size': [{ text: ['micro', 'caption', 'body', 'lead', 'h3', 'h2', 'h1', 'mega'] }],
      'max-w': [{ 'max-w': ['measure', 'shell'] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Turns an `--accent` triple into an inline style object for a subtree. */
export function accentStyle(rgbTriple: string): React.CSSProperties {
  return { ['--accent' as string]: rgbTriple }
}

/**
 * Picks a legible label colour for an arbitrary swatch. Uses the WCAG relative
 * luminance formula rather than a naive brightness average, so mid-tone hues
 * like saturated reds and greens get the right label instead of a marginal one.
 */
export function readableOn(hex: string | null): string {
  if (!hex) return 'rgb(var(--ink))'
  const clean = hex.replace('#', '').trim()
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean
  if (full.length !== 6) return 'rgb(var(--ink))'

  const channel = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  const r = channel(parseInt(full.slice(0, 2), 16))
  const g = channel(parseInt(full.slice(2, 4), 16))
  const b = channel(parseInt(full.slice(4, 6), 16))
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b

  return luminance > 0.4 ? '#0C0D10' : '#FAFAFB'
}
