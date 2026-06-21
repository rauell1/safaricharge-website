'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Zap, MapPin, ArrowRight, CheckCircle, Navigation, Clock, Plug, X } from 'lucide-react';
import { PublicNav } from '@/components/safari/public-nav';
import { KenyaMapSvg, CountyInfo } from '@/components/safari/kenya-map-svg';

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
  { name: 'Other Counties', stations: 159, color: 'from-[#8EB69B] to-[#052659]' },
];

const featuredStations = [
  { name: 'Westlands EV Hub', location: 'Westlands, Nairobi', connectors: 8, power: '150 kW', status: 'Available' },
  { name: 'Garden City Charging Bay', location: 'Thika Road, Nairobi', connectors: 6, power: '50 kW', status: 'Available' },
  { name: 'Two Rivers Mall Station', location: 'Limuru Road, Nairobi', connectors: 4, power: '22 kW', status: 'In Use' },
  { name: 'Nakumatt Mega Mombasa', location: 'Nyali, Mombasa', connectors: 4, power: '50 kW', status: 'Available' },
  { name: 'Milimani EV Point', location: 'Milimani, Kisumu', connectors: 3, power: '22 kW', status: 'Available' },
  { name: 'West End Mall Station', location: 'Eldoret Town', connectors: 2, power: '22 kW', status: 'In Use' },
];

const countyStations: Record<string, string[]> = {
  Nairobi: ['Westlands EV Hub', 'Garden City Charging Bay', 'Two Rivers Mall Station'],
  Mombasa: ['Nakumatt Mega Mombasa', 'Mombasa Port Charger', 'Nyali Plaza Hub'],
  Kiambu: ['Runda Gate Charger', 'Thika Road Mall Station'],
  Nakuru: ['Westside Mall Station', 'Nakuru Highway Stop'],
  Machakos: ['Signature Mall Hub', 'Machakos Town Station'],
  Kisumu: ['Milimani EV Point', 'Kisumu Yacht Club Charger'],
  Eldoret: ['West End Mall Station', 'Eldoret Airport Hub'],
  Laikipia: ['Nanyuki Sports Club', 'Laikipia Airbase Charger'],
  Kajiado: ['Rongai Plaza Station', 'Kitengela Mall Hub'],
  Nyeri: ['Nyeri Town Center', 'Mount Kenya Safari Club'],
};

