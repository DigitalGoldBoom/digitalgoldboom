import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Hero from '../Hero';

// Mock Next.js components
jest.mock('next/link', () => {
  const MockedLink = ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
    return <a href={href} {...props}>{children}</a>;
  };
  MockedLink.displayName = 'MockedLink';
  return MockedLink;
});

jest.mock('next/image', () => {
  const MockedImage = ({ src, alt, width, height, className, ...props }: { 
    src: string; 
    alt: string; 
    width?: number; 
    height?: number; 
    className?: string;
    priority?: boolean;
    fill?: boolean;
    sizes?: string;
    [key: string]: unknown;
  }) => {
    // Filter out Next.js specific props that are not valid HTML attributes
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { priority, fill, sizes, ...validProps } = props;
    return <img src={src} alt={alt} width={width} height={height} className={className} {...validProps} />;
  };
  MockedImage.displayName = 'MockedImage';
  return MockedImage;
});

describe('Hero Component - DGB-004 Requirements', () => {
  beforeEach(() => {
    // Mock timers to control loading state
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('displays loading skeleton initially', () => {
    render(<Hero />);
    
    // Check for loading skeleton elements
    expect(document.querySelector('section')).toBeInTheDocument();
    expect(document.querySelectorAll('.animate-pulse')).toHaveLength(8); // Expected number of skeleton elements
  });

  it('displays featured article with large image after loading', async () => {
    render(<Hero />);
    
    // Fast-forward past loading delay
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      // Check for article title (h1) - should be from first featured article
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      
      // Check for featured image
      const images = screen.getAllByRole('img');
      expect(images.length).toBeGreaterThan(0);
    });
  });

  it('displays article metadata: title, excerpt, category badge, and publish date', async () => {
    render(<Hero />);
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      // Title should be present
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      
      // Category badge should be present
      const categoryElements = screen.getAllByText(/gold|crypto|natgold|research|opinion/i);
      expect(categoryElements.length).toBeGreaterThan(0);
      
      // Date should be formatted properly (check for month pattern)
      expect(screen.getByText(/feb|jan|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i)).toBeInTheDocument();
      
      // Author should be present
      expect(screen.getByText(/by /i)).toBeInTheDocument();
      
      // Read time should be present
      expect(screen.getByText(/min read/i)).toBeInTheDocument();
    });
  });

  it('includes gold gradient CTA button linking to article', async () => {
    render(<Hero />);
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      const articleCTA = screen.getByRole('link', { name: /read full article/i });
      expect(articleCTA).toHaveAttribute('href');
      expect(articleCTA.getAttribute('href')).toMatch(/^\/news\//);
      expect(articleCTA).toHaveClass('bg-gradient-to-r');
    });
  });

  it('integrates book CTA in hero section', async () => {
    render(<Hero />);
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      const bookCTA = screen.getByRole('link', { name: /free book/i });
      expect(bookCTA).toHaveAttribute('href', '/book');
      expect(bookCTA).toHaveTextContent('📖');
    });
  });

  it('has responsive layout classes', async () => {
    render(<Hero />);
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      const container = document.querySelector('.grid');
      expect(container).toHaveClass('grid-cols-1', 'lg:grid-cols-2');
      
      // Check order classes for responsive layout
      const contentDiv = document.querySelector('.order-2');
      expect(contentDiv).toHaveClass('lg:order-1');
      
      const imageDiv = document.querySelector('.order-1');
      expect(imageDiv).toHaveClass('lg:order-2');
    });
  });

  it('has proper ARIA structure for accessibility', async () => {
    render(<Hero />);
    jest.advanceTimersByTime(300);
    
    await waitFor(() => {
      // Section should be a proper landmark
      expect(document.querySelector('section')).toBeInTheDocument();
      
      // Should have proper heading hierarchy
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      
      // Images should have proper alt text
      const images = screen.getAllByRole('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    });
  });
});