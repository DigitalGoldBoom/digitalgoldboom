import { Category } from '@/types';

export const mockCategories: Category[] = [
  {
    _id: 'cat-gold',
    name: 'Gold',
    slug: 'gold',
    description: 'Gold market analysis, mining industry news, and traditional precious metals coverage',
    color: '#D4AF37',
    order: 1,
  },
  {
    _id: 'cat-crypto',
    name: 'Crypto',
    slug: 'crypto',
    description: 'Cryptocurrency markets, blockchain technology, and digital asset analysis',
    color: '#F59E0B',
    order: 2,
  },
  {
    _id: 'cat-natgold',
    name: 'NatGold',
    slug: 'natgold',
    description: 'NatGold ecosystem updates, tokenized natural resources, and digital gold innovations',
    color: '#EAB308',
    order: 3,
  },
  {
    _id: 'cat-research',
    name: 'Research',
    slug: 'research',
    description: 'Deep-dive analysis, market research reports, and data-driven insights',
    color: '#3B82F6',
    order: 4,
  },
  {
    _id: 'cat-opinion',
    name: 'Opinion',
    slug: 'opinion',
    description: 'Editorial commentary, expert opinions, and industry perspectives',
    color: '#8B5CF6',
    order: 5,
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return mockCategories.find(category => category.slug === slug);
};

export const getCategoryById = (id: string): Category | undefined => {
  return mockCategories.find(category => category._id === id);
};