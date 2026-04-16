import { Link, useParams } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { AdSlot } from '@/components/ads/AdSlot'
import { AffiliateSection } from '@/components/monetization/AffiliateSection'
import { useArticles } from '@/context/useArticles'
import { findArticleBySlug } from '@/lib/articles'
import { NotFoundPage } from '@/pages/NotFoundPage'

export function ArticlePage() {
  const { slug } = useParams()
  const articles = useArticles()
  const article = slug ? findArticleBySlug(slug, articles) : undefined

  if (!article) {
    return <NotFoundPage />
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    image: [article.image],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: [{ '@type': 'Person', name: article.author }],
    publisher: {
      '@type': 'Organization',
      name: 'The United States Site',
      logo: {
        '@type': 'ImageObject',
        url: 'https://theunitedstates.site/favicon.svg',
      },
    },
    description: article.seoDescription,
    mainEntityOfPage: `https://theunitedstates.site/article/${article.slug}`,
  }

  return (
    <>
      <Seo
        title={article.seoTitle}
        description={article.seoDescription}
        path={`/article/${article.slug}`}
        image={article.image}
        jsonLd={jsonLd}
      />

      <article className="mx-auto max-w-[980px]">
        <div className="mb-6 text-xs font-bold uppercase tracking-widest text-sky-200/80">{article.category}</div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight text-white md:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-sm text-slate-400">
          By {article.author} · Updated{' '}
          {new Date(article.updatedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}{' '}
          · {article.readTimeMinutes} min read
        </p>

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
          <img
            src={article.image}
            alt=""
            loading="eager"
            decoding="async"
            className="aspect-[21/9] w-full object-cover"
          />
          <div className="border-t border-white/10 bg-black/30 px-4 py-2 text-[11px] text-slate-500">
            Photo credit: {article.imageCredit}
          </div>
        </div>

        <div className="mt-8">
          <AdSlot slotKey="topBanner" className="mx-auto mb-8 max-w-[970px]" />
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-slate-200/90">{article.excerpt}</p>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-200/90">
            {article.paragraphs.map((p, idx) => (
              <div key={idx}>
                <p>{p}</p>
                {(idx + 1) % 2 === 0 && idx !== article.paragraphs.length - 1 && (
                  <div className="my-8">
                    <AdSlot slotKey="inContent" className="mx-auto max-w-[728px]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <AffiliateSection />
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {article.tags.map((t) => (
            <Link
              key={t}
              to={`/search?q=${encodeURIComponent(t)}`}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 hover:border-sky-400/40"
            >
              #{t}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="glass-panel rounded-3xl p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Read next</div>
            <ul className="mt-4 space-y-3">
              {articles
                .filter((a) => a.id !== article.id)
                .slice(0, 5)
                .map((a) => (
                  <li key={a.id}>
                    <Link className="text-sm font-semibold text-white hover:text-sky-200" to={`/article/${a.slug}`}>
                      {a.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <AdSlot slotKey="sidebar" />
          </div>
        </div>
      </article>
    </>
  )
}
