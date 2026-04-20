/**
 * Generates a deterministic `src/data/usStates.generated.ts` file from Wikidata + Wikimedia Commons.
 *
 * - Uses Wikidata SPARQL to get the 50 US states (+ DC).
 * - Uses Wikimedia Commons API to pick a representative hero video + photo (when available).
 *
 * Run:
 *   node scripts/generate-states.mjs
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.join(__dirname, '..')

const WIKIDATA_ENDPOINT = 'https://query.wikidata.org/sparql'
const COMMONS_API = 'https://commons.wikimedia.org/w/api.php'

function stableJsonStringify(value) {
  return JSON.stringify(value, null, 2) + '\n'
}

async function fetchJson(url, init) {
  const res = await fetch(url, {
    ...init,
    headers: {
      'user-agent': 'theunitedstates-site/1.0 (generate-states)',
      accept: 'application/json',
      ...(init?.headers ?? {}),
    },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} for ${url}\n${text.slice(0, 500)}`)
  }
  return res.json()
}

function toAbbr(iso3166_2) {
  // e.g. "US-NY" -> "NY"
  if (!iso3166_2) return null
  const m = String(iso3166_2).match(/^US-([A-Z]{2})$/)
  return m ? m[1] : null
}

function commonsFilePath(fileTitle) {
  // Title expected like "File:Something.webm"
  const name = fileTitle.replace(/^File:/, '')
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(name)}`
}

async function sparql(query) {
  const url = new URL(WIKIDATA_ENDPOINT)
  url.searchParams.set('format', 'json')
  url.searchParams.set('query', query)
  return fetchJson(url.toString())
}

async function commonsCategoryMembers(category) {
  // Fetch up to 500 members (files only). We’ll filter by extension.
  const url = new URL(COMMONS_API)
  url.searchParams.set('action', 'query')
  url.searchParams.set('format', 'json')
  url.searchParams.set('origin', '*')
  url.searchParams.set('list', 'categorymembers')
  url.searchParams.set('cmtitle', `Category:${category}`)
  url.searchParams.set('cmtype', 'file')
  url.searchParams.set('cmlimit', '500')
  const data = await fetchJson(url.toString())
  const members = data?.query?.categorymembers ?? []
  return members.map((m) => m.title).filter(Boolean)
}

async function commonsSearchFiles(query) {
  const url = new URL(COMMONS_API)
  url.searchParams.set('action', 'query')
  url.searchParams.set('format', 'json')
  url.searchParams.set('origin', '*')
  url.searchParams.set('list', 'search')
  url.searchParams.set('srnamespace', '6') // File:
  url.searchParams.set('srlimit', '50')
  url.searchParams.set('srsearch', query)
  const data = await fetchJson(url.toString())
  const hits = data?.query?.search ?? []
  return hits.map((h) => h.title).filter(Boolean)
}

function pickFirstByExtension(titles, exts) {
  const lowerExts = exts.map((e) => e.toLowerCase())
  const matches = titles.filter((t) => {
    const lower = String(t).toLowerCase()
    return lowerExts.some((ext) => lower.endsWith(`.${ext}`))
  })
  matches.sort((a, b) => a.localeCompare(b))
  return matches[0] ?? null
}

async function main() {
  // Q35657 = U.S. state
  const query = `
SELECT ?item ?itemLabel ?isoCode ?capitalLabel ?commonsCat ?flagFile ?sealFile WHERE {
  ?item wdt:P31/wdt:P279* wd:Q35657 .
  OPTIONAL { ?item wdt:P300 ?isoCode . }
  OPTIONAL { ?item wdt:P36 ?capital . }
  OPTIONAL { ?item wdt:P373 ?commonsCat . }
  OPTIONAL { ?item wdt:P41 ?flagFile . }
  OPTIONAL { ?item wdt:P158 ?sealFile . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
ORDER BY ?itemLabel
`.trim()

  const raw = await sparql(query)
  const bindings = raw?.results?.bindings ?? []
  if (!Array.isArray(bindings) || bindings.length < 50) {
    throw new Error(`Unexpected SPARQL results: got ${bindings.length} rows`)
  }

  const states = bindings
    .map((b) => {
      const name = b.itemLabel?.value ?? null
      const isoCode = b.isoCode?.value ?? null
      const abbr = toAbbr(isoCode)
      return {
        qid: b.item?.value?.split('/').pop() ?? null,
        name,
        isoCode,
        abbreviation: abbr,
        capital: b.capitalLabel?.value ?? null,
        commonsCategory: b.commonsCat?.value ?? null,
        flagFile: b.flagFile?.value ? `File:${decodeURIComponent(b.flagFile.value.split('/').pop() ?? '')}` : null,
        sealFile: b.sealFile?.value ? `File:${decodeURIComponent(b.sealFile.value.split('/').pop() ?? '')}` : null,
      }
    })
    .filter((s) => s.name && s.abbreviation && s.capital)

  // De-dupe by abbreviation (some entities can appear twice, e.g., "Louisiana" vs "State of Louisiana").
  const byAbbr = new Map()
  for (const s of states) {
    if (!byAbbr.has(s.abbreviation)) byAbbr.set(s.abbreviation, s)
  }
  const deduped = [...byAbbr.values()]

  // Add DC (Wikidata Q61) as a special "state-like" destination page.
  if (!deduped.some((s) => s.abbreviation === 'DC')) {
    deduped.push({
      qid: 'Q61',
      name: 'District of Columbia',
      isoCode: 'US-DC',
      abbreviation: 'DC',
      capital: 'Washington, D.C.',
      commonsCategory: 'Washington, D.C.',
      flagFile: 'File:Flag of the District of Columbia.svg',
      sealFile: null,
    })
  }

  // Deterministic enrich from Commons category (if present): select one hero video + one hero photo.
  const enriched = []
  for (const s of deduped) {
    let heroVideoFile = null
    let heroPhotoFile = null

    const titles = []
    if (s.commonsCategory) {
      try {
        titles.push(...(await commonsCategoryMembers(s.commonsCategory)))
      } catch {
        // ignore
      }
    }
    try {
      const q = s.name === 'District of Columbia' ? 'Washington, D.C.' : s.name
      titles.push(...(await commonsSearchFiles(`${q} state`)))
      titles.push(...(await commonsSearchFiles(`${q} United States`)))
    } catch {
      // ignore
    }

    heroVideoFile = pickFirstByExtension(titles, ['webm', 'ogv', 'mp4'])
    heroPhotoFile = pickFirstByExtension(titles, ['jpg', 'jpeg', 'png', 'webp'])

    enriched.push({
      id: s.abbreviation.toLowerCase(),
      slug: s.abbreviation.toLowerCase(),
      name: s.name,
      abbreviation: s.abbreviation,
      capital: s.capital,
      isoCode: s.isoCode,
      wikidataQid: s.qid,
      commonsCategory: s.commonsCategory,
      flag: s.flagFile
        ? { file: s.flagFile, url: commonsFilePath(s.flagFile), source: 'Wikimedia Commons' }
        : null,
      seal: s.sealFile
        ? { file: s.sealFile, url: commonsFilePath(s.sealFile), source: 'Wikimedia Commons' }
        : null,
      heroVideo: heroVideoFile
        ? { file: heroVideoFile, url: commonsFilePath(heroVideoFile), source: 'Wikimedia Commons' }
        : null,
      heroPhoto: heroPhotoFile
        ? { file: heroPhotoFile, url: commonsFilePath(heroPhotoFile), source: 'Wikimedia Commons' }
        : null,
    })
  }

  enriched.sort((a, b) => a.name.localeCompare(b.name))

  const outPath = path.join(repoRoot, 'src', 'data', 'usStates.generated.ts')
  const body = `// This file is generated by \`node scripts/generate-states.mjs\`.
// Do not edit by hand.

export type MediaRef = {
  file: string
  url: string
  source: 'Wikimedia Commons'
}

export type USStateGenerated = {
  id: string
  slug: string
  name: string
  abbreviation: string
  capital: string
  isoCode: string | null
  wikidataQid: string
  commonsCategory: string | null
  flag: MediaRef | null
  seal: MediaRef | null
  heroVideo: MediaRef | null
  heroPhoto: MediaRef | null
}

export const US_STATES_GENERATED: USStateGenerated[] = ${stableJsonStringify(enriched)}
`

  await fs.writeFile(outPath, body, 'utf8')
  console.log(`Wrote ${path.relative(repoRoot, outPath)} (${enriched.length} items)`)
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})
