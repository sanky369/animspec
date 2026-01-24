'use client';

import { PlayIcon, TwitterIcon, GithubIcon } from '@/components/ui/icons';

export function Footer() {
  return (
    <footer className="footer-full">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <div className="logo-icon logo-icon-sm">
                <PlayIcon className="w-4 h-4 text-white" />
              </div>
              <span className="logo-text">AnimSpec</span>
            </a>
            <p className="footer-tagline">
              Transform any animation video into precise, agent-ready instructions for AI coding tools.
            </p>
            <p className="footer-powered">
              Powered by Google Gemini
            </p>
          </div>

          {/* Product links */}
          <div className="footer-column">
            <h4 className="footer-column-title">Product</h4>
            <ul className="footer-links">
              <li><a href="#demo">Demo</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4 className="footer-column-title">Contact</h4>
            <p className="footer-tagline">
              Any questions? Write a mail to{' '}
              <a href="mailto:team@tinkerbrains.com" className="text-white hover:underline">
                team@tinkerbrains.com
              </a>
            </p>
          </div>

          {/* Legal links */}
          <div className="footer-column">
            <h4 className="footer-column-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} AnimSpec. All rights reserved.
          </p>
          <div className="footer-social">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <TwitterIcon className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <GithubIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
