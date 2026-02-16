import Link from 'next/link';
import { mockArticles } from '@/data/mockArticles';

interface TrendingArticle {
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  readTime: number;
}

// Mock trending articles (simulate trending flag for MVP)
const getTrendingArticles = (): TrendingArticle[] => {
  // For MVP, we'll simulate trending by selecting specific articles
  // that would likely be popular based on topic relevance
  const trendingIds = ['article-001', 'article-003', 'article-005', 'article-008', 'article-011'];
  
  return mockArticles
    .filter(article => trendingIds.includes(article._id) && article.publishedAt && article.readTime)
    .map(article => ({
      title: article.title,
      slug: article.slug,
      category: article.category.name,
      publishedAt: article.publishedAt!,
      readTime: article.readTime!,
    }))
    .slice(0, 5);
};

export default function TrendingSection() {
  const trendingArticles = getTrendingArticles();

  return (
    <aside className="lg:sticky lg:top-8">
      <div className="bg-[var(--bg-elevated)] rounded-lg border border-[var(--border-subtle)] p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 bg-[var(--gold-primary)] rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Trending Now
          </h3>
        </div>

        {/* Trending Articles List */}
        <div className="space-y-4">
          {trendingArticles.map((article, index) => (
            <Link
              key={article.slug}
              href={`/news/${article.slug}`}
              className="block group"
            >
              <article className="flex gap-4 p-3 rounded-lg transition-colors hover:bg-[var(--bg-secondary)]/50">
                {/* Rank Number */}
                <div className="flex-shrink-0">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full 
                    bg-[var(--gold-primary)]/10 text-[var(--gold-primary)] text-sm font-bold">
                    {index + 1}
                  </span>
                </div>

                {/* Article Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-[var(--text-primary)] line-clamp-2 
                    group-hover:text-[var(--gold-primary)] transition-colors">
                    {article.title}
                  </h4>
                  
                  <div className="flex items-center gap-2 mt-2 text-xs text-[var(--text-tertiary)]">
                    <span>{article.category}</span>
                    <span>·</span>
                    <span>{article.readTime} min</span>
                    <span>·</span>
                    <time dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                </div>

                {/* Trending Icon */}
                <div className="flex-shrink-0 self-center">
                  <svg 
                    className="w-4 h-4 text-[var(--gold-primary)] opacity-60 group-hover:opacity-100 transition-opacity" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
                  </svg>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Trending Link */}
        <div className="mt-6 pt-4 border-t border-[var(--border-subtle)]">
          <Link 
            href="/trending" 
            className="text-[var(--gold-primary)] hover:text-[var(--gold-light)] text-sm font-medium 
              transition-colors flex items-center gap-1 group"
          >
            See all trending
            <svg 
              className="w-3 h-3 transition-transform group-hover:translate-x-0.5" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </aside>
  );
}