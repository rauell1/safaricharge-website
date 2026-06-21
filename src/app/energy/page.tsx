import type { Metadata } from 'next';
import { EnergyLanding } from '@/components/safari/energy-landing';

export const metadata: Metadata = {
  title: 'SafariCharge Energy | Solar Panels, Inverters & Battery Storage',
  description:
    'SafariCharge Energy delivers premium solar panels, hybrid inverters, and lithium battery storage for African homes, businesses, and communities. Integrated with our EV charging ecosystem.',
  keywords: [
    'solar energy Kenya',
    'solar panels Nairobi',
    'hybrid inverters Kenya',
    'lithium battery storage Africa',
    'off-grid solar Kenya',
    'SafariCharge Energy',
    'clean energy Kenya',
    'solar installation East Africa',
  ],
  alternates: {
    canonical: 'https://safaricharge.rauell.systems/energy',
  },
  openGraph: {
    title: 'SafariCharge Energy | Solar Panels, Inverters & Battery Storage',
    description:
      'Premium solar solutions for African homes and businesses, integrated with the SafariCharge EV charging ecosystem.',
    url: 'https://safaricharge.rauell.systems/energy',
  },
};

export default function EnergyPage() {
  return <EnergyLanding />;
}
