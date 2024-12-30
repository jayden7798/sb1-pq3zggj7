import React from 'react';
import { BarChart3 } from 'lucide-react';
import { useTradingAccount } from '../../context/TradingAccountContext';
import { useAccountMetrics } from '../../hooks/useAccountMetrics';

const PerformanceDashboard: React.FC = () => {
  const { account } = useTradingAccount();
  const metrics = useAccountMetrics(account!);

  if (!account) return null;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-green-500" />
        Performance Dashboard
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Trades Until Breach
          </h3>
          <p className="text-2xl font-bold text-blue-600">
            {metrics.risk.maxConsecutiveLosses}
          </p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Risk/Reward Ratio
          </h3>
          <p className="text-2xl font-bold text-green-600">1:2</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-2">
            Win Rate
          </h3>
          <p className="text-2xl font-bold text-purple-600">65%</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;