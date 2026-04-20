export type ArticleCategory = 'good_news' | 'travel' | 'history' | 'kids' | 'states'

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  paragraphs: string[]
  category: ArticleCategory
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
  featured?: boolean
}

export interface StoreProduct {
  id: string
  title: string
  description: string
  priceDisplay: string
  category: string
  affiliateUrl: string
  image: string
  featured?: boolean
}

export interface USStateInfo {
  id: string
  slug: string
  name: string
  abbreviation: string
  capital: string
  wikidataQid: string
  commonsCategory: string | null
  flagUrl: string | null
  flagFile: string | null
  sealUrl: string | null
  sealFile: string | null
  heroVideoUrl: string | null
  heroVideoFile: string | null
  heroPhotoUrl: string | null
  heroPhotoFile: string | null
}
