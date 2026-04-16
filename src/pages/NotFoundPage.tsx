import { Link } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'

export function NotFoundPage() {
  return (
    <>
      <Seo title="404 | The United States Site" description="Page not found." path="/404" />
      <div className="mx-auto max-w-[760px] text-center">
        <div className="font-[family-name:var(--font-display)] text-7xl font-black text-white">404</div>
        <h1 className="mt-4 text-2xl font-extrabold text-white">This page took a wrong exit</h1>
        <p className="mt-3 text-slate-300/90">
          The link may be outdated, or the page moved. Try the homepage or search.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white"
          >
            Go home
          </Link>
          <Link
            to="/search"
            className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Search
          </Link>
        </div>
      </div>
    </>
  )
}
