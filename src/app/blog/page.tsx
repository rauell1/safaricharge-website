import type { Metadata } from 'next';
import { BlogClient } from './blog-client';

export const metadata: Metadata = {
  title: 'Blog: EV Charging in Kenya',
  description:
    'Expert guides, news, and insights on electric vehicles, EV charging, fleet management, and sustainable transport in Kenya and East Africa.',
  alternates: { canonical: 'https://safaricharge.rauell.systems/blog' },
  openGraph: {
    title: 'SafariCharge Blog | EV Charging Insights for Kenya',
    description:
      'Expert guides and news on EVs, charging infrastructure, fleet management, and green transport in Kenya and East Africa.',
    url: 'https://safaricharge.rauell.systems/blog',
  },
};

export default function BlogPage() {
  return <BlogClient />;
}
