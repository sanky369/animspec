import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BackgroundEffects } from '@/components/layout/background-effects';

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BackgroundEffects />
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}
