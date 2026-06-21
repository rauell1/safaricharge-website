'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Zap, MapPin, Recycle, BarChart3, Shield, Users,
  CheckCircle, ArrowRight, Sun, Check
} from 'lucide-react';
import { PublicNav } from '@/components/safari/public-nav';

const features = [
  {
    num: '01',
    id: 'charging-map',
    icon: MapPin,
    title: 'Real-Time Charging Map',
    description:
      'Find available EV charging stations near you across Kenya. Live availability, pricing, and directions, all on one map. CCS2, CHAdeMO, Type 2, and Tesla connectors supported.',
    highlights: ['Live availability updates', '254+ stations nationwide', '350 kW DC fast charging', 'Smart turn-by-turn routing'],
    color: 'from-[#235347] to-[#163832]',
  },
  {
    num: '02',
    id: 'fleet-management',
    icon: Users,
    title: 'Fleet Management',
    description:
      'Manage your entire EV fleet from a single dashboard. Track charging sessions, costs, and driver behaviour in real time with automated reporting and billing.',
    highlights: ['Multi-vehicle tracking', 'Cost analytics per driver', 'Automated billing', 'Route optimisation'],
    color: 'from-[#052659] to-[#141E30]',
  },
  {
    num: '03',
    id: 'battery-repurposing',
    icon: Recycle,
    title: 'Battery Repurposing Toolkit',
    description:
      'Extend the life of used EV batteries with our second-life energy analytics. SoH assessment, value estimation, and application matching for stationary storage.',
    highlights: ['State of Health (SoH) testing', 'AI value estimator', 'Second-life matching', 'Compliance tracking'],
    color: 'from-[#5483B3] to-[#7DA0CA]',
  },
  {
    num: '04',
    id: 'data-intelligence',
    icon: BarChart3,
    title: 'AI Data Intelligence',
    description:
      'AI-powered analytics that predict demand, optimise energy usage, and reduce fleet operating costs. Predictive maintenance alerts before equipment failures occur.',
    highlights: ['Demand forecasting', 'Predictive maintenance', 'Grid load optimisation', 'Custom dashboards'],
    color: 'from-[#8EB69B] to-[#235347]',
  },
  {
    num: '05',
    id: 'employee-programs',
    icon: Shield,
    title: 'Employee EV Programs',
    description:
      'Enable workplace EV charging with automated employee approval workflows, billing, and reimbursement management. Full admin control over access and spending.',
    highlights: ['Approval workflows', 'Automated reimbursement', 'Usage reporting', 'Access controls'],
    color: 'from-[#235347] to-[#052659]',
  },
  {
    num: '06',
    id: 'energy-division',
    icon: Sun,
    title: 'SafariCharge Energy',
    description:
      'Solar panels, hybrid inverters, and lithium battery storage for homes and businesses. Fully integrated with our EV charging ecosystem for complete energy independence.',
    highlights: ['Jinko N-Type solar panels', 'Deye hybrid inverters', 'Dyness LiFePO4 storage', 'Solar ROI calculator'],
    color: 'from-[#163832] to-[#235347]',
  },
];

const comparisonRows = [
  { feature: 'Interactive Charging Map', free: true, premium: true, enterprise: true },
  { feature: 'High-speed DC Charging (350 kW)', free: true, premium: true, enterprise: true },
  { feature: 'Charging History (30 days)', free: true, premium: false, enterprise: false },
  { feature: 'Unlimited Charging History', free: false, premium: true, enterprise: true },
  { feature: 'Carbon Certificates', free: false, premium: true, enterprise: true },
  { feature: 'Battery Health Analytics (SoH)', free: false, premium: true, enterprise: true },
  { feature: 'Fleet Management Dashboard', free: false, premium: false, enterprise: true },
  { feature: 'AI Predictive Optimization', free: false, premium: false, enterprise: true },
  { feature: 'Employee Workplace Programs', free: false, premium: false, enterprise: true },
  { feature: 'API Access & Webhooks', free: false, premium: false, enterprise: true },
  { feature: 'Support Tier', free: 'Email', premium: 'Priority', enterprise: '24/7 Dedicated' },
];

