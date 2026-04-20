import { Seo } from '@/components/seo/Seo'

export function DisclaimerPage() {
  return (
    <>
      <Seo
        title="Disclaimer | The United States"
        description="General disclaimer for content, affiliates, and advertisements on The United States."
        path="/disclaimer"
      />
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">
          Disclaimer
        </h1>
        <p className="mt-3 text-slate-400">Last updated: April 20, 2026</p>
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
            When affiliate programs are enabled, some links may be affiliate links. If you purchase through them, we may
            earn a commission at no additional cost to you. This helps fund operations.
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
            Travel conditions, hours, and availability can change. Always confirm times, closures, and requirements with
            official sources before a trip.
          </p>
        </section>
      </div>
    </>
  )
}
