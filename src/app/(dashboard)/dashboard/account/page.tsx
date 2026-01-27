'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { DashboardHeader, PricingModal } from '@/components/dashboard';
import { CoinsIcon, CheckIcon, ZapIcon, HistoryIcon } from '@/components/ui/icons';
import { CREDIT_COSTS, PACK_CREDITS, PACK_PRICES, type PackType } from '@/types/database';

export default function AccountPage() {
  const { profile, refreshProfile, refreshToken } = useAuth();
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [transactions, setTransactions] = useState<any[]>([]);

  // Check if redirected from pricing with a pack selection
  useEffect(() => {
    const pack = searchParams.get('pack');
    if (pack === 'creator' || pack === 'pro') {
      setShowPricingModal(true);
    }
  }, [searchParams]);

  // Fetch transaction history
  useEffect(() => {
    async function fetchTransactions() {
      try {
        // Refresh token before fetching to ensure it's valid
        await refreshToken();
        const response = await fetch('/api/transactions');
        if (response.ok) {
          const data = await response.json();
          setTransactions(data.transactions || []);
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    }

    fetchTransactions();
  }, [refreshToken]);

  const handleSelectPack = async (packType: PackType) => {
    setIsCheckoutLoading(true);

    try {
      // Refresh token before checkout to ensure it's valid
      await refreshToken();
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packType }),
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to Lemon Squeezy checkout
        window.location.href = data.checkoutUrl;
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to create checkout session');
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return (
    <>
      <DashboardHeader
        title="Billing"
        subtitle="Manage your credits and purchases"
        onMenuClick={() => setSidebarOpen(true)}
      />

      <div className="account-container">
        {/* Credits Overview */}
        <div className="account-section">
          <div className="credits-overview">
            <div className="credits-overview-main">
              <div className="credits-icon">
                <CoinsIcon />
              </div>
              <div className="credits-info">
                <div className="credits-balance">{profile?.creditsBalance ?? 0}</div>
                <div className="credits-label">Available Credits</div>
              </div>
            </div>
            <button
              className="btn-primary"
              onClick={() => setShowPricingModal(true)}
            >
              Buy More Credits
            </button>
          </div>
        </div>

        {/* Credit Costs Reference */}
        <div className="account-section">
          <h2 className="account-section-title">Credit Usage</h2>
          <div className="credit-usage-grid">
            <div className="credit-usage-card">
              <div className="credit-usage-header">
                <ZapIcon />
                <span>Fast</span>
              </div>
              <div className="credit-usage-cost">{CREDIT_COSTS.fast} credit</div>
              <div className="credit-usage-model">Gemini 2.5 Flash</div>
            </div>
            <div className="credit-usage-card">
              <div className="credit-usage-header">
                <ZapIcon />
                <span>Balanced</span>
              </div>
              <div className="credit-usage-cost">{CREDIT_COSTS.balanced} credits</div>
              <div className="credit-usage-model">Gemini 3 Flash</div>
            </div>
            <div className="credit-usage-card">
              <div className="credit-usage-header">
                <ZapIcon />
                <span>Precise</span>
              </div>
              <div className="credit-usage-cost">{CREDIT_COSTS.precise} credits</div>
              <div className="credit-usage-model">Gemini 3 Pro</div>
              {!profile?.isPaidUser && (
                <div className="credit-usage-locked">Requires paid account</div>
              )}
            </div>
          </div>
        </div>

        {/* Account Status */}
        <div className="account-section">
          <h2 className="account-section-title">Account Status</h2>
          <div className="account-status-card">
            <div className="account-status-row">
              <span>Account Type</span>
              {profile?.isPaidUser ? (
                <span className="badge badge-success">
                  <CheckIcon className="w-3 h-3" />
                  Paid
                </span>
              ) : (
                <span className="badge">Free</span>
              )}
            </div>
            <div className="account-status-row">
              <span>Precise Mode</span>
              {profile?.isPaidUser ? (
                <span className="badge badge-success">
                  <CheckIcon className="w-3 h-3" />
                  Unlocked
                </span>
              ) : (
                <span className="badge badge-subtle">Locked</span>
              )}
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="account-section">
          <h2 className="account-section-title">
            <HistoryIcon className="w-5 h-5" />
            Transaction History
          </h2>
          {transactions.length === 0 ? (
            <div className="transactions-empty">
              <p>No transactions yet</p>
            </div>
          ) : (
            <div className="transactions-list">
              {transactions.map((tx: any) => (
                <div key={tx.id} className="transaction-item">
                  <div className="transaction-info">
                    <div className="transaction-description">{tx.description}</div>
                    <div className="transaction-date">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`transaction-amount ${tx.amount > 0 ? 'positive' : 'negative'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount} credits
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        onSelectPack={handleSelectPack}
        isLoading={isCheckoutLoading}
      />
    </>
  );
}
