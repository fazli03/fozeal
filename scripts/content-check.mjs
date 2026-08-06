/**
 * Lists every field still waiting on an approved design file, and every asset
 * still missing from /public. Run `npm run content:check` before deploying.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Comments are stripped first — the content files document their own shape with
 * worked examples, and a `image('Folder/File name.webp', …)` in a doc comment
 * is not a real asset reference.
 */
const read = (p) =>
  readFileSync(p, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')

const nullFields = (file) => {
  const src = read(file)
  return [...src.matchAll(/^\s*([a-zA-Z]+):\s*null[,\s]*$/gm)].map((m) => m[1])
}

/**
 * Quote style is whatever the formatter last decided, so every pattern here
 * accepts either. A regex that only knew single quotes silently reported zero
 * projects the first time Prettier rewrote the file.
 */
const src = read('content/projects.ts')
const expected = [
  // Placeholders still waiting on an export: asset('slug', 'file.png', …)
  ...[...src.matchAll(/\b(?:asset|phone)\(\s*["']([^"']+)["']\s*,\s*["']([^"']+)["']/g)].map(
    (m) => `/assets/${m[1]}/${m[2]}`,
  ),
  // Files already in place: image('Folder/file.webp', …)
  ...[...src.matchAll(/\bimage\(\s*\n?\s*["']([^"']+)["']/g)].map((m) => `/assets/${m[1]}`),
]

// Images referenced outside the case studies.
for (const file of ['content/about.ts', 'content/site.ts']) {
  const body = read(file)
  for (const m of body.matchAll(/\bimage\(\s*\n?\s*["']([^"']+)["']/g)) {
    expected.push(`/assets/${m[1]}`)
  }
  for (const m of body.matchAll(/["'](\/assets\/[^"']+)["']/g)) {
    expected.push(decodeURI(m[1]))
  }
}

// A case study is three blocks — the problems, the solutions that answer them,
// and the screens that prove it — plus the meta the closing CTA reads.
const REQUIRED_BLOCKS = ['meta', 'problems', 'solutions', 'screens']
const slugs = [...src.matchAll(/slug:\s*["']([^"']+)["']/g)].map((m) => m[1])
const blocks = src.split(/slug:\s*["']/).slice(1)
const incomplete = []
blocks.forEach((body, i) => {
  const missingBlocks = REQUIRED_BLOCKS.filter((b) => !new RegExp(`\\n\\s{4}${b}:`).test(body))
  if (missingBlocks.length) incomplete.push(`${slugs[i]}: ${missingBlocks.join(', ')}`)
})

const missing = expected.filter((p) => !existsSync(join('public', p)))
const present = expected.length - missing.length

console.log('\n  Content status')
console.log('  ' + '-'.repeat(52))
console.log(`  Assets in place        ${present} / ${expected.length}`)
console.log(`  Unsourced text fields  ${['content/projects.ts','content/_helpers.ts','content/about.ts','content/site.ts'].reduce((n,f)=>n+nullFields(f).length,0)}`)
console.log(`  Projects audited       ${slugs.length}`)
console.log(`  Blocks per project     ${REQUIRED_BLOCKS.length} required`)

if (incomplete.length) {
  console.log('\n  Projects missing required blocks:')
  for (const line of incomplete) console.log(`    ${line}`)
} else {
  console.log('\n  Structure: every project carries all required blocks.')
}

if (missing.length) {
  console.log('\n  Missing assets:')
  for (const m of missing) console.log(`    public${m}`)
}
console.log('')
