import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { AdSlot } from '@/components/ads/AdSlot'
import { fetchGames, type ApiGame } from '@/lib/api'

const HERO_VIDEO =
  'https://commons.wikimedia.org/wiki/Special:FilePath/Grand%20Canyon%20National%20Park-%20Timelapse%20Video%20-%20Summer%20Clouds%20%287775362134%29.webm'

export function KidsPage() {
  const [games, setGames] = useState<ApiGame[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchGames()
      .then((g) => {
        if (!cancelled) setGames(g)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const latest = useMemo(() => games.slice(0, 24), [games])

  return (
    <>
      <Seo title="Kid Zone | The United States" description="Family-friendly USA games and learning." path="/kids" />

      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">
          Kid Zone
        </h1>
        <p className="mt-3 max-w-3xl text-base text-slate-300/90">
          Pick a game and play. New games are added automatically every hour.
        </p>
      </header>

      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40">
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-75"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          src={HERO_VIDEO}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.35),transparent_55%),radial-gradient(circle_at_70%_30%,rgba(178,34,52,0.28),transparent_55%),linear-gradient(180deg,rgba(2,6,23,0.15),rgba(2,6,23,0.9))]" />
        <div className="relative z-10 px-5 py-10 md:px-10">
          <div className="glass-panel inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-200/80">
            USA · Games · Family-friendly
          </div>
          <div className="mt-5 font-[family-name:var(--font-display)] text-2xl font-extrabold text-white md:text-3xl">
            Choose a game
          </div>
          <p className="mt-2 max-w-2xl text-sm text-slate-200/90">
            Built to be mobile-friendly. No accounts needed. New memory, landmark, and state puzzle games rotate in automatically.
          </p>
        </div>
      </section>

      <AdSlot slotKey="topBanner" className="mx-auto mt-8 max-w-[970px]" />

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">Games</h2>
          <div className="text-xs font-semibold text-slate-400">
            {loading ? 'Loading…' : `${games.length} available`}
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((g) => (
            <Link key={g.id} to={`/kids/games/${encodeURIComponent(g.id)}`} className="glass-panel rounded-3xl p-6 hover:border-sky-400/30">
              <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">{g.kind.replace('_', ' ')}</div>
              <div className="mt-3 font-[family-name:var(--font-display)] text-xl font-extrabold text-white">{g.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-300/90">{g.description}</p>
              <div className="mt-4 text-xs font-semibold text-sky-200">Play →</div>
            </Link>
          ))}
          {loading && Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-panel rounded-3xl p-6">
              <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
              <div className="mt-4 h-5 w-3/4 animate-pulse rounded bg-white/10" />
              <div className="mt-3 h-4 w-full animate-pulse rounded bg-white/10" />
              <div className="mt-2 h-4 w-5/6 animate-pulse rounded bg-white/10" />
            </div>
          ))}
          {!loading && games.length === 0 && (
            <div className="glass-panel rounded-3xl p-8 text-sm text-slate-300/90">
              No games yet. Check back soon.
            </div>
          )}
        </div>

        <div className="mt-10">
          <AdSlot slotKey="inContent" className="mx-auto max-w-[728px]" />
        </div>
      </section>
    </>
  )
}
