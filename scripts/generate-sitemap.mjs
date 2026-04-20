/**
 * Generates `public/sitemap.xml` including state detail routes.
 *
 * Run:
 *   node scripts/generate-sitemap.mjs
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.join(__dirname, '..')

const BASE = 'https://theunitedstates.site'

function url(loc, changefreq, priority) {
  return `  <url><loc>${loc}</loc><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
}

async function main() {
  const modUrl = pathToFileURL(path.join(repoRoot, 'src', 'data', 'usStates.generated.ts')).toString()
  const mod = await import(modUrl)
  const states = mod.US_STATES_GENERATED ?? []

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

  for (const s of states) {
    if (!s?.slug) continue
    lines.push(url(`${BASE}/states/${s.slug}`, 'weekly', '0.75'))
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
