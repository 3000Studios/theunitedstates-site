import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [on, setOn] = useState(false)
  const [enabled, setEnabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches,
  )

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const handler = () => setEnabled(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
      setOn(true)
    }
    const leave = () => setOn(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-screen"
      animate={{ x: pos.x - 10, y: pos.y - 10, opacity: on ? 1 : 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    >
      <div className="h-5 w-5 rounded-full border border-sky-400/60 shadow-[0_0_20px_rgba(59,130,246,0.55)]" />
    </motion.div>
  )
}
