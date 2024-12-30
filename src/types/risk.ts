// Add these types to the existing risk.ts file

export interface RiskMetricsData {
  riskScore: number;
  riskScoreTrend: 'up' | 'down' | 'neutral';
  expectedDrawdown: string;
  drawdownTrend: 'up' | 'down' | 'neutral';
  riskAdjustedReturn: number;
  rarTrend: 'up' | 'down' | 'neutral';
  valueAtRisk: number;
  varTrend: 'up' | 'down' | 'neutral';
}

export interface RiskDistributionData {
  lowRisk: number;
  moderateRisk: number;
  highRisk: number;
}

export interface RiskTrendsData {
  riskExposure: string;
  riskExposureChange: number;
  portfolioBeta: number;
  betaChange: number;
  correlation: number;
  correlationChange: number;
}

export interface RiskAnalytics {
  metrics: RiskMetricsData;
  distribution: RiskDistributionData;
  trends: RiskTrendsData;
}