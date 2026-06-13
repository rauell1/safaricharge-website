import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Features — EV Charging Platform',
  description:
    'Explore SafariCharge platform features: real-time charging map, fleet management, battery repurposing, AI analytics, and employee EV programs. Built for Kenya.',
  alternates: {
    canonical: 'https://safaricharge.rauell.systems/features',
  },
  openGraph: {
    title: 'SafariCharge Features | EV Charging Platform for Kenya',
    description:
      'Real-time charging map, fleet management, battery repurposing, and AI analytics — all in one EV platform built for Kenya and East Africa.',
    url: 'https://safaricharge.rauell.systems/features',
  },
};

const features = [
  {
    title: 'Real-Time Charging Map',
    description:
      'Find available EV charging stations near you across Kenya. Live availability, pricing, and directions — all on one map.',
  },
  {
    title: 'Fleet Management',
    description:
      'Manage your entire EV fleet from a single dashboard. Track charging sessions, costs, and driver behaviour in real time.',
  },
  {
    title: 'Battery Repurposing Toolkit',
    description:
      'Extend the life of used EV batteries with our second-life energy analytics and repurposing recommendation engine.',
  },
  {
    title: 'AI Data Intelligence',
    description:
      'AI-powered analytics that predict demand, optimise energy usage, and reduce fleet operating costs across your charging network.',
  },
  {
    title: 'Employee EV Programs',
    description:
      'Enable workplace EV charging with automated employee approval workflows, billing, and reimbursement management.',
  },
  {
    title: 'Admin Control Centre',
    description:
      'Full user management, station administration, and system health monitoring for network operators and administrators.',
  },
];

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-5xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-4 text-primary">Platform Features</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Everything you need to charge, manage, and optimise your EV experience in Kenya.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f) => (
            <div key={f.title} className="border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-2">{f.title}</h2>
              <p className="text-muted-foreground text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
