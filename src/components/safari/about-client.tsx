'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { PublicNav } from '@/components/safari/public-nav';
import {
  Zap, MapPin, Leaf, Shield, TrendingUp, Building2, Sun,
  CheckCircle, ArrowRight, Users, Globe, Recycle, Mail,
} from 'lucide-react';
import { Logo } from '@/components/ui/logo';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function AnimatedCounter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const duration = 2000;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const milestones = [
  { year: '2019', title: 'Founded in Nairobi', desc: 'SafariCharge was incorporated with a mission to build EV charging infrastructure across East Africa.', color: 'from-[#235347] to-[#163832]' },
  { year: '2020', title: 'First 10 Stations Deployed', desc: 'Initial deployment of 10 public charging points across Nairobi and Kiambu counties.', color: 'from-[#052659] to-[#141E30]' },
  { year: '2022', title: '100-Station Milestone', desc: 'Expanded to 100 stations across 5 counties with CCS2, CHAdeMO, and Type 2 connectors.', color: 'from-[#5483B3] to-[#7DA0CA]' },
  { year: '2023', title: 'Fleet Management Platform', desc: 'Launched our SaaS fleet management dashboard used by logistics companies and public transport operators.', color: 'from-[#8EB69B] to-[#235347]' },
  { year: '2024', title: 'Battery Repurposing Division', desc: 'Opened our battery lifecycle lab to assess, repurpose, and redeploy used EV batteries for stationary storage.', color: 'from-[#235347] to-[#052659]' },
  { year: '2025', title: 'SafariCharge Energy Launched', desc: 'Launched our solar and battery storage division, integrating clean energy with our EV ecosystem.', color: 'from-[#163832] to-[#235347]' },
];

const values = [
  { icon: Shield, title: 'Reliability First', desc: '98.5% network uptime backed by 24/7 remote monitoring and rapid response teams.', num: '01', color: 'from-[#235347] to-[#163832]' },
  { icon: Zap, title: 'Intelligent Innovation', desc: 'AI-powered analytics, predictive maintenance, and smart grid integration in every layer.', num: '02', color: 'from-[#052659] to-[#141E30]' },
  { icon: Leaf, title: 'Environmental Impact', desc: '12,800 tons of CO2 avoided. Every decision is measured against its carbon outcome.', num: '03', color: 'from-[#8EB69B] to-[#235347]' },
  { icon: Globe, title: 'African-First', desc: 'Built in Nairobi for African roads, climate, grids, and business realities.', num: '04', color: 'from-[#5483B3] to-[#7DA0CA]' },
];

const builds = [
  { icon: MapPin, title: 'Public and Private EV Charging', desc: '254+ stations across 11 counties with 350 kW DC fast charging and real-time availability.', color: 'from-[#235347] to-[#163832]' },
  { icon: Users, title: 'Fleet Management Software', desc: 'Full EV fleet management for operators: session tracking, cost analysis, and driver management.', color: 'from-[#052659] to-[#141E30]' },
  { icon: Recycle, title: 'Battery Repurposing Toolkit', desc: 'SoH assessment, second-life value calculation, and application matching for used EV batteries.', color: 'from-[#5483B3] to-[#7DA0CA]' },
  { icon: TrendingUp, title: 'AI-Powered Energy Analytics', desc: 'Predictive demand models, maintenance alerts, and grid load optimisation.', color: 'from-[#8EB69B] to-[#235347]' },
  { icon: Sun, title: 'Solar Energy Division', desc: 'Jinko panels, Deye hybrid inverters, and Dyness lithium storage for homes and businesses.', color: 'from-[#235347] to-[#052659]' },
  { icon: Building2, title: 'Enterprise EV Programs', desc: 'Workplace charging with automated approval workflows, billing, and reimbursement.', color: 'from-[#163832] to-[#235347]' },
];

