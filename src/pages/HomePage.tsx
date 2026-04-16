import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { motion } from 'framer-motion'

const HeroGlobe = lazy(async () => {
  const m = await import('@/components/three/HeroGlobe')
  return { default: m.HeroGlobe }
})
import { AdSlot } from '@/components/ads/AdSlot'
import { ArticleCard } from '@/components/cards/ArticleCard'
import { AffiliateSection } from '@/components/monetization/AffiliateSection'
import { ComparisonTable } from '@/components/monetization/ComparisonTable'
import { NewsletterInline } from '@/components/layout/NewsletterInline'
import { TrendingStrip } from '@/components/layout/TrendingStrip'
import { Seo } from '@/components/seo/Seo'
import { useArticles } from '@/context/useArticles'
import { sortByDateDesc } from '@/lib/articles'

const PAGE_SIZE = 6

export function HomePage() {
  const articles = useArticles()
  const sorted = useMemo(() => sortByDateDesc(articles), [articles])
  const featured = useMemo(() => sorted.filter((a) => a.featured).slice(0, 3), [sorted])
  const [visible, setVisible] = useState(PAGE_SIZE)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const heroRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const root = heroRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: 26,
        opacity: 0,
        duration: 0.85,
        stagger: 0.09,
        ease: 'power3.out',
      })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible((v) => Math.min(v + PAGE_SIZE, sorted.length))
          }
        })
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [sorted.length])

  const feed = sorted.slice(0, visible)
  const categories = [
    { to: '/news', label: 'News', desc: 'Clear context without the noise.' },
    { to: '/money', label: 'Money / Jobs', desc: 'Income, careers, and realistic side paths.' },
    { to: '/tech', label: 'Tech', desc: 'Skills, security, and tools that matter.' },
    { to: '/guides', label: 'Guides', desc: 'Step-by-step playbooks for real life.' },
    { to: '/states', label: 'States', desc: 'State-by-state snapshots you can use.' },
    { to: '/store', label: 'Store', desc: 'Curated picks that support the newsroom.' },
  ]

  const readNext = sorted.slice(0, 5)

  return (
    <>
      <Seo
        title="The United States Site | News, Lifestyle & Opportunity"
        description="Breaking context, lifestyle, money, tech, and state-by-state guides for Americans—fast, modern, and advertiser-safe."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'NewsMediaOrganization',
          name: 'The United States Site',
          url: 'https://theunitedstates.site/',
          logo: 'https://theunitedstates.site/favicon.svg',
        }}
      />

      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050d1a]">
        <Suspense
          fallback={
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#1d4ed8_0%,transparent_45%),radial-gradient(circle_at_80%_30%,#b22234_0%,transparent_40%),linear-gradient(135deg,#050d1a,#0a1f44_60%,#020617)]" />
          }
        >
          <HeroGlobe />
        </Suspense>
        <div ref={heroRef} className="relative z-10 mx-auto max-w-[1100px] px-4 py-16 md:py-24">
          <div className="hero-reveal inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-200/80">
            USA · {new Date().getFullYear()} briefing
          </div>
          <h1 className="hero-reveal mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl">
            <span className="gradient-text glow-text">The United States</span>
            <br />
            <span className="text-white">explained for modern life</span>
          </h1>
          <p className="hero-reveal mt-5 max-w-2xl text-base leading-relaxed text-slate-200/90 md:text-lg">
            Breaking context, lifestyle, opportunity, and guides—built for speed, designed for trust, and optimized for
            readers who want signal over shouting.
          </p>
          <div className="hero-reveal mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/news"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-900/30"
            >
              Read the latest
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Search the archive
            </Link>
          </div>

          <div className="hero-reveal mt-10 grid gap-4 md:grid-cols-3">
            {featured.map((a) => (
              <Link
                key={a.id}
                to={`/article/${a.slug}`}
                className="glass-panel rounded-2xl p-4 transition hover:border-sky-400/30"
              >
                <div className="text-[11px] font-bold uppercase tracking-widest text-sky-200/80">Featured</div>
                <div className="mt-2 line-clamp-3 font-[family-name:var(--font-display)] text-base font-extrabold text-white">
                  {a.title}
                </div>
                <div className="mt-2 line-clamp-3 text-xs text-slate-300/90">{a.excerpt}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8">
        <AdSlot slotKey="topBanner" className="mx-auto max-w-[970px]" />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <section>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">
                Latest stories
              </h2>
              <Link to="/blog" className="text-sm font-semibold text-sky-200 hover:text-white">
                View all
              </Link>
            </div>
            <div className="mt-6 space-y-6">
              {feed.map((a, idx) => (
                <div key={a.id}>
                  <ArticleCard article={a} />
                  {(idx + 1) % 3 === 0 && (
                    <div className="mt-6">
                      <AdSlot slotKey="betweenSections" className="mx-auto max-w-[728px]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div ref={sentinelRef} className="h-8" />
            {visible < sorted.length && (
              <div className="mt-8 text-center text-sm text-slate-400">Loading more…</div>
            )}
          </section>

          <AffiliateSection />
          <ComparisonTable />
          <NewsletterInline />
        </div>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <TrendingStrip />
          <div className="glass-panel rounded-3xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Read next</div>
            <ul className="mt-4 space-y-3">
              {readNext.map((a) => (
                <li key={a.id}>
                  <Link to={`/article/${a.slug}`} className="text-sm font-semibold text-slate-100 hover:text-sky-200">
                    {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <AdSlot slotKey="sidebar" className="hidden lg:block" />
          <div className="glass-panel rounded-3xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Categories</div>
            <div className="mt-4 grid gap-2">
              {categories.map((c) => (
                <Link
                  key={c.to}
                  to={c.to}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm transition hover:border-sky-400/30"
                >
                  <div className="font-bold text-white">{c.label}</div>
                  <div className="text-xs text-slate-400">{c.desc}</div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-14">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">
            Trending topics
          </h2>
          <motion.div
            aria-hidden
            className="h-px flex-1 bg-gradient-to-r from-sky-500/40 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {Array.from(new Set(sorted.flatMap((a) => a.tags)))
            .slice(0, 18)
            .map((t) => (
              <Link
                key={t}
                to={`/search?q=${encodeURIComponent(t)}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 hover:border-sky-400/40"
              >
                #{t}
              </Link>
            ))}
        </div>
      </section>

      <div className="mt-10">
        <AdSlot slotKey="inContent" className="mx-auto max-w-[728px]" />
      </div>
    </>
  )
}
