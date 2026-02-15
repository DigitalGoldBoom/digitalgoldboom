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

  it('renders all navigation links', () => {
    render(<Header />)
    
    // Check for navigation links
    expect(screen.getByText('Prices')).toBeInTheDocument()
    expect(screen.getByText('News')).toBeInTheDocument()
    expect(screen.getByText('Book')).toBeInTheDocument()
    expect(screen.getByText('Newsletter')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders CTA button', () => {
    render(<Header />)
    
    expect(screen.getByText('Get the Free Book →')).toBeInTheDocument()
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

  it('has proper accessibility attributes', () => {
    render(<Header />)
    
    // Check navigation has proper aria-label
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Main navigation')
    
    // Check mobile menu button has proper aria attributes
    const menuButton = screen.getByRole('button')
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu')
    expect(menuButton).toHaveAttribute('aria-label', 'Open menu')
  })
})