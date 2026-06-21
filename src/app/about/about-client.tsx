'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import {
  Zap, MapPin, Leaf, Shield, TrendingUp, Building2, Sun,
  ArrowRight, Users
} from 'lucide-react';
import { PublicNav } from '@/components/safari/public-nav';
import { AnimatedCounter } from '@/components/safari/animated-counter';

// shared animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const milestones = [
  {
    year: '2024',
    title: 'Founding',
    desc: 'Founded in Nairobi with a vision for clean e-mobility and accessible EV charging across East Africa.',
    icon: Building2,
  },
  {
    year: '2024',
    title: 'First Station Launched',
    desc: 'Commissioned our first 50 kW DC fast-charging hub in Westlands, Nairobi, welcoming early EV adopters.',
    icon: Zap,
  },
  {
    year: '2025',
    title: '100-Station Milestone',
    desc: 'Expanded network to 100+ public charging points across Kiambu, Machakos, Nakuru, and Mombasa.',
    icon: MapPin,
  },
  {
    year: '2026',
    title: 'SafariCharge Energy Launch',
    desc: 'Launched our solar energy and battery repurposing division, offering complete energy independence solutions.',
    icon: Sun,
  },
];

const team = [
  {
    name: 'Roy Okoth',
    role: 'CEO & Co-founder',
    reveal: 'EV infrastructure pioneer with 10+ years in software and power systems, driving the clean mobility transition across East Africa.',
    initials: 'RO',
  },
  {
    name: 'Amina Yusuf',
    role: 'Head of Operations',
    reveal: 'Former smart grid specialist managing network deployment, charging station uptime, and regional utility coordination.',
    initials: 'AY',
  },
  {
    name: 'Carl Martens',
    role: 'Lead Power Systems Engineer',
    reveal: 'Circular energy advocate designing our battery lifecycle repurposing algorithm and hybrid solar micro-grids.',
    initials: 'CM',
  },
];

