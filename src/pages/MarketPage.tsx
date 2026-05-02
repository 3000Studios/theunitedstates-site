import { Seo } from '@/components/seo/Seo'
import { AdSlot } from '@/components/ads/AdSlot'
import { US_STATES } from '@/data/usStates'

const PRODUCTS = [
  { id: '1', title: 'Vermont Maple Syrup (Grade A)', price: '$24.99', state: 'Vermont', img: '🍁' },
  { id: '2', title: 'Texas Leather Satchel', price: '$189.00', state: 'Texas', img: '💼' },
  { id: '3', title: 'California Surf Board Keychain', price: '$12.50', state: 'California', img: '🏄' },
  { id: '4', title: 'Florida Key Lime Pie Mix', price: '$15.99', state: 'Florida', img: '🍋' },
  { id: '5', title: 'New York City Skyline Print', price: '$45.00', state: 'New York', img: '🖼️' },
  { id: '6', title: 'Maine Lobster Crackers', price: '$18.00', state: 'Maine', img: '🦞' },
]

export function MarketPage() {
  return (
    <>
      <Seo
        title="The 50-State Marketplace | Authentic American Goods"
        description="Shop curated products from every state in the USA. From local artisans to iconic brands, find the best of America here."
        path="/market"
      />

      <header className="mb-10">
        <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">State-Source Marketplace</div>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-6xl">
          America <span className="gradient-text glow-text">Made</span>
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300/90 md:text-lg">
          Support local artisans and bring home a piece of every state. Curated, high-quality, and 100% authentic.
        </p>
      </header>

      <section className="flex flex-wrap gap-3 mb-12">
        <div className="rounded-full bg-white text-black px-4 py-2 text-xs font-bold">All Products</div>
        {US_STATES.slice(0, 8).map(st => (
          <div key={st.id} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 cursor-pointer">
            {st.name}
          </div>
        ))}
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 cursor-pointer">
          More States...
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map(p => (
            <div key={p.id} className="glass-panel group overflow-hidden rounded-3xl">
              <div className="aspect-square flex items-center justify-center bg-white/5 text-6xl transition-transform duration-500 group-hover:scale-110">
                {p.img}
              </div>
              <div className="p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-sky-200/80">{p.state}</div>
                <h3 className="mt-1 font-bold text-white text-lg">{p.title}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xl font-extrabold text-white">{p.price}</span>
                  <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <aside className="space-y-6">
          <div className="glass-panel rounded-3xl p-6 bg-gradient-to-br from-sky-600/20 to-indigo-600/20">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-white">Featured Artisan</h3>
            <div className="mt-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-slate-700" />
              <div>
                <div className="text-sm font-bold text-white">Sarah Jenkins</div>
                <div className="text-xs text-slate-400">Vermont Woodworker</div>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-300">
              "Every piece I carve tells a story of the Green Mountains. I'm proud to share my heritage with you."
            </p>
            <button className="mt-4 w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold text-black">
              View Collection
            </button>
          </div>

          <AdSlot slotKey="sidebar" />

          <div className="glass-panel rounded-3xl p-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Support Local</h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              15% of every purchase goes directly back into state-level historical preservation and national park conservation.
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}
