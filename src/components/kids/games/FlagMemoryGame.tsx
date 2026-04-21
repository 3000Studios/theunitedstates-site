import { useMemo, useState } from 'react'
import { US_STATES } from '@/data/usStates'

type Card = { id: string; label: string; img: string }

function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280
    const j = Math.floor((seed / 233280) * (i + 1))
    ;[out[i], out[j]] = [out[j]!, out[i]!]
  }
  return out
}

export function FlagMemoryGame({ seed }: { seed: number }) {
  const cards = useMemo(() => {
    const pool = US_STATES.filter((s) => s.flagUrl).slice(0, 30)
    const picked = shuffle(pool, seed).slice(0, 8)
    const base: Card[] = picked.flatMap((s) => {
      const img = s.flagUrl!
      return [
        { id: `${s.id}-a`, label: s.name, img },
        { id: `${s.id}-b`, label: s.name, img },
      ]
    })
    return shuffle(base, seed + 9)
  }, [seed])

  const [flipped, setFlipped] = useState<string[]>([])
  const [matched, setMatched] = useState<Set<string>>(() => new Set())
  const [moves, setMoves] = useState(0)

  const reveal = (c: Card) => {
    if (matched.has(c.label)) return
    if (flipped.includes(c.id)) return
    if (flipped.length === 2) return
    const next = [...flipped, c.id]
    setFlipped(next)
    if (next.length === 2) {
      setMoves((m) => m + 1)
      const [a, b] = next
      const ca = cards.find((x) => x.id === a)
      const cb = cards.find((x) => x.id === b)
      if (ca && cb && ca.label === cb.label) {
        setMatched((s) => new Set([...s, ca.label]))
        window.setTimeout(() => setFlipped([]), 550)
      } else {
        window.setTimeout(() => setFlipped([]), 750)
      }
    }
  }

  const complete = matched.size === new Set(cards.map((c) => c.label)).size

  return (
    <div className="glass-panel rounded-3xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Flag memory</div>
          <div className="mt-2 text-sm text-slate-300/90">Flip cards and match the state flags.</div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200/90">
          Moves: {moves}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-3 sm:gap-4">
        {cards.map((c) => {
          const isUp = flipped.includes(c.id) || matched.has(c.label)
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => reveal(c)}
              className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 hover:border-sky-400/30"
              aria-label={isUp ? c.label : 'Hidden card'}
            >
              <div className={`absolute inset-0 transition ${isUp ? 'opacity-0' : 'opacity-100'}`}>
                <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.25),transparent_55%),radial-gradient(circle_at_70%_40%,rgba(178,34,52,0.22),transparent_55%),linear-gradient(135deg,rgba(10,31,68,0.85),rgba(2,6,23,0.85))]" />
                <div className="absolute inset-0 grid place-items-center text-[10px] font-extrabold uppercase tracking-[0.25em] text-white/80">
                  USA
                </div>
              </div>
              <div className={`relative h-full w-full transition ${isUp ? 'opacity-100' : 'opacity-0'}`}>
                <img src={c.img} alt={c.label} className="h-full w-full rounded-xl border border-white/10 bg-white/5 object-contain p-2" />
              </div>
            </button>
          )
        })}
      </div>

      {complete && (
        <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm font-semibold text-emerald-100">
          Nice work — you matched them all!
        </div>
      )}
    </div>
  )
}

