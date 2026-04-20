import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV_ITEMS } from '@/data/navigation'
import { AdSlot } from '@/components/ads/AdSlot'
import { WireframeMark } from '@/components/brand/WireframeMark'
import { FlagHamburger } from '@/components/brand/FlagHamburger'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const query = q.trim()
    if (!query) return
    navigate(`/search?q=${encodeURIComponent(query)}`)
    setOpen(false)
  }

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors ${
        scrolled ? 'border-white/15 bg-[#050d1a]/85 backdrop-blur-xl' : 'border-transparent bg-[#050d1a]/40 backdrop-blur'
      }`}
    >
      <div className="mx-auto max-w-[1600px] px-4">
        <div className="hidden border-b border-white/10 py-2 md:block">
          <AdSlot slotKey="stickyHeader" className="mx-auto max-w-[728px]" />
        </div>

        <div className="flex items-center gap-3 py-3">
          <Link to="/" className="group flex items-center gap-2">
            <WireframeMark />
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-[family-name:var(--font-display)] text-base font-extrabold tracking-tight text-white">
                The United States
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-sky-200/70">
                Travel · History · Good news
              </span>
            </span>
          </Link>

          <form onSubmit={submitSearch} className="mx-auto hidden max-w-md flex-1 md:block">
            <label className="relative block">
              <span className="sr-only">Search</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search topics, cities, careers…"
                className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white outline-none ring-sky-500/0 transition focus:ring-2"
              />
            </label>
          </form>

          <nav className="ml-auto hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.slice(0, 7).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    isActive ? 'bg-white/10 text-white' : 'text-slate-200/80 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <FlagHamburger open={open} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/10 bg-[#050d1a]/95 lg:hidden"
          >
            <div className="mx-auto max-w-[1600px] space-y-3 px-4 py-4">
              <form onSubmit={submitSearch}>
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search…"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-sky-500/60"
                />
              </form>
              <div className="grid gap-1">
                {NAV_ITEMS.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-xl px-3 py-2 text-sm font-medium ${
                        isActive ? 'bg-white/10 text-white' : 'text-slate-100/90'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
