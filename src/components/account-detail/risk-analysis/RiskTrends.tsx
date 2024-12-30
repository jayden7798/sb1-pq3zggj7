import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { RiskTrendsData } from '../../../types/risk';

interface RiskTrendsProps {
  trends: RiskTrendsData;
}

const RiskTrends: React.FC<RiskTrendsProps> = ({ trends }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Risk Trends</h3>
      <div className="grid gap-3">
        <TrendItem
          label="Risk Exposure"
          value={trends.riskExposure}
          change={trends.riskExposureChange}
        />
        <TrendItem
          label="Portfolio Beta"
          value={trends.portfolioBeta.toFixed(2)}
          change={trends.betaChange}
        />
        <TrendItem
          label="Correlation"
          value={`${(trends.correlation * 100).toFixed(1)}%`}
          change={trends.correlationChange}
        />
      </div>
    </div>
  );
};

interface TrendItemProps {
  label: string;
  value: string | number;
  change: number;
}

const TrendItem: React.FC<TrendItemProps> = ({ label, value, change }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <span className="text-gray-600">{label}</span>
      <div className="flex items-center gap-3">
        <span className="font-medium">{value}</span>
        <div className={`flex items-center gap-1 ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm">
            {Math.abs(change)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default RiskTrends;