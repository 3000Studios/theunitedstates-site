import { Link, useNavigate } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { clearSession, getSession } from '@/lib/auth'

export function ProfilePage() {
  const nav = useNavigate()
  const session = getSession()

  if (!session) {
    return (
      <>
        <Seo title="Profile | The United States Site" description="Reader profile." path="/profile" />
        <div className="glass-panel mx-auto max-w-xl rounded-3xl p-8 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-white">Profile</h1>
          <p className="mt-3 text-slate-300/90">You are not signed in.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link className="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2 text-sm font-bold text-white" to="/login">
              Sign in
            </Link>
            <Link className="rounded-2xl border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-white" to="/register">
              Register
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Seo title="Profile | The United States Site" description="Your reader profile (demo UI)." path="/profile" />
      <div className="mx-auto max-w-xl">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white">Profile</h1>
        <div className="glass-panel mt-6 rounded-3xl p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Display name</div>
          <div className="mt-2 text-xl font-extrabold text-white">{session.user.displayName}</div>
          <div className="mt-6 text-xs font-bold uppercase tracking-widest text-sky-200/80">Email</div>
          <div className="mt-2 text-sm text-slate-200/90">{session.user.email}</div>
          <div className="mt-6 text-xs font-bold uppercase tracking-widest text-sky-200/80">Member since</div>
          <div className="mt-2 text-sm text-slate-200/90">
            {new Date(session.user.createdAt).toLocaleString()}
          </div>
          <div className="mt-6 text-xs text-slate-500">
            Session token (demo): <span className="font-mono text-slate-400">{session.token.slice(0, 18)}…</span>
          </div>
          <button
            type="button"
            className="mt-8 w-full rounded-2xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white hover:bg-white/10"
            onClick={() => {
              clearSession()
              nav('/')
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </>
  )
}
