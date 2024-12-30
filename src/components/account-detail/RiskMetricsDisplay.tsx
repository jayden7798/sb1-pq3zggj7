import React from 'react';
import type { RiskMetrics } from '../../hooks/useRiskMetrics';

interface RiskMetricsDisplayProps {
  metrics: RiskMetrics;
  currency: string;
}

const RiskMetricsDisplay: React.FC<RiskMetricsDisplayProps> = ({ metrics, currency }) => {
  const isCustomThreshold = metrics.customConsecutiveLosses !== metrics.maxConsecutiveLosses;

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="text-gray-600">Maximum Safe Threshold</span>
        <span className="font-semibold">{metrics.maxConsecutiveLosses} trades</span>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="text-gray-600">Risk per Trade Amount</span>
        <span className="font-semibold">{currency} {metrics.riskAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="text-gray-600">Max Daily Loss</span>
        <span className="font-semibold">{currency} {metrics.maxDailyLoss.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
      </div>

      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <span className="text-gray-600">Alert Threshold</span>
        <span className="font-semibold">{metrics.alertThreshold} trades</span>
      </div>
    </div>
  );
};

export default RiskMetricsDisplay;