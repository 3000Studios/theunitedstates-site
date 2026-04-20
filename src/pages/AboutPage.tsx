import { Seo } from '@/components/seo/Seo'

export function AboutPage() {
  return (
    <>
      <Seo
        title="About | The United States"
        description="Mission, standards, and how The United States serves family-friendly travel and history readers."
        path="/about"
      />
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">About</h1>
        <p className="mt-3 max-w-3xl text-base text-slate-300/90">
          We publish fast, readable pages for exploring the United States—states, family-friendly travel planning,
          history references, and uplifting updates with source links.
        </p>
      </header>
      <div className="space-y-6 text-sm leading-relaxed text-slate-200/90">
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white">Mission</h2>
          <p className="mt-3">
            Help families explore America with calm language, practical planning links, and transparent monetization. We
            aim to be advertiser-safe, reader-respecting, and obsessively useful.
          </p>
        </section>
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white">Standards</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>We correct clear errors promptly when identified.</li>
            <li>Ads and (when enabled) affiliate links are disclosed.</li>
            <li>We prioritize primary sources for history references and official sources for travel planning.</li>
          </ul>
        </section>
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white">Contact</h2>
          <p className="mt-3">
            Reach the team via the{' '}
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
