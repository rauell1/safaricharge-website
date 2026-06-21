'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { PublicNav } from '@/components/safari/public-nav';
import {
  Zap, MapPin, Recycle, BarChart3, Shield, Sun, Users,
  CheckCircle, ArrowRight, Activity, TrendingUp, Plug,
} from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function AnimatedCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 2000, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const features = [
  { num: '01', icon: MapPin, title: 'Real-Time Charging Map', desc: 'Find available EV charging stations near you across Kenya. Live availability, pricing, and directions. CCS2, CHAdeMO, Type 2, and Tesla connectors.', highlights: ['Live availability updates', '254+ stations nationwide', '350 kW DC fast charging', 'Smart routing'], color: 'from-[#235347] to-[#163832]' },
  { num: '02', icon: Users, title: 'Fleet Management', desc: 'Manage your entire EV fleet from a single dashboard. Track sessions, costs, and driver behaviour with automated reporting.', highlights: ['Multi-vehicle tracking', 'Cost analytics per driver', 'Automated billing', 'Route optimisation'], color: 'from-[#052659] to-[#141E30]' },
  { num: '03', icon: Recycle, title: 'Battery Repurposing Toolkit', desc: 'Extend the life of used EV batteries. SoH assessment, value estimation, and application matching for stationary storage.', highlights: ['State of Health testing', 'AI value estimator', 'Second-life matching', 'Compliance tracking'], color: 'from-[#5483B3] to-[#7DA0CA]' },
  { num: '04', icon: BarChart3, title: 'AI Data Intelligence', desc: 'AI-powered analytics that predict demand, optimise energy usage, and reduce fleet operating costs.', highlights: ['Demand forecasting', 'Predictive maintenance', 'Grid load optimisation', 'Custom dashboards'], color: 'from-[#8EB69B] to-[#235347]' },
  { num: '05', icon: Shield, title: 'Employee EV Programs', desc: 'Enable workplace EV charging with automated approval workflows, billing, and reimbursement management.', highlights: ['Approval workflows', 'Automated reimbursement', 'Usage reporting', 'Access controls'], color: 'from-[#235347] to-[#052659]' },
  { num: '06', icon: Sun, title: 'SafariCharge Energy', desc: 'Solar panels, hybrid inverters, and lithium battery storage for homes and businesses. Integrated with EV charging.', highlights: ['Jinko N-Type solar panels', 'Deye hybrid inverters', 'Dyness LiFePO4 storage', 'Solar ROI calculator'], color: 'from-[#163832] to-[#235347]' },
];

const tiers = [
  { name: 'Free', price: 'KES 0', period: 'forever', badge: null, border: 'border-gray-200', features: ['Charging map access', 'Session history (30 days)', 'Basic carbon tracking', 'Email support'], cta: 'Get Started', ctaClass: 'border-2 border-[#235347] text-[#235347] hover:bg-[#f0f7f5]' },
  { name: 'Premium', price: 'KES 999', period: 'per month', badge: 'Most Popular', border: 'border-[#235347]', features: ['Everything in Free', 'Battery Repurposing Toolkit', 'Full charging history', 'Carbon certificates', 'Priority support'], cta: 'Start Premium', ctaClass: 'bg-gradient-to-r from-[#235347] to-[#052659] text-white hover:opacity-90' },
  { name: 'Enterprise', price: 'Custom', period: 'contact us', badge: null, border: 'border-[#052659]', features: ['Everything in Premium', 'Fleet management suite', 'AI analytics dashboard', 'Employee EV programs', 'Dedicated account manager', 'API access'], cta: 'Contact Sales', ctaClass: 'bg-gradient-to-r from-[#052659] to-[#141E30] text-white hover:opacity-90' },
];

