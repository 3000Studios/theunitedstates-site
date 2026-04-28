import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { motion } from 'framer-motion'
import { Seo } from '@/components/seo/Seo'
import { AdSlot } from '@/components/ads/AdSlot'
import { useArticles } from '@/context/useArticles'
import { sortByDateDesc } from '@/lib/articles'
import { US_STATES } from '@/data/usStates'
import { buildHomeClusters } from '@/lib/seoContent'

const HeroGlobe = lazy(async () => {
  const m = await import('@/components/three/HeroGlobe')
  return { default: m.HeroGlobe }
})

const USA_HERO_VIDEOS = [
  {
    file: 'File:DSCOVR EPIC Earth Rotation.webm',
    title: 'America from orbit',
  },
  {
    file: 'File:Grand Canyon National Park- Timelapse Video - Summer Clouds (7775362134).webm',
    title: 'Grand Canyon skies',
  },
  {
    file: 'File:U.S.A Flag Flapping.webmhd.webm',
    title: 'Stars and stripes in motion',
  },
  {
    file: 'File:Bald Eagles (18731656064).webm',
    title: 'Bald eagles in flight',
  },
  {
    file: 'File:Raising The American Flag.webm',
    title: 'American flag on the moon',
  },
] as const

function filePath(fileTitle: string): string {
  return 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(fileTitle.replace(/^File:/, ''))
}

const BILL_OF_RIGHTS_SHORT = [
  'Speech & religion',
  'Arms',
  'Quartering',
  'Search & seizure',
  'Due process',
  'Criminal trial rights',
  'Civil jury',
  'Bail & punishment',
  'Other rights',
  'Reserved powers',
] as const

