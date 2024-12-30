export const calculateRecoveryAmount = (
  currentBalance: number,
  consecutiveLosses: number,
  riskPerTrade: number
): number => {
  // Calculate the total loss amount that needs to be recovered
  const riskPerTradeAmount = (currentBalance * riskPerTrade) / 100;
  const totalLoss = riskPerTradeAmount * consecutiveLosses;
  
  // Return the exact amount needed to recover the losses
  return totalLoss;
};