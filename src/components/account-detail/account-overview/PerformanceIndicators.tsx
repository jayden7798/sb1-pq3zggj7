import React from 'react';
import { BarChart2, TrendingDown } from 'lucide-react';
import DrawdownDisplay from '../DrawdownDisplay';
import type { AccountMetrics } from '../../../hooks/useAccountMetrics';

interface PerformanceIndicatorsProps {
  metrics: AccountMetrics;
  currency: string;
}

const PerformanceIndicators: React.FC<PerformanceIndicatorsProps> = ({ metrics, currency }) => {
  const profitLoss = metrics.drawdown.amount;
  const profitLossPercentage = metrics.drawdown.percentage;

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <BarChart2 className="w-4 h-4 text-blue-500" />
        Performance Overview
      </h3>

      <div className="space-y-3">
        <div className="p-3 bg-gray-50 rounded-lg">
          <span className="text-sm text-gray-600">Profit/Loss</span>
          <p className={`font-medium mt-1 ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {currency} {Math.abs(profitLoss).toLocaleString()} ({Math.abs(profitLossPercentage).toFixed(2)}%)
          </p>
        </div>

        <DrawdownDisplay 
          metrics={metrics.drawdown}
          currency={currency}
        />
      </div>
    </div>
  );
};

export default PerformanceIndicators;