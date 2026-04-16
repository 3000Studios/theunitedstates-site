import { useMemo, useState } from 'react'
import { Seo } from '@/components/seo/Seo'
import { STORE_PRODUCTS } from '@/data/storeProducts'
import { AdSlot } from '@/components/ads/AdSlot'

const CATS = ['all', ...Array.from(new Set(STORE_PRODUCTS.map((p) => p.category)))]

export function StorePage() {
  const [cat, setCat] = useState<string>('all')
  const items = useMemo(() => {
    if (cat === 'all') return STORE_PRODUCTS
    return STORE_PRODUCTS.filter((p) => p.category === cat)
  }, [cat])
  const featured = STORE_PRODUCTS.filter((p) => p.featured)

  return (
    <>
      <Seo
        title="Store & Deals | The United States Site"
        description="Curated Amazon picks and affiliate-supported deals across tech, office, outdoor, and home categories."
        path="/store"
      />
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">Store</h1>
        <p className="mt-3 max-w-3xl text-base text-slate-300/90">
          Featured deals and practical picks. Purchases may earn us a commission at no extra cost to you.
        </p>
      </header>
      <AdSlot slotKey="topBanner" className="mx-auto mb-8 max-w-[970px]" />

      <section className="glass-panel rounded-3xl p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Featured deals</div>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl font-extrabold text-white">
              High-intent picks
            </h2>
          </div>
          <p className="max-w-xl text-sm text-slate-400">
            We choose categories readers ask about most. Prices change—always verify on Amazon before buying.
          </p>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {featured.map((p) => (
            <a
              key={p.id}
              href={p.affiliateUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-sky-400/30"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-2xl">
                <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="mt-3 font-[family-name:var(--font-display)] text-lg font-extrabold text-white">
                {p.title}
              </div>
              <p className="mt-2 text-sm text-slate-300/90">{p.description}</p>
              <div className="mt-4 inline-flex rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-4 py-2 text-sm font-bold text-white">
                {p.priceDisplay}
              </div>
            </a>
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-2">
        {CATS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-widest ${
              cat === c
                ? 'border-sky-400/60 bg-sky-500/15 text-white'
                : 'border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <a
            key={p.id}
            href={p.affiliateUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="glass-panel rounded-3xl p-4 transition hover:border-sky-400/30"
          >
            <div className="aspect-[16/10] overflow-hidden rounded-2xl">
              <img src={p.image} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="mt-3 font-bold text-white">{p.title}</div>
            <p className="mt-2 text-sm text-slate-300/90">{p.description}</p>
            <div className="mt-4 text-sm font-semibold text-sky-200">{p.priceDisplay}</div>
          </a>
        ))}
      </div>

      <div className="mt-10">
        <AdSlot slotKey="inContent" className="mx-auto max-w-[728px]" />
      </div>
    </>
  )
}
