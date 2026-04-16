import type { Article, ArticleCategory } from '@/lib/types'
import { articleTemplates } from '@/data/articleTemplates'

const STORAGE_KEY = 'tus_generated_articles_v1'
const HOUR_MS = 60 * 60 * 1000
/** Faster tick in development so you can verify the generator without waiting an hour */
const TICK_MS = import.meta.env.DEV ? 2 * 60 * 1000 : HOUR_MS

function loadExtra(): Article[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Article[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveExtra(articles: Article[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
}

let timer: ReturnType<typeof setInterval> | null = null

/**
 * Simulates hourly publishing by appending templated articles.
 * Swap `generateFromTemplate` for an AI pipeline later without changing UI.
 */
export function startContentEngine(onUpdate: (all: Article[]) => void, seed: Article[]): () => void {
  const tick = () => {
    const extra = loadExtra()
    const next = generateFromTemplate(seed.length + extra.length)
    const merged = [...extra, next]
    saveExtra(merged)
    onUpdate([...seed, ...merged])
  }

  timer = setInterval(tick, TICK_MS)
  return () => {
    if (timer) clearInterval(timer)
    timer = null
  }
}

export function getAllArticles(seed: Article[]): Article[] {
  return [...seed, ...loadExtra()]
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!
}

function generateFromTemplate(index: number): Article {
  const t = pick(articleTemplates)
  const slug = `${t.slugPrefix}-${index}-${Date.now().toString(36)}`
  const now = new Date().toISOString()
  const category = t.category as ArticleCategory
  const body = t.bodyParagraphs.map((p) =>
    p.replace(/\{\{year\}\}/g, String(new Date().getFullYear())),
  )
  return {
    id: `gen-${index}-${crypto.randomUUID()}`,
    slug,
    title: `${t.titlePrefix}: ${t.rotatingHeadlines[index % t.rotatingHeadlines.length]}`,
    excerpt: t.excerpt,
    paragraphs: body,
    category,
    author: 'Editorial Desk',
    publishedAt: now,
    updatedAt: now,
    readTimeMinutes: Math.max(4, Math.round(body.join(' ').split(/\s+/).length / 220)),
    image: t.image,
    imageCredit: t.imageCredit,
    tags: t.tags,
    seoTitle: `${t.titlePrefix} | The United States Site`,
    seoDescription: t.excerpt,
  }
}