export function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 800], [0, 400]);

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden">
      <PublicNav />

      {/* Hero with Parallax Grid */}
      <section className="relative pt-16 min-h-[65vh] flex items-center overflow-hidden bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832]">
        <motion.div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            y: gridY,
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
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white mb-6">
            Building Africa's{' '}
            <span className="bg-gradient-to-r from-[#8EB69B] to-[#C1E8FF] bg-clip-text text-transparent">
              Electric Future
            </span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            SafariCharge is the digital and physical backbone of East Africa's clean mobility transition.
            From charging networks to solar energy and battery repurposing, we power what moves the continent.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Our Mission</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Accelerating Africa's Shift to Clean Mobility
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed mb-6">
                We believe Africa's transport future is electric. Our mission is to deploy reliable, affordable,
                and intelligent EV charging infrastructure across Kenya and East Africa, making clean mobility
                accessible to everyone.
              </motion.p>
              <motion.p variants={fadeUp} className="text-gray-500 leading-relaxed mb-8">
                SafariCharge connects electric vehicles with reliable charging points, intelligent routing,
                and distributed energy systems including solar and second-life battery storage. We exist for
                drivers, businesses, and communities from major cities to rural locations where energy access
                is limited.
              </motion.p>
              <motion.div variants={fadeUp}>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#235347] to-[#052659] text-white font-bold px-7 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                >
                  Join the Revolution
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-5"
            >
              {[
                { numericValue: 254, suffix: '+', label: 'Public Charging Points', icon: Zap, color: 'from-[#235347] to-[#163832]' },
                { numericValue: 11, suffix: '', label: 'Counties Covered', icon: MapPin, color: 'from-[#052659] to-[#141E30]' },
                { numericValue: 10, suffix: ' K+', label: 'Active Members', icon: Users, color: 'from-[#5483B3] to-[#7DA0CA]' },
                { numericValue: 98.5, decimals: 1, suffix: '%', label: 'Network Uptime', icon: TrendingUp, color: 'from-[#8EB69B] to-[#235347]' },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className={`bg-gradient-to-br ${s.color} rounded-2xl p-7 text-white shadow-xl`}
                >
                  <s.icon className="w-7 h-7 mb-3 opacity-80" />
                  <p className="text-4xl font-black mb-1">
                    <AnimatedCounter value={s.numericValue} decimals={s.decimals} suffix={s.suffix} />
                  </p>
                  <p className="text-white/70 text-sm">{s.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestone Timeline */}
      <section className="py-24 bg-[#f8fafb]">
        <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Our Roadmap</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Milestones Along the Way</h2>
          </div>

          <div className="relative border-l border-gray-200 ml-4 md:ml-32 py-4 space-y-12">
            {milestones.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' as const }}
                className="relative pl-8 md:pl-12"
              >
                {/* timeline node */}
                <div className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-white border-4 border-[#235347] flex items-center justify-center shadow-md">
                  <m.icon className="w-4 h-4 text-[#235347]" />
                </div>

                <div className="absolute left-[-120px] top-1.5 hidden md:block text-right w-24">
                  <span className="text-2xl font-black text-[#235347]">{m.year}</span>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <span className="inline-block md:hidden text-sm font-bold text-[#235347] mb-1">{m.year}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{m.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Counters */}
      <section className="py-20 bg-gradient-to-r from-[#021024] via-[#052659] to-[#163832] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%,rgba(142,182,155,0.5) 0%,transparent 55%),radial-gradient(circle at 80% 50%,rgba(84,131,179,0.5) 0%,transparent 55%)',
          }}
        />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8EB69B] mb-3">Our Impact</p>
            <h2 className="text-3xl md:text-4xl font-black text-white">Numbers That Define Us</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { numericValue: 12800, suffix: ' t', label: 'CO2 Saved', sub: 'Total fleet emissions offset' },
              { numericValue: 2450, suffix: '+', label: 'Batteries Repurposed', sub: 'Extended to second-life use' },
              { numericValue: 185, suffix: ' MWh', label: 'Energy Repurposed', sub: 'Battery storage deployed' },
              { numericValue: 580, suffix: ' K', label: 'Trees Equivalent', sub: 'Annual carbon absorption' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <p className="text-4xl md:text-5xl font-black text-white mb-1">
                  <AnimatedCounter value={item.numericValue} suffix={item.suffix} />
                </p>
                <p className="text-[#8EB69B] font-bold text-sm mb-1">{item.label}</p>
                <p className="text-white/35 text-xs">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Hover Reveal Card Overlay */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Our Team</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">The Minds Powering SafariCharge</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const }}
                className="relative bg-[#f8fafb] rounded-3xl border border-gray-100 overflow-hidden shadow-sm group min-h-[300px] p-8 flex flex-col justify-between"
              >
                {/* Upper Details */}
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center text-white font-black text-lg shadow-md mb-6">
                    {t.initials}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{t.name}</h3>
                  <p className="text-[#235347] text-sm font-semibold">{t.role}</p>
                </div>

                {/* Floating/Hover Reveal Details Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#052659] to-[#051F20] p-8 flex flex-col justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-20">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#8EB69B] font-bold text-sm mb-4">
                    {t.initials}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-0.5">{t.name}</h3>
                  <p className="text-[#8EB69B] text-xs font-semibold mb-4">{t.role}</p>
                  <p className="text-white/70 text-sm leading-relaxed">{t.reveal}</p>
                </div>

                <div className="text-xs text-gray-400 font-medium pt-4 mt-6 border-t border-gray-100 group-hover:opacity-0 transition-opacity">
                  Hover to view bio
                </div>
              </motion.div>
            ))}
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
            Ready to Join the Revolution?
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10">
            Thousands of drivers, fleet managers, and businesses across East Africa are already
            using SafariCharge to power a cleaner future. Join them today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 h-14 px-10 bg-white text-[#051F20] font-bold text-base rounded-xl hover:bg-[#DAF1DE] transition-colors shadow-2xl"
            >
              <Zap className="w-5 h-5" />
              Sign In to Dashboard
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
