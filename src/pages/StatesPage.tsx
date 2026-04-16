import { useMemo, useState } from 'react'
import { Seo } from '@/components/seo/Seo'
import { US_STATES } from '@/data/usStates'
import { AdSlot } from '@/components/ads/AdSlot'

export function StatesPage() {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return US_STATES
    return US_STATES.filter(
      (st) =>
        st.name.toLowerCase().includes(s) ||
        st.abbreviation.toLowerCase().includes(s) ||
        st.capital.toLowerCase().includes(s),
    )
  }, [q])

  return (
    <>
      <Seo
        title="USA States Hub | The United States Site"
        description="Explore all 50 states with quick facts and relocation-oriented highlights—then dig deeper with our guides."
        path="/states"
      />
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">
          States
        </h1>
        <p className="mt-3 max-w-3xl text-base text-slate-300/90">
          A fast grid for all 50 states. Use search to jump to a name, abbreviation, or capital city.
        </p>
      </header>
      <AdSlot slotKey="topBanner" className="mx-auto mb-8 max-w-[970px]" />
      <div className="glass-panel rounded-3xl p-4">
        <label className="block text-xs font-bold uppercase tracking-widest text-sky-200/80">
          Search states
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Try “TX”, “Texas”, or “Austin”"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500/60"
          />
        </label>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((st) => (
          <article key={st.id} className="glass-panel overflow-hidden rounded-3xl">
            <div className="aspect-[16/9] overflow-hidden">
              <img src={st.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">
                    {st.abbreviation}
                  </div>
                  <h2 className="mt-1 font-[family-name:var(--font-display)] text-xl font-extrabold text-white">
                    {st.name}
                  </h2>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-200/90">
                  Pop. {st.population}
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-300/90">
                Capital: <span className="font-semibold text-white">{st.capital}</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300/90">{st.highlight}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-10">
        <AdSlot slotKey="inContent" className="mx-auto max-w-[728px]" />
      </div>
    </>
  )
}
