import { useState } from 'react'
import { Seo } from '@/components/seo/Seo'
import { trackEvent } from '@/lib/analytics'

export function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  return (
    <>
      <Seo
        title="Contact | The United States"
        description="Contact The United States for tips, corrections, partnerships, and press inquiries."
        path="/contact"
      />
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">Contact</h1>
        <p className="mt-3 max-w-3xl text-base text-slate-300/90">
          Tips, corrections, and partnership inquiries.
        </p>
      </header>
      <div className="grid gap-8 lg:grid-cols-2">
        <form
          className="glass-panel space-y-4 rounded-3xl p-6"
          onSubmit={async (e) => {
            e.preventDefault()
            if (!name.trim() || !email.trim() || !message.trim()) return
            setStatus('sending')
            try {
              const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
              })
              if (!res.ok) throw new Error('bad status')
              trackEvent('contact_submit')
              setStatus('sent')
              setName('')
              setEmail('')
              setMessage('')
            } catch {
              setStatus('error')
              window.setTimeout(() => setStatus('idle'), 3500)
            }
          }}
        >
          <label className="block text-xs font-bold uppercase tracking-widest text-sky-200/80">
            Name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500/60"
            />
          </label>
          <label className="block text-xs font-bold uppercase tracking-widest text-sky-200/80">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500/60"
            />
          </label>
          <label className="block text-xs font-bold uppercase tracking-widest text-sky-200/80">
            Message
            <textarea
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500/60"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 py-3 text-sm font-bold text-white disabled:opacity-70"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent' : 'Send'}
          </button>
          {status === 'sent' && <p className="text-sm text-emerald-300">Thanks — we received your message.</p>}
          {status === 'error' && <p className="text-sm text-rose-200/90">Couldn’t send right now. Please try again.</p>}
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
