export interface DrawdownMetrics {
  drawdownAmount: number;
  drawdownPercentage: number;
  estimatedConsecutiveLosses: number;
}

export const calculateDrawdown = (
  initialBalance: number,
  currentBalance: number,
  riskPerTrade: number
): DrawdownMetrics => {
  const drawdownAmount = Math.max(0, initialBalance - currentBalance);
  const drawdownPercentage = (drawdownAmount / initialBalance) * 100;
  
  // Calculate consecutive losses based on risk per trade
  // For a $100,000 account with 1% risk per trade ($1,000 per trade)
  // and $2,000 drawdown, this would be 2 consecutive losses
  const riskAmount = (initialBalance * riskPerTrade) / 100;
  const estimatedConsecutiveLosses = Math.ceil(drawdownAmount / riskAmount);

  return {
    drawdownAmount,
    drawdownPercentage,
    estimatedConsecutiveLosses
  };
};