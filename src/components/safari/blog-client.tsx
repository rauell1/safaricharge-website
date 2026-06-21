'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { PublicNav } from '@/components/safari/public-nav';
import { Zap, ArrowRight, Calendar, Clock, Mail } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const posts = [
  { slug: 'ev-charging-nairobi', title: 'Top 5 EV Charging Stations in Nairobi in 2026', excerpt: 'A complete guide to the best public EV charging stations in Nairobi: locations, pricing, and connector types explained for every vehicle.', date: '2026-06-01', readTime: '6 min read', category: 'Charging Guide', color: 'from-[#235347] to-[#163832]' },
  { slug: 'ev-fleet-management-kenya', title: 'How to Manage an EV Fleet in Kenya: A Complete Guide', excerpt: 'Everything fleet operators need to know about transitioning to electric vehicles in Kenya, covering costs, logistics, software tools, and charging strategy.', date: '2026-05-15', readTime: '9 min read', category: 'Fleet Management', color: 'from-[#052659] to-[#141E30]' },
  { slug: 'electric-mobility-east-africa', title: 'The State of Electric Mobility in East Africa 2026', excerpt: 'An in-depth look at EV adoption rates, charging infrastructure growth, and policy developments shaping the future of clean transport across East Africa.', date: '2026-05-01', readTime: '11 min read', category: 'Industry Insights', color: 'from-[#5483B3] to-[#7DA0CA]' },
  { slug: 'ev-battery-repurposing', title: 'What Happens to EV Batteries After They Retire?', excerpt: 'A deep dive into second-life applications for used EV batteries, from stationary energy storage to off-grid solar systems across Africa.', date: '2026-04-20', readTime: '8 min read', category: 'Battery Tech', color: 'from-[#8EB69B] to-[#235347]' },
  { slug: 'solar-ev-charging-kenya', title: 'Solar-Powered EV Charging: Africa\'s Cleanest Commute', excerpt: 'How SafariCharge is integrating rooftop solar with EV charging to create zero-emission transport corridors in Kenya.', date: '2026-04-05', readTime: '7 min read', category: 'Solar Energy', color: 'from-[#235347] to-[#052659]' },
  { slug: 'carbon-footprint-ev-africa', title: 'How Electric Vehicles Cut Your Carbon Footprint in Kenya', excerpt: 'Comparing lifecycle emissions of EVs vs petrol vehicles on Kenya\'s electricity grid, including renewable energy contributions.', date: '2026-03-18', readTime: '5 min read', category: 'Sustainability', color: 'from-[#163832] to-[#235347]' },
];

const categories = ['All', 'Charging Guide', 'Fleet Management', 'Industry Insights', 'Battery Tech', 'Solar Energy', 'Sustainability'];

const categoryColors: Record<string, string> = {
  'Charging Guide': 'bg-[#235347]/10 text-[#235347]',
  'Fleet Management': 'bg-[#052659]/10 text-[#052659]',
  'Industry Insights': 'bg-[#5483B3]/10 text-[#5483B3]',
  'Battery Tech': 'bg-purple-50 text-purple-700',
  'Solar Energy': 'bg-amber-50 text-amber-700',
  'Sustainability': 'bg-[#8EB69B]/20 text-[#235347]',
};

export function BlogClient() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? posts : posts.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="relative pt-16 min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832]">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#5483B3]/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#235347]/25 blur-[140px] pointer-events-none" />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl mx-auto">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full border border-white/15 text-white/80 text-xs font-medium mb-7">
              <span className="w-2 h-2 rounded-full bg-[#8EB69B]" />
              SafariCharge Insights
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white mb-6">
              News, Guides, and{' '}
              <span className="bg-gradient-to-r from-[#8EB69B] to-[#C1E8FF] bg-clip-text text-transparent">EV Insights</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/60 leading-relaxed">
              Expert coverage of electric vehicles, charging infrastructure, fleet operations, and clean energy across East Africa.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter chips */}
      <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`relative flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                active === cat
                  ? 'text-white'
                  : 'text-gray-500 hover:text-[#235347] hover:bg-[#f0f7f5]'
              }`}
            >
              {active === cat && (
                <motion.span
                  layoutId="cat-bg"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-[#235347] to-[#052659]"
                  style={{ zIndex: -1 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles + Sidebar */}
      <section className="py-16 bg-[#f8fafb]">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Articles */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="popLayout">
                <motion.div layout className="grid sm:grid-cols-2 gap-6">
                  {filtered.map((post, i) => (
                    <motion.article
                      key={post.slug}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' as const }}
                      whileHover={{ y: -6 }}
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow overflow-hidden group flex flex-col"
                    >
                      <div className={`h-1.5 w-full bg-gradient-to-r ${post.color}`} />
                      <div className="p-6 flex flex-col flex-1">
                        <span className={`self-start text-xs font-semibold px-3 py-1 rounded-full mb-3 ${categoryColors[post.category] ?? 'bg-gray-100 text-gray-600'}`}>
                          {post.category}
                        </span>
                        <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#235347] transition-colors leading-snug flex-1">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                          </div>
                          <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#235347] group/link">
                            Read
                            <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-0.5" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>
              {filtered.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 text-gray-400">
                  No articles in this category yet.
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-7">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-5">Categories</p>
                <div className="space-y-2.5">
                  {categories.slice(1).map((cat) => (
                    <button key={cat} onClick={() => setActive(cat)} className="flex items-center justify-between w-full group">
                      <span className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all group-hover:opacity-80 ${categoryColors[cat] ?? 'bg-gray-100 text-gray-600'}`}>{cat}</span>
                      <span className="text-xs text-gray-400">{posts.filter((p) => p.category === cat).length} articles</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832] rounded-2xl p-7 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[#8EB69B]/15 blur-2xl" />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                    <Mail className="w-5 h-5 text-[#8EB69B]" />
                  </div>
                  <h3 className="text-white font-black text-lg mb-2">Stay Updated</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">Get the latest EV news and sustainability insights from Kenya delivered to your inbox.</p>
                  <Link href="mailto:info@rauell.systems?subject=Newsletter Signup" className="block text-center bg-white text-[#051F20] font-bold text-sm py-3 px-5 rounded-xl hover:bg-[#DAF1DE] transition-colors">
                    Subscribe to Newsletter
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-4">Also Explore</p>
                <Link href="/energy" className="flex items-center gap-4 p-4 rounded-xl bg-[#f8fafb] hover:bg-[#f0f7f5] transition-colors group">
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
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-black text-gray-900 mb-4">Ready to start your EV journey?</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-xl mx-auto mb-8">Join thousands of drivers and fleet operators across Kenya already using SafariCharge.</motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/" className="inline-flex items-center gap-2 h-12 px-8 bg-gradient-to-r from-[#235347] to-[#052659] text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-lg">
                <Zap className="w-4 h-4" />Get Started Free<ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-[#040d1a] text-gray-500 py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center"><Zap className="w-4 h-4 text-white" /></div>
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
