import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { NewsTicker } from '@/components/layout/NewsTicker'
import { TrendingTicker } from '@/components/layout/TrendingTicker'
import { CustomCursor } from '@/components/effects/CustomCursor'
import { NewsletterModal } from '@/components/layout/NewsletterModal'
import { MobileStickyAd } from '@/components/ads/MobileStickyAd'
import { initAnalytics, attachScrollDepthTracking, trackPageView } from '@/lib/analytics'

export function MainLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()

  useEffect(() => {
    initAnalytics()
    attachScrollDepthTracking()
  }, [])

  useEffect(() => {
    trackPageView(pathname)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <div className="min-h-dvh bg-[#050d1a] text-slate-100">
      <CustomCursor />
      <NewsTicker />
      <TrendingTicker />
      <Header />
      <main className="mx-auto w-full max-w-[1600px] px-4 pb-28 pt-8 md:pb-12">{children}</main>
      <Footer />
      <NewsletterModal />
      <MobileStickyAd />
    </div>
  )
}
