import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useArticles } from '@/context/useArticles'

export function TrendingTicker() {
  const articles = useArticles()
  const tags = Array.from(new Set(articles.flatMap((a) => a.tags))).slice(0, 28)
  const line = tags.map((t) => `#${t}`).join('   •   ')

  return (
    <div className="relative z-40 border-b border-white/10 bg-[#020617]/70 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-2 text-[11px] sm:text-xs">
        <span className="shrink-0 rounded-full bg-sky-500/20 px-2 py-0.5 font-semibold uppercase tracking-wide text-sky-100">
          Trending
        </span>
        <div className="overflow-hidden">
          <motion.div
            className="whitespace-nowrap text-slate-200/85"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 56, repeat: Infinity, ease: 'linear' }}
          >
            <span className="inline-block pr-24">
              {tags.map((t) => (
                <Link key={t} to={`/search?q=${encodeURIComponent(t)}`} className="mr-6 inline hover:text-white">
                  #{t}
                </Link>
              ))}
            </span>
            <span className="inline-block pr-24">{line}</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
