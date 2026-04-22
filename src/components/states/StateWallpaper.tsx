import type { USStateInfo } from '@/lib/types'

function hash(input: string): number {
  let value = 0
  for (let i = 0; i < input.length; i++) value = (value * 33 + input.charCodeAt(i)) >>> 0
  return value
}

function statePalette(state: USStateInfo): [string, string, string] {
  const presets: Array<[string, string, string]> = [
    ['#0f3b82', '#b22234', '#d4af37'],
    ['#123f74', '#d1495b', '#f8fafc'],
    ['#0a2f5a', '#9f1239', '#fbbf24'],
    ['#1d4ed8', '#be123c', '#f8fafc'],
    ['#0f172a', '#b91c1c', '#fde68a'],
  ]
  return presets[hash(state.id) % presets.length]!
}

function layerStyle(index: number, state: USStateInfo) {
  const seed = hash(`${state.slug}-${index}`)
  const x = 10 + (seed % 72)
  const y = 8 + ((seed >> 3) % 68)
  const size = 120 + (seed % 240)
  const duration = 16 + (seed % 18)
  const delay = -((seed % 10) + index)
  const rotate = (seed % 28) - 14
  return {
    left: `${x}%`,
    top: `${y}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    ['--float-rotate' as const]: `${rotate}deg`,
    transform: `translate3d(-50%, -50%, 0) rotate(${rotate}deg)`,
  }
}

export function StateWallpaper({ state }: { state: USStateInfo }) {
  const [primary, accent, glow] = statePalette(state)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(circle at 18% 18%, ${primary}66, transparent 30%), radial-gradient(circle at 84% 20%, ${accent}5c, transparent 28%), linear-gradient(135deg, #04111f 0%, #071a32 42%, #081425 100%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
          transform: 'perspective(900px) rotateX(72deg) scale(1.35)',
          transformOrigin: 'center bottom',
        }}
      />
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="state-wallpaper-float absolute rounded-[2rem] border border-white/10"
          style={{
            ...layerStyle(index, state),
            background: `linear-gradient(145deg, ${primary}99, ${accent}44 52%, rgba(255,255,255,0.06))`,
            boxShadow: `0 24px 80px ${primary}33, inset 0 1px 0 rgba(255,255,255,0.12), 0 0 40px ${glow}22`,
            backdropFilter: 'blur(8px)',
          }}
        />
      ))}
      <div
        className="absolute right-[-5%] top-[6%] text-[min(28vw,18rem)] font-black uppercase leading-none tracking-[-0.08em] opacity-[0.08]"
        style={{
          color: glow,
          textShadow: `0 0 32px ${glow}55`,
        }}
      >
        {state.abbreviation}
      </div>
      <div
        className="absolute bottom-[8%] left-[4%] rounded-[2rem] border border-white/10 px-4 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/45"
        style={{
          background: `linear-gradient(135deg, ${accent}1c, rgba(255,255,255,0.02))`,
          boxShadow: `0 12px 40px ${accent}20`,
        }}
      >
        {state.capital}
      </div>
    </div>
  )
}
