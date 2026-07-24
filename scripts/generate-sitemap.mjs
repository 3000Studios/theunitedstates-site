/**
 * Generates `public/sitemap.xml` including state detail routes.
 *
 * Run:
 *   node scripts/generate-sitemap.mjs
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.join(__dirname, '..')

const BASE = 'https://theunitedstates.site'

function url(loc, changefreq, priority) {
  return `  <url><loc>${loc}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
}

async function main() {
  // This script runs with Node before Vite compiles TypeScript. Extracting the
  // checked-in route slugs keeps the sitemap buildable without a TS runtime.
  const stateSource = await fs.readFile(path.join(repoRoot, 'src', 'data', 'usStates.generated.ts'), 'utf8')
  const states = [...stateSource.matchAll(/^\s*["']?slug["']?\s*:\s*['\"]([^'\"]+)['\"]/gm)].map((match) => match[1])
  const storySource = await fs.readFile(path.join(repoRoot, 'src', 'data', 'seedArticles.ts'), 'utf8')
  const stories = [...storySource.matchAll(/^\s*slug:\s*['\"]([^'\"]+)['\"]/gm)].map((match) => match[1])

  const lines = []
  lines.push('<?xml version="1.0" encoding="UTF-8"?>')
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

  lines.push(url(`${BASE}/`, 'hourly', '1.0'))
  lines.push(url(`${BASE}/states`, 'weekly', '0.95'))
  lines.push(url(`${BASE}/updates`, 'hourly', '0.95'))
  lines.push(url(`${BASE}/kids`, 'weekly', '0.8'))
  lines.push(url(`${BASE}/constitution`, 'monthly', '0.8'))
  lines.push(url(`${BASE}/guides`, 'weekly', '0.85'))
  lines.push(url(`${BASE}/about`, 'monthly', '0.5'))
  lines.push(url(`${BASE}/contact`, 'monthly', '0.5'))
  lines.push(url(`${BASE}/privacy`, 'yearly', '0.3'))
  lines.push(url(`${BASE}/terms`, 'yearly', '0.3'))
  lines.push(url(`${BASE}/disclaimer`, 'yearly', '0.3'))
  lines.push(url(`${BASE}/search`, 'weekly', '0.6'))

  for (const slug of states) {
    lines.push(url(`${BASE}/states/${slug}`, 'weekly', '0.75'))
  }

  for (const slug of stories) {
    lines.push(url(`${BASE}/story/${slug}`, 'monthly', '0.7'))
  }

  lines.push('</urlset>')
  lines.push('')

  const outPath = path.join(repoRoot, 'public', 'sitemap.xml')
  await fs.writeFile(outPath, lines.join('\n'), 'utf8')
  console.log(`Wrote public/sitemap.xml (${states.length} states)`)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
