import { render, screen } from '@testing-library/react';
import ArticlesWithTrending from '../ArticlesWithTrending';

// Mock the child components
jest.mock('../FeaturedArticlesGrid', () => {
  return function MockFeaturedArticlesGrid({ limit }: { limit: number }) {
    return (
      <div data-testid="featured-articles-grid">
        <h2>Featured Articles Grid</h2>
        <p>Limit: {limit}</p>
      </div>
    );
  };
});

jest.mock('../TrendingSection', () => {
  return function MockTrendingSection() {
    return (
      <div data-testid="trending-section">
        <h3>Trending Now</h3>
      </div>
    );
  };
});

jest.mock('../NewsletterForm', () => {
  return function MockNewsletterForm({ variant }: { variant: string }) {
    return (
      <div data-testid="newsletter-form">
        <input placeholder={`Newsletter signup - ${variant}`} />
      </div>
    );
  };
});

describe('ArticlesWithTrending', () => {
  test('renders main articles section with trending sidebar', () => {
    render(<ArticlesWithTrending />);
    
    expect(screen.getByTestId('featured-articles-grid')).toBeInTheDocument();
    expect(screen.getByTestId('trending-section')).toBeInTheDocument();
  });

  test('passes correct limit to FeaturedArticlesGrid', () => {
    render(<ArticlesWithTrending />);
    
    expect(screen.getByText('Limit: 6')).toBeInTheDocument();
  });

  test('renders newsletter section with correct content', () => {
    render(<ArticlesWithTrending />);
    
    expect(screen.getByRole('heading', { 
      name: /know what's moving gold — before the markets do/i 
    })).toBeInTheDocument();
    
    expect(screen.getByText(/every weekday at 5am utc/i)).toBeInTheDocument();
    expect(screen.getByText(/join 12,000\+ readers/i)).toBeInTheDocument();
  });

  test('renders newsletter form with inline variant', () => {
    render(<ArticlesWithTrending />);
    
    const newsletterForm = screen.getByTestId('newsletter-form');
    expect(newsletterForm).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Newsletter signup - inline')).toBeInTheDocument();
  });

  test('applies proper responsive grid layout', () => {
    render(<ArticlesWithTrending />);
    
    // Check for responsive grid classes on the container
    const gridContainer = screen.getByTestId('featured-articles-grid').closest('.lg\\:grid');
    expect(gridContainer).toHaveClass('lg:grid', 'lg:grid-cols-4', 'lg:gap-8');
    
    // Check column spans
    const mainContent = screen.getByTestId('featured-articles-grid').closest('.lg\\:col-span-3');
    const sidebar = screen.getByTestId('trending-section').closest('.lg\\:col-span-1');
    
    expect(mainContent).toHaveClass('lg:col-span-3');
    expect(sidebar).toHaveClass('lg:col-span-1');
  });

  test('has proper section structure with ARIA labels', () => {
    render(<ArticlesWithTrending />);
    
    const articlesSection = screen.getByRole('region', { name: /featured-articles-section/i });
    const newsletterSection = screen.getByRole('region', { name: /newsletter/i });
    
    expect(articlesSection).toBeInTheDocument();
    expect(newsletterSection).toBeInTheDocument();
  });

  test('newsletter section appears after articles section', () => {
    render(<ArticlesWithTrending />);
    
    const container = screen.getByTestId('featured-articles-grid').closest('section');
    const newsletterSection = screen.getByRole('heading', { 
      name: /know what's moving gold/i 
    }).closest('section');
    
    expect(container?.nextElementSibling).toBe(newsletterSection);
  });

  test('applies correct background and spacing classes', () => {
    render(<ArticlesWithTrending />);
    
    // Main section should have background
    const mainSection = screen.getByTestId('featured-articles-grid').closest('section');
    expect(mainSection).toHaveClass('bg-[var(--bg-secondary)]/30');
    
    // Newsletter section should have border
    const newsletterSection = screen.getByRole('heading', { 
      name: /know what's moving gold/i 
    }).closest('section');
    expect(newsletterSection).toHaveClass('border-t', 'border-[var(--border-subtle)]');
  });

  test('mobile responsive behavior for sidebar', () => {
    render(<ArticlesWithTrending />);
    
    const sidebar = screen.getByTestId('trending-section').parentElement;
    expect(sidebar).toHaveClass('mt-12', 'lg:mt-0');
  });
});