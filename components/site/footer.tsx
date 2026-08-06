import Link from "next/link";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { IconMark } from "@/components/system/icon-mark";
import { SocialLink } from "./social-link";
import { Wordmark } from "./wordmark";

/**
 * The footer as the last canvas.
 *
 * The decorative band that used to sit underneath the footer has been folded
 * into it, and its language — a designer's working surface — is rebuilt from
 * the parts the site already owns: the 8px canvas grid, the tool glyphs from
 * the About export, a selection frame with corner handles, and measurement
 * chips reading the footer's own dimensions.
 *
 * Every decorative element is `aria-hidden`, `pointer-events-none`, and sits
 * behind the content at low opacity. Below `lg` the whole layer is dropped:
 * on a narrow screen there is no canvas to decorate, only content to read.
 */

/** Corner handles, as a selection drawn around the footer. */
function SelectionFrame() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-6 hidden lg:block xl:inset-10"
    >
      <span className="absolute inset-0 border border-dashed border-accent/20" />
      {[
        "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
        "right-0 top-0 translate-x-1/2 -translate-y-1/2",
        "left-0 bottom-0 -translate-x-1/2 translate-y-1/2",
        "right-0 bottom-0 translate-x-1/2 translate-y-1/2",
      ].map((pos) => (
        <span
          key={pos}
          className={`absolute h-2 w-2 border border-accent/60 bg-paper ${pos}`}
        />
      ))}
    </span>
  );
}

/** A measurement chip, the way a design tool annotates a selection. */
function MeasureTick({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute hidden font-mono text-[10px] uppercase leading-none tracking-wider text-accent/45 lg:block ${className}`}
    >
      {children}
    </span>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const brand = site.name ?? site.nameFallback;

  return (
    <footer className="relative isolate overflow-hidden border-t border-hairline">
      {/* --- decorative layer ------------------------------------------- */}
      <span
        aria-hidden
        className="canvas-grid pointer-events-none absolute inset-0 -z-10 opacity-40"
      />
      <SelectionFrame />

      {site.footerGlyphs.map((glyph) => (
        <span
          key={glyph.icon.src}
          aria-hidden
          className="pointer-events-none absolute hidden opacity-[0.22] lg:block"
          style={{
            top: glyph.top,
            left: glyph.left,
            transform: `rotate(${glyph.rotate}deg)`,
          }}
        >
          <IconMark icon={glyph.icon} size={glyph.size} decorative />
        </span>
      ))}

      {/* --- content ---------------------------------------------------- */}
      <div className="shell relative py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-gutter">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${brand} — home`}>
              <Wordmark className="text-h3" />
            </Link>
            <p className="mt-4 max-w-[24ch] text-caption text-graphite">
              {site.role}
            </p>
            <p className="mt-2 font-mono text-micro uppercase text-graphite/70">
              {site.location}
            </p>
          </div>

          <nav aria-label="Selected work" className="lg:col-span-3">
            <p className="font-mono text-micro uppercase text-graphite">Work</p>
            <ul className="mt-4 space-y-2">
              {projects.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/work/${p.slug}`}
                    className="hover-underline text-caption"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Pages" className="lg:col-span-2">
            <p className="font-mono text-micro uppercase text-graphite">
              Pages
            </p>
            <ul className="mt-4 space-y-2">
              {site.nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover-underline text-caption">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="font-mono text-micro uppercase text-graphite">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-3">
              {site.social.map((s) => (
                <li key={s.label}>
                  <SocialLink entry={s} iconSize={15} className="text-caption" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- copyright -------------------------------------------------- */}
        <div className="mt-14 border-t border-hairline pt-8 text-center">
          <p className="font-mono text-micro uppercase tracking-[0.14em] text-graphite/70">
            © {year} {brand}. Designed and crafted by {site.author}.
          </p>
        </div>
      </div>
    </footer>
  );
}
