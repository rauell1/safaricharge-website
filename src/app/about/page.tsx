import type { Metadata } from 'next';
import { AboutClient } from './about-client';

export const metadata: Metadata = {
  title: 'About SafariCharge',
  description:
    "Learn about SafariCharge, the company building Kenya's EV charging infrastructure. Our mission is to accelerate electric mobility across East Africa.",
  alternates: { canonical: 'https://safaricharge.rauell.systems/about' },
  openGraph: {
    title: "About SafariCharge | Kenya's EV Charging Network",
    description:
      "SafariCharge is building Kenya's largest EV charging network, empowering drivers, fleets, and businesses to go electric.",
    url: 'https://safaricharge.rauell.systems/about',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
