import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { trackEvent } from '@/lib/analytics'

const KEY = 'tus_newsletter_seen_v1'

export function NewsletterModal() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')

  useEffect(() => {
    if (sessionStorage.getItem(KEY)) return
    const t = window.setTimeout(() => setOpen(true), 9000)
    return () => window.clearTimeout(t)
  }, [])

  const close = () => {
    sessionStorage.setItem(KEY, '1')
    setOpen(false)
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const email = String(formData.get('email') ?? '').trim()
    const consent = String(formData.get('consent') ?? '') === 'on'
    if (!email || !consent) return
    setStatus('sending')
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, consent, source: 'modal' }),
    })
      .then((r) => {
        if (!r.ok) throw new Error('bad status')
        trackEvent('newsletter_submit', { source: 'modal' })
        setStatus('ok')
        window.setTimeout(close, 700)
      })
      .catch(() => {
        setStatus('error')
        window.setTimeout(() => setStatus('idle'), 3500)
      })
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="glass-panel w-full max-w-lg rounded-3xl p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="nl-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  id="nl-title"
                  className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-white"
                >
                  Get the USA briefing
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Weekly highlights: opportunity, money moves, and guides—no spam, unsubscribe anytime.
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200 hover:bg-white/10"
                onClick={close}
              >
                Close
              </button>
            </div>
            <form className="mt-5 space-y-3" onSubmit={submit}>
              <label className="block text-xs font-semibold uppercase tracking-widest text-sky-200/80">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500/60"
                />
              </label>
              <label className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[11px] text-slate-200/90">
                <input name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 accent-sky-500" />
                <span>
                  I agree to receive emails. Not for children under 13. See{' '}
                  <a className="text-sky-200 hover:text-white" href="/privacy">
                    Privacy
                  </a>
                  .
                </span>
              </label>
              <button
                type="submit"
                className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-sky-900/30 disabled:opacity-70"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Joining…' : status === 'ok' ? 'Joined' : 'Join the list'}
              </button>
              {status === 'error' && <p className="text-[11px] text-rose-200/90">Couldn’t submit right now. Please try again.</p>}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
