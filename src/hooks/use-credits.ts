'use client';

import { useAuth } from '@/contexts/auth-context';
import { CREDIT_COSTS, type QualityLevel } from '@/types/database';

export function useCredits() {
  const { profile, refreshProfile } = useAuth();

  const credits = profile?.creditsBalance ?? 0;
  const isPaidUser = profile?.isPaidUser ?? false;

  const canUseQuality = (quality: QualityLevel): boolean => {
    if (quality === 'precise' && !isPaidUser) return false;
    return credits >= CREDIT_COSTS[quality];
  };

  const getQualityCost = (quality: QualityLevel): number => {
    return CREDIT_COSTS[quality];
  };

  return {
    credits,
    isPaidUser,
    canUseQuality,
    getQualityCost,
    refreshCredits: refreshProfile,
  };
}
