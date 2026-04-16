import { AdSlot } from '@/components/ads/AdSlot'

export function MobileStickyAd() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#050d1a]/90 p-2 backdrop-blur md:hidden">
      <AdSlot slotKey="mobileSticky" className="mx-auto max-w-[320px]" />
    </div>
  )
}
