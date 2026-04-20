import { useState } from 'react'
import { trackEvent } from '@/lib/analytics'

export function NewsletterInline() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  return (
    <div className="glass-panel rounded-3xl p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Newsletter</div>
          <div className="mt-2 font-[family-name:var(--font-display)] text-xl font-extrabold text-white">
            Family-friendly USA highlights
          </div>
          <p className="mt-2 max-w-xl text-sm text-slate-300/90">
            A compact weekly email with travel ideas, history notes, and uplifting updates.
          </p>
        </div>
        <form
          className="flex w-full max-w-md flex-col gap-2 md:flex-row"
          onSubmit={async (e) => {
            e.preventDefault()
            const form = e.currentTarget as HTMLFormElement
            const formData = new FormData(form)
            const email = String(formData.get('email') ?? '').trim()
            const consent = String(formData.get('consent') ?? '') === 'on'
            if (!email || !consent) return
            setStatus('sending')
            try {
              const res = await fetch('/api/lead', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ email, consent, source: 'inline' }),
              })
              if (!res.ok) throw new Error('bad status')
              trackEvent('newsletter_submit', { source: 'inline' })
              setStatus('ok')
              form.reset()
              window.setTimeout(() => setStatus('idle'), 3000)
            } catch {
              setStatus('error')
              window.setTimeout(() => setStatus('idle'), 3500)
            }
          }}
        >
          <input
            required
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500/60"
          />
          <label className="flex items-start gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-[11px] text-slate-200/90 md:items-center md:py-0 md:text-[10px]">
            <input name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 accent-sky-500 md:mt-0" />
            <span>
              I agree to receive emails. Not for children under 13. See <a className="text-sky-200 hover:text-white" href="/privacy">Privacy</a>.
            </span>
          </label>
          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-3 text-sm font-bold text-white"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Joining…' : status === 'ok' ? 'Joined' : 'Join'}
          </button>
        </form>
      </div>
      {status === 'error' && <div className="mt-3 text-xs text-rose-200/90">Couldn’t submit right now. Please try again.</div>}
    </div>
  )
}
