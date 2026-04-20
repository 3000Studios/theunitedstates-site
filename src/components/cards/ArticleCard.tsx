import { Link } from 'react-router-dom'
import type { Article } from '@/lib/types'
import { TiltCard } from '@/components/cards/TiltCard'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <TiltCard className="h-full">
      <Link to={`/story/${article.slug}`} className="block">
        <div className="grid gap-0 md:grid-cols-[220px_1fr]">
          <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-auto md:min-h-[200px]">
            <img
              src={article.image}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
            />
            <div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur">
              {article.category}
            </div>
          </div>
          <div className="p-5">
            <div className="text-xs text-slate-400">
              {new Date(article.publishedAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}{' '}
              · {article.readTimeMinutes} min read
            </div>
            <h3 className="mt-2 font-[family-name:var(--font-display)] text-lg font-extrabold leading-snug text-white">
              {article.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-300/90">{article.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.slice(0, 3).map((t) => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-200/90">
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  )
}
