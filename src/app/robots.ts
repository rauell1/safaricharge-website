import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/map', '/about', '/features', '/blog'],
        disallow: [
          '/dashboard',
          '/history',
          '/battery',
          '/fleet',
          '/analytics',
          '/users',
          '/employees',
          '/api/',
        ],
      },
    ],
    sitemap: 'https://safaricharge.rauell.systems/sitemap.xml',
    host: 'https://safaricharge.rauell.systems',
  };
}
