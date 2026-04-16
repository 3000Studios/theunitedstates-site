import { useEffect, useRef } from 'react'
import { ADSENSE_CLIENT, AD_SLOTS, type AdSlotKey } from '@/config/ads'

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[]
  }
}

interface Props {
  slotKey: AdSlotKey
  className?: string
  format?: string
  style?: React.CSSProperties
}

export function AdSlot({ slotKey, className, format = 'auto', style }: Props) {
  const ref = useRef<HTMLModElement>(null)
  const slot = AD_SLOTS[slotKey]

  useEffect(() => {
    if (!slot) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      /* network or consent */
    }
  }, [slot])

  if (!slot) {
    return null
  }

  return (
    <div className={className}>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}
