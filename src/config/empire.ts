export const EMPIRE_ORIGINS = {
  citadel: import.meta.env.VITE_CITADEL_ORIGIN ?? "https://citadel-core.pages.dev",
  referrals: import.meta.env.VITE_REFERRALS_ORIGIN ?? "https://referrals.live",
  usa: import.meta.env.VITE_USA_ORIGIN ?? "https://theunitedstates.site",
  media: import.meta.env.VITE_MEDIA_ORIGIN ?? "https://tmack48.com",
} as const;
