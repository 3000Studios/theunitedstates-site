type AnalyticsPayload = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    __TUS_TRACKED_SCROLL?: boolean
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

let analyticsInitialized = false

export function initAnalytics(): void {
  if (typeof window === 'undefined') return
  if (analyticsInitialized) return
  analyticsInitialized = true
  if (GA_ID) {
    const s = document.createElement('script')
    s.async = true
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    document.head.appendChild(s)
    window.dataLayer = window.dataLayer ?? []
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', GA_ID, { send_page_view: true })
  }
}

export function trackEvent(name: string, params?: AnalyticsPayload): void {
  if (typeof window === 'undefined') return
  if (window.gtag && GA_ID) {
    window.gtag('event', name, params)
  }
  if (import.meta.env.DEV) {
    console.debug('[analytics]', name, params)
  }
}

export function trackPageView(path: string): void {
  trackEvent('page_view', { page_path: path })
}

export function attachScrollDepthTracking(): void {
  if (typeof window === 'undefined') return
  if (window.__TUS_TRACKED_SCROLL) return
  window.__TUS_TRACKED_SCROLL = true
  const marks = new Set<number>()
  const onScroll = () => {
    const doc = document.documentElement
    const total = doc.scrollHeight - window.innerHeight
    if (total <= 0) return
    const pct = Math.round((window.scrollY / total) * 100)
    ;[25, 50, 75, 100].forEach((m) => {
      if (pct >= m && !marks.has(m)) {
        marks.add(m)
        trackEvent('scroll_depth', { percent: m })
      }
    })
  }
  window.addEventListener('scroll', onScroll, { passive: true })
}
