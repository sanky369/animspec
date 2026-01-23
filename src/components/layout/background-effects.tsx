'use client';

import { useEffect, useRef } from 'react';

export function BackgroundEffects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth) * 100;
      const y = (clientY / innerHeight) * 100;

      document.documentElement.style.setProperty('--mouse-x', `${x}%`);
      document.documentElement.style.setProperty('--mouse-y', `${y}%`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="bg-base">
      {/* Film grain texture */}
      <div className="bg-grain" />

      {/* Warm ambient glows */}
      <div className="bg-glow-primary" />
      <div className="bg-glow-secondary" />

      {/* Film strip decoration */}
      <div className="bg-filmstrip" />

      {/* Cinematic vignette */}
      <div className="bg-vignette" />

      {/* Subtle scan lines */}
      <div className="bg-scanline" />
    </div>
  );
}
