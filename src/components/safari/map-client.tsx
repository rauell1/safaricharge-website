'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { PublicNav } from '@/components/safari/public-nav';
import { Zap, MapPin, ArrowRight, CheckCircle, Navigation, Clock, Plug } from 'lucide-react';

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

const cityDots = [
  { name: 'Nairobi', x: 195, y: 240, stations: 30, available: 22 },
  { name: 'Mombasa', x: 290, y: 340, stations: 18, available: 14 },
  { name: 'Kisumu', x: 100, y: 210, stations: 6, available: 5 },
  { name: 'Nakuru', x: 150, y: 190, stations: 9, available: 7 },
  { name: 'Eldoret', x: 110, y: 150, stations: 5, available: 4 },
  { name: 'Kiambu', x: 210, y: 220, stations: 9, available: 8 },
  { name: 'Machakos', x: 230, y: 270, stations: 7, available: 6 },
];

const counties = [
  { name: 'Nairobi', stations: 30, color: 'from-[#235347] to-[#163832]' },
  { name: 'Mombasa', stations: 18, color: 'from-[#052659] to-[#141E30]' },
  { name: 'Kiambu', stations: 9, color: 'from-[#5483B3] to-[#7DA0CA]' },
  { name: 'Nakuru', stations: 9, color: 'from-[#8EB69B] to-[#235347]' },
  { name: 'Machakos', stations: 7, color: 'from-[#235347] to-[#8EB69B]' },
  { name: 'Kisumu', stations: 6, color: 'from-[#052659] to-[#5483B3]' },
  { name: 'Eldoret', stations: 5, color: 'from-[#163832] to-[#235347]' },
  { name: 'Laikipia', stations: 4, color: 'from-[#141E30] to-[#052659]' },
  { name: 'Kajiado', stations: 4, color: 'from-[#235347] to-[#052659]' },
  { name: 'Nyeri', stations: 3, color: 'from-[#5483B3] to-[#163832]' },
  { name: 'Other', stations: 159, color: 'from-[#8EB69B] to-[#052659]' },
];

const featuredStations = [
  { name: 'Westlands EV Hub', location: 'Westlands, Nairobi', connectors: 8, power: '150 kW', status: 'Available' },
  { name: 'Garden City Charging Bay', location: 'Thika Road, Nairobi', connectors: 6, power: '50 kW', status: 'Available' },
  { name: 'Two Rivers Mall Station', location: 'Limuru Road, Nairobi', connectors: 4, power: '22 kW', status: 'In Use' },
  { name: 'Nyali Centre Mombasa', location: 'Nyali, Mombasa', connectors: 4, power: '50 kW', status: 'Available' },
  { name: 'Milimani EV Point', location: 'Milimani, Kisumu', connectors: 3, power: '22 kW', status: 'Available' },
  { name: 'West End Mall Station', location: 'Eldoret Town', connectors: 2, power: '22 kW', status: 'In Use' },
];

function KenyaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const hoveredCity = cityDots.find((c) => c.name === hovered);

  return (
    <div className="relative">
      <svg
        viewBox="0 0 380 420"
        className="w-full max-w-sm mx-auto"
        style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))' }}
      >
        {/* Kenya outline - simplified polygon */}
        <path
          d="M 140,30 L 200,20 L 250,35 L 290,70 L 310,110 L 320,160 L 315,210 L 300,260 L 280,310 L 260,350 L 230,380 L 190,390 L 160,370 L 130,340 L 110,300 L 90,260 L 75,220 L 70,180 L 80,140 L 85,100 L 100,65 L 120,45 Z"
          fill="rgba(35,83,71,0.15)"
          stroke="rgba(142,182,155,0.4)"
          strokeWidth="1.5"
        />
        {/* Interior lines for visual texture */}
        <path d="M 85,100 L 120,110 L 160,105 L 200,115" stroke="rgba(142,182,155,0.15)" strokeWidth="0.5" fill="none" />
        <path d="M 80,140 L 130,145 L 180,140 L 220,150 L 260,140" stroke="rgba(142,182,155,0.15)" strokeWidth="0.5" fill="none" />
        <path d="M 75,180 L 120,185 L 175,180 L 230,188 L 280,180" stroke="rgba(142,182,155,0.15)" strokeWidth="0.5" fill="none" />
        <path d="M 85,220 L 140,225 L 195,220 L 255,228 L 300,220" stroke="rgba(142,182,155,0.15)" strokeWidth="0.5" fill="none" />
        <path d="M 100,260 L 155,265 L 210,260 L 270,268 L 310,255" stroke="rgba(142,182,155,0.15)" strokeWidth="0.5" fill="none" />

        {/* City dots */}
        {cityDots.map((city) => {
          const size = 4 + (city.stations / 30) * 10;
          return (
            <g
              key={city.name}
              onMouseEnter={(e) => { setHovered(city.name); setTooltipPos({ x: city.x, y: city.y }); }}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Pulse ring */}
              <motion.circle
                cx={city.x}
                cy={city.y}
                r={size + 4}
                fill="none"
                stroke="#8EB69B"
                strokeWidth="1.5"
                animate={{ r: [size + 4, size + 14], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: cityDots.indexOf(city) * 0.3 }}
              />
              {/* Main dot */}
              <motion.circle
                cx={city.x}
                cy={city.y}
                r={size}
                fill="#8EB69B"
                stroke="white"
                strokeWidth="2"
                whileHover={{ scale: 1.4 }}
                transition={{ type: 'spring', stiffness: 400 }}
              />
              {/* Label */}
              <text x={city.x} y={city.y - size - 6} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.7)" fontWeight="600">
                {city.name}
              </text>
            </g>
          );
        })}

        {/* Tooltip */}
        <AnimatePresence>
          {hovered && hoveredCity && (
            <motion.g
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{ transformOrigin: `${tooltipPos.x}px ${tooltipPos.y}px` }}
            >
              <rect
                x={Math.min(tooltipPos.x - 55, 270)}
                y={tooltipPos.y - 70}
                width="110"
                height="58"
                rx="8"
                fill="rgba(5,38,89,0.95)"
                stroke="rgba(142,182,155,0.4)"
                strokeWidth="1"
              />
              <text x={Math.min(tooltipPos.x, 325)} y={tooltipPos.y - 51} textAnchor="middle" fontSize="10" fill="white" fontWeight="700">{hoveredCity.name}</text>
              <text x={Math.min(tooltipPos.x, 325)} y={tooltipPos.y - 35} textAnchor="middle" fontSize="9" fill="rgba(142,182,155,0.9)">{hoveredCity.stations} stations</text>
              <circle cx={Math.min(tooltipPos.x, 325) - 22} cy={tooltipPos.y - 22} r="3" fill="#8EB69B" />
              <text x={Math.min(tooltipPos.x, 325) - 15} y={tooltipPos.y - 19} fontSize="9" fill="rgba(255,255,255,0.7)">{hoveredCity.available} available now</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}

