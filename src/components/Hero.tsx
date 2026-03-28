'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Article } from '@/types';
import { getFeaturedArticles } from '@/data/mockArticles';

// Loading skeleton component
function HeroSkeleton() {
  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content side skeleton */}
          <div className="order-2 lg:order-1 space-y-6">
            <div className="h-8 bg-gray-700/20 rounded animate-pulse w-24"></div>
            <div className="space-y-3">
              <div className="h-12 bg-gray-700/20 rounded animate-pulse"></div>
              <div className="h-12 bg-gray-700/20 rounded animate-pulse w-3/4"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700/20 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-700/20 rounded animate-pulse w-5/6"></div>
            </div>
            <div className="flex gap-3">
              <div className="h-12 bg-gray-700/20 rounded animate-pulse w-40"></div>
              <div className="h-12 bg-gray-700/20 rounded animate-pulse w-32"></div>
            </div>
          </div>
          
          {/* Image side skeleton */}
          <div className="order-1 lg:order-2">
            <div className="aspect-[16/10] bg-gray-700/20 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Hero() {
  const [featuredArticle, setFeaturedArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for realistic UX
    const timer = setTimeout(() => {
      const featuredArticles = getFeaturedArticles();
      setFeaturedArticle(featuredArticles[0] || null);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Handle loading state
  if (isLoading) {
    return <HeroSkeleton />;
  }

  // Handle error state - fallback if no featured article
  if (!featuredArticle) {
    return (
      <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight">
            Gold went digital.
            <span className="gold-text"> You should know how.</span>
          </h1>
          <p className="text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-8 leading-relaxed">
            Live prices, daily analysis, and insights from the digital gold revolution.
          </p>
          <Link
            href="/book"
            className="btn btn-primary btn-lg gold-glow-sm inline-flex items-center gap-2"
          >
            <span>📖</span>
            <span>Get the Free Book</span>
          </Link>
        </div>
      </section>
    );
  }

  // Format publish date
  const publishDate = featuredArticle.publishedAt 
    ? new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : '';

  return (
    <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--gold-primary)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--gold-muted)]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Article Content - Left side on desktop, bottom on mobile */}
          <div className="order-2 lg:order-1 space-y-6">
            
            {/* Category Badge */}
            <div className="inline-flex items-center">
              <span 
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
                style={{
                  backgroundColor: `${featuredArticle.category.color}15`,
                  color: featuredArticle.category.color,
                  borderColor: `${featuredArticle.category.color}30`
                }}
              >
                {featuredArticle.category.name}
              </span>
              {publishDate && (
                <>
                  <span className="text-[var(--text-disabled)] mx-2">•</span>
                  <span className="text-sm text-[var(--text-secondary)]">{publishDate}</span>
                </>
              )}
            </div>

            {/* Article Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-[var(--text-primary)]">
              {featuredArticle.title}
            </h1>

            {/* Article Excerpt */}
            {featuredArticle.excerpt && (
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                {featuredArticle.excerpt}
              </p>
            )}

            {/* Author and Read Time */}
            <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
              <div className="flex items-center gap-2">
                {featuredArticle.author.avatar?.url && (
                  <Image
                    src={featuredArticle.author.avatar.url}
                    alt={featuredArticle.author.avatar.alt || `${featuredArticle.author.name} avatar`}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span>By {featuredArticle.author.name}</span>
              </div>
              {featuredArticle.readTime && (
                <>
                  <span className="text-[var(--text-disabled)]">•</span>
                  <span>{featuredArticle.readTime} min read</span>
                </>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              
              {/* Gold Gradient CTA to Article */}
              <Link
                href={`/news/${featuredArticle.slug}`}
                className="btn btn-primary btn-lg gold-glow-sm inline-flex items-center gap-2 bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-light)] hover:from-[var(--gold-light)] hover:to-[var(--gold-primary)] text-black font-semibold transition-all duration-300"
              >
                <span>Read Full Article</span>
                <span>→</span>
              </Link>

              {/* Book CTA */}
              <Link
                href="/book"
                className="btn btn-secondary btn-lg inline-flex items-center gap-2 text-[var(--gold-primary)] border-[var(--gold-primary)]/30 hover:bg-[var(--gold-primary)]/10 transition-colors"
              >
                <span>📖</span>
                <span>Free Book</span>
              </Link>
            </div>

          </div>

          {/* Featured Image - Right side on desktop, top on mobile */}
          <div className="order-1 lg:order-2">
            {featuredArticle.featuredImage?.url ? (
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[var(--bg-secondary)]">
                <Image
                  src={featuredArticle.featuredImage.url}
                  alt={featuredArticle.featuredImage.alt || featuredArticle.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Image overlay gradient for better text readability on mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden"></div>
              </div>
            ) : (
              <div className="aspect-[16/10] bg-[var(--bg-secondary)] rounded-lg flex items-center justify-center">
                <span className="text-[var(--text-disabled)] text-4xl">📰</span>
              </div>
            )}
            
            {/* Image Caption */}
            {featuredArticle.featuredImage?.caption && (
              <p className="text-xs text-[var(--text-tertiary)] mt-2 text-center lg:text-left">
                {featuredArticle.featuredImage.caption}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}