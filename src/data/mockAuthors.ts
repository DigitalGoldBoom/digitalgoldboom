import { Author } from '@/types';

export const mockAuthors: Author[] = [
  {
    _id: 'author-fletch',
    name: 'Andrew Fletcher',
    slug: 'andrew-fletcher',
    avatar: {
      url: '/images/authors/fletch.jpg',
      alt: 'Andrew Fletcher',
    },
    bio: 'Former CEO of Great Eagle Gold Corp. Author of Digital Gold Boom. Expert in traditional mining operations and digital gold tokenization.',
    socialLinks: {
      twitter: 'https://twitter.com/andrewfletcher',
      linkedin: 'https://linkedin.com/in/andrew-fletcher',
      website: 'https://digitalgoldboom.com',
    },
    role: 'Editor-in-Chief',
  },
  {
    _id: 'author-sarah-chen',
    name: 'Sarah Chen',
    slug: 'sarah-chen',
    avatar: {
      url: '/images/authors/sarah-chen.jpg',
      alt: 'Sarah Chen',
    },
    bio: 'Senior market analyst with 15 years experience in precious metals trading. Former Goldman Sachs commodities strategist.',
    socialLinks: {
      twitter: 'https://twitter.com/sarahchenmarkets',
      linkedin: 'https://linkedin.com/in/sarahchen',
    },
    role: 'Senior Market Analyst',
  },
  {
    _id: 'author-marcus-gold',
    name: 'Marcus Goldman',
    slug: 'marcus-goldman',
    avatar: {
      url: '/images/authors/marcus-goldman.jpg',
      alt: 'Marcus Goldman',
    },
    bio: 'Blockchain technology specialist focusing on tokenization of real-world assets. Former CTO at major mining conglomerate.',
    socialLinks: {
      twitter: 'https://twitter.com/marcusgoldman',
      linkedin: 'https://linkedin.com/in/marcusgoldman',
      website: 'https://tokenization.expert',
    },
    role: 'Blockchain Technology Editor',
  },
  {
    _id: 'author-elena-rodriguez',
    name: 'Elena Rodriguez',
    slug: 'elena-rodriguez',
    avatar: {
      url: '/images/authors/elena-rodriguez.jpg',
      alt: 'Elena Rodriguez',
    },
    bio: 'Regulatory affairs specialist covering mining regulations and digital asset compliance. Former legal counsel for major mining operations.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/elenarodriguez',
    },
    role: 'Regulatory Affairs Correspondent',
  },
  {
    _id: 'author-david-kim',
    name: 'David Kim',
    slug: 'david-kim',
    avatar: {
      url: '/images/authors/david-kim.jpg',
      alt: 'David Kim',
    },
    bio: 'Cryptocurrency trader and DeFi researcher with deep expertise in tokenized commodities and digital gold products.',
    socialLinks: {
      twitter: 'https://twitter.com/davidkimcrypto',
      website: 'https://cryptogoldtrader.com',
    },
    role: 'Crypto Markets Correspondent',
  },
  {
    _id: 'author-james-mining',
    name: 'James Morrison',
    slug: 'james-morrison',
    avatar: {
      url: '/images/authors/james-morrison.jpg',
      alt: 'James Morrison',
    },
    bio: 'Mining engineer with 20+ years in gold extraction. Currently consulting on sustainable mining practices and ESG compliance.',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/jamesmorrison',
    },
    role: 'Mining Industry Expert',
  },
];

export const getAuthorBySlug = (slug: string): Author | undefined => {
  return mockAuthors.find(author => author.slug === slug);
};

export const getAuthorById = (id: string): Author | undefined => {
  return mockAuthors.find(author => author._id === id);
};