import { useMemo } from 'react';
import { useRiskZones } from './useRiskZones';

interface RiskLevel {
  label: string;
  color: string;
  warning?: string;
}

export const useRiskLevel = (risk: number) => {
  const { thresholds } = useRiskZones();

  return useMemo(() => {
    let level: RiskLevel;

    if (risk <= thresholds.riskLevels.red) {
      level = { 
        label: 'Conservative',
        color: 'text-blue-600'
      };
    } else if (risk <= thresholds.riskLevels.orange) {
      level = {
        label: 'Moderate',
        color: 'text-yellow-600'
      };
    } else if (risk <= thresholds.riskLevels.green) {
      level = {
        label: 'Aggressive',
        color: 'text-green-600'
      };
    } else {
      level = {
        label: 'Extremely Aggressive',
        color: 'text-red-600',
        warning: 'Risk levels above 2% are considered extremely aggressive and can lead to significant account drawdowns. Most professional traders keep risk between 0.5% to 2% per trade.'
      };
    }

    return {
      level,
      warning: level.warning
    };
  }, [risk, thresholds]);
};