import { useEffect, useMemo, useRef, useState } from 'react'

type Obstacle = { x: number; y: number; r: number }

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}

function seeded(seed: number): () => number {
  let s = seed || 1
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

export function EagleRunGame({ seed }: { seed: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const [running, setRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [best, setBest] = useState(() => {
    try {
      return Number(localStorage.getItem('tus_eagle_best_v1') ?? '0') || 0
    } catch {
      return 0
    }
  })

  const rng = useMemo(() => seeded(seed + 7), [seed])

  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
    const resize = () => {
      const rect = c.getBoundingClientRect()
      c.width = Math.floor(rect.width * dpr)
      c.height = Math.floor(rect.height * dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let t0 = performance.now()
    let x = 80 * dpr
    let y = 140 * dpr
    let vy = 0
    let obstacles: Obstacle[] = []
    let localScore = 0
    let alive = true

    const spawn = () => {
      const h = c.height
      const yMin = 60 * dpr
      const yMax = h - 60 * dpr
      obstacles.push({
        x: c.width + 40 * dpr,
        y: yMin + (yMax - yMin) * rng(),
        r: (14 + rng() * 18) * dpr,
      })
    }

    const reset = () => {
      t0 = performance.now()
      x = 80 * dpr
      y = c.height / 2
      vy = 0
      obstacles = []
      localScore = 0
      alive = true
      spawn()
      spawn()
      setScore(0)
    }

    const flap = () => {
      if (!running) {
        setRunning(true)
        reset()
        return
      }
      if (!alive) {
        setRunning(true)
        reset()
        return
      }
      vy = -4.2 * dpr
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') flap()
    }
    window.addEventListener('keydown', onKey)

    const onPointer = () => flap()
    c.addEventListener('pointerdown', onPointer, { passive: true })

    const drawEagle = () => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(clamp(vy * 0.02, -0.35, 0.25))
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.beginPath()
      ctx.moveTo(-18 * dpr, 0)
      ctx.quadraticCurveTo(-6 * dpr, -10 * dpr, 6 * dpr, -2 * dpr)
      ctx.quadraticCurveTo(18 * dpr, 6 * dpr, 28 * dpr, 0)
      ctx.quadraticCurveTo(18 * dpr, 12 * dpr, 6 * dpr, 6 * dpr)
      ctx.quadraticCurveTo(-6 * dpr, 2 * dpr, -18 * dpr, 0)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const drawStar = (o: Obstacle) => {
      const spikes = 5
      const outer = o.r
      const inner = o.r * 0.45
      ctx.save()
      ctx.translate(o.x, o.y)
      ctx.rotate((o.x / 220) % Math.PI)
      ctx.beginPath()
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? outer : inner
        const a = (i * Math.PI) / spikes
        ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r)
      }
      ctx.closePath()
      ctx.fillStyle = 'rgba(234,179,8,0.85)'
      ctx.fill()
      ctx.strokeStyle = 'rgba(255,255,255,0.35)'
      ctx.lineWidth = 1 * dpr
      ctx.stroke()
      ctx.restore()
    }

    const step = (t: number) => {
      const dt = Math.min(34, t - t0) / 16.67
      t0 = t

      ctx.clearRect(0, 0, c.width, c.height)

      // Background
      const g = ctx.createLinearGradient(0, 0, c.width, c.height)
      g.addColorStop(0, 'rgba(10,31,68,0.9)')
      g.addColorStop(0.5, 'rgba(2,6,23,0.9)')
      g.addColorStop(1, 'rgba(178,34,52,0.55)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, c.width, c.height)

      // Subtle stripes
      ctx.globalAlpha = 0.14
      for (let i = 0; i < 12; i++) {
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.45)' : 'rgba(178,34,52,0.55)'
        ctx.fillRect(0, (i * c.height) / 12, c.width, c.height / 24)
      }
      ctx.globalAlpha = 1

      if (running && alive) {
        vy += 0.28 * dpr * dt
        y += vy * dt * 3.2
        y = clamp(y, 18 * dpr, c.height - 18 * dpr)

        const speed = (3.2 + localScore / 260) * dpr
        for (const o of obstacles) o.x -= speed * dt * 3.2
        if (obstacles.length < 6 && obstacles[obstacles.length - 1]!.x < c.width - 180 * dpr) spawn()
        obstacles = obstacles.filter((o) => o.x > -80 * dpr)

        // Collisions
        for (const o of obstacles) {
          const dx = o.x - x
          const dy = o.y - y
          if (dx * dx + dy * dy < (o.r + 16 * dpr) * (o.r + 16 * dpr)) {
            alive = false
            setRunning(false)
            setBest((b) => {
              const next = Math.max(b, Math.floor(localScore))
              try {
                localStorage.setItem('tus_eagle_best_v1', String(next))
              } catch {
                // ignore
              }
              return next
            })
          }
        }

        localScore += dt
        setScore(Math.floor(localScore))
      }

      for (const o of obstacles) drawStar(o)
      drawEagle()

      // HUD
      ctx.fillStyle = 'rgba(255,255,255,0.9)'
      ctx.font = `${14 * dpr}px ui-sans-serif, system-ui, -apple-system`
      ctx.fillText(`Score: ${Math.floor(localScore)}`, 16 * dpr, 24 * dpr)
      ctx.fillText(`Best: ${best}`, 16 * dpr, 44 * dpr)

      if (!running) {
        ctx.fillStyle = 'rgba(2,6,23,0.55)'
        ctx.fillRect(0, c.height / 2 - 42 * dpr, c.width, 84 * dpr)
        ctx.fillStyle = 'rgba(255,255,255,0.95)'
        ctx.font = `${16 * dpr}px ui-sans-serif, system-ui, -apple-system`
        ctx.fillText('Tap / click to fly', 16 * dpr, c.height / 2 - 6 * dpr)
        ctx.font = `${12 * dpr}px ui-sans-serif, system-ui, -apple-system`
        ctx.fillText('Dodge the stars. Press Space / Enter too.', 16 * dpr, c.height / 2 + 18 * dpr)
      }

      rafRef.current = window.requestAnimationFrame(step)
    }

    rafRef.current = window.requestAnimationFrame(step)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', onKey)
      c.removeEventListener('pointerdown', onPointer)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [best, rng, running])

  return (
    <div className="glass-panel rounded-3xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-sky-200/80">Eagle run</div>
          <div className="mt-2 text-sm text-slate-300/90">Tap to fly. Dodge the stars. Beat your best.</div>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200/90">
          Score: {score}
        </div>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
        <canvas ref={canvasRef} className="h-[320px] w-full touch-manipulation" />
      </div>
    </div>
  )
}

