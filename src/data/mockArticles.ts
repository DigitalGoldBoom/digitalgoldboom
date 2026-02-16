import { Article, Tag } from '@/types';
import { mockAuthors } from './mockAuthors';
import { mockCategories } from './mockCategories';

// Mock tags
export const mockTags: Tag[] = [
  { _id: 'tag-bitcoin', name: 'Bitcoin', slug: 'bitcoin' },
  { _id: 'tag-ethereum', name: 'Ethereum', slug: 'ethereum' },
  { _id: 'tag-mining', name: 'Mining', slug: 'mining' },
  { _id: 'tag-tokenization', name: 'Tokenization', slug: 'tokenization' },
  { _id: 'tag-regulation', name: 'Regulation', slug: 'regulation' },
  { _id: 'tag-defi', name: 'DeFi', slug: 'defi' },
  { _id: 'tag-central-banks', name: 'Central Banks', slug: 'central-banks' },
  { _id: 'tag-inflation', name: 'Inflation', slug: 'inflation' },
  { _id: 'tag-market-analysis', name: 'Market Analysis', slug: 'market-analysis' },
  { _id: 'tag-esg', name: 'ESG', slug: 'esg' },
  { _id: 'tag-sustainability', name: 'Sustainability', slug: 'sustainability' },
  { _id: 'tag-paxg', name: 'PAXG', slug: 'paxg' },
  { _id: 'tag-xaut', name: 'XAUT', slug: 'xaut' },
  { _id: 'tag-trading', name: 'Trading', slug: 'trading' },
  { _id: 'tag-investment', name: 'Investment', slug: 'investment' },
];

