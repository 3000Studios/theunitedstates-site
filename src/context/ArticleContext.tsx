import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { SEED_ARTICLES } from '@/data/seedArticles'
import type { Article } from '@/lib/types'
import { ArticleContext } from '@/context/article-store'
import { getAllArticles, startContentEngine } from '@/lib/contentEngine'

export function ArticleProvider({ children }: { children: ReactNode }) {
  const [articles, setArticles] = useState<Article[]>(() => getAllArticles(SEED_ARTICLES))

  useEffect(() => {
    return startContentEngine((all) => setArticles(all), SEED_ARTICLES)
  }, [])

  const value = useMemo(() => articles, [articles])
  return <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
}
