'use client';

import Link from 'next/link';
import { Zap, ArrowRight, Menu } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface PublicNavProps {
  onSignIn?: () => void;
}

export function PublicNav({ onSignIn }: PublicNavProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const navLinks = [
    { href: '/#network', label: 'Network' },
    { href: '/features', label: 'Features' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/energy', label: 'Energy' },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#235347] via-[#8EB69B] to-[#052659] z-[100] origin-left"
        style={{ scaleX }}
      />

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-500 hover:text-[#235347] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            {onSignIn ? (
              <button
                onClick={onSignIn}
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#235347] to-[#052659] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-md cursor-pointer"
              >
                Sign In
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#235347] to-[#052659] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity shadow-md"
              >
                Sign In
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-700">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6 bg-white/95 backdrop-blur-md">
                <SheetHeader className="text-left border-b border-gray-100 pb-4">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#235347] to-[#052659] flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-extrabold text-gray-900">SafariCharge</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-8">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.href}
                        className="text-lg font-semibold text-gray-600 hover:text-[#235347] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <div className="border-t border-gray-100 pt-6 mt-4">
                    <SheetClose asChild>
                      {onSignIn ? (
                        <button
                          onClick={onSignIn}
                          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#235347] to-[#052659] text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg cursor-pointer"
                        >
                          Sign In
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <Link
                          href="/"
                          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#235347] to-[#052659] text-white font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity shadow-lg"
                        >
                          Sign In
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
