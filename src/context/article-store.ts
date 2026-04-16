import { createContext } from 'react'
import { SEED_ARTICLES } from '@/data/seedArticles'
import type { Article } from '@/lib/types'

export const ArticleContext = createContext<Article[]>(SEED_ARTICLES)
