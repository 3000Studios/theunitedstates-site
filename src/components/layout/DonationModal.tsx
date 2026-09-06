import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PAYPAL_DONATE_URL } from '@/config/donate'

const STORAGE_KEY = 'tus_donate_prompt_until_v1'
const DISMISS_MS = 1000 * 60 * 60 * 24 * 3

function shouldOpenPrompt(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return true
    return Date.now() > Number(raw)
  } catch {
    return true
  }
}

export function DonationModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!shouldOpenPrompt()) return

    let shown = false
    const show = () => {
      if (shown) return
      shown = true
      setOpen(true)
    }

    const timer = window.setTimeout(show, 9000)
    const onScroll = () => {
      if (window.scrollY > 320) show()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const close = () => {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now() + DISMISS_MS))
    } catch {
      // ignore storage failure
    }
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-[#020617]/70 px-4 pb-6 pt-20 md:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            className="w-full max-w-xl rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(10,31,68,0.96),rgba(178,34,52,0.9),rgba(2,6,23,0.96))] p-6 shadow-2xl shadow-black/40"
            role="dialog"
            aria-modal="true"
            aria-labelledby="donation-modal-title"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.28em] text-sky-100/80">Support the site</div>
                <h2 id="donation-modal-title" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold text-white">
                  Help keep The United States site live
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-semibold text-white"
                aria-label="Close donation prompt"
              >
                Close
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-100/90">
              Donations help fund new state guides, family travel content, kid-friendly games, hosting, and ongoing advertiser-safe updates across the site.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={PAYPAL_DONATE_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-extrabold text-[#0a1f44] shadow-lg shadow-black/20"
              >
                Donate with PayPal
              </a>
              <button
                type="button"
                onClick={close}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
