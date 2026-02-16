import { render, screen } from '@testing-library/react';
import FeaturedArticlesGrid from '../FeaturedArticlesGrid';

// Mock the data imports
jest.mock('@/data/mockArticles', () => ({
  getRecentArticles: jest.fn(() => [
    {
      _id: 'test-1',
      title: 'Test Article 1',
      slug: 'test-article-1',
      excerpt: 'Test excerpt 1',
      publishedAt: '2026-02-14T05:00:00Z',
      readTime: 5,
      featured: false,
      category: { name: 'Gold', slug: 'gold', color: '#D4AF37' },
      author: { name: 'Test Author', slug: 'test-author' },
      featuredImage: { url: '/test-image.jpg' },
    },
    {
      _id: 'test-2',
      title: 'Test Article 2',
      slug: 'test-article-2',
      excerpt: 'Test excerpt 2',
      publishedAt: '2026-02-13T05:00:00Z',
      readTime: 7,
      featured: true,
      category: { name: 'Crypto', slug: 'crypto', color: '#F59E0B' },
      author: { name: 'Test Author 2', slug: 'test-author-2' },
      featuredImage: { url: '/test-image-2.jpg' },
    },
  ]),
}));

jest.mock('@/data/mockCategories', () => ({
  mockCategories: [
    { name: 'Gold', slug: 'gold' },
    { name: 'Crypto', slug: 'crypto' },
    { name: 'NatGold', slug: 'natgold' },
    { name: 'Research', slug: 'research' },
    { name: 'Opinion', slug: 'opinion' },
  ],
}));

// Mock ArticleCard component
jest.mock('../ArticleCard', () => {
  return function MockArticleCard({ title, category, categoryColor, slug, authorName }: any) {
    return (
      <div data-testid={`article-card-${slug}`}>
        <h3>{title}</h3>
        <span data-testid={`category-${slug}`} style={{ color: categoryColor }}>{category}</span>
        {authorName && <span data-testid={`author-${slug}`}>{authorName}</span>}
      </div>
    );
  };
});

describe('FeaturedArticlesGrid', () => {
  test('renders section header with title and description', () => {
    render(<FeaturedArticlesGrid />);
    
    expect(screen.getByText('Latest Insights')).toBeInTheDocument();
    expect(screen.getByText('Stay ahead with the latest gold and crypto market analysis')).toBeInTheDocument();
  });

  test('renders category quick links', () => {
    render(<FeaturedArticlesGrid />);
    
    expect(screen.getByRole('link', { name: 'Gold' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Crypto' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'NatGold' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Research' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Opinion' })).toBeInTheDocument();
  });

  test('renders article cards from mock data', () => {
    render(<FeaturedArticlesGrid />);
    
    expect(screen.getByTestId('article-card-test-article-1')).toBeInTheDocument();
    expect(screen.getByTestId('article-card-test-article-2')).toBeInTheDocument();
    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test Article 2')).toBeInTheDocument();
  });

  test('renders view all articles link', () => {
    render(<FeaturedArticlesGrid />);
    
    const viewAllLink = screen.getByRole('link', { name: /view all articles/i });
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink).toHaveAttribute('href', '/news');
  });

  test('applies responsive grid classes', () => {
    render(<FeaturedArticlesGrid />);
    
    const grid = screen.getByTestId('article-card-test-article-1').parentElement;
    expect(grid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  test('respects custom limit prop', () => {
    const { getRecentArticles } = require('@/data/mockArticles');
    
    render(<FeaturedArticlesGrid limit={4} />);
    
    expect(getRecentArticles).toHaveBeenCalledWith(4);
  });

  test('passes category color to article cards', () => {
    render(<FeaturedArticlesGrid />);
    
    const goldCategory = screen.getByTestId('category-test-article-1');
    expect(goldCategory).toHaveStyle({ color: '#D4AF37' });
    
    const cryptoCategory = screen.getByTestId('category-test-article-2');
    expect(cryptoCategory).toHaveStyle({ color: '#F59E0B' });
  });

  test('passes author name to article cards', () => {
    render(<FeaturedArticlesGrid />);
    
    expect(screen.getByTestId('author-test-article-1')).toHaveTextContent('Test Author');
    expect(screen.getByTestId('author-test-article-2')).toHaveTextContent('Test Author 2');
  });
});