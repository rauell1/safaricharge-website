'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Zap, MapPin, BarChart3, ArrowRight, CheckCircle,
  Leaf, Clock, Cpu, Recycle, Plug, ChevronRight,
  Shield, Building2, Sun, Calculator, Activity,
  FileText, Truck, Wrench, Star, Phone, Mail,
  TrendingUp,
} from 'lucide-react';

interface LandingProps {
  onGetStarted: () => void;
  onNavigate?: (tab: string) => void;
}

/* ── shared animation variants ─────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.1 } },
};

/* ── feature modal data ─────────────────────────────────────── */
interface FeatureDetail {
  title: string;
  description: string;
  icon: React.ElementType;
  gradient: string;
  features: { title: string; description: string; icon: React.ElementType }[];
  stats: { value: string; label: string }[];
  benefits: string[];
}

const featureDetails: Record<string, FeatureDetail> = {
  'charging-network': {
    title: "Kenya's Largest EV Charging Network",
    description:
      "Access 254+ public charging points across 11 counties in Kenya. Our network spans from Nairobi to Mombasa, Kisumu to Eldoret, ensuring you're never far from a reliable charging station.",
    icon: MapPin,
    gradient: 'from-[#235347] to-[#163832]',
    features: [
      { title: 'Real-time Availability', description: 'See which chargers are available before you arrive with live status updates', icon: Activity },
      { title: 'Multi-connector Support', description: 'CCS2, CHAdeMO, Type 2, and Tesla connectors available at various locations', icon: Plug },
      { title: 'High-Speed Charging', description: 'Up to 350 kW DC fast charging for rapid top-ups in 15–30 minutes', icon: Zap },
      { title: 'Smart Routing', description: 'Get directions with distance, duration, and traffic conditions', icon: MapPin },
    ],
    stats: [
      { value: '254+', label: 'Public Chargers' },
      { value: '11', label: 'Counties' },
      { value: '350 kW', label: 'Max Speed' },
      { value: '98.5%', label: 'Uptime' },
    ],
    benefits: [
      '24/7 customer support',
      'Contactless payment',
      'Mobile app integration',
      'Charging history tracking',
      'Carbon footprint reporting',
      'Fleet management tools',
    ],
  },
  'battery-toolkit': {
    title: 'Battery Lifecycle Management',
    description:
      'Complete EV battery repurposing and recycling solution. Evaluate battery health, calculate second-life value, and find optimal applications for used EV batteries.',
    icon: Recycle,
    gradient: 'from-[#052659] to-[#141E30]',
    features: [
      { title: 'SoH Assessment', description: 'Comprehensive State of Health testing and degradation analysis', icon: Activity },
      { title: 'Value Calculator', description: 'AI-powered second-life value estimation based on current capacity', icon: Calculator },
      { title: 'Application Matching', description: 'Find optimal second-life applications: home storage, commercial, off-grid', icon: Building2 },
      { title: 'Compliance Tracking', description: 'UN 38.3, IEC 62660, and ISO 12405 certification management', icon: Shield },
    ],
    stats: [
      { value: '2,450+', label: 'Batteries Processed' },
      { value: '185 M', label: 'kWh Repurposed' },
      { value: '85%', label: 'Material Recovery' },
      { value: '8–10 yr', label: 'Extended Life' },
    ],
    benefits: [
      'Environmental impact certification',
      'Chain of custody documentation',
      'Safety testing & verification',
      'Transportation logistics',
      'Value recovery optimization',
      'Regulatory compliance',
    ],
  },
  'energy-intelligence': {
    title: 'AI-Powered Energy Analytics',
    description:
      'Harness the power of artificial intelligence to optimise your energy usage, predict maintenance needs, and maximise the efficiency of your EV fleet or charging infrastructure.',
    icon: BarChart3,
    gradient: 'from-[#5483B3] to-[#7DA0CA]',
    features: [
      { title: 'Predictive Analytics', description: 'ML models predict usage patterns and optimise charging schedules', icon: TrendingUp },
      { title: 'Grid Integration', description: 'Smart grid communication for load balancing and demand response', icon: Activity },
      { title: 'Fleet Optimisation', description: 'Route planning and charging optimisation for fleet operators', icon: Truck },
      { title: 'Maintenance Alerts', description: 'Predictive maintenance notifications before equipment failure', icon: Wrench },
    ],
    stats: [
      { value: '40%', label: 'Cost Reduction' },
      { value: '25%', label: 'Efficiency Gain' },
      { value: '99.2%', label: 'Prediction Accuracy' },
      { value: '24/7', label: 'Monitoring' },
    ],
    benefits: [
      'Real-time dashboards',
      'Customisable alerts',
      'API integrations',
      'Automated reporting',
      'Energy cost forecasting',
      'Carbon credit tracking',
    ],
  },
  'sustainability': {
    title: 'Carbon Tracking & Sustainability',
    description:
      "Monitor your environmental impact, earn green certificates, and contribute to Kenya's clean energy transition. Every charge makes a difference.",
    icon: Leaf,
    gradient: 'from-[#8EB69B] to-[#235347]',
    features: [
      { title: 'Carbon Calculator', description: 'Real-time CO₂ savings tracking compared to fossil fuel vehicles', icon: Calculator },
      { title: 'Green Certificates', description: 'Downloadable sustainability certificates for corporate reporting', icon: FileText },
      { title: 'Impact Reports', description: 'Monthly and annual environmental impact summaries', icon: BarChart3 },
      { title: 'Tree Equivalents', description: 'Visualise your impact in trees saved and emissions avoided', icon: Leaf },
    ],
    stats: [
      { value: '12,800', label: 'Tons CO₂ Saved' },
      { value: '580 K', label: 'Trees Equivalent' },
      { value: '2.1 M', label: 'Litres Fuel Saved' },
      { value: '100%', label: 'Renewable Options' },
    ],
    benefits: [
      'ESG reporting support',
      'Corporate sustainability goals',
      'Carbon credit generation',
      'Environmental compliance',
      'Public impact dashboard',
      'Green branding assets',
    ],
  },
};

