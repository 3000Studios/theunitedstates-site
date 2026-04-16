import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#020617]/80">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="font-[family-name:var(--font-display)] text-lg font-extrabold text-white">
            The United States Site
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-300/90">
            A modern USA hub for news, lifestyle, opportunity, and practical guides—built for clarity and speed.
          </p>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Explore</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="text-slate-200/90 hover:text-white" to="/news">
                News
              </Link>
            </li>
            <li>
              <Link className="text-slate-200/90 hover:text-white" to="/money">
                Money / Jobs
              </Link>
            </li>
            <li>
              <Link className="text-slate-200/90 hover:text-white" to="/states">
                States
              </Link>
            </li>
            <li>
              <Link className="text-slate-200/90 hover:text-white" to="/store">
                Store
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Company</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link className="text-slate-200/90 hover:text-white" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="text-slate-200/90 hover:text-white" to="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="text-slate-200/90 hover:text-white" to="/privacy">
                Privacy
              </Link>
            </li>
            <li>
              <Link className="text-slate-200/90 hover:text-white" to="/terms">
                Terms
              </Link>
            </li>
            <li>
              <Link className="text-slate-200/90 hover:text-white" to="/disclaimer">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Disclosure</div>
          <p className="mt-3 text-xs leading-relaxed text-slate-400">
            We may earn commissions from qualifying purchases via affiliate links (for example, Amazon). Ads are served
            through Google AdSense. Content is for informational purposes and is not financial or legal advice.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} The United States Site. All rights reserved.
      </div>
    </footer>
  )
}
