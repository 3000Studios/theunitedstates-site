import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { AdSlot } from '@/components/ads/AdSlot'
import { fetchGame, type ApiGame } from '@/lib/api'
import { CapitalSprintGame } from '@/components/kids/games/CapitalSprintGame'
import { FlagMemoryGame } from '@/components/kids/games/FlagMemoryGame'
import { EagleRunGame } from '@/components/kids/games/EagleRunGame'

const HERO_VIDEO =
  'https://commons.wikimedia.org/wiki/Special:FilePath/DSCOVR%20EPIC%20Earth%20Rotation.webm'

function renderGame(game: ApiGame) {
  if (game.kind === 'capital_sprint') return <CapitalSprintGame seed={game.seed} />
  if (game.kind === 'flag_memory') return <FlagMemoryGame seed={game.seed} />
  return <EagleRunGame seed={game.seed} />
}

export function GamePage() {
  const { id } = useParams()
  return <GamePageContent key={id ?? 'missing-game'} id={id ?? ''} />
}

function GamePageContent({ id }: { id: string }) {
  const [game, setGame] = useState<ApiGame | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    fetchGame(id)
      .then((g) => {
        if (!cancelled) setGame(g)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  const title = useMemo(() => (game ? `${game.title} | Kid Zone` : 'Kid Zone Game'), [game])
  const desc = useMemo(() => (game ? game.description : 'A family-friendly USA game.'), [game])

  if (loading) {
    return (
      <div className="glass-panel rounded-3xl p-8 text-sm text-slate-300/90">
        Loading game…
      </div>
    )
  }

  if (!game) {
    return (
      <div className="glass-panel rounded-3xl p-8">
        <div className="text-sm text-slate-300/90">Game not found.</div>
        <Link to="/kids" className="mt-4 inline-block text-sm font-semibold text-sky-200 hover:text-white">
          Back to Kid Zone
        </Link>
      </div>
    )
  }

  return (
    <>
      <Seo title={title} description={desc} path={`/kids/games/${encodeURIComponent(game.id)}`} />

      <header className="mb-8">
        <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Kid Zone</div>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">
          {game.title}
        </h1>
        <p className="mt-3 max-w-3xl text-base text-slate-300/90">{game.description}</p>
        <Link to="/kids" className="mt-4 inline-block text-sm font-semibold text-sky-200 hover:text-white">
          ← Back to games
        </Link>
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
          {renderGame(game)}
        </div>
      </section>

      <div className="mt-8">
        <AdSlot slotKey="inContent" className="mx-auto max-w-[728px]" />
      </div>
    </>
  )
}
