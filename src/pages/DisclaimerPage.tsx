import { Seo } from '@/components/seo/Seo'

export function DisclaimerPage() {
  return (
    <>
      <Seo
        title="Disclaimer | The United States Site"
        description="General disclaimer for content, affiliates, and advertisements on The United States Site."
        path="/disclaimer"
      />
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">
          Disclaimer
        </h1>
        <p className="mt-3 text-slate-400">Last updated: April 16, 2026</p>
      </header>
      <div className="space-y-6 text-sm leading-relaxed text-slate-200/90">
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-white">General</h2>
          <p className="mt-3">
            The United States Site publishes information for education and discussion. We strive for accuracy, but
            errors can occur. Always verify critical facts with primary sources.
          </p>
        </section>
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-white">Affiliate disclosure</h2>
          <p className="mt-3">
            Some links (including Amazon) may be affiliate links. If you purchase through them, we may earn a commission
            at no additional cost to you. This helps fund operations.
          </p>
        </section>
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-white">Advertisements</h2>
          <p className="mt-3">
            Ads are served by third-party networks (for example, Google AdSense). Advertisers may collect data subject to
            their own policies.
          </p>
        </section>
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-white">No guarantees</h2>
          <p className="mt-3">
            Outcomes discussed (careers, income ideas, relocation, etc.) are not guarantees. Individual results depend on
            effort, skill, timing, and circumstances outside our control.
          </p>
        </section>
      </div>
    </>
  )
}
