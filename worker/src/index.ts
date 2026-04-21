import { XMLParser } from 'fast-xml-parser'

export interface Env {
  CONTENT: DurableObjectNamespace<ContentStore>
}

type StoryCategory = 'good_news' | 'travel' | 'history'

type Story = {
  id: string
  slug: string
  title: string
  excerpt: string
  paragraphs: string[]
  category: StoryCategory
  author: string
  publishedAt: string
  updatedAt: string
  readTimeMinutes: number
  image: string
  imageCredit: string
  sourceName?: string
  sourceUrl?: string
  heroVideoUrl?: string
  tags: string[]
  seoTitle: string
  seoDescription: string
}

type GameKind = 'capital_sprint' | 'flag_memory' | 'eagle_run'

type Game = {
  id: string
  kind: GameKind
  title: string
  description: string
  seed: number
  createdAt: string
  updatedAt: string
}

const FEEDS: Array<{ name: string; url: string; category: StoryCategory }> = [
  {
    name: 'NASA',
    url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss',
    category: 'good_news',
  },
  {
    name: 'NOAA News',
    url: 'https://www.noaa.gov/news/rss.xml',
    category: 'good_news',
  },
  {
    name: 'Smithsonian Magazine',
    url: 'https://www.smithsonianmag.com/rss/latest_articles/',
    category: 'history',
  },
  {
    name: 'National Park Service (NPS)',
    url: 'https://www.nps.gov/feeds/news/all.xml',
    category: 'travel',
  },
]

const HERO_VIDEOS = [
  'https://commons.wikimedia.org/wiki/Special:FilePath/DSCOVR%20EPIC%20Earth%20Rotation.webm',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Aerial%20views%20of%20Oregon%2C%20United%20States%20in%20summer.webm',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Grand%20Canyon%20National%20Park-%20Timelapse%20Video%20-%20Summer%20Clouds%20%287775362134%29.webm',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Raising%20the%20Flag%20on%20Iwo%20Jima%20%28color%29.ogv',
]

const DEFAULT_IMAGE = 'https://commons.wikimedia.org/wiki/Special:FilePath/Flag%20of%20the%20United%20States.svg'

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
}

function toIsoDate(value?: string): string {
  const d = value ? new Date(value) : new Date()
  const t = d.getTime()
  if (!Number.isFinite(t)) return new Date().toISOString()
  return new Date(t).toISOString()
}