export function AboutClient() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="relative pt-16 min-h-[65vh] flex items-center overflow-hidden bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832]">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#5483B3]/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#235347]/25 blur-[140px] pointer-events-none" />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl mx-auto text-center">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full border border-white/15 text-white/80 text-xs font-medium mb-7">
              <span className="w-2 h-2 rounded-full bg-[#8EB69B]" />
              Our Story
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white mb-6">
              Building Africa's{' '}
              <span className="bg-gradient-to-r from-[#8EB69B] to-[#C1E8FF] bg-clip-text text-transparent">Electric Future</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/60 leading-relaxed mb-10">
              SafariCharge is the digital and physical backbone of East Africa's clean-mobility transition.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
              {['254+ Charging Points', '11 Counties', '12,800 t CO2 Saved'].map((label) => (
                <span key={label} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 text-white/70 text-sm font-medium px-4 py-2 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5 text-[#8EB69B]" />
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Our Mission</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900 mb-6">Accelerating Africa's Shift to Clean Mobility</motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed mb-6">
                We believe Africa's transport future is electric. Our mission is to deploy reliable, affordable,
                and intelligent EV charging infrastructure across Kenya and East Africa.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-8">
                SafariCharge connects electric vehicles with reliable charging points, intelligent routing,
                and distributed energy systems including solar and second-life battery storage.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#235347] to-[#052659] text-white font-bold px-7 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg">
                  Join the Revolution
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-2 gap-5"
            >
              {[
                { num: 254, suffix: '+', label: 'Charging Points', icon: Zap, color: 'from-[#235347] to-[#163832]' },
                { num: 11, suffix: '', label: 'Counties Covered', icon: MapPin, color: 'from-[#052659] to-[#141E30]' },
                { num: 10, suffix: 'K+', label: 'Active Members', icon: Users, color: 'from-[#5483B3] to-[#7DA0CA]' },
                { num: 98, suffix: '.5%', label: 'Network Uptime', icon: TrendingUp, color: 'from-[#8EB69B] to-[#235347]' },
              ].map((s) => (
                <motion.div key={s.label} variants={fadeUp} whileHover={{ y: -6 }} className={`bg-gradient-to-br ${s.color} rounded-2xl p-7 text-white shadow-xl cursor-default`}>
                  <s.icon className="w-7 h-7 mb-3 opacity-80" />
                  <p className="text-4xl font-black mb-1">
                    <AnimatedCounter to={s.num} suffix={s.suffix} />
                  </p>
                  <p className="text-white/70 text-sm">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#f8fafb]">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Our Values</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900">What Drives Everything We Build</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <motion.div key={v.title} variants={fadeUp} whileHover={{ y: -8 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow overflow-hidden cursor-default">
                <div className={`h-1.5 w-full bg-gradient-to-r ${v.color}`} />
                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center shadow-md`}>
                      <v.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-4xl font-black text-gray-100 leading-none">{v.num}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Band */}
      <section className="py-20 bg-gradient-to-r from-[#021024] via-[#052659] to-[#163832] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%,rgba(142,182,155,0.5) 0%,transparent 55%),radial-gradient(circle at 80% 50%,rgba(84,131,179,0.5) 0%,transparent 55%)' }} />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#8EB69B] mb-3">Our Impact</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-white">Numbers That Define Us</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { to: 12800, suffix: ' t', label: 'CO2 Saved', sub: 'Total fleet emissions offset' },
              { to: 2450, suffix: '+', label: 'Batteries Repurposed', sub: 'Extended to second-life use' },
              { to: 185, suffix: ' MWh', label: 'Energy Stored', sub: 'Battery storage deployed' },
              { to: 580, suffix: 'K', label: 'Trees Equivalent', sub: 'Annual carbon absorption' },
            ].map((item) => (
              <motion.div key={item.label} variants={fadeUp}>
                <p className="text-4xl md:text-5xl font-black text-white mb-1">
                  <AnimatedCounter to={item.to} suffix={item.suffix} />
                </p>
                <p className="text-[#8EB69B] font-bold text-sm mb-1">{item.label}</p>
                <p className="text-white/35 text-xs">{item.sub}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Our Journey</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900">Six Years, Six Milestones</motion.h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-px bg-gray-200 hidden md:block" />
            <div className="space-y-12">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: 'easeOut' as const }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow p-7 inline-block w-full ${i % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      <span className={`inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r ${m.color} text-white mb-3`}>{m.year}</span>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{m.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <div className={`hidden md:flex w-10 h-10 rounded-full bg-gradient-to-br ${m.color} items-center justify-center shadow-lg flex-shrink-0 z-10`}>
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-24 bg-[#f8fafb]">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">What We Build</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900 mb-4">A Complete Clean-Mobility Ecosystem</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {builds.map((item) => (
              <motion.div key={item.title} variants={fadeUp} whileHover={{ y: -6 }} className="flex gap-5 bg-white rounded-2xl border border-gray-100 p-7 hover:shadow-md transition-shadow cursor-default">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-md mt-0.5`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832] relative overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%,rgba(142,182,155,0.5) 0%,transparent 50%),radial-gradient(circle at 70% 50%,rgba(84,131,179,0.5) 0%,transparent 50%)' }} />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#8EB69B] mb-4">Get Started</motion.p>
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black text-white mb-5">Ready to Join the Revolution?</motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-2xl mx-auto mb-10">
            Thousands of drivers, fleet managers, and businesses across East Africa are already using SafariCharge.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="inline-flex items-center gap-2 h-14 px-10 bg-white text-[#051F20] font-bold text-base rounded-xl hover:bg-[#DAF1DE] transition-colors shadow-2xl">
              <Logo className="w-5 h-5" />
              Sign In to Dashboard
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
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center">
              <Logo className="w-5 h-5 text-white" />
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
