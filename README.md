# The United States Site (`theunitedstates.site`)

Production-oriented React + Vite + Tailwind site for Cloudflare Pages: news-style UX, monetization surfaces, SEO scaffolding, and a scalable article layer (seed content + hourly generator simulation).

## Quick start

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Environment variables

Copy `.env.example` to `.env` locally. For Cloudflare Pages, add the same keys under **Settings → Environment variables**.

- **AdSense slots (`VITE_ADSENSE_SLOT_*`)**: In Google AdSense, create display ad units and paste each **slot ID** into the matching variable. The publisher ID is already wired in `index.html` and `src/config/ads.ts`. If slots are empty, ad `<ins>` tags are omitted to avoid runtime errors.
- **`VITE_GA_MEASUREMENT_ID`**: Optional GA4 ID for `src/lib/analytics.ts`.

## AdSense & `ads.txt`

- `public/ads.txt` is copied to the site root (`/ads.txt`) on build.
- The AdSense loader script is included in `index.html` exactly as required.

## Deploying to Cloudflare Pages with Wrangler

Prerequisites:

- Cloudflare account with Pages enabled
- `wrangler` authenticated: `npx wrangler login`

### Option A — Git-connected builds (recommended)

1. Push this repository to GitHub.
2. In Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the repo, set:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Add environment variables from `.env.example` as needed.
5. Attach custom domain `theunitedstates.site` in the Pages project → **Custom domains** (DNS proxied through Cloudflare).

### Option B — Direct upload with Wrangler

```bash
npm run deploy
```

This runs `wrangler pages deploy dist --project-name=theunitedstates-site`. Create the project on first deploy if prompted.

## Content system

- **Seed articles**: `src/data/seedArticles.ts` (15+ full articles).
- **Hourly generator simulation**: `src/lib/contentEngine.ts` + `src/data/articleTemplates.ts` append new articles on a timer (2 minutes in dev, 1 hour in production builds). Persisted in `localStorage` under `tus_generated_articles_v1`.
- **To add real AI later**: replace `generateFromTemplate()` internals with your model call while keeping the `Article` type and storage hooks.

## SEO

- Per-route tags via `react-helmet-async` (`src/components/seo/Seo.tsx`).
- `public/robots.txt`, `public/sitemap.xml`, and SPA fallback via `public/_redirects`.

## Stack

- Vite, React 19, TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Framer Motion, GSAP
- Three.js via `@react-three/fiber` + `@react-three/drei`

## Project structure

```
src/
  pages/        Route screens
  components/   UI, layout, ads, 3D, SEO
  context/      Article provider
  data/         Articles, states, store, navigation
  lib/          Analytics, auth, search, content engine
public/         ads.txt, robots.txt, sitemap.xml, _redirects
wrangler.toml   Cloudflare Pages output directory
```

## Notes

- Affiliate links in `src/data/storeProducts.ts` use Amazon search URLs with a placeholder Associates tag (`theunitedsit-20`) — replace with your own tracking ID.
- Authentication is **local demo only** (`src/lib/auth.ts`); swap for a real provider when ready.
