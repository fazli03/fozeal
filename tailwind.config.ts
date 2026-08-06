import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    // A single, deliberate scale. No arbitrary one-off spacing in components.
    container: { center: true, padding: '1.5rem' },
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        porcelain: 'rgb(var(--porcelain) / <alpha-value>)',
        paper: 'rgb(var(--paper) / <alpha-value>)',
        graphite: 'rgb(var(--graphite) / <alpha-value>)',
        hairline: 'rgb(var(--hairline) / <alpha-value>)',
        ultramarine: 'rgb(var(--ultramarine) / <alpha-value>)',
        // Per-project identity colour, swapped at the section level.
        accent: 'rgb(var(--accent) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Archivo', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'Inter Tight', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Editorial scale — clamped so every breakpoint is intentional.
        micro: ['0.6875rem', { lineHeight: '1.2', letterSpacing: '0.08em' }],
        caption: ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        body: ['1rem', { lineHeight: '1.65' }],
        lead: ['clamp(1.125rem, 1.6vw, 1.375rem)', { lineHeight: '1.55' }],
        h3: ['clamp(1.5rem, 2.4vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        h2: ['clamp(2rem, 4.6vw, 3.75rem)', { lineHeight: '1.04', letterSpacing: '-0.03em' }],
        h1: ['clamp(2.75rem, 8vw, 6.5rem)', { lineHeight: '0.94', letterSpacing: '-0.04em' }],
        mega: ['clamp(3.5rem, 15vw, 13rem)', { lineHeight: '0.84', letterSpacing: '-0.05em' }],
      },
      spacing: {
        gutter: 'clamp(1.25rem, 4vw, 4rem)',
        /* Three section bands rather than one, so rhythm can follow content
           density: dense grids and lists take `section-sm`, ordinary bands take
           `section`, and the few moments that carry the argument take
           `section-lg`. Applying one value everywhere is what made the page
           feel empty rather than composed. */
        'section-sm': 'clamp(2.75rem, 6vh, 4.5rem)',
        section: 'clamp(4rem, 8vh, 6.5rem)',
        'section-lg': 'clamp(5rem, 11vh, 9rem)',
      },
      maxWidth: { measure: '62ch', shell: '96rem' },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
        swift: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        rise: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        rise: 'rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
