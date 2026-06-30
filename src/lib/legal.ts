// Single source of truth for the editable facts in the legal pages. Update here once and every
// legal page picks it up. Anything marked TODO must be CONFIRMED BY ANDREW before the pages go
// public — Golden Rule #1: we do not present a guessed legal fact as confirmed.
export const LEGAL = {
  siteName: "Digital Gold Boom",
  siteUrl: "https://digitalgoldboom.com",
  // Confirmed by Andrew 2026-06-30. Swap to a registered entity name later if/when one is formed.
  operator: "Andrew Fletcher",
  contactEmail: "team@digitalgoldboom.com",
  jurisdiction: "Panama",
  lastUpdated: "June 30, 2026",
} as const;
