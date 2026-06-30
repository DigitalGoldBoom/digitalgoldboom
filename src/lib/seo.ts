import { Metadata } from 'next';

const SITE_URL = 'https://digitalgoldboom.com';
const SITE_NAME = 'Digital Gold Boom';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

// Stable @id anchors so Google/AI resolve these as ONE linked entity graph across the page's
// JSON-LD blocks (Organization ← founder ← Person; WebSite/Book → publisher → Organization).
const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const PERSON_ID = `${SITE_URL}/#andrew-fletcher`;

// Andrew Fletcher — the book's author. Facts verified against the book (C:\DGB-Book). Author
// authority is the biggest E-E-A-T lever for a finance title. No `sameAs` yet — the real author
// profile URLs aren't confirmed, so they're omitted rather than fabricated (Golden Rule #1).
function authorNode() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Andrew Fletcher',
    jobTitle: 'Author',
    description:
      'Author of Digital Gold Boom. Former President, Director and CEO of NatBridge Resources (formerly Great Eagle Gold Corp), the company behind the first NatGold supply agreement.',
    knowsAbout: [
      'Digital gold mining',
      'Gold tokenization',
      'NatGold',
      'Baseline Intrinsic Value (BIV)',
      'Mineral resource verification (NI 43-101)',
    ],
  };
}

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
  // No `logo` (no real logo asset exists yet — a 404 logo is worse than none) and no `sameAs`
  // (the social profiles aren't verified). Real-and-sourced or omitted (Golden Rule #1).
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Digital Gold Boom — the book and live data on digital gold mining and the tokenization of in-ground verified gold.',
    founder: { '@id': PERSON_ID },
  };
}

export function generateWebsiteSchema() {
  // No SearchAction — there is no /search page, so claiming one would be a fabricated capability.
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Digital gold mining and the tokenization of in-ground verified gold — explained, with live data and the book.',
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  };
}

// Standalone Person node — render on an /author page (or anywhere author authority helps).
export function generatePersonSchema() {
  return { '@context': 'https://schema.org', ...authorNode() };
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
    '@id': `${SITE_URL}/book#book`,
    name: 'Digital Gold Boom',
    author: authorNode(),
    publisher: { '@id': ORG_ID },
    description:
      'Decoding the start of the biggest gold rush in history — how digital gold mining tokenizes in-ground verified gold into a tradeable, eco-friendly, gold-backed asset.',
    genre: 'Business & Finance',
    inLanguage: 'en',
    bookFormat: 'https://schema.org/EBook',
    url: `${SITE_URL}/book`,
    // Real, owner-set price. Still NO ratingValue/reviewCount/numberOfPages/ISBN (none verified).
    offers: {
      '@type': 'Offer',
      price: '37.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/book`,
    },
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
