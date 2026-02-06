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
  title: 'AnimSpec — AI Video Animation Analyzer | 15 Output Formats',
  description:
    'Upload any animation video and get developer-ready specs in 15 formats: CSS keyframes, Tailwind, React Native, Lottie, Figma motion specs, accessibility audits, and more. Powered by Google Gemini AI.',
  keywords: [
    'video animation to code',
    'AI animation analyzer',
    'animation to CSS keyframes',
    'video to Tailwind animate',
    'clone UI animation',
    'animation specification tool',
    'motion design handoff',
    'Lottie export from video',
    'Figma motion spec',
    'React Native Reanimated',
    'animation accessibility audit',
    'animation performance budget',
    'reverse engineer animation',
    'animation to code converter',
    'AI coding agent',
    'Claude Code',
    'storyboard breakdown',
    'design token extraction',
    'interaction state machine',
  ],
  openGraph: {
    title: 'AnimSpec — AI Video Animation Analyzer',
    description:
      'Upload any animation video and get developer-ready specs in 15 formats. Clone animations, extract design tokens, audit accessibility, and export to any framework.',
    type: 'website',
    siteName: 'AnimSpec.ai',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AnimSpec — AI Video Animation Analyzer',
    description:
      'Upload any animation video → get structured specs in 15 formats. CSS, Tailwind, Lottie, React Native, Figma, and more.',
  },
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
  alternates: {
    canonical: 'https://animspec.ai',
  },
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
