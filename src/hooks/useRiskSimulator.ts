import { useState, useCallback, useEffect } from 'react';
import type { TradingAccount } from '../types/profile';
import { calculateMaxLosses } from '../utils/risk';

interface RiskSimulation {
  riskPerTrade: number;
  maxConsecutiveLosses: number;
  riskAmount: number;
  isHighRisk: boolean;
}

export const useRiskSimulator = (account: TradingAccount) => {
  const [simulation, setSimulation] = useState<RiskSimulation>(() => ({
    riskPerTrade: account.riskSettings.defaultRiskPerTrade,
    maxConsecutiveLosses: calculateMaxLosses(
      account.riskSettings.defaultRiskPerTrade,
      account.riskSettings.maxTotalDrawdown
    ),
    riskAmount: (account.currentBalance * account.riskSettings.defaultRiskPerTrade) / 100,
    isHighRisk: account.riskSettings.defaultRiskPerTrade > 2
  }));

  // Update simulation when account balance changes
  useEffect(() => {
    updateSimulation(simulation.riskPerTrade);
  }, [account.currentBalance]);

  const updateSimulation = useCallback((newRiskPerTrade: number) => {
    const maxConsecutiveLosses = calculateMaxLosses(
      newRiskPerTrade,
      account.riskSettings.maxTotalDrawdown
    );
    const riskAmount = (account.currentBalance * newRiskPerTrade) / 100;

    setSimulation({
      riskPerTrade: newRiskPerTrade,
      maxConsecutiveLosses,
      riskAmount,
      isHighRisk: newRiskPerTrade > 2
    });
  }, [account.currentBalance, account.riskSettings.maxTotalDrawdown]);

  return {
    simulation,
    updateSimulation
  };
};