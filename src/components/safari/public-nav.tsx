import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';

export function PublicNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center shadow-md">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="leading-none">
            <span className="text-lg font-extrabold bg-gradient-to-r from-[#235347] to-[#052659] bg-clip-text text-transparent">
              SafariCharge
            </span>
            <p className="text-[9px] font-semibold tracking-widest text-[#8EB69B] uppercase">Powering Africa</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <Link href="/#network" className="text-sm font-medium text-gray-500 hover:text-[#235347] transition-colors">Network</Link>
          <Link href="/features" className="text-sm font-medium text-gray-500 hover:text-[#235347] transition-colors">Features</Link>
          <Link href="/about" className="text-sm font-medium text-gray-500 hover:text-[#235347] transition-colors">About</Link>
          <Link href="/blog" className="text-sm font-medium text-gray-500 hover:text-[#235347] transition-colors">Blog</Link>
          <Link href="/energy" className="text-sm font-medium text-gray-500 hover:text-[#235347] transition-colors">Energy</Link>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#235347] to-[#052659] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-md"
        >
          Sign In
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </nav>
  );
}
