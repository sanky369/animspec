import type { Metadata } from 'next';
import { Outfit, Fraunces, JetBrains_Mono } from 'next/font/google';
import { AuthProvider } from '@/contexts/auth-context';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AnimSpec - Clone Any UI Animation to Code | CSS, GSAP, Framer Motion',
  description:
    'See an animation you love? Clone it. Upload a video, get agent-ready prompts and code specs. CSS, GSAP, Framer Motion output for Claude Code, Cursor & AI coding agents.',
  keywords: [
    'clone UI animation',
    'clone website animation',
    'copy animation CSS',
    'reverse engineer animation',
    'animation handoff',
    'video to CSS animation',
    'animation to code',
    'recreate animation',
    'Claude Code animation',
    'Cursor AI animation',
    'GSAP timeline',
    'Framer Motion',
    'CSS keyframes',
    'AI coding agent',
  ],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
