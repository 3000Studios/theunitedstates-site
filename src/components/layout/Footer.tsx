import { useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { PAYPAL_DONATE_URL } from '@/config/donate'

const LEGAL_NOTICE_URL = '/legal/notices/archive/2026/cease-and-desist/'
const DOT_CLICKS = 10
const DOT_IDLE_RESET_MS = 3000

export function Footer() {
  const { pathname } = useLocation()
  const clicksRef = useRef(0)
  const lastClickRef = useRef(0)

  const handleDotClick = () => {
    const now = Date.now()
    if (now - lastClickRef.current > DOT_IDLE_RESET_MS) clicksRef.current = 0
    lastClickRef.current = now
    clicksRef.current += 1
    if (clicksRef.current >= DOT_CLICKS) {
      clicksRef.current = 0
      window.location.href = LEGAL_NOTICE_URL
    }
  }

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-[#020617]/80">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="font-[family-name:var(--font-display)] text-lg font-extrabold text-white">The United States</div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300/90">
            A family-friendly USA travel and history hub: explore states, plan trips, and read uplifting updates—built for speed, trust, and advertiser safety.
          </p>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Explore</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="inline-flex min-h-11 items-center text-slate-200/90 hover:text-white" to="/states">States</Link>
            </li>
            <li>
              <Link className="inline-flex min-h-11 items-center text-slate-200/90 hover:text-white" to="/updates">Updates</Link>
            </li>
            <li>
              <Link className="inline-flex min-h-11 items-center text-slate-200/90 hover:text-white" to="/kids">Kid Zone</Link>
            </li>
            <li>
              <Link className="inline-flex min-h-11 items-center text-slate-200/90 hover:text-white" to="/constitution">Constitution</Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Company</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="inline-flex min-h-11 items-center text-slate-200/90 hover:text-white" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="inline-flex min-h-11 items-center text-slate-200/90 hover:text-white" to="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="inline-flex min-h-11 items-center text-slate-200/90 hover:text-white" to="/privacy">
                Privacy
              </Link>
            </li>
            <li>
              <Link className="inline-flex min-h-11 items-center text-slate-200/90 hover:text-white" to="/terms">
                Terms
              </Link>
            </li>
            <li>
              <Link className="inline-flex min-h-11 items-center text-slate-200/90 hover:text-white" to="/disclaimer">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Disclosure</div>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            Ads may be served through Google AdSense. When affiliate programs are enabled, we may earn commissions from
            qualifying purchases. Content is for informational purposes and is not legal advice.
          </p>
          <a
            href={PAYPAL_DONATE_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex min-h-11 items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-extrabold text-white hover:bg-white/10"
          >
            Fund the site with PayPal
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} The United States Site. All rights reserved.
      </div>
      {pathname === '/' && (
        <span
          aria-hidden="true"
          onClick={handleDotClick}
          className="absolute bottom-1 left-1 inline-block h-1 w-1 rounded-full bg-[#0b1226]"
        />
      )}
    </footer>
  )
}
