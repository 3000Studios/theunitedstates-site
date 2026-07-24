import type { Article } from '@/lib/types'

const STORAGE_KEY = 'tus_remote_stories_v1'
const REFRESH_MS = import.meta.env.DEV ? 2 * 60 * 1000 : 30 * 60 * 1000
const EDITORIAL_FEED_ENABLED = import.meta.env.VITE_EDITORIAL_FEED_ENABLED === 'true'

function loadRemote(): Article[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Article[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveRemote(articles: Article[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(articles))
}

async function fetchRemoteStories(): Promise<Article[]> {
  const res = await fetch('/api/stories', { headers: { accept: 'application/json' } })
  if (!res.ok) return []
  const data = (await res.json()) as { stories?: Article[] }
  const stories = data?.stories
  return Array.isArray(stories) ? stories : []
}

function merge(seed: Article[], remote: Article[]): Article[] {
  const seen = new Set(seed.map((a) => a.id))
  const merged = [...seed]
  for (const r of remote) {
    if (!r?.id || seen.has(r.id)) continue
    seen.add(r.id)
    merged.push(r)
  }
  return merged
}

let timer: ReturnType<typeof setInterval> | null = null

export function startContentEngine(onUpdate: (all: Article[]) => void, seed: Article[]): () => void {
  if (!EDITORIAL_FEED_ENABLED) {
    onUpdate(seed)
    return () => {}
  }
  let cancelled = false

  const refresh = async () => {
    try {
      const remote = await fetchRemoteStories()
      if (cancelled) return
      if (remote.length) saveRemote(remote)
      const all = merge(seed, remote.length ? remote : loadRemote())
      onUpdate(all)
    } catch {
      const all = merge(seed, loadRemote())
      onUpdate(all)
    }
  }

  refresh()
  timer = setInterval(refresh, REFRESH_MS)

  return () => {
    cancelled = true
    if (timer) clearInterval(timer)
    timer = null
  }
}

export function getAllArticles(seed: Article[]): Article[] {
  return EDITORIAL_FEED_ENABLED ? merge(seed, loadRemote()) : seed
}

