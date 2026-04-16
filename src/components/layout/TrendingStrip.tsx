import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useArticles } from '@/context/useArticles'
import { sortByDateDesc } from '@/lib/articles'

export function TrendingStrip() {
  const articles = useArticles()
  const hot = sortByDateDesc(articles).slice(0, 6)

  return (
    <div className="glass-panel rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-widest text-sky-200/90">
          Trending now
        </h3>
        <motion.span
          className="h-2 w-2 rounded-full bg-emerald-400"
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
      </div>
      <ul className="space-y-2">
        {hot.map((a) => (
          <li key={a.id}>
            <Link
              to={`/article/${a.slug}`}
              className="line-clamp-2 text-sm text-slate-100/90 transition hover:text-sky-200"
            >
              {a.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
