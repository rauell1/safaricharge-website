import type { Metadata } from 'next';
import { MapClient } from '@/components/safari/map-client';

export const metadata: Metadata = {
  title: 'EV Charging Map Kenya',
  description: 'Find SafariCharge EV charging stations near you across Kenya. Real-time availability for Nairobi, Nakuru, Mombasa, Kisumu and more.',
  alternates: { canonical: 'https://safaricharge.rauell.systems/map' },
  openGraph: {
    title: 'SafariCharge Charging Map | Find EV Stations in Kenya',
    description: 'Live map of EV charging stations across Kenya. Check real-time availability, pricing, and get directions to the nearest SafariCharge point.',
    url: 'https://safaricharge.rauell.systems/map',
  },
};

export default function MapPage() {
  return <MapClient />;
}
