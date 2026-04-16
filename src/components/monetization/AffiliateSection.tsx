import { STORE_PRODUCTS } from '@/data/storeProducts'

export function AffiliateSection() {
  const picks = STORE_PRODUCTS.filter((p) => p.featured).slice(0, 3)
  return (
    <section className="glass-panel rounded-3xl p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white">
            Tools readers are buying
          </h3>
          <p className="mt-1 text-sm text-slate-300/90">
            Independent picks via Amazon Associates—availability and prices change frequently.
          </p>
        </div>
        <p className="text-[11px] text-slate-500">Ads & affiliate links support our newsroom.</p>
      </div>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {picks.map((p) => (
          <a
            key={p.id}
            href={p.affiliateUrl}
            target="_blank"
            rel="sponsored noopener noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-sky-400/30 hover:bg-white/[0.05]"
          >
            <div className="aspect-[16/10] overflow-hidden rounded-xl">
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="mt-3 text-sm font-bold text-white">{p.title}</div>
            <div className="mt-1 text-xs text-slate-400">{p.priceDisplay}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
