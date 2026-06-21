import type { Metadata } from 'next';
import { FeaturesClient } from './features-client';

export const metadata: Metadata = {
  title: 'Features: EV Charging Platform',
  description:
    'Explore SafariCharge platform features: real-time charging map, fleet management, battery repurposing, AI analytics, and employee EV programs. Built for Kenya.',
  alternates: { canonical: 'https://safaricharge.rauell.systems/features' },
  openGraph: {
    title: 'SafariCharge Features | EV Charging Platform for Kenya',
    description:
      'Real-time charging map, fleet management, battery repurposing, and AI analytics in one EV platform built for Kenya and East Africa.',
    url: 'https://safaricharge.rauell.systems/features',
  },
};

export default function FeaturesPage() {
  return <FeaturesClient />;
}
