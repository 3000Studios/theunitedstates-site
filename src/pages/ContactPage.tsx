import { useState } from 'react'
import { Seo } from '@/components/seo/Seo'
import { trackEvent } from '@/lib/analytics'

export function ContactPage() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <Seo
        title="Contact | The United States Site"
        description="Contact The United States Site for tips, corrections, partnerships, and press inquiries."
        path="/contact"
      />
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">Contact</h1>
        <p className="mt-3 max-w-3xl text-base text-slate-300/90">
          Tips, corrections, and partnership inquiries. This form is wired for demo tracking—connect your email service in
          production.
        </p>
      </header>
      <div className="grid gap-8 lg:grid-cols-2">
        <form
          className="glass-panel space-y-4 rounded-3xl p-6"
          onSubmit={(e) => {
            e.preventDefault()
            trackEvent('contact_submit')
            setSent(true)
          }}
        >
          <label className="block text-xs font-bold uppercase tracking-widest text-sky-200/80">
            Name
            <input
              required
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500/60"
            />
          </label>
          <label className="block text-xs font-bold uppercase tracking-widest text-sky-200/80">
            Email
            <input
              required
              type="email"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500/60"
            />
          </label>
          <label className="block text-xs font-bold uppercase tracking-widest text-sky-200/80">
            Message
            <textarea
              required
              rows={6}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500/60"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 py-3 text-sm font-bold text-white"
          >
            Send
          </button>
          {sent && <p className="text-sm text-emerald-300">Thanks—your message was recorded in this demo UI.</p>}
        </form>
        <div className="glass-panel rounded-3xl p-6 text-sm leading-relaxed text-slate-200/90">
          <h2 className="font-[family-name:var(--font-display)] text-xl font-extrabold text-white">What to include</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5">
            <li>Corrections: link + what should change.</li>
            <li>Tips: sources and timestamps when possible.</li>
            <li>Partnerships: company, goals, and timeline.</li>
          </ul>
          <p className="mt-6 text-slate-400">
            For legal notices, use postal contact information you publish for your business entity when operating at
            scale.
          </p>
        </div>
      </div>
    </>
  )
}
