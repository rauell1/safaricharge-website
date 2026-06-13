import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EV Charging Map Kenya',
  description:
    'Find SafariCharge EV charging stations near you across Kenya. Real-time availability for Nairobi, Nakuru, Mombasa, Kisumu and more.',
  alternates: {
    canonical: 'https://safaricharge.rauell.systems/map',
  },
  openGraph: {
    title: 'SafariCharge Charging Map | Find EV Stations in Kenya',
    description:
      'Live map of EV charging stations across Kenya. Check real-time availability, pricing, and get directions to the nearest SafariCharge point.',
    url: 'https://safaricharge.rauell.systems/map',
  },
};

export default function MapPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2 text-primary">EV Charging Stations in Kenya</h1>
        <p className="text-muted-foreground mb-8">
          Find a SafariCharge station near you. Real-time availability across Nairobi, Nakuru,
          Mombasa, Kisumu, and more cities across Kenya.
        </p>
        {/* 
          TODO: Move the authenticated StationMap component here.
          For public/SEO purposes, render a static list of stations 
          server-side, and load the interactive map client-side.
        */}
        <div className="rounded-xl border border-border p-8 text-center text-muted-foreground">
          <p className="text-lg font-medium">Interactive Map Loading...</p>
          <p className="text-sm mt-2">
            Sign in to access real-time station availability and start charging.
          </p>
        </div>
      </section>
    </main>
  );
}
