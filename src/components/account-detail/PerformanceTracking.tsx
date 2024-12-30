import React, { useState, useEffect } from 'react';
import { History, TrendingDown } from 'lucide-react';
import { useTradingAccount } from '../../context/TradingAccountContext';
import { useAccountMetrics } from '../../hooks/useAccountMetrics';

const PerformanceTracking: React.FC = () => {
  const { account } = useTradingAccount();
  const metrics = useAccountMetrics(account!);
  const [consecutiveLosses, setConsecutiveLosses] = useState(metrics.drawdown.consecutiveLosses);

  // Update consecutive losses when drawdown changes
  useEffect(() => {
    setConsecutiveLosses(metrics.drawdown.consecutiveLosses);
  }, [metrics.drawdown.consecutiveLosses]);

  if (!account) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <History className="w-5 h-5 text-purple-500" />
        Performance Tracking
      </h2>

      <div className="space-y-6">
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Consecutive Losses
            </label>
            <input
              type="number"
              min="0"
              value={consecutiveLosses}
              onChange={(e) => setConsecutiveLosses(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              <h3 className="font-medium">Loss Recovery Plan</h3>
            </div>
            <p className="text-gray-600">
              To recover from current losses, you need to make{' '}
              <span className="font-semibold text-red-600">
                {account.currency} {metrics.recovery.requiredAmount.toLocaleString()}
              </span>{' '}
              in profit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTracking;