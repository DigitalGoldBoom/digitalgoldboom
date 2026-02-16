import { render, screen } from '@testing-library/react';
import TrendingSection from '../TrendingSection';

// Mock the data imports
jest.mock('@/data/mockArticles', () => ({
  mockArticles: [
    {
      _id: 'article-001',
      title: 'Why Traditional Mining Is Becoming Obsolete',
      slug: 'traditional-mining-obsolete',
      publishedAt: '2026-02-14T05:00:00Z',
      readTime: 6,
      category: { name: 'Gold', slug: 'gold' },
    },
    {
      _id: 'article-003',
      title: 'NatGold Standard Explained',
      slug: 'natgold-standard-explained',
      publishedAt: '2026-02-13T05:00:00Z',
      readTime: 8,
      category: { name: 'NatGold', slug: 'natgold' },
    },
    {
      _id: 'article-005',
      title: 'Bitcoin and Gold Correlation Analysis',
      slug: 'bitcoin-gold-correlation',
      publishedAt: '2026-02-12T05:00:00Z',
      readTime: 5,
      category: { name: 'Crypto', slug: 'crypto' },
    },
    {
      _id: 'article-008',
      title: 'Central Bank Digital Currencies Impact',
      slug: 'cbdc-impact',
      publishedAt: '2026-02-11T05:00:00Z',
      readTime: 7,
      category: { name: 'Research', slug: 'research' },
    },
    {
      _id: 'article-011',
      title: 'ESG Mining Investment Trends',
      slug: 'esg-mining-trends',
      publishedAt: '2026-02-10T05:00:00Z',
      readTime: 9,
      category: { name: 'Opinion', slug: 'opinion' },
    },
    {
      _id: 'article-999',
      title: 'Non-trending Article',
      slug: 'non-trending',
      publishedAt: '2026-02-09T05:00:00Z',
      readTime: 4,
      category: { name: 'Gold', slug: 'gold' },
    },
  ],
}));

describe('TrendingSection', () => {
  test('renders trending section header', () => {
    render(<TrendingSection />);
    
    expect(screen.getByText('Trending Now')).toBeInTheDocument();
    expect(screen.getByRole('generic', { name: /pulse indicator/i })).toBeInTheDocument();
  });

  test('renders exactly 5 trending articles', () => {
    render(<TrendingSection />);
    
    // Check that we have exactly 5 article links
    const articleLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('href')?.startsWith('/news/')
    );
    expect(articleLinks).toHaveLength(5);
  });

  test('displays trending articles in correct order with rank numbers', () => {
    render(<TrendingSection />);
    
    // Check rank numbers 1-5 are present
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('displays article metadata (category, read time, date)', () => {
    render(<TrendingSection />);
    
    // Should display categories for trending articles
    expect(screen.getByText('Gold')).toBeInTheDocument();
    expect(screen.getByText('NatGold')).toBeInTheDocument();
    
    // Should display read times
    expect(screen.getByText('6 min')).toBeInTheDocument();
    expect(screen.getByText('8 min')).toBeInTheDocument();
    
    // Should display formatted dates
    expect(screen.getByText('Feb 14')).toBeInTheDocument();
    expect(screen.getByText('Feb 13')).toBeInTheDocument();
  });

  test('renders trending articles with proper links', () => {
    render(<TrendingSection />);
    
    const miningLink = screen.getByRole('link', { name: /traditional mining/i });
    const natgoldLink = screen.getByRole('link', { name: /natgold standard/i });
    
    expect(miningLink).toHaveAttribute('href', '/news/traditional-mining-obsolete');
    expect(natgoldLink).toHaveAttribute('href', '/news/natgold-standard-explained');
  });

  test('includes see all trending link', () => {
    render(<TrendingSection />);
    
    const seeAllLink = screen.getByRole('link', { name: /see all trending/i });
    expect(seeAllLink).toBeInTheDocument();
    expect(seeAllLink).toHaveAttribute('href', '/trending');
  });

  test('applies proper styling classes for trending indicators', () => {
    render(<TrendingSection />);
    
    // Check for trending icon (upward trend)
    const trendingIcons = screen.container.querySelectorAll('svg[viewBox="0 0 24 24"]');
    expect(trendingIcons.length).toBeGreaterThan(0);
    
    // Check for rank number styling
    const rankNumbers = screen.container.querySelectorAll('[class*="bg-[var(--gold-primary)]"]');
    expect(rankNumbers.length).toBeGreaterThanOrEqual(5);
  });

  test('shows only articles from trending IDs list', () => {
    render(<TrendingSection />);
    
    // Should show trending articles
    expect(screen.getByText('Why Traditional Mining Is Becoming Obsolete')).toBeInTheDocument();
    expect(screen.getByText('NatGold Standard Explained')).toBeInTheDocument();
    
    // Should NOT show non-trending article
    expect(screen.queryByText('Non-trending Article')).not.toBeInTheDocument();
  });
});