import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { loginLocal } from '@/lib/auth'

export function LoginPage() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  return (
    <>
      <Seo title="Sign in | The United States Site" description="Sign in to your reader account (demo UI)." path="/login" />
      <div className="mx-auto max-w-md">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white">Sign in</h1>
        <p className="mt-2 text-sm text-slate-400">Local demo auth—swap for a real provider when you scale.</p>
        <form
          className="glass-panel mt-8 space-y-4 rounded-3xl p-6"
          onSubmit={(e) => {
            e.preventDefault()
            setError(null)
            try {
              loginLocal(email, password)
              nav('/profile')
            } catch (err) {
              setError(err instanceof Error ? err.message : 'Unable to sign in')
            }
          }}
        >
          <label className="block text-xs font-bold uppercase tracking-widest text-sky-200/80">
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500/60"
            />
          </label>
          <label className="block text-xs font-bold uppercase tracking-widest text-sky-200/80">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500/60"
            />
          </label>
          {error && <div className="text-sm text-red-300">{error}</div>}
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 py-3 text-sm font-bold text-white"
          >
            Continue
          </button>
          <p className="text-center text-sm text-slate-400">
            New here?{' '}
            <Link className="text-sky-200 hover:text-white" to="/register">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </>
  )
}
