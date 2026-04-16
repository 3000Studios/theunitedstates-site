/**
 * AdSense publisher is loaded globally in index.html.
 * Create display units in your AdSense dashboard and paste slot IDs via
 * VITE_ADSENSE_SLOT_* in `.env` or Cloudflare Pages environment variables.
 */
export const ADSENSE_CLIENT = 'ca-pub-5800977493749262'

const ENV_MAP = {
  topBanner: 'VITE_ADSENSE_SLOT_TOP_BANNER',
  stickyHeader: 'VITE_ADSENSE_SLOT_STICKY_HEADER',
  inContent: 'VITE_ADSENSE_SLOT_IN_CONTENT',
  sidebar: 'VITE_ADSENSE_SLOT_SIDEBAR',
  mobileSticky: 'VITE_ADSENSE_SLOT_MOBILE_STICKY',
  betweenSections: 'VITE_ADSENSE_SLOT_BETWEEN',
} as const

export type AdSlotKey = keyof typeof ENV_MAP

function readSlot(key: AdSlotKey): string {
  const name = ENV_MAP[key]
  const v = import.meta.env[name] as string | undefined
  return v && v.trim().length > 0 ? v.trim() : ''
}

export const AD_SLOTS = {
  topBanner: readSlot('topBanner'),
  stickyHeader: readSlot('stickyHeader'),
  inContent: readSlot('inContent'),
  sidebar: readSlot('sidebar'),
  mobileSticky: readSlot('mobileSticky'),
  betweenSections: readSlot('betweenSections'),
} as const
