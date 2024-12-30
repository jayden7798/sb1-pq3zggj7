export type AccountType = 'personal' | 'prop';

export interface PropAccountDetails {
  firmName: string;
  phase: 'evaluation1' | 'evaluation2' | 'funded';
  profitTarget: number;
  maxDailyLoss: number;
  maxTotalLoss: number;
  minTradingDays: number;
  maxTradingDays: number;
}

export interface RiskSettings {
  defaultRiskPerTrade: number;
  maxDailyDrawdown: number;
  maxTotalDrawdown: number;
  minStopLossPips: number;
}

export interface TradingAccount {
  id: string;
  nickname: string;
  type: AccountType;
  initialBalance: number;
  currentBalance: number;
  currency: string;
  riskSettings: RiskSettings;
  propDetails?: PropAccountDetails;
  createdAt: string;
  updatedAt: string;
}