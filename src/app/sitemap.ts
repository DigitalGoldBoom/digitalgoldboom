import { MetadataRoute } from 'next';

const BASE_URL = 'https://digitalgoldboom.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/live`,
      lastModified: currentDate,
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    },
    {
      // The product page. Second only to the home page: it is the one page on the site that sells
      // something. It was noindex and absent from here, which told anyone who checked that the
      // store was not really open.
      url: `${BASE_URL}/buy`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      // /free, NOT /book. /book is a redirect to this page, and a sitemap that advertises a
      // redirect spends the crawler's budget on a hop — while the page it lands on, the site's
      // main email-capture page, was not in the sitemap at all.
      url: `${BASE_URL}/free`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/newsletter`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/partners`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/mining-industry`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // TODO: Add dynamic article URLs when CMS is integrated

  return [
    ...staticPages,
  ];
}
