import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BackgroundEffects } from '@/components/layout/background-effects';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AnimSpec.ai',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  description:
    'AI-powered video animation analyzer that converts animation videos into developer-ready specifications in 15 formats including CSS, Tailwind, React Native, Lottie, and Figma.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free tier with 20 credits. Credit packs available.',
  },
  featureList: [
    'Clone UI animations from video',
    'Extract design tokens and styles',
    'Generate Tailwind animate configs',
    'Export to React Native Reanimated',
    'Generate Lottie/Rive specifications',
    'Create Figma motion specs',
    'Accessibility audit with WCAG compliance',
    'Animation performance budget analysis',
    'Interaction state machine generation',
    'Storyboard breakdown',
  ],
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackgroundEffects />
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}
