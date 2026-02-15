import { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { generateFAQSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Newsletter | Weekly Gold Tokenization Insights | Digital Gold Boom',
  description: 'Subscribe to the Digital Gold Boom newsletter for weekly insights on tokenized gold, market analysis, BIV trends, and industry news. Join 5,000+ subscribers.',
  keywords: ['gold newsletter', 'tokenization newsletter', 'gold investment newsletter', 'PAXG newsletter', 'gold market insights'],
  alternates: {
    canonical: 'https://digitalgoldboom.com/newsletter',
  },
  openGraph: {
    title: 'Newsletter | Weekly Gold Tokenization Insights',
    description: 'Subscribe for weekly insights on tokenized gold, market analysis, and industry news.',
    url: 'https://digitalgoldboom.com/newsletter',
    type: 'website',
  },
};

const faqs = [
  {
    question: 'How often do you send emails?',
    answer: 'Once a week, typically on Tuesday mornings. Occasionally we\'ll send breaking news if something major happens in the gold or tokenization space.',
  },
  {
    question: 'Is it really free?',
    answer: 'Yes, completely free. We may offer premium content in the future, but the weekly newsletter will always be free.',
  },
  {
    question: 'Can I unsubscribe anytime?',
    answer: 'Of course. Every email has an unsubscribe link at the bottom. One click and you\'re out.',
  },
];

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={generateFAQSchema(faqs)} />
      {children}
    </>
  );
}
