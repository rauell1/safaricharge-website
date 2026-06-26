'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Zap, ArrowRight, Calendar, Clock, Tag, Mail } from 'lucide-react';
import { PublicNav } from '@/components/safari/public-nav';
import { Logo } from '@/components/ui/logo';

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
  { name: 'Charging Guide', count: 8 },
  { name: 'Fleet Management', count: 5 },
  { name: 'Industry Insights', count: 7 },
  { name: 'Sustainability', count: 4 },
  { name: 'Solar Energy', count: 3 },
  { name: 'Battery Tech', count: 4 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export function BlogClient() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [featured, ...rest] = posts;

  // Filter posts based on selected category
  const filteredRest = selectedCategory === 'All'
    ? rest
    : rest.filter(p => p.category === selectedCategory);

  const isFeaturedVisible = selectedCategory === 'All' || featured.category === selectedCategory;

  // Combine category lists to add 'All'
  const allCategories = [{ name: 'All', count: posts.length }, ...categories];

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

            {/* Articles List */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347]">Latest Articles</p>
                <span className="text-xs text-gray-400 font-semibold">{filteredRest.length + (isFeaturedVisible ? 1 : 0)} articles found</span>
              </div>

              {/* Featured article with gradient background and text reveal */}
              {isFeaturedVisible && (
                <motion.article
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={stagger}
                  className="relative bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832] rounded-3xl overflow-hidden p-8 md:p-10 shadow-2xl border border-white/10 group"
                >
                  <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)',
                      backgroundSize: '40px 40px',
                    }}
                  />
                  <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-[#8EB69B]/10 blur-[60px] pointer-events-none" />
                  <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-[#C1E8FF]/10 blur-[70px] pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-white/10 text-white border border-white/15 backdrop-blur-md">
                        Featured
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/5 text-[#8EB69B] border border-[#8EB69B]/10">
                        {featured.category}
                      </span>
                    </div>

                    <motion.h2
                      variants={fadeUp}
                      className="text-2xl md:text-3xl font-black text-white mb-4 group-hover:text-[#8EB69B] transition-colors leading-[1.2]"
                    >
                      <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
                    </motion.h2>

                    <motion.p
                      variants={fadeUp}
                      className="text-white/65 leading-relaxed mb-8 max-w-2xl text-[0.95rem]"
                    >
                      {featured.excerpt}
                    </motion.p>

                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                      <div className="flex items-center gap-4 text-xs text-white/40 font-medium">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#8EB69B]" />
                          {featured.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#8EB69B]" />
                          {featured.readTime}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${featured.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#8EB69B] hover:text-white hover:gap-2.5 transition-all group/arrow"
                      >
                        Read article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/arrow:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              )}

              {/* Rest of articles list with staggered reveal */}
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-6"
              >
                {filteredRest.map((post) => (
                  <motion.article
                    key={post.slug}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden group p-6 md:p-8 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-gray-50 text-gray-500 border border-gray-100">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-gray-900 mb-3 group-hover:text-[#235347] transition-colors leading-[1.2]">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">{post.excerpt}</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-50 pt-5">
                      <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
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
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#235347] hover:gap-2.5 transition-all group/arrow"
                      >
                        Read article
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/arrow:translate-x-1" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Category Filter Chips with sliding underline */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">
                <h3 className="text-gray-900 font-extrabold text-sm mb-6 pb-3 border-b border-gray-50">Filter by Category</h3>
                <div className="flex flex-col gap-1">
                  {allCategories.map((c) => {
                    const isSelected = selectedCategory === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedCategory(c.name)}
                        className={`group relative text-left py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected ? 'text-[#235347] font-bold' : 'text-gray-500 hover:text-gray-950'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {c.name}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          isSelected ? 'bg-[#f0f7f5] text-[#235347] font-bold' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {c.count}
                        </span>

                        {/* Sliding Underline indicator at the left border */}
                        {isSelected && (
                          <motion.div
                            layoutId="activeUnderline"
                            className="absolute left-0 top-2 bottom-2 w-[3px] bg-gradient-to-b from-[#235347] to-[#052659] rounded-full"
                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832] rounded-3xl border border-white/10 p-6 shadow-xl text-white relative overflow-hidden">
                <div className="absolute -top-12 -left-12 w-28 h-28 bg-[#8EB69B]/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-[#C1E8FF]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4">
                    <Mail className="w-5 h-5 text-[#8EB69B]" />
                  </div>
                  <h3 className="font-extrabold text-lg mb-2">Weekly Newsletter</h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-5">
                    Stay up to date with EV updates, network expansions, and clean energy insights in East Africa.
                  </p>
                  <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="w-full bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/45 focus:outline-none focus:ring-1 focus:ring-[#8EB69B]/50 transition-all"
                    />
                    <button
                      type="submit"
                      className="w-full bg-white text-[#051F20] hover:bg-[#DAF1DE] font-bold text-xs py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      Subscribe
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 50%,rgba(142,182,155,0.5) 0%,transparent 50%),radial-gradient(circle at 70% 50%,rgba(84,131,179,0.5) 0%,transparent 50%)',
          }}
        />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8EB69B] mb-4">Explore More</p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">
            Looking for EV Solutions?
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10">
            Sign up today to explore our interactive network map, calculate battery degradation, and optimize charging costs.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 h-14 px-10 bg-white text-[#051F20] font-bold text-base rounded-xl hover:bg-[#DAF1DE] transition-colors shadow-2xl"
            >
              <Logo className="w-5 h-5" />
              Sign In to Platform
            </Link>
            <Link
              href="mailto:info@rauell.systems"
              className="inline-flex items-center gap-2 h-14 px-10 bg-transparent text-white font-semibold text-base rounded-xl border-2 border-white/25 hover:bg-white/10 transition-colors"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#040d1a] text-gray-500 py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center">
              <Logo className="w-4 h-4 text-white" />
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
