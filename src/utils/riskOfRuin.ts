import { TradingAccount } from '../types/profile';

interface RiskOfRuinParams {
  winRate: number;          // Percentage (e.g., 55 for 55%)
  riskRewardRatio: number;  // e.g., 2 for 1:2
  riskPerTrade: number;     // Percentage (e.g., 2 for 2%)
  consecutiveLosses: number;
}

export const calculateRiskOfRuin = ({
  winRate,
  riskRewardRatio,
  riskPerTrade,
  consecutiveLosses
}: RiskOfRuinParams): number => {
  // Convert percentages to decimals
  const winProbability = winRate / 100;
  const lossProbability = 1 - winProbability;
  const riskDecimal = riskPerTrade / 100;

  // Calculate expected value per trade
  const expectedValue = (winProbability * riskRewardRatio) - lossProbability;

  // If expected value is negative, risk of ruin is 100%
  if (expectedValue <= 0) {
    return 99.99;
  }

  // Calculate risk-adjusted probability using Kelly Criterion
  const kellyFraction = (expectedValue) / (riskRewardRatio * riskRewardRatio);

  // If risking more than Kelly suggests, increase risk of ruin
  const riskAdjustment = Math.max(1, riskDecimal / kellyFraction);

  // Calculate probability of ruin using gambler's ruin formula
  // P(ruin) = ((1-p)/p)^N where:
  // p = probability of winning adjusted for risk/reward
  // N = number of units (consecutive losses until ruin)
  const adjustedWinProb = 0.5 + (expectedValue / (2 * riskAdjustment * riskRewardRatio));
  const adjustedLossProb = 1 - adjustedWinProb;
  
  const ruinProbability = Math.pow(adjustedLossProb / adjustedWinProb, consecutiveLosses);

  // Return percentage capped at 99.99%
  return Math.min(99.99, ruinProbability * 100);
};

export const getRiskOfRuinSeverity = (ror: number): {
  label: string;
  color: string;
  description: string;
} => {
  if (ror < 0.1) {
    return {
      label: 'Minimal',
      color: 'text-green-600',
      description: 'Your current risk settings provide excellent capital protection with virtually no risk of ruin.'
    };
  }
  if (ror < 1) {
    return {
      label: 'Very Low',
      color: 'text-blue-600',
      description: 'Your risk settings are well-optimized for long-term survival.'
    };
  }
  if (ror < 5) {
    return {
      label: 'Low',
      color: 'text-yellow-600',
      description: 'Your risk is manageable but consider improving your win rate or risk/reward ratio.'
    };
  }
  if (ror < 15) {
    return {
      label: 'Moderate',
      color: 'text-orange-600',
      description: 'Warning: Consider reducing risk per trade or improving your trading strategy.'
    };
  }
  return {
    label: 'High',
    color: 'text-red-600',
    description: 'Critical Warning: Extremely high probability of account ruin. Reduce risk immediately.'
  };
};