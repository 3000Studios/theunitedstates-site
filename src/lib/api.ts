export type ApiGameKind = 'capital_sprint' | 'flag_memory' | 'eagle_run'

export type ApiGame = {
  id: string
  kind: ApiGameKind
  title: string
  description: string
  seed: number
  createdAt: string
  updatedAt: string
}

export async function fetchGames(): Promise<ApiGame[]> {
  const res = await fetch('/api/games', { headers: { accept: 'application/json' } })
  if (!res.ok) return []
  const data = (await res.json()) as { games?: ApiGame[] }
  return Array.isArray(data?.games) ? data.games : []
}

export async function fetchGame(id: string): Promise<ApiGame | null> {
  const res = await fetch(`/api/games/${encodeURIComponent(id)}`, { headers: { accept: 'application/json' } })
  if (!res.ok) return null
  const data = (await res.json()) as { game?: ApiGame }
  return data?.game ?? null
}

export type CryptoMover = { symbol: string; name: string; change24h: number; priceUsd: number }

export async function fetchCryptoMovers(): Promise<{ movers: CryptoMover[]; updatedAt: string } | null> {
  const res = await fetch('/api/crypto', { headers: { accept: 'application/json' } })
  if (!res.ok) return null
  const data = (await res.json()) as { movers?: CryptoMover[]; updatedAt?: string }
  if (!Array.isArray(data?.movers) || typeof data?.updatedAt !== 'string') return null
  return { movers: data.movers, updatedAt: data.updatedAt }
}

