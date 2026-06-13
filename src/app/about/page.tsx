import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About SafariCharge',
  description:
    'Learn about SafariCharge — the company building Kenya\'s EV charging infrastructure. Our mission is to accelerate electric mobility across East Africa.',
  alternates: {
    canonical: 'https://safaricharge.rauell.systems/about',
  },
  openGraph: {
    title: 'About SafariCharge | Kenya EV Charging Network',
    description:
      'SafariCharge is building Kenya\'s largest EV charging network, empowering drivers, fleets, and businesses to go electric.',
    url: 'https://safaricharge.rauell.systems/about',
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6 text-primary">About SafariCharge</h1>
        <p className="text-lg text-muted-foreground mb-6">
          SafariCharge is Kenya&apos;s leading electric vehicle (EV) charging network, built for
          drivers, fleet managers, businesses, and government agencies accelerating the shift
          to sustainable transport.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-muted-foreground mb-6">
          We believe Africa&apos;s transport future is electric. Our mission is to deploy reliable,
          affordable, and intelligent EV charging infrastructure across Kenya and East Africa —
          making clean mobility accessible to everyone.
        </p>
        <h2 className="text-2xl font-semibold mb-4">What We Build</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Public and private EV charging stations across Kenya</li>
          <li>Fleet management software for EV operators</li>
          <li>Battery repurposing and second-life energy solutions</li>
          <li>AI-powered analytics for energy optimization</li>
          <li>Employee EV charging programs for enterprises</li>
        </ul>
      </section>
    </main>
  );
}
