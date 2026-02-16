import { render, screen, fireEvent, act } from '@testing-library/react';
import NewsletterSignupSection from '../NewsletterSignupSection';

describe('NewsletterSignupSection', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders newsletter heading', () => {
    render(<NewsletterSignupSection />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/digital now/i);
  });

  it('renders email input and submit button', () => {
    render(<NewsletterSignupSection />);
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  it('references Digital Gold Boom book in copy', () => {
    render(<NewsletterSignupSection />);
    expect(screen.getByText(/digital gold boom/i)).toBeInTheDocument();
  });

  it('has accessible section with aria-labelledby', () => {
    const { container } = render(<NewsletterSignupSection />);
    const section = container.querySelector('section[aria-labelledby="newsletter-heading"]');
    expect(section).toBeInTheDocument();
  });

  it('shows success state after form submission', async () => {
    render(<NewsletterSignupSection />);
    const input = screen.getByPlaceholderText(/enter your email/i);
    const button = screen.getByRole('button', { name: /subscribe/i });

    fireEvent.change(input, { target: { value: 'test@example.com' } });
    fireEvent.click(button);

    // Loading state
    expect(screen.getByRole('button', { name: /sending/i })).toBeInTheDocument();

    // Advance timer for mock handler
    act(() => { jest.advanceTimersByTime(1100); });

    expect(screen.getByText(/you're in/i)).toBeInTheDocument();
  });

  it('renders gold accent decoration', () => {
    const { container } = render(<NewsletterSignupSection />);
    const accent = container.querySelector('.bg-gradient-to-r');
    expect(accent).toBeInTheDocument();
  });
});
