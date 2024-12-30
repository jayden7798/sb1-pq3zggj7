import React from 'react';
import type { RiskMetricsData } from '../../../types/risk';

interface RiskMetricsProps {
  metrics: RiskMetricsData;
  currency: string;
}

const RiskMetrics: React.FC<RiskMetricsProps> = ({ metrics, currency }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <MetricCard
        label="Risk Score"
        value={`${metrics.riskScore}/100`}
        trend={metrics.riskScoreTrend}
      />
      <MetricCard
        label="Expected Drawdown"
        value={`${metrics.expectedDrawdown}%`}
        trend={metrics.drawdownTrend}
      />
      <MetricCard
        label="Risk-Adjusted Return"
        value={metrics.riskAdjustedReturn.toFixed(2)}
        trend={metrics.rarTrend}
      />
      <MetricCard
        label="Value at Risk"
        value={`${currency} ${metrics.valueAtRisk.toLocaleString()}`}
        trend={metrics.varTrend}
      />
    </div>
  );
};

interface MetricCardProps {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, trend }) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-500';
      case 'down': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-sm text-gray-600">{label}</p>
      <p className={`text-lg font-semibold mt-1 ${getTrendColor()}`}>{value}</p>
    </div>
  );
};

export default RiskMetrics;