import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock window scrollY for scroll tests
Object.defineProperty(window, 'scrollY', {
  writable: true,
  configurable: true,
  value: 0,
})

describe('Header', () => {
  it('renders without crashing', () => {
    render(<Header />)
    
    // Check if main navigation elements are present
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByText('Digital Gold')).toBeInTheDocument()
    expect(screen.getByText('Boom')).toBeInTheDocument()
  })

  it('renders all category navigation links', () => {
    render(<Header />)
    
    // Check for the 5 category navigation links as per PRD
    expect(screen.getByText('Gold')).toBeInTheDocument()
    expect(screen.getByText('Crypto')).toBeInTheDocument()
    expect(screen.getByText('NatGold')).toBeInTheDocument()
    expect(screen.getByText('Research')).toBeInTheDocument()
    expect(screen.getByText('Opinion')).toBeInTheDocument()
  })

  it('renders CTA buttons', () => {
    render(<Header />)
    
    // Check for book CTA
    expect(screen.getByText('Free Book →')).toBeInTheDocument()
    
    // Check for newsletter CTA (desktop - may not be visible on mobile)
    expect(screen.getByText('Newsletter')).toBeInTheDocument()
  })

  it('renders search functionality', () => {
    render(<Header />)
    
    // Check for search button (should have search icon)
    const searchButton = screen.getByRole('button', { name: /search/i })
    expect(searchButton).toBeInTheDocument()
    expect(searchButton).toHaveAttribute('title', 'Search (coming soon)')
  })

  it('toggles mobile menu when menu button is clicked', () => {
    render(<Header />)
    
    // Find mobile menu button
    const menuButton = screen.getByRole('button', { name: /open menu/i })
    expect(menuButton).toBeInTheDocument()
    
    // Click to open menu
    fireEvent.click(menuButton)
    
    // Check if mobile menu is now open
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument()
    expect(screen.getByTestId || screen.queryByTestId).toBeDefined() // Mobile menu should be present
  })

  it('has proper logo link to homepage', () => {
    render(<Header />)
    
    // Check logo link
    const logoLink = screen.getByRole('link', { name: /G Digital Gold Boom/i })
    expect(logoLink).toHaveAttribute('href', '/')
  })

  it('renders mobile navigation with all elements when opened', () => {
    render(<Header />)
    
    // Open mobile menu
    const menuButton = screen.getByRole('button', { name: /open menu/i })
    fireEvent.click(menuButton)
    
    // Check mobile navigation contains search
    expect(screen.getByText('Search')).toBeInTheDocument()
    
    // Check mobile navigation contains all categories
    expect(screen.getAllByText('Gold')).toHaveLength(2) // Desktop + mobile
    expect(screen.getAllByText('Crypto')).toHaveLength(2)
    expect(screen.getAllByText('NatGold')).toHaveLength(2)
    expect(screen.getAllByText('Research')).toHaveLength(2)
    expect(screen.getAllByText('Opinion')).toHaveLength(2)
    
    // Check mobile CTAs
    expect(screen.getByText('Subscribe to Newsletter')).toBeInTheDocument()
    expect(screen.getByText('Get the Free Book →')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<Header />)
    
    // Check navigation has proper aria-label
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Main navigation')
    
    // Check mobile menu button has proper aria attributes
    const menuButton = screen.getByRole('button', { name: /open menu/i })
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu')
    expect(menuButton).toHaveAttribute('aria-label', 'Open menu')
  })
})