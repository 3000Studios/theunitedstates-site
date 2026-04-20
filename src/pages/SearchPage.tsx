import { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { ArticleCard } from '@/components/cards/ArticleCard'
import { useArticles } from '@/context/useArticles'
import { searchArticles } from '@/lib/search'
import { AdSlot } from '@/components/ads/AdSlot'

export function SearchPage() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''
  const articles = useArticles()
  const results = useMemo(() => searchArticles(q, articles), [q, articles])

  return (
    <>
      <Seo
        title={q ? `Search: ${q} | The United States` : 'Search | The United States'}
        description="Search across updates, travel guides, history, and state pages."
        path="/search"
      />
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">
          Search
        </h1>
        <p className="mt-3 text-slate-300/90">
          {q ? (
            <>
              Results for <span className="font-semibold text-white">“{q}”</span> ({results.length})
            </>
          ) : (
            'Enter a keyword in the header search bar.'
          )}
        </p>
      </header>
      <AdSlot slotKey="topBanner" className="mx-auto mb-8 max-w-[970px]" />
      <div className="space-y-6">
        {results.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
        {q && results.length === 0 && (
          <div className="glass-panel rounded-3xl p-8 text-center text-slate-300/90">
            No matches. Try a shorter keyword or browse{' '}
            <Link className="text-sky-200 hover:text-white" to="/updates">
              updates
            </Link>
            .
          </div>
        )}
      </div>
    </>
  )
}
