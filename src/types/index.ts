/**
 * Core TypeScript interfaces for DigitalGoldBoom.com
 * Based on Sanity CMS schema from PRD
 */

// Social links interface
export interface SocialLinks {
  twitter?: string;
  linkedin?: string;
  website?: string;
}

// Author interface
export interface Author {
  _id: string;
  name: string;
  slug: string;
  avatar?: {
    url: string;
    alt?: string;
  };
  bio?: string;
  socialLinks?: SocialLinks;
  role?: string;
}

// Category interface
export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  order?: number;
}

// Tag interface
export interface Tag {
  _id: string;
  name: string;
  slug: string;
}

// Rich text block content type
export interface BlockContent {
  _type: string;
  children?: Array<{ _type: string; text: string; [key: string]: unknown }>;
  style?: string;
  level?: number;
}

// Featured image interface
export interface FeaturedImage {
  url: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
}

// Article status enum
export type ArticleStatus = 'draft' | 'published' | 'archived';

// Article interface
export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: BlockContent[];
  featuredImage?: FeaturedImage;
  author: Author;
  category: Category;
  tags?: Tag[];
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  featured?: boolean;
  readTime?: number;
  status: ArticleStatus;
  _createdAt: string;
  _updatedAt: string;
}

// Site settings interface
export interface SiteSettings {
  title: string;
  description: string;
  logo?: FeaturedImage;
  socialLinks?: SocialLinks;
  newsletterCTA: {
    headline: string;
    body: string;
    buttonText: string;
  };
  bookCTA: {
    headline: string;
    body: string;
    buttonText: string;
    link: string;
  };
}

// Search result interface
export interface SearchResult {
  objectID: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  slug: string;
  publishedAt: string;
}

// Newsletter signup interface
export interface NewsletterSignup {
  email: string;
  source?: string;
}