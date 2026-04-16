import { trackEvent } from '@/lib/analytics'

export function NewsletterInline() {
  return (
    <div className="glass-panel rounded-3xl p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Newsletter</div>
          <div className="mt-2 font-[family-name:var(--font-display)] text-xl font-extrabold text-white">
            Smarter decisions, fewer tabs
          </div>
          <p className="mt-2 max-w-xl text-sm text-slate-300/90">
            A compact weekly email with opportunity signals, explainers, and tools—built for busy Americans.
          </p>
        </div>
        <form
          className="flex w-full max-w-md flex-col gap-2 md:flex-row"
          onSubmit={(e) => {
            e.preventDefault()
            trackEvent('newsletter_submit', { source: 'inline' })
            ;(e.currentTarget as HTMLFormElement).reset()
          }}
        >
          <input
            required
            type="email"
            placeholder="Email address"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500/60"
          />
          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-3 text-sm font-bold text-white"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  )
}