function asArray<T>(v: unknown): T[] {
  if (!v) return []
  return Array.isArray(v) ? (v as T[]) : [v as T]
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function pickHeroVideo(seed: string): string {
  let hash = 0
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0
  return HERO_VIDEOS[hash % HERO_VIDEOS.length]!
}

function deriveTags(title: string, category: StoryCategory): string[] {
  const t = title.toLowerCase()
  const tags = new Set<string>()
  if (category === 'travel') tags.add('travel')
  if (category === 'history') tags.add('history')
  if (category === 'good_news') tags.add('good news')
  if (t.includes('park')) tags.add('national parks')
  if (t.includes('mission') || t.includes('space') || t.includes('nasa')) tags.add('space')
  if (t.includes('ocean') || t.includes('weather') || t.includes('climate')) tags.add('weather')
  if (t.includes('museum') || t.includes('smithsonian')) tags.add('museums')
  return [...tags].slice(0, 8)
}

function shouldSkipTitle(title: string): boolean {
  const t = title.toLowerCase()
  const blocked = [
    'warning',
    'watch',
    'advisory',
    'hurricane',
    'tornado',
    'earthquake',
    'wildfire',
    'fatal',
    'death',
    'killed',
    'shooting',
    'attack',
    'injury',
    'crash',
    'outbreak',
  ]
  return blocked.some((w) => t.includes(w))
}

function buildStory(feedName: string, category: StoryCategory, titleRaw: string, linkRaw: string, publishedRaw?: string): Story {
  const title = stripHtml(titleRaw).slice(0, 200)
  const sourceUrl = stripHtml(linkRaw)
  const publishedAt = toIsoDate(publishedRaw)
  const id = `${feedName}:${sourceUrl}`
  const slug = `${slugify(title)}-${publishedAt.slice(0, 10)}`
  const tags = deriveTags(title, category)
  const excerpt = `Good news: ${title}.`
  const paragraphs = [
    `Headline: ${title}`,
    `Read the original at ${feedName} for full details and context.`,
  ]
  const heroVideoUrl = pickHeroVideo(id)
  return {
    id,
    slug,
    title,
    excerpt,
    paragraphs,
    category,
    author: 'The United States Desk',
    publishedAt,
    updatedAt: publishedAt,
    readTimeMinutes: 3,
    image: DEFAULT_IMAGE,
    imageCredit: 'Wikimedia Commons',
    sourceName: feedName,
    sourceUrl,
    heroVideoUrl,
    tags,
    seoTitle: `${title} | The United States`,
    seoDescription: excerpt,
  }
}

async function parseFeed(xml: string): Promise<Array<{ title: string; link: string; published?: string }>> {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '',
    trimValues: true,
    parseTagValue: true,
    removeNSPrefix: true,
  })
  const doc = parser.parse(xml) as unknown

  // RSS 2.0: rss.channel.item
  const rssItems = asArray<unknown>((doc as { rss?: { channel?: { item?: unknown } } })?.rss?.channel?.item)
  if (rssItems.length) {
    return rssItems
      .map((raw) => {
        const it = raw as { title?: unknown; link?: unknown; pubDate?: unknown }
        return {
          title: String(it?.title ?? ''),
          link: String(it?.link ?? ''),
          published: String(it?.pubDate ?? ''),
        }
      })
      .filter((it) => it.title && it.link)
  }

  // Atom: feed.entry
  const atomItems = asArray<unknown>((doc as { feed?: { entry?: unknown } })?.feed?.entry)
  if (atomItems.length) {
    return atomItems
      .map((raw) => {
        const it = raw as {
          title?: unknown
          link?: unknown
          updated?: unknown
          published?: unknown
        }
        const titleObj = it?.title as { ['#text']?: unknown } | undefined
        const linkObj = it?.link as { href?: unknown } | Array<{ href?: unknown }> | undefined
        const href = Array.isArray(linkObj) ? linkObj[0]?.href : linkObj?.href
        return {
          title: String(it?.title ?? titleObj?.['#text'] ?? ''),
          link: String(href ?? ''),
          published: String(it?.updated ?? it?.published ?? ''),
        }
      })
      .filter((it) => it.title && it.link)
  }

  return []
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)
    if (!url.pathname.startsWith('/api/')) return new Response('Not found', { status: 404 })

    const id = env.CONTENT.idFromName('global')
    const stub = env.CONTENT.get(id)
    const forwarded = new Request(new URL(url.pathname.replace(/^\/api/, ''), 'https://do.local').toString(), request)
    return stub.fetch(forwarded)
  },

  async scheduled(_event: ScheduledEvent, env: Env): Promise<void> {
    const id = env.CONTENT.idFromName('global')
    const stub = env.CONTENT.get(id)
    await stub.fetch('https://do.local/refresh', { method: 'POST' })
  },
}

export class ContentStore implements DurableObject {
  private state: DurableObjectState

  constructor(state: DurableObjectState) {
    this.state = state
    this.init()
  }

