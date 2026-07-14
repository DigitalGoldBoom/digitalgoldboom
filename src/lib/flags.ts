/**
 * Site feature flags — one place to switch a page on or off in public.
 *
 * CHAPTERS_LIVE: the /chapters page is BUILT but not announced. While this is false the page is
 * reachable by direct link (so it can be reviewed on the real site) but it is hidden from the
 * navbar, kept out of the sitemap, and served noindex/nofollow — so no crawler and no visitor
 * browsing the site can stumble onto it. Flip to true when the copy and images are final, and at
 * the same time: (1) remove the `robots: { index: false }` override in
 * src/app/chapters/page.tsx, and (2) add /chapters to src/app/sitemap.ts.
 */
export const CHAPTERS_LIVE = false;
