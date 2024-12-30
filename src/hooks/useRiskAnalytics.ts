import { useMemo } from 'react';
import type { TradingAccount } from '../types/profile';
import type { RiskAnalytics } from '../types/risk';

export const useRiskAnalytics = (account: TradingAccount): RiskAnalytics => {
  return useMemo(() => {
    const profitLoss = account.currentBalance - account.initialBalance;
    const profitLossPercentage = (profitLoss / account.initialBalance) * 100;
    
    // Calculate risk score based on current drawdown and risk settings
    const riskScore = Math.max(0, Math.min(100, 100 - (Math.abs(profitLossPercentage) * 2)));
    
    return {
      metrics: {
        riskScore,
        riskScoreTrend: profitLossPercentage >= 0 ? 'up' : 'down',
        expectedDrawdown: Math.abs(profitLossPercentage).toFixed(1),
        drawdownTrend: profitLossPercentage >= 0 ? 'up' : 'down',
        riskAdjustedReturn: 1.5, // Example value
        rarTrend: 'up',
        valueAtRisk: account.currentBalance * (account.riskSettings.defaultRiskPerTrade / 100),
        varTrend: 'neutral'
      },
      distribution: {
        lowRisk: 40,
        moderateRisk: 35,
        highRisk: 25
      },
      trends: {
        riskExposure: '2.1x',
        riskExposureChange: 5.2,
        portfolioBeta: 1.2,
        betaChange: -2.3,
        correlation: 0.85,
        correlationChange: 1.5
      }
    };
  }, [account]);
};