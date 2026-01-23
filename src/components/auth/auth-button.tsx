'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { SignInModal } from './sign-in-modal';
import { UserIcon, ChevronDownIcon, LogOutIcon, SettingsIcon, CreditCardIcon } from '@/components/ui/icons';

export function AuthButton() {
  const router = useRouter();
  const { user, profile, isLoading, signOut } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalMode, setModalMode] = useState<'signin' | 'signup'>('signin');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLoginSuccess = () => {
    router.push('/dashboard');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="auth-button-skeleton">
        <div className="skeleton-circle" />
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <div className="auth-buttons">
          <button
            className="btn-ghost"
            onClick={() => {
              setModalMode('signin');
              setShowModal(true);
            }}
          >
            Sign in
          </button>
          <button
            className="btn-primary btn-sm"
            onClick={() => {
              setModalMode('signup');
              setShowModal(true);
            }}
          >
            Get Started
          </button>
        </div>
        <SignInModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSuccess={handleLoginSuccess}
          defaultMode={modalMode}
        />
      </>
    );
  }

  return (
    <div className="auth-user" ref={dropdownRef}>
      <button
        className="user-menu-button"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt="" className="user-avatar" />
        ) : (
          <div className="user-avatar-placeholder">
            <UserIcon />
          </div>
        )}
        <span className="user-credits">{profile?.creditsBalance ?? 0} credits</span>
        <ChevronDownIcon className={`dropdown-chevron ${showDropdown ? 'open' : ''}`} />
      </button>

      {showDropdown && (
        <div className="user-dropdown">
          <div className="dropdown-header">
            <p className="dropdown-email">{user.email}</p>
            <p className="dropdown-credits">
              <span className="credits-value">{profile?.creditsBalance ?? 0}</span> credits
            </p>
          </div>
          <div className="dropdown-divider" />
          <a href="/dashboard" className="dropdown-item">
            <SettingsIcon />
            Dashboard
          </a>
          <a href="/dashboard/account" className="dropdown-item">
            <CreditCardIcon />
            Buy Credits
          </a>
          <div className="dropdown-divider" />
          <button
            className="dropdown-item dropdown-item-danger"
            onClick={() => {
              signOut();
              setShowDropdown(false);
            }}
          >
            <LogOutIcon />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