/* ════════════════════════════════════════════════════════════ */
export function Landing({ onGetStarted }: LandingProps) {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (id: string) => { setSelectedFeature(id); setIsModalOpen(true); };
  const featureDetail = selectedFeature ? featureDetails[selectedFeature] : null;

  /* ── data ── */
  const services = [
    {
      id: 'charging-network',
      num: '01',
      icon: MapPin,
      title: 'Charging Network',
      description: "Kenya's largest EV charging network with 254+ points across 11 counties — real-time availability included.",
      color: 'from-[#235347] to-[#163832]',
    },
    {
      id: 'battery-toolkit',
      num: '02',
      icon: Recycle,
      title: 'Battery Repurposing',
      description: 'Full lifecycle management from EV to stationary storage with SoH assessment and second-life matching.',
      color: 'from-[#052659] to-[#141E30]',
    },
    {
      id: 'energy-intelligence',
      num: '03',
      icon: BarChart3,
      title: 'Energy Intelligence',
      description: 'AI-powered analytics for grid optimisation, fleet routing, and predictive maintenance.',
      color: 'from-[#5483B3] to-[#7DA0CA]',
    },
    {
      id: 'sustainability',
      num: '04',
      icon: Leaf,
      title: 'Carbon Tracking',
      description: 'Monitor your environmental impact, earn green certificates, and meet ESG targets.',
      color: 'from-[#8EB69B] to-[#235347]',
    },
  ];

  const stats = [
    { value: '254+', label: 'Public Chargers', icon: Plug },
    { value: '11', label: 'Counties Covered', icon: MapPin },
    { value: '1.2 M+', label: 'kWh Delivered', icon: Zap },
    { value: '98.5%', label: 'Network Uptime', icon: TrendingUp },
  ];

  const steps = [
    {
      num: '01',
      icon: Shield,
      title: 'Create your account',
      description: 'Sign up in under two minutes. Choose a plan that fits — individual driver, business fleet, or energy partner.',
    },
    {
      num: '02',
      icon: MapPin,
      title: 'Find & charge',
      description: 'Open the interactive map, locate the nearest station, navigate there, and start charging with one tap.',
    },
    {
      num: '03',
      icon: BarChart3,
      title: 'Track & optimise',
      description: 'Review charging history, monitor energy costs, measure carbon savings, and optimise your fleet in real time.',
    },
  ];

  const testimonials = [
    {
      quote: "SafariCharge cut our fleet's charging admin from hours to minutes. The real-time map and billing reports are invaluable for our operations team.",
      name: 'Amina Waweru',
      role: 'Fleet Manager',
      company: 'Nairobi Logistics Ltd',
      rating: 5,
    },
    {
      quote: "We deployed repurposed EV batteries for our lodge's solar storage. The SoH toolkit gave us confidence in every battery we selected.",
      name: 'James Kamau',
      role: 'Operations Director',
      company: 'Rift Valley Eco Lodges',
      rating: 5,
    },
    {
      quote: "The carbon tracking certificates have been essential for our ESG reporting. Our investors love the detailed monthly impact summaries.",
      name: 'Grace Odhiambo',
      role: 'Sustainability Lead',
      company: 'East Africa Holdings',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ── NAV ─────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100"
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center shadow-md">
              <Zap className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="leading-none">
              <span className="text-lg font-extrabold bg-gradient-to-r from-[#235347] to-[#052659] bg-clip-text text-transparent">
                SafariCharge
              </span>
              <p className="text-[9px] font-semibold tracking-widest text-[#8EB69B] uppercase">Powering Africa</p>
            </div>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-7">
            {['Network', 'Services', 'How It Works', 'About'].map((label, i) => (
              <a
                key={label}
                href={`#${['network', 'services', 'how-it-works', 'about'][i]}`}
                className="text-sm font-medium text-gray-500 hover:text-[#235347] transition-colors"
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onGetStarted}
              className="hidden md:inline-flex text-[#235347] font-semibold hover:bg-[#f0f7f5]"
            >
              Sign In
            </Button>
            <Button
              onClick={onGetStarted}
              size="sm"
              className="bg-gradient-to-r from-[#235347] to-[#052659] text-white hover:opacity-90 shadow-md font-semibold"
            >
              Get Started
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832]">
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        {/* glow orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#5483B3]/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#235347]/25 blur-[140px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — copy */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full border border-white/15 text-white/80 text-xs font-medium mb-7">
                <span className="w-2 h-2 rounded-full bg-[#8EB69B] animate-pulse" />
                254 live charging stations across Kenya
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-[3.6rem] font-black leading-[1.1] text-white mb-6"
            >
              Africa's Premier{' '}
              <span className="bg-gradient-to-r from-[#8EB69B] to-[#C1E8FF] bg-clip-text text-transparent">
                EV Charging
              </span>
              {' '}&amp;{' '}
              <span className="bg-gradient-to-r from-[#C1E8FF] to-[#8EB69B] bg-clip-text text-transparent">
                Energy Platform
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg text-white/60 leading-relaxed mb-9 max-w-xl"
            >
              Find charging stations, manage fleet energy, repurpose EV batteries, and track your
              carbon footprint — all in one intelligent platform powering East Africa's electric
              mobility revolution.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-10">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="h-13 px-8 bg-white text-[#051F20] hover:bg-[#DAF1DE] font-bold shadow-xl text-base"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById('network')?.scrollIntoView({ behavior: 'smooth' })}
                className="h-13 px-8 bg-transparent text-white border-white/25 hover:bg-white/10 font-semibold text-base"
              >
                Explore Network
              </Button>
            </motion.div>

            {/* trust row */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
              {[
                { icon: Shield, text: 'Enterprise-grade security' },
                { icon: CheckCircle, text: '98.5% network uptime' },
                { icon: Leaf, text: '12,800 t CO₂ saved' },
              ].map(({ icon: Icon, text }) => (
                <span key={text} className="inline-flex items-center gap-1.5 text-xs text-white/50 font-medium">
                  <Icon className="w-3.5 h-3.5 text-[#8EB69B]" />
                  {text}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT — live status panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative bg-white/8 backdrop-blur-xl rounded-3xl border border-white/12 p-7 shadow-2xl">
              {/* header row */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs font-semibold text-white/40 uppercase tracking-widest">Network Status</p>
                  <p className="text-white font-bold text-lg mt-0.5">Live Dashboard</p>
                </div>
                <span className="flex items-center gap-1.5 bg-[#235347]/40 text-[#8EB69B] text-xs font-semibold px-3 py-1 rounded-full border border-[#8EB69B]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8EB69B] animate-pulse" />
                  LIVE
                </span>
              </div>

              {/* station rows */}
              {[
                { name: 'Westlands Hub', city: 'Nairobi', status: 'Available', connectors: 8 },
                { name: 'Garden City Mall', city: 'Nairobi', status: 'In Use', connectors: 6 },
                { name: 'Nakumatt Mega', city: 'Mombasa', status: 'Available', connectors: 4 },
                { name: 'Milimani Station', city: 'Kisumu', status: 'Available', connectors: 3 },
              ].map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center justify-between py-3 border-b border-white/8 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-[#8EB69B]" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold leading-none">{s.name}</p>
                      <p className="text-white/40 text-xs mt-0.5">{s.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-white/40 text-xs">{s.connectors} pts</span>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      s.status === 'Available'
                        ? 'bg-[#235347]/40 text-[#8EB69B]'
                        : 'bg-[#5483B3]/30 text-[#C1E8FF]'
                    }`}>
                      {s.status}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* mini stats */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { value: '247', label: 'Online', color: 'text-[#8EB69B]' },
                  { value: '4', label: 'Charging', color: 'text-[#C1E8FF]' },
                  { value: '3', label: 'Maintenance', color: 'text-white/40' },
                ].map((m) => (
                  <div key={m.label} className="bg-white/6 rounded-xl p-3 text-center">
                    <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
                    <p className="text-white/35 text-xs mt-0.5">{m.label}</p>
                  </div>
                ))}
              </div>

              <Button
                onClick={onGetStarted}
                className="w-full mt-5 bg-gradient-to-r from-[#235347] to-[#052659] text-white font-semibold hover:opacity-90"
              >
                View Full Map
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center justify-center py-8 px-4 text-center"
              >
                <s.icon className="w-5 h-5 text-[#235347] mb-2 opacity-60" />
                <p className="text-3xl font-black bg-gradient-to-r from-[#235347] to-[#052659] bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="text-sm text-gray-500 mt-1 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-[#f8fafb] scroll-mt-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">
              What We Offer
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              A Complete Clean-Mobility Ecosystem
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-2xl mx-auto text-lg">
              From charging infrastructure to battery repurposing and AI analytics — every tool you
              need to lead Africa's electric transition.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((svc, i) => (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                <div className={`h-1.5 w-full bg-gradient-to-r ${svc.color}`} />
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                      <svc.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-4xl font-black text-gray-100 select-none leading-none mt-1">{svc.num}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{svc.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">{svc.description}</p>
                  <button
                    onClick={() => openModal(svc.id)}
                    className="mt-5 flex items-center gap-1 text-sm font-semibold text-[#235347] hover:gap-2 transition-all"
                  >
                    Learn more
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NETWORK ──────────────────────────────────────────── */}
      <section id="network" className="py-24 bg-white scroll-mt-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Our Network</p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-5">
                Charging Infrastructure<br />Across Kenya
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-8">
                From Nairobi to Eldoret, Mombasa to Kisumu — SafariCharge stations are positioned
                at hotels, malls, petrol stations, and business parks across 11 counties.
              </p>
              <div className="space-y-3 mb-9">
                {[
                  'CCS2, CHAdeMO, Type 2 & Tesla connectors',
                  'Up to 350 kW DC fast charging',
                  'Real-time availability on our map',
                  '24/7 remote monitoring & support',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#235347] flex-shrink-0" />
                    <span className="text-gray-600 font-medium">{item}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-[#235347] to-[#052659] text-white font-bold hover:opacity-90 shadow-lg"
              >
                <MapPin className="mr-2 h-4 w-4" />
                View Interactive Map
              </Button>
            </motion.div>

            {/* county grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-3 gap-4"
            >
              {[
                { name: 'Nairobi', stations: 30, color: 'from-[#235347] to-[#163832]' },
                { name: 'Mombasa', stations: 18, color: 'from-[#052659] to-[#141E30]' },
                { name: 'Kiambu', stations: 9, color: 'from-[#5483B3] to-[#7DA0CA]' },
                { name: 'Nakuru', stations: 9, color: 'from-[#8EB69B] to-[#235347]' },
                { name: 'Machakos', stations: 7, color: 'from-[#235347] to-[#8EB69B]' },
                { name: 'Kisumu', stations: 6, color: 'from-[#052659] to-[#5483B3]' },
                { name: 'Eldoret', stations: 5, color: 'from-[#163832] to-[#235347]' },
                { name: 'Laikipia', stations: 4, color: 'from-[#141E30] to-[#052659]' },
                { name: '+3 more', stations: 166, color: 'from-[#235347] to-[#052659]' },
              ].map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 text-center group overflow-hidden relative"
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.color}`} />
                  <p className={`text-2xl font-black bg-gradient-to-r ${c.color} bg-clip-text text-transparent`}>
                    {c.stations}
                  </p>
                  <p className="text-xs font-semibold text-gray-700 mt-1">{c.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">stations</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── IMPACT BAND ──────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-[#021024] via-[#052659] to-[#163832] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%,rgba(142,182,155,0.5) 0%,transparent 55%),radial-gradient(circle at 80% 50%,rgba(84,131,179,0.5) 0%,transparent 55%)' }}
        />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '12,800 t', label: 'CO₂ Saved', sub: 'Total fleet emissions offset' },
              { value: '2,450+', label: 'Batteries Repurposed', sub: 'Extended to second-life use' },
              { value: '185 MWh', label: 'Energy Repurposed', sub: 'Battery storage deployed' },
              { value: '580 K', label: 'Trees Equivalent', sub: 'Annual carbon absorption' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-4xl md:text-5xl font-black text-white mb-1">{item.value}</p>
                <p className="text-[#8EB69B] font-bold text-sm mb-1">{item.label}</p>
                <p className="text-white/35 text-xs">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-[#f8fafb] scroll-mt-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">
              Simple Process
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Up and Running in Minutes
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 max-w-xl mx-auto text-lg">
              Three simple steps from sign-up to your first charge — no complex setup required.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-[3.5rem] left-[25%] right-[25%] h-px bg-gradient-to-r from-[#235347]/20 via-[#8EB69B]/40 to-[#052659]/20" />

            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center hover:shadow-lg transition-shadow"
              >
                {/* number circle */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <span className="absolute top-5 right-5 text-5xl font-black text-gray-100 select-none leading-none">
                  {step.num}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              onClick={onGetStarted}
              className="bg-gradient-to-r from-[#235347] to-[#052659] text-white font-bold hover:opacity-90 shadow-xl px-10 h-12"
            >
              Start for Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">
              Testimonials
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Trusted Across East Africa
            </motion.h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-7">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#f8fafb] rounded-2xl border border-gray-100 p-8 flex flex-col hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-gray-600 leading-relaxed flex-1 text-[0.95rem] italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────── */}
      <section id="about" className="py-24 bg-[#f8fafb] scroll-mt-20">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">About SafariCharge</p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Powering Africa's<br />Electric Mobility Revolution
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-5">
                SafariCharge is building the digital and physical backbone for East Africa's clean-mobility
                transition. Our platform connects electric vehicles with reliable charging points, intelligent
                routing, and distributed energy systems — including solar and second-life battery storage.
              </p>
              <p className="text-gray-500 leading-relaxed mb-9">
                We exist to make clean mobility accessible, affordable, and resilient for drivers, businesses,
                and communities — from major cities to rural locations where energy access is limited.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Building2, text: 'Enterprise fleet solutions' },
                  { icon: Shield, text: 'Regulatory compliance' },
                  { icon: Leaf, text: 'Carbon-neutral operations' },
                  { icon: TrendingUp, text: 'AI-driven optimisation' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#f0f7f5] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#235347]" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              {[
                { title: 'Founded in Nairobi', desc: 'Built for African roads, climate, and business realities — by a team that understands the continent.', icon: MapPin },
                { title: 'Pan-African Vision', desc: 'Starting with Kenya, expanding to East Africa with a roadmap into West and Southern Africa.', icon: Zap },
                { title: 'Backed by Clean Energy', desc: 'Our charging network is progressively integrated with solar and second-life battery storage.', icon: Sun },
              ].map((item, i) => (
                <div key={item.title} className="flex gap-5 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center flex-shrink-0 shadow-md">
                    <item.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ENERGY DIVISION ──────────────────────────────────── */}
      <section className="py-20 bg-[#051F20]">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#235347]/30 via-[#052659]/20 to-[#235347]/10 border border-[#235347]/30 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center flex-shrink-0 shadow-xl">
                <Sun className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-white font-extrabold text-2xl">SafariCharge Energy</span>
                  <Badge className="bg-[#235347] text-[#8EB69B] border-0 text-[10px] font-bold uppercase tracking-widest">New</Badge>
                </div>
                <p className="text-white/50 max-w-lg leading-relaxed">
                  Solar panels, hybrid inverters, and battery storage for African homes and businesses —
                  fully integrated with our EV charging ecosystem.
                </p>
                <div className="flex flex-wrap gap-4 mt-5">
                  {['Jinko Solar Panels', 'Deye Hybrid Inverters', 'Dyness Battery Storage'].map((item) => (
                    <span key={item} className="flex items-center gap-1.5 text-xs text-[#8EB69B] font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <a
              href="/energy"
              className="shrink-0 inline-flex items-center gap-2 bg-gradient-to-r from-[#235347] to-[#052659] hover:opacity-90 text-white font-bold px-8 py-4 rounded-2xl text-sm transition-all hover:-translate-y-0.5 whitespace-nowrap shadow-xl"
            >
              <Sun className="h-4 w-4" />
              Explore Solar Solutions
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832] relative overflow-hidden">
        <div className="absolute inset-0 opacity-15"
          style={{ backgroundImage: 'radial-gradient(circle at 30% 50%,rgba(142,182,155,0.5) 0%,transparent 50%),radial-gradient(circle at 70% 50%,rgba(84,131,179,0.5) 0%,transparent 50%)' }}
        />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#8EB69B] mb-4">
              Get Started Today
            </motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black text-white mb-5">
              Ready to Power Your Journey?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-2xl mx-auto mb-10">
              Join thousands of drivers, fleet managers, and businesses across East Africa already
              using SafariCharge to power a cleaner future.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                onClick={onGetStarted}
                className="h-14 px-10 bg-white text-[#051F20] hover:bg-[#DAF1DE] font-bold text-base shadow-2xl"
              >
                <Zap className="w-5 h-5 mr-2" />
                Sign In to Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-10 bg-transparent text-white border-2 border-white/25 hover:bg-white/10 font-semibold text-base"
                asChild
              >
                <a href="mailto:info@rauell.systems">Contact Sales</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="bg-[#040d1a] text-gray-500 py-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* brand col */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center">
                  <Zap className="w-4.5 h-4.5 text-white" />
                </div>
                <span className="text-white font-extrabold text-lg">SafariCharge</span>
              </div>
              <p className="text-sm leading-relaxed mb-5 max-w-xs">
                Building the backbone for East Africa's clean-mobility transition — charging
                networks, battery repurposing, and solar energy in one platform.
              </p>
              <div className="space-y-2 text-sm">
                <a href="mailto:info@rauell.systems" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#235347]" />
                  info@rauell.systems
                </a>
                <a href="tel:+254700000000" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#235347]" />
                  +254 700 000 000
                </a>
              </div>
            </div>

            {/* link cols */}
            {[
              {
                heading: 'Platform',
                links: [
                  { label: 'Charging Map', action: () => openModal('charging-network') },
                  { label: 'Battery Toolkit', action: () => openModal('battery-toolkit') },
                  { label: 'Analytics', action: () => openModal('energy-intelligence') },
                  { label: 'Sustainability', action: () => openModal('sustainability') },
                ],
              },
              {
                heading: 'Energy',
                links: [
                  { label: 'Solar Panels', href: '/energy' },
                  { label: 'Hybrid Inverters', href: '/energy' },
                  { label: 'Battery Storage', href: '/energy' },
                  { label: 'Solar Calculator', href: '/energy' },
                ],
              },
              {
                heading: 'Company',
                links: [
                  { label: 'About Us', href: '#about' },
                  { label: 'Careers', href: '#' },
                  { label: 'Press', href: '#' },
                  { label: 'Contact', href: 'mailto:info@rauell.systems' },
                ],
              },
            ].map((col) => (
              <div key={col.heading}>
                <h3 className="text-white text-xs font-bold uppercase tracking-widest mb-4">{col.heading}</h3>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {'action' in l ? (
                        <button
                          onClick={l.action}
                          className="text-sm hover:text-white transition-colors"
                        >
                          {l.label}
                        </button>
                      ) : (
                        <a href={l.href} className="text-sm hover:text-white transition-colors">
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">© 2026 SafariCharge · Rauell Systems. All rights reserved.</p>
            <div className="flex gap-6 text-xs">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── MOBILE STICKY CTA ────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur border-t border-gray-100 md:hidden z-50 shadow-lg">
        <Button
          onClick={onGetStarted}
          className="w-full bg-gradient-to-r from-[#235347] to-[#052659] text-white h-12 font-bold shadow-lg"
        >
          <Zap className="w-4 h-4 mr-2" />
          Get Started Free
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* ── FEATURE MODAL ────────────────────────────────────── */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          {featureDetail && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${featureDetail.gradient} shadow-lg flex-shrink-0`}>
                    <featureDetail.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-black text-gray-900">{featureDetail.title}</DialogTitle>
                    <DialogDescription className="text-gray-500 mt-1.5 text-sm leading-relaxed">
                      {featureDetail.description}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-7 mt-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {featureDetail.stats.map((s) => (
                    <div key={s.label} className="text-center p-4 rounded-xl bg-[#f8fafb] border border-gray-100">
                      <p className="text-xl font-black bg-gradient-to-r from-[#235347] to-[#052659] bg-clip-text text-transparent">{s.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Key Features</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {featureDetail.features.map((f) => (
                      <div key={f.title} className="flex gap-3 p-4 rounded-xl bg-[#f8fafb] border border-gray-100 hover:border-[#235347]/20 transition-colors">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${featureDetail.gradient} flex-shrink-0`}>
                          <f.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{f.title}</p>
                          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{f.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Benefits</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                    {featureDetail.benefits.map((b) => (
                      <div key={b} className="flex items-center gap-2 p-3 rounded-lg bg-[#f0f7f5]">
                        <CheckCircle className="w-3.5 h-3.5 text-[#235347] flex-shrink-0" />
                        <span className="text-xs text-gray-600">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={onGetStarted}
                  className="w-full bg-gradient-to-r from-[#235347] to-[#052659] text-white font-bold hover:opacity-90"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
