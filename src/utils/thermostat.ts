import type { ZoneThresholds } from '../types/risk';

export const calculateThermometerPosition = (
  profitLossPercentage: number,
  thresholds: ZoneThresholds
): number => {
  // Convert profit/loss percentage to a position on the thermometer (0-100)
  const totalRange = Math.abs(thresholds.redZone) + thresholds.greenZone;
  const normalizedValue = profitLossPercentage + Math.abs(thresholds.redZone);
  return Math.max(0, Math.min(100, (normalizedValue / totalRange) * 100));
};