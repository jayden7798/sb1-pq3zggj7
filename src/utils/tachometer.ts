export const calculateNeedleRotation = (profitLossPercentage: number): number => {
  // Define the range for each zone
  const minValue = -50;  // Maximum drawdown
  const maxValue = 10;   // Maximum profit display
  const neutralZone = 0; // Breakeven point
  
  // Clamp the value between min and max
  const clampedValue = Math.max(minValue, Math.min(maxValue, profitLossPercentage));
  
  // Calculate the base rotation (-90 to +90 degrees)
  // At breakeven (0%), the needle should point straight up (0 degrees)
  const totalRange = Math.abs(minValue) + Math.abs(maxValue);
  const normalizedValue = clampedValue - neutralZone;
  const rotationRange = 180; // Total range of motion (-90 to +90)
  
  // Calculate rotation with breakeven at 0 degrees
  const rotation = (normalizedValue / totalRange) * rotationRange;
  
  // Round to 2 decimal places for smooth animation
  return Math.round(rotation * 100) / 100;
};

export const getZoneColor = (profitLossPercentage: number): string => {
  if (profitLossPercentage <= -2.1) return 'text-red-600';
  if (profitLossPercentage < 2) return 'text-orange-600';
  return 'text-green-600';
};

export const getZoneMessage = (profitLossPercentage: number): string => {
  if (profitLossPercentage <= -2.1) {
    return 'High Risk: Consider reducing position sizes and reviewing strategy';
  }
  if (profitLossPercentage < 2) {
    return 'Break-even: Maintain consistent risk management';
  }
  return 'Performance: Account showing positive returns';
};