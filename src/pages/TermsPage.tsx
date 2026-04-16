import { Seo } from '@/components/seo/Seo'

export function TermsPage() {
  return (
    <>
      <Seo
        title="Terms of Use | The United States Site"
        description="Terms of use for visiting and using The United States Site."
        path="/terms"
      />
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">
          Terms of Use
        </h1>
        <p className="mt-3 text-slate-400">Last updated: April 16, 2026</p>
      </header>
      <div className="space-y-6 text-sm leading-relaxed text-slate-200/90">
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-white">Agreement</h2>
          <p className="mt-3">
            By accessing the Site, you agree to these Terms and our Privacy Policy. If you disagree, do not use the Site.
          </p>
        </section>
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-white">Not professional advice</h2>
          <p className="mt-3">
            Content is informational and opinion-based unless explicitly stated otherwise. Nothing on the Site is legal,
            tax, medical, or investment advice. Consult licensed professionals for decisions affecting your health,
            finances, or legal rights.
          </p>
        </section>
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-white">Intellectual property</h2>
          <p className="mt-3">
            Unless otherwise noted, the Site owns or licenses its branding, layout, and original text. Do not copy,
            scrape, or republish without permission.
          </p>
        </section>
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-white">Limitation of liability</h2>
          <p className="mt-3">
            To the fullest extent permitted by law, the Site is provided “as is” without warranties. We are not liable
            for indirect or consequential damages arising from use of the Site.
          </p>
        </section>
        <section className="glass-panel rounded-3xl p-6">
          <h2 className="text-lg font-extrabold text-white">Changes</h2>
          <p className="mt-3">We may update these Terms. Continued use after changes constitutes acceptance.</p>
        </section>
      </div>
    </>
  )
}
