import { useMemo, useState } from 'react'
import { US_STATES } from '@/data/usStates'

type Question = { state: string; capital: string; options: string[] }

function pick<T>(arr: T[], seed: number): T {
  const i = Math.abs(seed) % arr.length
  return arr[i]!
}

function shuffle<T>(arr: T[], seed: number): T[] {
  const out = [...arr]
  for (let i = out.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280
    const j = Math.floor((seed / 233280) * (i + 1))
    ;[out[i], out[j]] = [out[j]!, out[i]!]
  }
  return out
}

function buildQuestion(seed: number): Question {
  const states = US_STATES.filter((s) => s.capital && s.name)
  const correct = pick(states, seed)
  const wrong = new Set<string>()
  let s = seed + 17
  while (wrong.size < 3) {
    const c = pick(states, s).capital
    if (c !== correct.capital) wrong.add(c)
    s += 11
  }
  const options = shuffle([correct.capital, ...wrong], seed + 3)
  return { state: correct.name, capital: correct.capital, options }
}

export function CapitalSprintGame({ seed }: { seed: number }) {
  const [score, setScore] = useState(0)
  const [tries, setTries] = useState(0)
  const [qSeed, setQSeed] = useState(seed)
  const q = useMemo(() => buildQuestion(qSeed), [qSeed])
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const accuracy = tries ? Math.round((score / tries) * 100) : 0

  const answer = (choice: string) => {
    setTries((t) => t + 1)
    if (choice === q.capital) {
      setScore((s) => s + 1)
      setResult('correct')
    } else {
      setResult('wrong')
    }
    window.setTimeout(() => {
      setQSeed((s) => s + 1)
      setResult(null)
    }, 700)
  }

  return (
    <div className="glass-panel rounded-3xl p-6">
      <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Capital sprint</div>
      <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">
        What is the capital of <span className="gradient-text glow-text">{q.state}</span>?
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {q.options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => answer(opt)}
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left text-sm font-semibold text-white transition hover:border-sky-400/30 hover:bg-white/5"
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="mt-6 text-sm text-slate-300/90">
        {result === 'correct' && <span className="font-bold text-emerald-300">Correct!</span>}
        {result === 'wrong' && (
          <span className="font-bold text-rose-300">
            Not quite — the capital is <span className="text-white">{q.capital}</span>.
          </span>
        )}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Correct</div>
          <div className="mt-1 text-2xl font-extrabold text-white">{score}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Tries</div>
          <div className="mt-1 text-2xl font-extrabold text-white">{tries}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Accuracy</div>
          <div className="mt-1 text-2xl font-extrabold text-white">{accuracy}%</div>
        </div>
      </div>
    </div>
  )
}

