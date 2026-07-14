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

/**
 * BOOK_ON_SALE — is there a real checkout to send a buyer to?
 *
 * It is not a hand-set switch: it is simply whether a checkout URL exists. Today there is none —
 * the payment processor has not approved the store yet, and until it does no checkout link can
 * exist for anyone. That is a chicken-and-egg every processor knows about, so the site does not
 * pretend otherwise: there is NO fake checkout, no imitation payment form, nothing that collects a
 * card. The product page is real, the price is real, the refund policy is real, and the button
 * leads to the truthful next step (join the list; the book completes after the launch).
 *
 * The day NEXT_PUBLIC_LS_CHECKOUT_URL is set in Vercel, this flips to true on its own and every
 * buy button on the site becomes a live checkout. No code change, no second deploy to remember.
 */
export const BOOK_ON_SALE = Boolean(process.env.NEXT_PUBLIC_LS_CHECKOUT_URL);
