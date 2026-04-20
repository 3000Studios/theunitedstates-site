import type { USStateInfo } from '@/lib/types'
import { US_STATES_GENERATED } from '@/data/usStates.generated'

export const US_STATES: USStateInfo[] = US_STATES_GENERATED.map((s) => ({
  id: s.id,
  slug: s.slug,
  name: s.name,
  abbreviation: s.abbreviation,
  capital: s.capital,
  wikidataQid: s.wikidataQid,
  commonsCategory: s.commonsCategory,
  flagUrl: s.flag?.url ?? null,
  flagFile: s.flag?.file ?? null,
  sealUrl: s.seal?.url ?? null,
  sealFile: s.seal?.file ?? null,
  heroVideoUrl: s.heroVideo?.url ?? null,
  heroVideoFile: s.heroVideo?.file ?? null,
  heroPhotoUrl: s.heroPhoto?.url ?? null,
  heroPhotoFile: s.heroPhoto?.file ?? null,
}))

export function findStateBySlug(slug: string): USStateInfo | undefined {
  const s = slug.trim().toLowerCase()
  return US_STATES.find((st) => st.slug === s || st.id === s)
}

