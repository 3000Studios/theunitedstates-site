import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { AdSlot } from '@/components/ads/AdSlot'
import { useArticles } from '@/context/useArticles'
import { sortByDateDesc } from '@/lib/articles'

export function UpdatesPage() {
  const articles = useArticles()
  const list = useMemo(() => sortByDateDesc(articles), [articles])

  return (
    <>
      <Seo
        title="Good News Updates | The United States"
        description="A chronological index of uplifting, family-friendly updates with sources."
        path="/updates"
      />

      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">
          Updates
        </h1>
        <p className="mt-3 max-w-3xl text-base text-slate-300/90">
          Chronological index (newest first). Every item links to a dedicated page with sources.
        </p>
      </header>

      <AdSlot slotKey="topBanner" className="mx-auto mb-8 max-w-[970px]" />

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="glass-panel rounded-3xl p-3 sm:p-5">
          <ol className="divide-y divide-white/10">
            {list.map((a, idx) => (
              <li key={a.id} className="flex gap-4 px-3 py-4">
                <div className="w-12 shrink-0 text-right text-sm font-extrabold text-sky-200/80">#{idx + 1}</div>
                <div className="min-w-0">
                  <Link
                    to={`/story/${a.slug}`}
                    className="block font-[family-name:var(--font-display)] text-base font-extrabold leading-snug text-white hover:text-sky-200"
                  >
                    {a.title}
                  </Link>
                  <div className="mt-1 text-xs text-slate-400">
                    {new Date(a.publishedAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}{' '}
                    · <span className="uppercase tracking-widest">{a.category.replace('_', ' ')}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <AdSlot slotKey="sidebar" />
          <div className="glass-panel rounded-3xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">How we publish</div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              We pull headlines from reputable feeds and write a short, original summary with links back to the source.
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}

