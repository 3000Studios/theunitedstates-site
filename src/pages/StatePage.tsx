import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Seo } from '@/components/seo/Seo'
import { AdSlot } from '@/components/ads/AdSlot'
import { StateWallpaper } from '@/components/states/StateWallpaper'
import { findStateBySlug } from '@/data/usStates'
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
  const [cities, setCities] = useState<WikidataCity[] | null>(null)

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
      <div className="glass-panel rounded-3xl p-8">
        <div className="text-sm text-slate-300">State not found.</div>
        <Link to="/states" className="mt-4 inline-block text-sm font-semibold text-sky-200 hover:text-white">
          Back to States
        </Link>
      </div>
    )
  }

  const heroVideoUrl = state.heroVideoUrl ?? FALLBACK_VIDEO_URL
  const cityNames = Array.isArray(cities) ? cities.map((city) => city.name) : []
  const seoBrief = buildStateSeoBrief(state, cityNames)
  const faq = buildStateFaq(state)

  return (
    <div className="relative isolate">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-[2.5rem]">
        <StateWallpaper state={state} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.14),rgba(2,6,23,0.3)_20%,rgba(2,6,23,0.72)_68%,rgba(2,6,23,0.94)_100%)]" />
      </div>
      <Seo
        title={`${state.name} Travel Guide | The United States`}
        description={`Explore ${state.name}: quick facts, photos, and travel-friendly links (capital: ${state.capital}).`}
        path={`/states/${state.slug}`}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }}
      />

      <header className="mb-8">
        <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">{state.abbreviation}</div>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">
          {state.name}
        </h1>
        <p className="mt-3 max-w-3xl text-base text-slate-300/90">
          Capital: <span className="font-semibold text-white">{state.capital}</span>
        </p>
      </header>

      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/30">
        <StateWallpaper state={state} />
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-80"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src={heroVideoUrl}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.35),transparent_55%),radial-gradient(circle_at_70%_30%,rgba(178,34,52,0.35),transparent_55%),linear-gradient(180deg,rgba(2,6,23,0.2),rgba(2,6,23,0.9))]" />
        <div className="relative z-10 mx-auto max-w-[1100px] px-5 py-14 md:py-20">
          <div className="glass-panel inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-200/80">
            Explore · Plan · Save
          </div>
          <div className="mt-5 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            Your trip starts here
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200/90 md:text-base">
            Use the quick facts, official resources, and guide links below to build a family-friendly itinerary.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/updates"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-900/30"
            >
              Good news updates
            </Link>
            <a
              href={`https://en.wikivoyage.org/wiki/${encodeURIComponent(state.name)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10"
            >
              Wikivoyage travel page
            </a>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <AdSlot slotKey="topBanner" className="mx-auto max-w-[970px]" />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="space-y-6">
          <div className="glass-panel rounded-3xl p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Quick facts</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Abbreviation</div>
                <div className="mt-1 text-lg font-extrabold text-white">{state.abbreviation}</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Capital</div>
                <div className="mt-1 text-lg font-extrabold text-white">{state.capital}</div>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Travel planning brief</div>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-300/90">
              {seoBrief.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <div className="flex items-center justify-between gap-4">
              <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Major cities</div>
              <a
                className="text-xs font-semibold text-sky-200 hover:text-white"
                href={`https://www.wikidata.org/wiki/${state.wikidataQid}`}
                target="_blank"
                rel="noreferrer"
              >
                Data source
              </a>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {(cities ?? Array.from({ length: 6 })).slice(0, 8).map((c, idx) => (
                <div
                  key={c ? c.qid : `s-${idx}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200/90"
                >
                  {c ? (
                    <>
                      <span className="font-semibold text-white">{c.name}</span>
                      {typeof c.population === 'number' && Number.isFinite(c.population) && (
                        <span className="ml-2 text-xs text-slate-400">
                          Pop. {Intl.NumberFormat(undefined).format(c.population)}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="inline-block h-4 w-40 animate-pulse rounded bg-white/10" />
                  )}
                </div>
              ))}
            </div>
            {Array.isArray(cities) && cities.length === 0 && (
              <div className="mt-3 text-xs text-slate-400">
                City list unavailable right now. Try again later.
              </div>
            )}
          </div>

          {state.heroPhotoUrl && (
            <div className="glass-panel overflow-hidden rounded-3xl">
              <div className="border-b border-white/10 px-5 py-4">
                <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Photo</div>
              </div>
              <div className="p-5">
                <img src={state.heroPhotoUrl} alt={`${state.name} photo`} className="w-full rounded-2xl border border-white/10 object-cover" />
                {state.heroPhotoFile && (
                  <a
                    href={commonsFilePage(state.heroPhotoFile)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 block text-xs font-semibold text-sky-200 hover:text-white"
                  >
                    Source: {state.heroPhotoFile}
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="glass-panel rounded-3xl p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Official + research links</div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                href={`https://www.wikidata.org/wiki/${state.wikidataQid}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white hover:border-sky-400/30"
              >
                Wikidata facts
              </a>
              {state.commonsCategory && (
                <a
                  href={`https://commons.wikimedia.org/wiki/Category:${encodeURIComponent(state.commonsCategory)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white hover:border-sky-400/30"
                >
                  Wikimedia Commons media
                </a>
              )}
              <a
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(state.name)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white hover:border-sky-400/30"
              >
                Wikipedia overview
              </a>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(`${state.name} official tourism site`)}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white hover:border-sky-400/30"
              >
                Find official tourism site
              </a>
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Frequently searched questions</div>
            <div className="mt-4 space-y-4">
              {faq.map((item) => (
                <article key={item.question} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <h2 className="text-base font-extrabold text-white">{item.question}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300/90">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="glass-panel overflow-hidden rounded-3xl">
            <div className="border-b border-white/10 px-5 py-4">
              <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">State flag</div>
            </div>
            <div className="p-5">
              {state.flagUrl ? (
                <img src={state.flagUrl} alt={`${state.name} flag`} className="w-full rounded-2xl border border-white/10 bg-white/5 p-3" />
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  Flag image unavailable.
                </div>
              )}
              {state.flagFile && (
                <a
                  href={commonsFilePage(state.flagFile)}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block text-xs font-semibold text-sky-200 hover:text-white"
                >
                  Source: {state.flagFile}
                </a>
              )}
            </div>
          </div>

          <AdSlot slotKey="sidebar" className="hidden lg:block" />

          {state.sealUrl && (
            <div className="glass-panel overflow-hidden rounded-3xl">
              <div className="border-b border-white/10 px-5 py-4">
                <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">State seal</div>
              </div>
              <div className="p-5">
                <img src={state.sealUrl} alt={`${state.name} seal`} className="w-full rounded-2xl border border-white/10 bg-white/5 p-3" />
                {state.sealFile && (
                  <a
                    href={commonsFilePage(state.sealFile)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 block text-xs font-semibold text-sky-200 hover:text-white"
                  >
                    Source: {state.sealFile}
                  </a>
                )}
              </div>
            </div>
          )}

          <div className="glass-panel rounded-3xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Media note</div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Video/photo files are loaded directly from Wikimedia Commons when available; otherwise we fall back to a
              public-domain U.S. history clip.
            </p>
            <a
              href={commonsFilePage(state.heroVideoFile ?? FALLBACK_VIDEO_FILE)}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block text-xs font-semibold text-sky-200 hover:text-white"
            >
              Video source file
            </a>
          </div>
        </aside>
      </div>
    </div>
  )
}
