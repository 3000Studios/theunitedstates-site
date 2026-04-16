import { useContext } from 'react'
import { ArticleContext } from '@/context/article-store'

export function useArticles() {
  return useContext(ArticleContext)
}