export function HomePage() {
  const stories = useArticles()
  const sorted = useMemo(() => sortByDateDesc(stories), [stories])
  const latest = sorted.slice(0, 6)
  const featuredStates = useMemo(() => US_STATES.slice(0, 12), [])
  const clusters = useMemo(() => buildHomeClusters(), [])

  const [heroIdx, setHeroIdx] = useState(0)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const heroVideoRefs = useRef<Array<HTMLVideoElement | null>>([])

  useEffect(() => {
    const root = heroRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', { y: 22, opacity: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out' })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    heroVideoRefs.current.forEach((video, index) => {
      if (!video) return
      if (index !== heroIdx) {
        video.pause()
        if (video.currentTime > 0) video.currentTime = 0
      }
    })

    const activeVideo = heroVideoRefs.current[heroIdx]
    if (!activeVideo) return

    activeVideo.currentTime = 0
    const playPromise = activeVideo.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {})
    }
  }, [heroIdx])

  return (
    <>
      <Seo
        title="The United States of America | Travel, States, History, Good News"
        description="Explore all 50 states (plus D.C.), plan family-friendly trips, and read uplifting updates—built for speed, trust, and advertiser safety."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'The United States',
          url: 'https://theunitedstates.site/',
        }}
      />

      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050d1a]">
        <div className="absolute inset-0">
          {USA_HERO_VIDEOS.map((video, i) => (
            <video
              key={video.file}
              ref={(node) => {
                heroVideoRefs.current[i] = node
              }}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === heroIdx ? 'opacity-70' : 'opacity-0'
              }`}
              autoPlay={i === heroIdx}
              muted
              playsInline
              preload="metadata"
              onEnded={() => setHeroIdx((current) => (current + 1) % USA_HERO_VIDEOS.length)}
              src={filePath(video.file)}
            />
          ))}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.35),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(178,34,52,0.35),transparent_55%),linear-gradient(135deg,rgba(5,13,26,0.85),rgba(10,31,68,0.55),rgba(2,6,23,0.9))]" />
        </div>

        <Suspense
          fallback={
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0%,transparent_45%),radial-gradient(circle_at_80%_30%,#b22234_0%,transparent_40%),linear-gradient(135deg,#050d1a,#0a1f44_60%,#020617)]" />
          }
        >
          <HeroGlobe />
        </Suspense>

        <div ref={heroRef} className="relative z-10 mx-auto max-w-[1100px] px-4 py-16 md:py-24">
          <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-200/80">
            United States of America · Travel + history
          </div>
          <h1 className="hero-reveal mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl">
            <span className="gradient-text glow-text">The United States</span>
            <br />
            <span className="text-white">explore every state</span>
          </h1>
          <p className="hero-reveal mt-5 max-w-2xl text-base leading-relaxed text-slate-200/90 md:text-lg">
            Family-friendly destinations, history you can trust, and uplifting updates—designed to be fast, readable, and
            ad-ready.
          </p>
          <div className="hero-reveal mt-4 inline-flex rounded-full border border-white/15 bg-black/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/85">
            Now playing: {USA_HERO_VIDEOS[heroIdx].title}
          </div>
          <div className="hero-reveal mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/states"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-900/30"
            >
              Explore states
            </Link>
            <Link
              to="/updates"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10"
            >
              Good news updates
            </Link>
            <Link
              to="/kids"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 hover:bg-white/10"
            >
              Kid Zone
            </Link>
          </div>

          <div className="hero-reveal mt-10 grid gap-4 md:grid-cols-3">
            <div className="glass-panel rounded-2xl p-4">
              <div className="text-[11px] font-bold uppercase tracking-widest text-sky-200/80">History</div>
              <div className="mt-2 font-[family-name:var(--font-display)] text-base font-extrabold text-white">
                The Constitution (quick reference)
              </div>
              <div className="mt-2 text-xs text-slate-300/90">Bill of Rights highlights + primary sources.</div>
              <Link to="/constitution" className="mt-3 inline-block text-xs font-semibold text-sky-200 hover:text-white">
                Open
              </Link>
            </div>
            <div className="glass-panel rounded-2xl p-4">
              <div className="text-[11px] font-bold uppercase tracking-widest text-sky-200/80">Travel</div>
              <div className="mt-2 font-[family-name:var(--font-display)] text-base font-extrabold text-white">
                State-by-state hub
              </div>
              <div className="mt-2 text-xs text-slate-300/90">Maps, media, capitals, and planning links.</div>
              <Link to="/states" className="mt-3 inline-block text-xs font-semibold text-sky-200 hover:text-white">
                Browse
              </Link>
            </div>
            <div className="glass-panel rounded-2xl p-4">
              <div className="text-[11px] font-bold uppercase tracking-widest text-sky-200/80">Good news</div>
              <div className="mt-2 font-[family-name:var(--font-display)] text-base font-extrabold text-white">
                Uplifting updates
              </div>
              <div className="mt-2 text-xs text-slate-300/90">Auto-updated headlines with source links.</div>
              <Link to="/updates" className="mt-3 inline-block text-xs font-semibold text-sky-200 hover:text-white">
                Read
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <AdSlot slotKey="topBanner" className="mx-auto max-w-[970px]" />
      </div>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <section className="grid gap-4 lg:grid-cols-3">
            {clusters.map((cluster) => (
              <article key={cluster.title} className="glass-panel rounded-3xl p-5">
                <div className="text-[11px] font-bold uppercase tracking-widest text-sky-200/80">SEO travel hub</div>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-xl font-extrabold text-white">{cluster.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300/90">{cluster.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cluster.links.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-slate-100 hover:border-sky-400/30 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <section>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">
                Latest updates
              </h2>
              <Link to="/updates" className="text-sm font-semibold text-sky-200 hover:text-white">
                View all
              </Link>
            </div>
            <div className="mt-6 space-y-4">
              {latest.map((a) => (
                <Link key={a.id} to={`/story/${a.slug}`} className="glass-panel block rounded-3xl p-5 hover:border-sky-400/30">
                  <div className="text-xs text-slate-400">
                    {new Date(a.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}{' '}
                    · <span className="uppercase tracking-widest">{a.category.replace('_', ' ')}</span>
                  </div>
                  <div className="mt-2 font-[family-name:var(--font-display)] text-lg font-extrabold text-white">
                    {a.title}
                  </div>
                  <div className="mt-2 line-clamp-2 text-sm text-slate-300/90">{a.excerpt}</div>
                </Link>
              ))}
            </div>
          </section>

          <section className="glass-panel rounded-3xl p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">
                Bill of Rights (10)
              </h2>
              <Link to="/constitution" className="text-sm font-semibold text-sky-200 hover:text-white">
                Open
              </Link>
            </div>
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {BILL_OF_RIGHTS_SHORT.map((t, i) => (
                <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200/90">
                  <span className="mr-2 font-extrabold text-white">{i + 1}.</span> {t}
                </div>
              ))}
            </div>
          </section>

          <section className="glass-panel rounded-3xl p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">First President</div>
            <div className="mt-3 grid gap-5 md:grid-cols-[220px_1fr]">
              <img
                className="w-full rounded-2xl border border-white/10 object-cover"
                src="https://commons.wikimedia.org/wiki/Special:FilePath/Gilbert%20Stuart%20Williamstown%20Portrait%20of%20George%20Washington.jpg"
                alt="George Washington portrait (public domain)"
                loading="lazy"
              />
              <div>
                <div className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white">
                  George Washington
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300/90">
                  Washington served as the first President of the United States (1789–1797). If you’re visiting
                  Washington, D.C., add time for the National Mall, monuments, and the Smithsonian museums.
                </p>
                <a
                  className="mt-3 inline-block text-xs font-semibold text-sky-200 hover:text-white"
                  href="https://www.archives.gov/founding-docs"
                  target="_blank"
                  rel="noreferrer"
                >
                  Founding documents (National Archives)
                </a>
              </div>
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <AdSlot slotKey="sidebar" className="hidden lg:block" />
          <div className="glass-panel rounded-3xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Explore states</div>
            <div className="mt-4 grid gap-2">
              {featuredStates.map((st) => (
                <Link
                  key={st.id}
                  to={`/states/${st.slug}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition hover:border-sky-400/30"
                >
                  {st.name} <span className="ml-2 text-xs text-slate-400">{st.abbreviation}</span>
                </Link>
              ))}
              <Link to="/states" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white hover:bg-white/10">
                View all states
              </Link>
            </div>
          </div>
          <motion.div
            aria-hidden
            className="h-px bg-gradient-to-r from-[#b22234]/60 via-sky-500/40 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <div className="glass-panel rounded-3xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Ad readiness</div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              This site ships with `ads.txt`, SEO metadata, and responsive ad slots sized for review. Add your AdSense
              slot IDs as environment variables to activate placements.
            </p>
          </div>
        </aside>
      </section>

      <div className="mt-10">
        <AdSlot slotKey="inContent" className="mx-auto max-w-[728px]" />
      </div>
    </>
  )
}
