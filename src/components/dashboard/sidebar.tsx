'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context';
import {
  PlusIcon,
  HistoryIcon,
  SettingsIcon,
  CreditCardIcon,
  UserIcon,
  LogOutIcon,
  ChevronLeftIcon,
} from '@/components/ui/icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: '/dashboard', icon: PlusIcon, label: 'New Analysis' },
  { href: '/dashboard/history', icon: HistoryIcon, label: 'History' },
];

const accountItems = [
  { href: '/dashboard/settings', icon: SettingsIcon, label: 'Settings' },
  { href: '/dashboard/account', icon: CreditCardIcon, label: 'Billing' },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <a href="/" className="sidebar-logo">
            <Image
              src="/logo.png"
              alt="AnimSpec"
              width={130}
              height={28}
              priority
            />
          </a>
          <button className="sidebar-toggle lg:hidden" onClick={onClose}>
            <ChevronLeftIcon />
          </button>
        </div>

        <div className="sidebar-content">
          {/* Main nav */}
          <div className="sidebar-section">
            <div className="sidebar-section-title">Main</div>
            <nav className="sidebar-nav">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>

          {/* Account nav */}
          <div className="sidebar-section">
            <div className="sidebar-section-title">Account</div>
            <nav className="sidebar-nav">
              {accountItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="sidebar-footer">
          {/* Credits display */}
          <div className="sidebar-credits">
            <div className="sidebar-credits-info">
              <span className="sidebar-credits-label">Credits</span>
              <span className="sidebar-credits-value">{profile?.creditsBalance ?? 0}</span>
            </div>
            <a href="/dashboard/account" className="sidebar-credits-btn">
              Buy More
            </a>
          </div>

          {/* User profile */}
          <div className="sidebar-user">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="" className="sidebar-user-avatar" />
            ) : (
              <div className="sidebar-user-avatar-placeholder">
                <UserIcon />
              </div>
            )}
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">
                {profile?.fullName || user?.email?.split('@')[0] || 'User'}
              </div>
              <div className="sidebar-user-email">{user?.email}</div>
            </div>
            <button
              className="sidebar-signout"
              onClick={handleSignOut}
              title="Sign out"
            >
              <LogOutIcon />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
