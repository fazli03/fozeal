import type { Variants, Transition } from 'framer-motion'

/**
 * One easing curve and three durations for the whole site. Shared timing is
 * what makes separate animations read as a single system rather than a pile
 * of effects.
 */
export const ease = [0.22, 1, 0.36, 1] as const

export const duration = { fast: 0.35, base: 0.7, slow: 1.1 } as const

export const transition: Transition = { duration: duration.base, ease }

export const riseIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition },
}

export const maskUp: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: duration.slow, ease } },
}

export const stagger = (delay = 0, each = 0.08): Variants => ({
  hidden: {},
  show: { transition: { delayChildren: delay, staggerChildren: each } },
})

export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' } as const