export function MapClient() {
  const [selectedCounty, setSelectedCounty] = useState<CountyInfo | null>(null);
  const [showMapAnyway, setShowMapAnyway] = useState(false);
  const [activeCycleIndex, setActiveCycleIndex] = useState(0);

  // Cycling badge status updates
  const cycleBadges = [
    'Westlands EV Hub: 6 of 8 chargers free',
    'Garden City: 4 of 6 chargers free',
    'Nakumatt Mega: 3 of 4 chargers free',
    'Milimani EV Point: 2 of 3 chargers free',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCycleIndex((prev) => (prev + 1) % cycleBadges.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [cycleBadges.length]);

  const handleCountySelect = (c: CountyInfo) => {
    setSelectedCounty(c);
    // Scroll map container into view on mobile
    const mapEl = document.getElementById('interactive-map-container');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <PublicNav />

      {/* Hero */}
      <section className="relative pt-16 min-h-[55vh] flex items-center overflow-hidden bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832]">
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
            254 stations live across Kenya
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white mb-6">
            Kenya's{' '}
            <span className="bg-gradient-to-r from-[#8EB69B] to-[#C1E8FF] bg-clip-text text-transparent">
              Largest EV
            </span>{' '}
            Charging Network
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Find a SafariCharge station near you. Real-time availability across Nairobi, Nakuru,
            Mombasa, Kisumu, and more cities across Kenya.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-9">
            {[
              { label: 'CCS2 Connectors' },
              { label: 'CHAdeMO' },
              { label: 'Type 2 AC' },
              { label: 'Up to 350 kW DC' },
            ].map(({ label }) => (
              <span key={label} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/15 text-white/70 text-sm font-medium px-4 py-2 rounded-full">
                <Plug className="w-3.5 h-3.5 text-[#8EB69B]" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
            {[
              { value: '254+', label: 'Charging Points', icon: Zap },
              { value: '11', label: 'Counties', icon: MapPin },
              { value: '350 kW', label: 'Max Speed', icon: Plug },
              { value: '98.5%', label: 'Uptime', icon: CheckCircle },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center py-7 px-4 text-center">
                <s.icon className="w-5 h-5 text-[#235347] mb-2 opacity-60" />
                <p className="text-3xl font-black bg-gradient-to-r from-[#235347] to-[#052659] bg-clip-text text-transparent">
                  {s.value}
                </p>
                <p className="text-sm text-gray-500 mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Gate */}
      <section className="py-24 bg-[#f8fafb]">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">

            {/* Left: Map Preview card with Animate blur overlay */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div
                id="interactive-map-container"
                className="w-full relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#021024] via-[#052659] to-[#163832] border border-white/10 aspect-square p-2"
              >
                {/* Available now live badge */}
                <div className="absolute top-5 left-5 z-30 bg-black/55 backdrop-blur-md rounded-full px-4 py-1.5 border border-white/10 text-white flex items-center gap-2 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#8EB69B] animate-ping" />
                  <span className="text-[#8EB69B] uppercase font-bold tracking-wider mr-1">Available Now</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={cycleBadges[activeCycleIndex]}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.25 }}
                    >
                      {cycleBadges[activeCycleIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>

                {/* Map Component */}
                <div className={`w-full h-full transition-all duration-500 ${!showMapAnyway ? 'blur-[5px] opacity-50 pointer-events-none' : ''}`}>
                  <KenyaMapSvg
                    selectedCounty={selectedCounty}
                    onCountyClick={(c) => setSelectedCounty(c)}
                    interactive={showMapAnyway}
                  />
                </div>

                {/* Sign-in Gate Overlay as Blur Overlay */}
                <AnimatePresence>
                  {!showMapAnyway && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[6px] text-center p-8 z-20"
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' as const }}
                        className="max-w-sm"
                      >
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4 border border-white/15">
                          <MapPin className="w-7 h-7 text-[#8EB69B]" />
                        </div>
                        <h3 className="text-white font-extrabold text-xl mb-2">Interactive Map</h3>
                        <p className="text-white/60 text-sm mb-6 leading-relaxed">
                          Sign in to see live charger availability, connector speeds, and route planning across Kenya.
                        </p>
                        <div className="flex flex-col gap-3">
                          <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 w-full bg-white text-[#051F20] font-bold py-3.5 px-6 rounded-xl hover:bg-[#DAF1DE] transition-colors shadow-xl text-sm"
                          >
                            <MapPin className="w-4 h-4" />
                            Sign In to View Map
                          </Link>
                          <button
                            onClick={() => setShowMapAnyway(true)}
                            className="text-xs text-[#8EB69B] hover:text-white font-semibold underline py-2 cursor-pointer"
                          >
                            Preview Counties (Read Only)
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Return to Gate overlay button */}
                {showMapAnyway && (
                  <button
                    onClick={() => {
                      setShowMapAnyway(false);
                      setSelectedCounty(null);
                    }}
                    className="absolute bottom-5 right-5 z-30 bg-black/60 backdrop-blur border border-white/10 text-white rounded-full p-2.5 hover:bg-black/80 transition-colors cursor-pointer"
                    title="Lock map"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Floating Tooltip Card on county click (Client Component) */}
              <AnimatePresence>
                {selectedCounty && showMapAnyway && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    className="w-full mt-6 bg-white border border-gray-100 rounded-3xl p-6 shadow-xl relative"
                  >
                    <button
                      onClick={() => setSelectedCounty(null)}
                      className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-[#f0f7f5] flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-[#235347]" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-gray-900 text-base">{selectedCounty.name} County</h4>
                        <p className="text-xs text-gray-400 font-medium">{selectedCounty.stations} public charging points</p>
                      </div>
                    </div>

                    <div className="space-y-2.5 mb-5">
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Select Hub Location</p>
                      {(countyStations[selectedCounty.name] || ['Mock Station Alpha', 'Mock Station Beta']).map((st) => (
                        <div key={st} className="flex items-center justify-between bg-gray-50 hover:bg-[#f0f7f5] p-3 rounded-xl border border-gray-100/80 transition-colors">
                          <span className="text-xs font-semibold text-gray-700">{st}</span>
                          <span className="inline-flex items-center gap-1 text-[10px] bg-[#f0f7f5] text-[#235347] border border-[#235347]/10 font-bold px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 bg-[#8EB69B] rounded-full animate-ping" />
                            Live
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href="/"
                      className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#235347] to-[#052659] text-white font-bold py-3.5 px-4 rounded-xl hover:opacity-90 transition-opacity shadow-md text-sm"
                    >
                      Sign In to Connect &amp; Charge
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: County coverage lists */}
            <div className="lg:col-span-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Coverage</p>
              <h2 className="text-3xl font-black text-gray-900 mb-6">Stations by County</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Click any county below to locate its stations on the interactive map. Access is restricted to county outlines under preview mode.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {counties.map((c) => {
                  const isSelected = selectedCounty?.name === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => {
                        if (c.name !== 'Other Counties') {
                          setShowMapAnyway(true);
                          handleCountySelect({
                            name: c.name,
                            stations: c.stations,
                            x: 0, // Placeholder, KenyaMapSvg matches by name
                            y: 0,
                            color: '#8EB69B',
                          });
                        }
                      }}
                      className={`text-center p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                        isSelected
                          ? 'border-[#235347] bg-[#f0f7f5] scale-[1.02] shadow-md ring-2 ring-[#235347]/10'
                          : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-md'
                      }`}
                    >
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${c.color}`} />
                      <p className={`text-2xl font-black bg-gradient-to-r ${c.color} bg-clip-text text-transparent`}>
                        {c.stations}
                      </p>
                      <p className="text-xs font-semibold text-gray-700 mt-1">{c.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">stations</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stations */}
      <section className="py-24 bg-white">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Featured Locations</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Popular Charging Stations</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">
              High-traffic stations with multiple connectors, fast charging, and 24/7 access.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredStations.map((s) => (
              <div
                key={s.name}
                className="bg-[#f8fafb] rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center shadow-md flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    s.status === 'Available'
                      ? 'bg-[#f0f7f5] text-[#235347]'
                      : 'bg-blue-50 text-[#5483B3]'
                  }`}>
                    {s.status}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{s.name}</h3>
                <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  {s.location}
                </p>
                <div className="flex gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Plug className="w-3.5 h-3.5 text-[#235347]" />
                    {s.connectors} connectors
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-[#235347]" />
                    {s.power}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#235347] to-[#052659] text-white font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
            >
              <MapPin className="w-4 h-4" />
              View All 254 Stations
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How charging works */}
      <section className="py-24 bg-[#f8fafb]">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#235347] mb-3">Simple Process</p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">How Charging Works</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-7">
            {[
              { step: '01', icon: Zap, title: 'Sign In', desc: 'Create a free account or sign in to your SafariCharge dashboard.' },
              { step: '02', icon: MapPin, title: 'Find a Station', desc: 'Use the interactive map to locate the nearest available charging point.' },
              { step: '03', icon: Navigation, title: 'Navigate', desc: 'Get turn-by-turn directions to the station with estimated arrival time.' },
              { step: '04', icon: Clock, title: 'Charge and Track', desc: 'Start a session, monitor progress, and get a full receipt automatically.' },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 text-center hover:shadow-lg transition-shadow relative">
                <span className="absolute top-4 right-5 text-5xl font-black text-gray-100 leading-none">{s.step}</span>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center mx-auto mb-5 shadow-lg">
                  <s.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
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
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8EB69B] mb-4">Start Charging</p>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-5">
            Ready to Power Up Your Journey?
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto mb-10">
            Sign in now to access the live map, lock in charging stations, and track your sustainable savings.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 h-14 px-10 bg-white text-[#051F20] font-bold text-base rounded-xl hover:bg-[#DAF1DE] transition-colors shadow-2xl"
            >
              <Zap className="w-5 h-5" />
              Sign In to Map
            </Link>
            <Link
              href="mailto:info@rauell.systems"
              className="inline-flex items-center gap-2 h-14 px-10 bg-transparent text-white font-semibold text-base rounded-xl border-2 border-white/25 hover:bg-white/10 transition-colors"
            >
              Contact Support
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