export function FeaturesClient() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="relative pt-16 min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832]">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#5483B3]/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#235347]/25 blur-[140px] pointer-events-none" />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-28 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl mx-auto">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full border border-white/15 text-white/80 text-xs font-medium mb-7">
              <span className="w-2 h-2 rounded-full bg-[#8EB69B]" />
              Platform Features
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white mb-6">
              Everything You Need for{' '}
              <span className="bg-gradient-to-r from-[#8EB69B] to-[#C1E8FF] bg-clip-text text-transparent">Electric Mobility</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/60 leading-relaxed mb-10">
              Six powerful features, one intelligent platform. From charging infrastructure to solar energy.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
              {['6 Core Features', '254+ Stations', 'AI-Powered Analytics', '24/7 Support'].map((l) => (
                <span key={l} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 text-white/70 text-sm font-medium px-4 py-2 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5 text-[#8EB69B]" />
                  {l}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-[#f8fafb]">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">What We Offer</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Six Pillars of Our Platform</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-2xl mx-auto text-lg">Each feature is built for African roads, climates, and business realities.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {features.map((f) => (
              <motion.div key={f.num} variants={fadeUp} whileHover={{ y: -8 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden flex flex-col cursor-default">
                <div className={`h-1.5 w-full bg-gradient-to-r ${f.color}`} />
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-md`}>
                      <f.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-4xl font-black text-gray-100 leading-none mt-1">{f.num}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">{f.desc}</p>
                  <div className="space-y-2 border-t border-gray-50 pt-5">
                    {f.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#235347] flex-shrink-0" />
                        <span className="text-xs text-gray-600">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why SafariCharge */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Why SafariCharge</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Built Different for Africa</motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed mb-8">
                Most EV platforms are designed for Europe and adapted for Africa. SafariCharge was designed from day one for African power grids, road conditions, and business models.
              </motion.p>
              <motion.div variants={stagger} className="space-y-4">
                {[
                  { title: 'Offline-tolerant architecture', desc: 'Sessions continue even with intermittent connectivity.' },
                  { title: 'M-Pesa and card payments', desc: 'Pay the way Kenya pays, mobile money first.' },
                  { title: 'Solar-integrated charging', desc: 'Stations powered by renewable energy where grid is unreliable.' },
                  { title: 'Swahili and English UI', desc: 'Localised for the East African market.' },
                ].map((item) => (
                  <motion.div key={item.title} variants={fadeUp} className="flex gap-4 p-4 rounded-xl bg-[#f8fafb] border border-gray-100">
                    <div className="w-8 h-8 rounded-lg bg-[#f0f7f5] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[#235347]" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 gap-5">
              {[
                { to: 98, suffix: '.5%', label: 'Network Uptime', icon: TrendingUp, color: 'from-[#235347] to-[#163832]' },
                { to: 350, suffix: ' kW', label: 'Max Charge Speed', icon: Zap, color: 'from-[#052659] to-[#141E30]' },
                { to: 40, suffix: '%', label: 'Cost Reduction', icon: BarChart3, color: 'from-[#5483B3] to-[#7DA0CA]' },
                { to: 24, suffix: '/7', label: 'Monitoring', icon: Activity, color: 'from-[#8EB69B] to-[#235347]' },
              ].map((s) => (
                <motion.div key={s.label} variants={fadeUp} whileHover={{ y: -6 }} className={`bg-gradient-to-br ${s.color} rounded-2xl p-7 text-white shadow-xl cursor-default`}>
                  <s.icon className="w-7 h-7 mb-3 opacity-80" />
                  <p className="text-4xl font-black mb-1"><AnimatedCounter to={s.to} suffix={s.suffix} /></p>
                  <p className="text-white/70 text-sm">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-[#f8fafb]">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Plans</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Simple, Transparent Pricing</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-xl mx-auto text-lg">Start free. Scale as your fleet and energy needs grow.</motion.p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-3 gap-7 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <motion.div key={tier.name} variants={fadeUp} whileHover={{ y: -8 }} className={`bg-white rounded-2xl border-2 ${tier.border} shadow-sm hover:shadow-xl transition-all p-8 flex flex-col relative cursor-default`}>
                {tier.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#235347] to-[#052659] text-white text-xs font-bold px-4 py-1 rounded-full">{tier.badge}</span>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-black text-gray-900 mb-1">{tier.name}</h3>
                  <p className="text-3xl font-black text-gray-900">{tier.price}</p>
                  <p className="text-sm text-gray-400 mt-0.5">{tier.period}</p>
                </div>
                <div className="space-y-3 flex-1 mb-8">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-[#235347] flex-shrink-0" />
                      <span className="text-sm text-gray-600">{f}</span>
                    </div>
                  ))}
                </div>
                <Link href="/" className={`block text-center font-bold py-3 px-6 rounded-xl text-sm transition-all ${tier.ctaClass}`}>{tier.cta}</Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832] relative overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%,rgba(142,182,155,0.5) 0%,transparent 50%),radial-gradient(circle at 70% 50%,rgba(84,131,179,0.5) 0%,transparent 50%)' }} />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black text-white mb-5">Start Your Free Account Today</motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-2xl mx-auto mb-10">No credit card required. Access the charging map, session history, and carbon tracking immediately.</motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="inline-flex items-center gap-2 h-14 px-10 bg-white text-[#051F20] font-bold text-base rounded-xl hover:bg-[#DAF1DE] transition-colors shadow-2xl">
              <Zap className="w-5 h-5" />Get Started Free
            </Link>
            <Link href="mailto:info@rauell.systems" className="inline-flex items-center gap-2 h-14 px-10 bg-transparent text-white font-semibold text-base rounded-xl border-2 border-white/25 hover:bg-white/10 transition-colors">
              Contact Sales
            </Link>
          </motion.div>
        </motion.div>
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
