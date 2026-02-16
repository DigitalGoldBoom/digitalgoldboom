import {
  getAllArticles,
  getArticleBySlug,
  getArticlesByCategory,
  getArticlesByAuthor,
  getRelatedArticles,
  mockArticles,
  mockAuthors,
  mockCategories,
} from '../mockData';

describe('mockData utility layer', () => {
  // --- sanity check on raw data ---
  describe('raw mock data', () => {
    it('has at least 15 articles in mockArticles', () => {
      expect(mockArticles.length).toBeGreaterThanOrEqual(15);
    });

    it('has articles across all 5 categories', () => {
      const categorySlugs = new Set(mockArticles.map((a) => a.category.slug));
      expect(categorySlugs.has('gold')).toBe(true);
      expect(categorySlugs.has('crypto')).toBe(true);
      expect(categorySlugs.has('natgold')).toBe(true);
      expect(categorySlugs.has('research')).toBe(true);
      expect(categorySlugs.has('opinion')).toBe(true);
    });

    it('re-exports mockAuthors and mockCategories', () => {
      expect(mockAuthors.length).toBeGreaterThan(0);
      expect(mockCategories.length).toBeGreaterThan(0);
    });
  });

  // --- getAllArticles ---
  describe('getAllArticles()', () => {
    it('returns an array of articles', () => {
      const articles = getAllArticles();
      expect(Array.isArray(articles)).toBe(true);
      expect(articles.length).toBeGreaterThan(0);
    });

    it('returns only published articles', () => {
      const articles = getAllArticles();
      articles.forEach((a) => {
        expect(a.status).toBe('published');
      });
    });
  });

  // --- getArticleBySlug ---
  describe('getArticleBySlug()', () => {
    it('returns the correct article for a known slug', () => {
      const article = getArticleBySlug('natgold-standard-explained');
      expect(article).toBeDefined();
      expect(article?.slug).toBe('natgold-standard-explained');
      expect(article?.title).toBe('Understanding the NatGold Standard');
    });

    it('returns undefined for an unknown slug', () => {
      const article = getArticleBySlug('this-slug-does-not-exist');
      expect(article).toBeUndefined();
    });
  });

  // --- getArticlesByCategory ---
  describe('getArticlesByCategory()', () => {
    it('returns at most pageSize articles', () => {
      const { articles } = getArticlesByCategory('gold', 'latest', 1, 3);
      expect(articles.length).toBeLessThanOrEqual(3);
    });

    it('returns only articles in the given category', () => {
      const { articles } = getArticlesByCategory('gold', 'latest', 1, 12);
      articles.forEach((a) => {
        expect(a.category.slug).toBe('gold');
      });
    });

    it('returns total and totalPages', () => {
      const { total, totalPages } = getArticlesByCategory('gold', 'latest', 1, 12);
      expect(total).toBeGreaterThan(0);
      expect(totalPages).toBeGreaterThanOrEqual(1);
    });

    it('returns at most 12 articles on page 1 with pageSize=12', () => {
      const { articles } = getArticlesByCategory('gold', 'latest', 1, 12);
      expect(articles.length).toBeLessThanOrEqual(12);
    });

    it("sorts by 'latest' descending publishedAt", () => {
      const { articles } = getArticlesByCategory('gold', 'latest', 1, 12);
      for (let i = 1; i < articles.length; i++) {
        const prev = new Date(articles[i - 1].publishedAt ?? '').getTime();
        const curr = new Date(articles[i].publishedAt ?? '').getTime();
        expect(prev).toBeGreaterThanOrEqual(curr);
      }
    });

    it("sorts by 'most-read' descending readTime", () => {
      const { articles } = getArticlesByCategory('gold', 'most-read', 1, 12);
      for (let i = 1; i < articles.length; i++) {
        expect(articles[i - 1].readTime ?? 0).toBeGreaterThanOrEqual(
          articles[i].readTime ?? 0,
        );
      }
    });

    it('returns empty array for unknown category', () => {
      const { articles, total } = getArticlesByCategory('unknown-cat', 'latest', 1, 12);
      expect(articles).toEqual([]);
      expect(total).toBe(0);
    });

    it('paginates correctly — page 2 has different articles than page 1', () => {
      const page1 = getArticlesByCategory('crypto', 'latest', 1, 2);
      const page2 = getArticlesByCategory('crypto', 'latest', 2, 2);
      // Ensure page 2 exists and is distinct
      if (page2.articles.length > 0) {
        const page1Slugs = page1.articles.map((a) => a.slug);
        page2.articles.forEach((a) => {
          expect(page1Slugs).not.toContain(a.slug);
        });
      }
    });
  });

  // --- getArticlesByAuthor ---
  describe('getArticlesByAuthor()', () => {
    it('returns articles by the given author', () => {
      const { articles } = getArticlesByAuthor('andrew-fletcher', 1, 10);
      expect(articles.length).toBeGreaterThan(0);
      articles.forEach((a) => {
        expect(a.author.slug).toBe('andrew-fletcher');
      });
    });

    it('returns total and totalPages', () => {
      const { total, totalPages } = getArticlesByAuthor('sarah-chen', 1, 10);
      expect(total).toBeGreaterThan(0);
      expect(totalPages).toBeGreaterThanOrEqual(1);
    });

    it('returns empty result for unknown author', () => {
      const { articles, total } = getArticlesByAuthor('ghost-writer', 1, 10);
      expect(articles).toEqual([]);
      expect(total).toBe(0);
    });

    it('paginates correctly', () => {
      const { total, totalPages } = getArticlesByAuthor('marcus-goldman', 1, 2);
      if (total > 2) {
        expect(totalPages).toBeGreaterThan(1);
      }
    });
  });

  // --- getRelatedArticles ---
  describe('getRelatedArticles()', () => {
    it('returns at most `count` articles', () => {
      const related = getRelatedArticles('natgold-standard-explained', 'natgold', 3);
      expect(related.length).toBeLessThanOrEqual(3);
    });

    it('excludes the source article', () => {
      const related = getRelatedArticles('natgold-standard-explained', 'natgold', 10);
      const slugs = related.map((a) => a.slug);
      expect(slugs).not.toContain('natgold-standard-explained');
    });

    it('returns articles from the same category', () => {
      const related = getRelatedArticles('traditional-mining-obsolete', 'gold', 5);
      related.forEach((a) => {
        expect(a.category.slug).toBe('gold');
      });
    });

    it('returns empty array when no related articles exist', () => {
      const related = getRelatedArticles('some-slug', 'nonexistent-cat', 3);
      expect(related).toEqual([]);
    });

    it('returns at most count=0 articles when count is 0', () => {
      const related = getRelatedArticles('traditional-mining-obsolete', 'gold', 0);
      expect(related).toEqual([]);
    });
  });
});
