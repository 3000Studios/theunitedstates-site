/**
 * Serving-layer status fix (AdSense desk-fix, 2026-11-04).
 *
 * This SPA serves the same index.html shell for every path via the
 * _redirects catch-all, so unknown paths used to return HTTP 200
 * (soft-404). This middleware passes every response through untouched
 * except one case: a GET/HEAD HTML response for an extensionless path
 * that is not a real app route gets its status corrected to 404 (the
 * SPA still renders its own NotFound page client-side).
 *
 * Route table mirrors src/App.tsx. Parameterized routes are matched by
 * prefix (/states/:slug, /story/:slug, /kids/games/:id) because their
 * values are data-driven. Fail-open: any error returns the downstream
 * response unchanged.
 */

const KNOWN_ROUTES = new Set([
  '/',
  '/states',
  '/updates',
  '/kids',
  '/constitution',
  '/guides',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/search',
  '/explore',
  '/itinerary',
  '/passport',
  // Client-side aliases / back-compat redirects (App.tsx Navigate routes)
  '/privacy-policy',
  '/home',
  '/blog',
  '/news',
  '/trending',
  '/money',
  '/tech',
  '/store',
  '/market',
  '/login',
  '/register',
  '/profile',
]);

const KNOWN_PREFIXES = ['/states/', '/story/', '/kids/games/'];

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname || '/';
}

function isKnownRoute(pathname: string): boolean {
  const path = normalizePath(pathname);
  if (KNOWN_ROUTES.has(path)) return true;
  return KNOWN_PREFIXES.some((prefix) => path.startsWith(prefix));
}

function isFilePath(pathname: string): boolean {
  const last = pathname.split('/').pop() || '';
  return last.includes('.');
}

interface PagesContext {
  request: Request;
  next: () => Promise<Response>;
}

export const onRequest = async (context: PagesContext): Promise<Response> => {
  const response = await context.next();
  try {
    const { request } = context;
    if (request.method !== 'GET' && request.method !== 'HEAD') return response;
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) return response;
    // Published static legal archive (e.g. the 2026-10-26 cease-and-desist
    // notice at /legal/notices/archive/2026/cease-and-desist/) is a real
    // file, not an SPA route: serve it untouched, never 404 it.
    if (url.pathname.startsWith('/legal/')) return response;
    if (isFilePath(url.pathname)) return response;
    if (isKnownRoute(url.pathname)) return response;
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) return response;
    const headers = new Headers(response.headers);
    headers.set('x-robots-tag', 'noindex, nofollow');
    headers.delete('content-length');
    return new Response(response.body, { status: 404, statusText: 'Not Found', headers });
  } catch {
    return response;
  }
};
