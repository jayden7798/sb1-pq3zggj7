import { useMemo } from 'react';
import type { TradingAccount } from '../types/profile';
import { calculateDrawdown } from '../utils/drawdown';
import { calculateMaxLosses } from '../utils/risk';
import { calculateRecoveryAmount } from '../utils/performance';
import { determineRiskZone } from '../utils/riskZones';

export interface AccountMetrics {
  drawdown: {
    amount: number;
    percentage: number;
    consecutiveLosses: number;
  };
  risk: {
    maxConsecutiveLosses: number;
    riskAmount: number;
    maxDailyLoss: number;
    alertThreshold: number;
  };
  recovery: {
    requiredAmount: number;
    suggestedRiskReduction: number;
  };
  zone: {
    name: string;
    suggestedRisk: number;
    color: string;
    description: string;
  };
}

export const useAccountMetrics = (account: TradingAccount): AccountMetrics => {
  return useMemo(() => {
    const drawdown = calculateDrawdown(
      account.initialBalance,
      account.currentBalance,
      account.riskSettings.defaultRiskPerTrade
    );

    const maxConsecutiveLosses = calculateMaxLosses(
      account.riskSettings.defaultRiskPerTrade,
      account.riskSettings.maxTotalDrawdown
    );

    const riskAmount = (account.currentBalance * account.riskSettings.defaultRiskPerTrade) / 100;
    const maxDailyLoss = (account.currentBalance * account.riskSettings.maxDailyDrawdown) / 100;
    const alertThreshold = Math.max(3, Math.floor(maxConsecutiveLosses * 0.3));

    const recoveryAmount = calculateRecoveryAmount(
      account.currentBalance,
      drawdown.estimatedConsecutiveLosses,
      account.riskSettings.defaultRiskPerTrade
    );

    const zone = determineRiskZone(account.initialBalance, account.currentBalance);

    return {
      drawdown: {
        amount: drawdown.drawdownAmount,
        percentage: drawdown.drawdownPercentage,
        consecutiveLosses: drawdown.estimatedConsecutiveLosses
      },
      risk: {
        maxConsecutiveLosses,
        riskAmount,
        maxDailyLoss,
        alertThreshold
      },
      recovery: {
        requiredAmount: recoveryAmount,
        suggestedRiskReduction: account.riskSettings.defaultRiskPerTrade * 0.75
      },
      zone
    };
  }, [account]);
};