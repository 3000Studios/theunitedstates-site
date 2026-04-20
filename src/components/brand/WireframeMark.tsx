export function WireframeMark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={
        className ??
        'relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-[#0a1f44] to-sky-700 shadow-lg shadow-sky-900/40 ring-1 ring-white/10'
      }
    >
      <div className="wire-cube absolute inset-0 grid place-items-center">
        <div className="wire-cube__inner" />
      </div>
    </div>
  )
}

