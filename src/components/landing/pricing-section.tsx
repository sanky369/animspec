'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { CheckIcon, SparklesIcon, ZapIcon } from '@/components/ui/icons';
import { SignInModal } from '@/components/auth/sign-in-modal';

const CREDIT_COSTS = {
  fast: 1,
  balanced: 3,
  precise: 20,
};

const packs = [
  {
    id: 'creator',
    name: 'Creator Pack',
    price: 24,
    credits: 200,
    description: 'Perfect for side projects and experiments',
    analyses: {
      fast: 200,
      balanced: 66,
      precise: 10,
    },
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    price: 59,
    credits: 600,
    description: 'Best value for professional workflows',
    analyses: {
      fast: 600,
      balanced: 200,
      precise: 30,
    },
    popular: true,
  },
];

// TODO: Remove PAYMENTS_ENABLED flag once Lemon Squeezy is approved
const PAYMENTS_ENABLED = true;

export function PricingSection() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleBuyCredits = (packId: string) => {
    if (!PAYMENTS_ENABLED) {
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 3000);
      return;
    }
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    // Redirect to checkout - will be handled by dashboard
    window.location.href = `/dashboard/account?pack=${packId}`;
  };

  return (
    <section className="pricing-section" id="pricing">
      <div className="section-header">
        <span className="section-eyebrow">Pricing</span>
        <h2 className="section-title">Simple Credit Packs</h2>
        <p className="section-subtitle">
          Pay once, use anytime. No subscriptions, no expiration.
        </p>
      </div>

      {/* Free tier info */}
      <div className="free-tier-banner">
        <SparklesIcon className="w-5 h-5" />
        <div>
          <strong>Start free with 20 credits</strong>
          <span className="text-text-subtle"> — Sign up and get instant access</span>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="pricing-grid">
        {packs.map((pack) => (
          <div
            key={pack.id}
            className={`pricing-card ${pack.popular ? 'pricing-card-popular' : ''}`}
          >
            {pack.popular && (
              <div className="pricing-badge">Best Value</div>
            )}
            <div className="pricing-header">
              <h3 className="pricing-name">{pack.name}</h3>
              <p className="pricing-description">{pack.description}</p>
            </div>
            <div className="pricing-price">
              <span className="pricing-amount">${pack.price}</span>
              <span className="pricing-credits">{pack.credits} credits</span>
            </div>
            <ul className="pricing-features">
              <li>
                <CheckIcon className="w-4 h-4" />
                <span>~{pack.analyses.fast} fast analyses</span>
              </li>
              <li>
                <CheckIcon className="w-4 h-4" />
                <span>~{pack.analyses.balanced} balanced analyses</span>
              </li>
              <li>
                <CheckIcon className="w-4 h-4" />
                <span>~{pack.analyses.precise} precise analyses</span>
              </li>
              <li>
                <CheckIcon className="w-4 h-4" />
                <span>Unlock Precise mode (Gemini 3 Pro)</span>
              </li>
              <li>
                <CheckIcon className="w-4 h-4" />
                <span>Credits never expire</span>
              </li>
            </ul>
            <button
              className={`btn-full ${pack.popular ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleBuyCredits(pack.id)}
            >
              Get {pack.name}
            </button>
          </div>
        ))}
      </div>

      {/* Credit costs breakdown */}
      <div className="credits-breakdown">
        <h4 className="credits-breakdown-title">Credit Costs</h4>
        <div className="credits-table">
          <div className="credits-row">
            <span className="credits-quality">
              <ZapIcon className="w-4 h-4" />
              Fast
            </span>
            <span className="credits-model">Gemini 2.5 Flash</span>
            <span className="credits-cost">{CREDIT_COSTS.fast} credit</span>
          </div>
          <div className="credits-row">
            <span className="credits-quality">
              <ZapIcon className="w-4 h-4" />
              Balanced
            </span>
            <span className="credits-model">Gemini 3 Flash</span>
            <span className="credits-cost">{CREDIT_COSTS.balanced} credits</span>
          </div>
          <div className="credits-row">
            <span className="credits-quality">
              <ZapIcon className="w-4 h-4" />
              Precise
            </span>
            <span className="credits-model">Gemini 3 Pro</span>
            <span className="credits-cost">{CREDIT_COSTS.precise} credits</span>
          </div>
        </div>
        <p className="credits-note">
          Free accounts cannot use Precise mode. Purchase any pack to unlock.
        </p>
      </div>

      {showComingSoon && (
        <div className="coming-soon-toast" onClick={() => setShowComingSoon(false)}>
          <div className="coming-soon-toast-content">
            <ZapIcon className="w-5 h-5" />
            <div>
              <strong>Coming Soon!</strong>
              <p>Payments are being set up. Check back shortly.</p>
            </div>
          </div>
        </div>
      )}

      <SignInModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode="signup"
      />
    </section>
  );
}
