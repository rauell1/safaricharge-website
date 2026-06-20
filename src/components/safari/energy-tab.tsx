'use client';

import { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';

// ── Animated counter ────────────────────────────────────────────
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: number; suffix?: string; prefix?: string }) {
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
          const step = Math.ceil(target / (1800 / 16));
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

  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// ── FAQ Item ────────────────────────────────────────────────────
function FaqItem({ question, children }: { question: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left font-semibold text-foreground hover:text-primary transition-colors gap-4"
      >
        <span className="text-sm">{question}</span>
        {open ? <ChevronUp className="h-4 w-4 shrink-0 text-primary" /> : <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />}
      </button>
      {open && <div className="pb-4 text-muted-foreground text-sm leading-relaxed">{children}</div>}
    </div>
  );
}

// ── Solar Calculator ─────────────────────────────────────────────
function SolarCalculator() {
  const [bill, setBill] = useState(15000);
  const [size, setSize] = useState(5);
  const [battery, setBattery] = useState(10);

  const annualGeneration = size * 1600;
  const annualSavings = Math.min(bill * 12 * 0.75, annualGeneration * 18);
  const monthlySavings = Math.round(annualSavings / 12);
  const systemCost = size * 185000 + battery * 25000;
  const payback = annualSavings > 0 ? (systemCost / annualSavings).toFixed(1) : '—';
  const co2 = Math.round(annualGeneration * 0.55);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-5">
        {[
          { label: 'Monthly Electricity Bill', id: 'bill', min: 0, max: 100000, step: 500, value: bill, set: setBill, display: `KES ${bill.toLocaleString()}` },
          { label: 'System Size', id: 'size', min: 1, max: 50, step: 1, value: size, set: setSize, display: `${size} kWp` },
          { label: 'Battery Storage', id: 'battery', min: 0, max: 100, step: 5, value: battery, set: setBattery, display: `${battery} kWh` },
        ].map((s) => (
          <div key={s.id}>
            <label className="flex justify-between text-sm font-semibold text-foreground mb-2">
              <span>{s.label}</span>
              <span className="text-primary">{s.display}</span>
            </label>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={s.value}
              onChange={(e) => s.set(Number(e.target.value))}
              className="w-full accent-[#235347]"
            />
          </div>
        ))}
        <a
          href="mailto:info@rauell.systems?subject=Solar Quote Request"
          className="inline-flex items-center gap-2 bg-[#235347] hover:bg-[#163832] text-white font-bold px-6 py-2.5 rounded-full text-sm transition-all hover:-translate-y-0.5"
        >
          Get a Real Quote <ArrowRight className="h-4 w-4" />
        </a>
      </div>
      <div className="bg-gradient-to-br from-[#235347] to-[#052659] rounded-2xl p-6 text-white space-y-3">
        {[
          { label: 'Monthly Savings', value: `KES ${monthlySavings.toLocaleString()}` },
          { label: 'Annual Savings', value: `KES ${Math.round(annualSavings).toLocaleString()}` },
          { label: 'Payback Period', value: `${payback} yrs` },
          { label: 'CO₂ Avoided / Year', value: `${co2.toLocaleString()} kg` },
        ].map((item) => (
          <div key={item.label} className="flex justify-between border-b border-white/20 pb-3 last:border-0 last:pb-0">
            <span className="text-white/70 text-sm">{item.label}</span>
            <span className="font-bold">{item.value}</span>
          </div>
        ))}
        <p className="text-white/40 text-xs pt-1">Estimates only. Actual savings depend on your site conditions.</p>
      </div>
    </div>
  );
}

// ── Contact form ─────────────────────────────────────────────────
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
      <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card p-8 text-center">
        <CheckCircle className="h-10 w-10 text-primary" />
        <h3 className="font-bold text-foreground">Message Sent!</h3>
        <p className="text-muted-foreground text-sm">We'll get back to you within one business day.</p>
        <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>Send another</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required
          className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your Email" required
          className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>
      <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="Phone Number"
        className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
      <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Tell us about your energy needs..." required
        className="w-full rounded-xl border border-border bg-input px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
      {status === 'error' && (
        <p className="text-destructive text-xs">Something went wrong — email us at info@rauell.systems</p>
      )}
      <button type="submit" disabled={status === 'sending'}
        className="w-full bg-[#235347] hover:bg-[#163832] disabled:opacity-60 text-white font-bold py-3 rounded-full text-sm transition-all">
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}

