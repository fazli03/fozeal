import type { Metadata, Viewport } from 'next'

/* Fonts are self-hosted through npm — no third-party request at runtime, and
   nothing to block first paint. Variable files carry the width axis that the
   display type depends on. */
import '@fontsource-variable/archivo'
import '@fontsource-variable/inter-tight'
import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'

import './globals.css'

import { site } from '@/content/site'
import { Nav } from '@/components/site/nav'
import { Footer } from '@/components/site/footer'
import { LenisProvider } from '@/components/system/lenis-provider'
import { ScrollProgress } from '@/components/system/scroll-progress'

const title = `${site.name ?? site.nameFallback} — ${site.role}`
const description = site.thesis

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name ?? site.nameFallback}` },
  description,
  applicationName: site.name ?? site.nameFallback,
  authors: site.name ? [{ name: site.name }] : undefined,
  keywords: [
    'FOZEAL',
    site.author,
    'product designer',
    'UI designer',
    'UX designer',
    'portfolio',
    'Indonesia',
    'Depok',
  ],
  creator: site.author,
  publisher: site.name ?? site.nameFallback,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name ?? site.nameFallback,
    title,
    description,
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#EDEEF0',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Keyboard users reach the content without tabbing the whole nav. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-3 focus:font-mono focus:text-micro focus:uppercase focus:text-porcelain"
        >
          Skip to content
        </a>

        <LenisProvider>
          <ScrollProgress />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  )
}
