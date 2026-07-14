/**
 * plates.ts — ONE place to wire the Director's ultra-real Higgsfield plates
 * into the page. Author picks a winner from public/s-film/options/, the path
 * goes here, the section renders it (code composites remain the fallback for
 * any plate still undefined). Winners get upscaled + optimized at Stage 6.
 */
export const PLATES: {
  crossSection?: string;
  nightMountain?: string;
  dawnMountain?: string;
  pit?: string;
  crowd?: string;
  gates?: string;
} = {
  // e.g. crossSection: "/s-film/cross-section.jpg",
};
