import { STANDARD_LOT_SIZE, STANDARD_LOT_PIP_VALUE } from './constants';
import type { CalculatorInputs, CalculationResults } from './types';

export const calculatePositions = (inputs: CalculatorInputs): CalculationResults => {
  // Calculate risk amount in dollars
  const riskAmount = inputs.accountSize * (inputs.riskPercent / 100);
  
  // Use stop loss pips directly
  const pipsAtRisk = inputs.stopLossPips;
  
  // Calculate position size in standard lots
  const positionSizeInStandardLots = riskAmount / (pipsAtRisk * STANDARD_LOT_PIP_VALUE);
  
  // Calculate units
  const totalUnits = positionSizeInStandardLots * STANDARD_LOT_SIZE;
  
  // Calculate lot sizes
  const standardLots = positionSizeInStandardLots.toFixed(2);
  const miniLots = (positionSizeInStandardLots * 10).toFixed(2);
  const microLots = (positionSizeInStandardLots * 100).toFixed(2);
  
  // Calculate pip value for the position
  const pipValue = (positionSizeInStandardLots * STANDARD_LOT_PIP_VALUE).toFixed(2);

  // Calculate actual stop loss price
  const stopLossPrice = (inputs.entryPrice - (inputs.stopLossPips / 10000)).toFixed(4);

  return {
    riskAmount: riskAmount.toFixed(2),
    standardLots,
    miniLots,
    microLots,
    units: totalUnits.toFixed(2),
    pipValue,
    pipsAtRisk: pipsAtRisk.toFixed(1),
    stopLossPrice
  };
};