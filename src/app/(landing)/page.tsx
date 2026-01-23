import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/landing';

// Dynamic imports for below-the-fold components to improve initial load
const DemoSection = dynamic(
  () => import('@/components/landing/demo-section').then((m) => m.DemoSection),
  {
    loading: () => (
      <section className="demo-section">
        <div className="demo-loading-placeholder" />
      </section>
    ),
  }
);

const HowItWorks = dynamic(
  () => import('@/components/landing/how-it-works').then((m) => m.HowItWorks),
  {
    loading: () => <div className="section-placeholder" />,
  }
);

const PricingSection = dynamic(
  () => import('@/components/landing/pricing-section').then((m) => m.PricingSection),
  {
    loading: () => <div className="section-placeholder" />,
  }
);

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <DemoSection />
      <HowItWorks />
      <PricingSection />
    </>
  );
}
