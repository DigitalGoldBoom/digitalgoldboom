import Link from 'next/link';

interface ArticleCardProps {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  readTime?: string;
  featured?: boolean;
  imageUrl?: string;
}

const categoryIcons: Record<string, string> = {
  'Digital Gold': '🪙',
  'Tokenization': '🔗',
  'Market Analysis': '📊',
  'Mining': '⛏️',
  'Regulation': '⚖️',
  'Investment': '💰',
};

export default function ArticleCard({ 
  category, 
  title, 
  excerpt, 
  date, 
  slug,
  readTime = '5 min read',
  featured = false,
  imageUrl,
}: ArticleCardProps) {
  const icon = categoryIcons[category] || '📰';

  return (
    <article
      className={`card overflow-hidden card-hover group ${
        featured ? 'border-[var(--gold-muted)]/30' : ''
      }`}
    >
      {/* Image placeholder */}
      <div 
        className={`aspect-video bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-elevated)] flex items-center justify-center relative overflow-hidden ${
          featured ? 'gold-glow-sm' : ''
        }`}
      >
        <span className="text-5xl opacity-30 group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
          {icon}
        </span>
        {featured && (
          <span className="absolute top-3 right-3 bg-[var(--gold-primary)] text-[var(--text-inverse)] text-xs font-semibold px-2 py-1 rounded">
            Featured
          </span>
        )}
      </div>

      <div className="p-5">
        {/* Category & Read time */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-overline">
            {category}
          </span>
          <span className="text-[var(--text-disabled)]">·</span>
          <span className="text-[var(--text-tertiary)] text-xs">{readTime}</span>
        </div>

        {/* Title */}
        <Link href={`/news/${slug}`}>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--gold-primary)] transition-colors">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p className="text-[var(--text-secondary)] text-sm mb-4 line-clamp-2">
          {excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <time className="text-[var(--text-tertiary)] text-xs" dateTime={date}>
            {date}
          </time>
          <Link 
            href={`/news/${slug}`}
            className="text-[var(--gold-primary)] text-sm font-medium hover:text-[var(--gold-light)] transition-colors"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
