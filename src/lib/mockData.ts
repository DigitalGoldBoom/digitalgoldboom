/**
 * Centralised mock data access layer for Phase 2 pages.
 * All query functions are typed with strict TypeScript.
 */

import { Article, Author, Category } from '@/types';

// Re-export raw data
export { mockArticles, mockTags, getFeaturedArticles, getRecentArticles } from '@/data/mockArticles';
export { mockAuthors, getAuthorBySlug, getAuthorById } from '@/data/mockAuthors';
export { mockCategories, getCategoryBySlug, getCategoryById } from '@/data/mockCategories';

// Import for use in this module
import { mockArticles } from '@/data/mockArticles';
import { mockAuthors } from '@/data/mockAuthors';
import { mockCategories } from '@/data/mockCategories';

export type { Author, Category };

// --- Paginated result shape ---

export interface PaginatedArticles {
  articles: Article[];
  total: number;
  totalPages: number;
}

// --- Query functions ---

/**
 * Return every published article (no filtering/sorting).
 */
export function getAllArticles(): Article[] {
  return mockArticles.filter((a) => a.status === 'published');
}

/**
 * Return a single article by slug, or undefined if not found.
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return mockArticles.find((a) => a.slug === slug);
}

/**
 * Return a paginated list of articles for a given category.
 *
 * @param categorySlug  - the category slug to filter by
 * @param sort          - 'latest' (descending publishedAt) | 'most-read' (descending readTime)
 * @param page          - 1-based page index
 * @param pageSize      - number of articles per page
 */
export function getArticlesByCategory(
  categorySlug: string,
  sort: 'latest' | 'most-read',
  page: number,
  pageSize: number,
): PaginatedArticles {
  const filtered = mockArticles.filter(
    (a) => a.category.slug === categorySlug && a.status === 'published',
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'most-read') {
      return (b.readTime ?? 0) - (a.readTime ?? 0);
    }
    // 'latest' — descending publishedAt
    return (
      new Date(b.publishedAt ?? '').getTime() -
      new Date(a.publishedAt ?? '').getTime()
    );
  });

  const total = sorted.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const articles = sorted.slice(start, start + pageSize);

  return { articles, total, totalPages };
}

/**
 * Return a paginated list of articles written by the given author.
 *
 * @param authorSlug - the author slug to filter by
 * @param page       - 1-based page index
 * @param pageSize   - number of articles per page
 */
export function getArticlesByAuthor(
  authorSlug: string,
  page: number,
  pageSize: number,
): PaginatedArticles {
  const filtered = mockArticles
    .filter((a) => a.author.slug === authorSlug && a.status === 'published')
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? '').getTime() -
        new Date(a.publishedAt ?? '').getTime(),
    );

  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const articles = filtered.slice(start, start + pageSize);

  return { articles, total, totalPages };
}

/**
 * Return up to `count` articles from the same category, excluding the source article.
 * Sorted by most-recent first.
 *
 * @param articleSlug  - slug of the article to exclude
 * @param categorySlug - category to pull related articles from
 * @param count        - maximum number of results
 */
export function getRelatedArticles(
  articleSlug: string,
  categorySlug: string,
  count: number,
): Article[] {
  return mockArticles
    .filter(
      (a) =>
        a.slug !== articleSlug &&
        a.category.slug === categorySlug &&
        a.status === 'published',
    )
    .sort(
      (a, b) =>
        new Date(b.publishedAt ?? '').getTime() -
        new Date(a.publishedAt ?? '').getTime(),
    )
    .slice(0, count);
}
