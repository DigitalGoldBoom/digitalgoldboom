import { Metadata } from 'next';

const SITE_URL = 'https://digitalgoldboom.com';
const SITE_NAME = 'Digital Gold Boom';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOConfig {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  keywords?: string[];
}

export function generateMetadata({
  title,
  description,
  path = '',
  image = DEFAULT_IMAGE,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  keywords = [],
}: SEOConfig): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === '' ? title : `${title} | ${SITE_NAME}`;
  
  const defaultKeywords = [
    'digital gold',
    'tokenized gold',
    'gold tokenization',
    'PAXG',
    'XAUT',
    'NatGold',
    'gold investment',
    'crypto gold',
    'BIV',
    'gold prices',
  ];

  return {
    title: fullTitle,
    description,
    keywords: [...defaultKeywords, ...keywords],
    authors: authors?.map(name => ({ name })),
    creator: 'Digital Gold Boom',
    publisher: 'Digital Gold Boom',
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@digitalgoldboom',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// JSON-LD Structured Data Generators
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Your source for digital gold intelligence, live prices, and the tokenization revolution.',
    sameAs: [
      'https://twitter.com/digitalgoldboom',
      'https://linkedin.com/company/digitalgoldboom',
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateArticleSchema({
  title,
  description,
  path,
  publishedTime,
  modifiedTime,
  author = 'Digital Gold Boom',
  image = DEFAULT_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    url: `${SITE_URL}${path}`,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  };
}

export function generateBookSchema() {
  // NOTE: only real, verifiable facts here. No invented rating / reviewCount / pageCount /
  // dollar claims — fabricated values in JSON-LD get quoted verbatim by Google and AI and
  // violate the project's "no placeholder data" rule. Add aggregateRating ONLY with real
  // reviews; add numberOfPages ONLY with the real count.
  return {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: 'Digital Gold Boom',
    author: {
      '@type': 'Person',
      name: 'Andrew Fletcher',
    },
    description:
      'Decoding the start of the biggest gold rush in history — how digital gold mining tokenizes in-ground verified gold into a tradeable, eco-friendly, gold-backed asset.',
    genre: 'Business & Finance',
    inLanguage: 'en',
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateFinancialProductSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Gold Price Tracker',
    description: 'Real-time tracking of gold spot prices, tokenized gold assets (PAXG, XAUT), and Baseline Intrinsic Value (BIV).',
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };
}
