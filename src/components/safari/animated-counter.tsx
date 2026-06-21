'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValue, animate, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({
  value,
  duration = 1.5,
  decimals = 0,
  prefix = '',
  suffix = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);
  const motionValue = useMotionValue(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, {
        duration,
        ease: 'easeOut' as const,
        onUpdate: (v) => {
          setDisplayed(v);
        },
      });
      return controls.stop;
    }
  }, [inView, value, duration, motionValue]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <span ref={ref}>
      {prefix}
      {formatNumber(displayed)}
      {suffix}
    </span>
  );
}
