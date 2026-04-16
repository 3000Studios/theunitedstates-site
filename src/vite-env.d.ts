/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_SLOT_TOP_BANNER?: string
  readonly VITE_ADSENSE_SLOT_STICKY_HEADER?: string
  readonly VITE_ADSENSE_SLOT_IN_CONTENT?: string
  readonly VITE_ADSENSE_SLOT_SIDEBAR?: string
  readonly VITE_ADSENSE_SLOT_MOBILE_STICKY?: string
  readonly VITE_ADSENSE_SLOT_BETWEEN?: string
  readonly VITE_GA_MEASUREMENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
