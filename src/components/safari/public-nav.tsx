'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ArrowRight, Menu, X } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

const links = [
  { href: '/#network', label: 'Network' },
  { href: '/features', label: 'Features' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/energy', label: 'Energy' },
];

interface PublicNavProps {
  onSignIn?: () => void;
}

export function PublicNav({ onSignIn }: PublicNavProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const textColor = scrolled ? 'text-gray-600' : 'text-white/80';
  const activeColor = scrolled ? 'text-[#235347]' : 'text-white';
  const hoverColor = scrolled ? 'hover:text-[#235347]' : 'hover:text-white';

  return (
    <>
      <motion.nav
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center shadow-md"
            >
              <Logo className="w-5 h-5 text-white" />
            </motion.div>
            <div className="leading-none">
              <span className="text-lg font-extrabold bg-gradient-to-r from-[#235347] to-[#052659] bg-clip-text text-transparent">
                SafariCharge
              </span>
              <p className="text-[9px] font-semibold tracking-widest text-[#8EB69B] uppercase">Powering Africa</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href.replace('/#network', '/').replace('#network', '')));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                    isActive ? activeColor : `${textColor} ${hoverColor}`
                  } hover:bg-white/10`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#8EB69B] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            {onSignIn ? (
              <button
                onClick={onSignIn}
                className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#235347] to-[#052659] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-md"
              >
                Sign In
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                href="/"
                className="hidden md:inline-flex items-center gap-1.5 bg-gradient-to-r from-[#235347] to-[#052659] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-md"
              >
                Sign In
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-white shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center">
                    <Logo className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-extrabold bg-gradient-to-r from-[#235347] to-[#052659] bg-clip-text text-transparent">
                    SafariCharge
                  </span>
                </div>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 p-4 space-y-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, ease: 'easeOut' as const }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
                        pathname === link.href
                          ? 'bg-[#f0f7f5] text-[#235347]'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-[#235347]'
                      }`}
                    >
                      {link.label}
                      <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-4 border-t border-gray-100">
                {onSignIn ? (
                  <button
                    onClick={() => { setMobileOpen(false); onSignIn(); }}
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#235347] to-[#052659] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                  >
                    <Zap className="w-4 h-4" />
                    Sign In to Dashboard
                  </button>
                ) : (
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#235347] to-[#052659] text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                  >
                    <Zap className="w-4 h-4" />
                    Sign In to Dashboard
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
