import { Seo } from '@/components/seo/Seo'

export function PrivacyPage() {
  return (
    <>
      <Seo
        title="Privacy Policy | The United States"
        description="Privacy policy for The United States: analytics, ads, cookies, and reader choices."
        path="/privacy"
      />
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-slate-400">Last updated: April 20, 2026</p>
      </header>
      <div className="space-y-6 text-sm leading-relaxed text-slate-200/90">
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-white">Overview</h2>
          <p className="mt-3">
            This website (“Site”) respects reader privacy. This policy explains what we collect, why, and your choices.
            If you do not agree, please discontinue use of the Site.
          </p>
        </section>
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-white">Information we collect</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <span className="font-semibold text-white">Usage data:</span> pages viewed, approximate location (region),
              device type, and diagnostics—often collected by analytics tools.
            </li>
            <li>
              <span className="font-semibold text-white">Cookies:</span> used for site functionality, measurement, and
              advertising personalization where enabled.
            </li>
            <li>
              <span className="font-semibold text-white">Email (optional):</span> if you subscribe, we store your email
              for delivery until you unsubscribe. Submissions are stored in our Cloudflare Worker storage.
            </li>
            <li>
              <span className="font-semibold text-white">Kid Zone:</span> this page is designed for families and does
              not require accounts. Newsletter signups and contact forms are intended for adults only.
            </li>
          </ul>
        </section>
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-white">Advertising</h2>
          <p className="mt-3">
            Third-party advertisers such as Google AdSense may use cookies and similar technologies to serve ads. You can
            manage ad personalization through Google’s tools and industry opt-out pages. See Google’s policies for
            details.
          </p>
        </section>
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-white">Analytics</h2>
          <p className="mt-3">
            We may use Google Analytics and Cloudflare analytics features to understand traffic and improve performance.
            These tools may set cookies or use similar technologies.
          </p>
        </section>
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-white">Data retention</h2>
          <p className="mt-3">
            Retention depends on the services configured. Configure retention windows inside your analytics and email
            provider dashboards.
          </p>
        </section>
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-white">Contact</h2>
          <p className="mt-3">
            Questions: use the{' '}
            <a className="text-sky-200 hover:text-white" href="/contact">
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </>
  )
}
