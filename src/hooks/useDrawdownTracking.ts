import { useMemo } from 'react';
import type { TradingAccount } from '../types/profile';
import { calculateDrawdown } from '../utils/drawdown';

export const useDrawdownTracking = (account: TradingAccount) => {
  return useMemo(() => {
    return calculateDrawdown(
      account.initialBalance,
      account.currentBalance,
      account.riskSettings.defaultRiskPerTrade
    );
  }, [account.initialBalance, account.currentBalance, account.riskSettings.defaultRiskPerTrade]);
};