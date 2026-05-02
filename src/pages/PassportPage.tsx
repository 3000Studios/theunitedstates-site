import { motion } from 'framer-motion'
import { Seo } from '@/components/seo/Seo'
import { US_STATES } from '@/data/usStates'
import { Link } from 'react-router-dom'

const STAMPS = [
  { id: 'ca', name: 'California', icon: '☀️' },
  { id: 'ny', name: 'New York', icon: '🗽' },
  { id: 'tx', name: 'Texas', icon: '🤠' },
  { id: 'fl', name: 'Florida', icon: '🏖️' },
]

export function PassportPage() {
  const earnedCount = 4
  const totalStates = US_STATES.length
  const progress = (earnedCount / totalStates) * 100

  return (
    <>
      <Seo
        title="Your USA Passport | Gamified Learning"
        description="Earn stamps for every state you visit and quiz you pass. Build your collection and become a Master Explorer of the United States."
        path="/passport"
      />

      <header className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-200/80">
          Explorer Progress
        </div>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-6xl">
          Your <span className="gradient-text glow-text">Passport</span>
        </h1>
        <div className="mx-auto mt-6 max-w-xl">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            <span>{earnedCount} of {totalStates} States Collected</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/5 border border-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-sky-500 to-indigo-600"
            />
          </div>
        </div>
      </header>

      <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="glass-panel rounded-3xl p-6 text-center">
          <div className="text-3xl">🏅</div>
          <div className="mt-3 font-bold text-white text-lg">Junior Ranger</div>
          <div className="text-xs text-slate-400 mt-1">Current Rank</div>
        </div>
        <div className="glass-panel rounded-3xl p-6 text-center">
          <div className="text-3xl">✨</div>
          <div className="mt-3 font-bold text-white text-lg">1,240 XP</div>
          <div className="text-xs text-slate-400 mt-1">Total Experience</div>
        </div>
        <div className="glass-panel rounded-3xl p-6 text-center">
          <div className="text-3xl">🗺️</div>
          <div className="mt-3 font-bold text-white text-lg">4 Stamps</div>
          <div className="text-xs text-slate-400 mt-1">States Visited</div>
        </div>
        <div className="glass-panel rounded-3xl p-6 text-center">
          <div className="text-3xl">🔥</div>
          <div className="mt-3 font-bold text-white text-lg">3 Days</div>
          <div className="text-xs text-slate-400 mt-1">Visit Streak</div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-white mb-8">
          State Stamp Collection
        </h2>
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {US_STATES.map((state) => {
            const isEarned = STAMPS.some(s => s.id === state.slug.slice(0, 2)) // Mock check
            return (
              <Link 
                key={state.id}
                to={`/states/${state.slug}`}
                className={`relative aspect-square flex flex-col items-center justify-center rounded-3xl border transition-all duration-300 ${
                  isEarned 
                    ? 'border-sky-500/50 bg-sky-500/10 shadow-lg shadow-sky-900/20' 
                    : 'border-white/5 bg-white/[0.02] grayscale opacity-40 hover:opacity-60'
                }`}
              >
                <div className="text-2xl md:text-4xl mb-1">
                  {isEarned ? '✅' : '🔒'}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-tighter text-white">
                  {state.abbreviation}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mt-20 glass-panel rounded-[3rem] p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-indigo-500/10" />
        <div className="relative z-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-white">
            Unlock the Physical Passport
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Reach "Master Explorer" rank to receive a high-quality physical passport book with custom stickers sent to your home.
          </p>
          <button className="mt-8 rounded-full bg-white px-8 py-4 text-sm font-bold text-black hover:bg-slate-200">
            Learn About Premium
          </button>
        </div>
      </section>
    </>
  )
}
