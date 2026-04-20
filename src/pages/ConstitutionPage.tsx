import { Seo } from '@/components/seo/Seo'
import { AdSlot } from '@/components/ads/AdSlot'

const BILL_OF_RIGHTS = [
  { n: 1, title: 'Speech, religion, press, assembly, petition', gist: 'Protects core freedoms and limits Congress from restricting them.' },
  { n: 2, title: 'Right to keep and bear arms', gist: 'Addresses arms in connection with a well regulated militia.' },
  { n: 3, title: 'Quartering of soldiers', gist: 'Restricts quartering soldiers in private homes in peacetime.' },
  { n: 4, title: 'Searches and seizures', gist: 'Requires reasonableness and warrants based on probable cause.' },
  { n: 5, title: 'Due process', gist: 'Covers grand juries, double jeopardy, self‑incrimination, and just compensation.' },
  { n: 6, title: 'Rights of the accused', gist: 'Speedy/public trial, impartial jury, counsel, and confrontation of witnesses.' },
  { n: 7, title: 'Civil trials', gist: 'Preserves jury trials in certain civil cases.' },
  { n: 8, title: 'Bail and punishment', gist: 'Prohibits excessive bail/fines and cruel and unusual punishments.' },
  { n: 9, title: 'Other retained rights', gist: 'Clarifies that listing rights doesn’t deny other rights retained by the people.' },
  { n: 10, title: 'Powers reserved', gist: 'Reserves undelegated powers to the states or the people.' },
] as const

export function ConstitutionPage() {
  return (
    <>
      <Seo
        title="The U.S. Constitution (Bill of Rights) | The United States"
        description="A quick, family-friendly reference to the first 10 amendments (the Bill of Rights) with reputable primary-source links."
        path="/constitution"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'The U.S. Constitution (Bill of Rights)',
          url: 'https://theunitedstates.site/constitution',
        }}
      />

      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">
          The U.S. Constitution
        </h1>
        <p className="mt-3 max-w-3xl text-base text-slate-300/90">
          Quick reference: the first 10 amendments (the Bill of Rights). For exact text and historical context, use the
          primary sources linked below.
        </p>
      </header>

      <AdSlot slotKey="topBanner" className="mx-auto mb-8 max-w-[970px]" />

      <section className="grid gap-4 md:grid-cols-2">
        {BILL_OF_RIGHTS.map((a) => (
          <article key={a.n} className="glass-panel rounded-3xl p-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-sky-200/80">
              Amendment {a.n}
            </div>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-xl font-extrabold text-white">
              {a.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300/90">{a.gist}</p>
          </article>
        ))}
      </section>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
        <section className="glass-panel rounded-3xl p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Primary sources</div>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                className="font-semibold text-sky-200 hover:text-white"
                href="https://www.archives.gov/founding-docs/bill-of-rights"
                target="_blank"
                rel="noreferrer"
              >
                National Archives: Bill of Rights
              </a>
            </li>
            <li>
              <a
                className="font-semibold text-sky-200 hover:text-white"
                href="https://www.archives.gov/founding-docs/constitution"
                target="_blank"
                rel="noreferrer"
              >
                National Archives: Constitution
              </a>
            </li>
            <li>
              <a
                className="font-semibold text-sky-200 hover:text-white"
                href="https://constitution.congress.gov/"
                target="_blank"
                rel="noreferrer"
              >
                Congress: Constitution Annotated
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-slate-400">
            This page is a plain-language guide for readers. If you need legal advice, consult a qualified attorney.
          </p>
        </section>

        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <AdSlot slotKey="sidebar" />
          <div className="glass-panel rounded-3xl p-5">
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Family tip</div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Turn this into a “history minute”: read one amendment a week, then look up one historical example from a
              primary source.
            </p>
          </div>
        </aside>
      </div>
    </>
  )
}

