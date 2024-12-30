import { useState, useCallback } from 'react';
import type { ZoneThresholds, ZoneInfo } from '../types/risk';

const DEFAULT_THRESHOLDS: ZoneThresholds = {
  redZone: -2.1,    // Risk zone threshold
  greenZone: 2,     // Performance zone threshold
  maxDrawdown: -50  // Maximum allowable drawdown
};

export const useRiskZones = () => {
  const [thresholds, setThresholds] = useState<ZoneThresholds>(() => {
    const saved = localStorage.getItem('riskZoneThresholds');
    return saved ? JSON.parse(saved) : DEFAULT_THRESHOLDS;
  });

  const updateThresholds = useCallback((newThresholds: ZoneThresholds) => {
    setThresholds(newThresholds);
    localStorage.setItem('riskZoneThresholds', JSON.stringify(newThresholds));
  }, []);

  const getZoneInfo = useCallback((currentBalance: number, initialBalance: number): ZoneInfo => {
    const profitLoss = currentBalance - initialBalance;
    const profitLossPercentage = (profitLoss / initialBalance) * 100;

    if (profitLossPercentage <= thresholds.redZone) {
      return {
        zone: 'red',
        color: 'text-red-600',
        label: 'Risk Zone',
        message: 'Account requires attention. Consider reducing position sizes.'
      };
    }

    if (profitLossPercentage < thresholds.greenZone) {
      return {
        zone: 'neutral',
        color: 'text-orange-600',
        label: 'Break-even Zone',
        message: 'Account within normal fluctuation range.'
      };
    }

    return {
      zone: 'green',
      color: 'text-green-600',
      label: 'Performance Zone',
      message: 'Account performing well. Maintain discipline.'
    };
  }, [thresholds]);

  return {
    thresholds,
    updateThresholds,
    getZoneInfo,
  };
};