export function MapClient() {
  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="relative pt-16 min-h-[55vh] flex items-center overflow-hidden bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832]">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '64px 64px' }} />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#5483B3]/20 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#235347]/25 blur-[140px] pointer-events-none" />
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl mx-auto">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-1.5 rounded-full border border-white/15 text-white/80 text-xs font-medium mb-7">
              <motion.span animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-[#8EB69B]" />
              254 stations live across Kenya
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white mb-6">
              Kenya's{' '}
              <span className="bg-gradient-to-r from-[#8EB69B] to-[#C1E8FF] bg-clip-text text-transparent">Largest EV</span>{' '}
              Charging Network
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-white/60 leading-relaxed mb-10">
              Real-time availability across Nairobi, Nakuru, Mombasa, Kisumu, and more.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
              {['CCS2', 'CHAdeMO', 'Type 2 AC', 'Up to 350 kW DC'].map((label) => (
                <span key={label} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 text-white/70 text-sm font-medium px-4 py-2 rounded-full">
                  <Plug className="w-3.5 h-3.5 text-[#8EB69B]" />
                  {label}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {[
              { to: 254, suffix: '+', label: 'Charging Points', icon: Zap },
              { to: 11, suffix: '', label: 'Counties', icon: MapPin },
              { to: 350, suffix: ' kW', label: 'Max Speed', icon: Plug },
              { to: 98, suffix: '.5%', label: 'Uptime', icon: CheckCircle },
            ].map((s) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col items-center justify-center py-7 px-4 text-center">
                <s.icon className="w-5 h-5 text-[#235347] mb-2 opacity-60" />
                <p className="text-3xl font-black bg-gradient-to-r from-[#235347] to-[#052659] bg-clip-text text-transparent">
                  <AnimatedCounter to={s.to} suffix={s.suffix} />
                </p>
                <p className="text-sm text-gray-500 mt-1 font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + Coverage */}
      <section className="py-24 bg-[#f8fafb]">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Map */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Interactive Network Map</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900 mb-5">Live Station Availability</motion.h2>
              <motion.p variants={fadeUp} className="text-gray-500 text-lg leading-relaxed mb-8">
                Hover over a city dot to see live availability. Sign in to unlock turn-by-turn directions, pricing, and real-time session data.
              </motion.p>
              <motion.div variants={fadeUp} className="rounded-3xl overflow-hidden bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832] p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-white/70 text-xs font-semibold uppercase tracking-widest">Kenya Network</span>
                  <span className="flex items-center gap-1.5 text-xs text-[#8EB69B] font-semibold">
                    <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-[#8EB69B]" />
                    Live
                  </span>
                </div>
                <KenyaMap />
                {/* Sign-in gate overlay */}
                <div className="mt-4 relative rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#021024]/95 via-[#021024]/60 to-transparent backdrop-blur-[2px]" />
                  <div className="relative z-10 text-center py-6 px-4">
                    <p className="text-white font-bold mb-1">Full map with live data</p>
                    <p className="text-white/50 text-xs mb-4">Sign in for real-time availability, pricing, and directions</p>
                    <Link href="/" className="inline-flex items-center gap-2 bg-white text-[#051F20] font-bold px-5 py-2.5 rounded-xl hover:bg-[#DAF1DE] transition-colors shadow-lg text-sm">
                      <MapPin className="w-3.5 h-3.5" />Sign In to View
                    </Link>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={stagger} className="mt-6 space-y-2">
                {['Live availability and pricing', 'Turn-by-turn directions', 'Filter by connector type and speed', 'Save favourite stations'].map((item) => (
                  <motion.div key={item} variants={fadeUp} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#235347] flex-shrink-0" />
                    <span className="text-gray-600 text-sm font-medium">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* County coverage */}
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Coverage</motion.p>
              <motion.h2 variants={fadeUp} className="text-3xl font-black text-gray-900 mb-8">Stations by County</motion.h2>
              <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {counties.map((c) => (
                  <motion.div key={c.name} variants={fadeUp} whileHover={{ y: -4 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-5 text-center overflow-hidden relative cursor-default">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.color}`} />
                    <p className={`text-2xl font-black bg-gradient-to-r ${c.color} bg-clip-text text-transparent`}>{c.stations}</p>
                    <p className="text-xs font-semibold text-gray-700 mt-1">{c.name}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">stations</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Stations */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Featured Locations</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Popular Charging Stations</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredStations.map((s) => (
              <motion.div key={s.name} variants={fadeUp} whileHover={{ y: -6 }} className="bg-[#f8fafb] rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow cursor-default">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center shadow-md flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${s.status === 'Available' ? 'bg-[#f0f7f5] text-[#235347]' : 'bg-blue-50 text-[#5483B3]'}`}>{s.status}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{s.name}</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1 mb-4"><MapPin className="w-3.5 h-3.5" />{s.location}</p>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Plug className="w-3.5 h-3.5 text-[#235347]" />{s.connectors} connectors</span>
                  <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-[#235347]" />{s.power}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-10">
            <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#235347] to-[#052659] text-white font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg">
              <MapPin className="w-4 h-4" />View All 254 Stations<ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-[#f8fafb]">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-14">
            <motion.p variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Simple Process</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-black text-gray-900 mb-4">How Charging Works</motion.h2>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-4 gap-7">
            {[
              { step: '01', icon: Zap, title: 'Sign In', desc: 'Create a free account or sign in to your SafariCharge dashboard.' },
              { step: '02', icon: MapPin, title: 'Find a Station', desc: 'Use the interactive map to locate the nearest available charging point.' },
              { step: '03', icon: Navigation, title: 'Navigate', desc: 'Get turn-by-turn directions with estimated arrival time.' },
              { step: '04', icon: Clock, title: 'Charge and Track', desc: 'Start a session, monitor progress, and get a full receipt automatically.' },
            ].map((s, i) => (
              <motion.div key={s.step} variants={fadeUp} whileHover={{ y: -6 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 text-center hover:shadow-lg transition-shadow relative cursor-default">
                <span className="absolute top-4 right-5 text-5xl font-black text-gray-100 leading-none">{s.step}</span>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <s.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832] relative overflow-hidden">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%,rgba(142,182,155,0.5) 0%,transparent 50%),radial-gradient(circle at 70% 50%,rgba(84,131,179,0.5) 0%,transparent 50%)' }} />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-black text-white mb-5">Find Your Nearest Charging Station</motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-2xl mx-auto mb-10">Sign in to access real-time availability for all 254 SafariCharge stations.</motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/" className="inline-flex items-center gap-2 h-14 px-10 bg-white text-[#051F20] font-bold text-base rounded-xl hover:bg-[#DAF1DE] transition-colors shadow-2xl">
              <MapPin className="w-5 h-5" />Open Charging Map<ArrowRight className="w-4 h-4" />
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
