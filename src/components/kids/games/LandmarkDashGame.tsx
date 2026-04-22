import { useMemo, useState } from 'react'

type LandmarkRound = {
  clue: string
  answer: string
  options: string[]
}

const LANDMARKS = [
  { clue: 'Grand Canyon National Park', state: 'Arizona' },
  { clue: 'Golden Gate Bridge', state: 'California' },
  { clue: 'Mount Rushmore', state: 'South Dakota' },
  { clue: 'Gateway Arch', state: 'Missouri' },
  { clue: 'Space Needle', state: 'Washington' },
  { clue: 'Liberty Bell', state: 'Pennsylvania' },
  { clue: 'French Quarter', state: 'Louisiana' },
  { clue: 'Niagara Falls', state: 'New York' },
  { clue: 'Walt Disney World', state: 'Florida' },
  { clue: 'Alamo', state: 'Texas' },
] as const

function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr]
  let value = seed || 1
  for (let i = out.length - 1; i > 0; i--) {
    value = (value * 1103515245 + 12345) % 2147483648
    const j = Math.floor((value / 2147483648) * (i + 1))
    ;[out[i], out[j]] = [out[j]!, out[i]!]
  }
  return out
}

function makeRound(seed: number): LandmarkRound {
  const chosen = LANDMARKS[Math.abs(seed) % LANDMARKS.length]!
  const wrong = shuffle(
    LANDMARKS.filter((item) => item.state !== chosen.state).map((item) => item.state),
    seed + 5,
  ).slice(0, 3)
  return {
    clue: chosen.clue,
    answer: chosen.state,
    options: shuffle([chosen.state, ...wrong], seed + 15),
  }
}

export function LandmarkDashGame({ seed }: { seed: number }) {
  const [round, setRound] = useState(seed)
  const [streak, setStreak] = useState(0)
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const current = useMemo(() => makeRound(round), [round])

  const answer = (state: string) => {
    if (state === current.answer) {
      setStreak((value) => value + 1)
      setResult('correct')
    } else {
      setStreak(0)
      setResult('wrong')
    }

    window.setTimeout(() => {
      setRound((value) => value + 1)
      setResult(null)
    }, 900)
  }

  return (
    <div className="glass-panel rounded-3xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Landmark dash</div>
          <div className="mt-2 text-sm text-slate-300/90">Match the famous place to the correct state.</div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200/90">
          Streak: {streak}
        </div>
      </div>

      <div className="mt-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(30,64,175,0.28),rgba(178,34,52,0.2),rgba(255,255,255,0.04))] p-6">
        <div className="text-sm uppercase tracking-[0.28em] text-slate-300">Where is this landmark?</div>
        <div className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold text-white">{current.clue}</div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {current.options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => answer(option)}
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left text-sm font-semibold text-white transition hover:border-sky-400/30 hover:bg-white/5"
          >
            {option}
          </button>
        ))}
      </div>

      <div className="mt-5 text-sm text-slate-300/90">
        {result === 'correct' && <span className="font-bold text-emerald-300">Correct state.</span>}
        {result === 'wrong' && (
          <span className="font-bold text-rose-300">
            Good try — <span className="text-white">{current.clue}</span> is in <span className="text-white">{current.answer}</span>.
          </span>
        )}
      </div>
    </div>
  )
}
