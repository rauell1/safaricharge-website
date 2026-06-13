import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog — EV Charging in Kenya',
  description:
    'Expert guides, news, and insights on electric vehicles, EV charging, fleet management, and sustainable transport in Kenya and East Africa.',
  alternates: {
    canonical: 'https://safaricharge.rauell.systems/blog',
  },
  openGraph: {
    title: 'SafariCharge Blog | EV Charging Insights for Kenya',
    description:
      'Expert guides and news on EVs, charging infrastructure, fleet management, and green transport in Kenya and East Africa.',
    url: 'https://safaricharge.rauell.systems/blog',
  },
};

const posts = [
  {
    slug: 'ev-charging-nairobi',
    title: 'Top 5 EV Charging Stations in Nairobi in 2026',
    excerpt:
      'A complete guide to the best public EV charging stations in Nairobi — locations, pricing, and connector types.',
    date: '2026-06-01',
  },
  {
    slug: 'ev-fleet-management-kenya',
    title: 'How to Manage an EV Fleet in Kenya: A Complete Guide',
    excerpt:
      'Everything fleet operators need to know about transitioning to electric vehicles in Kenya — costs, logistics, and tools.',
    date: '2026-05-15',
  },
  {
    slug: 'electric-mobility-east-africa',
    title: 'The State of Electric Mobility in East Africa 2026',
    excerpt:
      'An in-depth look at EV adoption rates, charging infrastructure growth, and policy developments across East Africa.',
    date: '2026-05-01',
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-4 text-primary">SafariCharge Blog</h1>
        <p className="text-muted-foreground mb-12">
          Insights, guides, and news on electric vehicles and EV charging in Kenya and East Africa.
        </p>
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border border-border rounded-xl p-6 hover:border-primary transition-colors"
            >
              <time className="text-xs text-muted-foreground">{post.date}</time>
              <h2 className="text-xl font-semibold mt-1 mb-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-muted-foreground">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
