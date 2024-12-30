export const calculateMaxLosses = (
  riskPerTrade: number,
  maxDrawdown: number
): number => {
  return Math.floor(maxDrawdown / riskPerTrade);
};