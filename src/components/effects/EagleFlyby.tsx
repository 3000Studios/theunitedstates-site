import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true
}

function rand(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function EagleFlyby() {
  const [active, setActive] = useState(false)
  const [seed, setSeed] = useState(0)

  const disabled = useMemo(() => prefersReducedMotion(), [])

  useEffect(() => {
    if (disabled) return
    let t: number | null = null

    const schedule = () => {
      const delayMs = Math.round(rand(22_000, 55_000))
      t = window.setTimeout(() => {
        setSeed((s) => s + 1)
        setActive(true)
        window.setTimeout(() => setActive(false), 5200)
        schedule()
      }, delayMs)
    }

    schedule()
    return () => {
      if (t) window.clearTimeout(t)
    }
  }, [disabled])

  if (disabled) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      <AnimatePresence>
        {active && (
          <motion.div
            key={seed}
            initial={{ x: '-25vw', y: rand(40, 180), opacity: 0 }}
            animate={{ x: '110vw', opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5.2, ease: 'easeInOut' }}
            className="absolute"
            style={{ filter: 'drop-shadow(0 0 16px rgba(59,130,246,0.25)) drop-shadow(0 0 14px rgba(178,34,52,0.18))' }}
            aria-hidden
          >
            <motion.svg
              width="220"
              height="120"
              viewBox="0 0 220 120"
              className="opacity-70"
              animate={{ rotate: [0, -1.5, 0, 1.5, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path
                d="M12 66c14-10 28-15 44-13 20 3 33 14 54 20 22 7 42 5 62-5 18-9 28-20 34-34 2-4 6-6 10-5 2 1 4 3 4 6 0 4-2 9-6 15-12 18-28 31-48 39-22 9-46 10-72 2-12-4-22-9-32-14-8-4-15-8-23-10-14-3-26 0-40 9-4 3-9 3-12 0-3-2-4-6-2-10 1-2 3-4 5-5z"
                fill="rgba(255,255,255,0.85)"
              />
              <path
                d="M124 70c10 2 20 1 30-3 14-6 24-15 31-27 3-5 6-7 10-7 6 1 9 7 6 13-10 22-27 38-49 45-12 4-24 5-36 2-3-1-5-3-5-6 0-4 4-7 13-7z"
                fill="rgba(178,34,52,0.35)"
              />
              <path
                d="M20 80c18-10 36-12 54-6 10 4 20 10 30 15 8 4 16 8 25 11 16 5 32 4 48-2 10-4 20-11 30-21 3-3 7-3 10 0 3 3 3 7 0 10-12 12-25 21-39 26-20 8-41 9-62 2-10-3-19-8-28-13-10-5-19-10-28-13-14-5-28-3-44 6-4 2-9 1-11-3-2-4 0-9 4-12z"
                fill="rgba(59,130,246,0.28)"
              />
            </motion.svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

