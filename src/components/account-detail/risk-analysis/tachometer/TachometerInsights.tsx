import React from 'react';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import type { ZoneInfo } from '../../../../types/risk';

interface TachometerInsightsProps {
  profitLoss: number;
  profitLossPercentage: number;
  currency: string;
  zoneInfo: ZoneInfo;
}

const TachometerInsights: React.FC<TachometerInsightsProps> = ({
  profitLoss,
  profitLossPercentage,
  currency,
  zoneInfo
}) => {
  const Icon = profitLossPercentage <= -2.1 ? AlertTriangle :
               profitLossPercentage < 2 ? TrendingDown : TrendingUp;

  return (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${zoneInfo.color} flex-shrink-0 mt-0.5`} />
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className={`font-medium ${zoneInfo.color}`}>
              {zoneInfo.label}
            </span>
            <span className={`text-sm ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {profitLossPercentage >= 0 ? '+' : ''}{profitLossPercentage.toFixed(2)}%
            </span>
          </div>
          <p className="text-sm text-gray-700">{zoneInfo.message}</p>
          <p className="text-sm text-gray-500">
            Current P/L: {currency} {Math.abs(profitLoss).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TachometerInsights;