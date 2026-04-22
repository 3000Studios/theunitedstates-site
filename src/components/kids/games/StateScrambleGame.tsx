import { useMemo, useState } from 'react'
import { US_STATES } from '@/data/usStates'

type Puzzle = {
  state: string
  answer: string
  options: string[]
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr]
  let value = seed || 1
  for (let i = out.length - 1; i > 0; i--) {
    value = (value * 1664525 + 1013904223) % 4294967296
    const j = Math.floor((value / 4294967296) * (i + 1))
    ;[out[i], out[j]] = [out[j]!, out[i]!]
  }
  return out
}

function buildPuzzle(seed: number): Puzzle {
  const pool = US_STATES.filter((state) => state.abbreviation && state.name)
  const chosen = pool[Math.abs(seed) % pool.length]!
  const wrong = shuffle(
    pool.filter((state) => state.abbreviation !== chosen.abbreviation).map((state) => state.abbreviation),
    seed + 11,
  ).slice(0, 3)

  return {
    state: chosen.name,
    answer: chosen.abbreviation,
    options: shuffle([chosen.abbreviation, ...wrong], seed + 21),
  }
}

export function StateScrambleGame({ seed }: { seed: number }) {
  const [round, setRound] = useState(seed)
  const [score, setScore] = useState(0)
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const puzzle = useMemo(() => buildPuzzle(round), [round])

  const choose = (value: string) => {
    if (value === puzzle.answer) {
      setScore((current) => current + 1)
      setResult('correct')
    } else {
      setResult('wrong')
    }

    window.setTimeout(() => {
      setRound((current) => current + 1)
      setResult(null)
    }, 850)
  }

  return (
    <div className="glass-panel rounded-3xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">State scramble</div>
          <div className="mt-2 text-sm text-slate-300/90">Pick the right postal abbreviation before the next round starts.</div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200/90">
          Score: {score}
        </div>
      </div>

      <div className="mt-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-center">
        <div className="text-sm uppercase tracking-[0.3em] text-slate-400">Which abbreviation matches</div>
        <div className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold text-white">{puzzle.state}?</div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {puzzle.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => choose(option)}
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center text-xl font-black tracking-[0.18em] text-white transition hover:border-sky-400/30 hover:bg-white/5"
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-5 text-sm text-slate-300/90">
        {result === 'correct' && <span className="font-bold text-emerald-300">Correct match.</span>}
        {result === 'wrong' && (
          <span className="font-bold text-rose-300">
            Not this one — <span className="text-white">{puzzle.state}</span> is <span className="text-white">{puzzle.answer}</span>.
          </span>
        )}
      </div>
    </div>
  )
}
