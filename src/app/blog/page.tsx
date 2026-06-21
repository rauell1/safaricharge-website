import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicNav } from '@/components/safari/public-nav';
import { Zap, ArrowRight, Calendar, Clock, Tag, Mail } from 'lucide-react';

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

const posts = [
  {
    slug: 'ev-charging-nairobi',
    title: 'Top 5 EV Charging Stations in Nairobi in 2026',
    excerpt:
      'A complete guide to the best public EV charging stations in Nairobi: locations, pricing, and connector types explained for every vehicle.',
    date: '2026-06-01',
    readTime: '6 min read',
    category: 'Charging Guide',
    featured: true,
    color: 'from-[#235347] to-[#163832]',
  },
  {
    slug: 'ev-fleet-management-kenya',
    title: 'How to Manage an EV Fleet in Kenya: A Complete Guide',
    excerpt:
      'Everything fleet operators need to know about transitioning to electric vehicles in Kenya, covering costs, logistics, software tools, and charging strategy.',
    date: '2026-05-15',
    readTime: '9 min read',
    category: 'Fleet Management',
    featured: false,
    color: 'from-[#052659] to-[#141E30]',
  },
  {
    slug: 'electric-mobility-east-africa',
    title: 'The State of Electric Mobility in East Africa 2026',
    excerpt:
      'An in-depth look at EV adoption rates, charging infrastructure growth, and policy developments shaping the future of clean transport across East Africa.',
    date: '2026-05-01',
    readTime: '11 min read',
    category: 'Industry Insights',
    featured: false,
    color: 'from-[#5483B3] to-[#7DA0CA]',
  },
];

const categories = [
  { name: 'Charging Guide', count: 8, color: 'bg-[#235347]/10 text-[#235347]' },
  { name: 'Fleet Management', count: 5, color: 'bg-[#052659]/10 text-[#052659]' },
  { name: 'Industry Insights', count: 7, color: 'bg-[#5483B3]/10 text-[#5483B3]' },
  { name: 'Sustainability', count: 4, color: 'bg-[#8EB69B]/20 text-[#235347]' },
  { name: 'Solar Energy', count: 3, color: 'bg-amber-50 text-amber-700' },
  { name: 'Battery Tech', count: 4, color: 'bg-purple-50 text-purple-700' },
];

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="relative pt-16 min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832]">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#5483B3]/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#235347]/25 blur-[140px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full border border-white/15 text-white/80 text-xs font-medium mb-7">
            <span className="w-2 h-2 rounded-full bg-[#8EB69B]" />
            SafariCharge Insights
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white mb-6">
            News, Guides, and{' '}
            <span className="bg-gradient-to-r from-[#8EB69B] to-[#C1E8FF] bg-clip-text text-transparent">
              EV Insights
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Expert coverage of electric vehicles, charging infrastructure, fleet operations,
            and clean energy across Kenya and East Africa.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-[#f8fafb]">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Articles */}
            <div className="lg:col-span-2 space-y-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347]">Latest Articles</p>

              {/* Featured article */}
              <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group">
                <div className={`h-2 w-full bg-gradient-to-r ${featured.color}`} />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#f0f7f5] text-[#235347]">
                      Featured
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                      {featured.category}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-[#235347] transition-colors">
                    <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {featured.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featured.readTime}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${featured.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#235347] hover:gap-2.5 transition-all"
                    >
                      Read article
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>

              {/* Rest of articles */}
              {rest.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
                >
                  <div className={`h-1.5 w-full bg-gradient-to-r ${post.color}`} />
                  <div className="p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                        {post.category}
                      </span>
                    </div>
                    <h2 className="text-xl font-black text-gray-900 mb-2 group-hover:text-[#235347] transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#235347] hover:gap-2.5 transition-all"
                      >
                        Read article
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-7">
              {/* Categories */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-5">Categories</p>
                <div className="space-y-2.5">
                  {categories.map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${cat.color}`}>
                        {cat.name}
                      </span>
                      <span className="text-xs text-gray-400 font-medium">{cat.count} articles</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832] rounded-2xl p-7 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#8EB69B]/15 blur-2xl" />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <Mail className="w-5 h-5 text-[#8EB69B]" />
                  </div>
                  <h3 className="text-white font-black text-lg mb-2">Stay Updated</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">
                    Get the latest EV news, charging guides, and sustainability insights from Kenya
                    delivered to your inbox.
                  </p>
                  <Link
                    href="mailto:info@rauell.systems?subject=Newsletter Signup"
                    className="block text-center bg-white text-[#051F20] font-bold text-sm py-3 px-5 rounded-xl hover:bg-[#DAF1DE] transition-colors"
                  >
                    Subscribe to Newsletter
                  </Link>
                </div>
              </div>

              {/* Energy CTA */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-4">Also Explore</p>
                <Link
                  href="/energy"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#f8fafb] hover:bg-[#f0f7f5] transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">SafariCharge Energy</p>
                    <p className="text-xs text-gray-500 mt-0.5">Solar panels and battery storage</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#235347] flex-shrink-0" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
            Ready to start your EV journey?
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-8">
            Join thousands of drivers and fleet operators across Kenya already using SafariCharge.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-12 px-8 bg-gradient-to-r from-[#235347] to-[#052659] text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
          >
            <Zap className="w-4 h-4" />
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <footer className="bg-[#040d1a] text-gray-500 py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold">SafariCharge</span>
          </div>
          <p className="text-xs text-gray-600">2026 SafariCharge, Rauell Systems. All rights reserved.</p>
          <div className="flex gap-5 text-xs">
            <Link href="/features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
