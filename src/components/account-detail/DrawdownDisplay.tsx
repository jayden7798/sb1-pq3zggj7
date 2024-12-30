import React from 'react';
import { TrendingDown } from 'lucide-react';

interface DrawdownDisplayProps {
  metrics: {
    amount: number;
    percentage: number;
    consecutiveLosses: number;
  };
  currency: string;
}

const DrawdownDisplay: React.FC<DrawdownDisplayProps> = ({ metrics, currency }) => {
  // Return null if no drawdown
  if (!metrics || metrics.amount <= 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
      <div className="flex items-center gap-2">
        <TrendingDown className="w-4 h-4 text-red-500" />
        <span className="text-red-700">Current Drawdown</span>
      </div>
      <div className="text-right">
        <span className="font-semibold text-red-700">
          {currency} {metrics.amount.toLocaleString()} ({metrics.percentage.toFixed(2)}%)
        </span>
      </div>
    </div>
  );
};

export default DrawdownDisplay;