import { site } from '@/content/site'
import { RevealGroup, RevealItem } from '@/components/system/reveal'

/**
 * Numbered because this genuinely is a sequence — it is the order the work
 * happens in. Numbering that does not encode order is decoration; this one
 * carries the argument that the process is deliberate.
 *
 * The step cards borrow their construction from a working canvas rather than
 * from a card UI: a numbered tag, a dashed leader running out to the edge of
 * the frame, and a corner stepped away with a crosshair sitting in the cut.
 * Every part of it is drawn from the site's own kit — hairline borders, square
 * corners, the mono label face, and the identity accent — so the section reads
 * as the same document as everything above it.
 */
export function Capabilities() {
  return (
    <section id="process" className="border-t border-hairline py-section">
      <div className="shell">
        {/* Centred, unlike the rest of the site's frame labels: this band is a
            statement about method rather than another region of the document. */}
        {/* No max-width here: `ch` would resolve against the inherited body
            size, not the display size, and crush the heading into a column. The
            two block spans are what set the line breaks. */}
        <header className="text-center">
          <span className="frame-label justify-center">Process</span>
          <h2 className="mt-6 font-display text-h1 uppercase">
            <span className="block text-accent">How the work</span>
            <span className="block">actually happens</span>
          </h2>
        </header>

        <RevealGroup
          className="mt-14 grid gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8"
          each={0.07}
        >
          {site.capabilities.map((c) => (
            <RevealItem key={c.no} className="h-full">
              <article className="selectable relative flex h-full flex-col border border-hairline bg-paper p-8 lg:p-10">
                {/* Tag + leader */}
                <div className="flex items-center gap-4">
                  <span className="inline-flex h-7 items-center border border-accent/40 px-2.5 font-mono text-micro text-accent">
                    {c.no}.
                  </span>
                  <span
                    aria-hidden
                    className="flex-1 border-t border-dashed border-hairline"
                  />
                </div>

                <h3 className="mt-8 font-display text-h3">{c.title}</h3>
                <p className="mt-3 max-w-[46ch] text-body text-graphite">{c.body}</p>

                {/* The stepped corner. Offset by a pixel so it eats the card's
                    own border and reads as a cut rather than as a patch. */}
                <span
                  aria-hidden
                  className="absolute -bottom-px -right-px flex h-10 w-10 items-center justify-center border-l border-t border-hairline bg-porcelain"
                >
                  <span className="relative block h-2.5 w-2.5">
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-hairline" />
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-hairline" />
                  </span>
                </span>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}
