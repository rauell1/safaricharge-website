import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicNav } from '@/components/safari/public-nav';
import {
  Zap, MapPin, Leaf, Shield, TrendingUp, Building2, Sun,
  CheckCircle, ArrowRight, Users, Globe, Battery, Recycle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About SafariCharge',
  description:
    'Learn about SafariCharge, the company building Kenya\'s EV charging infrastructure. Our mission is to accelerate electric mobility across East Africa.',
  alternates: { canonical: 'https://safaricharge.rauell.systems/about' },
  openGraph: {
    title: 'About SafariCharge | Kenya EV Charging Network',
    description:
      'SafariCharge is building Kenya\'s largest EV charging network, empowering drivers, fleets, and businesses to go electric.',
    url: 'https://safaricharge.rauell.systems/about',
  },
};

export default function AboutPage() {
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
            SafariCharge is the digital and physical backbone of East Africa's clean-mobility transition.
            From charging networks to solar energy and battery repurposing, we power what moves the continent.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-9">
            {[
              { label: '254+ Charging Points', icon: Zap },
              { label: '11 Counties', icon: MapPin },
              { label: '12,800 t CO2 Saved', icon: Leaf },
            ].map(({ label, icon: Icon }) => (
              <span key={label} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 text-white/70 text-sm font-medium px-4 py-2 rounded-full">
                <Icon className="w-4 h-4 text-[#8EB69B]" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Our Mission</p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Accelerating Africa's Shift to Clean Mobility
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed mb-6">
                We believe Africa's transport future is electric. Our mission is to deploy reliable, affordable,
                and intelligent EV charging infrastructure across Kenya and East Africa, making clean mobility
                accessible to everyone.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                SafariCharge connects electric vehicles with reliable charging points, intelligent routing,
                and distributed energy systems including solar and second-life battery storage. We exist for
                drivers, businesses, and communities from major cities to rural locations where energy access
                is limited.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#235347] to-[#052659] text-white font-bold px-7 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
              >
                Join the Revolution
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[
                { num: '254+', label: 'Public Charging Points', icon: Zap, color: 'from-[#235347] to-[#163832]' },
                { num: '11', label: 'Counties Covered', icon: MapPin, color: 'from-[#052659] to-[#141E30]' },
                { num: '10K+', label: 'Active Members', icon: Users, color: 'from-[#5483B3] to-[#7DA0CA]' },
                { num: '98.5%', label: 'Network Uptime', icon: TrendingUp, color: 'from-[#8EB69B] to-[#235347]' },
              ].map((s) => (
                <div
                  key={s.label}
                  className={`bg-gradient-to-br ${s.color} rounded-2xl p-7 text-white shadow-xl`}
                >
                  <s.icon className="w-7 h-7 mb-3 opacity-80" />
                  <p className="text-4xl font-black mb-1">{s.num}</p>
                  <p className="text-white/70 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[#f8fafb]">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Our Values</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">What Drives Everything We Build</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Reliability First',
                desc: '98.5% network uptime backed by 24/7 remote monitoring and rapid response teams across Kenya.',
                color: 'from-[#235347] to-[#163832]',
                num: '01',
              },
              {
                icon: Zap,
                title: 'Intelligent Innovation',
                desc: 'AI-powered analytics, predictive maintenance, and smart grid integration built into every platform layer.',
                color: 'from-[#052659] to-[#141E30]',
                num: '02',
              },
              {
                icon: Leaf,
                title: 'Environmental Impact',
                desc: '12,800 tons of CO2 avoided and counting. Every decision we make is measured against its carbon outcome.',
                color: 'from-[#8EB69B] to-[#235347]',
                num: '03',
              },
              {
                icon: Globe,
                title: 'African-First',
                desc: 'Built in Nairobi for African roads, climate, grids, and business realities. Expanding pan-African.',
                color: 'from-[#5483B3] to-[#7DA0CA]',
                num: '04',
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
              >
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Band */}
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
              { value: '12,800 t', label: 'CO2 Saved', sub: 'Total fleet emissions offset' },
              { value: '2,450+', label: 'Batteries Repurposed', sub: 'Extended to second-life use' },
              { value: '185 MWh', label: 'Energy Repurposed', sub: 'Battery storage deployed' },
              { value: '580K', label: 'Trees Equivalent', sub: 'Annual carbon absorption' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-4xl md:text-5xl font-black text-white mb-1">{item.value}</p>
                <p className="text-[#8EB69B] font-bold text-sm mb-1">{item.label}</p>
                <p className="text-white/35 text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Build */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">What We Build</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">A Complete Clean-Mobility Ecosystem</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Beyond charging stations, SafariCharge builds the software, data platforms, and circular
              economy tools that make Africa's EV transition work.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: 'Public and Private EV Charging Stations', desc: '254+ stations across Kenya in 11 counties, with 350 kW DC fast charging and real-time availability.', color: 'from-[#235347] to-[#163832]' },
              { icon: Users, title: 'Fleet Management Software', desc: 'Full EV fleet management for operators: session tracking, cost analysis, route optimisation, and driver management.', color: 'from-[#052659] to-[#141E30]' },
              { icon: Recycle, title: 'Battery Repurposing Toolkit', desc: 'SoH assessment, second-life value calculation, and application matching for used EV batteries.', color: 'from-[#5483B3] to-[#7DA0CA]' },
              { icon: TrendingUp, title: 'AI-Powered Energy Analytics', desc: 'Predictive demand models, maintenance alerts, and grid load optimisation built into the platform.', color: 'from-[#8EB69B] to-[#235347]' },
              { icon: Sun, title: 'Solar Energy Division', desc: 'Jinko panels, Deye hybrid inverters, and Dyness lithium storage for homes and businesses across Kenya.', color: 'from-[#235347] to-[#052659]' },
              { icon: Building2, title: 'Enterprise EV Programs', desc: 'Workplace charging with automated employee approval workflows, billing, and reimbursement tools.', color: 'from-[#163832] to-[#235347]' },
            ].map((item) => (
              <div key={item.title} className="flex gap-5 bg-[#f8fafb] rounded-2xl border border-gray-100 p-7 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-md mt-0.5`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
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
