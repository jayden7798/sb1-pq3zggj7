export interface CalculatorInputs {
  accountSize: number;
  riskPercent: number;
  entryPrice: number;
  stopLossPips: number;
}

export interface CalculationResults {
  riskAmount: string;
  standardLots: string;
  miniLots: string;
  microLots: string;
  units: string;
  pipValue: string;
  pipsAtRisk: string;
  stopLossPrice: string;
}