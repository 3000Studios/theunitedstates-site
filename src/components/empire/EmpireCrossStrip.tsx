import { EMPIRE_ORIGINS } from '@/config/empire'

const LINKS = [
  { label: 'Citadel', href: `${EMPIRE_ORIGINS.citadel}/?utm_source=usa&utm_medium=strip` },
  { label: 'Referrals', href: `${EMPIRE_ORIGINS.referrals}/?utm_source=usa&utm_medium=strip` },
  { label: 'TMACK48', href: `${EMPIRE_ORIGINS.media}/?utm_source=usa&utm_medium=strip` },
  { label: 'Empire feed', href: `${EMPIRE_ORIGINS.citadel}/feed?utm_source=usa&utm_medium=strip` },
]

export function EmpireCrossStrip() {
  return (
    <div className="border-b border-white/10 bg-[#040b18]/90">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2 px-4 py-2 text-[10px] uppercase tracking-[0.25em] text-sky-200/90">
        <span className="text-slate-500">Empire</span>
        {LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-100 hover:border-sky-400/50"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  )
}