// ── Main tab component ───────────────────────────────────────────
export function EnergyTab() {
  return (
    <div className="space-y-0 -mx-4 sm:-mx-6 lg:-mx-8 -mt-6">

      {/* Hero */}
      <div
        className="relative flex items-center justify-center py-20 px-4 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #051F20 0%, #235347 55%, #052659 100%)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-[#235347]/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-[#052659]/40 blur-3xl" />

        <div className="relative z-10 text-center max-w-3xl">
          <Badge className="mb-5 bg-white/10 text-white border-white/20 text-xs font-semibold tracking-widest uppercase">
            <Sun className="h-3.5 w-3.5 mr-1.5" /> SafariCharge Energy Division
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
            Powering Africa with<br />
            <span className="bg-gradient-to-r from-[#8EB69B] to-[#C1E8FF] bg-clip-text text-transparent">
              Clean Solar Energy
            </span>
          </h1>
          <p className="text-base text-white/70 max-w-xl mx-auto mb-8 leading-relaxed">
            Premium solar panels, hybrid inverters, and lithium battery storage — engineered for Africa's homes, businesses, and communities. Fully integrated with your SafariCharge EV ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="#energy-products"
              className="inline-flex items-center gap-2 bg-white text-[#235347] font-bold px-7 py-3 rounded-full text-sm hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-lg">
              Explore Products <ArrowRight className="h-4 w-4" />
            </a>
            <a href={`https://wa.me/254704612435?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20SafariCharge%20Energy`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3 rounded-full text-sm border border-white/20 transition-all hover:-translate-y-0.5">
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-gradient-to-r from-[#235347] to-[#052659] py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {[
            { target: 600, suffix: '+', label: 'kWp Installed' },
            { target: 5, suffix: '', label: 'Reference Projects' },
            { target: 330, suffix: '+', label: 'kWh Storage Deployed' },
            { target: 0, suffix: 'g', label: 'CO₂ per kWh Generated' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-extrabold mb-0.5">
                <AnimatedCounter target={s.target} suffix={s.suffix} />
              </div>
              <div className="text-white/60 text-xs font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Content wrapper with padding restored */}
      <div className="px-4 sm:px-6 lg:px-8">

        {/* About pillars */}
        <section id="energy-about" className="py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2">Who We Are</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">
                Integrated Energy Solutions for Africa
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
                Energy and mobility go hand in hand. SafariCharge Energy delivers scalable, reliable solar solutions that work seamlessly with our EV charging network — from powering your home charger to large commercial operations.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { icon: Sun, title: 'Cutting-Edge Technology', desc: 'N-Type TOPCon bifacial panels, hybrid inverters with built-in MPPT, and LiFePO₄ battery chemistry — the best components available.' },
                { icon: Leaf, title: 'Built for Africa', desc: 'Designed for equatorial sun, high ambient temperatures, and off-grid reliability. Every system is sized for your specific site.' },
                { icon: Zap, title: 'EV-Ready Integration', desc: "Pairs natively with SafariCharge's EV charging infrastructure and fleet management software for a complete clean-energy ecosystem." },
              ].map((p) => (
                <div key={p.title} className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-md transition-all group">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#235347]/15 to-[#052659]/15 mb-4">
                    <p.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1.5 text-sm">{p.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section id="energy-products" className="py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-[#051F20]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest uppercase text-[#8EB69B] mb-2">Our Products</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Premium Solar Components</h2>
              <p className="text-white/60 max-w-lg mx-auto text-sm">High-quality panels, inverters, and batteries — the building blocks of every SafariCharge Energy system.</p>
            </div>

            <div className="space-y-10">
              {[
                {
                  image: '/energy/products/jinko_panel_new.png', brand: 'Jinko Solar', name: 'Bifacial Solar Panels', range: '585W & 620W',
                  desc: 'Tier-1 N-Type TOPCon panels with dual-sided power generation. 30-year linear performance warranty.',
                  features: ['30-year linear performance warranty', 'Dual-sided power generation', 'Built to last a lifetime'],
                  reverse: false,
                },
                {
                  image: '/energy/products/deye_inverter.png', brand: 'Deye', name: 'Hybrid Inverters', range: '5kW, 8kW & 10kW',
                  desc: 'All-in-one hybrid inverter supporting on-grid and off-grid modes with built-in MPPT charge controller.',
                  features: ['On-grid & off-grid modes', 'Built-in MPPT charge controller', 'Parallel operation supported'],
                  reverse: true,
                },
                {
                  image: '/energy/products/dyness_battery_new.png', brand: 'Dyness', name: 'Lithium Battery Storage', range: '5.12kWh & 10.24kWh',
                  desc: 'LiFePO₄ chemistry with 6,000+ cycles at 90% DoD. Modular design, scalable up to 50 units in parallel.',
                  features: ['6,000+ cycle life at 90% DoD', 'Modular, scalable design', 'Wall or floor mounting'],
                  reverse: false,
                },
              ].map((p) => (
                <div key={p.name} className={`flex flex-col ${p.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center`}>
                  <div className="w-full md:w-5/12 rounded-2xl overflow-hidden bg-[#1a2e2a] border border-white/10 flex items-center justify-center p-6 min-h-[220px]">
                    <Image src={p.image} alt={p.name} width={360} height={260} className="object-contain max-h-48 w-auto" />
                  </div>
                  <div className="w-full md:w-7/12">
                    <p className="text-xs font-bold tracking-widest uppercase text-[#8EB69B] mb-1">{p.brand}</p>
                    <h3 className="text-xl font-extrabold text-white mb-1">{p.name}</h3>
                    <p className="text-white/50 text-xs mb-3 font-medium">{p.range}</p>
                    <p className="text-white/70 text-sm leading-relaxed mb-4">{p.desc}</p>
                    <ul className="space-y-1.5 mb-5">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-white/80">
                          <CheckCircle className="h-3.5 w-3.5 text-[#8EB69B] shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                    <a href="mailto:info@rauell.systems?subject=Product Enquiry"
                      className="inline-flex items-center gap-2 bg-[#235347] hover:bg-[#2d6b5c] text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:-translate-y-0.5">
                      Get Pricing <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a href="mailto:info@rauell.systems?subject=Full System Quote"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-bold px-7 py-3 rounded-full text-sm transition-all hover:-translate-y-0.5">
                Build Your System & Get a Quote <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="energy-projects" className="py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2">Our Work</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">Reference Projects</h2>
              <p className="text-muted-foreground max-w-lg mx-auto text-sm">
                From Nairobi rooftops to off-grid camps in the Maasai Mara.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { image: '/energy/projects/safari-park.png', tag: 'Grid-Tied', tagBg: 'bg-[#235347]', name: 'Nairobi Commercial Park', location: 'Nairobi, Kenya', desc: '55.78kWp grid-tied solar PV system with Jinko 575W panels and SMA inverters.', date: 'Aug 2021', cap: '55.78kWp' },
                { image: '/energy/projects/Emboo River.jpg', tag: 'Off-Grid', tagBg: 'bg-[#052659]', name: 'Emboo River Camp', location: 'Maasai Mara, Kenya', desc: '64.31kWp off-grid system with 153.6kWh lithium battery storage.', date: 'Jan 2023', cap: '153.6kWh' },
                { image: '/energy/projects/Sekanani Camp1.png', tag: 'Off-Grid', tagBg: 'bg-[#052659]', name: 'Sekanani Camp', location: 'Maasai Mara, Kenya', desc: '10.34kWp off-grid system eliminating diesel generator reliance entirely.', date: 'Nov 2022', cap: '25.6kWh' },
                { image: '/energy/projects/Carton Manufacturers.jpg', tag: 'Commercial', tagBg: 'bg-[#235347]', name: 'Carton Manufacturers', location: 'Nairobi, Kenya', desc: '403kWp rooftop industrial installation reducing energy costs by 60%.', date: 'Mar 2022', cap: '403kWp' },
                { image: '/energy/projects/Carl Martens.png', tag: 'Hybrid', tagBg: 'bg-[#235347]', name: 'Carl Martens Estate', location: 'Ukunda, Kwale', desc: '10.45kWp system with 15.36kWh battery for a coastal residential property.', date: 'Jun 2023', cap: '10.45kWp' },
              ].map((proj) => (
                <div key={proj.name} className="rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-md transition-all group">
                  <div className="relative h-44 bg-muted overflow-hidden">
                    <Image src={proj.image} alt={proj.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className={`absolute top-3 left-3 ${proj.tagBg} text-white text-xs font-bold px-2.5 py-1 rounded-full`}>{proj.tag}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground text-sm mb-1">{proj.name}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" /> {proj.location}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{proj.desc}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{proj.date}</span>
                      <span className="flex items-center gap-1"><Zap className="h-3 w-3" />{proj.cap}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-[#051F20]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest uppercase text-[#8EB69B] mb-2">Client Stories</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">What Our Clients Say</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                { quote: '"Energy bills dropped by 60% and zero downtime since installation. The ROI has been exceptional."', name: 'James Mwangi', role: 'CEO, Carton Manufacturers' },
                { quote: '"No more generator noise — just clean, reliable power that impresses our guests and protects the environment."', name: 'Loic Amado', role: 'Camp Manager, Emboo River' },
                { quote: '"Our health clinic now operates 24/7. Critical equipment never loses power. Patient outcomes have measurably improved."', name: 'Dr. Peter Omondi', role: 'Medical Director, Rural Health Clinic' },
              ].map((t) => (
                <div key={t.name} className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:border-[#8EB69B]/30 transition-all">
                  <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, i) => <span key={i} className="text-amber-400 text-xs">★</span>)}</div>
                  <p className="text-white/80 text-sm leading-relaxed mb-5 italic">{t.quote}</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#235347] text-white font-bold text-sm shrink-0">{t.name.charAt(0)}</div>
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

        {/* FAQ & Calculator */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">

            {/* FAQ */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2">FAQ</p>
              <h2 className="text-2xl font-extrabold text-foreground mb-6">Common Questions</h2>
              <div className="rounded-2xl border border-border bg-card px-5">
                <FaqItem question="How much does a solar system cost?">
                  Residential hybrid systems typically start from KES 250,000, commercial systems from KES 500,000. Contact us for a customised estimate.
                </FaqItem>
                <FaqItem question="What warranties do you offer?">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Solar panels: 30-year linear performance warranty</li>
                    <li>Dyness batteries: 10-year warranty</li>
                    <li>Deye inverters: 5-year warranty</li>
                    <li>Installation: 1-year workmanship warranty</li>
                  </ul>
                </FaqItem>
                <FaqItem question="How long does installation take?">
                  Residential: 1–3 days. Commercial: 1–6 weeks. Large-scale: 4–12 weeks.
                </FaqItem>
                <FaqItem question="Can I charge my EV with solar?">
                  Yes — that's what makes SafariCharge Energy unique. Your solar installation can power a home or commercial EV charger, and we design the system to handle both loads simultaneously.
                </FaqItem>
                <FaqItem question="Can I go completely off-grid?">
                  Yes. With correct sizing and sufficient battery storage you can achieve full energy independence.
                </FaqItem>
              </div>
            </div>

            {/* Calculator */}
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2">Solar ROI</p>
              <h2 className="text-2xl font-extrabold text-foreground mb-6">Calculate Your Savings</h2>
              <SolarCalculator />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="energy-contact" className="py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-secondary/30">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-xs font-bold tracking-widest uppercase text-primary mb-2">Contact</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3">Get In Touch</h2>
              <p className="text-muted-foreground text-sm max-w-lg mx-auto">Have questions about our solar solutions? Our team is ready to help.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-5">
                {[
                  { icon: MapPin, title: 'Our Office', text: 'National Park East Gate Rd, Nairobi' },
                  { icon: Mail, title: 'Email Us', text: 'info@rauell.systems', href: 'mailto:info@rauell.systems' },
                  { icon: Phone, title: 'Call Us', text: '+254 704 612 435', href: 'tel:+254704612435' },
                  { icon: MessageCircle, title: 'WhatsApp', text: 'Chat with us directly', href: 'https://wa.me/254704612435' },
                  { icon: Clock, title: 'Hours', text: 'Monday to Friday: 9AM – 5PM EAT' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#235347]/15 to-[#052659]/15 shrink-0">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground text-sm mb-0.5">{item.title}</p>
                      {item.href ? (
                        <a href={item.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">{item.text}</a>
                      ) : (
                        <p className="text-muted-foreground text-sm">{item.text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

      </div>{/* end content wrapper */}

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/254704612435?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20SafariCharge%20Energy"
        target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-13 w-13 h-12 w-12 items-center justify-center rounded-full bg-green-500 hover:bg-green-600 text-white shadow-xl transition-all hover:-translate-y-1"
      >
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}
