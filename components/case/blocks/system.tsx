import type { ColorSystem, DesignSystem, Swatch, Typography } from '@/content/schema'
import { AssetFrame } from '@/components/system/asset-frame'
import { Pending } from '@/components/system/pending'
import { readableOn } from '@/lib/utils'
import { Block, Prose } from './block'

/* ---------------------------------------------------------- typography --- */

/**
 * A live specimen, not a screenshot of one. The sourced family name is set at
 * display size with a web-font fallback stack, so the section demonstrates the
 * type decision as well as documenting it. The spec table beneath carries the
 * numbers an engineer needs: weight, size, line height, tracking.
 */
export function TypographyBlock({ typography }: { typography: Typography }) {
  const styles = [...(typography.heading ?? []), ...(typography.body ?? [])]

  return (
    <Block frame="Typography" meta="Families, scale, rationale">
      {/* Families + specimen */}
      {typography.families ? (
        <div className="grid gap-px bg-hairline md:grid-cols-2">
          {typography.families.map((f) => (
            <div key={f.name} className="bg-porcelain p-8">
              <p
                className="text-[clamp(2.5rem,6vw,4.5rem)] leading-none"
                style={{ fontFamily: `'${f.name}', var(--font-display)` }}
              >
                Aa
              </p>
              <p className="mt-6 font-display text-h3">{f.name}</p>
              <p className="mt-2 font-mono text-micro uppercase text-graphite">{f.usage}</p>
              <p
                className="mt-5 text-body text-graphite"
                style={{ fontFamily: `'${f.name}', var(--font-body)` }}
              >
                The quick brown fox jumps over the lazy dog — 0123456789
              </p>
            </div>
          ))}
        </div>
      ) : (
        <Pending field="Font families" lines={2} />
      )}

      {/* Heading and body specs */}
      <div className="mt-14 border-t border-hairline pt-4">
        <p className="font-mono text-micro uppercase text-graphite">Heading & body styles</p>
        {styles.length ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[42rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-hairline">
                  {['Role', 'Family', 'Weight', 'Size', 'Line height', 'Tracking'].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="py-3 font-mono text-micro uppercase font-normal text-graphite"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {styles.map((s) => (
                  <tr key={s.role} className="border-b border-hairline">
                    <td className="py-4 text-caption">{s.role}</td>
                    <td className="py-4 font-mono text-caption text-graphite">{s.family ?? '—'}</td>
                    <td className="py-4 font-mono text-caption text-graphite">{s.weight ?? '—'}</td>
                    <td className="py-4 font-mono text-caption text-graphite">{s.size ?? '—'}</td>
                    <td className="py-4 font-mono text-caption text-graphite">{s.lineHeight ?? '—'}</td>
                    <td className="py-4 font-mono text-caption text-graphite">{s.tracking ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Pending field="Heading and body styles" lines={3} className="mt-6" />
        )}
      </div>

      {/* Scale */}
      <div className="mt-14 border-t border-hairline pt-4">
        <p className="font-mono text-micro uppercase text-graphite">Font scale</p>
        {typography.scale ? (
          <ul className="mt-6 divide-y divide-hairline">
            {typography.scale.map((s) => (
              <li key={s.token} className="flex flex-wrap items-baseline gap-x-6 gap-y-2 py-4">
                <span className="w-24 font-mono text-micro uppercase text-accent">{s.token}</span>
                <span className="w-20 font-mono text-caption">{s.size}</span>
                <span className="text-caption text-graphite">{s.usage}</span>
              </li>
            ))}
          </ul>
        ) : (
          <Pending field="Font scale" lines={3} className="mt-6" />
        )}
      </div>

      <div className="mt-14 border-t border-hairline pt-4">
        <p className="mb-4 font-mono text-micro uppercase text-graphite">Typography rationale</p>
        <Prose body={typography.rationale} field="Typography rationale" />
      </div>

      {typography.assets?.length ? (
        <div className="mt-14 grid gap-8">
          {typography.assets.map((a) => (
            <AssetFrame key={a.expected} asset={a} sizes="(max-width: 1024px) 100vw, 70vw" />
          ))}
        </div>
      ) : null}
    </Block>
  )
}

/* --------------------------------------------------------------- color --- */

function SwatchRow({ label, swatches }: { label: string; swatches: Swatch[] }) {
  if (!swatches.length) return null
  return (
    <div className="border-t border-hairline pt-4">
      <p className="mb-4 font-mono text-micro uppercase text-graphite">{label}</p>
      <div className="grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {swatches.map((s) => (
          <div key={s.name} className="bg-porcelain">
            {/* The swatch is the evidence — it fills, rather than sitting in a chip. */}
            <div
              className="flex h-32 items-end p-4"
              style={{
                background: s.hex ?? 'transparent',
                border: s.hex ? undefined : '1px dashed rgb(var(--hairline))',
              }}
            >
              <span
                className="font-mono text-micro uppercase"
                style={{ color: s.hex ? readableOn(s.hex) : 'rgb(var(--graphite))' }}
              >
                {s.hex ?? 'hex — awaiting source'}
              </span>
            </div>
            <div className="p-4">
              <p className="text-caption font-medium">{s.name}</p>
              {s.usage ? (
                <p className="mt-1 text-caption text-graphite">{s.usage}</p>
              ) : (
                <p className="mt-1 font-mono text-micro uppercase text-graphite/55">
                  usage — awaiting source
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ColorBlock({ colors }: { colors: ColorSystem }) {
  return (
    <Block frame="Colour system" meta="Palette, hex values, rationale">
      <div className="space-y-12">
        <SwatchRow label="Primary" swatches={colors.primary} />
        <SwatchRow label="Secondary" swatches={colors.secondary} />
        <SwatchRow label="Accent" swatches={colors.accent} />
        <SwatchRow label="Neutrals" swatches={colors.neutrals} />
      </div>

      <div className="mt-14 border-t border-hairline pt-4">
        <p className="mb-4 font-mono text-micro uppercase text-graphite">Colour rationale</p>
        <Prose body={colors.rationale} field="Colour rationale" />
      </div>

      {colors.assets?.length ? (
        <div className="mt-14 grid gap-8">
          {colors.assets.map((a) => (
            <AssetFrame key={a.expected} asset={a} sizes="(max-width: 1024px) 100vw, 70vw" />
          ))}
        </div>
      ) : null}
    </Block>
  )
}

/* -------------------------------------------------------- design system --- */

/**
 * The component inventory. Each group lists its variants and states, because
 * "Buttons" alone tells an engineer nothing — the states are the specification.
 * Spacing, grid, and tokens close the section as the rules that hold the
 * components together.
 */
export function DesignSystemBlock({ system }: { system: DesignSystem }) {
  return (
    <Block frame="Design system" meta={`${system.groups.length} component groups`}>
      <Prose body={system.intro} field="Design system introduction" className="mb-12" />

      <div className="grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-3">
        {system.groups.map((g) => (
          <article key={g.name} className="selectable bg-porcelain p-8">
            <h3 className="font-display text-h3">{g.name}</h3>
            {g.description ? (
              <p className="mt-3 text-caption text-graphite">{g.description}</p>
            ) : (
              <Pending field={`${g.name} — description`} lines={1} className="mt-3" />
            )}

            <p className="mt-6 font-mono text-micro uppercase text-graphite">Variants & states</p>
            {g.items ? (
              <ul className="mt-3 flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="border border-hairline bg-paper px-3 py-1.5 font-mono text-micro"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <Pending field={`${g.name} — variants and states`} lines={1} className="mt-3" />
            )}

            {g.asset ? (
              <div className="mt-6">
                <AssetFrame asset={g.asset} sizes="(max-width: 1024px) 100vw, 30vw" />
              </div>
            ) : null}
          </article>
        ))}
      </div>

      {/* Spacing, grid, tokens */}
      <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-gutter">
        <div className="border-t border-hairline pt-4">
          <p className="font-mono text-micro uppercase text-graphite">Spacing</p>
          {system.spacing ? (
            <p className="mt-3 text-body text-graphite">{system.spacing}</p>
          ) : (
            <Pending field="Spacing system" lines={2} className="mt-3" />
          )}
        </div>
        <div className="border-t border-hairline pt-4">
          <p className="font-mono text-micro uppercase text-graphite">Grid</p>
          {system.grid ? (
            <p className="mt-3 text-body text-graphite">{system.grid}</p>
          ) : (
            <Pending field="Grid system" lines={2} className="mt-3" />
          )}
        </div>
        <div className="border-t border-hairline pt-4">
          <p className="font-mono text-micro uppercase text-graphite">Tokens</p>
          {system.tokens ? (
            <ul className="mt-3 divide-y divide-hairline">
              {system.tokens.map((t) => (
                <li key={t.name} className="flex justify-between gap-4 py-2">
                  <span className="font-mono text-micro text-graphite">{t.name}</span>
                  <span className="font-mono text-micro">{t.value}</span>
                </li>
              ))}
            </ul>
          ) : (
            <Pending field="Design tokens" lines={2} className="mt-3" />
          )}
        </div>
      </div>
    </Block>
  )
}
