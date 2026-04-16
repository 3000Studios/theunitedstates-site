import type { Article } from '@/lib/types'

export function searchArticles(query: string, articles: Article[]): Article[] {
  const q = query.trim().toLowerCase()
  if (!q) return articles
  const terms = q.split(/\s+/).filter(Boolean)
  return articles.filter((a) => {
    const hay = [
      a.title,
      a.excerpt,
      a.tags.join(' '),
      a.category,
      a.paragraphs.join(' '),
    ]
      .join(' ')
      .toLowerCase()
    return terms.every((t) => hay.includes(t))
  })
}
