import { Link, useParams } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { AdSlot } from '@/components/ads/AdSlot'
import { useArticles } from '@/context/useArticles'
import { findArticleBySlug } from '@/lib/articles'
import { NotFoundPage } from '@/pages/NotFoundPage'

const FALLBACK_VIDEO_FILE = 'File:Raising the Flag on Iwo Jima (color).ogv'
const FALLBACK_VIDEO_URL =
  'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(FALLBACK_VIDEO_FILE.replace(/^File:/, ''))

export function StoryPage() {
  const { slug } = useParams()
  const articles = useArticles()
  const story = slug ? findArticleBySlug(slug, articles) : undefined

  if (!story) return <NotFoundPage />

  const heroVideoUrl = story.heroVideoUrl ?? FALLBACK_VIDEO_URL

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: story.title,
    image: [story.image],
    datePublished: story.publishedAt,
    dateModified: story.updatedAt,
    author: [{ '@type': 'Person', name: story.author }],
    publisher: {
      '@type': 'Organization',
      name: 'The United States',
      logo: { '@type': 'ImageObject', url: 'https://theunitedstates.site/favicon.svg' },
    },
    description: story.seoDescription,
    mainEntityOfPage: `https://theunitedstates.site/story/${story.slug}`,
  }

  return (
    <>
      <Seo title={story.seoTitle} description={story.seoDescription} path={`/story/${story.slug}`} image={story.image} jsonLd={jsonLd} />

      <article className="mx-auto max-w-[980px]">
        <div className="mb-6 text-xs font-bold uppercase tracking-widest text-sky-200/80">
          {story.category.replace('_', ' ')}
        </div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold leading-tight text-white md:text-5xl">
          {story.title}
        </h1>
        <p className="mt-4 text-sm text-slate-400">
          By {story.author} ·{' '}
          {new Date(story.updatedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })} ·{' '}
          {story.readTimeMinutes} min read
        </p>

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-black/30">
            <video className="absolute inset-0 h-full w-full object-cover opacity-80" autoPlay muted loop playsInline preload="metadata" src={heroVideoUrl} />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020617]/90" />
          </div>
          <div className="border-t border-white/10 bg-black/30 px-4 py-2 text-[11px] text-slate-500">
            Photo credit: {story.imageCredit}
          </div>
        </div>

        <div className="mt-8">
          <AdSlot slotKey="topBanner" className="mx-auto mb-8 max-w-[970px]" />
        </div>

        <div className="prose prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-slate-200/90">{story.excerpt}</p>
          <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-200/90">
            {story.paragraphs.map((p, idx) => (
              <div key={idx}>
                <p>{p}</p>
                {(idx + 1) % 2 === 0 && idx !== story.paragraphs.length - 1 && (
                  <div className="my-8">
                    <AdSlot slotKey="inContent" className="mx-auto max-w-[728px]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {story.sourceUrl && (
          <div className="mt-10 glass-panel rounded-3xl p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Source</div>
            <a className="mt-3 inline-block text-sm font-semibold text-sky-200 hover:text-white" href={story.sourceUrl} target="_blank" rel="noreferrer">
              {story.sourceName ? story.sourceName : 'Read the original'}
            </a>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-2">
          {story.tags.map((t) => (
            <Link
              key={t}
              to={`/search?q=${encodeURIComponent(t)}`}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200 hover:border-sky-400/40"
            >
              #{t}
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <AdSlot slotKey="inContent" className="mx-auto max-w-[728px]" />
        </div>
      </article>
    </>
  )
}

