import { useMemo } from 'react';
import type { TradingAccount } from '../types/profile';
import { calculateMaxLosses } from '../utils/risk';

export interface RiskMetrics {
  maxConsecutiveLosses: number;
  customConsecutiveLosses: number;
  alertThreshold: number;
  riskAmount: number;
  maxDailyLoss: number;
}

export const useRiskMetrics = (
  account: TradingAccount,
  customThreshold?: number
): RiskMetrics => {
  return useMemo(() => {
    const maxConsecutiveLosses = calculateMaxLosses(
      account.riskSettings.defaultRiskPerTrade,
      account.riskSettings.maxTotalDrawdown
    );

    const customConsecutiveLosses = customThreshold || maxConsecutiveLosses;
    const alertThreshold = Math.max(3, Math.floor(customConsecutiveLosses * 0.3));
    const riskAmount = (account.currentBalance * account.riskSettings.defaultRiskPerTrade) / 100;
    const maxDailyLoss = (account.currentBalance * account.riskSettings.maxDailyDrawdown) / 100;

    return {
      maxConsecutiveLosses,
      customConsecutiveLosses,
      alertThreshold,
      riskAmount,
      maxDailyLoss
    };
  }, [account.currentBalance, account.riskSettings, customThreshold]);
};