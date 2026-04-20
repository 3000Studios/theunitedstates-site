import { motion } from 'framer-motion'

export function FlagHamburger({ open }: { open: boolean }) {
  return (
    <div className="relative h-7 w-8">
      <motion.div
        className="flag-icon absolute inset-0 rounded-md"
        animate={{ rotate: open ? 90 : 0, scale: open ? 0.92 : 1 }}
        transition={{ type: 'spring', stiffness: 360, damping: 26 }}
      />
      <motion.div
        className="absolute -bottom-1 left-1/2 h-2 w-px bg-white/35"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.15 }}
        style={{ transform: 'translateX(-50%)' }}
        aria-hidden
      />
    </div>
  )
}

