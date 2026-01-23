'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { DashboardHeader } from '@/components/dashboard';
import { UserIcon } from '@/components/ui/icons';

export default function SettingsPage() {
  const { user, profile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <DashboardHeader
        title="Settings"
        subtitle="Manage your account settings"
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="settings-container">
        {/* Profile Section */}
        <div className="settings-section">
          <h2 className="settings-section-title">Profile</h2>
          <div className="settings-card">
            <div className="settings-row">
              <div className="settings-avatar">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="" />
                ) : (
                  <div className="settings-avatar-placeholder">
                    <UserIcon />
                  </div>
                )}
              </div>
              <div className="settings-info">
                <div className="settings-label">Display Name</div>
                <div className="settings-value">
                  {profile?.fullName || user?.email?.split('@')[0] || 'User'}
                </div>
              </div>
            </div>
            <div className="settings-row">
              <div className="settings-info">
                <div className="settings-label">Email</div>
                <div className="settings-value">{user?.email}</div>
              </div>
            </div>
            <div className="settings-row">
              <div className="settings-info">
                <div className="settings-label">Account Created</div>
                <div className="settings-value">
                  {profile?.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Unknown'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Type Section */}
        <div className="settings-section">
          <h2 className="settings-section-title">Account Type</h2>
          <div className="settings-card">
            <div className="settings-row">
              <div className="settings-info">
                <div className="settings-label">Status</div>
                <div className="settings-value">
                  {profile?.isPaidUser ? (
                    <span className="badge badge-success">Paid Account</span>
                  ) : (
                    <span className="badge">Free Account</span>
                  )}
                </div>
              </div>
            </div>
            {!profile?.isPaidUser && (
              <div className="settings-upgrade-hint">
                <p>Upgrade to unlock Precise mode with Gemini 3 Pro</p>
                <a href="/dashboard/account" className="btn-primary btn-sm">
                  Buy Credits
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="settings-section">
          <h2 className="settings-section-title settings-section-danger">Danger Zone</h2>
          <div className="settings-card settings-card-danger">
            <div className="settings-row">
              <div className="settings-info">
                <div className="settings-label">Delete Account</div>
                <div className="settings-description">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </div>
              </div>
              <button className="btn-danger" disabled>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
