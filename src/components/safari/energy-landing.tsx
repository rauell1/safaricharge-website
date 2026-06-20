'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sun,
  Zap,
  Leaf,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';

// ── Animated counter ────────────────────────────────────────────
function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
}: {
  target: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const step = Math.ceil(target / (duration / 16));
          let current = 0;
          const timer = setInterval(() => {
            current = Math.min(current + step, target);
            setCount(current);
            if (current >= target) clearInterval(timer);
          }, 16);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// ── FAQ Item ────────────────────────────────────────────────────
function FaqItem({ question, children }: { question: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left font-semibold text-foreground hover:text-primary transition-colors gap-4"
      >
        <span>{question}</span>
        {open ? <ChevronUp className="h-5 w-5 shrink-0 text-primary" /> : <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />}
      </button>
      {open && (
        <div className="pb-5 text-muted-foreground leading-relaxed text-sm">{children}</div>
      )}
    </div>
  );
}

// ── Solar Calculator ─────────────────────────────────────────────
function SolarCalculator() {
  const [bill, setBill] = useState(15000);
  const [size, setSize] = useState(5);
  const [battery, setBattery] = useState(10);

  const systemCostPerKwp = 185000;
  const batteryCostPerKwh = 25000;
  const savingsRatio = 0.75;
  const co2PerKwh = 0.55;

  const annualGeneration = size * 1600;
  const annualSavings = Math.min(bill * 12 * savingsRatio, annualGeneration * 18);
  const monthlySavings = Math.round(annualSavings / 12);
  const systemCost = size * systemCostPerKwp + battery * batteryCostPerKwh;
  const payback = annualSavings > 0 ? (systemCost / annualSavings).toFixed(1) : '—';
  const co2 = Math.round(annualGeneration * co2PerKwh);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-6">
        <div>
          <label className="flex justify-between text-sm font-semibold text-foreground mb-2">
            <span>Monthly Electricity Bill</span>
            <span className="text-primary">KES {bill.toLocaleString()}</span>
          </label>
          <input
            type="range"
            min={0}
            max={100000}
            step={500}
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
            className="w-full accent-[#235347]"
          />
        </div>
        <div>
          <label className="flex justify-between text-sm font-semibold text-foreground mb-2">
            <span>System Size</span>
            <span className="text-primary">{size} kWp</span>
          </label>
          <input
            type="range"
            min={1}
            max={50}
            step={1}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-[#235347]"
          />
        </div>
        <div>
          <label className="flex justify-between text-sm font-semibold text-foreground mb-2">
            <span>Battery Storage</span>
            <span className="text-primary">{battery} kWh</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={battery}
            onChange={(e) => setBattery(Number(e.target.value))}
            className="w-full accent-[#235347]"
          />
        </div>
        <a
          href="mailto:energy@safaricharge.co.ke?subject=Solar Quote Request"
          className="inline-flex items-center gap-2 bg-[#235347] hover:bg-[#163832] text-white font-bold px-6 py-3 rounded-full transition-all hover:-translate-y-0.5 text-sm"
        >
          Get a Real Quote <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="bg-gradient-to-br from-[#235347] to-[#052659] rounded-2xl p-6 text-white space-y-4">
        {[
          { label: 'Monthly Savings', value: `KES ${monthlySavings.toLocaleString()}` },
          { label: 'Annual Savings', value: `KES ${Math.round(annualSavings).toLocaleString()}` },
          { label: 'Payback Period', value: `${payback} yrs` },
          { label: 'CO₂ Avoided / Year', value: `${co2.toLocaleString()} kg` },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between border-b border-white/20 pb-3 last:border-0 last:pb-0">
            <span className="text-white/70 text-sm">{item.label}</span>
            <span className="font-bold text-lg">{item.value}</span>
          </div>
        ))}
        <p className="text-white/50 text-xs pt-1">
          Estimates only. Actual savings depend on your usage profile and site conditions.
        </p>
      </div>
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────
export function EnergyLanding() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { href: '#products', label: 'Products' },
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── NAV ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-background/95 backdrop-blur border-b border-border shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#235347] to-[#052659] shadow-md">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-base font-bold bg-gradient-to-r from-[#235347] to-[#052659] bg-clip-text text-transparent">
                SafariCharge
              </span>
              <span className="text-[10px] font-semibold text-primary tracking-widest">ENERGY</span>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-foreground/70 hover:text-primary hover:bg-secondary transition-all"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              ← SafariCharge App
            </Link>
            <a
              href="#contact"
              className="bg-[#235347] hover:bg-[#163832] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle menu"
          >
            {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {navOpen && (
          <div className="md:hidden bg-background border-b border-border px-4 py-4 flex flex-col gap-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setNavOpen(false)}
                className="py-2.5 px-3 rounded-lg text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary transition-all"
              >
                {l.label}
              </a>
            ))}
            <hr className="border-border my-1" />
            <Link href="/" className="py-2.5 px-3 text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Back to SafariCharge
            </Link>
            <a
              href="#contact"
              onClick={() => setNavOpen(false)}
              className="mt-1 bg-[#235347] text-white text-sm font-bold px-5 py-3 rounded-full text-center"
            >
              Get a Quote
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #051F20 0%, #235347 50%, #052659 100%)',
        }}
      >
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#235347]/30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#052659]/40 blur-3xl" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-20">
          <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm text-xs font-semibold tracking-widest uppercase">
            <Sun className="h-3.5 w-3.5 mr-1.5" />
            SafariCharge Energy Division
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Powering Africa<br />
            <span className="bg-gradient-to-r from-[#8EB69B] to-[#C1E8FF] bg-clip-text text-transparent">
              with Clean Solar Energy
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Premium solar panels, hybrid inverters, and lithium battery storage — engineered for Africa&apos;s homes, businesses, and communities. Integrated with SafariCharge&apos;s EV charging ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-[#235347] font-bold px-8 py-4 rounded-full text-base hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-xl"
            >
              Explore Products <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={`https://wa.me/254704612435?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20SafariCharge%20Energy%20solar%20solutions`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold px-8 py-4 rounded-full text-base border border-white/20 transition-all hover:-translate-y-0.5"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 animate-bounce">
          <span className="text-xs font-medium tracking-widest uppercase">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-gradient-to-r from-[#235347] to-[#052659] py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { target: 600, suffix: '+', label: 'kWp Installed' },
            { target: 5, suffix: '', label: 'Reference Projects' },
            { target: 330, suffix: '+', label: 'kWh Storage Deployed' },
            { target: 0, suffix: 'g', label: 'CO₂ per kWh Generated' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold mb-1">
                <AnimatedCounter target={s.target} suffix={s.suffix} />
              </div>
              <div className="text-white/70 text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Who We Are</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">
              Integrated Energy Solutions<br className="hidden sm:block" /> for the African Market
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-base leading-relaxed">
              Energy and mobility go hand in hand. SafariCharge Energy delivers scalable, reliable solar solutions that work seamlessly with our EV charging ecosystem — from powering your home EV charger to large commercial operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sun,
                title: 'Cutting-Edge Technology',
                desc: 'N-Type TOPCon bifacial panels, hybrid inverters with built-in MPPT, and LiFePO₄ battery chemistry — the best components available.',
              },
              {
                icon: Leaf,
                title: 'Built for Africa',
                desc: 'Designed for equatorial sun, high ambient temperatures, and off-grid reliability. Every system is sized and commissioned for your specific site.',
              },
              {
                icon: Zap,
                title: 'EV-Ready Integration',
                desc: "Pairs natively with SafariCharge's EV charging infrastructure and fleet management software for a complete clean-energy ecosystem.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-card p-7 hover:border-primary/40 hover:shadow-md transition-all group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#235347]/15 to-[#052659]/15 mb-5 group-hover:from-[#235347]/25 group-hover:to-[#052659]/25 transition-all">
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="py-24 bg-[#051F20]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase text-[#8EB69B] mb-3">Our Products</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Premium Solar Components</h2>
            <p className="text-white/60 max-w-xl mx-auto text-base">
              High-quality panels, inverters, and batteries — the building blocks of every SafariCharge Energy system.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                image: '/energy/products/jinko_panel_new.png',
                brand: 'Jinko Solar',
                name: 'Bifacial Solar Panels',
                range: '585W & 620W',
                desc: 'Tier-1 N-Type TOPCon panels with dual-sided power generation. 30-year linear performance warranty. Higher energy yield from the same roof area.',
                features: [
                  '30-year linear performance warranty',
                  'Dual-sided power generation',
                  'Built to last a lifetime',
                ],
                reverse: false,
              },
              {
                image: '/energy/products/deye_inverter.png',
                brand: 'Deye',
                name: 'Hybrid Inverters',
                range: '5kW, 8kW & 10kW (Single & 3-Phase)',
                desc: 'All-in-one hybrid inverter supporting on-grid and off-grid modes with built-in MPPT charge controller. Parallel operation for larger systems.',
                features: [
                  'On-grid & off-grid modes',
                  'Built-in MPPT charge controller',
                  'Parallel operation supported',
                ],
                reverse: true,
              },
              {
                image: '/energy/products/dyness_battery_new.png',
                brand: 'Dyness',
                name: 'Lithium Battery Storage',
                range: '5.12kWh & 10.24kWh',
                desc: 'LiFePO₄ chemistry with 6,000+ cycles at 90% DoD. Modular design, scalable up to 50 units in parallel. Wall or floor mounting.',
                features: [
                  '6,000+ cycle life at 90% DoD',
                  'Modular, scalable design',
                  'Wall or floor mounting',
                ],
                reverse: false,
              },
            ].map((p) => (
              <div
                key={p.name}
                className={`flex flex-col ${p.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 items-center`}
              >
                <div className="w-full md:w-1/2 rounded-2xl overflow-hidden bg-[#1a2e2a] border border-white/10 flex items-center justify-center p-8 min-h-[260px]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={400}
                    height={300}
                    className="object-contain max-h-56 w-auto"
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <p className="text-xs font-bold tracking-widest uppercase text-[#8EB69B] mb-2">{p.brand}</p>
                  <h3 className="text-2xl font-extrabold text-white mb-1">{p.name}</h3>
                  <p className="text-white/50 text-sm mb-4 font-medium">{p.range}</p>
                  <p className="text-white/70 text-sm leading-relaxed mb-5">{p.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                        <CheckCircle className="h-4 w-4 text-[#8EB69B] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="mailto:energy@safaricharge.co.ke?subject=Product Enquiry"
                    className="inline-flex items-center gap-2 bg-[#235347] hover:bg-[#2d6b5c] text-white text-sm font-bold px-6 py-3 rounded-full transition-all hover:-translate-y-0.5"
                  >
                    Get Pricing <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              href="mailto:energy@safaricharge.co.ke?subject=Full System Quote"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-bold px-8 py-4 rounded-full transition-all hover:-translate-y-0.5 text-sm"
            >
              Build Your System & Get a Quote <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Our Work</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">Reference Projects</h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base">
              From Nairobi rooftops to off-grid camps deep in the Maasai Mara — see how we power businesses and communities across Kenya.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                image: '/energy/projects/safari-park.png',
                tag: 'Grid-Tied',
                tagColor: 'bg-[#235347]',
                name: 'Nairobi Commercial Park',
                location: 'Nairobi, Kenya',
                desc: '55.78kWp grid-tied solar PV system with Jinko 575W panels and SMA Sunny Tripower Core inverters.',
                meta: { date: 'Aug 2021', capacity: '55.78kWp' },
              },
              {
                image: '/energy/projects/Emboo River.jpg',
                tag: 'Off-Grid',
                tagColor: 'bg-[#052659]',
                name: 'Emboo River Camp',
                location: 'Maasai Mara, Kenya',
                desc: '64.31kWp off-grid system with 153.6kWh lithium-ion battery storage, powering a luxury eco-camp in the Mara.',
                meta: { date: 'Jan 2023', capacity: '153.6kWh' },
              },
              {
                image: '/energy/projects/Sekanani Camp1.png',
                tag: 'Off-Grid',
                tagColor: 'bg-[#052659]',
                name: 'Sekanani Camp',
                location: 'Maasai Mara, Kenya',
                desc: '10.34kWp off-grid system with 25.6kWh battery storage, eliminating diesel generator reliance entirely.',
                meta: { date: 'Nov 2022', capacity: '25.6kWh' },
              },
              {
                image: '/energy/projects/Carton Manufacturers.jpg',
                tag: 'Commercial',
                tagColor: 'bg-[#235347]',
                name: 'Carton Manufacturers',
                location: 'Nairobi, Kenya',
                desc: '403kWp rooftop industrial solar installation reducing energy costs by 60% for a large manufacturing facility.',
                meta: { date: 'Mar 2022', capacity: '403kWp' },
              },
              {
                image: '/energy/projects/Carl Martens.png',
                tag: 'Hybrid',
                tagColor: 'bg-[#235347]',
                name: 'Carl Martens Estate',
                location: 'Ukunda, Kwale',
                desc: '10.45kWp system with 15.36kWh battery storage, providing clean and reliable power to a coastal residential property.',
                meta: { date: 'Jun 2023', capacity: '10.45kWp' },
              },
            ].map((proj) => (
              <div key={proj.name} className="rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all group">
                <div className="relative h-48 bg-muted overflow-hidden">
                  <Image
                    src={proj.image}
                    alt={proj.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className={`absolute top-3 left-3 ${proj.tagColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                    {proj.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-foreground mb-1">{proj.name}</h3>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <MapPin className="h-3.5 w-3.5" /> {proj.location}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{proj.desc}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" /> {proj.meta.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-3.5 w-3.5" /> {proj.meta.capacity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-[#051F20]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase text-[#8EB69B] mb-3">Client Stories</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">What Our Clients Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  '"Our manufacturing facility saw energy bills drop by 60% and zero downtime since installation. The ROI has been exceptional."',
                name: 'James Mwangi',
                role: 'CEO, Carton Manufacturers',
              },
              {
                quote:
                  '"No more generator noise — just clean, reliable power that impresses our guests and protects the environment."',
                name: 'Loic Amado',
                role: 'Camp Manager, Emboo River',
              },
              {
                quote:
                  '"Our health clinic now operates 24/7. Critical equipment never loses power. Patient outcomes have measurably improved."',
                name: 'Dr. Peter Omondi',
                role: 'Medical Director, Rural Health Clinic',
              },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl bg-white/5 border border-white/10 p-7 hover:border-[#8EB69B]/30 transition-all">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed mb-6 italic">{t.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#235347] text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/50 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about going solar with SafariCharge Energy.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card px-6">
            <FaqItem question="How much does a solar system cost?">
              System cost depends on energy needs, system size, and battery requirements. Residential hybrid systems typically start from KES 250,000, while commercial systems range from KES 500,000 upwards. Contact us for a customised estimate.
            </FaqItem>
            <FaqItem question="What warranties do you offer?">
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Solar panels: 30-year linear performance warranty</li>
                <li>Dyness batteries: 10-year warranty</li>
                <li>Deye inverters: 5-year warranty</li>
                <li>Installation workmanship: 1-year warranty</li>
              </ul>
            </FaqItem>
            <FaqItem question="How long does installation take?">
              <ul className="list-disc list-inside space-y-1 mt-1">
                <li>Residential systems: 1 to 3 days</li>
                <li>Commercial systems: 1 to 6 weeks</li>
                <li>Large-scale projects: 4 to 12 weeks</li>
              </ul>
              <p className="mt-2">We provide a detailed timeline during the design approval stage.</p>
            </FaqItem>
            <FaqItem question="Do solar panels require maintenance?">
              Solar systems are low-maintenance. We recommend panel cleaning 2–4 times per year, a visual inspection every 6 months, and a professional system check every 2–3 years. We offer affordable maintenance packages.
            </FaqItem>
            <FaqItem question="Can I go completely off-grid?">
              Yes. With correct sizing and sufficient battery storage you can achieve full energy independence. Our team will assess your load profile, peak demand, and location to design a system that covers night-time and cloudy days.
            </FaqItem>
            <FaqItem question="Can I charge my EV with my solar system?">
              Absolutely — that&apos;s what makes SafariCharge Energy unique. Your solar installation can power a home or commercial EV charger, and we will design the system to handle both household loads and vehicle charging simultaneously.
            </FaqItem>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="py-24 bg-secondary/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Solar ROI</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">Calculate Your Solar Savings</h2>
            <p className="text-muted-foreground">Estimate how much you could save with a SafariCharge Energy solar installation.</p>
          </div>
          <SolarCalculator />
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section className="py-20 bg-gradient-to-r from-[#235347] to-[#052659]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Ready to Power Your World Sustainably?</h2>
            <p className="text-white/70">Let&apos;s design a solar system that fits your home, business, or community.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#235347] font-bold px-7 py-3.5 rounded-full text-sm hover:bg-white/90 transition-all hover:-translate-y-0.5"
            >
              Get a Free Consultation
            </a>
            <a
              href="tel:+254704612435"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-bold px-7 py-3.5 rounded-full text-sm hover:border-white/60 transition-all hover:-translate-y-0.5"
            >
              <Phone className="h-4 w-4" /> +254 704 612 435
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-bold tracking-widest uppercase text-primary mb-3">Contact</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4">Get In Touch</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Have questions about our solar solutions? Our team is ready to help you find the right system.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              {[
                { icon: MapPin, title: 'Our Office', text: 'National Park East Gate Rd, Nairobi' },
                { icon: Mail, title: 'Email Us', text: 'energy@safaricharge.co.ke', href: 'mailto:energy@safaricharge.co.ke' },
                { icon: Phone, title: 'Call Us', text: '+254 704 612 435', href: 'tel:+254704612435' },
                { icon: MessageCircle, title: 'WhatsApp', text: 'Chat with us directly', href: 'https://wa.me/254704612435' },
                { icon: Clock, title: 'Hours', text: 'Monday to Friday: 9AM – 5PM EAT' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#235347]/15 to-[#052659]/15 shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-0.5">{item.title}</p>
                    {item.href ? (
                      <a href={item.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-muted-foreground text-sm">{item.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#051F20] border-t border-white/10 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#235347] to-[#052659]">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-base font-bold text-white">SafariCharge</span>
                  <span className="ml-1 text-[10px] font-bold text-[#8EB69B] align-super tracking-widest">ENERGY</span>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs mb-4">
                Powering the future with sustainable solar solutions for African homes, businesses, and communities.
              </p>
              <p className="text-white/40 text-xs">
                Energy division of{' '}
                <Link href="/" className="text-[#8EB69B] hover:text-white transition-colors">
                  SafariCharge Ltd
                </Link>
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {[
                  { href: '#products', label: 'Products' },
                  { href: '#projects', label: 'Projects' },
                  { href: '#about', label: 'About Us' },
                  { href: '#contact', label: 'Contact' },
                  { href: '/', label: 'SafariCharge App' },
                ].map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-white/50 hover:text-white text-sm transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Products</h4>
              <ul className="space-y-2.5">
                {['Solar Panels', 'Batteries', 'Inverters', 'Complete Systems'].map((p) => (
                  <li key={p}>
                    <a href="#products" className="text-white/50 hover:text-white text-sm transition-colors">
                      {p}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/40 text-xs">
            <p>© 2026 SafariCharge Energy. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="/about" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/about" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── WhatsApp FAB ── */}
      <a
        href={`https://wa.me/254704612435?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20SafariCharge%20Energy%20solar%20solutions`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}

// ── Contact form (client-side only) ─────────────────────────────
function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, subject: 'SafariCharge Energy — New Enquiry' }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-10 text-center">
        <CheckCircle className="h-12 w-12 text-primary" />
        <h3 className="font-bold text-foreground text-lg">Message Sent!</h3>
        <p className="text-muted-foreground text-sm">We&apos;ll get back to you within one business day.</p>
        <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>
      <input
        name="phone"
        type="tel"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
      />
      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        rows={5}
        placeholder="Tell us about your energy needs..."
        required
        className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
      />
      {status === 'error' && (
        <p className="text-destructive text-sm">Something went wrong. Please email us directly at energy@safaricharge.co.ke</p>
      )}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-[#235347] hover:bg-[#163832] disabled:opacity-60 text-white font-bold py-3.5 rounded-full text-sm transition-all hover:-translate-y-0.5"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
