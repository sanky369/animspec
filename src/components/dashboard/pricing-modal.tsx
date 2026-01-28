'use client';

import { useState } from 'react';
import { XIcon, CheckIcon, ZapIcon } from '@/components/ui/icons';
import { PACK_CREDITS, PACK_PRICES, CREDIT_COSTS, type PackType } from '@/types/database';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPack: (packType: PackType) => void;
  isLoading?: boolean;
}

const packs: { id: PackType; name: string; description: string; popular: boolean }[] = [
  {
    id: 'creator',
    name: 'Creator Pack',
    description: 'Perfect for side projects',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro Pack',
    description: 'Best value for professionals',
    popular: true,
  },
];

// TODO: Remove PAYMENTS_ENABLED flag once Lemon Squeezy is approved
const PAYMENTS_ENABLED = false;

export function PricingModal({ isOpen, onClose, onSelectPack, isLoading }: PricingModalProps) {
  const [selectedPack, setSelectedPack] = useState<PackType | null>(null);
  const [showComingSoon, setShowComingSoon] = useState(false);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (!PAYMENTS_ENABLED) {
      setShowComingSoon(true);
      setTimeout(() => setShowComingSoon(false), 3000);
      return;
    }
    if (selectedPack) {
      onSelectPack(selectedPack);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-content-lg" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <XIcon />
        </button>

        <div className="modal-header">
          <h2 className="modal-title">Buy Credits</h2>
          <p className="modal-subtitle">Choose a credit pack to continue</p>
        </div>

        <div className="pricing-modal-grid">
          {packs.map((pack) => {
            const credits = PACK_CREDITS[pack.id];
            const priceCents = PACK_PRICES[pack.id];
            const priceFormatted = (priceCents / 100).toFixed(0);
            const balancedAnalyses = Math.floor(credits / CREDIT_COSTS.balanced);
            const preciseAnalyses = Math.floor(credits / CREDIT_COSTS.precise);
            const kimiAnalyses = Math.floor(credits / CREDIT_COSTS.kimi);

            return (
              <div
                key={pack.id}
                className={`pricing-modal-card ${selectedPack === pack.id ? 'selected' : ''} ${pack.popular ? 'popular' : ''}`}
                onClick={() => setSelectedPack(pack.id)}
              >
                {pack.popular && <div className="pricing-badge">Best Value</div>}
                <div className="pricing-modal-header">
                  <h3>{pack.name}</h3>
                  <p>{pack.description}</p>
                </div>
                <div className="pricing-modal-price">
                  <span className="price">${priceFormatted}</span>
                  <span className="credits">{credits} credits</span>
                </div>
                <ul className="pricing-modal-features">
                  <li>
                    <CheckIcon className="w-4 h-4" />
                    ~{balancedAnalyses} good analyses
                  </li>
                  <li>
                    <CheckIcon className="w-4 h-4" />
                    ~{preciseAnalyses} precise analyses
                  </li>
                  <li>
                    <CheckIcon className="w-4 h-4" />
                    ~{kimiAnalyses} Kimi K2.5 analyses
                  </li>
                  <li>
                    <CheckIcon className="w-4 h-4" />
                    Unlocks Precise mode
                  </li>
                </ul>
              </div>
            );
          })}
        </div>

        <div className="pricing-modal-footer">
          <button
            className="btn-primary btn-full"
            onClick={handleContinue}
            disabled={!selectedPack || isLoading}
          >
            {isLoading ? 'Processing...' : `Continue to Checkout`}
          </button>
          <p className="pricing-modal-note">
            <ZapIcon className="w-4 h-4" />
            Credits never expire. One-time purchase.
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
      </div>
    </div>
  );
}
