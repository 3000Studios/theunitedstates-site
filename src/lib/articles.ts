import type { Article } from '@/lib/types'

export function findArticleBySlug(slug: string, articles: Article[]): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function sortByDateDesc(articles: Article[]): Article[] {
  return [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}