export function FeaturesClient() {
  const [activeTab, setActiveTab] = useState('01');
  const [highlightedTab, setHighlightedTab] = useState<string | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);

  const scrollToFeature = (num: string) => {
    setActiveTab(num);
    setHighlightedTab(num);
    const element = document.getElementById(`feature-${num}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      setHighlightedTab(null);
    }, 1500);
  };

  const getPrice = (tierName: string) => {
    if (tierName === 'Free') return { price: 'KES 0', period: 'forever' };
    if (tierName === 'Premium') {
      return isAnnual
        ? { price: 'KES 7,990', period: 'per year', savings: 'Save KES 3,998!' }
        : { price: 'KES 999', period: 'per month' };
    }
    return { price: 'Custom', period: 'contact us' };
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="relative pt-16 min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832]">
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
            <span className="w-2 h-2 rounded-full bg-[#8EB69B] animate-ping" />
            Innovative Features
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white mb-6">
            E-mobility Platform{' '}
            <span className="bg-gradient-to-r from-[#8EB69B] to-[#C1E8FF] bg-clip-text text-transparent">
              Built for Africa
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            From smart charging networks to solar micro-grids and battery repurposing, explore the features driving Africa's clean energy transition.
          </p>
        </div>
      </section>

      {/* Tabbed Feature Explorer Section */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Feature Explorer</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Explore Our Solutions</h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Fixed Tabs List */}
            <div className="lg:col-span-4 sticky top-24 space-y-2 bg-[#f8fafb] p-4 rounded-3xl border border-gray-100 shadow-sm z-30">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 px-4 py-2 border-b border-gray-200/50 mb-2">Platform Modules</p>
              {features.map((f) => (
                <button
                  key={f.num}
                  onClick={() => scrollToFeature(f.num)}
                  className={`w-full text-left flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 cursor-pointer ${
                    activeTab === f.num
                      ? 'bg-gradient-to-r from-[#235347] to-[#052659] text-white shadow-md font-bold scale-[1.01]'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-950 font-medium'
                  }`}
                >
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                    activeTab === f.num ? 'bg-white/10 text-white' : 'bg-gray-200/60 text-gray-700'
                  }`}>
                    {f.num}
                  </span>
                  <span className="text-sm truncate">{f.title}</span>
                </button>
              ))}
            </div>

            {/* Right Column: Detailed Cards */}
            <div className="lg:col-span-8 space-y-12">
              {features.map((f) => (
                <motion.div
                  key={f.num}
                  id={`feature-${f.num}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: 'easeOut' as const }}
                  className={`bg-white rounded-3xl border p-8 transition-all duration-500 flex flex-col justify-between ${
                    highlightedTab === f.num
                      ? 'ring-4 ring-[#235347]/50 scale-[1.01] shadow-xl'
                      : 'border-gray-100 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg text-white`}>
                        <f.icon className="w-7 h-7" />
                      </div>
                      <span className="text-5xl font-black text-gray-100 leading-none">{f.num}</span>
                    </div>

                    <h3 className="text-2xl font-black text-gray-900 mb-3">{f.title}</h3>
                    <p className="text-gray-500 leading-relaxed mb-6">{f.description}</p>

                    <div className="border-t border-gray-100 pt-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Module Capabilities</p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {f.highlights.map((h) => (
                          <div key={h} className="flex items-center gap-2.5">
                            <div className="w-5 h-5 rounded-full bg-[#f0f7f5] flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3 text-[#235347]" />
                            </div>
                            <span className="text-sm font-semibold text-gray-700">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-semibold">Active Module</span>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#235347] hover:gap-2.5 transition-all"
                    >
                      Access Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with Toggle */}
      <section className="py-24 bg-[#f8fafb] border-t border-b border-gray-100">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Pricing Plans</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Transparent Pricing for Everyone</h2>
            <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed mb-8">
              Choose the package that aligns with your charging needs, fleet size, or business model.
            </p>

            {/* Toggle switch */}
            <div className="inline-flex items-center gap-3 bg-white border border-gray-200 p-1.5 rounded-full shadow-inner">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  !isAnnual ? 'bg-[#235347] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Monthly Billing
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isAnnual ? 'bg-[#235347] text-white shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Annual Billing
                <span className="bg-[#8EB69B]/25 text-[#235347] text-[9px] px-2 py-0.5 rounded-full font-extrabold uppercase">
                  Save 33%
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Free',
                color: 'border-gray-200 bg-white',
                badge: null,
                features: ['Charging map access', 'Session history (30 days)', 'Basic carbon tracking', 'Email support'],
                cta: 'Get Started',
                ctaStyle: 'border-2 border-[#235347] text-[#235347] hover:bg-[#f0f7f5]',
              },
              {
                name: 'Premium',
                color: 'border-[#235347] bg-white ring-2 ring-[#235347]/10',
                badge: 'Most Popular',
                features: ['Everything in Free', 'Battery Repurposing Toolkit', 'Full charging history', 'Carbon certificates', 'Priority support'],
                cta: 'Start Premium',
                ctaStyle: 'bg-gradient-to-r from-[#235347] to-[#052659] text-white hover:opacity-90',
              },
              {
                name: 'Enterprise',
                color: 'border-[#052659] bg-white',
                badge: null,
                features: ['Everything in Premium', 'Fleet management suite', 'AI analytics dashboard', 'Employee EV programs', 'Dedicated account manager', 'API access'],
                cta: 'Contact Sales',
                ctaStyle: 'bg-gradient-to-r from-[#052659] to-[#141E30] text-white hover:opacity-90',
              },
            ].map((t) => {
              const pricing = getPrice(t.name);
              return (
                <div
                  key={t.name}
                  className={`rounded-3xl border ${t.color} p-8 shadow-sm flex flex-col justify-between hover:shadow-lg transition-shadow relative overflow-hidden`}
                >
                  {t.badge && (
                    <span className="absolute top-0 right-0 bg-[#235347] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-xl">
                      {t.badge}
                    </span>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{t.name}</h3>

                    {/* Animated Price Counter wrapper */}
                    <div className="h-16 flex flex-col justify-center mb-6">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={pricing.price}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                        >
                          <p className="text-3xl font-black text-gray-900 leading-none">{pricing.price}</p>
                          <p className="text-xs text-gray-400 font-semibold mt-1.5">{pricing.period}</p>
                        </motion.div>
                      </AnimatePresence>
                      {pricing.savings && (
                        <p className="text-xs text-[#235347] font-bold mt-1">{pricing.savings}</p>
                      )}
                    </div>

                    <ul className="space-y-3.5 border-t border-gray-100 pt-6 mt-6">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <CheckCircle className="w-4 h-4 text-[#235347] mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600 font-medium">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Link
                      href="/"
                      className={`block text-center font-bold py-3.5 px-4 rounded-xl transition-all shadow-sm ${t.ctaStyle}`}
                    >
                      {t.cta}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Feature Comparison</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Detailed Plan Comparison</h2>
          </div>

          <div className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f8fafb] border-b border-gray-100">
                    <th className="p-5 text-sm font-bold text-gray-800">Feature</th>
                    <th className="p-5 text-sm font-bold text-gray-800 text-center">Free</th>
                    <th className="p-5 text-sm font-bold text-gray-800 text-center">Premium</th>
                    <th className="p-5 text-sm font-bold text-gray-800 text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {comparisonRows.map((row) => (
                    <motion.tr
                      key={row.feature}
                      whileHover={{ scale: 1.002, backgroundColor: 'rgba(248, 250, 251, 0.65)' }}
                      className="transition-colors"
                    >
                      <td className="p-5 text-sm font-semibold text-gray-700">{row.feature}</td>
                      <td className="p-5 text-center">
                        {typeof row.free === 'boolean' ? (
                          row.free ? (
                            <Check className="w-5 h-5 text-[#235347] mx-auto" />
                          ) : (
                            <span className="text-gray-300 font-bold">N/A</span>
                          )
                        ) : (
                          <span className="text-xs font-bold text-gray-600">{row.free}</span>
                        )}
                      </td>
                      <td className="p-5 text-center">
                        {typeof row.premium === 'boolean' ? (
                          row.premium ? (
                            <Check className="w-5 h-5 text-[#235347] mx-auto" />
                          ) : (
                            <span className="text-gray-300 font-bold">N/A</span>
                          )
                        ) : (
                          <span className="text-xs font-bold text-[#235347]">{row.premium}</span>
                        )}
                      </td>
                      <td className="p-5 text-center">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? (
                            <Check className="w-5 h-5 text-[#235347] mx-auto" />
                          ) : (
                            <span className="text-gray-300 font-bold">N/A</span>
                          )
                        ) : (
                          <span className="text-xs font-bold text-[#052659]">{row.enterprise}</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8EB69B] mb-4">Get Started</p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">
            Ready to Unlock Premium Features?
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10">
            Transition to electric mobility with smart routing, battery intelligence, and full fleet optimization.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 h-14 px-10 bg-white text-[#051F20] font-bold text-base rounded-xl hover:bg-[#DAF1DE] transition-colors shadow-2xl"
            >
              <Zap className="w-5 h-5" />
              Sign In to Platform
            </Link>
            <Link
              href="mailto:info@rauell.systems"
              className="inline-flex items-center gap-2 h-14 px-10 bg-transparent text-white font-semibold text-base rounded-xl border-2 border-white/25 hover:bg-white/10 transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
