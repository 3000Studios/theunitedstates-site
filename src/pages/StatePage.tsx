import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Seo } from '@/components/seo/Seo'
import { AdSlot } from '@/components/ads/AdSlot'
import { StateWallpaper } from '@/components/states/StateWallpaper'
import { findStateBySlug } from '@/data/usStates'
import { STATE_PAGE_CONTENT } from '@/data/statePages'
import { fetchTopCitiesInState, type WikidataCity } from '@/lib/wikidata'
import { buildStateFaq, buildStateSeoBrief } from '@/lib/seoContent'

const FALLBACK_VIDEO_FILE = 'File:Raising the Flag on Iwo Jima (color).ogv'
const FALLBACK_VIDEO_URL =
  'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(FALLBACK_VIDEO_FILE.replace(/^File:/, ''))

function commonsFilePage(fileTitle: string): string {
  const safe = fileTitle.replace(/ /g, '_')
  return `https://commons.wikimedia.org/wiki/${encodeURIComponent(safe)}`
}

export function StatePage() {
  const { slug } = useParams()
  const state = slug ? findStateBySlug(slug) : undefined
  const pageContent = state ? STATE_PAGE_CONTENT.find((c) => c.slug === state.slug) : undefined
  const [cities, setCities] = useState<WikidataCity[] | null>(null)
  const [citiesError, setCitiesError] = useState(false)
  const [factsOpen, setFactsOpen] = useState(false)

  const stateQid = state?.wikidataQid ?? null

  useEffect(() => {
    if (!stateQid) return
    let cancelled = false
    fetchTopCitiesInState(stateQid)
      .then((c) => {
        if (!cancelled) setCities(c)
      })
      .catch(() => {
        if (!cancelled) setCities([])
      })
    return () => {
      cancelled = true
    }
  }, [stateQid])

  if (!state) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <h1 className="text-3xl font-black text-white">State not found</h1>
        <p className="mt-3 text-slate-300/80">We couldn&apos;t find that state page.</p>
        <Link to="/states" className="mt-6 inline-block rounded-full bg-sky-400 px-6 py-3 text-sm font-bold text-slate-950">
          Back to all states
        </Link>
      </div>
    )
  }

  const heroVideo = state.heroVideoFile ? commonsFilePage(state.heroVideoFile) : FALLBACK_VIDEO_URL
  const canonicalPath = `/states/${state.slug}`
  const faq = buildStateFaq(state)
  const seoBrief = buildStateSeoBrief(state)
  const capital = state.capital ?? '—'
  const nickname = state.nickname ?? '—'
  const population = state.population?.toLocaleString('en-US') ?? '—'
  const largestCity = state.largestCity ?? '—'

  const fetchCities = () => {
    if (cities !== null || citiesError || !stateQid) return
    setCitiesError(false)
    fetchTopCitiesInState(stateQid)
      .then(setCities)
      .catch(() => {
        setCitiesError(true)
        setCities([])
      })
  }

  return (
    <div className="relative">
      <Seo
        title={`${state.name} | The United States`}
        description={`Explore ${state.name}: capital ${capital}, nickname ${nickname}, population ${population}, largest city ${largestCity}.`}
        canonicalPath={canonicalPath}
        faq={faq}
      />
      <StateWallpaper state={state} heroVideo={heroVideo} />
      <div className="relative mx-auto max-w-5xl px-4 pb-16">
        <nav className="pt-6 text-xs text-slate-400" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-sky-300">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/states" className="hover:text-sky-300">
            States
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-200">{state.name}</span>
        </nav>

        <header className="mt-6">
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">{state.name}</h1>
          <p className="mt-2 text-lg text-sky-200/90">
            {nickname} · Capital: {capital}
          </p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-6">
              <button
                type="button"
                onClick={() => setFactsOpen((v) => !v)}
                className="flex w-full items-center justify-between text-left"
                aria-expanded={factsOpen}
              >
                <span className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Quick facts</span>
                <span className="text-sky-300">{factsOpen ? '−' : '+'}</span>
              </button>
              {factsOpen && (
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-slate-400">Capital</dt>
                    <dd className="font-semibold text-white">{capital}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Nickname</dt>
                    <dd className="font-semibold text-white">{nickname}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Population</dt>
                    <dd className="font-semibold text-white">{population}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400">Largest city</dt>
                    <dd className="font-semibold text-white">{largestCity}</dd>
                  </div>
                </dl>
              )}
            </div>

            <div className="glass-panel rounded-3xl p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Travel planning brief</div>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300/90">
                {seoBrief.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            {pageContent && (
              <div className="glass-panel rounded-3xl p-6">
                <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">
                  State guide · {pageContent.nickname}
                </div>
                <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300/90">
                  {pageContent.paragraphs.map((paragraph, idx) => (
                    <p key={`${idx}-${paragraph.slice(0, 32)}`}>{paragraph}</p>
                  ))}
                </div>
                {pageContent.keyFacts.length > 0 && (
                  <ul className="mt-5 space-y-2">
                    {pageContent.keyFacts.map((fact) => (
                      <li key={fact} className="flex gap-2 text-sm text-slate-300/90">
                        <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-300/70" />
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {pageContent.topAttractions.length > 0 && (
                  <div className="mt-5">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Top attractions</div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {pageContent.topAttractions.map((attraction) => (
                        <div key={attraction.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                          <div className="text-sm font-extrabold text-white">{attraction.name}</div>
                          <p className="mt-1 text-xs leading-relaxed text-slate-400">{attraction.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {cities && cities.length > 0 && (
              <div className="glass-panel rounded-3xl p-6">
                <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Major cities</div>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {cities.slice(0, 10).map((city) => (
                    <li key={city.id} className="text-sm text-slate-300/90">
                      {city.label}
                      {typeof city.population === 'number' && (
                        <span className="text-slate-500"> · {city.population.toLocaleString('en-US')}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="glass-panel rounded-3xl p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Frequently asked questions</div>
              <div className="mt-4 space-y-4">
                {faq.map((item) => (
                  <div key={item.question}>
                    <div className="text-sm font-bold text-white">{item.question}</div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300/85">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <AdSlot id="state-sidebar-top" />
            <div className="glass-panel rounded-3xl p-6">
              <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Plan your visit</div>
              <p className="mt-3 text-sm leading-relaxed text-slate-300/85">
                Build a family-friendly itinerary for {state.name} with drive times, kid-friendly stops, and budget
                tips.
              </p>
              <Link
                to={`/itinerary?state=${state.slug}`}
                className="mt-4 inline-block rounded-full bg-sky-400 px-5 py-2.5 text-sm font-bold text-slate-950"
              >
                Plan an itinerary
              </Link>
            </div>
            <AdSlot id="state-sidebar-bottom" />
          </aside>
        </div>

        <div className="mt-10">
          <Link to="/states" className="text-sm font-semibold text-sky-300 hover:text-sky-200">
            ← Back to all states
          </Link>
        </div>
      </div>
    </div>
  )
}
