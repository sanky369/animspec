'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { Sidebar } from '@/components/dashboard';
import { BackgroundEffects } from '@/components/layout/background-effects';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to landing if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/?redirect=/dashboard');
    }
  }, [user, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner" />
      </div>
    );
  }

  // Don't render dashboard until authenticated
  if (!user) {
    return null;
  }

  return (
    <>
      <BackgroundEffects />
      <div className="dashboard-layout">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="dashboard-main">
          {/* Pass sidebar toggle function via context-like pattern */}
          <div data-sidebar-toggle onClick={() => setSidebarOpen(true)} style={{ display: 'none' }} />
          {children}
        </main>
      </div>
    </>
  );
}
