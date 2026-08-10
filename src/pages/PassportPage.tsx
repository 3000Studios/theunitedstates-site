import { motion } from 'framer-motion'
import { Seo } from '@/components/seo/Seo'
import { US_STATES } from '@/data/usStates'
import { Link } from 'react-router-dom'

export function PassportPage() {
  const totalStates = US_STATES.length
  const sampleCount = 12
  const progress = (sampleCount / totalStates) * 100

  return (
    <>
      <Seo
        title="State Research Checklist | The United States"
        description="Use a simple state checklist to choose places to research, compare, and visit across the United States."
        path="/passport"
      />

      <header className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-200/80">
          Explorer Progress
        </div>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-6xl">
          State <span className="gradient-text glow-text">Checklist</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-300/90">
          A lightweight way to browse the state library. Open any state card for research notes, capitals, and travel-planning context.
        </p>
        <div className="mx-auto mt-6 max-w-xl">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            <span>{sampleCount} featured states</span>
            <span>{totalStates} total guides</span>
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
          <div className="text-3xl">US</div>
          <div className="mt-3 font-bold text-white text-lg">State Library</div>
          <div className="text-xs text-slate-400 mt-1">Research hub</div>
        </div>
        <div className="glass-panel rounded-3xl p-6 text-center">
          <div className="text-3xl">51</div>
          <div className="mt-3 font-bold text-white text-lg">Guides</div>
          <div className="text-xs text-slate-400 mt-1">States + D.C.</div>
        </div>
        <div className="glass-panel rounded-3xl p-6 text-center">
          <div className="text-3xl">A-Z</div>
          <div className="mt-3 font-bold text-white text-lg">Index</div>
          <div className="text-xs text-slate-400 mt-1">Fast browsing</div>
        </div>
        <div className="glass-panel rounded-3xl p-6 text-center">
          <div className="text-3xl">Plan</div>
          <div className="mt-3 font-bold text-white text-lg">Checklist</div>
          <div className="text-xs text-slate-400 mt-1">No account needed</div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-white mb-8">
          State Guide Collection
        </h2>
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {US_STATES.map((state, index) => {
            const isFeatured = index < sampleCount
            return (
              <Link 
                key={state.id}
                to={`/states/${state.slug}`}
                className={`relative aspect-square flex flex-col items-center justify-center rounded-3xl border transition-all duration-300 ${
                  isFeatured
                    ? 'border-sky-500/50 bg-sky-500/10 shadow-lg shadow-sky-900/20' 
                    : 'border-white/5 bg-white/[0.02] opacity-70 hover:opacity-100'
                }`}
              >
                <div className="text-2xl md:text-4xl mb-1">
                  {isFeatured ? 'View' : 'Open'}
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
            Build a real trip shortlist
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Use the checklist to compare destinations, save official links, and confirm reservations, hours, and accessibility before travel.
          </p>
          <Link to="/states" className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-bold text-black hover:bg-slate-200">
            Browse all states
          </Link>
        </div>
      </section>
    </>
  )
}
