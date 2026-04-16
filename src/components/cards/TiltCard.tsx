import { type ReactNode, useRef } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export function TiltCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 260, damping: 22 })
  const sry = useSpring(ry, { stiffness: 260, damping: 22 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    rx.set(py * -9)
    ry.set(px * 9)
  }

  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      className={`tilt-card rounded-3xl ${className ?? ''}`}
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-[#b22234]/10" />
        <div className="relative">{children}</div>
      </div>
    </motion.div>
  )
}