  private init() {
    const sql = this.state.storage.sql
    sql.exec(`
      CREATE TABLE IF NOT EXISTS stories (
        id TEXT PRIMARY KEY,
        slug TEXT NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        published_at TEXT NOT NULL,
        json TEXT NOT NULL
      );
    `)
    sql.exec(`
      CREATE INDEX IF NOT EXISTS idx_stories_published_at ON stories(published_at DESC);
    `)
    sql.exec(`
      CREATE TABLE IF NOT EXISTS leads (
        email TEXT PRIMARY KEY,
        created_at TEXT NOT NULL,
        source TEXT
      );
    `)
    sql.exec(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
    `)
    sql.exec(`
      CREATE TABLE IF NOT EXISTS games (
        id TEXT PRIMARY KEY,
        kind TEXT NOT NULL,
        title TEXT NOT NULL,
        json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `)
    sql.exec(`
      CREATE INDEX IF NOT EXISTS idx_games_created_at ON games(created_at DESC);
    `)
    sql.exec(`
      CREATE TABLE IF NOT EXISTS crypto_cache (
        id TEXT PRIMARY KEY,
        json TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `)
  }

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    if (request.method === 'GET' && url.pathname === '/stories') {
      return this.handleStories()
    }
    if (request.method === 'GET' && url.pathname === '/games') {
      return this.handleGames()
    }
    if (request.method === 'GET' && url.pathname.startsWith('/games/')) {
      return this.handleGame(url.pathname.split('/').pop() ?? '')
    }
    if (request.method === 'GET' && url.pathname === '/crypto') {
      return this.handleCrypto()
    }
    if (request.method === 'POST' && url.pathname === '/lead') {
      return this.handleLead(request)
    }
    if (request.method === 'POST' && url.pathname === '/contact') {
      return this.handleContact(request)
    }
    if (request.method === 'POST' && url.pathname === '/refresh') {
      return this.handleRefresh()
    }

    return new Response('Not found', { status: 404 })
  }

  private async handleStories(): Promise<Response> {
    const sql = this.state.storage.sql
    const rows = sql.exec(`SELECT json FROM stories ORDER BY published_at DESC LIMIT 80;`).toArray() as Array<{ json: string }>
    const stories = rows.map((r) => JSON.parse(r.json)) as Story[]
    return new Response(JSON.stringify({ stories }), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=300',
      },
    })
  }

  private async handleGames(): Promise<Response> {
    try {
      this.upsertHourlyGame(new Date().toISOString())
    } catch {
      // ignore
    }
    const sql = this.state.storage.sql
    const rows = sql
      .exec(`SELECT json FROM games ORDER BY created_at DESC LIMIT 80;`)
      .toArray() as Array<{ json: string }>
    const games = rows.map((r) => JSON.parse(r.json)) as Game[]
    return new Response(JSON.stringify({ games }), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'public, max-age=300',
      },
    })
  }

  private async handleGame(id: string): Promise<Response> {
    const safeId = String(id ?? '').trim()
    if (!safeId) return new Response('Not found', { status: 404 })
    const sql = this.state.storage.sql
    const rows = sql.exec(`SELECT json FROM games WHERE id = ?1 LIMIT 1;`, safeId).toArray() as Array<{ json: string }>
    if (!rows[0]) return new Response('Not found', { status: 404 })
    const game = JSON.parse(rows[0].json) as Game
    return new Response(JSON.stringify({ game }), {
      headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=300' },
    })
  }

  private async handleCrypto(): Promise<Response> {
    const sql = this.state.storage.sql
    const row = sql.exec(`SELECT json, updated_at FROM crypto_cache WHERE id = 'top_movers' LIMIT 1;`).toArray() as Array<{ json: string; updated_at: string }>
    if (row[0]) {
      return new Response(row[0].json, {
        headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=300' },
      })
    }
    const empty = JSON.stringify({ movers: [], updatedAt: new Date().toISOString() })
    return new Response(empty, { headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'public, max-age=60' } })
  }

  private async handleLead(request: Request): Promise<Response> {
    let payload: unknown = null
    try {
      payload = await request.json()
    } catch {
      return new Response('Bad request', { status: 400 })
    }

    const p = payload as { email?: unknown; consent?: unknown; source?: unknown }
    const email = String(p?.email ?? '').trim().toLowerCase()
    const consent = Boolean(p?.consent)
    const source = String(p?.source ?? 'unknown').slice(0, 60)
    if (!consent) return new Response('Consent required', { status: 400 })
    if (!email || !email.includes('@') || email.length > 200) return new Response('Invalid email', { status: 400 })

    const now = new Date().toISOString()
    const sql = this.state.storage.sql
    sql.exec(`INSERT OR REPLACE INTO leads(email, created_at, source) VALUES (?1, ?2, ?3);`, email, now, source)
    return new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json; charset=utf-8' } })
  }

  private async handleContact(request: Request): Promise<Response> {
    let payload: unknown = null
    try {
      payload = await request.json()
    } catch {
      return new Response('Bad request', { status: 400 })
    }

    const p = payload as { name?: unknown; email?: unknown; message?: unknown }
    const name = String(p?.name ?? '').trim().slice(0, 120)
    const email = String(p?.email ?? '').trim().toLowerCase().slice(0, 200)
    const message = String(p?.message ?? '').trim().slice(0, 5000)
    if (!name || !email.includes('@') || !message) return new Response('Invalid', { status: 400 })

    const now = new Date().toISOString()
    const id = `${now}:${email}`
    const sql = this.state.storage.sql
    sql.exec(
      `INSERT OR REPLACE INTO contact_messages(id, name, email, message, created_at) VALUES (?1, ?2, ?3, ?4, ?5);`,
      id,
      name,
      email,
      message,
      now,
    )

    return new Response(JSON.stringify({ ok: true }), { headers: { 'content-type': 'application/json; charset=utf-8' } })
  }

  private async handleRefresh(): Promise<Response> {
    const now = new Date().toISOString()
    const sql = this.state.storage.sql

    const results: Array<{ feed: string; ok: boolean; count: number }> = []
    for (const f of FEEDS) {
      try {
        const res = await fetch(f.url, { headers: { accept: 'application/rss+xml, application/xml, text/xml, */*' } })
        if (!res.ok) throw new Error(`feed ${res.status}`)
        const xml = await res.text()
        const items = await parseFeed(xml)
        let upserts = 0
        for (const it of items.slice(0, 30)) {
          if (shouldSkipTitle(it.title)) continue
          const story = buildStory(f.name, f.category, it.title, it.link, it.published)
          sql.exec(
            `INSERT OR REPLACE INTO stories(id, slug, title, category, published_at, json) VALUES (?1, ?2, ?3, ?4, ?5, ?6);`,
            story.id,
            story.slug,
            story.title,
            story.category,
            story.publishedAt,
            JSON.stringify({ ...story, updatedAt: now }),
          )
          upserts++
        }
        results.push({ feed: f.name, ok: true, count: upserts })
      } catch {
        results.push({ feed: f.name, ok: false, count: 0 })
      }
    }

    // Ensure at least one game exists, then add one per hour (id is hour bucket).
    try {
      this.upsertHourlyGame(now)
    } catch {
      // ignore
    }

    // Refresh crypto movers (best-effort).
    try {
      const crypto = await fetchTopCryptoMovers()
      sql.exec(
        `INSERT OR REPLACE INTO crypto_cache(id, json, updated_at) VALUES ('top_movers', ?1, ?2);`,
        JSON.stringify({ movers: crypto, updatedAt: now }),
        now,
      )
    } catch {
      // ignore
    }

    return new Response(JSON.stringify({ ok: true, refreshedAt: now, results }), {
      headers: { 'content-type': 'application/json; charset=utf-8' },
    })
  }

  private upsertHourlyGame(nowIso: string) {
    const sql = this.state.storage.sql
    const hourId = nowIso.slice(0, 13).replace(/[:T-]/g, '')
    const id = `hour-${hourId}`

    const existing = sql.exec(`SELECT id FROM games WHERE id = ?1 LIMIT 1;`, id).toArray() as Array<{ id: string }>
    if (existing[0]) return

    const seed = Number.parseInt(hourId.slice(-4), 10) || 0
    const kinds: GameKind[] = ['capital_sprint', 'flag_memory', 'eagle_run']
    const kind = kinds[seed % kinds.length]!
    const title = `USA Kid Challenge — ${nowIso.slice(0, 10)} ${nowIso.slice(11, 13)}:00`
    const description =
      kind === 'capital_sprint'
        ? 'Tap the right capital as fast as you can.'
        : kind === 'flag_memory'
          ? 'Flip cards and match state flags.'
          : 'Tap to fly. Dodge the stars. Collect points.'

    const game: Game = {
      id,
      kind,
      title,
      description,
      seed,
      createdAt: nowIso,
      updatedAt: nowIso,
    }

    sql.exec(
      `INSERT OR REPLACE INTO games(id, kind, title, json, created_at, updated_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6);`,
      game.id,
      game.kind,
      game.title,
      JSON.stringify(game),
      game.createdAt,
      game.updatedAt,
    )
  }
}

async function fetchTopCryptoMovers(): Promise<Array<{ symbol: string; name: string; change24h: number; priceUsd: number }>> {
  // CoinGecko public endpoint (no key). Worker-side avoids browser CORS.
  const url = new URL('https://api.coingecko.com/api/v3/coins/markets')
  url.searchParams.set('vs_currency', 'usd')
  url.searchParams.set('order', 'market_cap_desc')
  url.searchParams.set('per_page', '250')
  url.searchParams.set('page', '1')
  url.searchParams.set('price_change_percentage', '24h')

  const res = await fetch(url.toString(), { headers: { accept: 'application/json' } })
  if (!res.ok) return []
  const data = (await res.json()) as unknown
  const arr = Array.isArray(data) ? (data as Array<Record<string, unknown>>) : []
  const movers = arr
    .map((c) => {
      const symbol = String(c.symbol ?? '').toUpperCase()
      const name = String(c.name ?? '')
      const change24h = Number(c.price_change_percentage_24h ?? c.price_change_percentage_24h_in_currency ?? NaN)
      const priceUsd = Number(c.current_price ?? NaN)
      return { symbol, name, change24h, priceUsd }
    })
    .filter((m) => m.symbol && m.name && Number.isFinite(m.change24h) && Number.isFinite(m.priceUsd))
    .sort((a, b) => b.change24h - a.change24h)
    .slice(0, 18)

  return movers
}
