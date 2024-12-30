import type { RiskZone, ZoneThresholds } from '../types/risk';

const DEFAULT_THRESHOLDS: ZoneThresholds = {
  redZone: -5,
  greenZone: 2,
  riskLevels: {
    red: 0.5,
    orange: 1,
    green: 2
  }
};

export const determineRiskZone = (
  initialBalance: number, 
  currentBalance: number,
  thresholds: ZoneThresholds = DEFAULT_THRESHOLDS
): RiskZone => {
  const profitLoss = currentBalance - initialBalance;
  const profitLossPercentage = (profitLoss / initialBalance) * 100;

  if (profitLossPercentage <= thresholds.redZone) {
    return {
      name: 'Red Zone',
      suggestedRisk: thresholds.riskLevels.red,
      color: 'bg-red-50 border-red-200',
      description: 'Deep drawdown detected. Reduced risk recommended to preserve capital.'
    };
  } 
  
  if (profitLossPercentage < thresholds.greenZone) {
    return {
      name: 'Orange Zone',
      suggestedRisk: thresholds.riskLevels.orange,
      color: 'bg-orange-50 border-orange-200',
      description: 'Near breakeven. Moderate risk approach suggested.'
    };
  }
  
  return {
    name: 'Green Zone',
    suggestedRisk: thresholds.riskLevels.green,
    color: 'bg-green-50 border-green-200',
    description: 'Account in profit. Standard risk parameters available.'
  };
};