import { useMemo, useState } from 'react'
import { Seo } from '@/components/seo/Seo'
import { AdSlot } from '@/components/ads/AdSlot'
import { US_STATES } from '@/data/usStates'

type Question = {
  state: string
  capital: string
  options: string[]
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

function buildQuestion(): Question {
  const correct = pick(US_STATES)
  const wrong = new Set<string>()
  while (wrong.size < 3) {
    const c = pick(US_STATES).capital
    if (c !== correct.capital) wrong.add(c)
  }
  const options = [correct.capital, ...wrong]
  options.sort(() => Math.random() - 0.5)
  return { state: correct.name, capital: correct.capital, options }
}

export function KidsPage() {
  const [score, setScore] = useState(0)
  const [tries, setTries] = useState(0)
  const [q, setQ] = useState<Question>(() => buildQuestion())
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)

  const accuracy = useMemo(() => (tries ? Math.round((score / tries) * 100) : 0), [score, tries])

  const answer = (choice: string) => {
    setTries((t) => t + 1)
    if (choice === q.capital) {
      setScore((s) => s + 1)
      setResult('correct')
    } else {
      setResult('wrong')
    }
    window.setTimeout(() => {
      setQ(buildQuestion())
      setResult(null)
    }, 900)
  }

  return (
    <>
      <Seo
        title="Kid Zone | The United States"
        description="Family-friendly USA learning: quick trivia and state capital practice."
        path="/kids"
      />

      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">
          Kid Zone
        </h1>
        <p className="mt-3 max-w-3xl text-base text-slate-300/90">
          Quick, family-friendly trivia. No accounts. No chat. Just learn the states.
        </p>
      </header>

      <AdSlot slotKey="topBanner" className="mx-auto mb-8 max-w-[970px]" />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="glass-panel rounded-3xl p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Capital quiz</div>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">
            What is the capital of <span className="gradient-text glow-text">{q.state}</span>?
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {q.options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => answer(opt)}
                className="kid-choice rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left text-sm font-semibold text-white transition hover:border-sky-400/30 hover:bg-white/5"
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
        </section>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="glass-panel rounded-3xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Score</div>
            <div className="mt-4 grid grid-cols-3 gap-3">
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
            <button
              type="button"
              onClick={() => {
                setScore(0)
                setTries(0)
              }}
              className="mt-4 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Reset
            </button>
          </div>

          <AdSlot slotKey="sidebar" className="hidden lg:block" />

          <div className="glass-panel rounded-3xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Parent note</div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              This page does not collect personal information from kids. Newsletter signups and contact forms are
              intended for adults only.
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}

