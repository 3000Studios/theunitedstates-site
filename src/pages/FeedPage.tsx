import { useMemo } from 'react'
import { ArticleCard } from '@/components/cards/ArticleCard'
import { Seo } from '@/components/seo/Seo'
import { AdSlot } from '@/components/ads/AdSlot'
import { useArticles } from '@/context/useArticles'
import type { ArticleCategory } from '@/lib/types'
import { sortByDateDesc } from '@/lib/articles'

interface Props {
  title: string
  description: string
  path: string
  category?: ArticleCategory
  heading: string
  subheading: string
}

export function FeedPage({ title, description, path, category, heading, subheading }: Props) {
  const articles = useArticles()
  const list = useMemo(() => {
    const base = category ? articles.filter((a) => a.category === category) : articles
    return sortByDateDesc(base)
  }, [articles, category])

  return (
    <>
      <Seo title={title} description={description} path={path} />
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">
          {heading}
        </h1>
        <p className="mt-3 max-w-3xl text-base text-slate-300/90">{subheading}</p>
      </header>
      <AdSlot slotKey="topBanner" className="mx-auto mb-8 max-w-[970px]" />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          {list.map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <AdSlot slotKey="sidebar" />
          <div className="glass-panel rounded-3xl p-5 text-sm text-slate-300/90">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Editor note</div>
            <p className="mt-3 leading-relaxed">
              We prioritize clarity and sourcing. If you spot an error, reach out via{' '}
              <a className="text-sky-200 hover:text-white" href="/contact">
                Contact
              </a>
              .
            </p>
          </div>
        </aside>
      </div>
      <div className="mt-10">
        <AdSlot slotKey="inContent" className="mx-auto max-w-[728px]" />
      </div>
    </>
  )
}
