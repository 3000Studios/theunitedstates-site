import { Link } from 'react-router-dom'
import { Seo } from '@/components/seo/Seo'
import { AdSlot } from '@/components/ads/AdSlot'

export function GuidesPage() {
  return (
    <>
      <Seo
        title="Trip Guides | The United States"
        description="Family-friendly travel planning guides for exploring the United States."
        path="/guides"
      />
      <header className="mb-8">
        <h1 className="font-[family-name:var(--font-display)] text-4xl font-extrabold text-white md:text-5xl">
          Trip Guides
        </h1>
        <p className="mt-3 max-w-3xl text-base text-slate-300/90">
          Practical, family-friendly planning checklists you can use anywhere in the USA.
        </p>
      </header>
      <AdSlot slotKey="topBanner" className="mx-auto mb-8 max-w-[970px]" />
      <div className="grid gap-4 md:grid-cols-2">
        {[
          {
            title: 'National Parks (family checklist)',
            desc: 'Reservations, weather, layers, safety basics, and how to avoid the “forgotten essentials.”',
            to: '/states',
          },
          {
            title: 'Road trip planning',
            desc: 'Stops, snacks, offline maps, rest breaks, and a simple budget plan for gas + lodging.',
            to: '/states',
          },
          {
            title: 'City weekend basics',
            desc: 'Transit, walkable areas, museum timing, and kid-friendly pacing that still feels “big.”',
            to: '/states',
          },
          {
            title: 'Travel deals (save smart)',
            desc: 'What to compare (and what not to over-optimize) for flights, hotels, and attractions.',
            to: '/updates',
          },
        ].map((c) => (
          <Link
            key={c.title}
            to={c.to}
            className="glass-panel rounded-3xl p-6 transition hover:border-sky-400/30"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Guide</div>
            <div className="mt-3 font-[family-name:var(--font-display)] text-xl font-extrabold text-white">
              {c.title}
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-300/90">{c.desc}</p>
          </Link>
        ))}
      </div>
    </>
  )
}
