'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export interface CountyInfo {
  name: string;
  x: number;
  y: number;
  stations: number;
  color: string;
}

export const countiesData: CountyInfo[] = [
  { name: 'Nairobi', x: 200, y: 290, stations: 30, color: '#8EB69B' },
  { name: 'Mombasa', x: 290, y: 410, stations: 18, color: '#C1E8FF' },
  { name: 'Kiambu', x: 195, y: 270, stations: 9, color: '#8EB69B' },
  { name: 'Nakuru', x: 160, y: 250, stations: 9, color: '#8EB69B' },
  { name: 'Machakos', x: 225, y: 305, stations: 7, color: '#C1E8FF' },
  { name: 'Kisumu', x: 115, y: 260, stations: 6, color: '#8EB69B' },
  { name: 'Eldoret', x: 120, y: 200, stations: 5, color: '#C1E8FF' },
  { name: 'Laikipia', x: 200, y: 210, stations: 4, color: '#8EB69B' },
  { name: 'Kajiado', x: 185, y: 340, stations: 4, color: '#C1E8FF' },
  { name: 'Nyeri', x: 210, y: 240, stations: 3, color: '#8EB69B' },
];

interface KenyaMapSvgProps {
  onCountyClick?: (county: CountyInfo) => void;
  selectedCounty?: CountyInfo | null;
  interactive?: boolean;
}

export function KenyaMapSvg({
  onCountyClick,
  selectedCounty = null,
  interactive = true,
}: KenyaMapSvgProps) {
  const [hoveredCounty, setHoveredCounty] = useState<CountyInfo | null>(null);

  // SVG dimensions: viewBox="0 0 500 500"
  // Polygonal outline representing Kenya
  const pathD = "M 90,50 L 280,50 L 440,60 L 400,220 L 390,340 L 300,450 L 180,380 L 70,310 L 80,180 Z";

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto bg-black/20 backdrop-blur-md rounded-3xl border border-white/10 p-6 overflow-hidden shadow-2xl">
      {/* Decorative background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-[#8EB69B]/10 blur-[40px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-[#C1E8FF]/10 blur-[50px] pointer-events-none" />

      {/* SVG Map Canvas */}
      <svg
        viewBox="0 0 500 500"
        className="relative w-full h-full z-10 select-none"
      >
        {/* Draw Kenya outline */}
        <motion.path
          d={pathD}
          fill="rgba(5, 38, 89, 0.2)"
          stroke="url(#mapGrad)"
          strokeWidth="2.5"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: 'easeOut' as const }}
        />

        {/* Gradients */}
        <defs>
          <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8EB69B" />
            <stop offset="50%" stopColor="#235347" />
            <stop offset="100%" stopColor="#C1E8FF" />
          </linearGradient>
        </defs>

        {/* Grid dots on the outline */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="white"
          strokeDasharray="1 15"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.25 }}
          transition={{ delay: 1, duration: 1 }}
        />

        {/* Pulsing station dots */}
        {countiesData.map((c) => {
          const isSelected = selectedCounty?.name === c.name;
          const isHovered = hoveredCounty?.name === c.name;
          // Scale size based on stations count
          const baseSize = 4 + c.stations * 0.45;
          const pulseSize = baseSize * 2.5;

          return (
            <g
              key={c.name}
              className={interactive ? 'cursor-pointer' : ''}
              onClick={() => interactive && onCountyClick?.(c)}
              onMouseEnter={() => interactive && setHoveredCounty(c)}
              onMouseLeave={() => interactive && setHoveredCounty(null)}
            >
              {/* Outer pulsing ring */}
              <circle
                cx={c.x}
                cy={c.y}
                r={pulseSize}
                fill={c.color}
                opacity="0.15"
                className="animate-ping"
                style={{ transformOrigin: `${c.x}px ${c.y}px` }}
              />

              {/* Hover/Selection Ring */}
              {(isHovered || isSelected) && (
                <motion.circle
                  cx={c.x}
                  cy={c.y}
                  r={baseSize + 6}
                  fill="none"
                  stroke={c.color}
                  strokeWidth="1.5"
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.8 }}
                  transition={{ duration: 0.25 }}
                />
              )}

              {/* Core dot */}
              <circle
                cx={c.x}
                cy={c.y}
                r={baseSize}
                fill={isSelected ? '#ffffff' : c.color}
                stroke="#051F20"
                strokeWidth="1.5"
                className="transition-all duration-200"
              />

              {/* Label for high-density stations (e.g. Nairobi, Mombasa) */}
              {(c.stations >= 9 || isHovered || isSelected) && (
                <text
                  x={c.x}
                  y={c.y - baseSize - 6}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="bold"
                  className="pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  {c.name} ({c.stations})
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
