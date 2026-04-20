import { motion } from 'framer-motion'
import { useArticles } from '@/context/useArticles'
import { sortByDateDesc } from '@/lib/articles'

export function NewsTicker() {
  const articles = useArticles()
  const items = sortByDateDesc(articles)
    .slice(0, 18)
    .map((a) => a.title)

  const line = items.join('   •   ')

  return (
    <div className="relative z-50 border-b border-white/10 bg-[#0a1f44]/90 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-2 text-xs sm:text-sm">
        <span className="shrink-0 rounded-full bg-[#b22234] px-2 py-0.5 font-semibold uppercase tracking-wide text-white">
          Updates
        </span>
        <div className="overflow-hidden">
          <motion.div
            className="whitespace-nowrap text-slate-100/90"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
          >
            <span className="inline-block pr-24">{line}</span>
            <span className="inline-block pr-24">{line}</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
