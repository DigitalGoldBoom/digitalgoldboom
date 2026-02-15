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
      url: `${BASE_URL}/prices`,
      lastModified: currentDate,
      changeFrequency: 'hourly' as const, // Prices update frequently
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/book`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/newsletter`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // TODO: Add dynamic article URLs when CMS is integrated
  // const articles = await getArticles();
  // const articlePages = articles.map((article) => ({
  //   url: `${BASE_URL}/news/${article.slug}`,
  //   lastModified: article.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }));

  return [
    ...staticPages,
    // ...articlePages,
  ];
}
