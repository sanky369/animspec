'use client';

import Image from 'next/image';
import { AuthButton } from '@/components/auth';

export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <a href="/" className="logo">
          <Image
            src="/logo.png"
            alt="AnimSpec"
            width={150}
            height={32}
            priority
          />
        </a>

        <nav className="header-nav">
          <a href="#video-demo" className="header-link">Demo</a>
          <a href="#demo" className="header-link">Try Free</a>
          <a href="#pricing" className="header-link">Pricing</a>
        </nav>

        <div className="header-actions">
          <span className="header-badge">BETA</span>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
