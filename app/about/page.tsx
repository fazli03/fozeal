import type { Metadata } from "next";
import { about } from "@/content/about";
import { site } from "@/content/site";
import { AssetFrame } from "@/components/system/asset-frame";
import { IconMark } from "@/components/system/icon-mark";
import { FrameLabel, Measure } from "@/components/system/frame";
import { Pending } from "@/components/system/pending";
import { Reveal, RevealGroup, RevealItem } from "@/components/system/reveal";
import { Contact } from "@/components/site/contact";

export const metadata: Metadata = {
  title: "About",
  description: site.thesis,
};

/**
 * Every value on this page comes from one place: the latest approved About
 * design file. Nothing is supplemented from elsewhere and nothing is inferred.
 * Where that file has not been provided, the field says so.
 */
export default function AboutPage() {
  return (
    <>
      <header className="pt-28 md:pt-36">
        <div className="shell">
          <FrameLabel meta="Profile" className="border-t border-hairline pt-4">
            About me
          </FrameLabel>

          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-gutter">
            <div className="lg:col-span-7">
              {/* The page names itself, not the brand. The wordmark already
                  sits in the nav directly above this, so repeating it here at
                  display size said the same thing twice and left the page
                  without a heading of its own. */}
              <h1
                className="font-display text-h1 uppercase"
                style={{ fontVariationSettings: "'wdth' 118" }}
              >
                Hello
              </h1>

              <div className="mt-10 space-y-6">
                {about.biography ? (
                  about.biography.map((para, i) => (
                    /* Justified, so both edges line up. On its own that opens
                       rivers of white space between words, so `hyphens-auto`
                       goes with it — and that needs `lang`, because the browser
                       hyphenates by dictionary and the page itself is English
                       while this passage is Indonesian. The same attribute also
                       makes a screen reader pronounce it correctly. */
                    <p
                      key={i}
                      lang="id"
                      className="max-w-measure text-lead text-graphite text-justify hyphens-auto"
                    >
                      {para}
                    </p>
                  ))
                ) : (
                  <Pending
                    field="Biography"
                    source="the latest About design file"
                    lines={4}
                  />
                )}
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <AssetFrame
                asset={about.portrait}
                priority
                sizes="(max-width: 1024px) 70vw, 32vw"
              />

              {/* The glyphs the design floats around the portrait. */}
              {about.decor.length ? (
                <div className="mt-6 flex flex-wrap items-center gap-5">
                  {about.decor.map((glyph) => (
                    <IconMark
                      key={glyph.src}
                      icon={glyph}
                      size={26}
                      decorative
                    />
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      {/* Three short lists side by side — a dense band. */}
      <section className="py-section-sm">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-gutter">
          {/* UI/UX skills */}
          <div className="lg:col-span-5">
            <FrameLabel className="mb-8 border-t border-hairline pt-4">
              UI / UX skills
            </FrameLabel>
            {about.uiuxSkills ? (
              <RevealGroup className="flex flex-wrap gap-2" each={0.04}>
                {about.uiuxSkills.map((skill) => (
                  <RevealItem key={skill}>
                    <span className="inline-flex border border-hairline bg-paper px-4 py-2 text-caption">
                      {skill}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            ) : (
              <Pending
                field="UI/UX skills"
                source="the latest About design file"
                lines={3}
              />
            )}
          </div>

          {/* Software — six tools on a three-wide grid, so they land as two
              even rows. A column wider than the list it holds, so no label has
              to wrap at the narrowest desktop width. */}
          <div className="lg:col-span-4">
            <FrameLabel className="mb-8 border-t border-hairline pt-4">
              Software
            </FrameLabel>
            {about.software ? (
              <ul className="grid grid-cols-3 gap-x-4 gap-y-7">
                {about.software.map((tool) => (
                  <li
                    key={tool.src}
                    className="flex flex-col items-start gap-2.5 text-caption"
                  >
                    {/* The logos were exported white, for the dark surface of
                        the design file. `brightness(0)` drives every channel to
                        zero while leaving alpha alone, so each mark reads as
                        solid black on this page whatever colour it started as —
                        and it works on the raster Figma mark as well as on the
                        SVGs, which an <img> gives no other way to recolour. */}
                    <IconMark
                      icon={tool}
                      size={24}
                      decorative
                      className="brightness-0"
                    />
                    {tool.label}
                  </li>
                ))}
              </ul>
            ) : (
              <Pending
                field="Software"
                source="the latest About design file"
                lines={3}
              />
            )}
          </div>

          {/* Languages */}
          <div className="lg:col-span-3">
            <FrameLabel className="mb-8 border-t border-hairline pt-4">
              Languages
            </FrameLabel>
            {about.languages ? (
              <ul className="space-y-4">
                {about.languages.map((lang) => (
                  <li
                    key={lang.name}
                    className="flex items-baseline justify-between gap-4"
                  >
                    <span className="text-caption">{lang.name}</span>
                    <Measure>{lang.level}</Measure>
                  </li>
                ))}
              </ul>
            ) : (
              <Pending
                field="Languages"
                source="the latest About design file"
                lines={2}
              />
            )}
          </div>
        </div>
      </section>

      <Reveal>
        <div className="shell">
          <div className="rule" />
        </div>
      </Reveal>

      <Contact />
    </>
  );
}
