export type WikidataCity = {
  name: string
  qid: string
  population?: number
}

const ENDPOINT = 'https://query.wikidata.org/sparql'
const CACHE_PREFIX = 'tus_wikidata_cities_v1:'

function toQid(uri: string): string {
  return uri.split('/').pop() ?? uri
}

export async function fetchTopCitiesInState(stateQid: string): Promise<WikidataCity[]> {
  const key = `${CACHE_PREFIX}${stateQid}`
  try {
    const cached = sessionStorage.getItem(key)
    if (cached) return JSON.parse(cached) as WikidataCity[]
  } catch {
    // ignore
  }

  const query = `
SELECT ?city ?cityLabel (MAX(?pop) AS ?population) WHERE {
  ?city wdt:P31/wdt:P279* wd:Q515 .
  ?city wdt:P131* wd:${stateQid} .
  OPTIONAL { ?city wdt:P1082 ?pop . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
GROUP BY ?city ?cityLabel
ORDER BY DESC(?population) ?cityLabel
LIMIT 10
`.trim()

  const url = new URL(ENDPOINT)
  url.searchParams.set('format', 'json')
  url.searchParams.set('query', query)

  const res = await fetch(url.toString(), { headers: { accept: 'application/sparql-results+json' } })
  if (!res.ok) return []
  const data = (await res.json()) as unknown
  const bindings = (data as { results?: { bindings?: unknown[] } })?.results?.bindings ?? []
  const cities: WikidataCity[] = bindings
    .map((raw) => {
      const b = raw as {
        cityLabel?: { value?: unknown }
        city?: { value?: unknown }
        population?: { value?: unknown }
      }
      const name = String(b?.cityLabel?.value ?? '').trim()
      const qid = toQid(String(b?.city?.value ?? ''))
      const population = b?.population?.value ? Number(b.population.value) : undefined
      return { name, qid, population }
    })
    .filter((c: WikidataCity) => c.name && c.qid)

  try {
    sessionStorage.setItem(key, JSON.stringify(cities))
  } catch {
    // ignore
  }
  return cities
}
