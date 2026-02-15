import { Metadata } from 'next';
import ArticleCard from '@/components/ArticleCard';
import BookCTA from '@/components/BookCTA';
import NewsletterForm from '@/components/NewsletterForm';
import PriceWidget from '@/components/PriceWidget';

export const metadata: Metadata = {
  title: 'Gold News & Tokenization Updates Today | Digital Gold Boom',
  description: 'Daily coverage of gold markets, tokenized assets, and the mining industry. Analysis you can use. Updated every weekday.',
  keywords: ['gold news', 'tokenization news', 'PAXG news', 'gold market analysis', 'NatGold news', 'digital gold news'],
  alternates: {
    canonical: 'https://digitalgoldboom.com/news',
  },
  openGraph: {
    title: 'Gold News & Tokenization Updates Today',
    description: 'Daily coverage of gold markets, tokenized assets, and the mining industry.',
    url: 'https://digitalgoldboom.com/news',
    type: 'website',
  },
};

// Mock articles data - TODO: Replace with Sanity CMS integration
// Structure ready for Sanity: each article has slug, category, title, excerpt, date, readTime
const articles = [
  {
    category: 'Digital Gold',
    title: 'PAXG Trading Volume Hits All-Time High as Gold Breaks $2,900',
    excerpt: 'Paxos Gold saw record 24-hour volume yesterday as institutional interest in tokenized gold surges. Here\'s what\'s driving the move.',
    date: 'Feb 14, 2026',
    slug: 'paxg-volume-record-2026',
    readTime: '4 min read',
    featured: true,
  },
  {
    category: 'Digital Gold',
    title: 'Why Traditional Mining Is Becoming Obsolete',
    excerpt: 'The S.P.I.R.A.L. of extraction costs is crushing traditional miners. Here\'s what the industry insiders know but won\'t tell you.',
    date: 'Feb 14, 2026',
    slug: 'traditional-mining-obsolete',
    readTime: '6 min read',
    featured: true,
  },
  {
    category: 'Tokenization',
    title: 'Understanding the NatGold Standard',
    excerpt: 'How in-ground gold reserves are being tokenized without extraction, creating a new paradigm for gold ownership.',
    date: 'Feb 13, 2026',
    slug: 'natgold-standard-explained',
    readTime: '8 min read',
  },
  {
    category: 'Market Analysis',
    title: 'Gold Hits $2,850: What It Means for Digital Assets',
    excerpt: 'Record prices are accelerating the shift to tokenized alternatives. Analysis of the impact on PAXG, XAUT, and emerging NatGold.',
    date: 'Feb 12, 2026',
    slug: 'gold-2850-digital-assets',
    readTime: '5 min read',
  },
  {
    category: 'Mining',
    title: 'The AISC Crisis: Mining Costs Now Average $1,631/oz',
    excerpt: 'All-In Sustaining Costs continue to climb, squeezing margins and forcing consolidation across the industry.',
    date: 'Feb 11, 2026',
    slug: 'aisc-crisis-mining-costs',
    readTime: '7 min read',
  },
  {
    category: 'Investment',
    title: 'PAXG vs XAUT: Which Gold Token Should You Own?',
    excerpt: 'A detailed comparison of the two largest gold-backed tokens, their custody models, and regulatory considerations.',
    date: 'Feb 10, 2026',
    slug: 'paxg-vs-xaut-comparison',
    readTime: '9 min read',
  },
  {
    category: 'Digital Gold',
    title: 'The Environmental Case for Tokenized Gold',
    excerpt: 'Why ESG-conscious investors are turning to digital gold alternatives with zero extraction footprint.',
    date: 'Feb 9, 2026',
    slug: 'environmental-case-tokenized-gold',
    readTime: '5 min read',
  },
  {
    category: 'Market Analysis',
    title: 'BIV Reaches Record $1,216: What This Means',
    excerpt: 'The Baseline Intrinsic Value metric shows the highest profit margins for unmined gold in history.',
    date: 'Feb 8, 2026',
    slug: 'biv-record-1216',
    readTime: '4 min read',
  },
  {
    category: 'Mining',
    title: 'Top Gold Miners Report Q4 Earnings Miss',
    excerpt: 'Despite record gold prices, major miners struggle with costs and delays. The industry signals are concerning.',
    date: 'Feb 7, 2026',
    slug: 'gold-miners-q4-earnings',
    readTime: '6 min read',
  },
];

const categories = ['All', 'Digital Gold', 'Tokenization', 'Market Analysis', 'Mining', 'Investment'];

export default function NewsPage() {
  const featuredArticles = articles.filter(a => a.featured);
  const regularArticles = articles.filter(a => !a.featured);

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3">
            Gold &amp; Tokenization News
          </h1>
          <p className="text-[var(--text-secondary)] max-w-2xl">
            Daily coverage of gold markets, tokenized assets, and the mining industry.
            Analysis you can use. Updated every weekday.
          </p>
        </header>

        {/* Category Filter */}
        <nav className="flex flex-wrap gap-2 mb-10" aria-label="Article categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                cat === 'All' 
                  ? 'bg-[var(--gold-glow)] text-[var(--gold-primary)] border border-[var(--gold-primary)]/30' 
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]'
              }`}
              aria-pressed={cat === 'All'}
            >
              {cat}
            </button>
          ))}
        </nav>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="mb-12" aria-labelledby="featured-heading">
            <h2 id="featured-heading" className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className="text-[var(--gold-primary)]" aria-hidden="true">⭐</span>
              Featured
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>
          </section>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Articles */}
          <section className="lg:col-span-2" aria-labelledby="latest-heading">
            <h2 id="latest-heading" className="text-xl font-bold text-[var(--text-primary)] mb-6">
              Latest Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {regularArticles.map((article) => (
                <ArticleCard key={article.slug} {...article} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-10">
              <button className="btn btn-secondary">
                Load More Articles
              </button>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6" aria-label="Sidebar">
            {/* Newsletter Signup */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Get the Daily Brief
              </h3>
              <p className="text-[var(--text-secondary)] text-sm mb-4">
                Gold market analysis in your inbox. Every weekday morning.
              </p>
              <NewsletterForm variant="sidebar" />
            </div>

            {/* Live Prices Mini Widget */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                Live Prices
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">Gold:</span>
                  <span className="text-[var(--text-primary)] font-medium price-value">$2,847 <span className="text-[var(--success)]">▲</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">PAXG:</span>
                  <span className="text-[var(--text-primary)] font-medium price-value">$2,851 <span className="text-[var(--success)]">▲</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[var(--text-secondary)]">BIV:</span>
                  <span className="gold-text font-medium price-value">$1,216 <span className="text-[var(--text-tertiary)]">—</span></span>
                </div>
              </div>
              <a 
                href="/prices" 
                className="block text-[var(--gold-primary)] text-sm font-medium mt-4 hover:text-[var(--gold-light)] transition-colors"
              >
                Full Dashboard →
              </a>
            </div>

            {/* Book CTA */}
            <BookCTA variant="compact" />

            {/* Topics */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                Topics
              </h3>
              <div className="flex flex-wrap gap-2" role="list" aria-label="Popular topics">
                {['NatGold', 'PAXG', 'XAUT', 'Mining', 'ESG', 'Tokenization', 'BIV', 'Gold Prices', 'S.P.I.R.A.L.'].map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-[var(--bg-tertiary)] text-[var(--text-secondary)] rounded-full text-xs hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)] cursor-pointer transition-colors"
                    role="listitem"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
