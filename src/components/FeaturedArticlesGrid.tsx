import Link from 'next/link';
import ArticleCard from './ArticleCard';
import { getRecentArticles } from '@/data/mockArticles';
import { mockCategories } from '@/data/mockCategories';

interface FeaturedArticlesGridProps {
  limit?: number;
}

// Transform Article to ArticleCard props
const transformArticleToCardProps = (article: any) => ({
  category: article.category.name,
  categoryColor: article.category.color,
  title: article.title,
  excerpt: article.excerpt,
  date: new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }),
  slug: article.slug,
  readTime: `${article.readTime} min read`,
  featured: article.featured,
  imageUrl: article.featuredImage?.url,
  authorName: article.author?.name,
});

export default function FeaturedArticlesGrid({ limit = 8 }: FeaturedArticlesGridProps) {
  const articles = getRecentArticles(limit);

  return (
    <div>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">
            Latest Insights
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            Stay ahead with the latest gold and crypto market analysis
          </p>
        </div>
        
        {/* Category Quick Links */}
        <div className="flex flex-wrap gap-2">
          {mockCategories.slice(0, 5).map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="px-3 py-1 rounded-full text-xs font-medium border transition-colors
                border-[var(--border-subtle)] text-[var(--text-secondary)]
                hover:border-[var(--gold-primary)] hover:text-[var(--gold-primary)]"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard 
            key={article.slug} 
            {...transformArticleToCardProps(article)}
          />
        ))}
      </div>

      {/* View All Link */}
      <div className="text-center mt-8">
        <Link 
          href="/news" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors
            bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)]
            hover:border-[var(--gold-primary)] hover:text-[var(--gold-primary)] group"
        >
          View All Articles
          <svg 
            className="w-4 h-4 transition-transform group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}