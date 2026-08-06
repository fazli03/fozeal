import Image from 'next/image'
import type { Asset } from '@/content/schema'
import { cn } from '@/lib/utils'
import { Measure } from './frame'

/**
 * Screens are the evidence, so they are presented large and legible — never
 * shrunk into a card. Four presentations, chosen per asset:
 *
 *   browser — desktop work, in a restrained window chrome
 *   phone   — app work, in a device shell with a real 19.5:9 viewport
 *   plate   — diagrams and systems, on paper with a hairline
 *   bleed   — full-width, edge to edge, for one hero moment per case study
 */

function EmptyPlate({ asset }: { asset: Asset }) {
  const ratio = (asset.height / asset.width) * 100
  return (
    <div
      className="canvas-grid relative w-full bg-paper"
      style={{ paddingBottom: `${ratio}%` }}
      role="img"
      aria-label={`Placeholder for ${asset.alt}. Awaiting the approved design file.`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <Measure>
          {asset.width} × {asset.height}
        </Measure>
        <p className="max-w-[36ch] font-mono text-caption text-graphite">{asset.alt}</p>
        <p className="font-mono text-micro uppercase text-graphite/60">
          Drop file at&nbsp;
          <span className="text-accent">public{asset.expected}</span>
        </p>
      </div>
      <span className="pointer-events-none absolute inset-0 border border-dashed border-hairline" />
    </div>
  )
}

function Picture({
  asset,
  priority,
  sizes,
  className,
}: {
  asset: Asset
  priority?: boolean
  sizes: string
  className?: string
}) {
  if (!asset.src) return <EmptyPlate asset={asset} />
  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      priority={priority}
      quality={90}
      className={cn('h-auto w-full', className)}
    />
  )
}

function BrowserChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden bg-paper shadow-[0_1px_0_rgb(var(--hairline)),0_24px_60px_-24px_rgb(var(--ink)/0.28)]">
      <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-hairline" />
          ))}
        </span>
        <span className="ml-2 h-5 flex-1 rounded-sm bg-porcelain" aria-hidden />
      </div>
      {children}
    </div>
  )
}

function PhoneChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto w-full max-w-[280px] rounded-[2.25rem] border border-hairline bg-paper p-2 shadow-[0_30px_70px_-30px_rgb(var(--ink)/0.45)]">
      <div className="relative overflow-hidden rounded-[1.65rem] bg-porcelain">
        <span
          className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink/85"
          aria-hidden
        />
        {children}
      </div>
    </div>
  )
}

export function AssetFrame({
  asset,
  priority,
  className,
  constrainToSource = true,
  imageClassName,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px',
}: {
  asset: Asset
  priority?: boolean
  className?: string
  /**
   * Plates are capped at the file's own pixel width by default so a small logo
   * is never blown up into softness. Set false where the composition needs the
   * plate to fill its column and a little upscaling is the right trade.
   */
  constrainToSource?: boolean
  /**
   * Applied to the <img> itself. For height caps, which need `object-cover`
   * alongside them so the bitmap crops instead of stretching.
   */
  imageClassName?: string
  sizes?: string
}) {
  const picture = (
    <Picture asset={asset} priority={priority} sizes={sizes} className={imageClassName} />
  )

  const body =
    asset.kind === 'browser' ? (
      <BrowserChrome>{picture}</BrowserChrome>
    ) : asset.kind === 'phone' ? (
      <PhoneChrome>{picture}</PhoneChrome>
    ) : asset.kind === 'plate' ? (
      <div
        className="border border-hairline bg-paper p-2 sm:p-3"
        style={constrainToSource ? { maxWidth: asset.width } : undefined}
      >
        {picture}
      </div>
    ) : (
      picture
    )

  return (
    <figure className={cn('selectable', className)}>
      {body}
      {asset.caption ? (
        <figcaption className="mt-4 max-w-measure font-mono text-caption text-graphite">
          {asset.caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