export const mockArticles: Article[] = [
  {
    _id: 'article-001',
    title: 'Why Traditional Mining Is Becoming Obsolete',
    slug: 'traditional-mining-obsolete',
    excerpt: 'The S.P.I.R.A.L. of extraction costs is crushing traditional miners. Here\'s what the industry insiders know but won\'t tell you.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The mining industry is facing an unprecedented crisis that few are willing to discuss publicly...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/traditional-mining-obsolete.jpg',
      alt: 'Mining equipment in operation',
      caption: 'Traditional gold mining operations face mounting challenges',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[0], // Andrew Fletcher
    category: mockCategories[0], // Gold
    tags: [mockTags[2], mockTags[8], mockTags[9]], // Mining, Market Analysis, ESG
    seoTitle: 'Why Traditional Gold Mining Is Becoming Obsolete | Digital Gold Boom',
    seoDescription: 'Discover why traditional gold mining is facing extinction and how digital alternatives are reshaping the precious metals industry.',
    publishedAt: '2026-02-14T05:00:00Z',
    featured: true,
    readTime: 6,
    status: 'published',
    _createdAt: '2026-02-14T04:00:00Z',
    _updatedAt: '2026-02-14T04:30:00Z',
  },
  {
    _id: 'article-002',
    title: 'Understanding the NatGold Standard',
    slug: 'natgold-standard-explained',
    excerpt: 'How in-ground gold reserves are being tokenized without extraction, creating a new paradigm for gold ownership.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'NatGold represents a revolutionary approach to gold ownership that eliminates the need for physical extraction...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/natgold-standard.jpg',
      alt: 'Digital representation of tokenized gold',
      caption: 'NatGold tokens represent in-ground gold reserves',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[2], // Marcus Goldman
    category: mockCategories[2], // NatGold
    tags: [mockTags[3], mockTags[14]], // Tokenization, Investment
    seoTitle: 'NatGold Standard Explained: Tokenized In-Ground Gold Reserves',
    seoDescription: 'Learn how NatGold is revolutionizing gold ownership through blockchain tokenization of unmined reserves.',
    publishedAt: '2026-02-13T05:00:00Z',
    featured: false,
    readTime: 8,
    status: 'published',
    _createdAt: '2026-02-13T04:00:00Z',
    _updatedAt: '2026-02-13T04:30:00Z',
  },
  {
    _id: 'article-003',
    title: 'Gold Hits $2,850: What It Means for Digital Assets',
    slug: 'gold-2850-digital-assets',
    excerpt: 'Record prices are accelerating the shift to tokenized alternatives. Analysis of the impact on PAXG, XAUT, and emerging NatGold.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Gold\'s surge to $2,850 per ounce marks a historic milestone that is reshaping the digital asset landscape...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/gold-2850.jpg',
      alt: 'Gold price chart showing upward trend',
      caption: 'Gold reaches record highs of $2,850 per ounce',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[1], // Sarah Chen
    category: mockCategories[0], // Gold
    tags: [mockTags[8], mockTags[11], mockTags[12]], // Market Analysis, PAXG, XAUT
    seoTitle: 'Gold Hits $2,850: Impact on PAXG, XAUT and Digital Gold',
    seoDescription: 'Analysis of how record gold prices at $2,850 are affecting tokenized gold products and digital asset markets.',
    publishedAt: '2026-02-12T05:00:00Z',
    featured: false,
    readTime: 5,
    status: 'published',
    _createdAt: '2026-02-12T04:00:00Z',
    _updatedAt: '2026-02-12T04:30:00Z',
  },
  {
    _id: 'article-004',
    title: 'Central Bank Digital Gold: The Silent Revolution',
    slug: 'central-bank-digital-gold',
    excerpt: 'Major central banks are quietly accumulating digital gold reserves. What this means for the future of monetary policy.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'While public attention focuses on CBDCs, central banks are making strategic moves in the digital gold space...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/central-bank-digital-gold.jpg',
      alt: 'Central bank building with digital overlay',
      caption: 'Central banks embrace digital gold reserves',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[1], // Sarah Chen
    category: mockCategories[4], // Opinion
    tags: [mockTags[6], mockTags[7], mockTags[14]], // Central Banks, Inflation, Investment
    seoTitle: 'Central Banks Turn to Digital Gold Reserves | Analysis',
    seoDescription: 'Exclusive analysis of how central banks are quietly building digital gold reserves and its impact on monetary policy.',
    publishedAt: '2026-02-11T05:00:00Z',
    featured: true,
    readTime: 7,
    status: 'published',
    _createdAt: '2026-02-11T04:00:00Z',
    _updatedAt: '2026-02-11T04:30:00Z',
  },
  {
    _id: 'article-005',
    title: 'Bitcoin vs Gold: The Ultimate Store of Value Debate',
    slug: 'bitcoin-vs-gold-store-value',
    excerpt: 'A comprehensive analysis of Bitcoin and gold as store of value assets in 2026. Which performs better during market volatility?',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The debate between Bitcoin and gold as the ultimate store of value has reached a new intensity in 2026...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/bitcoin-vs-gold.jpg',
      alt: 'Bitcoin and gold comparison visualization',
      caption: 'Bitcoin vs Gold: The store of value battle continues',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[4], // David Kim
    category: mockCategories[1], // Crypto
    tags: [mockTags[0], mockTags[14], mockTags[8]], // Bitcoin, Investment, Market Analysis
    seoTitle: 'Bitcoin vs Gold 2026: Ultimate Store of Value Analysis',
    seoDescription: 'Comprehensive comparison of Bitcoin and gold as store of value assets, analyzing performance and market dynamics in 2026.',
    publishedAt: '2026-02-10T05:00:00Z',
    featured: false,
    readTime: 9,
    status: 'published',
    _createdAt: '2026-02-10T04:00:00Z',
    _updatedAt: '2026-02-10T04:30:00Z',
  },
  {
    _id: 'article-006',
    title: 'The ESG Crisis Crushing Mining Giants',
    slug: 'esg-crisis-mining-giants',
    excerpt: 'Environmental, Social, and Governance requirements are forcing major mining companies to shut down operations. The tokenization alternative.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'ESG compliance has become the mining industry\'s biggest challenge, forcing a fundamental rethink of operations...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/esg-crisis-mining.jpg',
      alt: 'Abandoned mining site with environmental impact',
      caption: 'ESG requirements force mining operations to close',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[5], // James Morrison
    category: mockCategories[0], // Gold
    tags: [mockTags[9], mockTags[10], mockTags[2]], // ESG, Sustainability, Mining
    seoTitle: 'ESG Crisis Forces Mining Industry Transformation',
    seoDescription: 'How environmental and governance requirements are reshaping the mining industry and driving tokenization adoption.',
    publishedAt: '2026-02-09T05:00:00Z',
    featured: false,
    readTime: 6,
    status: 'published',
    _createdAt: '2026-02-09T04:00:00Z',
    _updatedAt: '2026-02-09T04:30:00Z',
  },
  {
    _id: 'article-007',
    title: 'DeFi Gold: Yield Farming with Tokenized Precious Metals',
    slug: 'defi-gold-yield-farming',
    excerpt: 'New DeFi protocols are enabling yield farming with PAXG and XAUT. Analysis of risks, rewards, and strategies for 2026.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The convergence of DeFi and tokenized gold is creating unprecedented opportunities for yield generation...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/defi-gold.jpg',
      alt: 'DeFi interface showing gold token yields',
      caption: 'DeFi protocols now support tokenized gold yield farming',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[4], // David Kim
    category: mockCategories[1], // Crypto
    tags: [mockTags[5], mockTags[11], mockTags[12], mockTags[13]], // DeFi, PAXG, XAUT, Trading
    seoTitle: 'DeFi Gold Yield Farming: PAXG and XAUT Strategies 2026',
    seoDescription: 'Complete guide to yield farming with tokenized gold in DeFi protocols. Risks, rewards, and strategies for PAXG and XAUT.',
    publishedAt: '2026-02-08T05:00:00Z',
    featured: false,
    readTime: 8,
    status: 'published',
    _createdAt: '2026-02-08T04:00:00Z',
    _updatedAt: '2026-02-08T04:30:00Z',
  },
  {
    _id: 'article-008',
    title: 'Regulatory Tsunami: New Rules for Digital Gold',
    slug: 'regulatory-tsunami-digital-gold',
    excerpt: 'Breaking down the new regulatory framework for tokenized precious metals. What traders and investors need to know immediately.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'A wave of new regulations is sweeping across the digital gold landscape, fundamentally changing compliance requirements...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/regulatory-tsunami.jpg',
      alt: 'Legal documents and gavel',
      caption: 'New regulations reshape digital gold landscape',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[3], // Elena Rodriguez
    category: mockCategories[3], // Research
    tags: [mockTags[4], mockTags[13], mockTags[14]], // Regulation, Trading, Investment
    seoTitle: 'New Digital Gold Regulations: Complete Compliance Guide 2026',
    seoDescription: 'Breaking analysis of new regulatory requirements for tokenized gold trading and investment. Essential compliance guide.',
    publishedAt: '2026-02-07T05:00:00Z',
    featured: true,
    readTime: 10,
    status: 'published',
    _createdAt: '2026-02-07T04:00:00Z',
    _updatedAt: '2026-02-07T04:30:00Z',
  },
  {
    _id: 'article-009',
    title: 'The $50 Billion Gold Token Market: 2026 Analysis',
    slug: 'gold-token-market-analysis-2026',
    excerpt: 'Deep dive into the rapidly expanding tokenized gold market. Market cap analysis, growth drivers, and future projections.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The tokenized gold market has exploded to $50 billion in 2026, driven by institutional adoption and retail demand...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/gold-token-market.jpg',
      alt: 'Financial charts showing growth',
      caption: 'Tokenized gold market reaches $50 billion milestone',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[1], // Sarah Chen
    category: mockCategories[3], // Research
    tags: [mockTags[8], mockTags[14], mockTags[3]], // Market Analysis, Investment, Tokenization
    seoTitle: '$50 Billion Gold Token Market: Complete 2026 Analysis',
    seoDescription: 'Comprehensive analysis of the $50 billion tokenized gold market. Growth drivers, key players, and future projections.',
    publishedAt: '2026-02-06T05:00:00Z',
    featured: false,
    readTime: 12,
    status: 'published',
    _createdAt: '2026-02-06T04:00:00Z',
    _updatedAt: '2026-02-06T04:30:00Z',
  },
  {
    _id: 'article-010',
    title: 'Ethereum\'s Gold Rush: ERC-20 Precious Metal Tokens',
    slug: 'ethereum-gold-rush-erc20',
    excerpt: 'Why Ethereum dominates the tokenized precious metals space. Technical analysis of smart contracts and infrastructure.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Ethereum\'s dominance in tokenized precious metals stems from its mature smart contract ecosystem and proven security...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/ethereum-gold-rush.jpg',
      alt: 'Ethereum logo with gold elements',
      caption: 'Ethereum leads the tokenized precious metals revolution',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[2], // Marcus Goldman
    category: mockCategories[1], // Crypto
    tags: [mockTags[1], mockTags[3], mockTags[13]], // Ethereum, Tokenization, Trading
    seoTitle: 'Ethereum Gold Rush: Why ERC-20 Dominates Precious Metal Tokens',
    seoDescription: 'Technical analysis of why Ethereum leads tokenized precious metals. Smart contract infrastructure and security analysis.',
    publishedAt: '2026-02-05T05:00:00Z',
    featured: false,
    readTime: 7,
    status: 'published',
    _createdAt: '2026-02-05T04:00:00Z',
    _updatedAt: '2026-02-05T04:30:00Z',
  },
  {
    _id: 'article-011',
    title: 'Mining Stocks vs Digital Gold: Performance Comparison',
    slug: 'mining-stocks-vs-digital-gold',
    excerpt: 'Which investment performed better in 2025? Comprehensive analysis of mining equity returns versus tokenized gold performance.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The performance divergence between traditional mining stocks and digital gold has reached historic proportions in 2025...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/mining-stocks-vs-digital.jpg',
      alt: 'Stock charts comparing performance',
      caption: 'Mining stocks lag behind digital gold performance',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[0], // Andrew Fletcher
    category: mockCategories[4], // Opinion
    tags: [mockTags[2], mockTags[14], mockTags[8]], // Mining, Investment, Market Analysis
    seoTitle: 'Mining Stocks vs Digital Gold: 2025 Performance Analysis',
    seoDescription: 'Comprehensive performance comparison between mining stocks and digital gold investments. 2025 returns analysis.',
    publishedAt: '2026-02-04T05:00:00Z',
    featured: false,
    readTime: 6,
    status: 'published',
    _createdAt: '2026-02-04T04:00:00Z',
    _updatedAt: '2026-02-04T04:30:00Z',
  },
  {
    _id: 'article-012',
    title: 'The NatGold Ecosystem: Complete Guide to Tokenized Reserves',
    slug: 'natgold-ecosystem-guide',
    excerpt: 'Everything you need to know about NatGold tokenization. From reserve verification to trading strategies.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The NatGold ecosystem represents the future of resource ownership, eliminating extraction while preserving value...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/natgold-ecosystem.jpg',
      alt: 'Digital ecosystem visualization',
      caption: 'The complete NatGold tokenization ecosystem',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[2], // Marcus Goldman
    category: mockCategories[2], // NatGold
    tags: [mockTags[3], mockTags[14], mockTags[10]], // Tokenization, Investment, Sustainability
    seoTitle: 'NatGold Ecosystem Guide: Complete Tokenized Reserves Analysis',
    seoDescription: 'Complete guide to the NatGold ecosystem. Reserve verification, tokenization process, and trading strategies.',
    publishedAt: '2026-02-03T05:00:00Z',
    featured: true,
    readTime: 15,
    status: 'published',
    _createdAt: '2026-02-03T04:00:00Z',
    _updatedAt: '2026-02-03T04:30:00Z',
  },
  {
    _id: 'article-013',
    title: 'Gold Price Manipulation: How Tokenization Fixes It',
    slug: 'gold-price-manipulation-tokenization',
    excerpt: 'Exposing traditional gold market manipulation and how blockchain transparency is solving centuries-old problems.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The traditional gold market has suffered from opacity and potential manipulation for decades. Tokenization changes everything...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/gold-manipulation.jpg',
      alt: 'Trading floor with digital overlay',
      caption: 'Blockchain transparency eliminates gold market manipulation',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[0], // Andrew Fletcher
    category: mockCategories[4], // Opinion
    tags: [mockTags[3], mockTags[8], mockTags[13]], // Tokenization, Market Analysis, Trading
    seoTitle: 'Gold Price Manipulation: How Blockchain Fixes Century-Old Problems',
    seoDescription: 'Exposing traditional gold market manipulation and how tokenization creates unprecedented transparency and fairness.',
    publishedAt: '2026-02-02T05:00:00Z',
    featured: false,
    readTime: 8,
    status: 'published',
    _createdAt: '2026-02-02T04:00:00Z',
    _updatedAt: '2026-02-02T04:30:00Z',
  },
  {
    _id: 'article-014',
    title: 'Institutional Adoption: Goldman Sachs Goes Digital Gold',
    slug: 'goldman-sachs-digital-gold-adoption',
    excerpt: 'Major Wall Street banks are launching digital gold trading desks. What this means for mainstream adoption.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Goldman Sachs\' entry into digital gold trading signals a seismic shift in institutional precious metals strategy...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/institutional-adoption.jpg',
      alt: 'Wall Street building with digital elements',
      caption: 'Wall Street embraces digital gold trading',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[1], // Sarah Chen
    category: mockCategories[0], // Gold
    tags: [mockTags[14], mockTags[13], mockTags[8]], // Investment, Trading, Market Analysis
    seoTitle: 'Goldman Sachs Digital Gold: Wall Street\'s Blockchain Pivot',
    seoDescription: 'Analysis of Goldman Sachs and other major banks entering digital gold trading. Impact on mainstream adoption.',
    publishedAt: '2026-02-01T05:00:00Z',
    featured: false,
    readTime: 7,
    status: 'published',
    _createdAt: '2026-02-01T04:00:00Z',
    _updatedAt: '2026-02-01T04:30:00Z',
  },
  {
    _id: 'article-015',
    title: 'Smart Contracts for Gold: Beyond Simple Tokenization',
    slug: 'smart-contracts-gold-advanced',
    excerpt: 'Advanced smart contract applications for precious metals. Automated trading, yield optimization, and complex derivatives.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Smart contracts are evolving beyond basic tokenization to enable sophisticated precious metals financial products...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/smart-contracts-gold.jpg',
      alt: 'Code and blockchain visualization',
      caption: 'Advanced smart contracts revolutionize gold finance',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[2], // Marcus Goldman
    category: mockCategories[1], // Crypto
    tags: [mockTags[1], mockTags[3], mockTags[5]], // Ethereum, Tokenization, DeFi
    seoTitle: 'Advanced Smart Contracts for Gold: Beyond Basic Tokenization',
    seoDescription: 'Exploring advanced smart contract applications for precious metals. Automated trading and complex derivatives.',
    publishedAt: '2026-01-31T05:00:00Z',
    featured: false,
    readTime: 9,
    status: 'published',
    _createdAt: '2026-01-31T04:00:00Z',
    _updatedAt: '2026-01-31T04:30:00Z',
  },
  {
    _id: 'article-016',
    title: 'The Death of Physical Gold Storage',
    slug: 'death-physical-gold-storage',
    excerpt: 'Why traditional gold vaults are becoming obsolete. Storage costs, insurance, and security concerns drive digital adoption.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Physical gold storage infrastructure is crumbling under modern security and cost pressures. Digital alternatives surge...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/death-physical-storage.jpg',
      alt: 'Empty gold vault',
      caption: 'Traditional gold storage becomes obsolete',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[5], // James Morrison
    category: mockCategories[0], // Gold
    tags: [mockTags[14], mockTags[3], mockTags[8]], // Investment, Tokenization, Market Analysis
    seoTitle: 'Physical Gold Storage Crisis: Why Digital Wins',
    seoDescription: 'Analysis of why traditional gold storage is failing and how digital alternatives solve cost and security problems.',
    publishedAt: '2026-01-30T05:00:00Z',
    featured: false,
    readTime: 6,
    status: 'published',
    _createdAt: '2026-01-30T04:00:00Z',
    _updatedAt: '2026-01-30T04:30:00Z',
  },
  {
    _id: 'article-017',
    title: 'Crypto Tax Implications of Digital Gold Trading',
    slug: 'crypto-tax-digital-gold',
    excerpt: 'Complete guide to tax implications of trading PAXG, XAUT, and other tokenized precious metals. Updated for 2026 regulations.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The tax treatment of tokenized gold creates unique challenges and opportunities for traders and investors...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/crypto-tax-gold.jpg',
      alt: 'Tax forms and calculator',
      caption: 'Navigate complex tax rules for digital gold trading',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[3], // Elena Rodriguez
    category: mockCategories[3], // Research
    tags: [mockTags[4], mockTags[13], mockTags[11], mockTags[12]], // Regulation, Trading, PAXG, XAUT
    seoTitle: 'Digital Gold Tax Guide 2026: PAXG, XAUT Trading Implications',
    seoDescription: 'Complete tax guide for tokenized gold trading. Updated regulations, strategies, and compliance requirements for 2026.',
    publishedAt: '2026-01-29T05:00:00Z',
    featured: false,
    readTime: 11,
    status: 'published',
    _createdAt: '2026-01-29T04:00:00Z',
    _updatedAt: '2026-01-29T04:30:00Z',
  },
  {
    _id: 'article-018',
    title: 'Layer 2 Gold: Scaling Tokenized Precious Metals',
    slug: 'layer-2-gold-scaling',
    excerpt: 'How Layer 2 solutions are making gold tokenization faster and cheaper. Polygon, Arbitrum, and Optimism analysis.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Layer 2 scaling solutions are revolutionizing tokenized gold by dramatically reducing transaction costs and increasing speed...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/layer-2-gold.jpg',
      alt: 'Blockchain network visualization',
      caption: 'Layer 2 solutions scale tokenized gold trading',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[2], // Marcus Goldman
    category: mockCategories[1], // Crypto
    tags: [mockTags[1], mockTags[3], mockTags[13]], // Ethereum, Tokenization, Trading
    seoTitle: 'Layer 2 Gold: Scaling Tokenized Precious Metals on Blockchain',
    seoDescription: 'How Layer 2 blockchain solutions are making gold tokenization faster and cheaper. Technical analysis and comparison.',
    publishedAt: '2026-01-28T05:00:00Z',
    featured: false,
    readTime: 8,
    status: 'published',
    _createdAt: '2026-01-28T04:00:00Z',
    _updatedAt: '2026-01-28T04:30:00Z',
  },
  {
    _id: 'article-019',
    title: 'The Great Gold Migration: From Vaults to Wallets',
    slug: 'great-gold-migration-vaults-wallets',
    excerpt: 'Tracking the massive shift from physical gold holdings to digital wallets. $2 trillion in migration underway.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The largest wealth migration in history is quietly happening as gold moves from physical vaults to digital wallets...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/great-gold-migration.jpg',
      alt: 'Digital wallet interface with gold tokens',
      caption: '$2 trillion gold migration from vaults to wallets',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[0], // Andrew Fletcher
    category: mockCategories[4], // Opinion
    tags: [mockTags[14], mockTags[3], mockTags[8]], // Investment, Tokenization, Market Analysis
    seoTitle: 'Great Gold Migration: $2 Trillion Move from Vaults to Wallets',
    seoDescription: 'Analysis of the massive shift from physical gold storage to digital wallets. Market implications and trends.',
    publishedAt: '2026-01-27T05:00:00Z',
    featured: true,
    readTime: 10,
    status: 'published',
    _createdAt: '2026-01-27T04:00:00Z',
    _updatedAt: '2026-01-27T04:30:00Z',
  },
  {
    _id: 'article-020',
    title: 'Gold Oracle Networks: Price Discovery Revolution',
    slug: 'gold-oracle-networks-price-discovery',
    excerpt: 'How decentralized oracle networks are creating transparent, manipulation-resistant gold price feeds for DeFi.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Oracle networks are solving the gold market\'s oldest problem: trusted, transparent price discovery resistant to manipulation...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/gold-oracle-networks.jpg',
      alt: 'Network nodes and price feeds',
      caption: 'Oracle networks revolutionize gold price discovery',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[2], // Marcus Goldman
    category: mockCategories[1], // Crypto
    tags: [mockTags[5], mockTags[8], mockTags[3]], // DeFi, Market Analysis, Tokenization
    seoTitle: 'Gold Oracle Networks: Decentralized Price Discovery Revolution',
    seoDescription: 'How blockchain oracle networks are creating transparent, manipulation-resistant gold price feeds for DeFi protocols.',
    publishedAt: '2026-01-26T05:00:00Z',
    featured: false,
    readTime: 7,
    status: 'published',
    _createdAt: '2026-01-26T04:00:00Z',
    _updatedAt: '2026-01-26T04:30:00Z',
  },
  {
    _id: 'article-021',
    title: 'Sustainable Gold: ESG Meets Blockchain Technology',
    slug: 'sustainable-gold-esg-blockchain',
    excerpt: 'How blockchain tracking and tokenization are solving gold mining\'s environmental and ethical challenges.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'The marriage of blockchain technology and ESG compliance is creating the first truly sustainable gold ownership model...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/sustainable-gold.jpg',
      alt: 'Green technology and gold imagery',
      caption: 'Blockchain enables truly sustainable gold ownership',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[5], // James Morrison
    category: mockCategories[0], // Gold
    tags: [mockTags[9], mockTags[10], mockTags[3]], // ESG, Sustainability, Tokenization
    seoTitle: 'Sustainable Gold: How Blockchain Solves Mining\'s ESG Crisis',
    seoDescription: 'Analysis of how blockchain technology and tokenization are creating sustainable gold ownership and solving ESG challenges.',
    publishedAt: '2026-01-25T05:00:00Z',
    featured: false,
    readTime: 9,
    status: 'published',
    _createdAt: '2026-01-25T04:00:00Z',
    _updatedAt: '2026-01-25T04:30:00Z',
  },
  {
    _id: 'article-022',
    title: 'Global Gold Tokenization: Market Analysis by Region',
    slug: 'global-gold-tokenization-regions',
    excerpt: 'Regional analysis of gold tokenization adoption. Which markets lead and which lag in digital gold adoption.',
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: 'Gold tokenization adoption varies dramatically by region, driven by regulatory clarity, technological infrastructure, and cultural factors...' }],
        style: 'normal',
      },
    ],
    featuredImage: {
      url: '/images/articles/global-tokenization.jpg',
      alt: 'World map with digital connections',
      caption: 'Global adoption patterns of gold tokenization',
      width: 1200,
      height: 675,
    },
    author: mockAuthors[1], // Sarah Chen
    category: mockCategories[3], // Research
    tags: [mockTags[3], mockTags[8], mockTags[4]], // Tokenization, Market Analysis, Regulation
    seoTitle: 'Global Gold Tokenization: Regional Market Analysis 2026',
    seoDescription: 'Comprehensive regional analysis of gold tokenization adoption. Market leaders, laggards, and growth opportunities.',
    publishedAt: '2026-01-24T05:00:00Z',
    featured: false,
    readTime: 13,
    status: 'published',
    _createdAt: '2026-01-24T04:00:00Z',
    _updatedAt: '2026-01-24T04:30:00Z',
  },
];

// Helper functions
export const getFeaturedArticles = (): Article[] => {
  return mockArticles.filter(article => article.featured);
};

export const getArticlesByCategory = (categorySlug: string): Article[] => {
  return mockArticles.filter(article => article.category.slug === categorySlug);
};

export const getArticlesByAuthor = (authorSlug: string): Article[] => {
  return mockArticles.filter(article => article.author.slug === authorSlug);
};

export const getArticleBySlug = (slug: string): Article | undefined => {
  return mockArticles.find(article => article.slug === slug);
};

export const getRecentArticles = (limit: number = 10): Article[] => {
  return mockArticles
    .sort((a, b) => new Date(b.publishedAt || '').getTime() - new Date(a.publishedAt || '').getTime())
    .slice(0, limit);
};

export const getTagBySlug = (slug: string): Tag | undefined => {
  return mockTags.find(tag => tag.slug === slug);
};