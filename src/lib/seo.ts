import type { Metadata } from 'next';

const BASE_URL = 'https://tinydoghub.co.uk';
const SITE_NAME = 'TinyDogHub';

export interface SEOConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
}

export function generatePageMetadata(config: SEOConfig): Metadata {
  const url = `${BASE_URL}${config.path}`;

  return {
    title: config.title,
    description: config.description,
    alternates: { canonical: url },
    openGraph: {
      title: config.title,
      description: config.description,
      url,
      siteName: SITE_NAME,
      type: config.type ?? 'website',
      ...(config.image && { images: [{ url: config.image }] }),
      ...(config.publishedTime && { publishedTime: config.publishedTime }),
      ...(config.modifiedTime && { modifiedTime: config.modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: BASE_URL,
    description: 'The UK\'s definitive online resource for owners of Chihuahuas, puppies and toy breeds.',
    sameAs: [],
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description: 'The UK\'s definitive online resource for owners of Chihuahuas, puppies and toy breeds.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}
