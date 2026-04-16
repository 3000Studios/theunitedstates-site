export type ArticleCategory =
  | 'news'
  | 'lifestyle'
  | 'money'
  | 'trending'
  | 'tech'
  | 'guides'
  | 'states'

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
  name: string
  abbreviation: string
  capital: string
  population: string
  highlight: string
  image: string
}
